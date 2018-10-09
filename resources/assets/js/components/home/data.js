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
            showFavorites: false,
            rows: [],
            allRows: [],
            type: '',
            body_type: '',
            price: '',
            min: '',
            max: '',
            filters: '',
            preSetFilters: {type: "", body_type: "", price: ""},
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

                if(this.props.location.state !== undefined) {
console.log(this.props.location.state.filters);
                    // Set previous filters
                    if(this.props.location.state.filters !== undefined) {

                        this.onFilter(this.props.location.state.filters);
                        this.setState({ preSetFilters: this.props.location.state.filters });
                    }

                    if(this.props.location.state.show !== undefined)
                        this.setState({ showFavorites: true }, () => {this.showHideFavourite(true);});
                }

            });
    }

    localStorageFavourites() {

        let localFavourites = JSON.parse(localStorage.getItem('favourites'));

        if(localFavourites === null)
            localStorage.setItem('favourites', JSON.stringify([]));

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

        if (!this.state.favorites.indexOf(item) >= 0)
            this.state.favorites.push(item);
        else
            this.setState({favorites: this.state.favorites.filter(x => x === item === false)});

        // Set local storage
        let localFavourites = JSON.parse(localStorage.getItem('favourites'));

        if (!localFavourites.indexOf(item) >= 0) {

            localFavourites.push(item);
            localStorage.setItem('favourites', JSON.stringify(localFavourites));
        } else {

            let favourites = localFavourites.filter(x => x === item === false);
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }

        if(this.state.showFavorites)
            this.setState({rows: this.state.rows.filter(vehicle => vehicle.id === item === false)});
    }

    onFilter(data) {

        let type = this.state.type;
        let body_type = this.state.body_type;
        let price = this.state.price;

        if (data.type !== undefined && data.type !== "") {
            type = data.type;
            this.state.type = type;
        }

        if (data.body_type !== undefined && data.body_type !== "") {
            body_type = data.body_type;
            this.state.body_type = body_type;
        }

        if (data.price !== undefined && data.price !== "") {
            price = data.price * 1000;
            this.state.price = price;
        }

        let filters = {
            type: type,
            body_type: body_type,
            price: price,
        };

        // Filter data
        if(filters.type !== "" || filters.body_type !== "" || filters.price !== "") {

            let filtered = this.multiFilter(this.state.allRows, filters);

            if(filters.price !== "")
                filters.price = filters.price/1000;

            this.setState({rows: filtered, filters: filters});
        }
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
                    return filters[eachKey].indexOf(eachObj[eachKey] >= 0);
            });
        });
    }

    showHideFavourite(status) {

        // Show or Hide favourites
        if (status)
            this.setState({rows: this.state.rows.filter(vehicle => this.state.favorites.indexOf(vehicle.id) >= 0), showFavorites: true});
        else
            this.setState({rows: this.state.allRows, showFavorites: false});
    }

    renderVehicles() {

        return this.state.rows.map(vehicle => {

            let icon = 'off';
            let imgSrc = FavIconBlue;
            if (this.state.favorites.indexOf(vehicle.id) >= 0){
                icon = 'on';
                imgSrc = FavIconDarkBlue;
            }

            return (
                <div key={vehicle.id} className="full-width-wrapper">
                    <div className="car-detail-wrapper clearfix">
                            <Link to="#" replace className="fav-icon">
                                <img src={imgSrc} alt="Fav Icon" data-icon={icon} data-key={vehicle.id}
                                     onClick={(e) => this.toggleIcons(e)}/>
                            </Link>
                        <div className="image-block col-md-3 d-none d-sm-block">
                            <Link to={{ pathname: vehicle.id + '/detail', state:{fullscreen: true, filters: this.state.filters} }}>
                                <figure>
                                    <img src={vehicle.featured} alt=""/>
                                </figure>
                            </Link>
                        </div>
                        <div className="car-detail-block  col-md-3 text-center">
                            <Link to={{ pathname: vehicle.id + '/detail', state:{filters: this.state.filters} }} className={"d-none d-sm-block "+ vehicle.type.toLowerCase()}><h2>{vehicle.type}</h2></Link>
                            <Link to={{ pathname: vehicle.id + '/detail', state:{filters: this.state.filters} }}>
                                <h3>{vehicle.title}</h3>
                            </Link>
                            
                            {/* Mobile View */}
                            <Link to={{ pathname: vehicle.id + '/detail', state:{fullscreen: true, filters: this.state.filters}}}>
                                <figure className="d-block d-sm-none">
                                    <img src={vehicle.featured} alt=""/>
                                </figure>
                            </Link>
                            {/* Mobile View */}
                            <Link to={{ pathname: vehicle.id + '/detail', state:{filters: this.state.filters} }}>
                                <h5 className="d-none d-sm-block">Mileage: {vehicle.mileage}</h5>
                                <h5 className="d-none d-sm-block">Color: {vehicle.exterior_color}</h5>
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
                            
                            <Link to={{ pathname: vehicle.id + '/detail', state:{filters: this.state.filters} }}><p>{vehicle.description}</p></Link>
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        const {min, max, showFavorites, preSetFilters} = this.state;

        localStorage.setItem('min', min);
        localStorage.setItem('max', max);
        return (
            <div>
                <Filter onFilter={this.onFilter} min={min} max={max} filters={preSetFilters}/>
                <div className="car-info-section">
                    <div className="container">
                        <div className="row ">
                            {this.renderVehicles()}
                        </div>
                    </div>
                </div>
                <Footer showHideFavourite={this.showHideFavourite} show={showFavorites}/>
            </div>
        );
    }
}

export default CarData;