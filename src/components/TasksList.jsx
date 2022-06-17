import React from 'react';
import List from '@mui/material/List';
import TaskItem from './TaskItem';
import { TransitionGroup } from 'react-transition-group';
import { Slide } from '@mui/material';


const TasksList = ({ todos, setTodos }) => {
  return (
    <List sx={{ p: 0 }}>
      <TransitionGroup>
        {todos.map((todo, i) => {
          const time = 500 + (i * 100);
          return (
            <Slide direction="right" key={todo.id} timeout={{ enter: time, exit: 500 }}>
              {TaskItem(todo, setTodos, todos, todo.id)}
            </Slide>
          )
        }
        )}
      </TransitionGroup>
    </List>
  )
};

export default TasksList;