import React, { Component } from 'react';
import '../../royalslider.min.js';

class Slider extends Component{
    constructor(props){
        super(props);
        this.state = { images: [] };
    }

    componentWillReceiveProps(nextProps){
        this.setState({ images: nextProps.images });
    }

    componentDidUpdate(){

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

        $(".rsFullscreenIcn").click();
    }


    render(){

        if (this.state.images.length > 0) {

            return (
                <div className="royalSlider rsDefault">
                    {
                        this.state.images.map((img, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <a className="rsImg" data-rsbigimg={img} href={img}>
                                        <img className="rsTmb" src={img} alt=""/></a>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            )
        } else
            return ( <div className="royalSlider rsDefault"> </div> );

    }
}

export default Slider;