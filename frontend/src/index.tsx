import "core-js/stable";
import "regenerator-runtime/runtime";
import 'antd/dist/antd.less';
import './styles/styles.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root'),
);