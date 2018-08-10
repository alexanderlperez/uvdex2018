import React, { Component } from 'react';

import Filter from './filter';
import Footer from './footer';

import { Link } from 'react-router-dom';
import Slider from '../../components/GallerySlider/Slider';

class DetailBlock extends Component{
    constructor(props){
       super(props);
       this.state = {addClass: false, vehicle: [] };
       this.Hidebutton = this.Hidebutton.bind(this);
    }

    componentDidMount() {

        axios.get(`/getVehicles/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ vehicle : response.data.vehicle });
            })
    }


    Hidebutton(){
        this.setState({
            addClass: !this.state.addClass
        });
    }

    render() {
        let buttonClass = ["visible btn btn-primary"];
        
        if(this.state.addClass)
            buttonClass.push('hidden');

        const { images } = this.state.vehicle;
        return(

            <div>
                <Filter/>

                <div className="container detail-information-wrapper">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <Slider images={images} />
                        </div>
                        <div className="col-12 col-md-5 car-price-detail">
                            <h3>{this.state.vehicle.title}</h3>
                            <h5><span>Condtion:</span> {this.state.vehicle.type}</h5>
                            <h5><span>Mileage:</span> {this.state.vehicle.mileage}</h5>
                            <h5><span>Stock#:</span> {this.state.vehicle.stock_number}</h5>
                            <h5><span>VIN#:</span> {this.state.vehicle.vin}</h5>
                            <h5><span>Color#:</span> {this.state.vehicle.exterior_color}</h5>
                            <h5><span>Passengers#:</span> {this.state.vehicle.passengers}</h5>
                            <h1 className="price">{this.state.vehicle.our_price}</h1>
                            <div className="button-block">
                                <button className={buttonClass.join(' ')} onClick={this.Hidebutton.bind(this)}>Add To Favorites
                                </button>
                                <Link to="tel:7124693383" className="btn btn-primary">Call (712) 469-3383</Link>
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