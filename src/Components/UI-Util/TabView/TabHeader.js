import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabHeaderLinks from './TabHeaderLinks';
class TabHeader extends Component{
    render(){

        const { children, currentIndex, setIndex } = this.props;
        
        const childrenWithProps = React.Children.map(children, (child, index) => {
                if(currentIndex === "" && index == 0)
                    return React.cloneElement(child, { isActive : true , onClick : setIndex });
                
                if(currentIndex === child.props.id)
                    return React.cloneElement(child, { isActive : true , onClick : setIndex });

                return React.cloneElement(child, { isActive : false , onClick : setIndex });
            }
        );

        return (
        <div className="vp-tabheader" >
            { childrenWithProps }
        </div>
        );
    }
}

TabHeader.propTypes ={
    children : PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(TabHeaderLinks),PropTypes.object]))
}

export default TabHeader;