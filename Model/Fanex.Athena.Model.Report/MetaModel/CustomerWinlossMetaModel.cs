// -----------------------------------------------------------------------
// <copyright file="CustomerWinLossMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;

    public class CustomerWinLossMetaModel : BaseReportMetaModel, IMetaModelFunctionContract
    {
        public CustomerWinLossMetaModel()
        {
            FromDate = DateTime.Today;
            ToDate = DateTime.Today;
            PageIndex = 1;
            PageSize = DefaultPageSize;
            OrderItem = 0;
            IsAscSort = true;
        }

        public bool IsHistory { get; set; }

        public int OrderItem { get; set; }

        public bool IsAscSort { get; set; }

        public string Username { get; set; }

        public bool IsAllowedBA { get; set; }

        public bool HasComm { get; set; }

        public bool SystemIdVisible { get; set; }

        public string FunctionKey => FunctionNames.CustomerWinLoss;
    }
}