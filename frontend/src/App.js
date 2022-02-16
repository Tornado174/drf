import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './components/Menu.css';
import './components/Footer.css';
import UserList from './components/User.js';
import ProjectList from "./components/Project.js";
import TodoList from "./components/Todo.js";
import UserProjectList from "./components/UserProject.js"
import axios from "axios"
import Footer from "./components/Footer";
import MenuItemList from "./components/Menu";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";
import ProjectTodoList from "./components/ProjectTodo";
import LoginForm from "./components/Auth.js";
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";



const MainPage = () => {
    return (
        <div>
            <h1>Главная</h1>
        </div>
    )
}


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
           'users': [],
           'projects': [],
           'todos': [],
           'menu': [],
           'token': ''
       }
   }

   set_token(token) {
       const cookies = new Cookies()
       cookies.set('token', token)
       this.setState({'token': token}, ()=>this.load_data())
   }

   is_autenticated() {
       return this.state.token != ''
   }

   logout() {
       this.set_token('')
   }

   get_token_from_storage() {
       const cookies = new Cookies()
       const token = cookies.get('token')
       this.setState({'token': token}, ()=>this.load_data())
   }

   get_token(username, password) {
       axios.post('http://89.108.98.251:8000/api-token-auth/', {username: username, password: password})
       .then(response => {
           this.set_token(response.data['token'])
       }).catch(error => alert('Неверный логин или пароль'))
   }

   get_headers() {
       let headers = {
           'Content-Type': 'application/json'
       }
       if (this.is_autenticated())
       {
           headers['Authorization'] = 'Token ' + this.state.token
       }
       return headers
   }

  createProject(name, developer, link) {
        const headers = this.get_headers()
        const data = {name: name, developer: developer, link: link}
        axios.post(`http://89.108.98.251:8000/projects/`, data,{headers}).then((response => {
            let new_project = response.data
            new_project.developer = this.state.users.filter((item) => item.id === new_project.user)[0]
            this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error)))
   }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://89.108.98.251:8000/projects/${id}`, {headers}).then((response => {
            this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error)))
    }

    createTodo(project, creator, text) {
        const headers = this.get_headers()
        const data = {project: project, creator: creator, text: text}
        axios.post(`http://89.108.98.251:8000/todo/`, data,{headers}).then((response => {
            let new_todo = response.data
            new_todo.project = this.state.projects.filter((item) => item.id === new_todo.project)[0]
            new_todo.creator = this.state.users.filter((item)=> item.id === new_todo.user)[0]
            this.setState({todo: [...this.state.todos, new_todo]})
        }).catch(error => console.log(error)))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://89.108.98.251:8000/todo/${id}`, {headers}).then((response => {
           this.setState({todo: this.state.todos.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error)))
   }

   load_data() {
       const headers = this.get_headers()
       axios.get('http://89.108.98.251:8000/users', {headers})
           .then(response => {
               this.setState({
                   users: response.data.results,
                   'menu': [
                       {
                           'name': 'Main',
                           'url': 'http://89.108.98.251:3000'
                       }
                   ]
               })
           }).catch(error => console.log(error))

       axios.get('http://89.108.98.251:8000/projects', {headers})
           .then(response => {
               this.setState({projects: response.data.results})
           }).catch(error => console.log(error))

       axios.get('http://89.108.98.251:8000/todo', {headers})
           .then(response => {
               this.setState({todos: response.data.results})
           }).catch(error => console.log(error))
   }



    componentDidMount() {
       this.get_token_from_storage()
    }

   render () {
       return (
           <div>
                <div className='header'>
                    <MenuItemList menu={this.state.menu} />
                </div>
                <div className='App'>
                    <Router>
                        <nav>
                            <ul>
                                <li>
                                    <Link to='/users'>Users</Link>
                                </li>
                                <li>
                                    <Link to='/projects'>Projects</Link>
                                </li>
                                <li>
                                    <Link to='/todo'>Todo</Link>
                                </li>
                                <li>
                                    {this.is_autenticated() ? <button onClick={()=>this.logout()}>Logout</button>
                                        : <Link to='/login'>Login</Link>}
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path='/' component={MainPage} />
                            <Route exact path='/users' component={() => <UserList items={this.state.users} />} />
                            <Route exact path='/projects/create' component={() =>
                                <ProjectForm users={this.state.users} createProject={(name, developer, link) =>
                                    this.createProject(name, developer, link)} />} />
                            <Route exact path='/todo/create' component={() =>
                                <TodoForm users={this.state.users} projects={this.state.projects}
                                    createTodo={(project, creator, text) =>
                                        this.createTodo(project, creator, text)} />} />

                            <Route exact path='/projects' component={() => <ProjectList
                                items={this.state.projects}
                                deleteProject={(id)=>this.deleteProject(id)}/>} />

                            <Route exact path='/todo' component={() => <TodoList
                                items={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)}/>} />
                            <Route exact path='/login'>
                                <LoginForm get_token={(username, password) => this.get_token(username, password)} />
                            </Route>
                            <Route path='/project/:project'>
                                <ProjectTodoList items={this.state.todos} />
                            </Route>
                            <Route path='/user/:developer'>
                                <UserProjectList items={this.state.projects} />
                            </Route>
                            <Redirect to='/' from='/main' />
                            <Route component={NotFound404} />
                        </Switch>
                    </Router>
                </div>
               <div className='footer'>
                    <Footer />
               </div>

           </div>
       )
   }
}


export default App;