
import React from 'react';
import { connect } from 'react-redux'; 

export const AppContainer = (props) => {
return <div>App Container{props.selectedTab}</div>
}

function mapStateToProps(state) {
    const { selectedTab } = state;
    return Object.assign({}, { selectedTab });
}

export default connect(mapStateToProps)(AppContainer);