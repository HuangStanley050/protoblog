import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'draft-js/dist/Draft.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
