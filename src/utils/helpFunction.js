import DoneAllIcon from '@mui/icons-material/DoneAll';
export function caseWord(num) {

  if (num === 0) return (<DoneAllIcon fontSize="large" sx={{color: 'green'}}/>);
  let strNum = num.toString();

  if (/1[0-9]$/.test(strNum)) return `Осталось ${num} задач`;
  else if (/[2-4]$/.test(strNum)) return `Осталась ${num} задачи`;
  else if (/[5-9]$/.test(strNum)) return `Осталось ${num} задач`;

  return `Осталась ${num} задача`
};