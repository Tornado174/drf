import React from 'react';
// import logo from './logo.svg';
import './App.css';
import './components/Menu.css';
import './components/Footer.css';
import UserList from './components/User.js';
import axios from "axios"
import Footer from "./components/Footer";
import MenuItemList from "./components/Menu";
// import MenuItem from "./components/Menu";



class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'menu': []
       }
   }

    componentDidMount() {
       axios.get('http://127.0.0.1:8000/api/usersapp')
           .then(response => {
               const users = response.data
                   this.setState(
                   {
                       'users': users,
                       'menu': [
                           {
                               'name': 'Главная',
                               'url': 'http://localhost:3000'
                           }
                       ]
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
                <div>
                    <UserList users={this.state.users} />
                </div>
               <div className='footer'>
                    <Footer />
               </div>

           </div>
       )
   }
}


export default App;