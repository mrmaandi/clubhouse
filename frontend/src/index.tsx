import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './styles/styles.scss';
import 'react-jinke-music-player/lib/styles/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure } from 'mobx';

configure({
    enforceActions: 'never',
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
