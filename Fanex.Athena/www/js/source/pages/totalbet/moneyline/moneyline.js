define(['jquery', 'common/site', '../totalbetsbase', 'components/refreshcountdown', 'common/querystring'],
    function ($, Site, Totalbets, RefreshCountDown, QueryString) {
        'use strict';

        const _me = {
            initialize: function () {
                Site.initialize();
                Totalbets.initialize();
                _me.initEvent();
                Site.addUserGuide({
                    resourceName: 'TotalBetsMoneyLine',
                    title: Site.getSingleResource('TotalBets') + ' - ' + Site.getSingleResource('MoneyLine')
                });

                RefreshCountDown.initEvent();
            },
            initEvent: function () {
                $("#SubmitButton").on('click', function () {
                    _me.submit();
                });
                $("#reportContent").on('click', '.add-monitoring', function () {
                    const matchId = Number($(this).attr('data-match-id'));
                    const liveIndicator = Number($(this).attr('data-live-indicator'));
                    const liveHomeScore = Number($(this).attr('data-live-home-score'));
                    const liveAwayScore = Number($(this).attr('data-live-away-score'));
                    const betType = Number($(this).attr('data-bet-type'));
                    _me.addMonitoring(matchId, liveIndicator, liveHomeScore, liveAwayScore, betType);
                });
                $("#reportContent").on('click', '.view-monitoring', function () {
                    const monitoringStatus = Number($(this).attr('data-monitoring-status'));
                    const leagueId = Number($(this).attr('data-league-id'));
                    const matchId = Number($(this).attr('data-match-id'));
                    const liveIndicator = Number($(this).attr('data-live-indicator'));
                    const liveHomeScore = Number($(this).attr('data-live-home-score'));
                    const liveAwayScore = Number($(this).attr('data-live-away-score'));
                    const betType = Number($(this).attr('data-bet-type'));
                    if (monitoringStatus == 0) {
                        _me.addMonitoringAndRedirect(matchId, liveIndicator, liveHomeScore, liveAwayScore, betType, leagueId);
                    } else {
                        _me.viewMonitoring(matchId, leagueId);
                    }
                });
            },
            submit: function () {
                Site.blockUI();
                $('#MoneyLineForm').submit();
            },
            addMonitoring: function (matchId, liveIndicator, liveHomeScore, liveAwayScore, betType) {
                const data = {
                    MatchId: matchId,
                    LiveIndicator: liveIndicator == 0 ? false : true,
                    LiveHomeScore: liveHomeScore,
                    LiveAwayScore: liveAwayScore,
                    BetType: betType
                };

                $.ajax({
                    url: Site.buildReportProxyUrl('api/MatchMonitoringCenter/AddMonitoring'),
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    beforeSend: function () {
                        Site.blockUI();
                    },
                    success: function (response) {
                        if (response.isSuccessful && response.code == 0) {
                            setTimeout(() => {
                                RefreshCountDown.refresh();
                            }, 2000);
                        } else {
                            alert(response.message);
                            Site.unBlockUI();
                        }
                    }
                });
            },
            addMonitoringAndRedirect: function (matchId, liveIndicator, liveHomeScore, liveAwayScore, betType, leagueId) {
                const data = {
                    MatchId: matchId,
                    LiveIndicator: liveIndicator == 0 ? false : true,
                    LiveHomeScore: liveHomeScore,
                    LiveAwayScore: liveAwayScore,
                    BetType: betType
                };

                $.ajax({
                    url: Site.buildReportProxyUrl('api/MatchMonitoringCenter/AddMonitoring'),
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    beforeSend: function () {
                        Site.blockUI();
                    },
                    success: function (response) {
                        if (response.isSuccessful && response.code == 0) {
                            setTimeout(() => {
                                _me.viewMonitoring(matchId, leagueId);
                            }, 2000);
                        } else {
                            alert(response.message);
                            Site.unBlockUI();
                        }
                    }
                });
            },
            viewMonitoring: function (matchId, leagueId) {
                Site.unBlockUI();
                let url = Site.resolveClientUrl('MatchMonitoringCenter');
                url = QueryString.setParam(url, 'MatchIds', matchId.toString());
                url = QueryString.setParam(url, 'LeagueIds', leagueId.toString());

                Site.redirect(url);
            }
        };

        return _me;
    });