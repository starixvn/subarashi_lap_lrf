import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import { Provider } from 'react-redux';
import Store from '@jsroot/lib/store';
import reducers from './reducers';
const data = (() => {
  let data = []
  for(let  i = 1; i <1000; i ++) {
    data.push({  ExternalId: i, SystemId: i, MarkDate: '12/12/2018', IsVipTagging: i % 3 === 0 ? true : false });
  }
  return data;
})();


const defaultState = {
   isLoading: false,
   isGetAll: true,
   playerList: data,
   selectedParams: {
     pageSize: 500,
     pageIndex: 1,
   },
   pagingOption: {
    PageIndex: 1,
    PageSize: 500,
    PageList: [500, 1000, 1500, 2000],
    TotalItem: data.length
}
}
const store = Store.createStore(reducers, defaultState);

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}