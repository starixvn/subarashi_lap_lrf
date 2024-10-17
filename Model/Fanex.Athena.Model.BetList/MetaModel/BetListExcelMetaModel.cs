using Fanex.Athena.Model.Core.DTO.Common;
using System;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class BetListExcelMetaModel : BetListMetaModel
    {
        public string Title { get; set; }

        public ShowingOption ShowingOption { get; set; }

        public int[] HiddenColumns { get; set; }

        public int StartIndex { get; set; } = 1;

        public string ProductCode { get; set; }

        public string MatchName { get; set; }

        public string MatchCode { get; set; }

        public string VendorMatchId { get; set; }

        public string Distance { get; set; }

        public bool IsNeutral { get; set; }

        public DateTime KickOffTime { get; set; }
    }
}