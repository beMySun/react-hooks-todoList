import React from "react";
import { TodosProvider } from './Store'
import { TodoList } from './TodoList'

const App = () => {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
}

export default App
