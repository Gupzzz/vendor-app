import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { WithAppState } from '../../Context/AppState.js';
import Modal from '../../UI-Util/Modal';

class OrderListView extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            IsAcceptModalOpen : false,
            IsDeclineModalOpen : false,
            IsConditionalAccept : false,
            AcceptOrderViewData : null
        }

        this.getOrderAcceptViewData = this.getOrderAcceptViewData.bind(this);
        this.openOrderAcceptModal = this.openOrderAcceptModal.bind(this);
        this.closeOrderAcceptModal = this.closeOrderAcceptModal.bind(this);
        this.openConditionllyAccept = this.openConditionllyAccept.bind(this);
    }

   
    render(){
        const { order } = this.props;
        var returnObject = []
        return this.getInProgress(order,this.props.history);
    }

    getInProgress(order,history){
        return(
            <div id={"OrderListView"+order.OrderID} key={order.OrderID} className="order-list-view">
                <div className="order-list-view-body-content">
                    <div className="order-list-view-body-content-row">
                        <div className="order-list-view-body-content-col-3">
                            <div className="order-list-view-body-content-key">ORDER #</div>
                            <div className="order-list-view-body-content-value">
                                {order.OrderID}.{order.OrderItemID}
                            </div>
                        </div>
                        <div className="order-list-view-body-content-col-7">
                            <div className="order-list-view-body-content-key">ADDRESS</div>
                            <div className="order-list-view-body-content-value">
                                <span className="glyphicon glyphicon-map-marker xome-text"/> {order.SubjectProperty}
                            </div>
                        </div>
                    </div>
                    <div className="order-list-view-body-content-row" >
                        <div className="order-list-view-body-content-col-7">
                            <div className="order-list-view-body-content-key">CLIENT NAME</div>
                            <div className="order-list-view-body-content-value">{order.ClientName}</div>
                        </div>
                    </div>
                    <div className="order-list-view-body-content-row">
                        <div className="order-list-view-body-content-col-3">
                            <div className="order-list-view-body-content-key">FEE</div>
                            <div className="order-list-view-body-content-value">{order.Fee} $</div>
                        </div>
                        <div className="order-list-view-body-content-col-3">
                            <div className="order-list-view-body-content-key">PRODUCT</div>
                            <div className="order-list-view-body-content-value">{order.ProductName}</div>
                        </div>
                        <div className="order-list-view-body-content-col-3">
                            <div className="order-list-view-body-content-key">DUE DATE</div>
                            <div className="order-list-view-body-content-value">{ (new Date(Number(order.DueDate.match(/\d+/)[0]))).toDateString() }</div>
                        </div>
                    </div>
                </div>
                <div className="order-list-view-body-footer">
                    <div className="order-list-view-body-buttons">                        
                        <div className="order-list-view-body-btn" onClick={() => history.push('UI/order/'+order.OrderID+'/'+order.OrderItemID)}> 
                            <div className="order-list-view-body-btn-icon"><span className="glyphicon glyphicon-info-sign xome-text" /></div>
                            <div className="order-list-view-body-btn-text"> Detials </div>
                        </div>
                        <div className="order-list-view-body-btn" onClick={() => this.openOrderAcceptModal()}>
                            <div className="order-list-view-body-btn-icon"><span className="glyphicon glyphicon-ok-sign xome-text" /></div>
                            <div className="order-list-view-body-btn-text"> Accept </div>
                        </div>
                        <div className="order-list-view-body-btn">
                            <div className="order-list-view-body-btn-icon"><span className="glyphicon glyphicon-question-sign xome-text" /></div>
                            <div className="order-list-view-body-btn-text"> Conditionally Accept </div>
                        </div>
                        <div className="order-list-view-body-btn">
                            <div className="order-list-view-body-btn-icon"><span className="glyphicon glyphicon-remove-sign xome-text" /></div>
                            <div className="order-list-view-body-btn-text"> Reject </div>
                        </div>
                    </div>
                </div>
                { this.getOrderAcceptModal() }
            </div>
            
        );
    }

    getOrderAcceptViewData(){
        
        this.props.context.Loader.OpenLoader();
        let URL = "/Orders/AcceptOrderModal/" + this.props.order.OrderID+"/"+this.props.order.OrderItemID;
        fetch(URL,{ credentials : "same-origin"} )
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    AcceptOrderViewData : result,
                    IsAcceptModalOpen : true
                });
                console.log(result);
                this.props.context.Loader.CloseLoader();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    openOrderAcceptModal(){
        if(this.state.AcceptOrderViewData != null){
            this.setState({
                IsAcceptModalOpen : true
            });
        }
        else{
            this.getOrderAcceptViewData();
        }
        
    }

    closeOrderAcceptModal(){
        this.setState({
            IsAcceptModalOpen : false
        });
    }

    openConditionllyAccept(){
        this.setState((prevState) => ({
            IsConditionalAccept : !prevState.IsConditionalAccept
        }));
    }

    getOrderAcceptModal() {
        if(this.state.AcceptOrderViewData != null){
            const { AcceptOrderViewData } = this.state;

            return (
                <Modal id="AcceptModal" isOpen={this.state.IsAcceptModalOpen} >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header padding-bottom-zero">
                                <button type="button" className="close" onClick={ () => this.closeOrderAcceptModal() } aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title"> <span className="glyphicon glyphicon-ok-sign order-view-accept-bg" /> Order Accept</h4>
                                <p className="vp-model-header-content">
                                    Details of this new order are provided below. By accepting this assignment, you
                                    agree to provide the indicated product in accordance with your vendor contract and/or
                                    the instructions provided below. This includes the date the final report is required
                                    and the fee from your service profile.
                                </p>
                            </div>
                            <div className="modal-body bg-grey">
                            
                                { 
                                    AcceptOrderViewData.OrderDetails.RushOrder ? 
                                        (<div id="RushOrderNote" class="alert alert-danger">
                                            Please take note of the <strong>due date</strong>. This is a rush order.
                                        </div>) 
                                        :
                                        ""
                                }

                                <div className="order-list-view-body-content order-accept-modal-order-view">
                                    <div className="order-list-view-body-content-row">
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">ORDER #</div>
                                            <div className="order-list-view-body-content-value">
                                                {AcceptOrderViewData.OrderDetails.OrderID}.{AcceptOrderViewData.OrderDetails.OrderItemID}
                                            </div>
                                        </div>
                                        <div className="order-list-view-body-content-col-7">
                                            <div className="order-list-view-body-content-key">SUBJECT ADDRESS</div>
                                            <div className="order-list-view-body-content-value">
                                                <span className="glyphicon glyphicon-map-marker xome-text"/> {AcceptOrderViewData.OrderDetails.SubjectAddress}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order-list-view-body-content-row">
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">LOAN PURPOSE</div>
                                            <div className="order-list-view-body-content-value">{AcceptOrderViewData.OrderDetails.LoanPurpose}</div>
                                        </div>
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">LOAN NUMBER</div>
                                            <div className="order-list-view-body-content-value">{AcceptOrderViewData.OrderDetails.LoanNumber}</div>
                                        </div>
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">FHA CASE NUMBER</div>
                                            <div className="order-list-view-body-content-value">{AcceptOrderViewData.OrderDetails.FHACaseNumber} </div>
                                        </div>
                                    </div>
                                    <div className="order-list-view-body-content-row">
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">PRODUCT</div>
                                            <div className="order-list-view-body-content-value">{AcceptOrderViewData.OrderDetails.ProductName}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-list-view-body-content order-accept-modal-order-view">
                                    <div className="order-list-view-body-content-row">
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">CLIENT</div>
                                            <div className="order-list-view-body-content-value">
                                                {AcceptOrderViewData.OrderDetails.ClientName}
                                            </div>
                                        </div>
                                        <div className="order-list-view-body-content-col-7">
                                            <div className="order-list-view-body-content-key">CLIENT ADDRESS</div>
                                            <div className="order-list-view-body-content-value">
                                                <span className="glyphicon glyphicon-map-marker xome-text"/> {AcceptOrderViewData.OrderDetails.ClientAddress}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-list-view-body-content-row">
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">FEE</div>
                                            <div className="order-list-view-body-content-value">{AcceptOrderViewData.OrderDetails.VendorFee} $</div>
                                        </div>
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">  </div>
                                            <div className="order-list-view-body-content-value">
                                            {
                                                AcceptOrderViewData.HasEngagementLetter ? 
                                                (
                                                    <a id="EngagementLetter" href={AcceptOrderViewData.EngagementLetterUrl} className="btn btn-warning vp-engagement-btn" target="_blank">
                                                        <i className="glyphicon glyphicon-open-file xome-text"></i> Engagement Letter
                                                    </a>
                                                )
                                                :
                                                ""
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-list-view-body-content order-accept-modal-order-view">
                                    <div className="order-list-view-body-content-row">
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">ASSIGNED ON</div>
                                            <div className="order-list-view-body-content-value">{AcceptOrderViewData.OrderDetails.AssignedDateDisplay} </div>
                                        </div>
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">ACCEPT BY</div>
                                            <div className="order-list-view-body-content-value">{AcceptOrderViewData.OrderDetails.AcceptByDateDisplay}</div>
                                        </div>
                                        <div className="order-list-view-body-content-col-3">
                                            <div className="order-list-view-body-content-key">DUE BY</div>
                                            <div className="order-list-view-body-content-value">{AcceptOrderViewData.OrderDetails.VendorDueDateDisplay}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="vp-conditionallyaccept">
                                    <div className="vp-conditionallyaccept-btn-div">
                                        <div className="btn xome-btn vp-ca-btn" onClick={() => this.openConditionllyAccept() } ><i className="glyphicon glyphicon-question-sign" />Conditionally Accept</div>
                                    </div>
                                    { this.state.IsConditionalAccept ?
                                        (<div className="vp-conditionallyaccept-form-div">
                                            <div className="vp-ca-arrow-con">
                                                <div className="vp-ca-arrow">
                                                    <div className="glyphicon glyphicon-triangle-top" />
                                                </div>
                                            </div>
                                            <div className="vp-form-con">
                                                <div className="vp-form-row">
                                                    <div className="vp-form-col-3">
                                                        <div className="order-list-view-body-content-key">
                                                            DUE DATE
                                                        </div>
                                                        <div className="order-list-view-body-content-value">
                                                            <div className="input-group">
                                                                <span className="input-group-addon" id="basic-addon1"><i className="glyphicon glyphicon-calendar" /></span>
                                                                <input type="date" className="form-control" placeholder="Due Date" aria-describedby="basic-addon1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="vp-form-col-3">
                                                        <div className="order-list-view-body-content-key">
                                                            FEE
                                                        </div>
                                                        <div className="order-list-view-body-content-value">
                                                            <div className="input-group">
                                                                <span className="input-group-addon" id="basic-addon1">$</span>
                                                                <input type="number" className="form-control" placeholder="Fee" aria-describedby="basic-addon1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="vp-form-col-3">
                                                        <div className="order-list-view-body-content-key">
                                                            COMMENTS
                                                        </div>
                                                        <div className="order-list-view-body-content-value">
                                                            <div className="input-group">
                                                                <span className="input-group-addon" id="basic-addon1">@</span>
                                                                <input type="text" className="form-control" placeholder="Comment" aria-describedby="basic-addon1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>) 
                                        :
                                        ""
                                    }

                                    <div className="alert alert-info margin-top-medium" role="alert">
                                        An order is NOT accepted until you click the ACCEPT button below. <strong>If you are negotiating, do not start work until it has been accepted and shows up in the <i>Orders In Progress</i> tab.</strong>
                                    </div>

                                    <div className="order-list-view-body-content">
                                        { 
                                            AcceptOrderViewData.CompetencyStatement != null && AcceptOrderViewData.CompetencyStatement !== "" ?
                                            AcceptOrderViewData.CompetencyStatement 
                                            :
                                            ""
                                        }
                                    </div>

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Accept</button>
                                <button type="button" className="btn btn-default" onClick={ () => this.closeOrderAcceptModal() } >Close</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            );
        }
        return "";
    }

}

export default withRouter(WithAppState(OrderListView));


            
/* 
<div className="btn btn-default order-list-view-body-btn" onClick={() => history.push('/order/'+order.OrderID+'/'+order.OrderItemID)}> <span className="glyphicon glyphicon-info-sign xome-text" /> Detials</div>
<div className="btn btn-default order-list-view-body-btn"><span className="glyphicon glyphicon-ok-sign xome-text" /> Accept </div>
<div className="btn btn-default order-list-view-body-btn"> <span className="glyphicon glyphicon-question-sign xome-text" />  Conditionally Accept</div>
<div className="btn btn-default order-list-view-body-btn"><span className="glyphicon glyphicon-remove-sign xome-text" /> Reject</div>
*/

/*

*/