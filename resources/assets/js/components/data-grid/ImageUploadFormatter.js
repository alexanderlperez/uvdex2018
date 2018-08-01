import React from "react";
//import {NotificationContainer, NotificationManager} from 'react-notifications';
import "./UploadButton.css"

class ImageUploadFormatter extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            image: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let key = this.props.dependentValues.key-1;
        let file = this.state.image;
        let data = new FormData();
        data.append('file', file, file.name);
        data.append('id', this.props.dependentValues.id);
        data.append('type', this.props.dependentValues.type);

        axios
            .post('/uploadImage', data, { headers: {'Content-Type': 'multipart/form-data'} })
            .then(response => {

                if(this.props.dependentValues.id === "")
                    this.props.onUpload(key, response.data.message.id);

                //NotificationManager.success('Success', response.data.message.status);
            })
            .catch((error) => {
                //NotificationManager.error('Error', error);
            });
    }

    onChange(e){

        this.setState({image: e.target.files[0]});
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <input type="file" className="file" onChange={this.onChange}  />
                <button className="btn btn-primary file-upload">Upload</button>
            </form>);
    }
}

export default ImageUploadFormatter;