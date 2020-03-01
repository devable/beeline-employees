import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'assets/css/style.css';
import App from 'containers/App';
import * as serviceWorker from 'serviceWorker';

ReactDOM.render(<App />, document.getElementById('beeline'));

serviceWorker.unregister();
