import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Store from '@jsroot/lib/store';
import AppData from '@jsroot/lib/AppData';

const { currencyList } = AppData;
const selectedCurrency = currencyList.map(x => x.Key).join(',');

const { today, ...initialState } = window.initialState;
const requestParam = {
  pageSize: 50,
  pageIndex: 1,
  sortBy: '',
  sortOrder: '',
  currencyIdList: selectedCurrency,
  date: today
}

const defaultState = { ...initialState, requestParam };
const store = Store.createStore(reducer, defaultState);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

render(<App />, document.getElementById("app-container"));