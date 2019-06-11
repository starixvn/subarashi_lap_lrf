using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class BetListExcelMetaModel : BetListMetaModel
    {
        public string Title { get; set; }

        public BetListShowingOption ShowingOption { get; set; }

        public int[] HiddenColumns { get; set; }

        public int StartIndex { get; set; } = 1;
    }
}