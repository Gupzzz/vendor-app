import React, { Component } from 'react';
import { WithAppState } from '../../Context/AppState.js';

class Help extends Component{

    constructor(props){
        super(props);

        this.state = {
            documents : null,
            videos : null
        }

    }   
    
    componentDidMount(){
        
        this.props.context.Loader.OpenLoader();
        fetch("/Home/Help",{ credentials : "same-origin"} )
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    documents : result,
                });
                this.props.context.Loader.CloseLoader();
            },
            (error) => {
                console.log(error);
            }
        );

    }

    GetDocumentUI(document, key){
        let urlkeys = document.DocumentKey.split(".");

        let URL = "/DocumentDelivery/UserGuideResource?guideType="+ urlkeys[0] +"&guideVersion=" + urlkeys[1];
        return(
            <div className="vp-document-container" key={key} onClick={() => { window.open(URL); }}>
                <div className="vp-document-body">

                </div>
                <div className="vp-document-footer">
                    { document.Description }
                </div>
            </div>
        );
    }

    render(){
        let documentArray = "loading"

        if(this.state.documents != null)
        {
            documentArray = this.state.documents.map((document, key) => this.GetDocumentUI(document,key));
        }

        return (
            <div id="BodyViewPort" className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="vp-card  margin-top-medium" >
                            <div className="vp-card-header vp-score-header-bg">
                                User Guides
                            </div>
                            <div className="vp-card-container vp-score-con-pad">
                                
                                { documentArray }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="vp-card  margin-top-medium" >
                            <div className="vp-card-header vp-score-header-bg">
                                Video Tutorials
                            </div>
                            <div className="vp-card-container vp-score-con-pad">
                                <iframe className="vp-video" src="https://www.youtube.com/embed/ZyQJfM5aO6A" frameBorder="0" allowFullScreen></iframe>
                                <iframe className="vp-video" src="https://www.youtube.com/embed/ZyQJfM5aO6A" frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Help = WithAppState(Help);