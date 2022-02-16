import React, {useState} from 'react'
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
    console.log(items)
    const [searchTerm, setSearchTerm] = useState('');
   return (
       <div>
           <table>
               <div className='App'>
                    <input
                        type='text'
                        placeholder='Search...'
                        onChange={(event)=> {
                            setSearchTerm(event.target.value);
                        }}
                    />
                   <tr>
                       <th>ID</th>
                       <th>Name</th>
                       <th>Users</th>
                       <th></th>
                   </tr>
                   {items.filter((val)=> {
                       if (searchTerm === '') {
                           return val
                       } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                           return val
                       }
                   }).map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)
                   }
                </div>
            </table>
            <Link to='/projects/create'>Create</Link>
       </div>
   )
}
export default ProjectList
