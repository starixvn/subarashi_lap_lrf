import React, { PureComponent  } from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import SBSettingGridRow from './SBSettingGridRow';
import CheckBox from '@jsroot/components/CheckBox';

export default class SBSettingGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.row = {};

        this.state = {
            isCopy: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.reset();
        }
    }

    reset() {
        if (this.state.isCopy) {
            this.setState({ isCopy: false });
        }

        const keys = Object.keys(this.row);

        for (let i = 0; i < keys.length; i++) {
            const item = this.row[keys[i]];
            item.reset();
        }
    }

    validate() {
        const keys = Object.keys(this.row);

        for (let i = 0; i < keys.length; i++) {
            const item = this.row[keys[i]];

            const result = item.validate();
            if (result !== null) {
                this._showError(result.input, result.msg);
                return false;
            }
        }

        return true;
    }

    get value() {
        let params = [];

        const keys = Object.keys(this.row);
        for (let i = 0; i < keys.length; i++) {
            const item = this.row[keys[i]];
            params.push(item.value);
        }

        return params;
    }

    _showError(invalidInput, msg) {
        const showErrorMsg = this.props.showErrorMsg;

        showErrorMsg && showErrorMsg(invalidInput, msg);
    }

    setRef(id, element) {
        this.row[id] = element;
    }

    _buildHeader() {
        return (
            <thead>
                <tr>
                    <th>{LangHelper.getSingleResource('Sport')}</th>
                    <th>{LangHelper.getSingleResource('MinBet')}</th>
                    <th>{LangHelper.getSingleResource('MaxBet')}</th>
                    <th>{LangHelper.getSingleResource('MaxPerMatch')}</th>
                </tr>
            </thead>
        );
    }

    _buildBody(data, editable) {
        let rows = [];

        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            rows.push(
                <SBSettingGridRow key={item.SportId} data={item} ref={(e) => this.setRef(item.SportId, e)} editable={editable} />
            )
        }

        return <tbody>{rows}</tbody>;
    }

    _copyData() {
        const copySportId = this.props.copySportId;
        const copyRow = this.row[copySportId];

        if (copyRow) {
            const result = copyRow.validate();

            if (result !== null) {
                this._showError(result.input, result.msg);
                return false;
            }

            const keys = Object.keys(this.row);
            const data = copyRow.value;

            for (let i = 0; i < keys.length; i++) {
                const id = keys[i];
                if (id !== copySportId) {
                    const item = this.row[id];
                    item.updateData(data);
                    item.disable(true);
                }
            }

            return true;
        }

        return false;
    }

    _removeCopyData() {
        const keys = Object.keys(this.row);

        for (let i = 0; i < keys.length; i++) {
            const item = this.row[keys[i]];
            item.disable(false);
        }
    }

    onCheck = (checked) => {
        let isCopy = checked;

        if (checked) {
            if (!this._copyData()) {
                isCopy = false
            }
        }
        else {
            this._removeCopyData();
        }

        this.setState({ isCopy: isCopy });
    }

    render() {
        const { data, enableCopy, editable } = this.props;
        const { isCopy, errorMsg, showError, errorPosition } = this.state;

        return (
            <div>
                {
                    enableCopy && editable &&
                    <CheckBox id="IsCopy"
                        checked={isCopy}
                        onChange={this.onCheck}
                        label={LangHelper.getSingleResource("CopyBetSettingFromSoccer")} />
                }
                <table className="table">
                    {this._buildHeader()}
                    {this._buildBody(data, editable)}
                </table>
            </div>
        );
    }
}