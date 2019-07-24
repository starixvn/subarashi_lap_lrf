import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Store from '@jsroot/lib/store';
import { columnList } from '../lib/constants';

const { type } = window.initialState;
const displayedColumnList = columnList(type).map(item => ({ ...item }));
const defaultState = { ...window.initialState, displayedColumnList };
const store = Store.createStore(reducer, defaultState);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

render(<App />, document.getElementById("app-container"));