import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
class TabView extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            currentIndexNumber : "",
            setIndexNumber : (id) => {
                this.setState({currentIndexNumber : id});
            }
        }
    }



    render(){
        
        const { children } = this.props;

        const childrenWithProps = React.Children.map(children, (child) =>
            React.cloneElement(child, { currentIndex : this.state.currentIndexNumber, setIndex : this.state.setIndexNumber }));
        
        return (
        <div className="vp-tabview" >
            { childrenWithProps }
        </div>
        );
    }


}

TabView.propTypes ={
    children : PropTypes.arrayOf(PropTypes.oneOfType( [ PropTypes.instanceOf(TabHeader), PropTypes.instanceOf(TabBody), PropTypes.object ] ))
}

export default TabView;