using System;
using System.Collections.Generic;
using System.Data;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Common.Extensions;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    public class PlayerWinLossService : IPlayerWinLossService
    {
        private const int PageIndex = 1;
        private const int PageSize = int.MaxValue - 1000;

        private readonly IDbFactory _dbFactory;

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public PlayerWinLossService(IDbFactory dbFactory, IBalanceUpDataAccess balanceUpDataAccess)
        {
            _dbFactory = dbFactory;
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public IEnumerable<PlayerWinLoss> GetData(PlayerWinLossMetaModel metaModel)
        {
            const string SpName = "Lrf_Rpt_WinLoss";
            var dataList = new List<PlayerWinLoss>();

            using (var objectDb = _dbFactory.GetObjectDb(SpName))
            {
                AddParameters(objectDb, metaModel, _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        dataList.Add(ReadDataItem(reader));
                    }
                }
            }

            return dataList;
        }

        private static void AddParameters(IObjectDb db, PlayerWinLossMetaModel metaModel, DateTime moveBetsDay)
        {
            db.SetParameterValue("username", metaModel.UserName);
            db.SetParameterValue("fromdate", metaModel.FromDate);
            db.SetParameterValue("todate", metaModel.ToDate);
            db.SetParameterValue("pagesize", PageSize);
            db.SetParameterValue("pageindex", PageIndex);
            db.SetParameterValue("movebetsday", moveBetsDay);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);

            foreach (var item in GetProductCodeList(metaModel.ProductCodeList))
            {
                db.SetParameterValue("show" + item, true);
            }
        }

        private static IEnumerable<string> GetProductCodeList(string productListString)
        {
            return productListString.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        }

        private static PlayerWinLoss ReadDataItem(IDataReader reader)
        {
            return new PlayerWinLoss
            {
                Turnover = reader.ToDecimal("turnover"),
                TotalTransaction = reader.ToInt("betcount"),
                WinLoss = reader.ToDecimal("memberwinlost"),
                BetEffective = reader.ToDecimal("beteffective"),
                Comm = reader.ToDecimal("playercomm"),
                Total = reader.ToDecimal("customertotalwl"),
                LicenseeWL = reader.ToDecimal("licenseewl"),
                BAComm = reader.ToDecimal("commba"),
                AmtDueToBA = reader.ToDecimal("amtduetoba")
            };
        }
    }
}