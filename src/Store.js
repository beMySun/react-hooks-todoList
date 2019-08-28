import React from 'react'
import produce from 'immer'

// An array of todos, where a todo looks like this: 
// { id: string; title: string; isCompleted: boolean }
const initialTodos = [{
  id: 1,
  title: "One",
  isCompleted: false
}, {
  id: 2,
  title: "Two",
  isCompleted: false
}, {
  id: 3,
  title: "Three",
  isCompleted: false
}]

const StateContext = React.createContext(initialTodos)
const UpdateContext = React.createContext(null)

export function TodosProvider({ children }) {
  const [todos, updateTodos] = React.useReducer(produce, initialTodos)
  return (
    <UpdateContext.Provider value={updateTodos}>
      <StateContext.Provider value={todos}>
        {children}
      </StateContext.Provider>
    </UpdateContext.Provider>
  )
}

export function useTodos() {
  return [React.useContext(StateContext), React.useContext(UpdateContext)]
}
