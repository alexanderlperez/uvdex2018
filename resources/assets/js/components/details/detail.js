import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DetailBlock extends Component{
    render() {
        return(
            <div className="container detail-information-wrapper">
                <div className="row">
                    <div className="col-sm-6">

                    </div>
                    <div className="col-sm-6 car-price-detail">
                        <h3>2015 Ford Explorer XLT</h3>
                        <h5><span>Condtion:</span> New</h5>
                        <h5><span>Mileage:</span> 0</h5>
                        <h5><span>Stock#:</span> N5474</h5>
                        <h5><span>VIN#:</span> 1FM5K7D89FGA45474</h5>
                        <h5><span>Color#:</span> Ruby Red RR</h5>
                        <h5><span>Passengers#:</span> 7</h5>
                        <h2 className="price">$37,486.00</h2>
                        <button className="btn btn-primary">Add To Favorites</button>
                    </div>
                    <div className="row dealer-notes">
                        <div className="col-12">
                        <h4><strong>Dealer Notes</strong></h4>
                        <p>Flex Fuel, Power Lift Gate, Trailer Tow Package, Voice Activated Navigation, 
                            20'' Polished Alumninum Wheels, 24MPG HWY, 7 Passenger, Charcoal Leather Interior, Rear View Camera, Power Seats</p>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default DetailBlock;