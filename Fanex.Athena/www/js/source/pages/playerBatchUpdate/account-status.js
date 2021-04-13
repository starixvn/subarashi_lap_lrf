'use strict';
define(
    ['jquery', 'common/site', './batch-update-common', 'lib/jquery.multiselect.nlevel'],
    function ($, Site, BaseBatchUpdateController) {
        const _me = {
            commonService: null,
            elements: {
                btnSave: null,
                ddlStatus: null,
                isSelectedStatus: false,
                msgConfirm: null
            },
            initialize: function () {
                _me.commonService = BaseBatchUpdateController;

                _me.commonService.initialize({
                    enableSubmit: _me.enableSubmit
                });

                _me.elements.btnSave = $(".btn-submit");
                _me.elements.msgConfirm = $(".msg-confirm");
                _me.elements.ddlStatus = $("#ddl-status");
                _me.elements.ddlStatus.change(_me.changeStatus);

                _me.elements.btnSave.off("click").on("click", _me.saveClick);
            },
            enableSubmit: function (isEnable) {
                isEnable = isEnable && _me.elements.isSelectedStatus &&
                    _me.commonService.elements.custIds.val();

                _me.elements.btnSave.attr("disabled", isEnable ? null : "disabled");
            },
            changeStatus: function () {
                _me.elements.isSelectedStatus = true;
                _me.enableSubmit(true);
                _me.elements.msgConfirm.removeClass("hide");
            },
            saveClick: function () {
                var param = {
                    CustIds: _me.commonService.elements.custIds.val(),
                    CustNames: _me.commonService.elements.custNames.val(),
                    StatusId: _me.elements.ddlStatus.val()
                };

                $.ajax({
                    type: 'POST',
                    data: param,
                    url: Site.resolveClientUrl('PlayerBatchUpdate/UpdateAccountStatus'),
                    dataType: 'json',
                    beforeSend: function () {
                        _me.commonService.ajaxStart();
                    },
                    complete: function () {
                        _me.commonService.ajaxStop();
                    },
                    success: function (result) {
                        if (!result.IsSuccessful) {
                            _me.commonService.showMsg(result.Message, result.IsSuccessful);
                            return;
                        }

                        _me.elements.btnSave.addClass("completed");
                        _me.commonService.showMsg(result.Message, result.IsSuccessful);

                        setTimeout(() => {
                            _me.commonService.setTopWindowValue("playerComissionResult", {
                                isCancel: true,
                                oldCustIds: _me.commonService.elements.oldCustIds,
                                custIds: param.CustIds,
                                reloadGrid: true,
                                newValue: {
                                    Status: parseInt(param.StatusId, 0)
                                }
                            });
                        }, 3000);
                    }
                });
            }
        };

        $(document).ready(function () {
            _me.initialize();
        });

        return _me;
    });
