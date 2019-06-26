import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer.jsx';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import Store from '../../../../lib/store';
import { columnList } from '../lib/constants';

const { type } = window.initialState;
const displayedColumnList = columnList(type).map(item => ({...item }));
const defaultState = {...window.initialState, displayedColumnList};
const store = Store.createStore(reducer, defaultState);

const App = React.memo(() => {
    return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
})

ReactDOM.render(<App />, document.getElementById("app-container"));