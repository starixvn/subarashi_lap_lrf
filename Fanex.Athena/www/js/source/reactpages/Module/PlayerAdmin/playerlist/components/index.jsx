import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Store from '@jsroot/lib/store';
import { generateColumnList } from '../lib/config';
import '../../resources';

const { type } = window.initialState;
const hasBaPermission = window._pConfig.hasBaPermission === 1;
const displayedColumnList = generateColumnList(type, hasBaPermission);
const defaultState = { ...window.initialState, displayedColumnList, hasBaPermission };
const store = Store.createStore(reducer, defaultState);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

render(<App />, document.getElementById("app-container"));