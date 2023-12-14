'use strict';
define(
    ['jquery', 'common/site', 'helpers/downloader', 'lib/jquery.multiselect.nlevel',],
    function ($, Site, Downloader) {
        var LIST_LEAGUES_HEIGHT = 250;
        var LIST_LEAGUES_WIDTH = 350;
        const URL_EXCEL = 'RiskLevel/ExportExcel';
        let _xsrfToken = null;

        const _me = {
            elements: {
                viewLeaguesIcon: null,
                closeIcon: null,
                listLeaguesDiv: null,
                wrapper: null,
                customerClassSel: null,
            },
            initialize: function () {
                Site.initialize();
                _me.initBtnClickEvent();
                _me.initTableIconClick();
            },
            initElements: function () {
                _me.elements.viewLeaguesIcon = $(".view-leagues");
                _me.elements.closeIcon = $(".icon-close");
                _me.elements.listLeaguesDiv = $("#list-leagues");
                _me.elements.wrapper = $(".wrapper")[0];
                _me.elements.customerClassSel = $("#customer-class-ids");
            },
            initTableIconClick: function () {
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
            initBtnClickEvent: function () {
                $('#ExportToExcel').click(() => {
                    let data = new URLSearchParams();
                    data.append('customerClass', $('#CustomerClass').val());
                    data.append('currencyId', $('#CurrencyId').val());

                    fetch(Site.resolveClientUrl(URL_EXCEL), {
                        body: data,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'X-Requested-With': 'XMLHttpRequest',
                            '__RequestVerificationToken': _me.getXsrfToken()
                        }
                    })
                        .then(response => {
                            if (response.status === 200) {
                                response.blob().then(file => {
                                    const fileName = _me.getFileName(response);
                                    Downloader.download(file, fileName);
                                })
                            }
                            else {
                                alert("Download Error");
                            }
                        })
                })
            },

            getXsrfToken: function () {
                if (!_xsrfToken) {
                    _xsrfToken = document.querySelector("input[name=__RequestVerificationToken]").value;
                }

                return _xsrfToken;
            },

            getFileName: function (response) {
                var filename = "";
                var disposition = response.headers.get('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
                return filename;
            },

            showLeagues: function (self) {
                var sportType = self.attr("data-sport-type");
                var leagueGroups = JSON.parse(self.attr("data-league-groups"));

                var param = {
                    sportType,
                    leagueGroups
                };

                _me.fetchLeagues(param, function (result) {
                    _me.resetListLeagues();

                    if (result && result.length > 0) {
                        $.each(result, function (index, item) {
                            var listLeague = item.LimitLeagues.map(x => "<li>" + x.LeagueName + "</li>").join('');
                            var leagueGroupDetail = `
                            <div class="list-leagues-header">
                                <p>${item.LeagueGroupName}:</p>
                            </div>
                            <div class="list-leagues-content">
                                <ul id="ul-list-leagues">
                                ${listLeague}
                                </ul>
                            </div>
                            `;
                            _me.elements.listLeaguesDiv.append(leagueGroupDetail)
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
                _me.elements.listLeaguesDiv.empty();
                _me.elements.listLeaguesDiv.append('<a class="block-close" href="javascript:;"><i class="icon-close"></i></a>');
                _me.elements.listLeaguesDiv.scrollTop(0);
                $(".icon-close").click(function () {
                    _me.resetListLeagues();
                    $("#list-leagues").addClass("hide");
                });
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