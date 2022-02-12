import React from 'react'
import {Link} from "react-router-dom";


const TodoItem = ({item, deleteTodo}) => {
   return (
       <tr>
           <td>
               {item.id}
           </td>
           <td>
               {item.text}
           </td>
           <td>
               {item.project}
           </td>
           <td>
               <button onClick={()=>deleteTodo(item.id)} type='button'>Delete</button>
           </td>
       </tr>
   )
}


const TodoList = ({items, deleteTodo}) => {
   return (
       <div>
           <table>
               <th>
                   ID
               </th>
               <th>
                   Text
               </th>
               <th>
                   Project
               </th>
               <th></th>
               {items.map((item) => <TodoItem item={item} deleteTodo={deleteTodo} />)}
           </table>
           <Link to='/todo/create'>Create</Link>
       </div>
   )
}
export default TodoList
