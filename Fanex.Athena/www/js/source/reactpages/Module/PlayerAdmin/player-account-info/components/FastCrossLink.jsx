import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index.js'
import { bindActionCreators } from 'redux'

export class FastCrossLink extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
    }

    render() {
        return (
            <div>
                <h4>Fast Cross Link</h4>
                <div><span><a href="#">Betting Ticket Center</a></span><strong className="divider">></strong> <span><a href="#">Running</a></span></div>
                <div><span><a href="#">Customer Win Loss</a></span></div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return Object.assign({}, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(FastCrossLink);