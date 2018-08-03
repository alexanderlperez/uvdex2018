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
        this.clickFilterType = this.clickFilterType.bind(this);
        this.clickFilterBody = this.clickFilterBody.bind(this);
    }

    clickFilterType(e) {

        this.setState({filterCarType: e.target.getAttribute('data-name')});
        this.filterCars();
    }

    clickFilterBody(e) {

        this.setState({filterCarBody: e.target.getAttribute('data-name')});
        this.filterCars();
    }

    handleChange(e) {

        this.setState({value: '$' + e.target.value, filterPriceSlider: e.target.value});
        this.filterCars();
    }

    filterCars() {

        this.props.onFilter(this.state.filterCarType, this.state.filterCarBody, this.state.filterPriceSlider);
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
                                <button type="button" className="btn btn-primary" data-name="New" onClick={this.clickFilterType}>New</button>
                                <button type="button" className="btn btn-primary" data-name="Used" onClick={this.clickFilterType}>Used</button>
                            </div>
                            <div className="col-sm-7 col-md-5 button-block">
                                <button type="button" className="btn btn-primary" data-name="car" onClick={this.clickFilterBody}>CAR</button>
                                <button type="button" className="btn btn-primary" data-name="truck" onClick={this.clickFilterBody}>TRUCK</button>
                                <button type="button" className="btn btn-primary" data-name="suv" onClick={this.clickFilterBody}>SUV</button>
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