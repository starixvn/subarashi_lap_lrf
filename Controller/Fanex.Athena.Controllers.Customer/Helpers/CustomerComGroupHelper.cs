using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Customer.Helpers;

namespace Fanex.Athena.Controllers.Customer.Helpers
{
    public static class CustomerComGroupHelper
    {
        private static readonly IDictionary<int, string> UpdatingErrorMap = new Dictionary<int, string>
        {
            { 100, nameof(ViewResources.MessageCommCannotGreaterThan) },
            { 101, nameof(ViewResources.MessageGroupDoesNotExistMsg) },
            { 102, nameof(ViewResources.MessageGroupHasAlreadyChoosen) },
            { 103, nameof(ViewResources.GroupSetAsDefaultMsg) },
        };

        private static readonly IDictionary<int, string> CreatingErrorMap = new Dictionary<int, string>
        {
            { 100, nameof(ViewResources.MessageCommCannotGreaterThan) },
            { 101, nameof(ViewResources.MessageGroupCreationFail) },
            { 102, nameof(ViewResources.GroupNameExistedMsg) }
        };

        public static bool IsValidCommissions(GroupCommMetaModel metaModel)
        {
            var comms = metaModel.CommValues.Select(p => p.Value.Discount).ToArray();
            return GroupCommHelper.IsAllValid(comms);
        }

        public static string GetUpdateGroupErrorMessage(int errorCode)
        {
            if (!UpdatingErrorMap.ContainsKey(errorCode))
            {
                return string.Empty;
            }

            return ViewResources.ResourceManager.GetString(UpdatingErrorMap[errorCode]);
        }

        public static string GetCreateGroupErrorMessage(int errorCode)
        {
            if (!CreatingErrorMap.ContainsKey(errorCode))
            {
                return string.Empty;
            }

            return ViewResources.ResourceManager.GetString(CreatingErrorMap[errorCode]);
        }

        public static void UpdateMetaModelAfterProcessSuccessfully(GroupCommMetaModel metaModel)
        {
            metaModel.IsResetDefault = false;
            metaModel.DefaultGroupId = metaModel.IsDefaultGroup ? metaModel.GroupCommId : metaModel.DefaultGroupId;
            metaModel.OriginalGroupName = metaModel.GroupName;
        }

        public static bool IsSameGroup(GroupCommMetaModel currentGroup, GroupCommMetaModel editedGroup)
        {
            var currentComm = currentGroup.CommValues;
            var editedComm = editedGroup.CommValues;

            foreach (var c in currentComm)
            {
                if (!editedComm.ContainsKey(c.Key) || c.Value.Discount != editedComm[c.Key].Discount)
                {
                    return false;
                }
            }

            return currentGroup.GroupColor.Equals(editedGroup.GroupColor, StringComparison.OrdinalIgnoreCase)
                && currentGroup.GroupCommId == editedGroup.GroupCommId
                && currentGroup.GroupName.Equals(editedGroup.GroupName)
                && currentGroup.IsDefaultGroup == editedGroup.IsDefaultGroup;
        }

        public static int GetCommPart(decimal comm, int position)
        {
            var actualComm = comm * 10000;
            switch (position)
            {
                case 1:
                    return (int)(actualComm / 100);

                case 2:
                    return (int)(actualComm % 100) / 10;

                case 3:
                    return (int)actualComm % 10;

                default:
                    return 0;
            }
        }
    }
}