import React from 'react';
import { connect } from 'react-redux';
import { BetLimitProduct } from '../lib/constants';
import SportDataContent from './grid/data-contents/SportDataContent';
import GameDataContent from './grid/data-contents/GameDataContent';
import NGDataContent from './grid/data-contents/NGDataContent';
import ACGDataContent from './grid/data-contents/AGCDataContent';

const Setting = {
    [BetLimitProduct.SB]: SportDataContent,
    [BetLimitProduct.VS]: SportDataContent,
    [BetLimitProduct.VS2]: SportDataContent,
    [BetLimitProduct.LT]: GameDataContent,
    [BetLimitProduct.NG]: NGDataContent,
    [BetLimitProduct.KN]: GameDataContent,
    [BetLimitProduct.AGC]: ACGDataContent
};

const DataContent = (props) => {
    const { ProductId } = props.requestParam;
    const Content = Setting[ProductId];

    return <Content />
}

function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps)(DataContent)