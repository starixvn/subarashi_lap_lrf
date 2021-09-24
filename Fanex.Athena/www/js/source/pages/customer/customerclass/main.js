'use strict';
define(
    ['jquery', 'common/site'],
    function ($, Site) {

        var LIST_LEAGUES_HEIGHT = 250;
        var LIST_LEAGUES_WIDTH = 350;

        const _me = {
            elements: {
                viewLeaguesIcon: null,
                closeIcon: null,
                listLeaguesDiv: null,
                listLeaguesUl: null,
                wrapper: null
            },
            initialize: function () {
                Site.initialize();
                _me.initElements();
                _me.elements.viewLeaguesIcon.click(function () {
                    var self = $(this);
                    _me.showLeagues(self);
                });
                _me.elements.closeIcon.click(function () {
                    _me.resetListLeagues();
                    _me.elements.listLeaguesDiv.addClass("hide");
                });
            },
            initElements: function () {
                _me.elements.viewLeaguesIcon = $(".view-leagues");
                _me.elements.closeIcon = $(".icon-close");
                _me.elements.listLeaguesDiv = $("#list-leagues");
                _me.elements.listLeaguesUl = $("#ul-list-leagues");
                _me.elements.wrapper = $(".wrapper")[0];
            },
            showLeagues: function (self) {
                var sportType = self.attr("data-sport-type");
                var leagueGroupId = self.attr("data-league-group");
                var param = {
                    sportType,
                    leagueGroupId
                };
                _me.fetchLeagues(param, function (result) {

                    _me.resetListLeagues();

                    if (result && result.length > 0) {
                        $.each(result, function (index, item) {
                            _me.elements.listLeaguesUl.append("<li>" + item.LeagueName + "</li>")
                        })
                    }

                    var currentElement = self.offset();
                    var topOffset = currentElement.top;
                    var leftOffset = currentElement.left;

                    var scrollLeft = _me.elements.wrapper.scrollLeft;
                    var scrollTop = _me.elements.wrapper.scrollTop;

                    var listLeaguesleft = scrollLeft +
                        (LIST_LEAGUES_WIDTH + 50 + leftOffset > window.innerWidth ? leftOffset - LIST_LEAGUES_WIDTH - 50 : leftOffset)
                        + 40;

                    var listLeaguesTop = scrollTop +
                        (LIST_LEAGUES_HEIGHT + 30 + topOffset > window.innerHeight ? window.innerHeight - LIST_LEAGUES_HEIGHT - 30 : topOffset)
                        + 10;

                    _me.elements.listLeaguesDiv.css({ left: listLeaguesleft, top: listLeaguesTop });
                    _me.elements.listLeaguesDiv.removeClass("hide");

                });
            },
            resetListLeagues: function () {
                _me.elements.listLeaguesUl.empty();
                _me.elements.listLeaguesUl.scrollTop(0);
            },
            fetchLeagues: function (param, onSuccess) {
                $.ajax({
                    type: 'POST',
                    data: param,
                    url: Site.resolveClientUrl('CustomerClass/GetLimitLeagues'),
                    dataType: 'json',
                    success: function (result) {
                        onSuccess(result);
                    }
                });
            }
        };

        $(document).ready(function () {
            _me.initialize();
        });

        return _me;
    });
