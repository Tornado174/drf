import React from 'react'


const TodoItem = ({item}) => {
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
       </tr>
   )
}


const TodoList = ({items}) => {
   return (
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
           {items.map((item) => <TodoItem item={item} />)}
       </table>
   )
}
export default TodoList
