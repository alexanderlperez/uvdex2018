import React from "react";
import { Modal } from 'react-bootstrap';
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

        let data = {};
        data.id = this.props.dependentValues.id;
        data.image = e.target.getAttribute('data-content');

        axios
            .post('/deleteImage', data)
            .then(response => {
                this.props.onUpload(this.props.dependentValues.key, response.data.message);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    parentUpload(rowKey, value) {
        this.props.onUpload(rowKey, value);
    }

    renderImages() {

        if (this.props.dependentValues.images_count)

            return this.props.dependentValues.images.map( (image, i) => {

                return (

                    <div key={i} className="col-xs-4 col-sm-3 col-md-2 thumb">
                        <span className="glyphicon glyphicon-remove pull-right" data-content={image} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this image?')) this.deleteImage(e) }}> </span>
                        <div className="thumbnail">
                            <img className="img-responsive" src={image} alt="" draggable="false" />
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
                    : <div onClick={() => this.open()}><img src={null} height={40} width={40}/> (0)</div>
                }

                <Modal bsSize="large" show={this.state.showModal} onHide={() => this.close()} className="image-modalbox">
                    <Modal.Header closeButton>
                        <Modal.Title>Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="container"><div className="row"><div className="col-xs-12"><ImageUploadFormatter parentUpload={(rowKey, value) => this.parentUpload(rowKey, value)} dependentValues={this.props.dependentValues} parent={1} /></div></div></div>

                        <div className="container thumb-wrapper ">
                            <div className="row">
                                {this.renderImages()}
                            </div>
                        </div>

                    </Modal.Body>
                  
                </Modal>

            </div>
        );

    }
}

export default CustomImageFormatter;