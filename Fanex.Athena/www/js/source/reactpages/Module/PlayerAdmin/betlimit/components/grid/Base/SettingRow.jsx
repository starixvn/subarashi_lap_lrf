import React, { PureComponent  } from 'react';
import Service from '../../../lib/service';
import LangHelper from '@jsroot/lib/langHelper';
import SettingInput from './SettingInput';
import { InputClassName } from '../../../lib/constants';

export default class SettingRow extends PureComponent {
    constructor(props) {
        super(props);

        this.cell = {};
    }

    get value() {
        const data = this.props.data;

        let result = {
            SportId: data.SportId,
            BetType: data.BetType,
            IsUpdated: false
        };

        const keys = Object.keys(this.cell);

        for (let i = 0; i < keys.length; i++) {
            const type = keys[i];
            const value = Service.getValueAsNumber(this.cell[type].value);

            result[type] = value;
            result.IsUpdated = result.IsUpdated || value != data[type]
        }

        return result;
    }

    setCell = (type, element) => {
        this.cell[type] = element;
    }

    validate() {
        const { validate, data } = this.props;

        const result = validate(this.value, data);
        if (result) {
            return {
                input: this.cell[result.type],
                msg: result.msg
            }
        }

        return null;
    }

    onBlur = (e) => {
        const element = e.target;
        this._handleInputChanged(element, Service.formatValue(Service.getValueAsNumber(element.value)));
    }

    reset() {
        const keys = Object.keys(this.cell);

        for (let i = 0; i < keys.length; i++) {
            const item = this.cell[keys[i]];
            this._handleInputChanged(item, item.current.defaultValue);
            item.disabled = false;
        }
    }

    disable(isDisabled) {
        for (let i = 0; i < keys.length; i++) {
            const item = this.cell[keys[i]];
            item.current.disabled = isDisabled;
        }
    }

    updateData(data) {
        for (let i = 0; i < keys.length; i++) {
            const type = keys[i];
            const item = this.cell[type];
            this._handleInputChanged(item, Service.formatValue(data[type]));
        }
    }

    _handleInputChanged(element, value) {
        if (element.value !== value) {
            element.value = value;
        }

        if (value !== element.defaultValue) {
            element.setAttribute('class', InputClassName.OnChangedClassName);
        }
        else {
            element.setAttribute('class', InputClassName.ClassName);
        }
    }

    _buildCell() {
        const { children, id } = this.props;

        return children.map((e, index) => {
            const { type } = e.props;

            return e.type === SettingInput
                ? <SettingInput
                    key={`${type}-${id}`}
                    className={InputClassName.ClassName}
                    setInputRef={this.setCell}
                    onBlur={this.onBlur}
                    {...e.props} />
                : <td key={`${index}-${id}`}>{e.props.children}</td>
            ;
        });
    }

    render() {
        return (
            <tr>
                {this._buildCell()}
            </tr>
        );
    }
}