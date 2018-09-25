import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabBodyContent from './TabBodyContent';

class TabBody extends Component{
    render () {


        const { children, currentIndex, setIndex } = this.props;
        
        const childrenWithProps = React.Children.map(children, (child, index) => {
                if(currentIndex === "" && index == 0)
                    return React.cloneElement(child, { isActive : true });
                
                if(currentIndex === child.props.forId)
                    return React.cloneElement(child, { isActive : true });

                return React.cloneElement(child, { isActive : false });
            }
        );

        return (
            <div className="vp-tabbody">
                { childrenWithProps }
            </div>
        );
    }
}

TabBody.propTypes ={
    children : PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(TabBodyContent),PropTypes.object]))
}

export default TabBody;