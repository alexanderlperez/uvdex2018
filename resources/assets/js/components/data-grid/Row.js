import React from "react";
import ReactDataGrid from "react-data-grid";
const { Row, Cell } = ReactDataGrid;

class RowRenderer extends React.Component {

    render() {

        return <Row cellRenderer={CellRenderer} ref="row" {...this.props} />;
    }
}
class CellRenderer extends React.Component {
    render() {

        let rowColor;

        if(this.props.rowData.body_type === 'car')
            rowColor = 'orange';
        if(this.props.rowData.body_type === 'suv')
            rowColor = 'green';
        if(this.props.rowData.body_type === 'truck')
            rowColor = 'blue';

        if(this.props.column.key === 'stock_number')
            return (<div style={{color:rowColor}}><Cell className={rowColor} {...this.props} /></div>);
        else
            return <Cell {...this.props} />;
    }
}

export default RowRenderer;