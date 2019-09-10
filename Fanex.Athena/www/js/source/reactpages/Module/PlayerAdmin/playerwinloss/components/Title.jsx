import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import ReportTitle from '@jsroot/components/ReportTitle';
import AppData from '@jsroot/lib/AppData';
import LangHelper from '@jsroot/lib/langHelper';

export const Title = (props) => {
    const handleExportExcel = () => {
        const { gridData, hasCustomerComm, isAllowedBA, exportExcel } = props;
        exportExcel(gridData, hasCustomerComm, isAllowedBA, AppData.reportTitle);
    }

    const content = (
        <>
            <span className="caret-block">
                <span className="icon-excel-wrapper" onClick={handleExportExcel}>
                    <i className="icon-excel" title={LangHelper.getSingleResource('ExportToExcel')}></i>
                </span>
            </span>
            <span>{AppData.reportTitle}</span>
        </>
    )

    return (
        <ReportTitle tag="div" content={content} />
    )
}

function mapStateToProps(state) {
    const { gridData, hasCustomerComm, isAllowedBA } = state;
    return Object.assign({}, { gridData, hasCustomerComm, isAllowedBA });
};

function mapDispatchToProps(dispatch) {
    const { exportExcel } = ActionCreators;
    return bindActionCreators({ exportExcel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);