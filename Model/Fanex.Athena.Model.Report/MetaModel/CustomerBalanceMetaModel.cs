// -----------------------------------------------------------------------
// <copyright file="CustomerBalanceMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using Fanex.Athena.Model.Core.DataDomain;

    public class CustomerBalanceMetaModel : BaseReportMetaModel
    {
        public CustomerBalanceMetaModel()
        {
            FromDate = ToDate = DateTime.Today;
            PageIndex = 1;
            PageSize = DefaultPageSize;
            OrderItem = 1;
            IsExcludedTestData = true;
        }

        public int TopCount { get; set; }

        public short OrderItem { get; set; }

        public string FunctionKey => FunctionNames.CustomerBalance;
    }
}