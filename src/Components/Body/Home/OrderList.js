import React , { Component } from 'react';
import OrderListView from  './OrderListView.js'
import { WithAppState } from '../../Context/AppState.js';

class OrderList extends Component{

    constructor(props){
        super(props);
        this.state = {
            orders : null
        }
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    componentDidMount(){
        
        const { URL, setFilterNavCount, Key } = this.props;
        if(URL != null){
            this.props.context.Loader.OpenLoader();
            fetch(URL,{ credentials : "same-origin"} )
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        orders : result,
                    });
                    setFilterNavCount(Key,result.length);
                    this.props.context.Loader.CloseLoader();
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        else {
            setFilterNavCount(Key,0);
        }
    }

    componentWillUnmount(){
    }

    render(){

        if(this.props.isActive){
            if(this.state.orders == null)
            {
                return (
                    <div className="row margin-zero margin-top-medium">
                        <div className="col-md-12">
                            Loading...
                        </div>
                    </div>
                )    
            }
            else if(this.state.orders.length == 0){
                return (
                    <div className="row margin-zero">
                        <div className="col-md-12">
                            No Item to Display.
                        </div>
                    </div>
                );
            }
            else{
                return (
                    <div className="row margin-zero margin-top-medium">
                        <div className="col-md-12">
                            {   
                                this.state.orders.map((order,key) => <OrderListView key={key} order={order} />)
                            }
                        </div>
                    </div>
                );
            }
        }
        else{
            return '';
        }
    }
}

export default OrderList = WithAppState(OrderList);