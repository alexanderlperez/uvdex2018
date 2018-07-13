import React, { Component } from 'react';
import ReactDOM from 'react-dom';


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
            iconsUrl : FavIcon
        }

        this.toggleIcon = this.toggleIcon.bind(this);
    }
    //Toggle footer fav icon function
    toggleIcon(){
        if(this.state.iconsUrl === FavIcon){
            this.setState({iconsUrl: FavWhiteIcon})
        }
        else{
            this.setState({iconsUrl: FavIcon})
        }
    }
    render() {
        return(
            <div className="footer-section">
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <ul>
                                    <li><a href="#"><img src={PhoneIcon} alt="Phone Call Icon"/></a></li>
                                    <li><a href="#"><img src={MailIcon} alt="Email Icon"/></a></li>
                                    <li><a href="#"><img src={BackbuttonIcon} alt="Back Button Icon"/></a></li>
                                    <li><a href="#"><img src={this.state.iconsUrl} alt="Fav Icon" onClick={this.toggleIcon}/></a></li>
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