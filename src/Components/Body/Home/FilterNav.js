import React from 'react';

const FilterNav = ({description,isActive,URL, onClick, count}) =>{
    return (
        <button className={ isActive ? 'filter-nav filter-nav-active' : 'filter-nav'} to={URL} onClick={() => onClick(description) } > {description} <span className="badge filter-nav-badge">{count}</span></button>
    );
}

export default FilterNav;