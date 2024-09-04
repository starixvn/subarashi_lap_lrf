var path = require('path');

var projectRoot = path.resolve(__dirname, '../../../');

var cssPaths = {
    build: "www/css/build",

    home: ["./www/css/source/pages/home/home.scss"],
    main: ["./www/css/source/main.scss"],
    error: ["./www/css/source/pages/utility/error.scss"],
    um: ["./www/css/source/pages/utility/um.scss"],

    reportjqgridlayout: ["./www/css/source/pages/common/reportjqgridlayout.main.scss"],
    betlistLayout: ["./www/css/source/pages/betlist/betlistcommon.main.scss"],
    betlistSimpleLayout: ["./www/css/source/pages/betlist/betlistcommon.main.scss", "./www/css/source/extensions/popup-ex.scss"],

    totalbetlayout: ["./www/css/source/pages/totalbet/totalbet.scss"],

    systemparlaydetail: ["./www/css/source/pages/betlist/systemparlaydetail.scss"],

    betlistResult: ["./www/css/source/pages/betlist/result/betlist.result.scss"],

    login: ["./www/css/source/pages/login/login-ex.scss"],
    livereport: ["./www/css/source/pages/report/livereport.scss"],
    licenseewinloss: ["./www/css/source/pages/report/licenseewinloss.scss"],
    sabavirtualsportswinloss: ["./www/css/source/pages/report/sabavirtualsportswinloss.scss"],
    godoffortunewinloss: ["./www/css/source/pages/report/godoffortunewinloss.scss"],

    ahforecast: ["./www/css/source/pages/forecast/forecast.ah.scss"],
    mixparlay: ["./www/css/source/pages/totalbet/mixparlay.scss"],
    forecastonextwo: ["./www/css/source/pages/forecast/forecastonextwo.scss"],
    newforecast: ["./www/css/source/pages/forecast/newforecast.scss"],

    turnover: ["./www/css/source/pages/report/turnover.scss"],
    result: ["./www/css/source/pages/report/result.scss"],
    cashouthistory: ["./www/css/source/pages/betlist/cashouthistory.main.scss", "./www/css/source/extensions/popup-ex.scss"],

    winlossbyproduct: ["./www/css/source/pages/report/winlossbyproduct.scss"],
    matchwinloss: ["./www/css/source/pages/report/matchwinloss.scss"],
    platformwinloss: ["./www/css/source/pages/report/platformwinloss.scss"],
    winlossbybettype: ["./www/css/source/pages/report/winlossbybettype.scss"],
    lastbetmonitoring: ["./www/css/source/pages/betlist/lastbetmonitoring.scss"],
    customercommgrouplist: ["./www/css/source/pages/customer/commgrouplist.scss"],
    customercommgroupdetail: ["./www/css/source/pages/customer/commgrouplist-detail.scss"],
    customerlog: ["./www/css/source/pages/customer/customerlog.scss"],
    licenseelist: ["./www/css/source/pages/utility/licenseelist.scss"],
    agcasinowinloss: ["./www/css/source/pages/report/agcasinowinloss.scss"],
    customerpendingfunds: ["./www/css/source/pages/report/customerpendingfunds.scss"],
    customerturnover: ["./www/css/source/pages/report/customerturnover.scss"],
    customerwinloss: ["./www/css/source/pages/report/customerwinloss.scss"],
    customerClass: ["./www/css/source/pages/customer/customer-class.scss"],
    risklevel: ["./www/css/source/pages/customer/risklevel.scss"],
    sabavirtualsettinginformation: ["./www/css/source/pages/customer/sabavirtualsettinginformation.scss"],
    fixedColumnsTable: ["./www/css/source/components/bootstrap-table/bootstrap-table.scss", "./www/css/source/components/bootstrap-table/bootstrap-table-sticky-header.scss", "./www/css/source/components/bootstrap-table/bootstrap-table-fixed-columns.scss",]
};

var scriptPaths = {
    build: "www/js/build",

    language: "common/languages/ViewResources.js",
    languageCN: "common/languages/ViewResources.zh-CN.js",
    languageVN: "common/languages/ViewResources.vi-VN.js",
    languageTH: "common/languages/ViewResources.th-TH.js",
    languageID: "common/languages/ViewResources.id-ID.js",
    home: ["./www/js/source/components/navbar.js", "./www/js/source/components/sidebar.js", "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js", "./www/js/source/pages/home/main.js"],
    signin: ["./www/js/source/pages/signin/main.js"],

    livereport: "./www/js/source/pages/report/livereport/main-livereport.js",
    livereportmatchlist: "./www/js/source/pages/report/livereport/main-matchlist.js",
    licenseewinloss: "./www/js/source/pages/report/licenseewinloss/main.js",
    sabavirtualsportswinloss: "./www/js/source/pages/report/sabavirtualsportswinloss/main.js",
    godoffortunewinloss: "./www/js/source/pages/report/godoffortunewinloss/main.js",
    betlist: "./www/js/source/pages/betlist/betlist.js",
    betlistsimple: "./www/js/source/pages/betlist/main-simple.js",
    betlistrunning: "./www/js/source/pages/betlist/main-betlistrunning.js",
    betlistrunningmultiplebettypes: "./www/js/source/pages/betlist/main-betlistrunning.multiplebettypes.js",
    betlistcorrectscore: "./www/js/source/pages/betlist/main-betlistcorrectscore.js",

    handicapoverunder: "./www/js/source/pages/totalbet/handicapoverunder/main.js",
    ahforecast: "./www/js/source/pages/forecast/forecast.ah.main.js",
    moneyline: "./www/js/source/pages/totalbet/moneyline/main.js",
    oddevendrawnodraw: "./www/js/source/pages/totalbet/oddevendrawnodraw/main.js",
    totalgoal: "./www/js/source/pages/totalbet/totalgoal/main.js",
    outright: "./www/js/source/pages/totalbet/outright/main.js",
    halftimefulltime: "./www/js/source/pages/totalbet/halftimefulltime/main.js",
    firstgoallastgoal: "./www/js/source/pages/totalbet/firstgoallastgoal/main.js",
    homedrawawaynobet: "./www/js/source/pages/totalbet/homedrawawaynobet/main.js",
    forecastonextwo: "./www/js/source/pages/forecast/forecast.onextwo.main.js",
    forecasthdpou: "./www/js/source/pages/forecast/forecast.handicapoverunder.main.js",
    newforecasthdpou: "./www/js/source/pages/forecast/forecast.newforecasthdpou.main.js",

    turnover: "./www/js/source/pages/report/turnover/main.js",
    result: "./www/js/source/pages/report/result/main-result.js",

    winlossbyproduct: "./www/js/source/pages/report/winlossbyproduct/main-winlossbyproduct.js",
    matchwinloss: "./www/js/source/pages/report/matchwinloss/main.js",
    platformwinloss: "./www/js/source/pages/report/platformwinloss/main-platformwinloss.js",
    winlossbybettype: "./www/js/source/pages/report/winlossbybettype/main.js",
    lastbetmonitoring: "./www/js/source/pages/betlist/lastbetmonitoring/main.js",
    customercommgrouplist: "./www/js/source/pages/customer/customercomm/main-commgrouplist.js",
    customercommgroupadd: "./www/js/source/pages/customer/customercomm/main-commgroupadd.js",
    customercommgroupedit: "./www/js/source/pages/customer/customercomm/main-commgroupedit.js",
    loginlog: "./www/js/source/pages/customer/customerlog/loginlog/main.js",
    customersetting: "./www/js/source/pages/customer/customerlog/customersetting/main.js",
    groupcommission: "./www/js/source/pages/customer/customerlog/groupcommission/main.js",
    customerclass: "./www/js/source/pages/customer/customerclass/main.js",
    risklevel: "./www/js/source/pages/customer/risklevel/main.js",
    sabavirtualsettinginformation: "./www/js/source/pages/customer/sabavirtualsettinginformation/main.js",

    agcasinowinloss: "./www/js/source/pages/report/agcasinowinloss/main.js",
    customerpendingfunds: "./www/js/source/pages/report/customerpendingfunds/main.js",
    customerturnover: "./www/js/source/pages/report/customerturnover/main.js",
    customerwinloss: "./www/js/source/pages/report/customerwinloss/main.js"
};

module.exports = {
    projectRoot: projectRoot,
    cssPaths: cssPaths,
    scriptPaths: scriptPaths
};