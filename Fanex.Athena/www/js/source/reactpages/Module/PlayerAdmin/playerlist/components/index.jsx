import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Store from '@jsroot/lib/store';
import { buildDefaultColumnList } from '../lib/helpers/gridColumnBuilder';

const { type } = window.initialState;
const hasBaPermission = window._pConfig.hasBaPermission === 1;
const hasOddsGroupPermission = window._pConfig.hasOddsGroupPermission === 1;
const hasSpecialLevelPermission = window._pConfig.hasSpecialLevelPermission === 1;

const displayedColumnList = buildDefaultColumnList(type);
const siteSetting = {
  isAllowedCustomerComm: false,
  isAllowedBA: false
}

const defaultState = { ...window.initialState, displayedColumnList, hasBaPermission, siteSetting, hasOddsGroupPermission, hasSpecialLevelPermission };
const store = Store.createStore(reducer, defaultState);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

render(<App />, document.getElementById("app-container"));