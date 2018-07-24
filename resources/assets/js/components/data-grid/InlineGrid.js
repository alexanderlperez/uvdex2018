import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-data-grid';
const { Row } = ReactDataGrid;
const { Editors, Toolbar, Filters: { MultiSelectFilter, SingleSelectFilter }, Data: { Selectors } } = require('react-data-grid-addons');
const { DropDownEditor } = Editors;
import update from 'immutability-helper';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import _ from 'lodash';
import PropTypes from 'prop-types';

const types = ['Used', 'New'];

class RowRenderer extends React.Component {

    getRowStyle () {
        return {
            color: this.getRowBackground()
        };
    };

    getRowBackground() {

        if(this.props.row.body_style === 'SUV')
            return 'green';

        return 'blue';
    };

    render() {
        // here we are just changing the style
        // but we could replace this with anything we liked, cards, images, etc
        // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
        return (<div style={this.getRowStyle()}><Row ref={node => this.row = node} {...this.props}/></div>);
    }
}

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
                key: 'stock_number',
                name: 'Stock',
                editable: true,
                width: 70,
                resizable: true,
                filterable: true,
            },
            {
                key: 'type',
                name: 'New_Used',
                editable: true,
                width: 80,
                editor: <DropDownEditor options={types}/>,
                resizable: true,
                filterable: true,
                filterRenderer: SingleSelectFilter
            },
            {
                key: 'body_style',
                name: 'Car_Truck',
                editable: true,
                width: 85,
                resizable: true,
                filterable: true,
            },
            {
                key: 'model_year',
                name: 'Year',
                editable: true,
                width: 45,
                resizable: true,
                filterable: true,
            },
            {
                key: 'make',
                name: 'Make',
                editable: true,
                width: 70,
                resizable: true,
                filterable: true,
            },
            {
                key: 'model',
                name: 'Model',
                editable: true,
                width: 70,
                resizable: true,
                filterable: true,
            },
            {
                key: 'package',
                name: 'Package',
                editable: true,
                width: 70,
                resizable: true,
                filterable: true,
            },
            {
                key: 'interior_color',
                name: 'Interior Color',
                editable: true,
                width: 100,
                resizable: true,
                filterable: true,
                sortable: true,
                filterRenderer: MultiSelectFilter
            },
            {
                key: 'exterior_color',
                name: 'Exterior Color',
                editable: true,
                width: 100,
                resizable: true,
                filterable: true,
            },
            {
                key: 'price',
                name: 'Price',
                editable: true,
                width: 60,
                resizable: true,
                filterable: true,
            },
            {
                key: 'msrp',
                name: 'MSRP',
                editable: true,
                width: 60,
                resizable: true,
                filterable: true,
            },
            {
                key: 'mileage',
                name: 'Miles',
                editable: true,
                width: 70,
                resizable: true,
                filterable: true,
            },
            {
                key: 'vin',
                name: 'Vin',
                editable: true,
                width: 147,
                resizable: true,
                filterable: true,
            },
            {
                key: 'passengers',
                name: 'Passengers',
                editable: true,
                width: 90,
                resizable: true,
                filterable: true,
            },
            {
                key: 'description',
                name: 'Description',
                editable: true,
                width: 200,
                resizable: true,
                filterable: true,
            },
            {
                key: 'cylinders',
                name: 'Cylinders',
                editable: true,
                width: 75,
                resizable: true,
                filterable: true,
            },
            {
                key: 'engine_description',
                name: 'Engine Description',
                editable: true,
                width: 130,
                resizable: true,
                filterable: true,
            },
            {
                key: 'fuel_type',
                name: 'Fuel Type',
                editable: true,
                width: 80,
                resizable: true,
                filterable: true,
            },
            {
                key: 'transmission',
                name: 'Transmission',
                editable: true,
                width: 100,
                resizable: true,
                filterable: true,
            },
            {
                key: 'trim',
                name: 'Trim',
                editable: true,
                width: 110,
                resizable: true,
                filterable: true,
            },
            {
                key: 'option_text',
                name: 'Option Text',
                editable: true,
                width: 200,
                resizable: true,
                filterable: true,
            },
            {
                key: 'is_sold',
                name: 'Status',
                editable: true,
                width: 100,
                resizable: true,
                filterable: true,
            },
        ];

        this.state = { rows: [] };
        this.getColumns = this.getColumns.bind(this);
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
        this.handleAddRow = this.handleAddRow.bind(this);
        this.getRowAt = this.getRowAt.bind(this);
        this.getSize = this.getSize.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.getValidFilterValues = this.getValidFilterValues.bind(this);
        this.handleOnClearFilters = this.handleOnClearFilters.bind(this);
        this.handleGridSort = this.handleGridSort.bind(this);
    }

    componentDidMount() {

        axios.get('/getVehicles/'+user_id)
            .then((response) => {
                this.setState({
                    rows: [...response.data.vehicles]
                })
            })
            .catch((error) => {
                console.log(error.response);
            });
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

            if(rowToUpdate.id !== undefined && rowToUpdate.id !== ''){ // Update

                axios.patch('/vehicles/'+rowToUpdate.id, {updated})
                    .then(
                        response => {
                            NotificationManager.success(response.data.message.type, response.data.message.status);
                    })
                    .catch((error) => {
                        NotificationManager.error('Error', error.response.statusText);
                        console.log(error.response.statusText);
                    });
            } else {
                axios.post('/saveVehicle', {updated})
                    .then(
                        response => {
                            rows[i].id = response.data.message.id;
                            this.setState({ rows });
                            NotificationManager.success(response.data.message.type, response.data.message.status);
                        })
                    .catch((error) => {
                        NotificationManager.error('Error', error.response.statusText);
                        console.log(error.response.statusText);
                    });
            }

            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
        }
        this.setState({ rows });
    };

    handleAddRow({ newRowIndex }) {
        const newRow = {
            id: '',
            key: newRowIndex+1,
            type: '',
            interior_color: '',
            option_text: '',
            description: '',
            images: '',
        };

        let rows = this.state.rows.slice();
        rows = update(rows, {$push: [newRow]});
        this.setState({ rows });
    };

    getRowAt(index) {
        if (index < 0 || index > this.getSize()) {
            return undefined;
        }

        return Selectors.getRows(this.state)[index];
    };

    getSize() {
        return Selectors.getRows(this.state).length;
    };

    handleFilterChange(filter) {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        this.setState({ filters: newFilters });
    };

    getValidFilterValues(columnId) {
        let values = this.state.rows.map(r =>  r[columnId]);
        return values.filter((item, i, a) => { return i === a.indexOf(item); });
    };

    handleOnClearFilters() {
        this.setState({ filters: {} });
    };

    handleGridSort(sortColumn, sortDirection) {
        this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    };

    render() {
        return  (
            <div>
                <ReactDataGrid
                    ref={ node => this.grid = node }
                    onGridSort={this.handleGridSort}
                    enableCellSelect={true}
                    columns={this.getColumns()}
                    rowGetter={this.getRowAt}
                    rowsCount={this.getSize()}
                    onGridRowsUpdated={_.debounce(this.handleGridRowsUpdated, 500)}
                    toolbar={<Toolbar onAddRow={this.handleAddRow} enableFilter={true}/>}
                    onAddFilter={this.handleFilterChange}
                    getValidFilterValues={this.getValidFilterValues}
                    onClearFilters={this.handleOnClearFilters}
                    enableRowSelect={true}
                    rowHeight={50}
                    minHeight={600}
                    rowRenderer={RowRenderer}
                    rowScrollTimeout={200} />
                    <NotificationContainer/>
            </div>
        );
    }
}

if (document.getElementById('inline_grid')) {
    ReactDOM.render(<InlineGrid></InlineGrid>, document.getElementById('inline_grid'));
}