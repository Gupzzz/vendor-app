import React, { Component } from 'react';

const Documents = ({ document }) => {
    return (
        <div className="vp-orderViewList">
            <div className="vp-orderViewList-body">
                <div className="vp-orderViewList-row ">
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            Doc-Description
                        </div>
                        <div className="vp-orderViewList-value">
                            { document.Description }
                        </div>
                    </div>
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            Type
                        </div>
                        <div className="vp-orderViewList-value">
                            { document.TypeDescription }
                        </div>
                    </div>
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            Format
                        </div>
                        <div className="vp-orderViewList-value">
                            { document.FormatDescription }
                        </div>
                    </div>
                </div>
                <div className="vp-orderViewList-row ">
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            SubmittedDate
                        </div>
                        <div className="vp-orderViewList-value">
                            { (new Date(Number(document.CreationDate.match(/\d+/)[0]))).toDateString() }
                        </div>
                    </div>
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key"/>
                        <div className="vp-orderViewList-value">
                            <div className="vp-orderViewList-btn" onClick={() => { window.open(document.QualifiedPath) }} > <span className="glyphicon glyphicon-eye-open" /> View    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;