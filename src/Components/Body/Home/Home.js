import React , { Component } from 'react';
import OrderList from './OrderList.js';
import { FilterConstant } from './FilterConstant';
import FilterNav from './FilterNav.js';
import { WithAppState } from '../../Context/AppState';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterConstant : FilterConstant
        }

        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.onFilterNavClick = this.onFilterNavClick.bind(this);
        this.setFilterNavCount = this.setFilterNavCount.bind(this);
    }

    componentDidMount(){
        
        /*
        fetch("/Home/GetAllOrders",{ credentials : "same-origin"} )
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    var total = Math.ceil(result.length/10);
                    var onpage = this.state.onpage;
                    var displayOrders  = result.slice( (onpage-1)*10 , (onpage-1)* 10 + 10);
                    this.setState({
                        orders : result,
                        total : total,
                        displayed : displayOrders
                    });
                    this.props.context.Loader.CloseLoader();
                },
                (error) => {
                    console.log(error);
                }
            )
            */
    }

    previousPage(){
        var page = this.state.onpage
        page = page -1 ;
        if(page <= 0){
            page = 1;
        }
        var displayOrders  = this.state.orders.slice( (page-1)*10 , (page-1)* 10 + 10);
        this.setState({
            onpage : page,
            displayed : displayOrders
        })
    }

    nextPage(){
        var page = this.state.onpage
        page = page + 1 ;
        if(page > this.state.total){
            page = this.state.total;
        }
        var displayOrders  = this.state.orders.slice( (page-1)*10 , (page-1)* 10 + 10);
        this.setState({
            onpage : page,
            displayed : displayOrders
        })
    }

    onFilterNavClick(Key){
        var filterConstant = this.state.filterConstant.map(
            (filter) => {
                if(filter.Key == Key)
                    return {...filter,isActive : true}
                else
                    return {...filter,isActive : false}
            }
        );

        this.setState({ filterConstant : filterConstant });
    }

    setFilterNavCount(Key,Count){
        var filterConstant = this.state.filterConstant.map(
            (filter) => {
                if(filter.Key == Key)
                    return {...filter,Count : Count}
                return filter;
            }
        );

        this.setState({ filterConstant : filterConstant });
    }

    render(){
        return(
            <div id="BodyViewPort" className="container-fluid vp-body-bg-white">
                <div id="Home" className="row">
                    <div className="col-md-12 padding-zero">
                        
                        <div className="row box-shadow-bottom margin-zero">
                            <div className="col-md-12 padding-zero">
                                {
                                    this.state.filterConstant.map((filter,key) => (
                                        <FilterNav key={key} description={filter.Key} isActive={filter.isActive} URL={filter.URL} onClick={ this.onFilterNavClick } count={filter.Count}/>)
                                        )
                                }
                            </div>
                        </div>

                        {
                            this.state.filterConstant.map((filter,key) => (
                                        <OrderList key={key} URL={filter.URL} isActive={filter.isActive} Key={filter.Key} setFilterNavCount = {this.setFilterNavCount} />
                                    )
                                )
                        }

                    </div>
                </div>
            </div>
        );

    }
}

export default Home = WithAppState(Home);