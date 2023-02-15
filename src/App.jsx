import React, { Component } from 'react';
import shortid from 'shortid';

import initialTodos from './components/Data/todos.json';
// import tabs from './components/Data/tabs.json';

import TodoList from './components/TodoList';
import Container from './components/Container';
import TodoEditor from './components/TodoEditor';
import Filter from 'components/Filter';
import Modal from './components/Modal';
// import Tabs from 'components/Tabs';
// import Clock from './components/Clock';
import IconButton from 'components/IconButton';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
    showModal: false
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

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodosCount = this.getCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        {/* <Tabs items={tabs} /> */}
        {/* <Clock /> */}
        <IconButton onClick={this.toggleModal}>Открыть модалку</IconButton>

        {/* <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button> */}
        {/* Если showModal=true рендерим <Modal /> */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Привет это контент модалки как children</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Quae cumque reiciendis pariatur deserunt tempora adipisci eaque ipsam, 
              incidunt libero in soluta numquam commodi sapiente nulla doloribus 
              cum saepe dicta eligendi.
            </p>
            <button type='button' onClick={this.toggleModal}>
              Закрыть
            </button>
          </Modal>
        )}
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