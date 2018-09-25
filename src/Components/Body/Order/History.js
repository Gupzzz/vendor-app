import React, { Component } from 'react';

const History = ({ history }) => {
    return (
        <div className="vp-orderViewList">
            <div className="vp-orderViewList-body">
                <div className="vp-orderViewList-row ">
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            Description
                        </div>
                        <div className="vp-orderViewList-value">
                            { history.Description }
                        </div>
                    </div>
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            UpdatedOn
                        </div>
                        <div className="vp-orderViewList-value">
                            { (new Date(Number(history.Created.match(/\d+/)[0]))).toDateString() }
                        </div>
                    </div>
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            UpdatedBy
                        </div>
                        <div className="vp-orderViewList-value">
                            { history.UpdatedBy }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;