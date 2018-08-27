import React, {Component} from 'react';
import Filter from './filter';
import Footer from './footer';

//Fav Icon import here
import FavIconBlue from '../../../img/icons/favorite_off.png';
import FavIconDarkBlue from '../../../img/icons/favorite_on.png';
import {Link} from 'react-router-dom';

class CarData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            iconUrl: FavIconBlue,
            favorites: [],
            rows: [],
            allRows: [],
            type: '',
            body: '',
            price: '',
            min: '',
            max: '',
        };

        this.renderVehicles = this.renderVehicles.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.showHideFavourite = this.showHideFavourite.bind(this);
    }

    componentWillMount() {
        this.localStorageFavourites();
    }

    componentDidMount() {

        axios.get(`/getVehicles/0`)
            .then(response => {
                this.setState({
                    rows: response.data.vehicles,
                    allRows: response.data.vehicles,
                    min: response.data.min,
                    max: response.data.max
                });
            });
    }

    localStorageFavourites() {

        let localFavourites = JSON.parse(localStorage.getItem('favourites'));

        if(localFavourites !== null && localFavourites.length)
            this.setState({favorites: localFavourites});
    }

    //Toggle footer fav icon function
    toggleIcons(e) {

        if (e.target.getAttribute('data-icon') === 'off') {

            e.target.src = FavIconDarkBlue;
            e.target.setAttribute('data-icon', 'on')
        } else {

            e.target.src = FavIconBlue;
            e.target.setAttribute('data-icon', 'off')
        }

        this.addRemoveFavourites(parseInt(e.target.getAttribute('data-key')));
    }

    addRemoveFavourites(item) {

        if (!this.state.favorites.includes(item))
            this.state.favorites.push(item);
        else
            this.setState({favorites: this.state.favorites.filter(x => x === item === false)});

        // Set local storage
        let localFavourites = JSON.parse(localStorage.getItem('favourites'));

        if(localFavourites !== null && localFavourites.length) {

            if (!localFavourites.includes(item)) {

                localFavourites.push(item);
                localStorage.setItem('favourites', JSON.stringify(localFavourites));
            } else {

                let favourites = localFavourites.filter(x => x === item === false);
                localStorage.setItem('favourites', JSON.stringify(favourites));
            }
        }
    }

    onFilter(data) {

        let type = this.state.type;
        let body = this.state.body;
        let price = this.state.price;

        if (data.type !== undefined) {
            type = data.type;
            this.state.type = type;
        }

        if (data.body !== undefined) {
            body = data.body;
            this.state.body = body;
        }

        if (data.price !== undefined) {
            price = data.price * 1000;
            this.state.price = price;
        }

        let filters = {
            type: type,
            body_type: body,
            price: price,
        };

        let filtered = this.multiFilter(this.state.allRows, filters);
        this.setState({rows: filtered});
    }

    multiFilter(arr, filters) {
        const filterKeys = Object.keys(filters);
        return arr.filter(eachObj => {
            return filterKeys.every(eachKey => {
                if (!filters[eachKey].toString().length) {
                    return true; // passing an empty filter means that filter is ignored
                }
                if (eachKey === 'price')
                    return eachObj[eachKey] >= this.state.min * 1000 && eachObj[eachKey] <= filters[eachKey];
                else
                    return filters[eachKey].includes(eachObj[eachKey]);
            });
        });
    }

    showHideFavourite(status) {

        // Show or Hide favourites
        if (status)
            this.setState({rows: this.state.rows.filter(vehicle => this.state.favorites.includes(vehicle.id) === true)});
        else
            this.setState({rows: this.state.allRows});
    }

    renderVehicles() {

        return this.state.rows.map(vehicle => {

            let icon = 'off';
            let imgSrc = FavIconBlue;
            if (this.state.favorites.includes(vehicle.id)){
                icon = 'on';
                imgSrc = FavIconDarkBlue;
            }

            return (
                <div key={vehicle.id} className="full-width-wrapper">
                    <div className="car-detail-wrapper clearfix">
                        <div className="image-block col-md-3 d-none d-sm-block">
                            <Link to={{ pathname: vehicle.id + '/detail', state:{fullscreen: true} }}>
                                <figure>
                                    <img src={vehicle.featured} alt=""/>
                                </figure>
                            </Link>
                        </div>
                        <div className="car-detail-block  col-md-3 text-center">
                            <Link to={vehicle.id + '/detail'} className={"d-none d-sm-block "+ vehicle.type.toLowerCase()}><h2>{vehicle.type}</h2></Link>
                            <Link to={vehicle.id + '/detail'}>
                                <h3>{vehicle.title}</h3>
                            </Link>
                            <Link to={vehicle.id + '/detail'} className="fav-icon d-block d-sm-none">
                                <img src={imgSrc} alt="Fav Icon" data-icon={icon} data-key={vehicle.id}
                                     onClick={this.toggleIcons}/>
                            </Link>
                            {/* Mobile View */}
                            <Link to={{ pathname: vehicle.id + '/detail', state:{fullscreen: true}}}>
                                <figure className="d-block d-sm-none">
                                    <img src={vehicle.featured} alt=""/>
                                </figure>
                            </Link>
                            {/* Mobile View */}
                            <Link to={vehicle.id + '/detail'}>
                                <h5 className="d-none d-sm-block">Mileage: {vehicle.mileage}</h5>
                                <h5 className="d-none d-sm-block">Color#: {vehicle.exterior_color}</h5>
                                <h5 className="d-none d-sm-block">Passengers: {vehicle.passengers}</h5>
                                <h2 className={"d-block d-sm-none "+ vehicle.type.toLowerCase()}>{vehicle.type}</h2>
                                {vehicle.show_price ? <h5 className="stroke-text">Their price: {vehicle.their_price}</h5> : ''}
                                <h5><strong>Our Price: {vehicle.our_price}</strong></h5>
                                <div className="button-block d-block d-sm-none">
                                    <button type="button" className="btn btn-primary">Gallery</button>
                                    <button type="button" className="btn btn-primary">Details</button>
                                </div>
                            </Link>
                        </div>
                        <div className="dealer-notes  col-md-6 text-center d-none d-sm-block">
                            <h4>Dealer Notes</h4>
                            <Link to="#" replace className="fav-icon">
                                <img src={imgSrc} alt="Fav Icon" data-icon={icon} data-key={vehicle.id}
                                     onClick={(e) => this.toggleIcons(e)}/>
                            </Link>
                            <Link to={vehicle.id + '/detail'}><p>{vehicle.description}</p></Link>
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        const {min, max} = this.state;
        localStorage.setItem('min', min);
        localStorage.setItem('max', max);
        return (
            <div>
                <Filter onFilter={this.onFilter} min={min} max={max}/>
                <div className="car-info-section">
                    <div className="container">
                        <div className="row ">
                            {this.renderVehicles()}
                        </div>
                    </div>
                </div>
                <Footer showHideFavourite={this.showHideFavourite}/>
            </div>
        );
    }
}

export default CarData;