import React from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import AuthorList from './components/User.js'
import ProjectList from "./components/Project";
import TodoList from "./components/ToDo";
import {HashRouter, Route, Link, Switch, BrowserRouter} from "react-router-dom";


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'authors':[],
      'projects':[],
      'todos':[]
    }
  }


  componentDidMount() {
    axios.get('http://127.0.0.1:8000/UserViewSet')
        .then(response => {
        const authors = response.data
            this.setState(
                {
              'authors':authors
            }
            )
        }
    ).catch(error => console.log(error));
    axios.get('http://127.0.0.1:8000/api/project')
        .then(response => {
        const projects = response.data
            this.setState(
                {
              'projects':projects
            }
            )
        }
    ).catch(error => console.log(error));
    axios.get('http://127.0.0.1:8000/api/todo')
        .then(response => {
        const todos = response.data
            this.setState(
                {
              'todos':todos
            }
            )
        }
    ).catch(error => console.log(error));
  }

  render() {
      return (
          <div className='App'>
              <BrowserRouter>
              <nav>
                  <ul>
                      <li>
                          <Link to='/'>Authors</Link>
                      </li>
                      <li>
                          <Link to='/project'>Projects</Link>
                      </li>
                      <li>
                          <Link to='/todo'>Todo</Link>
                      </li>
                  </ul>
              </nav>
                  <Switch>
                  <Route exact path='/' component={() => <AuthorList authors={this.state.authors}/>}/>
                  <Route exact path='/project' component={() => <ProjectList projects={this.state.projects}/>}/>
                  <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                      <Route component={NotFound404} />
              </Switch>
              </BrowserRouter>
          </div>
      )
  }
}

export default App;
