import React, { Component } from 'react';
import { Headers as NavHeaders} from './HeaderConstant'
import HeaderNavLink from './HeaderNavLink'
import { WithAppState } from '../Context/AppState.js';
import { Link } from 'react-router-dom';

class Header extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            Headers : NavHeaders,
            isMobileNavOpen : false
        }

        this.sideMenuRemoveHandler = this.sideMenuRemoveHandler.bind(this);
        this.openNav = this.openNav.bind(this);
        this.onNavHeaderOnClick = this.onNavHeaderOnClick.bind(this);
    }

    sideMenuRemoveHandler(event){
        
        if (!event.target.matches('#mobileNav')) {
            this.setState({isMobileNavOpen : false});
            document.removeEventListener('click',this.sideMenuRemoveHandler);
        }
    };

    openNav() {
        this.setState({isMobileNavOpen : true});
        document.addEventListener('click',this.sideMenuRemoveHandler);
    }

    onNavHeaderOnClick(Key){
        var Headers = this.state.Headers.map((header) => {
            if(header.Key === Key)
                return {...header, isActive : true}
            else 
                return {...header, isActive : false}
        });
        this.setState({Headers});
    }

    searchOpen(){
        document.getElementById("myDropdown").classList.toggle("vp_dropdown_show");
    }

    componentDidMount(){
        this.initializeNotificationDropDown();
    }

    initializeNotificationDropDown(){

        if($('body').outerWidth() < 768){
            var left = $('.vp_dropdown').offset().left;
            var width = $('.vp_dropdown').outerWidth();
            var Wwidth = $('body').outerWidth() - 50;
            var padLeft = $('body').outerWidth() - (left + width);
            $('#myDropdown').css("right","-"+(padLeft/2)+"px");
            $('#myDropdown').css("min-width",(Wwidth)+"px");
            $('.notification-body').css("max-height", (window.outerHeight/2) + "px");
        }

        $(window).resize(function() {
                if($('body').outerWidth() < 768){
                var left = $('.vp_dropdown').offset().left;
                var width = $('.vp_dropdown').outerWidth();
                var Wwidth = $('body').outerWidth() - 50;
                var padLeft = $('body').outerWidth() - (left + width);
                $('#myDropdown').css("right","-"+(padLeft/2)+"px");
                $('#myDropdown').css("min-width",(Wwidth)+"px");
                $('.notification-body').css("max-height", (window.outerHeight/2) + "px");
                }
                else{
                    $('#myDropdown').css("right","0px");
                    $('#myDropdown').css("min-width","350px");
                    $('.notification-body').css("max-height", "250px");
                }
        });
        
    }

    render(){
        
        const { context } = this.props;
        
        return(
            <div id="Header" className="header">
                <div className="container">
                    <div className="vp_res_nav_opener">
                        <span className="vp_icon" onClick={this.openNav}> &#9776; </span>
                    </div>
                    <div className="vp_logo">
                        <span className="vp_logo">Xome Valuation</span>
                    </div>
                    <div id="mobileNav" className={ this.state.isMobileNavOpen ? "vp_leftnav vp_nav_open" : "vp_leftnav" }>
                        <ul className="vp_nav_ul">
                            <li className="closebtn" >&times;</li>
                            {
                                this.state.Headers.map((header,key) => (
                                <HeaderNavLink key={key} description={header.Key} isActive={header.isActive} URL={header.URL} onClick={ this.onNavHeaderOnClick } />)
                                )
                            }                             
                        </ul>
                    </div>
                    <div className="vp_rightnav">
                        <ul className="vp_nav_ul_right">
                            <li>
                                <div className="vp_dropdown">
                                    <div className="btn vp_header_btn" onClick={this.searchOpen}> 
                                        <span className="vp_n_res_display">Notification</span>
                                        <span className="vp_m_res_display"><i className="glyphicon glyphicon-bell" /></span>
                                    </div>

                                    <div id="myDropdown" className="vp_dropdown_content notification-menu">
                                        <div className="notification-header">
                                            <div className="notification-header-content">Notification</div>
                                            <div className="btn btn-default notification-clear-btn"><i className="glyphicon glyphicon-align-right" /></div>
                                        </div>
                                        <div className="notification-body">
                                            <div className="notification">notification 1 notification 1 notification 1 notification 1 notification 1 notification 1 notification 1 notification 1  </div>
                                            <div className="notification">notification 2</div>
                                            <div className="notification">notification 3</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                            <div className="notification">notification 4</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><Link  to="/UI/Profile"> <span className="vp_n_res_display">Hi { context.User.VendorDetailsModel ? context.User.VendorDetailsModel.VendorName :"Loading..." }</span><span className="vp_m_res_display"><i className="glyphicon glyphicon-user" /></span></Link></li>                      
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
} 

export default Header = WithAppState(Header);