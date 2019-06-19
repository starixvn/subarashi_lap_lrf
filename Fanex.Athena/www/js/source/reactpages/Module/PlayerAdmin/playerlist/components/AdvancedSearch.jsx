import React, { PureComponent } from 'react';
import MultipleSelect from '@9softstudio/react-multiselect';
import PropTypes from 'prop-types';

export class AdvancedSearch extends PureComponent {
    constructor(props) {
        super(props);

        this.currencyList = [{ Id: 'eur', Value: 'EUR', Status: true }, { Id: 'usd', Value: 'usd', Status: true }];
        this.oddsGroupList = [{ Id: 'A', Value: 'A', Status: true }, { Id: 'B', Value: 'B', Status: true }, { Id: 'C', Value: 'C', Status: true }];
        this.specialLevelList = [{ Id: '1', Value: '1', Status: true }, { Id: '2', Value: '2', Status: true }];
        this.baStatusList = [{ Id: 'On', Value: 'On', Status: true }, { Id: 'Off', Value: 'Off', Status: true }];
    }

    _createSelectData(originalList, selectedItemString) {
        if (selectedItemString === '') {
            return [...originalList];
        }

        const selectedItemList = selectedItemString.split(',').filter(x => x !== '');

        return originalList.map(item => {
            const { Id, Value } = item;

            return {
                Id,
                Value,
                Status: selectedItemList.indexOf(Id) !== -1
            }
        })
    }

    handleChange = (name, value) => {
        this.props.onChange(name, value);
    }

    render() {
        const { currency, oddsGroup, specialLevel, baStatus } = this.props.param;
        const currencyList = this._createSelectData(this.currencyList, currency);
        const oddsGroupList = this._createSelectData(this.oddsGroupList, oddsGroup);
        const specialLevelList = this._createSelectData(this.specialLevelList, specialLevel);
        const baStatusList = this._createSelectData(this.baStatusList, baStatus);

        return (
            <>
                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">Currency</label>
                        <MultipleSelect id="currency"
                            dataSource={currencyList}
                            keyField={"Id"}
                            valueField={"Value"}
                            statusField={"Status"}
                            onChange={(currentItem, selectedItemsKey) => this.handleChange('currency', selectedItemsKey)} />
                    </div>
                </div>

                <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">Odds Group</label>
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
                        <label className="label-text">Special Level</label>
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
                        <label className="label-text">BA</label>
                        <MultipleSelect id="baStatus"
                            dataSource={baStatusList}
                            keyField={"Id"}
                            valueField={"Value"}
                            statusField={"Status"}
                            onChange={(currentItem, selectedItemsKey) => this.handleChange('baStatus', selectedItemsKey)} />
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
        baStatus: PropTypes.string.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired
};

AdvancedSearch.propTypes = propTypes;

export default AdvancedSearch;