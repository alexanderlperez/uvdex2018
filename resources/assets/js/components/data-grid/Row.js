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
        let body_type = this.props.rowData.body_type.toLowerCase();

        if(body_type === 'car')
            rowColor = 'orange';
        if(body_type === 'suv')
            rowColor = 'green';
        if(body_type === 'truck')
            rowColor = 'blue';

        if(this.props.column.key === 'stock_number')
            return <Cell className={rowColor} {...this.props} />;
        else
            return <Cell {...this.props} />;
    }
}

export default RowRenderer;