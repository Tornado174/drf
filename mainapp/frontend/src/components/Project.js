import React from 'react'
import { Link } from "react-router-dom";

const ProjectItem = ({item}) => {
   return (
       <tr>
           <Link to={`project/${item.name}`}>{item.id}</Link>
           <td>{item.name}</td>
           <td>{item.developer}</td>
       </tr>
   )
}


const ProjectList = ({items}) => {
   return (
       <table>
           <th>ID</th>
           <th>Name</th>
           <th>Users</th>
           {items.map((item) => <ProjectItem item={item} />)}
       </table>
   )
}
export default ProjectList
