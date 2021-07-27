import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';

import 'index.css';
import configureStore from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <MuiPickersUtilsProvider utils={DayJsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
