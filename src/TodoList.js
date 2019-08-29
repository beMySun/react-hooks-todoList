import React, { useState, useEffect } from 'react';
import { useTodos } from './Store.js'

export function TodoList() {
  const [todos, updateTodos] = useTodos()

  const deleteTodo = id => updateTodos(todos => {
    const todoIdxToDelete = todos.findIndex(todo => todo.id === id)
    todos.splice(todoIdxToDelete, 1)
  })

  const completeTodo = id => updateTodos(todos => {
    todos.find(todo => todo.id === id).isCompleted = true
  })

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={todo.isCompleted ? { color: 'red' } : { color: 'green' }}>
          <span>{todo.title}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={() => completeTodo(todo.id)}>Complete</button>
        </li>
      ))}
    </ul>
  )
}