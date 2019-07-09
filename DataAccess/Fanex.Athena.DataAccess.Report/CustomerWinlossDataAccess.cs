// -----------------------------------------------------------------------
// <copyright file="CustomerWinlossDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Core.Configuration.Interfaces;
    using Data;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;
    using Model.Core.ResultModel;

    public class CustomerWinlossDataAccess : BaseDataAccess, ICustWinlossDataAccess
    {
        private const int PageSizeExcel = int.MaxValue - 1000;

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public CustomerWinlossDataAccess(
            IBalanceUpDataAccess balanceUpDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<ReportResultModel<CustomerWinLoss>> GetDataList(CustomerWinLossMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_WinLoss";

            using (var db = GetObjectDb(UspName))
            {
                AddParameters(db, metaModel, _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var dataList = new List<CustomerWinLoss>();
                    var index = ((metaModel.PageIndex - 1) * metaModel.PageSize) + 1;
                    while (reader.Read())
                    {
                        dataList.Add(ReadDataItem(reader, index++));
                    }

                    var result = new ReportResultModel<CustomerWinLoss>
                    {
                        DataList = dataList
                    };

                    if (dataList.Any() && reader.NextResult() && reader.Read())
                    {
                        result.TotalData = ReadTotalData(reader);
                        result.TotalRows = reader.ToInt("TotalRows");
                        result.AdditionalInfo = reader.ToString("SumPromotionPrize");
                    }
                    else
                    {
                        result.TotalData = new CustomerWinLoss();
                    }

                    return result;
                }
            }
        }

        private static CustomerWinLoss ReadDataItem(IDataReader reader, int index)
        {
            return new CustomerWinLoss
            {
                Index = index,
                CustId = reader.ToInt("CustID"),
                ExternalId = reader.ToString("nickname"),
                SystemId = reader.ToString("username"),
                Turnover = reader.ToDecimal("turnover"),
                TotalTransaction = reader.ToInt("betcount"),
                CustomerWL = reader.ToDecimal("memberwinlost"),
                BetEffective = reader.ToDecimal("beteffective"),
                PlayerComm = reader.ToDecimal("playercomm"),
                CustomerTotalWL = reader.ToDecimal("customertotalwl"),
                LicenseeWL = reader.ToDecimal("licenseewl"),
                BAComm = reader.ToDecimal("commba"),
                AmtDueToBA = reader.ToDecimal("amtduetoba")
            };
        }

        private static void AddParameters(IObjectDb db, CustomerWinLossMetaModel metaModel, DateTime moveBetsDay)
        {
            db.SetParameterValue("fromdate", metaModel.FromDate);
            db.SetParameterValue("todate", metaModel.ToDate);
            db.SetParameterValue("pagesize", metaModel.IsExportExcel ? PageSizeExcel : metaModel.PageSize);
            db.SetParameterValue("pageindex", metaModel.PageIndex);
            db.SetParameterValue("movebetsday", moveBetsDay);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("username", metaModel.Username);
            db.SetParameterValue("OrderItem", metaModel.OrderItem);
            db.SetParameterValue("IsAscSort", metaModel.IsAscSort);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            foreach (var item in metaModel.ProductOptions)
            {
                db.SetParameterValue("show" + item.Code, item.Status);
            }
        }

        private static CustomerWinLoss ReadTotalData(IDataReader reader)
        {
            return new CustomerWinLoss
            {
                Turnover = reader.ToDecimal("sumturnover"),
                TotalTransaction = reader.ToInt("sumbetcount"),
                CustomerWL = reader.ToDecimal("summemberwinlost"),
                PlayerComm = reader.ToDecimal("sumplayercomm"),
                LicenseeWL = reader.ToDecimal("sumlicenseewl"),
                BAComm = reader.ToDecimal("sumcommba"),
                AmtDueToBA = reader.ToDecimal("sumamtduetoba"),
                BetEffective = reader.ToDecimal("sumbeteffective"),
                CustomerTotalWL = reader.ToDecimal("sumcustomertotalwl")
            };
        }
    }
}