import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import { Provider } from 'react-redux';
import Store from '@jsroot/lib/store';
import reducers from './reducers';
import { tabKeys } from '../../lib/constants';

const initialState = {
  ...window.initialState[tabKeys.oddsGroupSetting],
  userGuideContent: '',
}

export default () => {
  const store = Store.createStore(reducers, initialState);
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}