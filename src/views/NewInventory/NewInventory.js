import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';

class NewInventory extends Component {
  render() {
    return (
      <div className="animated fadeIn">
          <h2>Description of Inventory Management</h2>
          <p>This screen will replace the existing excel document the dealership is currently using.</p>
          <p>When the user updates a column, it saves it to the database instantly.</p>
          <p>In addition to updating information, the user will be able to upload & attach photos to each vehicle.</p>
          <p></p>
          <p></p>
          <p></p>
          {
          /*This component needs data and attributes configured to run
           *<ReactDataGrid />
           */
          }
      </div>
    )
  }
}

export default NewInventory;
