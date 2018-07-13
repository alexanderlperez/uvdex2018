import React from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-data-grid';
const { Editors, Toolbar, Filters: { NumericFilter, MultiSelectFilter, SingleSelectFilter }, Data: { Selectors } } = require('react-data-grid-addons');
const { DropDownEditor } = Editors;
import update from 'immutability-helper';

const types = ['Used', 'New'];

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
                resizable: true,
                filterable: true,
            },
            {
                key: 'type',
                name: 'Type',
                editable: true,
                width: 50,
                editor: <DropDownEditor options={types}/>,
                resizable: true,
                filterable: true,
                filterRenderer: SingleSelectFilter
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
                key: 'description',
                name: 'Description',
                editable: true,
                width: 200,
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
                key: 'body_style',
                name: 'Body Style',
                editable: true,
                width: 85,
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
                key: 'make',
                name: 'Make',
                editable: true,
                width: 70,
                resizable: true,
                filterable: true,
            },
            {
                key: 'stock_number',
                name: 'Stock Number',
                editable: true,
                width: 100,
                resizable: true,
                filterable: true,
            },
            {
                key: 'mileage',
                name: 'Mileage',
                editable: true,
                width: 70,
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
                key: 'model',
                name: 'Model',
                editable: true,
                width: 70,
                resizable: true,
                filterable: true,
            },
            {
                key: 'model_year',
                name: 'Model Year',
                editable: true,
                width: 90,
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
                key: 'price',
                name: 'Price',
                editable: true,
                width: 60,
                resizable: true,
                filterable: true,
                filterRenderer: NumericFilter
            },
            {
                key: 'option_text',
                name: 'Option Text',
                editable: true,
                width: 200,
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
            type: '',
            interior_color: '',
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
            <ReactDataGrid
                ref={ node => this.grid = node }
                onGridSort={this.handleGridSort}
                enableCellSelect={true}
                columns={this.getColumns()}
                rowGetter={this.getRowAt}
                rowsCount={this.getSize()}
                onGridRowsUpdated={this.handleGridRowsUpdated}
                toolbar={<Toolbar onAddRow={this.handleAddRow} enableFilter={true}/>}
                onAddFilter={this.handleFilterChange}
                getValidFilterValues={this.getValidFilterValues}
                onClearFilters={this.handleOnClearFilters}
                enableRowSelect={true}
                rowHeight={50}
                minHeight={600}
                rowScrollTimeout={200} />);
    }
}

if (document.getElementById('inline_grid')) {
    ReactDOM.render(<InlineGrid></InlineGrid>, document.getElementById('inline_grid'));
}