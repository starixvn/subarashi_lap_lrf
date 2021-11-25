
"use strict";
define(['jquery', 'common/site', 'lib/jquery.multiselect.nlevel'], function ($, Site) {
    var _me = {
        initSubsidiaryOption: function (onChange) {
            const data = $('#SubsidiaryListData').val();
            if (!data) {
                return;
            }

            $('#IsViewOnSubsidiary').on('change', function (e) {
                const checked = e.target.checked;
                $('#subsidiary-view').toggleClass('hide', !checked);
                onChange && onChange(checked);
            });

            const groupData = _me.getSubsidiaryTree($.parseJSON(data));

            $('#subsidiary-multiselect').multiSelect(
                {
                    minWidth: 100,
                    maxHeight: 400,
                    shadow: true,
                    showHeader: true,
                    isCheckAll: true,
                    showFooter: false,
                    checkAllText: Site.getSingleResource('All'),
                    selectedText: Site.getSingleResource('SelectedItemCount'),
                    noneSelectedText: Site.getSingleResource('SelectOptions'),
                    tooltipNoItem: Site.getSingleResource('ThereIsNoSelectedItem'),
                    listData: groupData,
                    onCheck: function () {
                        onChange && onChange(true);
                    }
                });
        },
        
        bindSubsidiaryData: function() {
            const subsidiarySearch = $('#IsViewOnSubsidiary').is(':checked');
            let subsidiaryList = '';
            if (subsidiarySearch && $('#subsidiary-multiselect').length > 0) {
                const subsidiaryCheckedItems = $('#subsidiary-multiselect').multiSelect('getCheckedItems');

                if (!subsidiaryCheckedItems.length) {
                    return null;
                }

                subsidiaryList = subsidiaryCheckedItems.join();
            }
            $('#SubsidiarySearch').val(subsidiarySearch);
            $('#SubsidiaryList').val(subsidiarySearch ? subsidiaryList : '');
        },

        getSubsidiaryTree: function (data) {
            let tree = [];
        
            const total = data.length;
            if (!total) {
                return tree;
            }
        
            const createItem = function (item, id) {
                return {
                    Id: id,
                    Value: item.Value,
                    Text: item.Name,
                    Checked: true,
                    Enable: true
                }
            }
        
            const getSubTree = function (subData, id) {
                let subTree = createItem(subData, id);
        
                if (subData.Children) {
                    const totalChild = subData.Children.length;
        
                    let items = [];
        
                    for (let c = 0; c < totalChild; c++) {
                        const child = subData.Children[c];
                        items.push(getSubTree(child, id + '-' + child.Value));
                    }
        
                    subTree.Items = items;
                }
        
                return subTree;
            }
        
            for (let i = 0; i < total; i++) {
                const subTree = data[i];
                tree.push(getSubTree(subTree, subTree.Value));
            }
        
            return tree;
        }
    };

    return _me;
});