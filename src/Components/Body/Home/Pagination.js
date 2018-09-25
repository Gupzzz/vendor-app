import React , { Component } from 'react';

class Pagination extends Component{
    
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="order-view-pagination">
                        <div className="order-view-pagination-left-btn">
                            <button className="btn btn-default" onClick={this.props.prev} ><i className="glyphicon glyphicon-chevron-left" /> Prev</button>
                        </div>
                        <div className="order-view-pagination-center-span">
                            {this.props.onpage} of {this.props.total} Pages
                        </div>
                        <div className="order-view-pagination-right-btn">
                            <button className="btn btn-default float-right" onClick={this.props.next} ><i className="glyphicon glyphicon-chevron-right" /> Next</button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default Pagination;