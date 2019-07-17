import React, { PureComponent } from 'react';
import MultipleSelect from '@9softstudio/react-multiselect';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { baStatusList, specialLevelListWithColor, oddsGroupListWithStyle } from '../../lib/constants';
import LangHelper from '@jsroot/lib/langHelper';

export class AdvancedSearch extends PureComponent {
    constructor(props) {
        super(props);

        this.oddsGroupList = Object.keys(oddsGroupListWithStyle).map(item => ({ Id: item, Value: item, Status: true }));
        this.specialLevelList = Object.keys(specialLevelListWithColor).map(item => ({ Id: item, Value: item, Status: true }));
        this.baStatusList = Object.keys(baStatusList).map(item => ({ value: baStatusList[item], label: item }));
    }

    _createSelectData(originalList, selectedItemString) {
        const selectedItemList = selectedItemString.split(',').filter(x => x !== '');

        return originalList.map(item => {
            const { Id, Value } = item;

            return {
                Id,
                Value,
                Status: selectedItemString === '' || selectedItemList.indexOf(Id) !== -1
            }
        })
    }

    handleChange = (name, value) => {
        this.props.onChange(name, value);
    }

    handleChangeSingleDropdown = (name, item) => {
        this.props.onChange(name, item.value);
    }

    render() {
        const { currencyList, param } = this.props;
        const { currency, oddsGroup, specialLevel, baFilter } = param;
        const convertedCurrencyList = this._createSelectData(currencyList, currency);
        const oddsGroupList = this._createSelectData(this.oddsGroupList, oddsGroup);
        const specialLevelList = this._createSelectData(this.specialLevelList, specialLevel);
        const selectedBaStatus = this.baStatusList.find(x => x.value === baFilter);

        return (
            <>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Currency")}</label>
                        <MultipleSelect id="currency"
                            dataSource={convertedCurrencyList}
                            keyField={"Id"}
                            valueField={"Value"}
                            statusField={"Status"}
                            onChange={(currentItem, selectedItemsKey) => this.handleChange('currency', selectedItemsKey)} />
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("OddsGroup")}</label>
                        <MultipleSelect id="oddsGroup"
                            dataSource={oddsGroupList}
                            keyField={"Id"}
                            valueField={"Value"}
                            statusField={"Status"}
                            onChange={(currentItem, selectedItemsKey) => this.handleChange('oddsGroup', selectedItemsKey)} />
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("SpecialLevel")}</label>
                        <MultipleSelect id="specialLevel"
                            dataSource={specialLevelList}
                            keyField={"Id"}
                            valueField={"Value"}
                            statusField={"Status"}
                            onChange={(currentItem, selectedItemsKey) => this.handleChange('specialLevel', selectedItemsKey)} />
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("BA")}</label>
                        <Select instanceId='ddlBaStatus'
                            name='form-field-name'
                            value={selectedBaStatus}
                            options={this.baStatusList}
                            onChange={(item) => this.handleChangeSingleDropdown('baFilter', item)} />
                    </div>
                </div>
            </>
        );
    }
}

const propTypes = {
    param: PropTypes.shape({
        currency: PropTypes.string.isRequired,
        oddsGroup: PropTypes.string.isRequired,
        specialLevel: PropTypes.string.isRequired,
        baFilter: PropTypes.number.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired
};

AdvancedSearch.propTypes = propTypes;

export default AdvancedSearch;