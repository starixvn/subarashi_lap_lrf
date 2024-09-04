namespace Fanex.Athena.Model.Customer.MetaModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Data;
    using Fanex.Athena.Model.Core.Helper;
    using Resources;

    public class GroupCommMetaModel
    {
        private const int MaxGroupNameLength = 100;

        public GroupCommMetaModel()
        {
            GroupColor = "#ffffff";
        }

        [Required]
        public int LicenseeId { get; set; }

        [Required]
        public int GroupCommId { get; set; }

        [Required(ErrorMessageResourceType = typeof(ViewResources), ErrorMessageResourceName = "GroupNameNotEmptyMsg")]
        [StringLength(MaxGroupNameLength, ErrorMessageResourceType = typeof(ViewResources), ErrorMessageResourceName = "GroupNameNotExceed100CharactersMsg")]
        [RegularExpression(@"^[a-zA-Z0-9 ]+$",
         ErrorMessageResourceType = typeof(ViewResources), ErrorMessageResourceName = "GroupNameOnlyContainCharactersAndNumberMsg")]
        public string GroupName { get; set; }

        public string OriginalGroupName { get; set; }

        public int NumberOfCustomer { get; set; }

        [Required]
        public string GroupColor { get; set; }

        public bool IsDefaultGroup { get; set; }

        public int DefaultGroupId { get; set; }

        public bool IsResetDefault { get; set; }

        public IEnumerable<GroupCommSettingMetaModel> CommValues { get; set; }

        public void MapData(IDataReader reader)
        {
            GroupCommId = Convert.ToInt32(reader["GroupDiscountID"]);
            GroupColor = Convert.ToString(reader["GroupColor"]);
            IsDefaultGroup = Convert.ToBoolean(reader["IsDefault"]);
        }

        public void MapCommData(IDataReader reader)
        {
            GroupCommId = Convert.ToInt32(reader["GroupDiscountID"]);
            GroupColor = Convert.ToString(reader["GroupColor"]);
            IsDefaultGroup = Convert.ToBoolean(reader["IsDefault"]);
        }
    }
}