import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CarData from './home/data';
import DetailBlock from './home/detail';
import { HashRouter, Switch, Route } from 'react-router-dom';

if(document.getElementById('root')){
    ReactDOM.render(
            <HashRouter>
                <Switch>
                    <Route path="/" exact={true} component={CarData} />
                    <Route path="/:id/detail" component={DetailBlock} />
                </Switch>
            </HashRouter>
        , document.getElementById('root')
    );
}
/* back button event tracking to avoid the scroll lock*/
if (window.history && window.history.pushState) {
  $(window).on('popstate', function() {
    $('html, body').removeAttr('style')
	});
}
