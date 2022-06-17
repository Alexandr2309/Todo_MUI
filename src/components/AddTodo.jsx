import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import { v4 } from 'uuid';

const AddTodo = ({ todos, setTodos }) => {
  const [value, setValue] = useState('');
  const [chooseAll, setChooseAll] = useState(true);

  const addNewTodo = (e) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      const newTodo = { text: value, performed: false, id: v4() };
      setTodos([...todos, newTodo]);
      setValue('');
    }
  }
  const completAll = () => {
    setTodos(todos.map(todo => ({ ...todo, performed: chooseAll })));
    setChooseAll(!chooseAll);
  }

  return (
    <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', columnGap: 1, borderRadius: 0 }}>
      <ExpandMoreIcon sx={{ p: 1.5 }} fontSize="large" onClick={completAll}/>
      <InputBase placeholder="Что нужно сделать?"
        value={value}
        onChange={e => setValue(e.target.value)}
        sx={{ fontSize: '24px', flexGrow: 1 }}
        onKeyDown={addNewTodo}
      />
    </Paper>
  )
};

export default AddTodo;