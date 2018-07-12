import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-data-grid';
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons';
import update from 'immutability-helper';
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;

class InlineGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'key',
                name: 'ID',
                width: 30,
                resizable: true
            },
            {
                key: 'vin',
                name: 'Vin',
                editable: true,
                width: 147,
                resizable: true
            },
            {
                key: 'type',
                name: 'Type',
                editable: true,
                width: 50,
                resizable: true
            },
            {
                key: 'cylinders',
                name: 'Cylinders',
                editable: true,
                width: 75,
                resizable: true,
            },
            {
                key: 'description',
                name: 'Description',
                editable: true,
                width: 200,
                resizable: true
            },
            {
                key: 'engine_description',
                name: 'Engine Description',
                editable: true,
                width: 130,
                resizable: true
            },
            {
                key: 'body_style',
                name: 'Body Style',
                editable: true,
                width: 85,
                resizable: true
            },
            {
                key: 'fuel_type',
                name: 'Fuel Type',
                editable: true,
                width: 80,
                resizable: true
            },
            {
                key: 'interior_color',
                name: 'Interior Color',
                editable: true,
                width: 100,
                resizable: true
            },
            {
                key: 'exterior_color',
                name: 'Exterior Color',
                editable: true,
                width: 100,
                resizable: true
            },
            {
                key: 'make',
                name: 'Make',
                editable: true,
                width: 70,
                resizable: true
            },
            {
                key: 'stock_number',
                name: 'Stock Number',
                editable: true,
                width: 100,
                resizable: true
            },
            {
                key: 'mileage',
                name: 'Mileage',
                editable: true,
                width: 70,
                resizable: true
            },
            {
                key: 'transmission',
                name: 'Transmission',
                editable: true,
                width: 100,
                resizable: true
            },
            {
                key: 'model',
                name: 'Model',
                editable: true,
                width: 70,
                resizable: true
            },
            {
                key: 'model_year',
                name: 'Model Year',
                editable: true,
                width: 90,
                resizable: true
            },
            {
                key: 'trim',
                name: 'Trim',
                editable: true,
                width: 110,
                resizable: true
            },
            {
                key: 'price',
                name: 'Price',
                editable: true,
                width: 60,
                resizable: true
            },
            {
                key: 'option_text',
                name: 'Option Text',
                editable: true,
                width: 200,
                resizable: true
            },
        ];

        this.state = { rows: [] };
        this.getColumns = this.getColumns.bind(this);
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
        this.handleAddRow = this.handleAddRow.bind(this);
        this.getRowAt = this.getRowAt.bind(this);
        this.getSize = this.getSize.bind(this);
    }

    componentDidMount() {

        fetch("getVehicles/"+user_id, {
            credentials: "same-origin",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        rows: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    getColumns() {
        let clonedColumns = this._columns.slice();
        clonedColumns[2].events = {
            onClick: (ev, args) => {
                const idx = args.idx;
                const rowIdx = args.rowIdx;
                this.grid.openCellEditor(rowIdx, idx);
            }
        };

        return clonedColumns;
    };

    handleGridRowsUpdated({ fromRow, toRow, updated }) {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    };

    handleAddRow({ newRowIndex }) {
        const newRow = {
            value: newRowIndex,
            userStory: '',
            developer: '',
            epic: ''
        };

        let rows = this.state.rows.slice();
        rows = update(rows, {$push: [newRow]});
        this.setState({ rows });
    };

    getRowAt(index) {
        if (index < 0 || index > this.getSize()) {
            return undefined;
        }

        return this.state.rows[index];
    };

    getSize() {
        return this.state.rows.length;
    };

    render() {
        return  (
            <ReactDataGrid
                ref={ node => this.grid = node }
                enableCellSelect={true}
                columns={this.getColumns()}
                rowGetter={this.getRowAt}
                rowsCount={this.getSize()}
                onGridRowsUpdated={this.handleGridRowsUpdated}
                toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
                enableRowSelect={true}
                rowHeight={50}
                minHeight={600}
                rowScrollTimeout={200} />);
    }
}

if (document.getElementById('inline_grid')) {
    ReactDOM.render(<InlineGrid></InlineGrid>, document.getElementById('inline_grid'));
}