import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import { bindActionCreators } from 'redux'

export const FastCrossLink = () => {
    return (
        <div className="panel">
            <div className="panel-header">Fast Cross-Link</div>
            <div className="panel-body">
                <div>
                    <span><a className="link" href="#">Betting Ticket Center</a></span>
                    <strong className="divider">></strong>
                    <span><a className="link" href="#">Single Customer</a></span>
                </div>
                <div><span><a className="link" href="#">Customer Win Loss</a></span></div>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return Object.assign({}, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(FastCrossLink);