import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Footer icons import here 
import PhoneIcon from '../../../img/icons/phone-icon.png';
import BackbuttonIcon from '../../../img/icons/back-button.png';
import FavIcon from '../../../img/icons/favorite-icon.png';
import FavWhiteIcon from '../../../img/icons/favorite_engaged.png';

class Footer extends Component{
    constructor(){
        super();
        this.state = {
            iconsUrl : FavIcon,
            mailTo: 'mailto:josh@rostmotor.com',
            copied: false,
            telTo: 'tel:7124693383',
            rostsiteUrl: 'http://rostmotor.com/',
            isDetail: false,
            fav: false,
            filters: {type: "", body_type: "", price: ""},
        };

        this.toggleIcon = this.toggleIcon.bind(this);
    }

    componentWillMount() {

        let isDetail = window.location.hash.includes('detail');

        if(isDetail)
            this.setState({isDetail: true})
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.show)
            this.setState({fav: true, iconsUrl: FavWhiteIcon});

        if(nextProps.filters !== undefined)
            this.setState({filters: nextProps.filters});
    }

    //Toggle footer fav icon function
    toggleIcon(){
        if(this.state.iconsUrl === FavIcon){
            this.setState({iconsUrl: FavWhiteIcon})
        }
        else{
            this.setState({iconsUrl: FavIcon})
        }

        if(this.state.fav === false)
            this.state.fav = true;
        else
            this.state.fav = false;

        this.props.showHideFavourite(this.state.fav);
    }

    render() {
        return(
            <div className="footer-section">
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <ul>
                                    <li><a href={this.state.telTo}><img src={PhoneIcon} alt="Phone Call Icon"/></a></li>
                                    {
                                        this.state.isDetail
                                        ? <span><li><Link to={{ pathname: '/', state:{filters: this.state.filters} }}><img src={BackbuttonIcon} alt="Back Button Icon"/></Link></li>
                                            <li><Link to={{ pathname: '/', state:{show: true} }}><img src={this.state.iconsUrl} alt="Fav Icon"/></Link></li></span>
                                        : <span><li><a href={this.state.rostsiteUrl}><img src={BackbuttonIcon} alt="Back Button Icon"/></a></li>
                                            <li><Link to="#" replace ><img src={this.state.iconsUrl} alt="Fav Icon" onClick={this.toggleIcon}/></Link></li></span>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;