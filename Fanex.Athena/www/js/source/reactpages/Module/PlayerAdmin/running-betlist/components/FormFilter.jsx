import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/lib/langHelper';
import Service from '../lib/service';

export class FormFilter extends Component {
    constructor(props) {
        super(props);
    }

    submit = () => {
        let param = { ...this.props.requestParam };
        param.TimeStamp = new Date().getTime();

        this.props.setRequestParam(param);
    }

    exportExcel = (event) => {
        event.preventDefault();

        const { requestParam } = this.props;

        this.props.toggleLoader(true);
        Service.export(requestParam, () => { this.props.toggleLoader(false) });
    }

    render() {
        return (
            <div className='page-filter'>
                <button type='button' className='btn btn-submit' onClick={this.submit}>{LangHelper.getSingleResource('Refresh')}</button>
                <div className='caret-block'>
                    <i className='icon-excel right' onClick={this.exportExcel} title={LangHelper.getSingleResource('ExportToExcel')}></i>
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    const { setRequestParam, toggleLoader } = ActionCreators;
    return bindActionCreators({ setRequestParam, toggleLoader }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);