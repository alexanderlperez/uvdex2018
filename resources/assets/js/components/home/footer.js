import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Footer icons import here 
import PhoneIcon from '../../../img/icons/phone-icon.png';
import MailIcon from '../../../img/icons/mail-icon.png';
import BackbuttonIcon from '../../../img/icons/back-button.png';
import FavIcon from '../../../img/icons/favorite-icon.png';
import FavBlueIcon from '../../../img/icons/favorite_on.png';
import FavWhiteIcon from '../../../img/icons/favorite_engaged.png';

class Footer extends Component{
    constructor(){
        super();
        this.state = {
            iconsUrl : FavIcon,
            mailTo: 'mailto:josh@rostmotor.com',
            Subject: 'this is demo',
            copied: false,
            telTo: 'tel:7124693383',
            rostsiteUrl: 'http://rostmotor.com/',
            fav: false,
        };

        this.toggleIcon = this.toggleIcon.bind(this);
        this.copyPath = this.copyPath.bind(this);
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
    
    copyPath(){
        this.setState={
           Subject: 'true'
        };
        console.log(this.state.hasBeenClicked);
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
                                    <li><a href="mailto:mailto:josh@rostmotor.com?subject=Your Favorites Car&body=This is Demo Body Content!"><img src={MailIcon} alt="Email Icon"/></a></li>
                                    <li><a href={this.state.rostsiteUrl}><img src={BackbuttonIcon} alt="Back Button Icon"/></a></li>
                                    <li><Link to="#" replace ><img src={this.state.iconsUrl} alt="Fav Icon" onClick={this.toggleIcon}/></Link></li>
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