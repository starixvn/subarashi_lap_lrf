// -----------------------------------------------------------------------
// <copyright file="WeeklyLiveMatchMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using Extension.Helper;
    using Fanex.Athena.Model.Core.MetaModel;

    public class WeeklyLiveMatchMetaModel : BaseReportMetaModel, IMetaModelValidation
    {
        public WeeklyLiveMatchMetaModel()
        {
            ToDate = DateTime.Now.AddDays(-1);
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