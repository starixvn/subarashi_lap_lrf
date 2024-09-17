using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Customer.DTO;
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

        public GroupCommSettingMetaModel(IDataReader reader)
        {
            Sporttype = Convert.ToInt32(reader["Sporttype"]);
            Bettype = Convert.ToInt32(reader["Bettype"]);
            ProductCode = Convert.ToString(reader["ProductCode"]);
        }

        public int GroupCommId { get; set; }

        public string ProductCode { get; set; }

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