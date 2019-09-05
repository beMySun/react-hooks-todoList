import React, { useState, useEffect } from 'react';
import axios from 'axios'
const uuidv4 = require('uuid/v4');
// import { useTodos } from './Store.js'

export function TodoList() {

  const [loading, setLoading] = useState(true)
  const [todoList, updateTodoList] = useState([])

  const completeTodo = (id, isCompleted) => {
    setLoading(true)
    axios.post("http://localhost:8080/updateRecord", { id, isCompleted: Number(!isCompleted) })
      .then(() => { queryRecords() })
  }

  useEffect(() => {
    queryRecords()
  }, []);

  const queryRecords = () => {
    setLoading(true)
    fetch("http://localhost:8080/getTodoList")
      .then(response => response.json())
      .then(result => updateTodoList(result.data))
      .then(() => setLoading(false))
  }

  const addTodo = () => {
    const newRecord = {
      id: uuidv4(),
      text: 'some text ' + uuidv4(),
      isCompleted: 0,
    }
    setLoading(true)
    axios.post("http://localhost:8080/CreateTodoRecord", newRecord)
      .then(() => { queryRecords() })
  }

  const deleteTodo = id => {
    setLoading(true)
    axios.post("http://localhost:8080/deleteRecord", { id })
      .then(() => { queryRecords() })
  }

  return (
    <>
      {loading ? <div> Loading </div> : <div> loaded</div>}
      <button onClick={addTodo}>Add</button>
      <img src={undefined} />
      <ul>
        {todoList.map(todo => (
          <li key={todo.id} style={todo.isCompleted ? { color: 'red' } : { color: 'green' }}>
            <span>{todo.text || '/'}</span>
            <button onClick={() => completeTodo(todo.id, todo.isCompleted)}>Complete</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}