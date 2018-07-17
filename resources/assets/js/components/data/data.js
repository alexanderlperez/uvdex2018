import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Fav Icon import here 
import FavIconBlue from '../../../img/icons/favorite_off.png';
import FavIconDarkBlue from '../../../img/icons/favorite_on.png';

class Cardata extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: "New",
            iconUrl: FavIconBlue
        };

        this.toggleIcons = this.toggleIcons.bind(this);
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
            <div className="car-info-section">
                <div className="container">
                    <div className="row ">
                        
                            <div className="car-detail-wrapper">
                            <div className="image-block col-md-4 d-none d-sm-block">
                                <a href="#">
                                    <figure>
                                        <img src={"./img/data.jpeg"} alt=""/>
                                    </figure>
                                </a>
                            </div>
                            <div className="car-detail-block  col-md-4 text-center">
                                <a href="#" className="d-none d-sm-block"><h2>{this.state.data}</h2></a>
                                <a href="#"><h3>2015 Ford Explorer XLT</h3></a>
                                <a href="#"className="fav-icon d-block d-sm-none"><img src={this.state.iconUrl} alt="Fav Icon" onClick={this.toggleIcons}/></a>
                                <figure className="d-block d-sm-none">
                                        <img src={"./img/data.jpeg"} alt=""/>
                                </figure>
                                <h5 className="d-none d-sm-block">Mileage: 0</h5>
                                <h5 className="d-none d-sm-block">Color#: Ruby Red RR</h5>
                                <h5 className="d-none d-sm-block">Passengers: 7</h5>
                                <h5 className="stroke-text">Their price: $39,820.00</h5>
                                <h5><strong>Our Price: $37,486.00</strong></h5>
                                <div className="button-block d-block d-sm-none">
                                    <button type="button" className="btn btn-primary">Gallery</button>
                                    <button type="button" className="btn btn-primary">Details</button>
                                </div>
                            </div>
                            <div className="dealer-notes  col-md-4 text-center d-none d-sm-block">
                                <h4>Dealer Notes</h4><a href="#"className="fav-icon"><img src={this.state.iconUrl} alt="Fav Icon" onClick={this.toggleIcons}/></a>
                                
                                
                                <p>42 COMBINED CITY/HWY, Heated Leather, Rear view camera, Touch Navigation, Michelin Tires</p>
                            </div>
                        
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cardata;