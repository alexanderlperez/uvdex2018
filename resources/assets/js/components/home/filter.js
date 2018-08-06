import React, { Component } from 'react';

class Filter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'All Prices',
            min: 10,
            max: 60,
            filterCarType: '',
            filterCarBody: '',
            filterPriceSlider: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.clickFilter = this.clickFilter.bind(this);
    }

    clickFilter(e) {

        let data = {[e.target.getAttribute('data-title')]: e.target.getAttribute('data-name')};
        this.props.onFilter(data);
    }

    handleChange(e) {

        this.setState({value: '$' + e.target.value});
        this.props.onFilter({'price': e.target.value});
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
                                <button type="button" className="btn btn-primary" data-title="type" data-name="New" onClick={this.clickFilter}>New</button>
                                <button type="button" className="btn btn-primary" data-title="type" data-name="Used" onClick={this.clickFilter}>Used</button>
                            </div>
                            <div className="col-sm-7 col-md-5 button-block">
                                <button type="button" className="btn btn-primary" data-title="body" data-name="car" onClick={this.clickFilter}>CAR</button>
                                <button type="button" className="btn btn-primary" data-title="body" data-name="truck" onClick={this.clickFilter}>TRUCK</button>
                                <button type="button" className="btn btn-primary" data-title="body" data-name="suv" onClick={this.clickFilter}>SUV</button>
                            </div>
                            <div className="col-md-3 range-filter-block">
                                <h3><strong>{this.state.value}</strong></h3>

                                <input type="range" id="rangeslider" min={this.state.min} max={this.state.max} step="1"  onChange={this.handleChange}/>
                                <h4 className="low-price"><strong>${this.state.min}K</strong></h4>
                                <h4 className="high-price"><strong>${this.state.max}K</strong></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                
            
        );
    }
}

export default Filter;