import React from "react";
import { TodosProvider } from './Store.js'
import { TodoList } from './TodoList.js'

const App = () => {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
}

export default App
