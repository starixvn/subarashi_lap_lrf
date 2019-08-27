import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Service from '../lib/service';
import LangHelper from '@jsroot/lib/langHelper';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import DCSSetting from './grid/DCS/DCSSetting';
import SBSetting from './grid/SB/SBSetting';
import NGSetting from './grid/NG/NGSetting';
import Balloon from '@jsroot/components/Balloon';
import Alert from '@jsroot/components/sweet-alert';
import { BetLimitProduct } from '../lib/constants';

const DataGrid = {
    [BetLimitProduct.SB]: SBSetting,
    [BetLimitProduct.VS]: DCSSetting,
    [BetLimitProduct.VS2]: DCSSetting,
    [BetLimitProduct.LT]: DCSSetting,
    [BetLimitProduct.NG]: NGSetting
};

export class DataContent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            setting: { Editable: false, EnableCopy: false, CopySportId: 0 },
            showError: false,
            showAlert: false,
            errorBalloon: { msg: '', targetTop: 0, targetLeft: 0 },
            alertOption: { children: ''},
            disableButton: false
        };

        this._getData(this.props.requestParam);

        this.grid = React.createRef();
        this.submitButton = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data) {
            this.props.toggleLoader(false);
        }

        if (prevProps.requestParam !== this.props.requestParam) {
            this._getData(this.props.requestParam);
        }
    }

    onReset = (e) => {
        this.grid.current.reset();
    }

    onSubmit = (e) => {
        if (this.grid.current.validate()) {
            this._showConfirmation();
        }
    }

    onCloseError = () => {
        this.setState({ showError: false });
    }

    onCloseAlert = () => {
        this.setState({ showAlert: false, disableButton: false });
    }

    refresh = () => {
        this.onCloseAlert();
        this._getData(this.props.requestParam);
    }

    submit = () => {
        this.props.toggleLoader(true);

        let param = { ...this.props.requestParam };
        param.Setting = this.grid.current.value;

        Service.updateData(param, this._showSubmitResult.bind(this), () => this.props.toggleLoader(false), this._handleError.bind(this));
    }

    showErrorMsg = (invalidInput, msg) => {
        const pos = invalidInput.getBoundingClientRect();

        this.setState({
            showError: true,
            errorBalloon: { msg: msg, targetTop: pos.top, targetLeft: pos.left + pos.width / 2 }
        }, () => invalidInput.focus());
    }

    _handleError() {
        Service.showErrorMsg();
        this.props.toggleLoader(false);
    }

    _showConfirmation() {
        const buttons = [
            {
                text: LangHelper.getSingleResource('OK'),
                onClick: this.submit,
                className: 'btn btn-apply'
            }, {
                text: LangHelper.getSingleResource('Cancel'),
                onClick: this.onCloseAlert,
                className: 'btn btn-cancel'
            }];

        const msg = (<p className="center-align">{Service.getConfirmationMsg(this.props.requestParam.ProductId)}</p>);

        this.setState({
            showAlert: true,
            disableButton: true,
            alertOption: { title: LangHelper.getSingleResource('Confirmation'), children: msg, buttons: buttons, onClose: this.onCloseAlert, height: 130 }
        });
    }

    _showSubmitResult(title, msg, isSuccess) {
        const content = (<p className="center-align">{msg}</p>);

        this.setState({
            showAlert: true,
            disableButton: true,
            alertOption: { title: title, children: content, onClose: this.refresh, icon: isSuccess ? 'success' : 'error', height: 180 }
        });
    }

    _updateState(data, setting) {
        this.setState((state) => ({
            data: data,
            setting: Object.assign({}, state.setting, setting)
        }));
    }

    _getData(param) {
        this.props.toggleLoader(true);

        Service.getData(param, this._updateState.bind(this), null, this._handleError.bind(this));
    }

    render() {
        const data = this.state.data;

        if (!data || !data.length) {
            return <NoDataTitle />;
        }

        const { setting, disableButton, showError, errorBalloon, showAlert, alertOption } = this.state;
        const { ProductId } = this.props.requestParam;
        const Grid = DataGrid[ProductId];

        return (
            <div className="pa-betlimit">
                <div className="pa-betlimit-grid">
                    <Grid
                        data={data}
                        ref={this.grid}
                        setting={setting}
                        showErrorMsg={this.showErrorMsg} />
                </div>
                {
                    setting.Editable &&
                    <div className="pa-betlimit-button">
                        <button type='button' className='btn btn-cancel' disabled={disableButton} onClick={this.onReset}>
                            {LangHelper.getSingleResource('Reset')}
                        </button>
                        <button type='button' className='btn btn-apply' disabled={disableButton} onClick={this.onSubmit} ref={this.submitButton}>
                            {LangHelper.getSingleResource('Submit')}
                        </button>
                    </div>
                }
                <Balloon
                    width={140}
                    isOpen={showError}
                    onClose={this.onCloseError}
                    excludeOutSideComponents={[this.submitButton.current]}
                    {...errorBalloon}
                />
                <Alert
                    width={450}
                    isShow={showAlert}
                    isHtml={false}
                    {...alertOption}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { toggleLoader, setRequestParam } = ActionCreators;
    return bindActionCreators({ toggleLoader, setRequestParam }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps, mapDispatchToProps)(DataContent);