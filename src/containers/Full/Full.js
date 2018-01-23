import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import NewInventory from '../../views/NewInventory/';
import UsedInventory from '../../views/UsedInventory/';
import Integrations from '../../views/Integrations/';
import Leads from '../../views/Leads/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>

          <main className="main">
            <Breadcrumb />
            <Container fluid>

              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/newinventory" name="NewInventory" component={NewInventory}/>
                <Route path="/usedinventory" name="UsedInventory" component={UsedInventory}/>
                <Route path="/integrations" name="Integrations" component={Integrations}/>
                <Route path="/leads" name="Leads" component={Leads}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
