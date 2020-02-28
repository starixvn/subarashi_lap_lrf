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
    selectedCurrency: "1,2",
    dateRange: { fromDate: '02/23/2020', toDate: '02/23/2020' },
    username: null,
    selectedParams: null,
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