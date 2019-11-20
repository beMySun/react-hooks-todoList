import React, { useState, useEffect } from 'react';
import axios from 'axios';
const uuidv4 = require('uuid/v4');
// import { useTodos } from './Store.js'

export function TodoList() {
  const [loading, setLoading] = useState(true);
  const [todoList, updateTodoList] = useState([]);

  let todoTextInput = null;

  const completeTodo = (id, isCompleted) => {
    setLoading(true);
    axios.post('http://localhost:8080/updateRecord', { id, isCompleted: Number(!isCompleted) }).then(() => {
      queryRecords();
    });
  };

  useEffect(() => {
    queryRecords();
    todoTextInput.focus();
  }, []);

  const queryRecords = () => {
    setLoading(true);
    fetch('http://localhost:8080/getTodoList')
      .then(response => response.json())
      .then(result => updateTodoList(result.data))
      .then(() => setLoading(false));
  };

  const addTodo = () => {
    const inputText = todoTextInput.value;
    const newRecord = {
      id: uuidv4(),
      text: inputText,
      isCompleted: 0
    };
    setLoading(true);
    axios.post('http://localhost:8080/CreateTodoRecord', newRecord).then(() => {
      queryRecords();
    });
    todoTextInput.value = '';
  };

  const deleteTodo = id => {
    setLoading(true);
    axios.post('http://localhost:8080/deleteRecord', { id }).then(() => {
      queryRecords();
    });
  };

  const ActionButton = (props) => {
    return <button {...props} style={{margin: '0 10px'}}> { props.children } </button>
  }

  return (
    <>
      {loading ? <div> Loading </div> : <div> loaded </div>}
      <input type="text" ref={(ref) => todoTextInput = ref} style={{marginRight: 10}}/>
      <ActionButton onClick={addTodo}> Add </ActionButton>
      <ul className="lol">
        {todoList.map(todo => (
          <li key={todo.id} style={todo.isCompleted ? { color: 'red', textDecoration: 'line-through' } : { color: 'green' }}>
            <span>{ todo.text || '/' }</span>
            <ActionButton onClick={() => completeTodo(todo.id, todo.isCompleted)}> Complete </ActionButton>
            <ActionButton onClick={() => deleteTodo(todo.id)}> Delete </ActionButton>
          </li>
        ))}
        <li>占坑位的一条</li>
      </ul>
    </>
  );
}
