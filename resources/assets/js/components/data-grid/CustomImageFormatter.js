import React from "react";

class CustomImageFormatter extends React.Component {

    render() {
        return (<div><img src={this.props.value} height={40} width={40}/> ({this.props.dependentValues.images_count})</div>);
    }
}

export default CustomImageFormatter;