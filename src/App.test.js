import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

let countTasks = 0;

test('Добавить новую задачу', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Что нужно сделать?');
  const newText = 'Позвонить в сервис';
  fireEvent.change(input, { target: { value: newText } });
  expect(input.value).toBe(newText);
  fireEvent.keyDown(input, { key: 'Enter', code: 13 });
  expect(await screen.findByText(/позвонить в сервис/i)).toBeInTheDocument();
  countTasks++;
});

test('Удалить задачу и отметить выполненным', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Что нужно сделать?');
  const newText = 'Погулять с собакой';
  fireEvent.change(input, { target: { value: newText } });
  expect(input.value).toBe(newText);
  fireEvent.keyDown(input, { key: 'Enter', code: 13 });
  const createdTodo = await screen.findByText(/Погулять с собакой/i)
  expect(createdTodo).toBeInTheDocument();
  const deleteBtn = await screen.findAllByTestId('btnDelete');
  const checkBtn = await screen.findAllByTestId('btnCheck');
  const checkIcon = screen.getAllByTestId('CheckIcon');
  fireEvent.click(deleteBtn[1]);
  expect(createdTodo).not.toBeInTheDocument();
  fireEvent.click(checkBtn[0]);
  setTimeout(() => { expect(checkIcon[0]).toHaveStyle('opacity: 1') }, 500);
});

describe('Переключение статуса задачи', () => {

  it('Переключение в статус "Активные"', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Что нужно сделать?');
    const newText = 'Пропылесосить';
    fireEvent.change(input, { target: { value: newText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    await screen.findByText(/Пропылесосить/i);
    const activeTodos = screen.getByTestId('activeTodos');
    fireEvent.click(activeTodos);
    setTimeout(() => {
      const checkIcon = screen.getAllByTestId('CheckIcon');
      checkIcon.forEach(item => {
        expect(item).toHaveStyle('opacity: 0');
      })
    }, 500);
    countTasks++;
  });

  it('Переключение в статус "Выполненные"', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Что нужно сделать?');
    const newText = 'Помыть посуду';
    fireEvent.change(input, { target: { value: newText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    await screen.findByText(/Помыть посуду/i);
    const completedTodos = screen.getByTestId('completedTodos');
    fireEvent.click(completedTodos);
    setTimeout(() => {
      const checkIcon = screen.getAllByTestId('CheckIcon');
      checkIcon.forEach(item => {
        expect(item).toHaveStyle('opacity: 1');
      })
    }, 500);
    countTasks++;
  });

  it('Переключение в статус "Все"', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Что нужно сделать?');
    const newText = 'Завершить тесты';
    fireEvent.change(input, { target: { value: newText } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    countTasks++;
    await screen.findByText(/Завершить тесты/i);
    const allTodos = screen.getByTestId('allTodos');
    fireEvent.click(allTodos);
    setTimeout(() => {
      const allTodoItem = screen.getAllByRole('li');
      expect(allTodoItem.length).toBe(countTasks);
    }, 0);
  });

});

describe('Отметить всё и затем удалить выполненные(все)', () => {
  it('Выделить все', () => {
    render(<App />);
    const selectAll = screen.getByTestId('ExpandMoreIcon');
    fireEvent.click(selectAll);
    const checkIcon = screen.getAllByTestId('CheckIcon');
    setTimeout(() => checkIcon.forEach(item => {
      expect(item).toHaveStyle('opacity: 1');
    }, 500));
  });

  it('Удалить выполненые', () => {
    render(<App />);
    const deleteCompleted = screen.getByTestId('ClearAllIcon');
    fireEvent.click(deleteCompleted);
    setTimeout(() => {
      const checkIcon = screen.getAllByTestId('CheckIcon');
      expect(checkIcon.length).toBe(0);
    }, 500);
  })
})


