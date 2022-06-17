import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Paper from '@mui/material/Paper';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import { Transition } from 'react-transition-group';
import { transStylesCheck, closeIconStyles, transStylesText, paperStyle } from '../jsStyles/TaskItemStyles';
import TextField from '@mui/material/TextField';

const TaskItem = (todo, setTodos, allTodos, id) => {
  const { text, performed } = todo;

  const ItemText = styled(ListItemText)({
    fontSize: '28px',
    transition: 'all 0.3s ease',
  })
  const IconCheck = styled(CheckIcon)({
    position: 'absolute',
    left: '15px',
    marginTop: '-5px',
    color: 'green',
    transition: 'opacity .3s ease 0s'
  });

  const changeTodos = (i, type) => {
    switch (type) {
      case 'performed':
        const updateTodos = allTodos.map(todo => {
          if (todo.id === id) {
            return { ...todo, performed: !todo.performed }
          }
          return todo;
        });
        setTodos(updateTodos);
        break;
      case 'delete':
        let newTodos = allTodos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <Paper elevation={3} sx={{ ...paperStyle }} >
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemIcon sx={{ paddingLeft: 1.5, '& *': { cursor: 'pointer' } }}
            onClick={e => changeTodos(id, 'performed')}
            data-testid='btnCheck'>
            <RadioButtonUncheckedIcon fontSize="large" />
            <Transition in={performed} timeout={0} >
              {st => <IconCheck fontSize="large" sx={{ ...transStylesCheck[st] }} />}
            </Transition>
          </ListItemIcon>
          <Transition in={performed} timeout={0}>
            {st =>
              <ItemText primary={text}
                sx={{ ...transStylesText[st] }}
                disableTypography={true}
              />
            }
          </Transition>
          <ListItemIcon sx={{ display: 'inline-flex', '& *': { cursor: 'pointer' } }}
            onClick={e => changeTodos(id, 'delete')}
            data-testid="btnDelete" 
          >
            <CloseOutlinedIcon sx={{ ...closeIconStyles }} fontSize="large" />
          </ListItemIcon>
        </ListItem>
      </Paper>
    </div>
  )
};

export default TaskItem;