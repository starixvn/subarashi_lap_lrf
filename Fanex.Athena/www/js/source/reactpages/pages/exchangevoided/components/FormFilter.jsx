import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '../../../lib/langHelper';
import { DatePicker } from '@9softstudio/react-datepicker';

export class FormFilter extends Component {
    constructor(props) {
        super(props);

        this.state = { ...this.props.requestParam };
    }

    submit = (event) => {
        event.preventDefault();
        const params = this._getParams();
        if (!params) {
            return;
        }

        console.log(params);
        this.props.setRequestParam(params);
    }

    exportExcel = (event) => {
        event.preventDefault();
    }

    _getParams() {
        return {
            ...this.state,
            pageNumber: 1
        }
    }

    handleChangeDate = (momentDate) => {
        this.setState({ selectedDate: momentDate.format("MM/DD/YYYY") });
    }

    handleChangeInput = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const { dateConstraint } = this.props;
        const { selectedDate } = this.state;

        return (
            <div className='page-filter'>
                <div className='row'>
                    <div className='col-12 col-sm-7 col-md-3 col-xl-2'>
                        <div className='form-group'>
                            <label className='label-text'>{LangHelper.getSingleResource('Date')}</label>
                            <DatePicker
                                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate} date={selectedDate}
                                onChange={this.handleChangeDate} />
                        </div>
                    </div>

                    <div className='col-12 col-sm-4 col-md-3 col-xl-2'>
                        <div className='form-group'>
                            <label className='label-text'>{LangHelper.getSingleResource('RefNo')}</label>
                            <input className="input-text" id="refNo" name="refNo" type="text"
                                autoComplete="off" onChange={this.handleChangeInput} />
                        </div>
                    </div>

                    <div className='col-12 col-sm-4 col-md-3 col-xl-2'>
                        <div className='form-group'>
                            <label className='label-text'>{LangHelper.getSingleResource('Username')}</label>
                            <input className="input-text" id="userName" name="userName" type="text"
                                autoComplete="off" onChange={this.handleChangeInput} />
                        </div>
                    </div>

                    <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit"
                                onClick={this.submit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>

                <div className="caret-block">
                    <i className="icon-excel right" onClick={this.exportExcel} title={LangHelper.getSingleResource('ExportToExcel')}></i>
                </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, exportExcel } = ActionCreators;
    return bindActionCreators({ setRequestParam, exportExcel }, dispatch);
};

function mapStateToProps(state) {
    const { requestParam, dateConstraint } = state;
    return Object.assign({}, { requestParam, dateConstraint });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);