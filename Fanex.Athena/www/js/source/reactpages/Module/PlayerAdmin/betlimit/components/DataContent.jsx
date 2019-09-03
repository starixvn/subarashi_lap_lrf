import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import { ActionCreators } from '../actions';
import Service from '../lib/service';
import { BetLimitProduct } from '../lib/constants';
import createSetting from './grid/Base/SettingContent';
import SportSettingGrid from './grid/SportSetting/SettingGrid';
import GameSettingGrid from './grid/GameSetting/SettingGrid';

const DataGrid = {
    [BetLimitProduct.SB]: SportSettingGrid,
    [BetLimitProduct.VS]: SportSettingGrid,
    [BetLimitProduct.VS2]: SportSettingGrid,
    [BetLimitProduct.LT]: GameSettingGrid,
    [BetLimitProduct.NG]: SportSettingGrid,
    [BetLimitProduct.KN]: GameSettingGrid
};

const DataContent = (props) => {
    const { ProductId } = props.requestParam;

    const Setting = createSetting(DataGrid[props.requestParam.ProductId], Service);

    return <Setting />
}

function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps)(DataContent)