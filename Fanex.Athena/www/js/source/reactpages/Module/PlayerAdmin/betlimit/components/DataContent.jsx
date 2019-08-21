import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Service from '../lib/service';
import LangHelper from '@jsroot/lib/langHelper';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import SBSettingGrid from './grid/SB/SBSettingGrid';
import Balloon from '@jsroot/components/Balloon';

const Controller = 'SportBookBetSetting';

export class DataContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            editable: false,
            showError: false,
            errorPosition: { top: 0, left: 0 },
            errorMsg: ''
        };

        this._getData(this.props.requestParam);

        this.grid = React.createRef();
        this.submitButton = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data) {
            this.props.toggleLoader(false);
        }
    }

    onReset = (e) => {
        this.grid.current.reset();
    }

    onSubmit = (e) => {
        if (this.grid.current.validate()) {
            
        }
    }

    onCloseError = () => {
        this.setState({ showError: false });
    }

    _updateState(data, editable) {
        this.setState({
            data: data,
            editable: editable
        });
    }

    _handleError() {
        Service.showErrorMsg();
        this.props.toggleLoader(false);
    }

    showErrorMsg = (invalidInput, msg) => {
        const pos = invalidInput.getBoundingClientRect();

        this.setState({
            showError: true,
            errorMsg: msg,
            errorPosition: { top: pos.top, left: pos.left + pos.width / 2 }
        }, () => invalidInput.focus());
    }

    _getData(param) {
        this.props.toggleLoader(true);

        const url = Controller + '/GetSetting';
        Service.getData(url, param, this._updateState.bind(this), null, this._handleError.bind(this));
    }

    render() {
        const data = this.state.data;

        if (!data || !data.length) {
            return <NoDataTitle />;
        }

        const { editable, showError, errorPosition, errorMsg } = this.state;
        const { productId } = this.props;

        return (
            <div className="pa-betlimit">
                <div className="pa-betlimit-grid">
                    <SBSettingGrid data={data} ref={this.grid} enableCopy={true} copyId='1' showErrorMsg={this.showErrorMsg} editable={editable}/>
                </div>
                {
                    editable &&
                    <div className="pa-betlimit-button">
                        <button type='button' className='btn btn-cancel' onClick={this.onReset}>
                            {LangHelper.getSingleResource('Reset')}
                        </button>
                        <button type='button' className='btn btn-submit' onClick={this.onSubmit} ref={this.submitButton}>
                            {LangHelper.getSingleResource('Submit')}
                        </button>
                    </div>
                }
                <Balloon
                    msg={errorMsg}
                    width={140}
                    isOpen={showError}
                    onClose={this.onCloseError}
                    targetTop={errorPosition.top}
                    targetLeft={errorPosition.left}
                    excludeOutSideComponents={[this.submitButton.current]} />
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