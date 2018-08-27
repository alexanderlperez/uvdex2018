import React, { Component } from 'react';

import Filter from './filter';
import Footer from './footer';
import Slider from '../../components/GallerySlider/Slider';

class DetailBlock extends Component{
    constructor(props){
       super(props);
       this.state = {vehicle: [], min: localStorage.getItem('min'), max: localStorage.getItem('max') };
    }

    componentDidMount() {

        axios.get(`/getVehicles/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ vehicle : response.data.vehicle });
            })
    }

    HideButton(e){
        $(e.target).addClass('hidden');
        this.setLocalFavourites(parseInt(e.target.getAttribute('data-key')));
    }

    setLocalFavourites(item) {

        let localFavourites = JSON.parse(localStorage.getItem('favourites'));

        if(localFavourites !== null && localFavourites.length) {

            localFavourites.push(item);
            localStorage.setItem('favourites', JSON.stringify(localFavourites));
        } else {

            let favourites = [];
            favourites.push(item);
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }
    }

    render() {

        const { images } = this.state.vehicle;
        let fullscreen = false;
        if(this.props.location.state !== undefined)
            fullscreen = true;

        return(

            <div>
                <Filter min={this.state.min} max={this.state.max} />

                <div className="container detail-information-wrapper">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <Slider images={images} fullscreen={fullscreen} />
                        </div>
                        <div className="col-12 col-md-5 car-price-detail">
                            <h3>{this.state.vehicle.title}</h3>
                            <h5><span>Condition:</span> {this.state.vehicle.type}</h5>
                            <h5><span>Mileage:</span> {this.state.vehicle.mileage}</h5>
                            <h5><span>Stock#:</span> {this.state.vehicle.stock_number}</h5>
                            <h5><span>VIN#:</span> {this.state.vehicle.vin}</h5>
                            <h5><span>Color:</span> {this.state.vehicle.exterior_color}</h5>
                            <h5><span>Passengers#:</span> {this.state.vehicle.passengers}</h5>
                            <h1 className="price">{this.state.vehicle.our_price}</h1>
                            <div className="button-block">
                                <button className="visible btn btn-primary" data-key={this.state.vehicle.id} onClick={(e) => this.HideButton(e)}>Add To Favorites
                                </button>
                                <a href="tel:7124693383" className="btn btn-primary">Call (712) 469-3383</a>
                            </div>
                        </div>
                        <div className="row dealer-notes">
                            <div className="col-12">
                                <h4><strong>Dealer Notes</strong></h4>
                                <p>{this.state.vehicle.description}</p>
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