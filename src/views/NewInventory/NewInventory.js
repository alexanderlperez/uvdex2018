import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';

class NewInventory extends Component {

  constructor() {
    super()

    this.state = {
      columns: [
        { key: 'username', name: 'Username' },
        { key: 'repository', name: 'Repository' }
      ],
      rows: []
    }

    this.createRows = this.createRows.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
  }

  componentDidMount() {

    axios({
      method: 'GET',
      url: 'https://api.github.com/users/personablemedia/repos?per_page=100'
    })
      .then((res) => {
        const repos = res.data.map(repo => ({ username: repo.owner.login, repository: repo.name }))
        this.setState({
          rows: repos
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  createRows() {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this.setState({
      rows
    })
  };

  rowGetter(i) {
    return this.state.rows[i];
  };

  render() {

    if (this.state.rows.length) {
      return (
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
        />
      )
    }

    return (
      <div>
      <h1>LOADING</h1>
      <h2>Description of Inventory Management</h2>
      <p>This screen will replace the existing excel document the dealership is currently using.</p>
      <p>When the user updates a column, it saves it to the database instantly.</p>
      <p>In addition to updating information, the user will be able to upload & attach photos to each vehicle.</p>
      </div>
    )

  }
}

export default NewInventory;
