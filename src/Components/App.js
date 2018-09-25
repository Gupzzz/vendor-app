import React, { Component } from 'react';
import Header from './Header/Header';
import Body from './Body/Body';
import Footer from  './Footer/Footer';
import Loader from './UI-Util/Loader.js';
import { AppState } from './Context/AppState.js';

class App extends Component {

  constructor(props){
    super(props);

    this.OpenLoader = () => {
      this.setState( (prevState) => (
          { LoaderCount : prevState.LoaderCount + 1 }
        ) 
      );
    }

    this.CloseLoader = () => {
      this.setState( (prevState, props) => (
          { LoaderCount : (prevState.LoaderCount - 1) < 0 ? 0 : prevState.LoaderCount - 1 }
        ) 
      );
    }

    this.state = {
      LoaderCount : 1,
      AppTree : {
        Loader : {
          OpenLoader : this.OpenLoader,
          CloseLoader: this.CloseLoader
        },
        User : {
          VendorID : null
        }
      }
    };

  }

  componentDidMount(){
    fetch("/Vendor/Information",{ credentials : "same-origin"} )
    .then(res => res.json())
    .then(
        (result) => {
            this.setState((prevState) => ({
              LoaderCount : prevState.LoaderCount - 1,
              AppTree : {
              ...prevState.AppTree,
               User : result
              }
            }));
        },
        (error) => {
            console.log(error);
        }
    );
  }

  render() {
    return (
    <AppState.Provider value={this.state.AppTree}>
      <React.Fragment>
      <Loader isOpen={ this.state.LoaderCount <= 0 ? false : true } />
      <Header {...this.props}/>
      <Body />
      <Footer />   
      </React.Fragment>   
    </AppState.Provider>
    )
  }

}

export default App;
