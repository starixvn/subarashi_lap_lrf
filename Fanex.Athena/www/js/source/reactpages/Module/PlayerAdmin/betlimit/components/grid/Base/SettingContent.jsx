import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { ActionCreators } from '../../../actions/index';
import LangHelper from '@jsroot/lib/langHelper';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import DataTransfer from '../../../lib/dataTransfer';

import Utility from '../../../lib/utility';
import CheckBox from '@jsroot/components/CheckBox';
import Balloon from '@jsroot/components/Balloon';

const SettingContent = (Grid, DataHandling) => {
    return class extends PureComponent {
        constructor(props) {
            super(props);

            this.state = {
                data: null,
                setting: { Editable: false, EnableCopy: false, CopyId: 0 },
                disableButton: false,
                isCopy: false,
                showError: false,
                errorBalloon: { msg: '', targetTop: 0, targetLeft: 0 }
            };

            this.ref = {};
            this.checkBoxRef = React.createRef();
            this.errorRef = React.createRef();
            this.submitButtonRef = React.createRef();
        }

        componentDidUpdate(prevProps, prevState) {
            if (prevState.data !== this.state.data) {
                this.props.toggleLoader(false);
            }

            if (prevState.showError !== this.state.showError) {
                window.setTimeout(() => {
                    if (this.state.showError) {
                        this._registerEvents();
                    }
                    else {
                        this._unRegisterEvents();
                    }
                }, 0);
            }
        }

        componentWillUnmount() {
            this._unRegisterEvents();
        }

        componentDidMount() {
            this._getData(this.props.requestParam);
        }

        _registerEvents() {
            document.addEventListener('click', this._handleClickOutSide);
        }

        _unRegisterEvents = () => {
            document.removeEventListener('click', this._handleClickOutSide);
        }

        _handleClickOutSide = (event) => {
            const isError = this.errorRef.current && this.errorRef.current.contains(event.target);
            const isCheckBox = this.checkBoxRef.current && this.checkBoxRef.current.contains(event.target);
            const isButton = this.submitButtonRef.current && this.submitButtonRef.current.contains(event.target);
            const clickOutside = !isError && !isCheckBox && !isButton;

            if (clickOutside && this.state.showError) {
                this._closeError();
            }
        }

        setInputRef = (type, id, element) => {
            this.ref[type] = this.ref[type] || {};
            this.ref[type][id] = element;
        }

        _closeError() {
            this.setState({ showError: false });
        }

        onReset = (e) => {
            e.preventDefault();

            if (!this.state.disabledButton || (e.button === 0 || e.which === 1)) {
                this.setState({ isCopy: false }, () => this._getData(this.props.requestParam));
            }
        }

        onChange = (data) => {
            this.setState({ data: data });
        }

        onSubmit = (e) => {
            e.preventDefault();

            if (!this.state.disabledButton && (e.button === 0 || e.which === 1)) {
                if (!this.state.showError) {
                    const data = this.state.data;
                    const submitData = DataHandling.getSubmitData(data);

                    if (!submitData.IsValid) {
                        this._showError(submitData.Data);
                    }
                    else {
                        this._showConfirmation(() => this._submit(submitData.Data));
                    }
                }
            }
        }

        onCheck = (checked) => {
            if (checked) {
                const { setting, errorBalloon, showError } = this.state;

                if (showError && errorBalloon.Id === setting.CopyId) {
                    return false;
                }

                const { data } = this.state;
                const copyRow = data.find(e => e.Id === setting.CopyId);
                const invalidData = DataHandling.validate(copyRow);

                if (invalidData !== null) {
                    this._showError(invalidData);
                }
                else {
                    const newData = data.map(e => {
                        if (e.Id === copyRow.id) {
                            return e;
                        }

                        return Object.assign({}, e, { MinBet: copyRow.MinBet, MaxBet: copyRow.MaxBet, MaxPerMatch: copyRow.MaxPerMatch });
                    });

                    this.setState({ isCopy: true, data: newData });
                }
            }
            else {
                this.setState({ isCopy: false });
            }
        }

        onCloseAlert = () => {
            this.setState({ disabledButton: false }, () => this.props.setAlertOption({ isShow: false }));
        }

        onRefresh = () => {
            this.props.setAlertOption({ isShow: false });
            this._getData(this.props.requestParam);
        }

        _submit(data) {
            this.props.toggleLoader(true);

            const requestParam = this.props.requestParam;
            const param = Object.assign({}, { ...this.props.requestParam }, { Setting: data });

            DataTransfer.updateData(param, this._showSubmitResult.bind(this), () => this.props.toggleLoader(false), this._handleError.bind(this));
        }

        _handleError() {
            Utility.showErrorMsg();
            this.props.toggleLoader(false);
        }

        _showConfirmation(onOK) {
            const buttons = [
                {
                    text: LangHelper.getSingleResource('OK'),
                    onClick: onOK,
                    className: 'btn btn-apply'
                }, {
                    text: LangHelper.getSingleResource('Cancel'),
                    onClick: this.onCloseAlert,
                    className: 'btn btn-cancel'
                }];

            const msg = (<p className="center-align">{Utility.getConfirmationMsg(this.props.requestParam.ProductId)}</p>);

            this.setState({ disabledButton: true }, () => this.props.setAlertOption({
                isShow: true,
                title: LangHelper.getSingleResource('Confirmation'),
                children: msg,
                buttons: buttons,
                icon: '',
                onClose: this.onCloseAlert,
                height: 130
            }));
        }

        _showSubmitResult(title, msg, isSuccess) {
            const content = (<p className="center-align">{msg}</p>);

            this.setState({ disabledButton: true }, () => this.props.setAlertOption({
                isShow: true,
                title: title,
                children: content,
                onClose: this.onRefresh,
                icon: isSuccess ? 'success' : 'error',
                height: 180,
                buttons: []
            }));
        }

        _showError(invalidData) {
            const invalidInput = this.ref[invalidData.Type][invalidData.Id];

            if (invalidInput) {
                const pos = invalidInput.getBoundingClientRect();

                this.setState({
                    showError: true,
                    errorBalloon: { msg: invalidData.Message, targetTop: pos.top, targetLeft: pos.left + pos.width / 2 }
                }, () => invalidInput.focus());
            }
        }

        _updateState(data, setting) {
            this.setState((state) => ({
                data: DataHandling.getViewData(data),
                setting: Object.assign({}, state.setting, setting),
                disableButton: false,
                isCopy: false,
                showError: false
            }));
        }

        _getData(param) {
            this.props.toggleLoader(true);

            DataTransfer.getData(param, this._updateState.bind(this), null, this._handleError.bind(this));
        }

        render() {
            const data = this.state.data;

            if (!data || !data.length) {
                return <NoDataTitle />;
            }

            const { setting, disabledButton, showError, errorBalloon, isCopy } = this.state;

            return (
                <div className="pa-betlimit">
                    {
                        setting.EnableCopy && setting.Editable &&
                        <CheckBox id="IsCopy"
                            checked={isCopy}
                            onChange={this.onCheck}
                            ref={this.checkBoxRef}
                            label={LangHelper.getSingleResource("CopyBetSettingFromSoccer")} />
                    }
                    <Grid
                        data={data}
                        setting={setting}
                        setInputRef={this.setInputRef}
                        onChange={this.onChange}
                        isCopy={isCopy} />
                    {
                        setting.Editable &&
                        <div className="pa-betlimit-button">
                            <button type='button' className='btn btn-cancel' disabled={disabledButton} onMouseDown={this.onReset}>
                                {LangHelper.getSingleResource('Reset')}
                            </button>
                            <button type='button' className='btn btn-apply' disabled={disabledButton} onMouseDown={this.onSubmit} ref={this.submitButtonRef}>
                                {LangHelper.getSingleResource('Submit')}
                            </button>
                        </div>
                    }         
                    {
                        setting.Editable &&
                        <Balloon
                            width={140}
                            isOpen={showError}
                            ref={this.errorRef}
                            {...errorBalloon}
                        />
                    }
                </div>
            );
        }
    }
}

function mapDispatchToProps(dispatch) {
    const { toggleLoader, setAlertOption } = ActionCreators;
    return bindActionCreators({ toggleLoader, setAlertOption }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

const createSetting = compose(connect(mapStateToProps, mapDispatchToProps), SettingContent);

export default createSetting;