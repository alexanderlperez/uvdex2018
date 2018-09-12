import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Filter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allPrice: 'All Prices',
            min: 0,
            max: 0,
            filters: {type: "", body_type: "", price: ""},
        };

        this.handleChange = this.handleChange.bind(this);
        this.clickFilter = this.clickFilter.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            min: nextProps.min,
            max: nextProps.max
        });

        if(nextProps.filters !== undefined) {

            this.setState({ filters: nextProps.filters });

            if(nextProps.filters.price !== "")
                this.setState({allPrice: '$' + nextProps.filters.price+ '.00'});
        }

    }

    clickFilter(e) {

        if (e.target.getAttribute('data-title') === 'type')
            $('.type>.btn').removeClass('active');

        if (e.target.getAttribute('data-title') === 'body')
            $('.body>.btn').removeClass('active');

        e.target.classList.add('active');

        let data = {[e.target.getAttribute('data-title')]: e.target.getAttribute('data-name')};
        this.props.onFilter(data);
    }

    handleChange(e) {

        if(parseInt(e.target.value) === this.state.max)
            this.setState({allPrice: 'All Price'});
        else
            this.setState({allPrice: '$' + e.target.value*1000+ '.00'});

        this.props.onFilter({'price': e.target.value});
    }

    render() {

        // Set default values
        let type_new,type_used,body_type_car,body_type_truck,body_type_suv = '';

        if(this.state.filters.type === 'New')
            type_new = 'active';
        if(this.state.filters.type === 'Used')
            type_used = 'active';

        if(this.state.filters.body_type === 'car')
            body_type_car = 'active';
        if(this.state.filters.body_type === 'truck')
            body_type_truck = 'active';
        if(this.state.filters.body_type === 'suv')
            body_type_suv = 'active';

        return (
            <div className="filter-section navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"> </span>
                            <span className="icon-bar"> </span>
                            <span className="icon-bar"> </span>
                        </button>
                        <Link to="#" replace className="navbar-brand d-block d-sm-block d-md-none"><h1>ROST MOTOR INC</h1></Link>
                    </div>
               
                    <div id="navbar" className="navbar-collapse collapse ">
                        <div className="row">
                            <div className="col-sm-12 col-md-4 button-block type">
                                <button type="button" className={"btn btn-primary "+ type_new} data-title="type" data-name="New" onClick={this.clickFilter}>New</button>
                                <button type="button" className={"btn btn-primary "+ type_used} data-title="type" data-name="Used" onClick={this.clickFilter}>Used</button>
                            </div>
                            <div className="col-sm-12 col-md-5 button-block body">
                                <button type="button" className={"btn btn-primary "+ body_type_car} data-title="body" data-name="car" onClick={this.clickFilter}>CAR</button>
                                <button type="button" className={"btn btn-primary "+ body_type_truck} data-title="body" data-name="truck" onClick={this.clickFilter}>TRUCK</button>
                                <button type="button" className={"btn btn-primary "+ body_type_suv} data-title="body" data-name="suv" onClick={this.clickFilter}>SUV</button>
                            </div>
                            <div className="col-sm-12 col-md-3 range-filter-block">
                                <h3><strong>{this.state.allPrice}</strong></h3>

                                <input type="range" id="rangeslider" min={this.state.min} max={this.state.max} step="1"  defaultValue={this.state.max} onChange={this.handleChange}/>
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