import React, { Component } from 'react';

class Notification extends Component{
    render(){
        return(
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <i className="glyphicon glyphicon-bell nav-notification"/><span className="badge xome-badge">4</span>
                </a>
                <div className="dropdown-menu notification-menu">
                    <div className="notification-header">
                        <div className="notification-header-content">Notification</div>
                        <div className="btn btn-default notification-clear-btn"><i className="glyphicon glyphicon-align-right" /></div>
                    </div>
                    <div className="notification-body">
                        <div className="notification">notification 1 notification 1 notification 1 notification 1 notification 1 notification 1 notification 1 notification 1  </div>
                        <div className="notification">notification 2</div>
                        <div className="notification">notification 3</div>
                        <div className="notification">notification 4</div>
                        <div className="notification">notification 4</div>
                    </div>
                </div>
            </li>
        );
    }
}

export default Notification;