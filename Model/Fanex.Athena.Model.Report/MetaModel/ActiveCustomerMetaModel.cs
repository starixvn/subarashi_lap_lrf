// -----------------------------------------------------------------------
// <copyright file="ActiveCustomerMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    /// <summary>
    /// ActiveCustomerMetaModel class.
    /// </summary>
    public class ActiveCustomerMetaModel : BaseReportMetaModel
    {
        public ActiveCustomerMetaModel()
        {
            IsExcludedTestData = true;
        }

        public byte ReportBy { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }
    }
}