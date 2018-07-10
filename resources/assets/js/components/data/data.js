import React, { Component } from 'react';
import ReactDOM from 'react-dom';



class Cardata extends Component{
    constructor(props) {
        super(props);
        this.state = {data: "hello"};
    }
    render() {
        return (
            <div className="car-info-section">
                <div className="container">
                    <div className="row car-detail-wrapper">
                        
                            <div className="image-block col col-md-4">
                                <a href="#">
                                    <figure>
                                        <img src="" alt=""/>
                                    </figure>
                                </a>
                            </div>
                            <div className="car-detail-block col col-md-4 text-center">
                                <a href="#"><h2>{this.state.data}</h2></a>
                                <a href="#"><h3>2015 Ford Explorer XLT</h3></a>
                                <h5>Mileage: 0</h5>
                                <h5>Color#: Ruby Red RR</h5>
                                <h5>Passengers: 7</h5>
                                <h5 className="stroke-text">Their price: $39,820.00</h5>
                                <h5><strong>Our Price: $37,486.00</strong></h5>
                            </div>
                            <div className="dealer-notes col col-md-4 text-center">
                                <h4>Dealer Notes</h4><a href="#"className="fav-icon"><i className="far fa-star"></i></a>
                                
                                
                                <p>42 COMBINED CITY/HWY, Heated Leather, Rear view camera, Touch Navigation, Michelin Tires</p>
                            </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Cardata;