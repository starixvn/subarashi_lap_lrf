import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import { Provider } from 'react-redux';
import Store from '@jsroot/lib/store';
import reducers from './reducers';
const data = (() => {
  let data = []
  for(let  i = 1; i < 1; i ++) {
    data.push({  externalId: i, systemId: i, isVipTagging:  true, isMarkVoid: i % 3 === 0 ? true : false });
  }
  return data;
})();



export default (props) => {
  const defaultState = {
    isLoading: false,
    isGetAll: true,
    playerList: null,
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
    }
  }
  const store = Store.createStore(reducers, defaultState);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}