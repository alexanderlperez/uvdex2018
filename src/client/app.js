import React from 'react';
import ReactDOM from 'react-dom';
import Media from 'react-media';
import {slide as Menu} from 'react-burger-menu';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './scss/app.scss';
import './scss/components/react-burger-menu.scss';

class UVDexApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

ReactDOM.render(<UVDexApp />, document.querySelector('#app'));
