import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/lib/langHelper';
import DataService from '@jsroot/lib/DataService';
import { toggleLoader } from '@jsroot/actions/loaderAction';


export const FormFilter = props => {
    const isValidParam = !!props.username;

    const _handleSubmit = () => {
        props.toggleLoader(true);

        const url = "api/CustomerAdministration/GetCustomerInfoByUserName";
        const params = {
            userName: props.username,
        };

        DataService.postData(url, params)
            .then(response => {
                props.setUserInfo(response.data);
                props.toggleLoader(false);
                props.setSubmitted(true);
            })
            .catch(error => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                console.error(error.message);
                props.toggleLoader(false);
                props.setSubmitted(true);
            })
    }

    return (
        <div className="page-filter">
            <div className="row">
                <div className="col-12 col-md-4 col-sm-6 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Username")}*</label>
                        <input className="input-text" id="username" name="username" type="text" value={props.username}
                            onChange={(event) => props.setUsername(event.target.value)} />
                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit" disabled={!isValidParam}
                                onClick={_handleSubmit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    const { setUsername, setSubmitted , setUserInfo} = ActionCreators;
    return bindActionCreators({setUsername, setSubmitted, toggleLoader, setUserInfo }, dispatch);
}

function mapStateToProps(state) {
    const { username, isSubmitted } = state;
    return Object.assign({}, { username, isSubmitted });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
