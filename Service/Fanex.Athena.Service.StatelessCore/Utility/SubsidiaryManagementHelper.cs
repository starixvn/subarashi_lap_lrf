namespace Fanex.Athena.Service.StatelessCore.Utility
{
    using Fanex.Athena.Model.Core.DataDomain;

    public static class SubsidiaryManagementHelper
    {
        public static SubsidiaryViewType GetView(bool isEnabledSubsidiary, bool isMaster, int userLevel, int? whiteLabelID)
        {
            if (isEnabledSubsidiary && userLevel < UserLevelType.Subsidiary)
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