import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class Leads extends Component {
  render() {
    return (
      <div className="animated fadeIn">
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
