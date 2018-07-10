import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Filter extends Component{
    
    render() {
        return (
            
                <div className="filter-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 button-block">
                                <button type="button" className="btn btn-primary">New</button>
                                <button type="button" className="btn btn-primary">Used</button>
                            </div>
                            <div className="col-md-5 button-block">
                                <button type="button" className="btn btn-primary">CAR</button>
                                <button type="button" className="btn btn-primary">TRUCK</button>
                                <button type="button" className="btn btn-primary">SUV</button>
                            </div>
                            <div className="col-md-4 range-filter-block">

                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
}


export default Filter;