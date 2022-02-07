import React from "react"
import { useParams } from "react-router-dom"


const UserProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.developer}</td>
        </tr>
    )
}

const UserProjectList = ({items}) => {
    let { developer } = useParams();
    let filtered_items = items.filter((item) => String(item.developer) === developer)
    return (
        <table>
            <th>ID</th>
            <th>Name</th>
            <th>User</th>
            {filtered_items.map((item) => <UserProjectItem item={item} />)}
        </table>
    )
}

export default UserProjectList