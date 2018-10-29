import React, { Component } from 'react';

import Filter from './filter';
import Footer from './footer';
import Slider from '../../components/GallerySlider/Slider';
import MetaTags from 'react-meta-tags';

class DetailBlock extends Component{
    constructor(props){
       super(props);
       this.state = {
            fullscreen: false,
            vehicle: [],
            min: parseInt(localStorage.getItem('min')),
            max: parseInt(localStorage.getItem('max')),
            preSetFilters: {type: "", body_type: "", price: ""},
       };
    }

    componentDidMount() {

        axios.get(`/getVehicles/${this.props.match.params.id}`)
            .then(response => {


                this.setState({ vehicle : response.data.vehicle });

                if(this.props.location.state !== undefined) {

                    // Set previous filters
                    if(this.props.location.state.filters !== undefined)
                        this.setState({preSetFilters: this.props.location.state.filters});

                    if(this.props.location.state.fullscreen !== undefined)
                        this.setState({fullscreen: true});
                }

                let localFavourites = JSON.parse(localStorage.getItem('favourites'));
                if(localFavourites !== null && localFavourites.length){
                    if(localFavourites.includes(parseInt(this.props.match.params.id)))
                        $('.visible').addClass('hidden');
                }


            });
        window.scrollTo(0, 0);
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
        const {min, max, fullscreen, vehicle, preSetFilters} = this.state;

        return(

            <div>
                { this.initialMetaTags()}
                <Filter min={min} max={max} filters={preSetFilters} />

                <div className="container detail-information-wrapper">
                    <div className="row carinfo-block">
                        <div className="col-12 col-md-7">
                            <Slider images={images} fullscreen={fullscreen} />
                        </div>
                        <div className="col-12 col-md-5 car-price-detail">
                            <h3>{vehicle.title}</h3>
                            <h5><span>Condition:</span> {vehicle.type}</h5>
                            <h5><span>Mileage:</span> {vehicle.mileage}</h5>
                            <h5><span>Stock#:</span> {vehicle.stock_number}</h5>
                            <h5><span>VIN#:</span> {vehicle.vin}</h5>
                            <h5><span>Color:</span> {vehicle.exterior_color}</h5>
                            <h5><span>Passengers:</span> {vehicle.passengers}</h5>
                            <h1 className="price">{vehicle.our_price}</h1>
                            <div className="button-block">
                                <button className="visible btn btn-primary" data-key={vehicle.id} onClick={(e) => this.HideButton(e)}>Add To Favorites
                                </button>
                                <a href="tel:7124693383" className="btn btn-primary">Call (712) 469-3383</a>
                            </div>
                        </div>

                    </div>
                    <div className="row dealer-notes">
                        <div className="col-12">
                            <h4><strong>Dealer Notes</strong></h4>
                            <p>{vehicle.description}</p>
                            <br/> <br/>
                        </div>
                    </div>
                </div>

                <Footer filters={preSetFilters}/>
            </div>
        );
    }

    /* initilaization of basic meta tags*/
    initialMetaTags(){

      const {vehicle} = this.state
      if( vehicle ){
        let description = vehicle.description
        description = (description && description.length >= 156 ) ? vehicle.description : vehicle.description

        let images  = vehicle.images

        images      = ( images ) ? images[0] : ''

        return(
          <MetaTags>
            <title>{vehicle.title}</title>
            <meta id="meta-description" name="description" content={description} />
            <meta id="og-title" property="og:title" content={vehicle.title} />
            <meta id="og-image" property="og:image" content={images} />
          </MetaTags>
        )
      }
    }

}

export default DetailBlock;
