import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Footer extends Component{
    render(){
        return(
            <div id="Footer" className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 vp-footer-hr">
                            <div className="vp-footer-header">
                                Links
                            </div>
                            <div className="vp-footer-links">
                                <ul>
                                    <li><Link to="/UI" >Orders</Link></li>
                                    <li><Link to="/UI/ScoreCard" >DashBoard</Link></li>
                                    <li><Link to="/UI/Help" >Help</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-4 vp-footer-hr">
                            <div className="vp-footer-header">
                                Xome
                            </div>
                            <div className="vp-footer-links">
                                <ul>
                                    <li><a href="https://www.xome.com" target="_blank">Xome.com</a></li>
                                    <li><a href="https://www.xome.com/auctions/" target="_blank">Xome Auction</a></li>
                                    <li><a href="https://www.xome.com/pages/xome-valuation" target="_blank">Xome Valuation</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="vp_logo" style={{marginTop: "20px"}}>
                                <span className="vp_logo">Xome Valuation</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm padding-medium   ">
                            <a href="/auctions/licensing" target="_top">Xome Real Estate and Auction Licensing</a> Copyright © 2018 Xome Inc. All rights reserved. Xome Inc./Xome CT LLC (Davis E. Owen, Sr.- Broker)(CT properties only), 750 Highway 121 BYP, Suite 100, Lewisville, TX 75067. Use of this Website constitutes acceptance of the <a href="/pages/terms-of-use" target="_top">Terms of Use</a> and <a href="/pages/privacy-policy" target="_top">Privacy Policy</a>. Apple and Google are owned by their respective owners. By searching you agree to the end user license agreement (TOU). <a href="/pages/accessibility-statement" target="_blank" title="Opens a new window">Accessibility Statement</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;