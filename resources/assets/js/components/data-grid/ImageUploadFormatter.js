import React from "react";
import "./UploadButton.css"

class ImageUploadFormatter extends React.Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){

        e.preventDefault();

        let file = e.target.files[0];
        let data = new FormData();
        data.append('file', file, file.name);
        data.append('id', this.props.dependentValues.id);
        data.append('type', this.props.dependentValues.type);

        axios
            .post('/uploadImage', data, { headers: {'Content-Type': 'multipart/form-data'} })
            .then(response => {

                if(this.props.parent)
                    this.props.parentUpload(this.props.dependentValues.key, response.data.message);
                else
                    this.props.onUpload(this.props.dependentValues.key, response.data.message);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (
            <form encType="multipart/form-data">
                <div className="row">
                    <div className="col-sm-4 pull-right">
                        <input type="file" className="file" onChange={this.onChange}  />
                    </div>
                    <div className="col-sm-8 pull-left">
                        <p className="text-red">(Photos must be added one at a time, please add your display photo first)</p><br />
                    </div>
                    <div className="clearfix"></div>
                </div>
            </form>);
    }
}

export default ImageUploadFormatter;