import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/index.js'
import { bindActionCreators } from 'redux'

export const CustomerBettingStatus = (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const params = {};
            props.getCustomerBettingStatus(params)
                .then(response => {
                    setData(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }

        fetchData();
    }, []);

    return data && (
        <div className="panel">
            <div className="panel-header">
                Player Betting Status
                </div>
            <div className="panel-body">
                <p>Win: {data.Win}</p>
                <p>Loss: {data.Loss}</p>
                <p>Void/Reject/Cancel: {data.VoidRejectCancel}</p>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { getCustomerBettingStatus } = ActionCreators;
    return bindActionCreators({ getCustomerBettingStatus }, dispatch);
}

function mapStateToProps(state) {
    return Object.assign({}, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerBettingStatus);