import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import MultipleSelect from '@9softstudio/react-multiselect'
import Select from 'react-select'
import LangHelper from '@jsroot/lib/langHelper'
import AppData from '@jsroot/lib/AppData'
import DataService from '@jsroot/lib/DataService.js'
import Site from '@jsroot/lib/site'
import { SupportTaskOptions, ExportUrl, ExportFileName } from '../lib/constants';

const FormFilter = ({ selectedCurrency, selectedSupportTask, setSelectedSupportTask, setSelectedCurrency, toggleLoader }) => {

    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;
        return currencyList && currencyList.length && (
            <MultipleSelect id="ddlCurrency"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={"key"}
                valueField={"value"}
                statusField={"status"}
                onChange={(_, selectedItemsKey) => setSelectedCurrency(selectedItemsKey)} />);
    }

    const _exportExcel = (event) => {
        event.preventDefault();
        toggleLoader(true);

        const params = {
            currencyIdList: selectedCurrency,
            supportTask: selectedSupportTask,
            ...Site.getLrfSubsidiary()
        }

        DataService.getReportFile(ExportUrl, params)
            .then((response) => {
                toggleLoader(false);
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource("NoInfo"));
                } else {
                    Site.downloadFile(response.data, ExportFileName);
                }
            }).catch(error => {
                alert(LangHelper.getSingleResource("ErrorProcessingMsg"));
                toggleLoader(false);
            });;
    }

    const _renderSupportTaskSelectList = () => {
        return (
            <Select instanceId="Support-Task"
                isSearchable={false}
                value={selectedSupportTask}
                options={SupportTaskOptions}
                onChange={(item) => setSelectedSupportTask(item.value)} />
        );
    }

    return (
        <div className="page-filter">
            <div className="row">
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                        {_renderCurrencySelectList()}
                    </div>
                </div>
                <div className="col-12 col-md-5 col-sm-3 col-lg-4 col-xl-3">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("SupportTask")}</label>
                        {_renderSupportTaskSelectList()}
                    </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" className="btn btn-submit" disabled={!selectedCurrency} onClick={_exportExcel}>{LangHelper.getSingleResource('ExportToExcel')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { selectedCurrency, selectedSupportTask } = state;
    return Object.assign({}, {
        selectedCurrency,
        selectedSupportTask
    });
}

function mapDispatchToProps(dispatch) {
    const { setSelectedCurrency, setSelectedSupportTask, toggleLoader } = ActionCreators;

    return bindActionCreators(Object.assign({}, {
        setSelectedCurrency, setSelectedSupportTask, toggleLoader
    }), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);