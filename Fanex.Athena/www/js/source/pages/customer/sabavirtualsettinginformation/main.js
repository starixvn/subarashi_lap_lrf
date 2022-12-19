'use strict';
define(
    ['jquery', 'common/site', 'helpers/downloader', 'lib/jquery.multiselect.nlevel',],
    function ($, Site, Downloader) {
        const URL_DATA = 'SabaVirtualSetting/GetSabaVirtualSettingInformation';
        const URL_EXCEL = 'SabaVirtualSetting/ExportExcel';
        let _xsrfToken = null;

        let _curSearchLevels = [];

        const _me = {
            elements: {
                closeIcon: null,
                wrapper: null,
                dangerLevelSel: null,
            },
            initialize: function () {
                Site.initialize();
                _me.initDangerLevelOption();
                _me.initBtnClickEvent();
            },
            initElements: function () {
                _me.elements.closeIcon = $(".icon-close");
                _me.elements.wrapper = $(".wrapper")[0];
                _me.elements.dangerLevel = $("#danger-level-ids");
            },
            initDangerLevelOption: function () {
                let data = $('#DangerLevels').val();
                if (!data) {
                    return;
                }

                data = $.parseJSON(data);
                _curSearchLevels = data;

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
                $('#danger-level-multiselect').multiSelect({
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
                        const checkedItems = $('#danger-level-multiselect').multiSelect('getCheckedItems');
                        if (!checkedItems.length) {
                            $('#btn-submit').prop('disabled', true);
                        }
                        else {
                            $('#btn-submit').prop('disabled', false);
                        }
                    }
                });
            },
            initTableIconClick: function () {
                _me.initElements();
            },
            initBtnClickEvent: function () {
                $('#btn-submit').click(() => {
                    const checkedItem = $('#danger-level-multiselect').multiSelect('getCheckedItems');
                    let data = {};
                    data.levelIds = checkedItem;
                    const option = {
                        type: 'POST',
                        data: data,
                        dataType: 'text',
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        cache: false,
                        url: Site.resolveClientUrl(URL_DATA),
                        success: function (response) {
                            $('#main-content').html(response);
                            _me.initTableIconClick();
                            Site.unBlockUI();
                            _curSearchLevels = data.levelIds;
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
                    for (const id of _curSearchLevels) {
                        data.append('levelIds', id);
                    }

                    data.levelIds = _curSearchLevels;
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
        };

        $(document).ready(function () {
            _me.initialize();
        });

        return _me;
    });