import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '../../../lib/langHelper';
import { DatePicker } from '@9softstudio/react-datepicker';
import Note from './Note';
import CollapsiblePanel from '@jsroot/components/collapsible-panel';
import Select from 'react-select'
import AppData from '@jsroot/lib/AppData';

export class FormFilter extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { ...this.props.requestParam, isFilterCollapsing: false };
    }

    submit = (event) => {
        event.preventDefault();
        const { isFilterCollapsing, ...inputParam } = this.state;
        const params = {
            ...inputParam,
            pageIndex: 1,
            timeZone: this.props.selectedTimeZone
        };

        this.props.setRequestParam(params);
    }

    exportExcel = (event) => {
        event.preventDefault();
        const { gridData } = this.props;

        if (!gridData.dataList) {
            window.alert(LangHelper.getSingleResource("NoInfo"));
            return;
        }
        const timezone = AppData.timeZoneList.find(x => x.value === this.props.selectedTimeZone).label;
        const reportTitle = `${LangHelper.getSingleResource('BettingTicketCenter')}, ${timezone}, ${this.state.selectedDate}`;
        this.props.exportExcel(gridData.dataList, reportTitle);
    }

    handleChangeDate = (momentDate) => {
        this.setState({ selectedDate: momentDate.format("MM/DD/YYYY") });
    }

    handleChangeInput = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleCollapse = (isCollapse) => {
        this.setState({isFilterCollapsing: isCollapse});
    }

    _renderSelectedTimeZone = () =>{
        const timeZoneList = AppData.timeZoneList;

        return timeZoneList && timeZoneList.length && (
            <Select instanceId="TimeZoneList"
                value={this.props.selectedTimeZone}
                options={timeZoneList}
                onChange={(item) => this._onChangeTimeZone(item.value)} />
        );
    }

    _onChangeTimeZone = (value) =>{
        this.props.setSelectedTimeZone(value);
    }

    render() {
        const { dateConstraint } = this.props;
        const { selectedDate, isFilterCollapsing } = this.state;
        const iconToggle = {
            tag: 'div',
            className: isFilterCollapsing ? 'chevron down' : 'chevron up',
            style: {}
        }

        return (
            <CollapsiblePanel className="page-filter" iconToggle={iconToggle}
                onCollapse={() => this.handleCollapse(true)} onExpand={() => this.handleCollapse(false)}>
                <div className="row">
                    <div className="col-12 col-sm-7 col-md-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                            <DatePicker
                                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate} date={selectedDate}
                                onChange={this.handleChangeDate} />
                        </div>
                    </div>

                    <div className="col-12 col-sm-7 col-md-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('TimeZone')}</label>
                            {this._renderSelectedTimeZone()}
                        </div>
                    </div>

                    <div className="col-12 col-sm-4 col-md-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('RefNo')}</label>
                            <input className="input-text" id="refNo" name="refNo" type="text" autoComplete="off"
                                placeholder={LangHelper.getSingleResource("RefNo")} onChange={this.handleChangeInput} />
                        </div>
                    </div>

                    <div className="col-12 col-sm-4 col-md-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Username')}</label>
                            <input className="input-text" id="userName" name="userName" type="text" autoComplete="off"
                                placeholder={LangHelper.getSingleResource("ExternalIdOrSystemId")} onChange={this.handleChangeInput} />
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
                <Note />
            </CollapsiblePanel>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam, exportExcel, setSelectedTimeZone } = ActionCreators;
    return bindActionCreators({ setRequestParam, exportExcel, setSelectedTimeZone }, dispatch);
}

function mapStateToProps(state) {
    const { requestParam, dateConstraint, gridData , selectedTimeZone} = state;
    return Object.assign({}, { requestParam, dateConstraint, gridData, selectedTimeZone });
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);