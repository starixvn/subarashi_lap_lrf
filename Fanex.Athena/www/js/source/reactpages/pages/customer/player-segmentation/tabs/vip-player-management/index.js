import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import { Provider } from 'react-redux';
import Store from '@jsroot/lib/store';
import reducers from './reducers';

export default (props) => {
  const { selectedTabKey } = props;
  const defaultState = {
    selectedTabKey,
    isLoading: false,
    isGetAll: true,
    playerList: null,
    username: null,
    selectedVipOption: 0,
    selectedCurrency: '1,2',
    selectedParams: {
      pageSize: 500,
      pageIndex: 1,
    },
    pagingOption: {
      PageIndex: 1,
      PageSize: 500,
      PageList: [500, 1000, 1500, 2000],
      TotalItem: null
    }
  }
  
  const store = Store.createStore(reducers, defaultState);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}