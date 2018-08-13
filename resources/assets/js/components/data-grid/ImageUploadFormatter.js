import React from "react";
//import {NotificationContainer, NotificationManager} from 'react-notifications';
import "./UploadButton.css"

class ImageUploadFormatter extends React.Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){

        e.preventDefault();

        let id = this.props.dependentValues.key-1;
        let file = e.target.files[0];
        let data = new FormData();
        data.append('file', file, file.name);
        data.append('id', this.props.dependentValues.id);
        data.append('type', this.props.dependentValues.type);

        axios
            .post('/uploadImage', data, { headers: {'Content-Type': 'multipart/form-data'} })
            .then(response => {

                if(this.props.dependentValues.id === "")
                    this.props.onUpload(id, 'id', response.data.message.id);

                //NotificationManager.success('Success', response.data.message.status);
            })
            .catch((error) => {
                //NotificationManager.error('Error', error);
            });
    }

    render() {

        return (
            <form encType="multipart/form-data">
                <input type="file" className="file" onChange={this.onChange}  />
            </form>);
    }
}

export default ImageUploadFormatter;