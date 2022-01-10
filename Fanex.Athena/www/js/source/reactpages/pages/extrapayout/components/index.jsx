import React from 'react'
import { render } from 'react-dom';
import AppContainer from './AppContainer.jsx'
import { Provider } from 'react-redux'
import reducer from '../reducers/index.js'
import Store from '@jsroot/lib/store'
import { DefaultPageSize } from '../common/constants'

const defaultState = Object.assign({}, window.initialState, { userGuideContent: '', reportFilter: { PageSize: DefaultPageSize } });
const store = Store.createStore(reducer, defaultState);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

render(<App />, document.getElementById("app-container"));