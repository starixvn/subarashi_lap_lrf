using Fanex.Athena.Model.Core.DataDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.StatelessCore.Utility
{
    public static class SubsidiaryManagementHelper
    {
        public static SubsidiaryViewType GetView(bool IiEnabledSubsidiary, bool isMaster, int userLevel, int? whiteLabelID)
        {
            if (IiEnabledSubsidiary && userLevel < UserLevelType.Subsidiary)
            {
                if (isMaster && !whiteLabelID.HasValue)
                {
                    return SubsidiaryViewType.MasterManagement;
                }

                return SubsidiaryViewType.NormalManagement;
            }
            else
            {
                return SubsidiaryViewType.NotManagement;
            }

        }
    }
}
