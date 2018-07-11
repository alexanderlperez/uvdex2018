import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Filter extends Component{
    
    render() {
        return (
            <div className="filter-section navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand d-block d-sm-block d-md-none" href="#"><h1>ROST MOTOR INC</h1></a>
                    </div>
               
                <div id="navbar" className="navbar-collapse collapse ">
                    
                            <div className="row">
                                    <div className="col-sm-5 col-md-4 button-block">
                                        <button type="button" className="btn btn-primary">New</button>
                                        <button type="button" className="btn btn-primary">Used</button>
                                    </div>
                                    <div className="col-sm-7 col-md-5 button-block">
                                        <button type="button" className="btn btn-primary">CAR</button>
                                        <button type="button" className="btn btn-primary">TRUCK</button>
                                        <button type="button" className="btn btn-primary">SUV</button>
                                    </div>
                                    <div className="col-md-3 range-filter-block">

                                    </div>
                            </div>
                        </div>
                
                </div>
            </div>
            
                
            
        );
    }
}


export default Filter;