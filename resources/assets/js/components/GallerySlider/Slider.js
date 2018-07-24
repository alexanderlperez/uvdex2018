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
                img: '',
            },
            {
                id: 2,
                img: '',
            },
            {
                id: 3,
                img: '',
            },
            {
                id: 4,
                img: '',
            },
            {
                id: 5,
                img: '',
            },
            {
                id: 5,
                img: '',
            },
        ]});
    }


    componentDidMount() {
        $(".royalSlider").royalSlider({
            controlNavigation: 'thumbnails',
				imageScaleMode: 'fit-if-smaller',
				navigateByClick: true,
				arrowsNav: true,
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