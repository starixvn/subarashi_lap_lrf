using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.OddsGroupLicenseeSetting;
using Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting;
using Fanex.Data;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Customer
{
    public class OddsGroupLicenseeSettingDataAccess : BaseDataAccess, IOddsGroupLicenseeSettingDataAccess
    {
        public async Task<IEnumerable<CustomerOddsGroup>> GetCustomerOddsGroup(GetCustomerOddsGroupMetaModel metaModel)
        {
            const string spName = "Lrf_OddsGroup_AgentListSel";
            using (var db = GetObjectDb(spName))
            {
                AssignCommonParams(db, metaModel);

                var result = await db.QueryAsync<CustomerOddsGroup>().ConfigureAwait(false);

                return result;
            }
        }

        public async Task<IResultInfo> UpdateCustomerOddsGroup(UpdateCustomerOddsGroupMetaModel metaModel, int custId, CancellationToken cancellationToken)
        {
            const string UspName = "Lrf_LicenseeOddsGroupUpd";

            cancellationToken.ThrowIfCancellationRequested();

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("CustID", custId);
                db.SetParameterValue("OddsGroup", metaModel.NewValue);
                db.SetParameterValue("UserID", metaModel.UserId);
                db.SetParameterValue("IP", metaModel.IP);
                db.SetParameterValue("Language", metaModel.Language);
                AddResultParam(db);

                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                return GetResult(db);
            }
        }

        public IResultInfo CheckAllowedDownlines(UpdateCustomerOddsGroupMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerSelCheckAllowedDownlines";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("CustID", metaModel.CustId);
                db.SetParameterValue("Language", metaModel.Language);
                AddResultParam(db);

                db.ExecuteNonQuery();

                return GetResult(db);
            }
        }

        private static void AssignCommonParams(IObjectDb db, GetCustomerOddsGroupMetaModel metaModel)
        {
            db.SetParameterValue("LicenseeId", metaModel.LicenseeId);
            db.SetParameterValue("CurrencyList", metaModel.CurrencyIdList);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
        }
    }
}