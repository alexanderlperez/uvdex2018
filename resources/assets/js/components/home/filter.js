import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Filter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allPrice: 'All Price',
            min: 0,
            max: 0,
            filters: {type: "", body_type: "", price: ""},
            isDetail: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.clickFilter = this.clickFilter.bind(this);
    }

    componentWillMount() {

        let isDetail = window.location.hash.includes('detail');

        if(isDetail)
            this.setState({isDetail: true})
    }

    componentWillReceiveProps(nextProps){

        let filterPrice = this.state.allPrice;
        if(nextProps.filters !== "") {

            if (nextProps.filters.price !== "")
                filterPrice = '$' + nextProps.filters.price * 1000 + '.00';
        }

        this.setState({
            min: nextProps.min,
            max: nextProps.max,
            filters: nextProps.filters,
            allPrice: filterPrice
        });
    }

    clickFilter(e) {

        if (e.target.getAttribute('data-title') === 'type')
            $('.type>.btn').removeClass('active');

        if (e.target.getAttribute('data-title') === 'body_type')
            $('.body_type>.btn').removeClass('active');

        e.target.classList.add('active');

        let data = {[e.target.getAttribute('data-title')]: e.target.getAttribute('data-name')};
        this.props.onFilter(data);
    }

    handleChange(e) {

        if(parseInt(e.target.value) === this.state.max)
            $('.rangePrice').html('All Price');
        else
            $('.rangePrice').html('$' + e.target.value*1000 + '.00');

        if(!this.state.isDetail)
            this.props.onFilter({'price': e.target.value});
    }

    render() {

        const { type, body_type } = this.state.filters;

        let min = this.state.min;
        let max = this.state.max;
        let price = this.state.max;

        if(this.state.filters.price !== "")
            price = this.state.filters.price;

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
                                <button type="button" className={ (type === 'New')?'btn btn-primary active': "btn btn-primary "} data-title="type" data-name="New" onClick={this.clickFilter}>New</button>
                                <button type="button" className={ (type === 'Used')?'btn btn-primary active': "btn btn-primary "} data-title="type" data-name="Used" onClick={this.clickFilter}>Used</button>
                            </div>
                            <div className="col-sm-12 col-md-5 button-block body_type">
                                <button type="button" className={ (body_type === 'car')?'btn btn-primary active': "btn btn-primary "} data-title="body_type" data-name="car" onClick={this.clickFilter}>CAR</button>
                                <button type="button" className={ (body_type === 'truck')?'btn btn-primary active': "btn btn-primary "} data-title="body_type" data-name="truck" onClick={this.clickFilter}>TRUCK</button>
                                <button type="button" className={ (body_type === 'suv')?'btn btn-primary active': "btn btn-primary "} data-title="body_type" data-name="suv" onClick={this.clickFilter}>SUV</button>
                            </div>

                            <div className="col-sm-12 col-md-3 range-filter-block">
                                <h3><strong className="rangePrice">{this.state.allPrice}</strong></h3>
                                <input type="range" id="rangeslider" min={min} max={max} step="1" defaultValue={price} onChange={this.handleChange}/>
                                <h4 className="low-price"><strong>${min}K</strong></h4>
                                <h4 className="high-price"><strong>${max}K</strong></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Filter;