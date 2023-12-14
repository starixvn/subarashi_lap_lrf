// -----------------------------------------------------------------------
// <copyright file="WeeklyLiveMatchMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using Extension.Helper;
    using Fanex.Athena.Model.Core.MetaModel;

    public class WeeklyLiveMatchMetaModel : BaseReportMetaModel, IMetaModelValidation
    {
        public WeeklyLiveMatchMetaModel()
        {
            ToDate = DateTimeHelper.Now.AddDays(-1);
            FromDate = DateTimeHelper.GetFirstDateOfWeek(ToDate);
        }

        public string SortDirection { get; set; }

        public string SortColumn { get; set; }

        public override bool IsValid
        {
            get
            {
                return FromDate <= ToDate;
            }
        }
    }
}