import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import { Provider } from 'react-redux';
import Store from '@jsroot/lib/store';
import AppData from '@jsroot/lib/AppData';
import reducers from './reducers';
import { tabKeys } from '../../lib/constants';

const initialState = {
  ...window.initialState[tabKeys.monitoredPlayer],
  ...{
    permissions: {
      canEdit: AppData[tabKeys.monitoredPlayer].canEdit,
      showVipPlayer: AppData.HasVipManagement,
      showProblemPlayer: AppData.TabKeys.some(_ => _ === tabKeys.problemPlayer)
    },
    userGuideContent: '',
    pagingOption: {
      PageIndex: 1,
      PageSize: 500,
      PageList: [500, 1000, 1500, 2000],
      TotalItem: null
    }
  }
}

export default () => {
  const store = Store.createStore(reducers, initialState);
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}