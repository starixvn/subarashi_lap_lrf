'use strict';
define(['jquery', 'common/site', 'lib/jquery.multiselect.nlevel'], function ($, Site) {
    function _initDataUI(sourceData, propertyKeys = { Id: 'Id', Value: 'Value', Text: 'Text' }, dataUI = [], checkedCount = 0,) {
        const length = sourceData.length;
        for (let i = 0; i < length; i++) {
            const item = sourceData[i];
            const isChecked = item['Checked'];
            if (isChecked) {
                checkedCount = checkedCount + 1;
            }
            dataUI.push({
                Id: item[propertyKeys.Id],
                Value: item[propertyKeys.Value],
                Text: item[propertyKeys.Text],
                Checked: isChecked,
                Enable: true,
                Items: item.Children ? _initDataUI(item.Children, propertyKeys, [], checkedCount).Items : undefined
            });
        }
        return { Items: dataUI, CheckedCount: checkedCount };
    }

    const _me = {
        initSubsidiaryList: function (onChangeCallback) {
            const selector = '#grid-subsidiary-multiselect';
            const data = $.parseJSON($('#subsidiaryData').val());
            const propertyKeys = { Id: 'Value', Value: 'Value', Text: 'Name' };
            const length = data.length;
            let { Items: dataUI, CheckedCount: checkedCount } = _initDataUI(data, propertyKeys);
            const isCheckAll = checkedCount === length;
            $(selector).multiSelect({
                minWidth: 200,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: isCheckAll,
                checkAllText: Site.getSingleResource('All'),
                selectedText: Site.getSingleResource('SelectedItemCount'),
                noneSelectedText: Site.getSingleResource('SelectOptions'),
                showFooter: false,
                listData: dataUI,
                onCheck: function () {
                    const checkedItems = $(selector).multiSelect('getCheckedItems');
                    const hasItemsChecked = checkedItems.length > 0;

                    $('#SubsidiaryList').val(checkedItems.join(','));
                    $('#SubsidiaryDropdownList').toggleClass('invalid', !hasItemsChecked);
                    $('#SubmitButton').prop('disabled', !hasItemsChecked);
                    onChangeCallback && onChangeCallback();
                }
            });

            const checkedItems = $(selector).multiSelect('getCheckedItems');
            $('#SubsidiaryList').val(checkedItems.join(','));
            $('#SubsidiaryDropdown').toggle($('#SubsidiarySearch').val() == "true");
            $('#SubsidiarySearchCheckbox').prop('checked', $('#SubsidiarySearch').val() == "true");
        }
    };

    return _me;
});