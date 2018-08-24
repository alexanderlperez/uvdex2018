import React, { Component } from 'react';
import '../../royalslider.min.js';

class Slider extends Component{
    constructor(props){
        super(props);
        this.state = { images: [] };
    }

    componentWillMount() {

        let images = ['https://cdn04.carsforsale.com/3/1004599/4316117/697682025.jpg?dt=072920162313', 'https://cdn04.carsforsale.com/3/1004599/4316117/697682642.jpg?dt=072920162313', 'https://cdn04.carsforsale.com/3/1004599/4316117/697681510.jpg?dt=072920162313, https://cdn04.carsforsale.com/3/1004599/4316117/697682025.jpg?dt=072920162313', 'https://cdn04.carsforsale.com/3/1004599/4316117/697682642.jpg?dt=072920162313', 'https://cdn04.carsforsale.com/3/1004599/4316117/697681510.jpg?dt=072920162313, https://cdn04.carsforsale.com/3/1004599/4316117/697682025.jpg?dt=072920162313', 'https://cdn04.carsforsale.com/3/1004599/4316117/697682642.jpg?dt=072920162313', 'https://cdn04.carsforsale.com/3/1004599/4316117/697681510.jpg?dt=072920162313'];

        this.setState({ images: images });
    }

    componentDidMount(){

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
                                    <img className="rsTmb" src={img} data-rstmb={img} alt="image description"/>
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