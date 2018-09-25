import React from 'react';
import PropTypes from 'prop-types';

const TabBodyContent = ({ forId, isActive, children }) =>{

    if(isActive)
        return  children;    
    return '';
}   
    
TabBodyContent.propType = {
    forId : PropTypes.instanceOf(PropTypes.string).isRequired
}

export default TabBodyContent;