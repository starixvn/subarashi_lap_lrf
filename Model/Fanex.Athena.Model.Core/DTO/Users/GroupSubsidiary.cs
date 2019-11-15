namespace Fanex.Athena.Model.Core.DTO.Users
{
    using System.Collections.Generic;

    public class GroupSubsidiary
    {
        public int? WhiteLabelID { get; set; }

        public string WhiteLabelName { get; set; }

        public IList<string> OperatorIds { get; set; }
    }
}