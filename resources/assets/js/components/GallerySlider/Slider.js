import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../royalslider.min.js';
import $ from 'jquery';
import jQuery from 'jquery';



class Slider extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [],
        };
    }

     componentWillMount() {
        this.setState({images: [
            {
                id: 1,
                img: require("../../../img/img1.jpeg"),
            },
            {
                id: 2,
                img: require("../../../img/img2.jpeg"),
            },
            {
                id: 3,
                img: require("../../../img/img3.jpeg"),
            },
            {
                id: 4,
                img: require("../../../img/img4.jpeg"),
            },
            {
                id: 5,
                img: require("../../../img/img5.jpeg"),
            },
            {
                id: 5,
                img: require("../../../img/img6.jpeg"),
            },
        ]});
    }


    componentDidMount() {
        $(".royalSlider").royalSlider({
            controlNavigation: 'thumbnails',
				imageScaleMode: 'fit-if-smaller',
				navigateByClick: true,
				arrowsNav:true,
				arrowsNavAutoHide: true,
				arrowsNavHideOnTouch: true,
				keyboardNavEnabled: true,
				fadeinLoadedSlide: true,
				imageScalePadding: 4,
				thumbs:{
                    appendSpan: true,
					firstMargin: true,
					paddingBottom: 4,
                },
					
				fullscreen:{
                    enabled: true,
					nativeFS: true
                }
        });
    }
    
    render(){
        return(
            <div className="royalSlider rsDefault"> 
                {this.state.images.map(imgItem => {

                    return(
                        <a class="rsImg" data-rsw="400" data-rsh="500"  data-rsBigImg={imgItem.img} href={imgItem.img}>
                            <img width="96" height="72" class="rsTmb" src={imgItem.img} /></a>
                    )
                })}           
                
                
            </div>
        )
        
    }
}

export default Slider;