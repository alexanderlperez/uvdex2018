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

        this.state = { iconUrl: FavIconBlue, rows: [] };
        this.toggleIcons = this.toggleIcons.bind(this);
    }
     componentDidMount() {

         axios.get(`/allVehicles`)
           .then(response => {
             this.setState({ rows : response.data.vehicles });
           })
       }

    //Toggle footer fav icon function
    toggleIcons(){
        if(this.state.iconUrl === FavIconBlue){
            this.setState({iconUrl: FavIconDarkBlue});
        }
        else{
            this.setState({iconUrl: FavIconBlue});
        }
    }

    render() {
        
        return (

            <div>
                <Filter/>

                <div className="car-info-section">
                    <div className="container">
                        <div className="row ">
                            {this.state.rows.map( (car, i)=> {

                                let type = '';
                                if(car.type === 'N')
                                    type = 'New';
                                else if(car.type === 'U')
                                    type = 'Used';

                                let image = car.images;
                                if(car.images === '')
                                    image = null;

                                return (
                                    <div key={car.id} >
                                        <Link to="/vehicles">

                                            <div className="car-detail-wrapper clearfix">
                                                <div className="image-block col-md-4 d-none d-sm-block">
                                                    <Link to="/detail">
                                                        <figure>
                                                            <img src={image} alt=""/>
                                                        </figure>
                                                    </Link>
                                                </div>
                                                <div className="car-detail-block  col-md-4 text-center">
                                                    <Link to="/detail" className="d-none d-sm-block"><h2>{type}</h2></Link>
                                                    <Link to="/detail"><h3>{}</h3></Link>
                                                    <Link to="/detail" className="fav-icon d-block d-sm-none">
                                                        <img src={this.state.iconUrl} alt="Fav Icon" onClick={this.toggleIcons}/>
                                                    </Link>
                                                    <Link to="/detail">
                                                        <figure className="d-block d-sm-none">
                                                            <img src={"./img/data.jpeg"} alt=""/>
                                                        </figure>
                                                    </Link>
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
                                                <div className="dealer-notes  col-md-4 text-center d-none d-sm-block">
                                                    <h4>Dealer Notes</h4>
                                                        <a href="#" className="fav-icon">
                                                            <img src={this.state.iconUrl} alt="Fav Icon" onClick={this.toggleIcons}/>
                                                        </a>
                                                    <p>{car.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default CarData;