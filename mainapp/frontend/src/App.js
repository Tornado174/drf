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
           'menu': []
       }
   }

    componentDidMount() {
       axios.get('http://127.0.0.1:8000/users')
           .then(response => {
               const users = response.data
                   this.setState(
                   {
                       'users': users.results,
                       'menu': [
                           {
                               'name': 'Главная',
                               'url': 'http://localhost:3000'
                           }
                       ]
                   }
               )
           }).catch(error => console.log(error));

       axios.get('http://127.0.0.1:8000/projects')
           .then(response => {
               const projects = response.data
                   this.setState(
                   {
                       'projects': projects.results,
                   }
               )
           }).catch(error => console.log(error));

       axios.get('http://127.0.0.1:8000/todo')
           .then(response => {
               const todos = response.data
                   this.setState(
                   {
                       'todos': todos.results,
                   }
               )
           }).catch(error => console.log(error));

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
                                    <Link to='/'>Users</Link>
                                </li>
                                <li>
                                    <Link to='/projects'>Projects</Link>
                                </li>
                                <li>
                                    <Link to='/todo'>ToDo</Link>
                                </li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path='/' component={() => <UserList items={this.state.users} />} />
                            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects}/>} />
                            <Route exact path='/todo' component={() => <TodoList items={this.state.todos}/>} />
                            <Route path='/project/:project'>
                                <ProjectTodoList items={this.state.todos} />
                            </Route>
                            <Route path='/user/:developer'>
                                <UserProjectList items={this.state.projects} />
                            </Route>
                            <Redirect from='/users' to='/' />
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