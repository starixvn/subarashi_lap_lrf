using System.Collections.Generic;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate
{
    public class GetOldValuesCriteria
    {
        public const int SpecialLevelType = 1;
        public const int OddsGroupType = 2;
        public const int BAStatusType = 3;

        public GetOldValuesCriteria(List<int> custIds, int valueType)
        {
            CustIds = custIds;
            ValueType = valueType;
        }

        public List<int> CustIds { get; set; }

        public int ValueType { get; set; }

        public string GetSPName()
        {
            switch (ValueType)
            {
                case SpecialLevelType:
                    return "Lrf_CustomerSpecialLevelSel";
                case OddsGroupType:
                    return "Lrf_CustomerUgroupSel";
                case BAStatusType:
                    return "Lrf_CustomerBAStatusSel";
                default:
                    return string.Empty;
            }
        }

        public void SetParameterValues(IObjectDb db)
        {
            db.SetParameterValue("custids", string.Join(",", CustIds));
        }

        public string GetValueColumnName()
        {
            switch (ValueType)
            {
                case SpecialLevelType:
                    return "SpecialLevel";
                case OddsGroupType:
                    return "ugroup";
                case BAStatusType:
                    return "isBA";
                default:
                    return string.Empty;
            }
        }
    }
}
