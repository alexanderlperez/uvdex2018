import React, { Component } from 'react';
import Filter from './filter';
import Footer from './footer';

//Fav Icon import here
import FavIconBlue from '../../../img/icons/favorite_off.png';
import FavIconDarkBlue from '../../../img/icons/favorite_on.png';
import { Link } from 'react-router-dom';

class CarData extends Component{
    constructor(props) {
        super(props);

        this.state = { iconUrl: FavIconBlue, favorites: [], rows: [], allRows: [] };
        this.toggleIcons = this.toggleIcons.bind(this);
        this.renderVehicles = this.renderVehicles.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.showHideFavourite = this.showHideFavourite.bind(this);
    }
     componentDidMount() {

         axios.get(`/allVehicles`)
           .then(response => {
             this.setState({ rows : response.data.vehicles, allRows : response.data.vehicles });
           })
       }

    //Toggle footer fav icon function
    toggleIcons(e){

        if(e.target.getAttribute('data-icon') === 'off') {

            e.target.src = FavIconDarkBlue;
            e.target.setAttribute('data-icon', 'on')
        } else {

            e.target.src = FavIconBlue;
            e.target.setAttribute('data-icon', 'off')
        }

        // Add or Remove from favourites
        if(!this.state.favorites.includes(e.target.getAttribute('data-key')))
            this.state.favorites.push(e.target.getAttribute('data-key'));
        else
            this.setState({
                favorites: this.state.favorites.filter(x => x === e.target.getAttribute('data-key') === false)
            });
    }

    onFilter(data) {

        console.log(data);
    }

    showHideFavourite(status) {

        // Show or Hide favourites
        if(status)
            this.setState({ rows: this.state.rows.filter(vehicle => this.state.favorites.includes(vehicle.id.toString()) === true) });
        else
            this.setState({ rows: this.state.allRows });
    }

    renderVehicles() {

        return this.state.rows.map( (car)=> {

            return (
                <div key={car.id} className="full-width-wrapper" >
                    <Link to="/vehicles">
                        <div className="car-detail-wrapper clearfix">
                            <div className="image-block col-md-3 d-none d-sm-block">
                                <Link to={car.id+ '/detail'}>
                                    <figure>
                                        <img src={car.featured} alt=""/>
                                    </figure>
                                </Link>
                            </div>
                            <div className="car-detail-block  col-md-3 text-center">
                                <Link to={car.id+ '/detail'} className="d-none d-sm-block"><h2>{car.type}</h2></Link>
                                <Link to={car.id+ '/detail'}>
                                    <h3>{car.model_year+' '+car.make+' '+car.model+' '+car.trim}</h3>
                                </Link>
                                <Link to={car.id+ '/detail'} className="fav-icon d-block d-sm-none">
                                    <img src={this.state.iconUrl} alt="Fav Icon" data-icon="off" data-key={car.id} onClick={this.toggleIcons}/>
                                </Link>
                                {/* Mobile View */}
                                <Link to={car.id+ '/detail'}>
                                    <figure className="d-block d-sm-none">
                                        <img src={car.featured} alt=""/>
                                    </figure>
                                </Link>
                                {/* Mobile View */}
                                <h5 className="d-none d-sm-block">Mileage: {car.mileage}</h5>
                                <h5 className="d-none d-sm-block">Color#: {car.exterior_color}</h5>
                                <h5 className="d-none d-sm-block">Passengers: {car.passengers}</h5>
                                <h5 className="stroke-text">Their price: $39,820.00</h5>
                                <h5><strong>Our Price: $37,486.00</strong></h5>
                                <div className="button-block d-block d-sm-none">
                                    <button type="button" className="btn btn-primary">Gallery</button>
                                    <button type="button" className="btn btn-primary">Details</button>
                                </div>
                            </div>
                            <div className="dealer-notes  col-md-6 text-center d-none d-sm-block">
                                <h4>Dealer Notes</h4>
                                <Link to="#" className="fav-icon">
                                    <img src={this.state.iconUrl} alt="Fav Icon" data-icon="off" data-key={car.id} onClick={this.toggleIcons}/>
                                </Link>
                                <p>{car.description}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        });
    }

    render() {
        
        return (
            <div>
                <Filter onFilter={this.onFilter} />
                <div className="car-info-section">
                    <div className="container">
                        <div className="row ">
                            {this.renderVehicles()}
                        </div>
                    </div>
                </div>
                <Footer showHideFavourite={this.showHideFavourite} />
            </div>
        );
    }
}

export default CarData;