import { Grid } from '@mui/material';
import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { caseWord } from '../utils/helpFunction';

const BottomPanel = ({ todos, setTodos, setStatus }) => {
  const [progress, setProgress] = useState('all');

  const changeStatus = e => {
    const newStatus = e.target.value
    if (newStatus === progress) {
      e.target.classList.add('Mui-selected')
      return;
    };
    setStatus(newStatus);
    setProgress(newStatus);
  };
  const clearComplited = () => {
    setTodos(todos.filter(todo => !todo.performed));
  };
  const ToggleBtn = styled(ToggleButton)(({ theme }) => ({
    textTransform: 'none',
    padding: '7px 7px',
    border: 'none',
    flexGrow: 1,
    '&.Mui-selected': {
      color: 'rgba(0, 0, 0, 0.87)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      fontWeight: 'bold',
      border: '1px solid rgba(0, 0, 0, 0.12) !important',
    }
  }))

  return (
    <Paper elevation={3}>
      <Grid sx={{ p: '5px 5px', display: 'flex', alignItems: 'center' }}>
        <Grid item xs={2} sx={{ fontSize: '18px', pl: '7px' }}>
          {caseWord(todos.filter(todo => !todo.performed).length)}
        </Grid>
        <Grid item xs={8} sx={{ flexGrow: 1, textAlign: 'center' }}>
          <ToggleButtonGroup value={progress}
            exclusive
            sx={{ m: '0 auto', '& *': { margin: '0 5px' } }}
            onChange={changeStatus}
          >
            <ToggleBtn value="all" data-testid="allTodos">Все</ToggleBtn>
            <ToggleBtn value="active" data-testid="activeTodos">Активные</ToggleBtn>
            <ToggleBtn value="completed" data-testid="completedTodos" >Выполненные</ToggleBtn>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={2} >
          <Tooltip title="Удалить выполненные">
            <IconButton onClick={clearComplited}>
              <ClearAllIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default BottomPanel;