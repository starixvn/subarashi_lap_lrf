import React from 'react'
import ReactDOM from 'react-dom';
import AppContainer from './BTCContainer'
import { Provider } from 'react-redux'
import reducer from '../reducers/index.js'
import Store from '../../../lib/store'

const pagingOption = {
  PageIndex: 1,
  PageSize: 2000,
  TotalItem: 0,
  PageList: [2000]
}
const defaultState = Object.assign({}, window.initialState, {pagingOption});
const store = Store.createStore(reducer, defaultState);

export default class App extends React.Component {
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

ReactDOM.render(<App />, document.getElementById('app-container'));