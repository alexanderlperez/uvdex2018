import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';

class Leads extends Component {

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
        <h2>Desription of Leads</h2>
        <p>*Using the API from REConnect, CarsForSale, Gravity Forms new leads will populate the database.</p>
        <p>*Leads can be manually added/entered</p>
        <p>*Goal of this screen is to increase sales through:</p>
        <p>consistent--easy to differentiate.</p>
        <p>timely--easy to do or execute</p>
        <p>trackable--easy to access the active lead information</p>
        <p>through interactive spreadsheets that pack a punch in terms of their functionality and reporting.</p>
        <p></p>
        <p>Logs interactions automatically when email or texting with the app;</p>
        <p>Manual logging of follow ups when other mehtod is used. -- Can also add notes to the lead</p>
        <p></p>
        <p>Screen will que up leads that havent been contacted today yet.</p>
        <p>Moves the lead to another sub-heading when they have been acquately followed up with.</p>
      </div>
    )
  }
}

export default Leads;
