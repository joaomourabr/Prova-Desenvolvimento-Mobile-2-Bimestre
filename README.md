# Aplicativo de Operações Matemáticas com React Native

Este projeto é uma aplicação móvel desenvolvida em React Native que permite realizar operações matemáticas básicas (soma e subtração), navegar entre telas utilizando um menu de navegação do tipo drawer e exibir o histórico das operações realizadas.

## Funcionalidades

1. **Operações Matemáticas**:
   - Realize soma e subtração entre dois números.
   - Validação de entrada para garantir que os valores sejam numéricos.
   
2. **Histórico de Operações**:
   - Exibe uma lista de todas as operações realizadas, com a expressão completa e o resultado.

3. **Navegação com Drawer**:
   - Menu lateral que permite acessar as telas disponíveis:
     - Tela inicial.
     - Operações de soma e subtração.
     - Histórico de operações.

4. **Interface Intuitiva**:
   - Uso de componentes como `TextInput`, `Button` e `FlatList` para uma experiência amigável.

5. **Context API**:
   - Gerenciamento de estado global para compartilhar dados entre telas.

## Estrutura do Projeto

### Componentes Principais

- **`AppProvider`**:
  - Gerencia o estado global da aplicação usando Context API.
  - Armazena os dados da operação (números, tipo de operação, resultado e expressão).

- **Telas**:
  - `HomeScreen`: Entrada de números e seleção da operação.
  - `OperationScreen`: Configuração da operação a ser realizada.
  - `ResultScreen`: Exibe o histórico de operações realizadas.

- **CustomDrawerContent**:
  - Componente personalizado para o menu lateral (drawer).

### Fluxo de Navegação

1. O usuário insere dois números na tela inicial.
2. Escolhe a operação desejada (soma ou subtração).
3. O resultado é calculado e adicionado ao histórico.
4. O usuário pode acessar o histórico ou realizar outras operações.

## Estilos

- **Campo de Entrada (`TextInput`)**:
  - Borda arredondada, espaço interno confortável e separação visual clara.
- **Lista de Operações (`FlatList`)**:
  - Apresenta cada operação como um item da lista.
- **Botões**:
  - Cor vermelha para destacar ações importantes.

