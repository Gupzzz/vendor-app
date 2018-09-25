import React, {Component} from 'react';

class Loader extends Component {

    render(){
        let { isOpen } = this.props;

        if( isOpen ){
            return (
                <div id="loader" className="loader-body">
                    <div className="loader"></div>
                </div>
            );
        }
        return "";
    }
}

export default Loader;