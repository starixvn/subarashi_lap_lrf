import React from 'react'
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer.jsx'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import Store from '../../../lib/store'
import { SupportTaskOptions } from '../lib/constants';

const defaultState = Object.assign({}, window.initialState, { isLoading: false, selectedSupportTask: SupportTaskOptions[0].value });
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

ReactDOM.render(<App />, document.getElementById("app-container"));