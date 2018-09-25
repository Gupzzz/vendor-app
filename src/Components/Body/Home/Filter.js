import React , { Component } from 'react';
class Filter extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            isNewSelected : false,
            isInProgressSelected : false,
            isCorrectionSelected : false
        };
        
        this.IsActive = this.IsActive.bind(this);
        this.OnNewSelected = this.OnNewSelected.bind(this);
        this.OnProgressSelected = this.OnProgressSelected.bind(this);
        this.OnCorrectionSelected = this.OnCorrectionSelected.bind(this);
    }

    OnNewSelected(){
        this.setState({isNewSelected : !this.state.isNewSelected});
    }

    OnProgressSelected(){
        this.setState({isInProgressSelected : !this.state.isInProgressSelected});
    }

    OnCorrectionSelected(){
        this.setState({isCorrectionSelected : !this.state.isCorrectionSelected});
    }

    IsActive(value){
        return value ? " active" : "";
    }

    render(){
        return(
            
            <div className="row">
                <div className="col-md-12 padding-zero">

                    <div id="Filter" className="navbar navbar-default filter-style">

                        <div className="navbar-header">
                        
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#filter-collapse" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="glyphicon glyphicon-filter"></span>
                            </button>

                            <div className="navbar-brand">
                                Filter :
                            </div>
                            
                        </div>

                        <div className="collapse navbar-collapse" id="filter-collapse">
                            
                            <ul className="nav navbar-nav">
                                
                                <li>
                                    <button className={"btn btn-default filter-button" + this.IsActive(this.state.isNewSelected)} onClick={this.OnNewSelected}> New </button>
                                </li>

                                <li>
                                    <div className="btn-group filter-button">
                                        <button type="button" className={"btn btn-default" + this.IsActive(this.state.isInProgressSelected)} onClick={this.OnProgressSelected}>InProgress</button>
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="caret"></span>
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a>Call &amp; Schedule</a></li>
                                            <li><a>Contact Proposed Date</a></li>
                                            <li><a>Review Proposed Date</a></li>
                                            <li><a>Open Order</a></li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <button className={"btn btn-default filter-button" + this.IsActive(this.state.isCorrectionSelected)} onClick={this.OnCorrectionSelected} > Correction </button>
                                </li>

                            </ul>
                            
                            <form className="navbar-form navbar-right" role="search">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="exampleInputAmount" placeholder="Search"/>
                                        <div className="btn input-group-addon"><i className="glyphicon glyphicon-search"/></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Filter;