import React from 'react';

const ActionButtons = ({ action }) => {
    return (
        <div className="vp-actionButtons">
            <div className="btn-group">
                <button type="button" className="btn xome-btn vp-actionBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="glyphicon glyphicon-open" /> Upload Document <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    <li> <a> Upload Supporting Document </a> </li>
                    <li><a>Another action</a></li>
                    <li><a>Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a>Separated link</a></li>
                </ul>
            </div>
            {
                action.AnalyticsAvailable ? "" : <a className="btn xome-btn vp-actionBtn"><span className="glyphicon glyphicon-info-sign" /> Subject Analytics</a>
            }

            {
                action.IsAppointmentRequired ? "" : <a className="btn xome-btn vp-actionBtn"><span className="glyphicon glyphicon-calendar" /> Set Appointment Time</a>
            }

            {
                action.IsAppointmentRequired ? "" : <a className="btn xome-btn vp-actionBtn"><span className="glyphicon glyphicon-ok-sign" /> Inspection Complete</a>
            }
            
            <a className="btn xome-btn vp-actionBtn"><span className="glyphicon glyphicon-comment" /> Add Comment</a>
            
            {
                action.MapAvailable ? "" : <a className="btn xome-btn vp-actionBtn"><span className="glyphicon glyphicon-pushpin" /> Map</a>
            }

        </div>
    );
};

export default ActionButtons;