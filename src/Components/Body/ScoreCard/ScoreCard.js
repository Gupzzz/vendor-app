import React, { Component } from 'react';
import { WithAppState } from '../../Context/AppState';
import ScoreTable from './ScoreTable';
import ScoreMetric from './ScoreMetric';

class ScoreCard extends Component{

    constructor(props){
        super(props);

        this.state = {};
        this.GetDashboardData = this.GetDashboardData.bind(this);
    }

    componentDidMount(){
        const URL = this.props.context.User.VendorDashboardAPIUrl;
        this.props.context.Loader.OpenLoader();
        if(URL != null){
            fetch(URL,{ credentials : "same-origin"} )
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        performanceData : result,
                    });
                    this.props.context.Loader.CloseLoader();
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.context.User.VendorDashboardAPIUrl !== prevProps.context.User.VendorDashboardAPIUrl) {
            this.GetDashboardData(this.props.context.User.VendorDashboardAPIUrl);
        }
    }

    GetDashboardData(URL){
        if(URL != null){
            fetch(URL,{ credentials : "same-origin"} )
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        performanceData : result,
                    });
                    this.props.context.Loader.CloseLoader();
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    render(){
        
        const { performanceData } = this.state;

        if(performanceData == undefined || performanceData == null)
            return (<h1>Loading...</h1>);
        else{

            const medalColor = {
                borderColor : performanceData.cscore.tierColor
            }

            return (
                <div id="BodyViewPort" className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="vp-card margin-top-medium" >
                                <div className="vp-card-header">
                                    <div className="vp-medal">
                                        <div className="vp-medal-outer-circle" style = { medalColor }>
                                            <div className="vp-medal-inner-circle">
                                            <span className="glyphicon glyphicon-star vp-medal-star" />
                                            </div>
                                        </div>
                                        <div className="vp-medal-ribbon" style = { medalColor }>
                                        </div>
                                    </div>
                                </div>
                                <div className="vp-card-container" style={ {textAlign:"center", marginTop:"-15px"} }>
                                    <span className="vp-performance-style">{ performanceData.cscore.metricsValue }</span>
                                    <span className="vp-performance-percent"> % </span>
                                </div>
                                <div className="vp-card-footer">
                                    {performanceData.cscore.metricsName}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="vp-card margin-top-medium" >
                                <div className="vp-card-header vp-score-header-bg">
                                { performanceData.cscore.heading }
                                </div>
                                <div className="vp-card-container vp-score-con-pad">
                                    <ScoreTable table={performanceData.cscore.table} />
                                    <div className="vp-score-definition">
                                        Your current score is calculated using the last 6 months of completed orders. The quality component represents 70% of your total score and the ontime percentage represents 30% of your total score.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="vp-card  margin-top-medium" >
                                <div className="vp-card-header vp-score-header-bg">
                                    PERFORMANCE METRICS
                                </div>
                                <div className="vp-card-container vp-score-con-pad">
                                The following metrics are provided to allow you greater insight into how you are performing throughout the life cycle of your orders. <b><u>These are added for your reference. As indicated above, your vendor score is based on Ontime delivery and quality.</u></b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            { performanceData.metrics[0] != undefined && performanceData.metrics[0] != null ? <ScoreMetric metric={ performanceData.metrics[0] } /> : "" }
                        </div>
                        <div className="col-md-4">
                            { performanceData.metrics[1] != undefined && performanceData.metrics[1] != null ? <ScoreMetric metric={ performanceData.metrics[1] } /> : "" }
                        </div>
                        <div className="col-md-4">
                            { performanceData.metrics[2] != undefined && performanceData.metrics[2] != null ? <ScoreMetric metric={ performanceData.metrics[2] } /> : "" }
                        </div>
                    </div>
                    <div className="row margin-top-medium">
                        <div className="col-md-4">
                            { performanceData.metrics[3] != undefined && performanceData.metrics[3] != null ? <ScoreMetric metric={ performanceData.metrics[3] } /> : "" }
                        </div>
                        <div className="col-md-4">
                            { performanceData.metrics[4] != undefined && performanceData.metrics[4] != null ? <ScoreMetric metric={ performanceData.metrics[4] } /> : "" }
                        </div>
                        <div className="col-md-4">
                            { performanceData.metrics[5] != undefined && performanceData.metrics[5] != null ? <ScoreMetric metric={ performanceData.metrics[5] } /> : "" }
                        </div>
                    </div>
            </div>
            );
        }
    }
}

export default ScoreCard  = WithAppState(ScoreCard);