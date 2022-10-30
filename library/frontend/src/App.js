
import React from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import AuthorList from './components/User.js'
import ProjectList from "./components/Project";
import TodoList from "./components/ToDo";
import { Route, Link, Switch, BrowserRouter} from "react-router-dom";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/es6";
import ProjectForm from "./components/ProjectForm";


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
      'todos':[],
      'token':[]
    }
  }

  set_token(token) {
      const cookies = new Cookies()
      cookies.set('token', token)
      this.setState({'token': token}, () => this.load_data())
      }

  is_aunthenticated() {
    return this.state.token !== ''
  }

  logout() {
      this.set_token('')
  }

  get_token_from_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      this.setState({'token': token}, () => this.load_data())
  }

  get_token(login, password) {
      axios.post('http://127.0.0.1:8000/api-token/', {username:login, password:password})
          .then(response => {
              this.set_token(response.data['token'])
          }).catch(error =>  alert('Неверный логин или пароль:' + error))
  }

  get_headers() {
      let headers = {
          'Content-Type': 'application/json'
      }
      if (this.is_aunthenticated())
      {
        headers['Authorization'] = 'Token' + this.state.toLocaleString()
      }
      return headers
  }

  createProject(name_project, repository) {
      const headers = this.get_headers()
      const data = {name_project: name_project, repository: repository}
      axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers})
          .then(response => {
              let new_project = response.data
              let new_repository = response.data
              // const author = this.state.authors.filter((item) => item.id === new_book.author)[0]
              // new_project.author = author
              this.setState({projects: [...this.state.projects, new_project]})
          }).catch(error => console.log(error))
  }

  deleteProject(uid) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/project/${uid}/`, {headers})
          .then(response => {
              this.setState({projects: this.state.projects.filter((item)=>item.uid !== uid)})
          }).catch(error => console.log(error))
  }
  deleteTodo(id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`, {headers})
          .then(response => {
              this.setState({todos: this.state.todos.filter((item)=>item.id !== id)})
          }).catch(error => console.log(error))
  }

  load_data() {

    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/UserViewSet', {headers})
        .then(response => {
        const authors = response.data
            this.setState(
                {
              'authors':authors
            }
            )
        }
    ).catch(error => console.log(error));
    axios.get('http://127.0.0.1:8000/api/project', {headers})
        .then(response => {
        const projects = response.data
            this.setState(
                {
              'projects':projects['results']
            }
            )
        }
    ).catch(error => console.log(error));
    axios.get('http://127.0.0.1:8000/api/todo', {headers})
        .then(response => {
        const todos = response.data
            this.setState(
                {
              'todos':todos['results']
            }
            )
        }
    ).catch(error => console.log(error));
  }

  componentDidMount() {
      this.get_token_from_storage()
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
                      <li>
                          {this.is_aunthenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                      </li>
                  </ul>
              </nav>
                  <Switch>
                  <Route exact path='/' component={() => <AuthorList authors={this.state.authors}/>}/>
                  <Route exact path='/project' component={() => <ProjectList projects={this.state.projects} deleteProject={(uid)=>this.deleteProject(uid)} />} />
                  <Route exact path='/project/create' component={() => <ProjectForm projects={this.state.projects} createProject={(name_project, repository) => this.createProject(name_project, repository)} />} />
                  <Route exact path='/todo' component={() => <TodoList todos={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)}/>}/>
                  <Route exact path='/login' component={() => <LoginForm get_token = {(login, password) => this.get_token(login, password)} />}/>
                  <Route component={NotFound404} />
              </Switch>
              </BrowserRouter>
          </div>
      )
  }
}

export default App;
