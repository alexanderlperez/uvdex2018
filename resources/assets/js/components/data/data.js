import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Fav Icon import here 
import FavIconBlue from '../../../img/icons/favorite_off.png';
import FavIconDarkBlue from '../../../img/icons/favorite_on.png';
import Slider from '../../components/GallerySlider/Slider';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';
class Cardata extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: "New",
            iconUrl: FavIconBlue,
            carId: [],
            carData: []
        };
        
        this.toggleIcons = this.toggleIcons.bind(this);
        
    }
    // componentDidMount() {
    //     axios.get(`/allVehicles`)
    //       .then(res => {
    //           console.log(res);
    //         const carData = res.data;
    //         this.setState({ carData });
    //       })
    //   }
    

    componentWillMount(){
        this.setState({
            carId:[
                {
                    id: 1,
                    name: "one",
                    img: '/images/img1.jpeg',
                },
                {
                    id: 2,
                    name: "two",
                    img: '/images/img2.jpeg',
                },
                {
                    id: 3,
                    name: "three",
                    img: '/images/img3.jpeg',
                },
                {
                    id: 4,
                    name: "four",
                    img: '/images/img4.jpeg',
                },
                {
                    id: 5,
                    name: "five",
                    img: '/images/img5.jpeg',
                },
                {
                    id: 6,
                    name: "six",
                    img: '/images/img6.jpeg',
                },
            ]
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
            <div className="car-info-section">
                <div className="container">
                    <div className="row ">
            {this.state.carId.map(carItem => {
                    return(
                        <Link to="/vehicles">
            
                        
                            <div className="car-detail-wrapper clearfix" >
                            <div className="image-block col-md-4 d-none d-sm-block">
                                     <Link to="/detail">
                                        <figure>
                                            <img src={carItem.img} alt=""/>
                                        </figure>
                                    </Link>
                            </div>
                            <div className="car-detail-block  col-md-4 text-center">
                                <Link to="/detail" className="d-none d-sm-block"><h2>{this.state.data}</h2></Link>
                                <Link to="/detail"><h3>{carItem.name}</h3></Link>
                                <Link to="/detail" className="fav-icon d-block d-sm-none"><img src={this.state.iconUrl} alt="Fav Icon" onClick={this.toggleIcons}/></Link>
                                <Link to="/detail"><figure className="d-block d-sm-none">
                                        <img src={"./img/data.jpeg"} alt=""/>
                                </figure></Link>
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
                
            </Link>
                    )
            })}
            
            </div>
                </div>
            </div>
        );
    }
}

export default Cardata;