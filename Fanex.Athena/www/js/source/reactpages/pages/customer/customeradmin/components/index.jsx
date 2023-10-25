import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Store from '@jsroot/lib/store';
import { tabMenuList } from '../lib/constants';

const defaultState = {
  selectedTabKey: tabMenuList[0].key,
  ...window.initialState
}
const store = Store.createStore(reducer, defaultState);

const App = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
}

render(<App />, document.getElementById("app-container"));
