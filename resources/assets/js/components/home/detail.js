import React, { Component } from 'react';

import Filter from './filter';
import Footer from './footer';

import Slider from '../../components/GallerySlider/Slider';
class DetailBlock extends Component{
    constructor(props){
       super(props);
       this.state = {addClass: false}
       this.Hidebutton = this.Hidebutton.bind(this);
       
    }
    Hidebutton(){
        this.setState({
            addClass: !this.state.addClass
        });
    }
    
    render() {
        let buttonClass = ["visible btn btn-primary"];
        
        if(this.state.addClass){
            buttonClass.push('hidden');
            
        }
        return(

            <div>
                <Filter/>

                <div className="container detail-information-wrapper">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <Slider/>
                        </div>
                        <div className="col-12 col-md-5 car-price-detail">
                            <h3>2015 Ford Explorer XLT</h3>
                            <h5><span>Condtion:</span> New</h5>
                            <h5><span>Mileage:</span> 0</h5>
                            <h5><span>Stock#:</span> N5474</h5>
                            <h5><span>VIN#:</span> 1FM5K7D89FGA45474</h5>
                            <h5><span>Color#:</span> Ruby Red RR</h5>
                            <h5><span>Passengers#:</span> 7</h5>
                            <h2 className="price">$37,486.00</h2>
                            <div className="button-block">
                                <button className={buttonClass.join(' ')} onClick={this.Hidebutton.bind(this)}>Add To Favorites
                                </button>
                                <a href="tel:7124693383" className="btn btn-primary">Call (712) 469-3383</a>
                            </div>


                        </div>
                        <div className="row dealer-notes">
                            <div className="col-12">
                                <h4><strong>Dealer Notes</strong></h4>
                                <p>Flex Fuel, Power Lift Gate, Trailer Tow Package, Voice Activated Navigation,
                                    20'' Polished Alumninum Wheels, 24MPG HWY, 7 Passenger, Charcoal Leather Interior, Rear View
                                    Camera, Power Seats</p>
                            </div>
                        </div>
                    </div>

                </div>

                <Footer/>
            </div>
        );
    }
}

export default DetailBlock;