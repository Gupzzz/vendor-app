import React from 'react';

const TabHeaderLinks = ({id, isActive , onClick, children }) =>{
    return (
       <div className={ isActive ? 'filter-nav filter-nav-active' : 'filter-nav'}  onClick={() => onClick(id) } > { children } </div>
    );
}

export default TabHeaderLinks;