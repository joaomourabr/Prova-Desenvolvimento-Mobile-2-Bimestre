import React, { useState, createContext, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [operationData, setOperationData] = useState({
    number1: 0,
    number2: 0,
    operation: '',
    result: null,
    expression: '',
  });
  return (
    <AppContext.Provider value={{ operationData, setOperationData }}>
      {children}
    </AppContext.Provider>
  );
};

const HomeScreen = ({ navigation, route }) => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const {setOperationData } = useContext(AppContext);

  useEffect(() => {
    if (route.params) {
      setNum1(route.params.number1?.toString() || '');
      setNum2(route.params.number2?.toString() || '');
    }
  }, [route.params]);

  const validateAndNavigate = (operation) => {
    if (isNaN(num1) || isNaN(num2) || num1.trim() === '' || num2.trim() === '') {
      alert('Por favor, insira números válidos.');
      return;
    }
    setOperationData({
      number1: parseInt(num1, 10),
      number2: parseInt(num2, 10),
      operation,
      result: null,
      expression: '',
    });
    navigation.navigate('Lista de Operações');
  };

  return (
    <View style={styles.container}>
      <Text>Digite os números:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder=""
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder=""
        value={num2}
        onChangeText={setNum2}
      />
      <Button title="Somar" onPress={() => validateAndNavigate('soma')} color="red" />
      <Button title="Subtrair" onPress={() => validateAndNavigate('subtracao')} color="red" />
      <Button title="Abrir Menu" onPress={() => navigation.openDrawer()} color="red" />
    </View>
  );
};

const ResultScreen = ({ navigation }) => {
  const { operationData } = useContext(AppContext);
  const [allOperations, setAllOperations] = useState([]);
  

  useEffect(() => {
    const { number1, number2, operation } = operationData;
    let result;
    let expression;

    if (operation === 'soma') {
      result = number1 + number2;
      expression = `${number1} + ${number2} = ${result}`;
    } else if (operation === 'subtracao') {
      result = number1 - number2;
      expression = `${number1} - ${number2} = ${result}`;
    }

    setAllOperations((prev) => [...prev, expression]);

    operationData.result = result;
    operationData.expression = expression;
  }, [operationData]);

  return (
    <View style={styles.container}>
      <Text>Operações Realizadas:</Text>
      <View style={styles.flatlistContainer}>
        <View style={styles.flatlistSection}>
 
          <FlatList
            style={styles.flatlist}
            data={allOperations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
        </View>
        
      </View>
      <Button title="Voltar ao Início" onPress={() => navigation.navigate('Início', { expression: operationData.expression })} color="red" />
      <Button title="Abrir Menu" onPress={() => navigation.openDrawer()} color="red" />
    </View>
  );
};

const OperationScreen = ({ navigation, route }) => {
  const { operation, number1, number2 } = route.params;
  const { setOperationData } = useContext(AppContext);

  useEffect(() => {
    setOperationData({
      number1,
      number2,
      operation,
      result: null,
      expression: '',
    });
    navigation.navigate('Lista de Operações');
  }, [operation, number1, number2, setOperationData, navigation]);

  return <View />;
};

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Início" onPress={() => navigation.navigate('Início')} color="red" />
      <Button title="Somar" onPress={() => navigation.navigate('Somar')} color="red" />
      <Button title="Subtrair" onPress={() => navigation.navigate('Subtração')} color="red" />
      <Button title="Lista de Operações" onPress={() => navigation.navigate('Lista de Operações')} color="red" />
      <Button title="Fechar Menu" onPress={() => navigation.closeDrawer()} color="red" />
    </View>
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Início" drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Início" component={HomeScreen} />
          <Drawer.Screen
            name="Somar"
            component={OperationScreen}
            initialParams={{ operation: 'soma', number1: 0, number2: 0 }}
          />
          <Drawer.Screen
            name="Subtração"
            component={OperationScreen}
            initialParams={{ operation: 'subtracao', number1: 0, number2: 0 }}
          />
          <Drawer.Screen name="Lista de Operações" component={ResultScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  flatlistContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  flatlistSection: { flex: 1, marginHorizontal: 5 },
  flatlist: { borderWidth: 1, borderColor: '#ccc', padding: 5, marginTop: 5 },
});

