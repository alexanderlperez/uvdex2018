import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-data-grid';
const { Toolbar, Editors, Filters: { MultiSelectFilter, SingleSelectFilter }, Data: { Selectors } } = require('react-data-grid-addons');
const { DropDownEditor } = Editors;
import update from 'immutability-helper';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import _ from 'lodash';
import RowRenderer from './Row';
import ImageUploadFormatter from './ImageUploadFormatter';
import CustomImageFormatter from './CustomImageFormatter';

const status = ['Available', 'Sold'];

class InlineGrid extends React.Component {
    constructor(props, context) {
        super(props, context);

        if (action === 'new-vehicles') {

            this._columns = [
                {
                    key: 'key',
                    name: 'ID',
                    width: 30,
                    resizable: true
                },
                {
                    key: 'featured',
                    name: 'Image',
                    width: 90,
                    formatter: CustomImageFormatter,
                    resizable: true,
                    getRowMetaData: (row) => row
                },
                {
                    key: 'stock_number',
                    name: 'STOCK',
                    editable: true,
                    width: 77,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'scheduled',
                    name: 'SCHEDULED',
                    editable: true,
                    width: 97,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'sold',
                    name: 'SOLD',
                    editable: true,
                    width: 70,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'model_year',
                    name: 'YEAR',
                    editable: true,
                    width: 55,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'msrp',
                    name: 'MSRP',
                    editable: true,
                    width: 90,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'price',
                    name: 'SALE PRICE W REBATES',
                    editable: true,
                    width: 180,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'make',
                    name: 'MAKE',
                    editable: true,
                    width: 60,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'model',
                    name: 'MODEL',
                    editable: true,
                    width: 70,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'trim',
                    name: 'PKG.',
                    editable: true,
                    width: 200,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'exterior_color',
                    name: 'EXTERIOR COLOR',
                    editable: true,
                    width: 140,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'vin',
                    name: 'VIN',
                    editable: true,
                    width: 190,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'description',
                    name: 'DEALER NOTES',
                    editable: true,
                    width: 350,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'images',
                    name: 'Images',
                    resizable: true,
                    width: 120,
                    formatter: <ImageUploadFormatter onUpload={this.onUpload} />,
                    getRowMetaData: (row) => row
                },
                {
                    key: 'passengers',
                    name: 'PASSENGERS',
                    editable: true,
                    width: 105,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'is_active',
                    name: 'Status',
                    editable: true,
                    editor: <DropDownEditor options={status}/>,
                    width: 120,
                    resizable: true,
                    filterable: true,
                },
            ];
        } else if (action === 'used-vehicles') {

            this._columns = [
                {
                    key: 'key',
                    name: 'ID',
                    width: 30,
                    resizable: true
                },
                {
                    key: 'featured',
                    name: 'Image',
                    width: 90,
                    formatter: CustomImageFormatter,
                    resizable: true,
                    getRowMetaData: (row) => row
                },
                {
                    key: 'stock_number',
                    name: 'STOCK',
                    editable: true,
                    width: 77,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'price',
                    name: 'SALE PRICE',
                    width: 95,
                    editable: true,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'nada',
                    name: 'NADA',
                    editable: true,
                    width: 90,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'model_year',
                    name: 'YEAR',
                    editable: true,
                    width: 55,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'make',
                    name: 'MAKE',
                    editable: true,
                    width: 60,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'model',
                    name: 'MODEL',
                    editable: true,
                    width: 80,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'cpo',
                    name: 'CPO',
                    editable: true,
                    width: 42,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'exterior_color',
                    name: 'EXTERIOR COLOR',
                    editable: true,
                    width: 140,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'trim',
                    name: 'PKG.',
                    editable: true,
                    width: 200,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'mileage',
                    name: 'MILES',
                    editable: true,
                    width: 80,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'engine_description',
                    name: 'ENGINE',
                    editable: true,
                    width: 80,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'vin',
                    name: 'VIN',
                    editable: true,
                    width: 190,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'code',
                    name: 'CODE',
                    editable: true,
                    width: 70,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'description',
                    name: 'DEALER NOTES',
                    editable: true,
                    width: 350,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'previous_owner',
                    name: 'PREVIOUS OWNER',
                    editable: true,
                    width: 140,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'image',
                    name: 'Images',
                    width: 120,
                    resizable: true,
                    formatter: <ImageUploadFormatter onUpload={this.onUpload} />,
                    getRowMetaData: (row) => row
                },
                {
                    key: 'passengers',
                    name: 'PASSENGERS',
                    editable: true,
                    width: 105,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'is_active',
                    name: 'Status',
                    editable: true,
                    editor: <DropDownEditor options={status}/>,
                    width: 120,
                    resizable: true,
                    filterable: true,
                },
            ];
        } else if (action === 'sold-vehicles') {

            this._columns = [
                {
                    key: 'key',
                    name: 'ID',
                    width: 30,
                    resizable: true
                },
                {
                    key: 'featured',
                    name: 'Image',
                    width: 90,
                    formatter: CustomImageFormatter,
                    resizable: true,
                    getRowMetaData: (row) => row
                },
                {
                    key: 'stock_number',
                    name: 'STOCK',
                    width: 77,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'model_year',
                    name: 'YEAR',
                    width: 55,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'make',
                    name: 'MAKE',
                    width: 60,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'model',
                    name: 'MODEL',
                    width: 80,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'exterior_color',
                    name: 'EXTERIOR COLOR',
                    width: 140,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'trim',
                    name: 'PKG.',
                    width: 200,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'mileage',
                    name: 'MILES',
                    width: 80,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'engine_description',
                    name: 'ENGINE',
                    width: 80,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'vin',
                    name: 'VIN',
                    width: 190,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'description',
                    name: 'DEALER NOTES',
                    width: 350,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'previous_owner',
                    name: 'PREVIOUS OWNER',
                    width: 140,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'passengers',
                    name: 'PASSENGERS',
                    width: 105,
                    resizable: true,
                    filterable: true,
                },
                {
                    key: 'is_active',
                    name: 'Status',
                    editable: true,
                    editor: <DropDownEditor options={status}/>,
                    width: 120,
                    resizable: true,
                    filterable: true,
                },
            ];
        }


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
        this.onUpload = this.onUpload.bind(this);
    }

    componentDidMount() {

        if (action === 'new-vehicles') {

            axios.get('/getVehicles/N/'+user_id)
                .then((response) => {
                    this.setState({
                        rows: [...response.data.vehicles]
                    })
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } else if (action === 'used-vehicles') {

            axios.get('/getVehicles/U/'+user_id)
                .then((response) => {
                    this.setState({
                        rows: [...response.data.vehicles]
                    })
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } else if (action === 'sold-vehicles') {

            axios.get('/getVehicles/S/'+user_id)
                .then((response) => {
                    this.setState({
                        rows: [...response.data.vehicles]
                    })
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    onUpload(key, value) {

        let rows = this.state.rows.slice();
        let rowToUpdate = rows[key];
        let updated = {id: value};
        rows[key] = update(rowToUpdate, {$merge: updated});
        this.setState({ rows });
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
        let newRow = {
            key: newRowIndex+1,
            id: '',
            interior_color: '',
            option_text: '',
            description: '',
            images: '',
        };

        if (action === 'new-vehicles')
            newRow.type = 'N';
        else if (action === 'used-vehicles')
            newRow.type = 'U';

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

        if (action === 'sold-vehicles') {

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
                        toolbar={<Toolbar enableFilter={true}/>}
                        onAddFilter={this.handleFilterChange}
                        getValidFilterValues={this.getValidFilterValues}
                        onClearFilters={this.handleOnClearFilters}
                        rowHeight={70}
                        minHeight={600}
                        rowRenderer={RowRenderer}
                        rowScrollTimeout={200} />
                    <NotificationContainer/>
                </div>
            );
        } else {

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
                        toolbar={<Toolbar addRowButtonText="Add Vehicle" onAddRow={this.handleAddRow} enableFilter={true}/>}
                        onAddFilter={this.handleFilterChange}
                        getValidFilterValues={this.getValidFilterValues}
                        onClearFilters={this.handleOnClearFilters}
                        rowHeight={70}
                        minHeight={600}
                        rowRenderer={RowRenderer}
                        rowScrollTimeout={200} />
                    <NotificationContainer/>
                </div>
            );
        }

    }
}

if (document.getElementById('inline_grid')) {
    ReactDOM.render(<InlineGrid></InlineGrid>, document.getElementById('inline_grid'));
}