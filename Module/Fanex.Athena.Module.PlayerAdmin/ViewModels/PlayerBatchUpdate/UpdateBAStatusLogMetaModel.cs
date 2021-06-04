using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;

namespace Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerBatchUpdate
{
    public class UpdateBAStatusLogMetaModel
    {
        private const int actionId = 5550;
        private const int actionDetailId = 3;

        public UpdateBAStatusLogMetaModel(UpdateBAStatusQuery query, IResultInfo result)
        {
            SiteName = query.LicenseeName;
            UserId = query.UserId;
            CustId = query.CustIds;
            Status = result.IsSuccessful ? "Success" : "False";
            NewValue = query.AllowBA ? "ON" : "OFF";
            OldValue = !query.AllowBA ? "ON" : "OFF";
        }

        public int ActionId { get; set; } = actionId;
        public int ActionDetailId { get; set; } = actionDetailId;
        public int LicenseeCustId { get; set; }
        public string SiteName { get; set; }
        public int UserId { get; set; }
        public string CustId { get; set; }
        public string Status { get; set; }
        public string NewValue { get; set; }
        public string OldValue { get; set; }
    }
}
