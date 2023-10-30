import React from "react";
import { connect } from "react-redux";
import NoDataTitle from '@jsroot/components/NoDataTitle';

import PlayerProfile from "./PlayerProfile";

export const Content = (props) => {
    if (!props.isSubmitted) {
        return null;
    }

    if (JSON.stringify(props.userInfo) === '{}') {
        return <NoDataTitle />;
    }

    return (
        <div className='result-content'>
            <PlayerProfile />
        </div>
    );
};

function mapStateToProps(state) {
    const { isSubmitted, param, userInfo } = state;
    return Object.assign({}, { isSubmitted, param, userInfo });
}

export default connect(mapStateToProps)(Content);
