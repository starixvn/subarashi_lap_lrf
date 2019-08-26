import React, { PureComponent  } from 'react';
import Service from '../../../lib/service';
import LangHelper from '@jsroot/lib/langHelper';

const ClassName = 'input-text right-align';
const OnChangedClassName = 'input-text right-align input-changed';

export default class SettingGridRow extends PureComponent {
    constructor(props) {
        super(props);

        this.minBet = React.createRef();
        this.maxBet = React.createRef();
        this.maxPerMatch = React.createRef();
    }

    get value() {
        const { MinBet, MaxBet, MaxPerMatch } = this.props.data;

        let value = {
            SportId: this.props.data.SportId,
            BetType: this.props.data.BetType,
            MinBet: Service.getValueAsNumber(this.minBet.current.value),
            MaxBet: Service.getValueAsNumber(this.maxBet.current.value),
            MaxPerMatch: Service.getValueAsNumber(this.maxPerMatch.current.value),
        };

        value.IsUpdated = value.MinBet !== MinBet && value.MaxBet !== MaxBet && value.MaxPerMatch !== MaxPerMatch;

        return value;
    }

    validate() {
        const { MinBet, MaxBet, MaxPerMatch } = this.value;

        if (isNaN(MinBet)) {
            return {
                input: this.minBet.current,
                msg: LangHelper.getSingleResource('IncorrectMinBet')
            };
        }
        if (isNaN(MaxBet)) {
            return {
                input: this.maxBet.current,
                msg: LangHelper.getSingleResource('IncorrectMaxBet')
            };
        }
        if (isNaN(MaxPerMatch)) {
            return {
                input: this.maxPerMatcth.current,
                msg: LangHelper.getSingleResource('IncorrectMaxPerMatch')
            };
        }

        const data = this.props.data;

        if (MinBet < data.BetValueMin) {
            return {
                input: this.minBet.current,
                msg: LangHelper.getSingleResource('MinBetGreaterThanOrEqual') + ' ' + data.BetValueMin
            };
        }

        if (MaxBet > data.BetValueMax) {
            return {
                input: this.maxBet.current,
                msg: LangHelper.getSingleResource('MaxBetLessThanOrEqual') + ' ' + data.BetValueMax
            };
        }

        if (MaxPerMatch > data.MaxPerMatchMax) {
            return {
                input: this.maxPerMatch.current,
                msg: LangHelper.getSingleResource('MaxBetMatchMoreThanOrEqual') + ' ' + data.MaxPerMatchMax
            };
        }

        if (MaxPerMatch < data.MaxPerMatchMin) {
            return {
                input: this.maxPerMatch.current,
                msg: LangHelper.getSingleResource('MaxBetMatchLessThanOrEqual') + ' ' + data.MaxPerMatchMin
            };
        }

        if (MinBet > MaxBet) {
            return {
                input: this.minBet.current,
                msg: LangHelper.getSingleResource('MinBetCanNotGreaterThanMaxBet') + ' ' + MaxBet
            };
        }

        if (MaxBet > MaxPerMatch) {
            return {
                input: this.maxBet.current,
                msg: LangHelper.getSingleResource('MaxBetCanNotGreaterThanMaxPerMatch') + ' ' + MaxPerMatch
            };
        }

        return null;
    }

    onBlur = (e) => {
        const element = e.target;
        this._handleInputChanged(element, Service.formatValue(Service.getValueAsNumber(element.value)));
    }

    reset() {
        this._handleInputChanged(this.minBet.current, this.minBet.current.defaultValue);
        this._handleInputChanged(this.maxBet.current, this.maxBet.current.defaultValue);
        this._handleInputChanged(this.maxPerMatch.current, this.maxPerMatch.current.defaultValue);

        this.disable(false);
    }

    disable(isDisabled) {
        this.minBet.current.disabled = isDisabled;
        this.maxBet.current.disabled = isDisabled;
        this.maxPerMatch.current.disabled = isDisabled;
    }

    updateData(data) {
        this._handleInputChanged(this.minBet.current, Service.formatValue(data.MinBet));
        this._handleInputChanged(this.maxBet.current, Service.formatValue(data.MaxBet));
        this._handleInputChanged(this.maxPerMatch.current, Service.formatValue(data.MaxPerMatch));
    }

    _handleInputChanged(element, value) {
        if (element.value !== value) {
            element.value = value;
        }

        if (value !== element.defaultValue) {
            element.setAttribute('class', OnChangedClassName);
        }
        else {
            element.setAttribute('class', ClassName);
        }
    }

    _buildInput(value, ref, type, editable) {
        const formatValue = Service.formatValue(value);

        return (
            <input className={ClassName}
                type='text'
                ref={ref}
                autoComplete='off'
                maxLength='14'
                defaultValue={formatValue}
                onBlur={this.onBlur}
                disabled={!editable}
            />  
        );
    }

    render() {
        const { data, editable } = this.props;

        return (
            <tr>
                <td>{data.BetSettingType}</td>
                <td className='pa-betlimit-cell'>
                    {this._buildInput(data.MinBet, this.minBet, 'minBet', editable)}
                    <span>{` >= ${Service.formatValue(data.BetValueMin)}`}</span>
                </td>
                <td className='pa-betlimit-cell'>
                    {this._buildInput(data.MaxBet, this.maxBet, 'maxBet', editable)}
                    <span>{` <= ${Service.formatValue(data.BetValueMax)}`}</span>
                </td>
                <td className='pa-betlimit-cell'>
                    {this._buildInput(data.MaxPerMatch, this.maxPerMatch, 'maxPerMatch', editable)}
                    <span>{` <= ${Service.formatValue(data.MaxPerMatchMax)}`}</span>
                </td>
            </tr>
        );
    }
}