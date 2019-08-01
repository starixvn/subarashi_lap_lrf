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
    [`${cssPath}/vendor`]: pathConfig.cssPaths.layout,
    [`${jsPath}/playeradmin/playerlist`]: pathConfig.scriptPaths.playerlist,
    [`${cssPath}/playeradmin/index`]: pathConfig.cssPaths.playeradmin,
    [`${cssPath}/playeradmin/account-info`]: pathConfig.cssPaths.accountInfo,
    [`${jsPath}/playeradmin/playeraccountinfo`]: pathConfig.scriptPaths.playeraccountinfo,
    [`${jsPath}/playeradmin/runningbetlist`]: pathConfig.scriptPaths.playerrunningbetlist,
    [`${cssPath}/playeradmin/running-betlist`]: pathConfig.cssPaths.playerrunningbetlist
}

const devByPageConfig = {
    ...devConfig,
    entry,
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: '[id].css' })
    ]
};

module.exports = devByPageConfig;