import React from "react";
import { useParams } from "react-router-dom";


const ProjectTodoItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.project}</td>
            <td>{item.text}</td>
        </tr>
    )
}

const ProjectTodoList = ({items}) => {
    let { project } = useParams();
    let filtered_items = items.filter((item) => String(item.project) === project)
    return (
        <table>
            <th>id</th>
            <th>Project</th>
            <th>Text</th>
            {filtered_items.map((item) => <ProjectTodoItem item={item} />)}
        </table>
    )
}

export default ProjectTodoList