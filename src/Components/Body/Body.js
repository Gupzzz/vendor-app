import React , { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home'
import ScoreCard from './ScoreCard/ScoreCard';
import OrderView from './Order/OrderView';
import Help from './Help/Help'; 
import Profile from './Profile/Profile';

class Body extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.initializeBodyResizeListener();
    }

    initializeBodyResizeListener(){
        let headerHeight = document.getElementById("Header").offsetHeight;
        let footerHeight = document.getElementById("Footer").offsetHeight;
        let windowHeight = window.innerHeight;

        let bodyHeight = windowHeight - headerHeight - footerHeight - 37; // 37 is Top and Bottom Margin of Body Container

        $('#BodyContainer').css("min-height",(bodyHeight)+"px");

        $(window).resize(function() {
            let headerHeight = document.getElementById("Header").offsetHeight;
            let footerHeight = document.getElementById("Footer").offsetHeight;
            let windowHeight = window.innerHeight;
            let bodyHeight = windowHeight - headerHeight - footerHeight - 37; // 37 is Top and Bottom Margin of Body Container
            $('#BodyContainer').css("min-height",(bodyHeight)+"px");
        });
    }
    render(){

        return(
            <div id="BodyContainer" className="container bodyContainer">
                <div className="bodyWapper">
                        <Switch>
                            <Route exact path='/UI' component={Home}/>
                            <Route path='/UI/About' component={ScoreCard}/>
                            <Route path='/UI/ScoreCard' component={ScoreCard}/>
                            <Route path='/UI/Help' component={Help}/>
                            <Route path='/UI/order/:orderid/:orderitemid' component={OrderView} />
                            <Route path='/UI/Profile' component={Profile} />
                        </Switch>
                </div>
            </div>
        );

    }
}

export default Body;