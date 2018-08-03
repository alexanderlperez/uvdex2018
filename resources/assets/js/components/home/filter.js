import React, { Component } from 'react';

class Filter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'All Prices',
            min: 10,
            max: 60,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: '$' + event.target.value});
    }
    render() {
        return (
            <div className="filter-section navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand d-block d-sm-block d-md-none" href="#"><h1>ROST MOTOR INC</h1></a>
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
                                        <h3><strong>{this.state.value}</strong></h3>
                                        
                                        <input type="range" id="rangeslider" min={this.state.min} max={this.state.max} step="1"  onChange={this.handleChange}/>
                                       
                                        <h4 className="low-price"><strong>${this.state.min}K</strong></h4><h4 className="high-price"><strong>${this.state.max}K</strong></h4>

                                    </div>
                            </div>
                        </div>
                
                </div>
            </div>
            
                
            
        );
    }
}

export default Filter;