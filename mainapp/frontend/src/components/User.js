import React from 'react';
import { Link } from 'react-router-dom';


const UserItem = ({ item }) => {
   return (
       <tr>
           <td>
               <Link to={`user/${item.username}`}>{item.id}</Link>
           </td>
           <td>
               {item.username}
           </td>
           <td>
               {item.email}
           </td>
       </tr>
   )
}


const UserList = ({items}) => {
   return (
       <table>
           <th>
               ID
           </th>
           <th>
               Users
           </th>
           <th>
               Email
           </th>
           {items.map((item) => <UserItem item={item} />)}
       </table>
   )
}
export default UserList
