using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.Helper;
using System;
using System.Collections.Generic;
using System.Data;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class GroupCommSettingMetaModel
    {
        public GroupCommSettingMetaModel()
        {
        }

        public GroupCommSettingMetaModel(IDataReader reader, ProductAccess productAccess)
        {
            var productCode = Convert.ToString(reader["ProductCode"]);

            Sporttype = Convert.ToInt32(reader["Sporttype"]);
            Bettype = Convert.ToInt32(reader["Bettype"]);
            ProductCode = productCode;
            ProductName = productAccess.GetProductName(productCode);
        }

        public int GroupCommId { get; set; }

        public string ProductCode { get; set; }

        public string ProductName { get; set; }

        public int Sporttype { get; set; }

        public int Bettype { get; set; }

        public decimal Discount { get; set; }

        public static int GetComparerValue(GroupCommSettingMetaModel setting)
        {
            return CommissionGroupHelper.ProductListComparer(setting.ProductCode);
        }
    }

    public class GroupCommSettingComparer : IComparer<GroupCommSettingMetaModel>
    {
        public int Compare(GroupCommSettingMetaModel x, GroupCommSettingMetaModel y)
        {
            var xValue = GroupCommSettingMetaModel.GetComparerValue(x);
            var yValue = GroupCommSettingMetaModel.GetComparerValue(y);

            if (xValue > yValue)
            {
                return 1;
            }

            if (xValue < yValue)
            {
                return -1;
            }

            return 0;
        }
    }
}