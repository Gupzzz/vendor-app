import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNavLink = ({description,isActive,URL, onClick}) =>{
    return (
        <li>
            <Link className={ isActive ? 'active' : ''} to={URL} onClick={() => onClick(description) } > {description} </Link>
        </li>
    );
}

export default HeaderNavLink;