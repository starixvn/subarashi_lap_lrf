import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import { ActionCreators } from '../actions';
import DataHandling from '../lib/dataHandling';
import NGDataHandling from '../lib/ngDataHandling';
import { BetLimitProduct } from '../lib/constants';
import createSetting from './grid/Base/SettingContent';
import SportSettingGrid from './grid/SportSetting/SettingGrid';
import GameSettingGrid from './grid/GameSetting/SettingGrid';
import NGSettingGrid from './grid/SportSetting/NGSettingGrid';
import AGCSettingContent from './grid/SportSetting/AGCSettingContent';

const Setting = {
    [BetLimitProduct.SB]: { Grid: SportSettingGrid, Handling: DataHandling },
    [BetLimitProduct.VS]: { Grid: SportSettingGrid, Handling: DataHandling },
    [BetLimitProduct.VS2]: { Grid: SportSettingGrid, Handling: DataHandling },
    [BetLimitProduct.LT]: { Grid: GameSettingGrid, Handling: DataHandling },
    [BetLimitProduct.NG]: { Grid: NGSettingGrid, Handling: NGDataHandling },
    [BetLimitProduct.KN]: { Grid: GameSettingGrid, Handling: DataHandling }
};

const DataContent = (props) => {
    const { ProductId } = props.requestParam;
    let Content = '';

    if (ProductId === BetLimitProduct.AGC) {
        Content = AGCSettingContent;
    }
    else {
        const { Grid, Handling } = Setting[ProductId];
        Content = createSetting(Grid, Handling);
    }

    return <Content />
}

function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps)(DataContent)