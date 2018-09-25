import React, { Component } from 'react';
import { WithAppState } from '../../Context/AppState';
import Contacts from './Contacts';
import History from './History';
import Documents from './Documents';
import TabView from '../../UI-Util/TabView/TabView';
import TabHeader from '../../UI-Util/TabView/TabHeader';
import TabHeaderLinks from '../../UI-Util/TabView/TabHeaderLinks';
import TabBody from '../../UI-Util/TabView/TabBody';
import TabBodyContent from '../../UI-Util/TabView/TabBodyContent';
import ActionButtons from './ActionButtons';


class OrderView extends Component{

    constructor(props){
        super(props);

        this.state = {
            OrderDetails : null,
            OrderContacts : null,
            OrderDocuments : null,
            OrderHistory : null

        };

        this.OnOrderTabClick = this.OnOrderTabClick.bind(this);
    }

    componentDidMount(){
        this.props.context.Loader.OpenLoader();
        
        fetch("/Orders/UpdatePendingOrder/"+ this.props.match.params.orderid +"/"+ this.props.match.params.orderitemid +"/",{ credentials : "same-origin"} )
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState(result);
                this.props.context.Loader.CloseLoader();
            },  
            (error) => {
                console.log(error);
            }
        );

        fetch("/Orders/OrderContactsAjaxGridSelect/"+ this.props.match.params.orderid +"/"+ this.props.match.params.orderitemid +"/",{ credentials : "same-origin"} )
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({OrderContacts : result});
            },  
            (error) => {
                console.log(error);
            }
        );

        fetch("/Orders/StatusAndCommunicationHistoryAjaxGridSelect/"+ this.props.match.params.orderid +"/"+ this.props.match.params.orderitemid +"/",{ credentials : "same-origin"} )
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({ OrderHistory : result});
            },  
            (error) => {
                console.log(error);
            }
        );

        fetch("/Orders/ReferenceDocumentsAjaxGridSelect/"+ this.props.match.params.orderid +"/"+ this.props.match.params.orderitemid +"/",{ credentials : "same-origin"} )
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({ OrderDocuments : result});
            },  
            (error) => {
                console.log(error);
            }
        );
        
    }

    OnOrderTabClick(currentItem){
        this.setState({
            OrderTabs : {
                CurrentItem : currentItem 
            }
        });
    }

    render(){;


        if(this.state.OrderDetails == null)
            return "Loading";

        const {OrderDetails, OrderActions, OrderContacts, OrderDocuments, OrderHistory } = this.state;

        let ContactsUI;
        if(OrderContacts == null){
            ContactsUI = "Loading...";
        }
        else if(OrderContacts.length == 0){
            ContactsUI = "No Contact to display";
        }
        else{
            ContactsUI = OrderContacts.map((contact,index) => {
                return (<Contacts key={index} contact= {contact} />);
            });
        }

        let DocumentsUI;

        if(OrderDocuments == null){
            DocumentsUI = "Loading...";
        }
        else if(OrderDocuments.length == 0){
            DocumentsUI = "No Documents to display";
        }
        else{
            DocumentsUI = OrderDocuments.map((document,index) => {
                return (<Documents key={index} document= {document} />);
            });
        }

        let HistoryUI;

        if(OrderHistory == null){
            HistoryUI = "Loading...";
        }
        else if(OrderHistory.length == 0){
            HistoryUI = "No History to display";
        }
        else{
            HistoryUI = OrderHistory.map((history,index) => {
                return (<History key={index} history= {history} />);
            });
        }


        return (
            <div id="BodyViewPort" className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {   this.GetOrderDetailsTemplate(OrderDetails.OrderDetails, OrderActions.EngagementLetterUrl) }
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-12">
                        <ActionButtons action={OrderActions} />
                    </div>
                </div>
                <div className="row box-shadow-bottom margin-zero">
                    <div className="col-md-12 padding-zero">
                        <TabView>
                            <TabHeader>
                                <TabHeaderLinks id="Contacts"> Contacts </TabHeaderLinks>
                                <TabHeaderLinks id="History"> History </TabHeaderLinks>
                                <TabHeaderLinks id="Document"> Document </TabHeaderLinks>
                                <TabHeaderLinks id="Instruction"> Instruction </TabHeaderLinks>
                            </TabHeader>
                            <TabBody>
                                <TabBodyContent forId="Contacts">
                                    { ContactsUI }
                                </TabBodyContent>
                                <TabBodyContent forId="History">
                                    { HistoryUI }
                                </TabBodyContent>
                                <TabBodyContent forId="Document">
                                   { DocumentsUI }
                                </TabBodyContent>
                                <TabBodyContent forId="Instruction">
                                    <div dangerouslySetInnerHTML={ { __html : this.state.Instructions } } />
                                </TabBodyContent>
                            </TabBody>
                        </TabView>
                    </div>
                </div>
            </div>);
    }

    GetOrderDetailsTemplate(OrderDetails, EngagementLetterUrl){

        return (
        <React.Fragment>
            <div className="order-list-view-body-content order-accept-modal-order-view">
                <div className="order-list-view-body-content-row">
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">ORDER #</div>
                        <div className="order-list-view-body-content-value">
                            { OrderDetails.OrderID}.{OrderDetails.OrderItemID}
                        </div>
                    </div>
                    <div className="order-list-view-body-content-col-7">
                        <div className="order-list-view-body-content-key">SUBJECT ADDRESS</div>
                        <div className="order-list-view-body-content-value">
                            <span className="glyphicon glyphicon-map-marker xome-text"/> {OrderDetails.SubjectAddress}
                        </div>
                    </div>
                </div>

                <div className="order-list-view-body-content-row">
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">LOAN PURPOSE</div>
                        <div className="order-list-view-body-content-value">{OrderDetails.LoanPurpose}</div>
                    </div>
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">LOAN NUMBER</div>
                        <div className="order-list-view-body-content-value">{OrderDetails.LoanNumber}</div>
                    </div>
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">FHA CASE NUMBER</div>
                        <div className="order-list-view-body-content-value">{OrderDetails.FHACaseNumber} </div>
                    </div>
                </div>
                <div className="order-list-view-body-content-row">
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">PRODUCT</div>
                        <div className="order-list-view-body-content-value">{OrderDetails.ProductName}</div>
                    </div>
                </div>
            </div>

            <div className="order-list-view-body-content order-accept-modal-order-view">
                <div className="order-list-view-body-content-row">
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">CLIENT</div>
                        <div className="order-list-view-body-content-value">
                            {OrderDetails.ClientName}
                        </div>
                    </div>
                    <div className="order-list-view-body-content-col-7">
                        <div className="order-list-view-body-content-key">CLIENT ADDRESS</div>
                        <div className="order-list-view-body-content-value">
                            <span className="glyphicon glyphicon-map-marker xome-text"/> {OrderDetails.ClientAddress}
                        </div>
                    </div>
                </div>
                <div className="order-list-view-body-content-row">
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">FEE</div>
                        <div className="order-list-view-body-content-value">{OrderDetails.VendorFee} $</div>
                    </div>
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">  </div>
                        <div className="order-list-view-body-content-value">
                        {
                            EngagementLetterUrl != null && EngagementLetterUrl != undefined && EngagementLetterUrl != "" ? 
                            (
                                <a id="EngagementLetter" href={EngagementLetterUrl} className="btn btn-warning vp-engagement-btn" target="_blank">
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
                        <div className="order-list-view-body-content-value">{OrderDetails.AssignedDateDisplay} </div>
                    </div>
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">ACCEPT BY</div>
                        <div className="order-list-view-body-content-value">{OrderDetails.AcceptByDateDisplay}</div>
                    </div>
                    <div className="order-list-view-body-content-col-3">
                        <div className="order-list-view-body-content-key">DUE BY</div>
                        <div className="order-list-view-body-content-value">{OrderDetails.VendorDueDateDisplay}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );
    }

}

export default OrderView = WithAppState(OrderView);