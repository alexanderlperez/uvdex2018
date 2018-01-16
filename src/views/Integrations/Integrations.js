import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class Integrations extends Component {
  render() {
    return (
      <div className="animated fadeIn">
         <h2>Desription of Integrations</h2>
          <p>Dealers want to be able to change the price of a vehicle and have it push to every website that carries that vehicle instantly.</p>
          <p>It likely we will have a job that runs at the end of every work day that pushes the existing inventory to all the dealerships other vehicle websites,</p>
          <p>however, this screen will allow the user to manually kick off the job.</p>
          <p></p>
          <p>Websites we can push to:</p>
          <p>*AutoTrader</p>
          <p>*Cars</p>
          <p>*CarsForSale</p>
      </div>
    )
  }
}

export default Integrations;
