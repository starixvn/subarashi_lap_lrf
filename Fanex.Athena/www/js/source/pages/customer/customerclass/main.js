'use strict';
define(
    ['jquery', 'common/site', 'lib/jquery.multiselect.nlevel'],
    function ($, Site) {

        var LIST_LEAGUES_HEIGHT = 250;
        var LIST_LEAGUES_WIDTH = 350;
        const URL_DATA = 'CustomerClass/GetCustomerSettingPolicy';
        const URL_EXCEL = 'CustomerClass/ExportExcel';
        let _xsrfToken = null;

        let _curSearchCustomerClasses = [];

        const _me = {
            elements: {
                viewLeaguesIcon: null,
                closeIcon: null,
                listLeaguesDiv: null,
                listLeaguesUl: null,
                wrapper: null,
                customerClassSel: null,
            },
            initialize: function () {
                Site.initialize();
                _me.initElements();
                _me.initCustomerClassOption();
                _me.initBtnClickEvent();
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
                _me.elements.customerClassSel = $("#customer-class-ids");
            },
            initCustomerClassOption: function() {
                let data = $('#CustomerClasses').val();
                if (!data) {
                    return;
                }

                data = $.parseJSON(data);
                _curSearchCustomerClasses = data;

                const totalColumns = data.length;
                const dataUI = [];
                for (let i = 0; i < totalColumns; i++) {

                    dataUI.push({
                        Id: data[i],
                        Value: data[i],
                        Text: data[i],
                        Checked: true,
                        Enable: true,
                        Css: '',
                        CssClass: ''
                    });
                }
                $('#customer-class-multiselect').multiSelect({
                    minWidth: 100,
                    maxHeight: 400,
                    shadow: true,
                    showHeader: true,
                    isCheckAll: true,
                    showFooter: false,
                    checkAllText: Site.getSingleResource('All'),
                    noneSelectedText: Site.getSingleResource('SelectOptions'),
                    tooltipNoItem: Site.getSingleResource('ThereIsNoSelectedItem'),
                    selectedText: Site.getSingleResource('SelectedItemCount'),
                    listData: dataUI,
                    onCheck: function () {
                        const checkedItems = $('#customer-class-multiselect').multiSelect('getCheckedItems');
                        if (!checkedItems.length) {
                            $('#btn-submit').prop('disabled', true);
                        }
                        else{
                            $('#btn-submit').prop('disabled', false);
                        }
                    }
                });
            },
            initBtnClickEvent: function (){
                $('#btn-submit').click(() => {
                    const checkedItem = $('#customer-class-multiselect').multiSelect('getCheckedItems');
                    let data = {};
                    data.tabKey = $('#tab-key-val').val();
                    data.customerClassIds = checkedItem;
                    const option = {
                        type: 'POST',
                        data: data,
                        dataType: 'text',
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        cache: false,
                        url: Site.resolveClientUrl(URL_DATA),
                        success: function (response) {
                            $('#main-content').html(response);
                            Site.unBlockUI();
                            _curSearchCustomerClasses = data.customerClassIds;
                        },
                        beforeSend: function () {
                            Site.blockUI();
                        },
                        error: function () {
                            Site.unBlockUI();
                        }
                    };

                    $.ajax(option);
                })

                $('#btn-export-excel').click(() => {
                    let data = new URLSearchParams();
                    data.append('tabKey', $('#tab-key-val').val());
                    for (const id of _curSearchCustomerClasses) {
                        data.append('customerClassIds', id);
                    }
                    
                    data.customerClassIds = _curSearchCustomerClasses;
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
                        if(response.status === 200)
                        {
                            console.log(response);
                             response.blob().then(file =>
                             {
                                console.log(response);
                                const blob = new Blob([file]);
                                const downloadUrl = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = downloadUrl;
                                a.download = _me.getFileName(response);
                                document.body.appendChild(a);
                                a.click();
                             })
                        }
                        else
                        {
                            alert("Download Error");
                        }
                    })               
                })
            },

            getXsrfToken: function(){
                if (!_xsrfToken) {
                    _xsrfToken = document.querySelector("input[name=__RequestVerificationToken]").value;
                }
            
                return _xsrfToken;
            },

            getFileName:  function(response){
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
