using System.Collections.Generic;
using System.Data;
using Fanex.Common;

namespace Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission
{
    public class PlayerCommissionViewModel
    {
        public int LicenseeId { get; set; }

        public int GroupCommId { get; set; }

        public string GroupName { get; set; }

        public Dictionary<string, decimal> CommValues { get; set; }

        public void MapData(IDataReader reader, IDictionary<string, string> columns, IDictionary<string, bool> visibility)
        {
            // Support config for new products
            GroupCommId = Converter.ToInt(reader["GroupCommId"]);
            CommValues = new Dictionary<string, decimal>();
            foreach (var c in columns)
            {
                CommValues[c.Key] = visibility[c.Key] ? Converter.ToDecimal(reader[c.Value + "Comm"]) : 0;
            }
        }

        public void InitDefaultValue(IDictionary<string, bool> permissions)
        {
            CommValues = new Dictionary<string, decimal>();
            foreach (var p in permissions)
            {
                CommValues.Add(p.Key, 0);
            }
        }
    }
}
