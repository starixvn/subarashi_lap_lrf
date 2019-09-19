import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import { ActionCreators } from '../actions';
import DataHandling from '../lib/dataHandling';
import GameSettingDataHandling from '../lib/gameSettingDataHandling';
import NGDataHandling from '../lib/ngDataHandling';
import { BetLimitProduct } from '../lib/constants';
import createSetting from './grid/Base/SettingContent';
import SettingGrid from './grid/Base/SettingGrid';
import NGSettingGrid from './grid/SportSetting/NGSettingGrid';
import AGCSettingContent from './grid/SportSetting/AGCSettingContent';

const Setting = {
    [BetLimitProduct.SB]: { Grid: SettingGrid, Handling: DataHandling },
    [BetLimitProduct.VS]: { Grid: SettingGrid, Handling: DataHandling },
    [BetLimitProduct.VS2]: { Grid: SettingGrid, Handling: DataHandling },
    [BetLimitProduct.LT]: { Grid: SettingGrid, Handling: GameSettingDataHandling },
    [BetLimitProduct.NG]: { Grid: NGSettingGrid, Handling: NGDataHandling },
    [BetLimitProduct.KN]: { Grid: SettingGrid, Handling: GameSettingDataHandling }
};

const DataContent = (props) => {
    const { ProductId } = props.requestParam;
    let Content = '';

    if (ProductId === BetLimitProduct.AGC) {
        Content = AGCSettingContent;
    }
    else {
        const { Grid, Handling } = Setting[ProductId];
        Content = createSetting(Grid, new Handling());
    }

    return <Content />
}

function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps)(DataContent)