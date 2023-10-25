import React from 'react';
import { connect } from 'react-redux';

import PlayerProfile from './PlayerProfile';

export const Content = (props) => {
    if (!props.isSubmitted) {
        return null;
    }

    return (
        <div className="result-content">
            <PlayerProfile />
        </div>
    )
}

function mapStateToProps(state) {
    const { isSubmitted, param } = state;
    return Object.assign({}, { isSubmitted, param });
};

export default connect(mapStateToProps)(Content);
