import React from 'react'
import { Link } from "react-router-dom";


const ProjectItem = ({item, deleteProject}) => {
   return (
       <tr>
           <Link to={`projects/${item.id}`}>{item.id}</Link>
           <td>{item.name}</td>
           <td>{item.developer}</td>
           <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>
       </tr>
   )
}


const ProjectList = ({items, deleteProject}) => {
   return (
       <div>
           <table>
               <tr>
                   <th>ID</th>
                   <th>Name</th>
                   <th>Users</th>
                   <th></th>
               </tr>
               {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
            </table>
            <Link to='/projects/create'>Create</Link>
       </div>
   )
}
export default ProjectList
