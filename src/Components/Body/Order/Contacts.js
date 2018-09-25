import React, { Component } from 'react';

const Contacts = ({contact}) => {
    return (
        <div className="vp-orderViewList">
            <div className="vp-orderViewList-body">
                <div className="vp-orderViewList-row ">
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            ContactType
                        </div>
                        <div className="vp-orderViewList-value">
                            { contact.ContactType }
                        </div>
                    </div>
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            FirstName
                        </div>
                        <div className="vp-orderViewList-value">
                            { contact.FirstName }
                        </div>
                    </div>
                    <div className="vp-orderViewList-col-3">
                        <div className="vp-orderViewList-key">
                            LastName
                        </div>
                        <div className="vp-orderViewList-value">
                            { contact.LastName }
                        </div>
                    </div>
                </div>
                <div className="vp-orderViewList-row ">
                    <div className="vp-orderViewList-col">
                        <div className="vp-orderViewList-key">
                            Phones
                        </div>
                        <div className="vp-orderViewList-value">
                            { contact.PhoneList.trim().split("<br/>").join(", ") }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;