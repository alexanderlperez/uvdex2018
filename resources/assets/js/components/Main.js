import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Filter from './filters/filter';
import Cardata from './data/data';
import Footer from './footer/footer';
import DetailBlock from './details/detail';


import { HashRouter } from 'react-router-dom';
// import route Components here
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';
/*An example react component */
class Main extends Component{
    
   render() {
        return (
            <div>
                <Filter />
                
                <Route path="/" exact={true} component={Cardata} />
                <Route path="/detail" component={DetailBlock} />
                <Footer />
            </div>
            
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/

if(document.getElementById('root')){
    ReactDOM.render(<HashRouter><Main /></HashRouter>, document.getElementById('root'));
}