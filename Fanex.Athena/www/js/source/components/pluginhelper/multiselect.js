'use strict';
define(['jquery', 'common/site', 'lib/jquery.multiselect'], function ($, Site) {
    const _me = {
        initProductList: function () {
            const selector = '#grid-products-multiselect';
            const data = $.parseJSON($('#productsData').val());
            const length = data.length;
            const dataUI = [];
            let checkedCount = 0;
            for (let i = 0; i < length; i++) {
                const item = data[i];
                const isChecked = item['Status'];
                if (isChecked) {
                    checkedCount++;
                }

                dataUI.push({
                    Id: item['Code'],
                    Value: item['Code'],
                    Text: item['Name'],
                    Checked: isChecked,
                    Enable: true
                });
            }

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
                    $('#product-container input[type=checkbox]:checked').prop('checked', false);
                    const hasItemsChecked = checkedItems.length > 0;
                    if (hasItemsChecked) {
                        for (let i = 0; i < checkedItems.length; i++) {
                            $('#product-container #' + checkedItems[i]).prop('checked', true);
                        }
                    }
                    const canNotSubmit = $('#PlatformTypeList').hasClass('invalid') || !hasItemsChecked;

                    $('#ProductList').toggleClass('invalid', !hasItemsChecked);
                    $('#SubmitButton').prop('disabled', canNotSubmit);
                }
            });
        },

        initCurrencyList: function () {
            const selector = '#grid-currency-multiselect';
            const data = $.parseJSON($('#currencyData').val());
            const baseCurrencyData = $.parseJSON($('#baseCurrencyData').val());
            const length = data.length;
            const dataUI = [];
            let checkedCount = 0;
            for (let i = 0; i < length; i++) {
                const item = data[i];
                const isChecked = item['Status'];
                if (isChecked) {
                    checkedCount++;
                }

                dataUI.push({
                    Id: item['Code'],
                    Value: item['Code'],
                    Text: item['Name'],
                    Checked: isChecked,
                    Enable: true
                });
            }

            const renderBaseCurrencyOptions = function () {
                const $baseCurrency = $('#BaseCurrency');
                $baseCurrency.selectList('disabled', true);
                $baseCurrency.html('');
                let str = '';

                $.each(baseCurrencyData, function () {
                    str += '<option value="' + this.Value + '">' + this.Text + '</option>';
                });

                $baseCurrency.append(str);
                $baseCurrency.selectList('disabled', false);
                $baseCurrency.selectList('update');
            }

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
                onChange: function (option, checked, select) {
                    alert("onchange") // Works but not for 'All Selected'
                },
                onCheck: function () {
                    const checkedItems = $(selector).multiSelect('getCheckedItems');
                    var oldBaseCurrency = $('#oldBaseCurrency').val();
                    const $baseCurrency = $('#BaseCurrency');

                    $('#currency-container input[type=checkbox]:checked').prop('checked', false);
                    const hasItemsChecked = checkedItems.length > 0;
                    if (hasItemsChecked) {
                        if (checkedItems.length === 1) {
                            const newCurrencyValue = $(selector).multiSelect('getCheckedItemsByText')[0];

                            var baseCurrencyValues = [];

                            $('#BaseCurrency option').each(function () {
                                baseCurrencyValues.push($(this).val().toUpperCase());
                            });

                            renderBaseCurrencyOptions();

                            if (!baseCurrencyValues.includes(newCurrencyValue.toUpperCase())) {
                                $("#BaseCurrency").append(new Option(newCurrencyValue.toUpperCase(), newCurrencyValue.toLowerCase()));
                            }

                            $('#BaseCurrency option[value=' + newCurrencyValue.toLowerCase() + ']').attr('selected', 'selected').change();
                        }
                        else {
                            $('#BaseCurrency option[value=' + oldBaseCurrency + ']').attr('selected', 'selected').change();
                        }

                        for (let i = 0; i < checkedItems.length; i++) {
                            $('#currency-container #' + checkedItems[i]).prop('checked', true);
                        }
                    }
                    else {
                        $('#BaseCurrency option[value=' + oldBaseCurrency + ']').attr('selected', 'selected').change();
                    }

                    $('#CurrencyList').toggleClass('invalid', !hasItemsChecked);
                    $('#SubmitButton').prop('disabled', !hasItemsChecked);
                }
            });
        },

        initPlatformTypeList: function () {
            const platformList = [];
            $('#PlatformType option').each(function (i, e) {
                platformList.push({
                    Id: 'platform-type-' + i,
                    Value: $(e).val(),
                    Text: $(e).text(),
                    Checked: true,
                    Enable: true,
                    Css: '',
                    CssClass: ''
                });
            });

            $('#PlatformType').multiSelect({
                minWidth: 130,
                maxHeight: 400,
                shadow: true,
                showHeader: true,
                isCheckAll: true,
                showFooter: false,
                checkAllText: Site.getSingleResource('All'),
                noneSelectedText: Site.getSingleResource('SelectOptions'), // Text show on Multiselect when it has no selected item
                selectedText: Site.getSingleResource('SelectedItemCount'), // Text show when item was selected
                listData: platformList,
                onCheck: function () {
                    let checkedItems = $('#PlatformType').multiSelect('getCheckedItems');
                    checkedItems = checkedItems.join(',');
                    const hasItemsChecked = checkedItems.length > 0;
                    const canNotSubmit = $('#ProductList').hasClass('invalid') || !hasItemsChecked;

                    $('#PlatformTypeList').toggleClass('invalid', !hasItemsChecked);
                    $('#SubmitButton').prop('disabled', canNotSubmit);
                }
            });
        }
    };

    return _me;
});