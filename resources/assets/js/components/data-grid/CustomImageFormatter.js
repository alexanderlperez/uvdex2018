import React from "react";
import { Modal, Button } from 'react-bootstrap';
import ImageUploadFormatter from "./ImageUploadFormatter";

class CustomImageFormatter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {showModal: false};
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    deleteImage(e) {

        const event = e.target;
        let data = {};
        data.id = this.props.dependentValues.id;
        data.image = e.target.getAttribute('data-content');

        axios
            .post('/deleteImage', data)
            .then(response => {

                $(event).closest('.thumb').remove(); //On success remove current element
                this.props.onUpload(this.props.dependentValues.id, 'images', response.data.message.images);

                //NotificationManager.success('Success', response.data.message.status);
            })
            .catch((error) => {
                //NotificationManager.error('Error', error);
            });
    }

    renderImages() {

        if (this.props.dependentValues.images_count)

            return this.props.dependentValues.images.map( (image, i) => {

                return (

                    <div key={i} className="col-lg-2 col-md-2 col-xs-2 thumb">
                        <span className="glyphicon glyphicon-remove pull-right" data-content={image} onClick={(e) => this.deleteImage(e)}> </span>
                        <div className="thumbnail">
                            <img className="img-responsive" src={image} alt="" />
                        </div>
                    </div>
                );

            });
        else
            return (<div>There are no images for this vehicle.</div>);
    }

    render() {

        return(

            <div>

                {   this.props.dependentValues.images_count
                    ? <div onClick={() => this.open()}><img src={this.props.value} height={40} width={40}/> ({this.props.dependentValues.images_count})</div>
                    : <div onClick={() => this.open()}><img src={null} height={40} width={40}/> ({this.props.dependentValues.images_count})</div>
                }

                <Modal bsSize="large" show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row col-lg-12"><ImageUploadFormatter /></div>

                        <div className="container">
                            <div className="row col-lg-12">
                                {this.renderImages()}
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );

    }
}

export default CustomImageFormatter;