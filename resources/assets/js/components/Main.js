import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Filter from './filters/filter';
import Cardata from './data/data';
import Footer from './footer/footer';
import DetailBlock from './details/detail';

/*An example react component */
class Main extends Component{
    
   render() {
        return (
            <div>
                <Filter />
                <Cardata />
                {/*<DetailBlock />*/}
                <Footer />
                
            </div>
            
        );
    }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/

if(document.getElementById('root')){
    ReactDOM.render(<Main />, document.getElementById('root'));
}