var path = require('path');

var projectRoot = path.resolve(__dirname, '../../../');

var cssPaths = {
    build: "www/css/build",
    layout: "./www/css/source/reactpages/main.scss",
    abnormalbet: "./www/css/source/reactpages/pages/abnormalbet/index.scss",
    notification: "./www/css/source/reactpages/pages/notification/index.scss",
    licenseecontact: "./www/css/source/reactpages/pages/licenseecontact/index.scss",
    exchangewl: "./www/css/source/reactpages/pages/exchangewl/index.scss",
    speciallicenseewl: "./www/css/source/reactpages/pages/speciallicenseewl/index.scss",
    grossgamingrevenue: "./www/css/source/reactpages/pages/grossgamingrevenue/index.scss",
    bettingticketscenter: "./www/css/source/reactpages/pages/bettingticketscenter/index.scss",
    betlist: "./www/css/source/reactpages/pages/betlist/index.scss",
    casinoturnover: "./www/css/source/reactpages/pages/casinoturnover/index.scss",
    playersabacoins: "./www/css/source/reactpages/pages/playersabacoins/index.scss",
    dailybets: "./www/css/source/reactpages/pages/dailybets/index.scss",
    dailybetdetails: "./www/css/source/reactpages/pages/dailybetdetails/index.scss",
    exchangevoided: "./www/css/source/reactpages/pages/exchangevoided/index.scss",
    playersegmentation: "./www/css/source/reactpages/pages/customer/player-segmentation/index.scss",
    customeradmin: "./www/css/source/reactpages/pages/customer/customeradmin/index.scss",
    customeradminivorybet: "./www/css/source/reactpages/pages/customer/customeradminivorybet/index.scss",
    oddsgrouplicenseesetting: "./www/css/source/reactpages/pages/customer/oddsgrouplicenseesetting/index.scss",
    newcashoutwinloss: "./www/css/source/reactpages/pages/newcashoutwinloss/index.scss",
};

var scriptPaths = {
    build: "www/js/build",

    languageResource: ["./www/js/source/reactpages/lib/langHelper.js",
        "./www/js/source/common/languages/ViewResources.js",
    ],
    langCN: "./www/js/source/common/languages/ViewResources.zh-CN.js",
    langVN: "./www/js/source/common/languages/ViewResources.vi-VN.js",
    langTH: "./www/js/source/common/languages/ViewResources.th-TH.js",
    langID: "./www/js/source/common/languages/ViewResources.id-ID.js",
    /*React page*/
    abnormalbet: "./www/js/source/reactpages/pages/abnormalbet/components/index.jsx",
    notification: "./www/js/source/reactpages/pages/notification/components/resultAmendment/index.jsx",
    licenseecontact: "./www/js/source/reactpages/pages/licenseecontact/components/index.jsx",
    exchangewl: "./www/js/source/reactpages/pages/exchangewl/components/index.jsx",
    speciallicenseewl: "./www/js/source/reactpages/pages/speciallicenseewl/components/index.jsx",
    grossgamingrevenue: "./www/js/source/reactpages/pages/grossgamingrevenue/components/index.jsx",
    bettingticketscenter_advancedsearch: "./www/js/source/reactpages/pages/bettingticketscenter/advancedsearch/components/index.jsx",
    bettingticketscenter_singlecustomer: "./www/js/source/reactpages/pages/bettingticketscenter/singlecustomer/components/index.jsx",
    bettingticketscenter_refno: "./www/js/source/reactpages/pages/bettingticketscenter/refno/components/index.jsx",
    bettingticketscenter_running: "./www/js/source/reactpages/pages/bettingticketscenter/running/components/index.jsx",
    bettingticketscenter_bookedbet: "./www/js/source/reactpages/pages/bettingticketscenter/bookedbet/components/index.jsx",
    casinoturnover: "./www/js/source/reactpages/pages/casinoturnover/components/index.jsx",
    playersabacoins: "./www/js/source/reactpages/pages/playersabacoins/components/index.jsx",

    dailybets: "./www/js/source/reactpages/pages/dailybets/components/index.jsx",
    dailybetdetails: "./www/js/source/reactpages/pages/dailybetdetails/components/index.jsx",
    exchangevoided: "./www/js/source/reactpages/pages/exchangevoided/components/index.jsx",

    playersegmentation: "./www/js/source/reactpages/pages/customer/player-segmentation/tabs/index.js",
    playersegmentation_betlist: "./www/js/source/reactpages/pages/customer/player-segmentation/betlist/index.js",
    customeradmin: "./www/js/source/reactpages/pages/customer/customeradmin/components/index.jsx",
    customeradminivorybet: "./www/js/source/reactpages/pages/customer/customeradminivorybet/components/index.jsx",
    oddsgrouplicenseesetting: "./www/js/source/reactpages/pages/customer/oddsgrouplicenseesetting/tabs/index.js",
    newcashoutwinloss: "./www/js/source/reactpages/pages/newcashoutwinloss/components/index.jsx",
};
module.exports = {
    projectRoot: projectRoot,
    cssPaths: cssPaths,
    scriptPaths: scriptPaths
};