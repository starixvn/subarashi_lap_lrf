var path = require('path');

var projectRoot = path.resolve(__dirname, '../../../');

var cssPaths = {
    build: "www/css/build",
    layout: "./www/css/source/reactpages/main.scss",
    subsidiaryperformance: "./www/css/source/reactpages/pages/subsidiaryperformance/index.scss",
    licenseewlbytimezone: "./www/css/source/reactpages/pages/licenseewl-by-timezone/index.scss",
    leaguewinloss: "./www/css/source/reactpages/pages/leaguewinloss/index.scss",
    extrapayout: "./www/css/source/reactpages/pages/extrapayout/index.scss",
    notification: "./www/css/source/reactpages/pages/notification/index.scss",
    exchangewl: "./www/css/source/reactpages/pages/exchangewl/index.scss",
    speciallicenseewl: "./www/css/source/reactpages/pages/speciallicenseewl/index.scss",
    bettingticketscenter: "./www/css/source/reactpages/pages/bettingticketscenter/index.scss",
    betlist: "./www/css/source/reactpages/pages/betlist/index.scss",
    casinoturnover: "./www/css/source/reactpages/pages/casinoturnover/index.scss",
    dailybets: "./www/css/source/reactpages/pages/dailybets/index.scss",
    exchangevoided: "./www/css/source/reactpages/pages/exchangevoided/index.scss",
    playersegmentation: "./www/css/source/reactpages/pages/customer/player-segmentation/index.scss",
    customersupporttask: "./www/css/source/reactpages/pages/customer-support-task/index.scss",
    newcashoutwinloss: "./www/css/source/reactpages/pages/newcashoutwinloss/index.scss",
};

var scriptPaths = {
    build: "www/js/build",

    languageResource: ["./www/js/source/reactpages/lib/langHelper.js",
        "./www/js/source/common/languages/ViewResources.js",
    ],
    langCN: "./www/js/source/common/languages/ViewResources.zh-CN.js",
    langHans: "./www/js/source/common/languages/ViewResources.zh-Hans.js",
    langTW: "./www/js/source/common/languages/ViewResources.zh-TW.js",
    /*React page*/
    subsidiaryperformance: "./www/js/source/reactpages/pages/subsidiaryperformance/components/index.jsx",
    licenseewlbytimezone: "./www/js/source/reactpages/pages/licenseewl-by-timezone/components/index.jsx",
    leaguewinloss: "./www/js/source/reactpages/pages/leaguewinloss/components/index.jsx",
    extrapayout: "./www/js/source/reactpages/pages/extrapayout/components/index.jsx",
    notification: "./www/js/source/reactpages/pages/notification/components/resultAmendment/index.jsx",
    exchangewl: "./www/js/source/reactpages/pages/exchangewl/components/index.jsx",
    speciallicenseewl: "./www/js/source/reactpages/pages/speciallicenseewl/components/index.jsx",
    bettingticketscenter_advancedsearch: "./www/js/source/reactpages/pages/bettingticketscenter/advancedsearch/components/index.jsx",
    bettingticketscenter_singlecustomer: "./www/js/source/reactpages/pages/bettingticketscenter/singlecustomer/components/index.jsx",
    bettingticketscenter_refno: "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/index.jsx",
    bettingticketscenter_running: "./www/js/source/reactpages/pages/bettingticketscenter/running/components/index.jsx",
    casinoturnover: "./www/js/source/reactpages/pages/casinoturnover/components/index.jsx",

    dailybets: "./www/js/source/reactpages/pages/dailybets/components/index.jsx",
    exchangevoided: "./www/js/source/reactpages/pages/exchangevoided/components/index.jsx",

    playersegmentation: "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/index.js",
    playersegmentation_betlist: "./www/js/source/reactpages/pages/customer/player-segmentation/betlist/index.js",
    customersupporttask: "./www/js/source/reactpages/pages/customer-support-task/components/index.jsx",
    newcashoutwinloss: "./www/js/source/reactpages/pages/newcashoutwinloss/components/index.jsx",
};
module.exports = {
    projectRoot: projectRoot,
    cssPaths: cssPaths,
    scriptPaths: scriptPaths
};