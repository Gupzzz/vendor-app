import React, { Component } from 'react';
import { WithAppState } from '../../Context/AppState.js';

class Profile extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            VendorLicences : null,
            VendorVacations : null
        }

    }

componentDidMount(){
    fetch("/Vendor/VendorLicensesAjaxGridSelect",{ credentials : "same-origin"} )
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result);
            this.setState({
                VendorLicences : result,
            });
        },
        (error) => {
            console.log(error);
        }
    );

    fetch("/Vendor/VendorVacationsAjaxGridSelect",{ credentials : "same-origin"} )
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result);
            this.setState({
                VendorVacations : result,
            });
        },
        (error) => {
            console.log(error);
        }
    );
}


    render(){

        const { User } = this.props.context;
        console.log(User);

        if(User.VendorDetailsModel == null || User.VendorDetailsModel == undefined){
            return "";
        }

        let displayWord = '';
        if(User.VendorDetailsModel.FirstName != "" && User.VendorDetailsModel.FirstName != null && User.VendorDetailsModel.FirstName != undefined)
        {
            displayWord = User.VendorDetailsModel.FirstName[0].toUpperCase();
        }

        if(User.VendorDetailsModel.LastName != "" && User.VendorDetailsModel.LastName != null && User.VendorDetailsModel.LastName != undefined)
        {
            displayWord = displayWord + User.VendorDetailsModel.LastName[0].toUpperCase();
        }

        return (<div id="BodyViewPort" className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="vp-card margin-top-medium" >
                                <div className="vp-card-header">
                                    <div className="vp-profile">
                                        <div className="vp-profile-container">
                                            { displayWord }
                                        </div>
                                    </div>
                                </div>
                                <div className="vp-card-container padding-medium">
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">VendorId</div>
                                        <div className="vp-profile-value"> { User.VendorDetailsModel.VendorID }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">FirstName</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.FirstName }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">LastName</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.LastName }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Address</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.BillingAddress.Address1 + " " + User.VendorDetailsModel.BillingAddress.Address2 }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">City</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.BillingAddress.City }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">State</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.BillingAddress.State }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Zip</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.BillingAddress.PostalCode }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Email</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.Email }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Phone</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.WorkPhone }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Mobile</div>
                                        <div className="vp-profile-value">{ User.VendorDetailsModel.MobilePhone }</div>
                                    </div>
                                </div>
                                <div className="vp-card-footer">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="vp-card margin-top-medium" >
                                <div className="vp-card-header vp-profile-header">
                                    Background Check
                                </div>
                                <div className="vp-card-container vp-score-con-pad">
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Expiration Date</div>
                                        <div className="vp-profile-value"> { (new Date(Number(User.VendorDetailsModel.ExpirtationDate.match(/\d+/)[0]))).toDateString("dd/mm/yyyy") }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="vp-card margin-top-medium" >
                                <div className="vp-card-header vp-profile-header">
                                    Error and Omission
                                </div>
                                <div className="vp-card-container vp-score-con-pad">
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Expiration Date</div>
                                        <div className="vp-profile-value"> {  (new Date(Number(User.VendorDetailsModel.ExpirtationDate.match(/\d+/)[0]))).toDateString("dd/mm/yyyy") }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Policy Number</div>
                                        <div className="vp-profile-value"> { User.VendorDetailsModel.PolicyNumber }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Carrier</div>
                                        <div className="vp-profile-value"> { User.VendorDetailsModel.InsuranceCarrier }</div>
                                    </div>
                                    <div className="vp-profile-row">
                                        <div className="vp-profile-key">Personal E &amp; O Policy</div>
                                        <div className="vp-profile-value"> { User.VendorDetailsModel.PersonalEOInsurance ? "Yes" : "No"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="vp-card margin-top-medium" >
                                <div className="vp-card-header vp-profile-header">
                                    Vendor licences
                                </div>
                                <div className="vp-card-container vp-score-con-pad">
                                    { this.state.VendorLicences != null ?
                                        this.state.VendorLicences.map((licence,key) => (this.GetVendorLicenceTemplate(licence,key)))
                                        :
                                        "Loading..."    
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="vp-card margin-top-medium" >
                                <div className="vp-card-header vp-profile-header">
                                    Vendor Vacations
                                </div>
                                <div className="vp-card-container vp-score-con-pad">
                                    { this.state.VendorVacations != null ?
                                        this.state.VendorVacations.map((vacation,key) => (this.GetVendorVacationTemplate(vacation,key)))
                                        :
                                        "Loading..."    
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

    GetVendorLicenceTemplate(licence, key){
        return (
        <div className="vp-licence" key={key}>
        <div className="vp-licence-body">
            <div className="vp-licence-row">
                <div className="vp-licence-col-3">
                    <div className="vp-licence-key">
                        Licence Number
                    </div>
                    <div className="vp-licence-value">
                        { licence.LicenseNumber }
                    </div>
                </div>
                <div className="vp-licence-col-3">
                    <div className="vp-licence-key">
                        Licence Type
                    </div>
                    <div className="vp-licence-value">
                        { licence.LicenseType }
                    </div>
                </div>
                <div className="vp-licence-col-3">
                    <div className="vp-licence-key">
                        Issue State
                    </div>
                    <div className="vp-licence-value">
                        { licence.LicenseState }
                    </div>
                </div>
            </div>
            <div className="vp-licence-row">
                <div className="vp-licence-col-3">
                    <div className="vp-licence-key">
                        Expires On
                    </div>
                    <div className="vp-licence-value">
                        { licence.Expires }
                    </div>
                </div>
                <div className="vp-licence-col-7">
                    <div className="vp-licence-key">
                        Approvals
                    </div>
                    <div className="vp-licence-value">
                        <div className="vp-approval-badge">
                            FHA<div className="vp-approval-sign-ok glyphicon glyphicon-ok-circle" />
                        </div>
                        <div className="vp-approval-badge">
                            VAA<div className="vp-approval-sign-ok glyphicon glyphicon-ok-circle" />
                        </div>
                        <div className="vp-approval-badge">
                            Million +<div className="vp-approval-sign-remove glyphicon glyphicon-remove-circle" />
                        </div>
                        <div className="vp-approval-badge">
                            Manufactured<div className="vp-approval-sign-ok glyphicon glyphicon-ok-circle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="vp-licence-footer">
            <div className="vp-licence-btn">
                <div className="vp-licence-btn-icon"><span className="glyphicon glyphicon-trash" /></div>
                <div className="vp-licence-btn-text">Delete</div>
            </div>
            <div className="vp-licence-btn">
                <div className="vp-licence-btn-icon"><span className="glyphicon glyphicon-edit" /></div>
                <div className="vp-licence-btn-text">Edit</div>
            </div>
        </div>
    </div>);
    }

    GetVendorVacationTemplate(vacation, key){
        return (
        <div className="vp-licence" key={key}>
            <div className="vp-licence-body">
                <div className="vp-licence-row">
                    <div className="vp-licence-col-3">
                        <div className="vp-licence-key">
                            Start Date
                        </div>
                        <div className="vp-licence-value">
                            {  (new Date(Number(vacation.StartDate.match(/\d+/)[0]))).toDateString("dd/mm/yyyy") }
                        </div>
                    </div>
                    <div className="vp-licence-col-3">
                        <div className="vp-licence-key">
                            End Date
                        </div>
                        <div className="vp-licence-value">
                            { (new Date(Number(vacation.EndDate.match(/\d+/)[0]))).toDateString("dd/mm/yyyy") }
                        </div>
                    </div>
                </div>
                <div className="vp-licence-row">
                    <div className="vp-licence-col">
                        <div className="vp-licence-key">
                            Reason
                        </div>
                        <div className="vp-licence-value">
                            { vacation.Reason }
                        </div>
                    </div>
                </div>
            </div>
            <div className="vp-licence-footer">
                <div className="vp-licence-btn">
                    <div className="vp-licence-btn-icon"><span className="glyphicon glyphicon-trash" /></div>
                    <div className="vp-licence-btn-text">Delete</div>
                </div>
                <div className="vp-licence-btn">
                    <div className="vp-licence-btn-icon"><span className="glyphicon glyphicon-edit" /></div>
                    <div className="vp-licence-btn-text">Edit</div>
                </div>
            </div>
        </div>);
    }

}

export default Profile = WithAppState(Profile);