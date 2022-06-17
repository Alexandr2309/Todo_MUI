import './styles/App.css';
import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import AddTodo from './components/AddTodo';
import TasksList from './components/TasksList';
import BottomPanel from './components/BottomPanel';

function App() {
  const [todos, setTodos] = useState([]);
  const [nowTodosStatus, setNowTodosStatus] = useState('all');
  const [nowTodos, setNowTodos] = useState([]);
  const isFirstUpdate = useRef(true);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) setTodos(todos);
  }, []);
  useEffect(() => {
    if (isFirstUpdate.current) return;
    switch (nowTodosStatus) {
      case 'active':
        setNowTodos(todos.filter(todo => !todo.performed));
        break;
      case 'completed':
        setNowTodos(todos.filter(todo => todo.performed));
        break;
      default:
        setNowTodos(todos);
        break;
    }
  }, [nowTodosStatus, todos]);
  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return;
    };
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="wrapper">
      <h1 style={{ textAlign: 'center' }}>Todos</h1>
      <Box sx={{ maxWidth: '800px', m: '0 auto' }}>
        <AddTodo todos={todos} setTodos={setTodos} />
        <TasksList todos={nowTodos} setTodos={setTodos} />
        {!!todos.length &&
         <BottomPanel 
         setStatus={setNowTodosStatus} 
         todos={todos} 
         setTodos={setTodos}
         /> }
      </Box>
    </div>
  );
}

export default App;
