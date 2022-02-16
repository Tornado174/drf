import React from 'react';


const MenuItem = ({item}) => {
    return (
        <span><a href={item.url}>{item.name}</a></span>
    )
}

const MenuItemList = ({menu}) => {
    return (
        <ul>
            {menu.map((item) => <MenuItem item={item} />)}
        </ul>
    )
}

export default MenuItemList;
