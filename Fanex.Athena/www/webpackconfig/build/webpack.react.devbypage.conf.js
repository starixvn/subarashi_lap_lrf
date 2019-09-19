var merge = require('webpack-merge');
var utils = require('./utils');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devConfig = require('./webpack.react.dev.conf.js');
var pathConfig = require('../config/pathReact');

var environment = "dev";
var jsPath = `${pathConfig.scriptPaths.build}/${environment}/reactpages`;
var cssPath = `${pathConfig.cssPaths.build}/${environment}/reactpages`;
const entry = {
    [`${jsPath}/lib/langHelper`]: pathConfig.scriptPaths.languageResource,
    [`${jsPath}/lib/lang-zh-CN`]: pathConfig.scriptPaths.langCN,
    [`${cssPath}/vendor`]: pathConfig.cssPaths.layout,
    [`${jsPath}/playeradmin/playerlist`]: pathConfig.scriptPaths.playerlist,
    [`${cssPath}/playeradmin/index`]: pathConfig.cssPaths.playeradmin,
    [`${jsPath}/playeradmin/runningbetlist`]: pathConfig.scriptPaths.playerrunningbetlist,
    [`${cssPath}/playeradmin/running-betlist`]: pathConfig.cssPaths.playerrunningbetlist,
    [`${jsPath}/playeradmin/betlimit`]: pathConfig.scriptPaths.playerbetlimit,
    [`${cssPath}/playeradmin/betlimit`]: pathConfig.cssPaths.playerbetlimit,
    [`${jsPath}/playeradmin/accountinfo`]: pathConfig.scriptPaths.accountinfo,
    [`${cssPath}/playeradmin/account-info`]: pathConfig.cssPaths.accountInfo,
    [`${jsPath}/playeradmin/single-customer`]: pathConfig.scriptPaths.singleCustomer,
    [`${jsPath}/playeradmin/playerwinloss`]: pathConfig.scriptPaths.playerwinloss,
    [`${cssPath}/playeradmin/playerwinloss`]: pathConfig.cssPaths.playerwinloss,
    [`${jsPath}/playeradmin/statement`]: pathConfig.scriptPaths.statement,
    [`${cssPath}/playeradmin/statement`]: pathConfig.cssPaths.statement
}

const devByPageConfig = {
    ...devConfig,
    entry,
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: '[id].css' })
    ]
};

module.exports = devByPageConfig;