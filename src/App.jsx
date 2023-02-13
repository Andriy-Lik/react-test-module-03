import React, { Component } from 'react';
import shortid from 'shortid';

import initialTodos from './components/Data/todos.json';

import TodoList from './components/TodoList';
import Container from './components/Container';
import TodoEditor from './components/TodoEditor';
import Filter from 'components/Filter';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: ''
  };

  addTodo = text => {
    
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    }

    this.setState(prevState => ({
      todos: [todo, ...prevState.todos],
    }));
  };

  toggleCompleted = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => 
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo ),
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  getCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value});
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo => todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  render() {
    const { todos, filter } = this.state;
    const totalTodoCount = todos.length;
    const completedTodosCount = this.getCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <div style={{marginLeft: "40px"}}>
          <p>Общее кол-во: {totalTodoCount}</p>
          <p className='titleTodoList'>Кол-во выполненных: {completedTodosCount}</p>
        </div>
        <TodoEditor onSubmit={this.addTodo} />
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList 
          todos={visibleTodos} 
          onDeleteTodo={this.deleteTodo} 
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;