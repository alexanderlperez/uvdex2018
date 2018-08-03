import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CarData from './home/data';
import DetailBlock from './home/detail';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

if(document.getElementById('root')){
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route path="/" exact={true} component={CarData} />
                <Route path="/:id/detail" component={DetailBlock} />
            </div>
        </BrowserRouter>
        , document.getElementById('root')
    );
}