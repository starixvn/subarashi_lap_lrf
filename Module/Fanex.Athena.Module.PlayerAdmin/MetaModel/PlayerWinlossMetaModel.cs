using System;
using System.ComponentModel.DataAnnotations;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    public class PlayerWinLossMetaModel : IMetaModelAgent
    {
        private string _userName;

        [Required]
        public string UserName
        {
            get
            {
                return _userName;
            }

            set
            {
                _userName = value?.Trim();
            }
        }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string ProductCodeList { get; set; }

        public string AgentListXml { get; set; }

        public DateTime MoveBetsDay { get; set; }
    }
}