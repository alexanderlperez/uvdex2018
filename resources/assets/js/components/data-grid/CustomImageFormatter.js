import React from "react";

class CustomImageFormatter extends React.Component {

    render() {

        if (this.props.dependentValues.images_count)
            return (<div><img src={this.props.value} height={40} width={40}/> ({this.props.dependentValues.images_count})</div>);
        else
            return (<div><img src={null} height={40} width={40}/> ({this.props.dependentValues.images_count})</div>);
    }
}

export default CustomImageFormatter;