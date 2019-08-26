import React, { PureComponent  } from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import SettingGridRow from './SettingGridRow';

export default class SettingGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.row = {};

        this.state = {
            data: props.data
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            this.row = {};
            this.setState({ data: this.props.data });
        }

        if (prevState.data !== this.state.data) {
            this.reset();
        }
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

    reset() {
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

    copyData() {
        const copySportId = setting.CopySportId;
        const copyRow = this.row[copySportId];

        if (copyRow) {
            const result = copyRow.validate();

            if (result !== null) {
                showErrorMsg(result.input, result.msg);
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

    removeCopyData() {
        const keys = Object.keys(this.row);

        for (let i = 0; i < keys.length; i++) {
            const item = this.row[keys[i]];
            item.disable(false);
        }
    }

    _showError(invalidInput, msg) {
        const showErrorMsg = this.props.showErrorMsg;

        showErrorMsg && showErrorMsg(invalidInput, msg);
    }

    setRef(id, element) {
        if (element !== null) {
            this.row[id] = element;
        }
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
                <SettingGridRow key={item.SportId} data={item} ref={(e) => this.setRef(item.SportId, e)} editable={editable} />
            )
        }

        return <tbody>{rows}</tbody>;
    }

    render() {
        const { editable } = this.props.setting;
        const { data } = this.state;

        return (
            <div>
                <table className="table">
                    {this._buildHeader()}
                    {this._buildBody(data, editable)}
                </table>
            </div>
        );
    }
}