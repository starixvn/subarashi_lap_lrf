'use strict';

define(['helpers/subsidiaryhelper'],
    function (SubsidiaryHelper) {
        function init() {
            SubsidiaryHelper.initSubsidiaryOption();
            window.getLrfSubsidiarySearch = function() {
                const subsidiarySearch = SubsidiaryHelper.getSubsidiarySearchValue();
                return subsidiarySearch ? { SubsidiarySearch: subsidiarySearch, SubsidiaryList: SubsidiaryHelper.getSubsidiaryListValue() } : {};
            } 

            $(window).on('blur', function () {
                $('#ui-multiselect-options-subsidiary-multiselect').dropdown('close');
            });
        }

        return {
            init: init
        };
    });