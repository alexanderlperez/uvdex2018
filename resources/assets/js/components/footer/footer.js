import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Footer extends Component{
    render() {
        return(
            <div className="footer-section">
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <ul>
                                    <li className="round-icon"><a href="#"><i className="fas fa-phone"></i></a></li>
                                    <li><a href="#"><i className="far fa-envelope"></i></a></li>
                                    <li className="round-icon"><a href="#"><i className="fas fa-arrow-left"></i></a></li>
                                    <li><a href="#"><i className="far fa-star"></i></a></li>
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