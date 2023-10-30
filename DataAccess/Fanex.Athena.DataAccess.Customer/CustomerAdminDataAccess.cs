using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;
using Fanex.Data;

namespace Fanex.Athena.DataAccess.Customer
{
    public class CustomerAdminDataAccess : BaseDataAccess, ICustomerAdminDataAccess
    {
        public async Task<CustomerInfo> GetCustomerInfoByUserNameAsync(GetCustomerInfoMetaModel metaModel)
        {
            const string spName = "Lrf_Rpt_Audit_AdminPlayerSearch";
            using (var db = GetObjectDb(spName))
            {
                db.SetParameterValue("SearchName", metaModel.UserName);

                var result = await db.QueryAsync<CustomerInfo>().ConfigureAwait(false);

                return result.FirstOrDefault();
            }
        }

        public async Task<CustomerDetailInfo> GetCustomerInfoByCustIdAsync(GetCustomerInfoMetaModel metaModel)
        {
            const string spName = "Lrf_Rpt_Audit_AdminPlayerDetail";
            using (var db = GetObjectDb(spName))
            {
                db.SetParameterValue("CustId", metaModel.CustId);

                var result = await db.QueryAsync<CustomerDetailInfo>().ConfigureAwait(false);

                return result.FirstOrDefault();
            }
        }

        public async Task<ApiPagingResult<CustomerBetList>> GetBetListByCustIdAsync(GetCustomerBetListMetaModel metaModel)
        {
            const string spName = "Lrf_Rpt_Audit_AdminBetList";
            using (var db = GetObjectDb(spName))
            {
                AssignGetBetListParams(db, metaModel);
                using (var reader = await db.QueryMultipleAsync())
                {
                    var customerBetList = await reader.ReadAsync<CustomerBetList>();
                    var total = await reader.ReadSingleAsync<int>();

                    var result = new ApiPagingResult<CustomerBetList>(customerBetList,
                                       metaModel.PageIndex, metaModel.PageSize,
                                       metaModel.OrderCol, metaModel.SortType,
                                       total);
                    return result;
                }
            }
        }

        public async Task<IEnumerable<CustomerWithdrawHistory>> GetWithdrawHistoryByCustIdAsync(GetCustomerInfoMetaModel metaModel)
        {
            const string spName = "Lrf_Rpt_Audit_AdminWithdrawHistory";
            using (var db = GetObjectDb(spName))
            {
                AssignCommonParams(db, metaModel);

                var result = await db.QueryAsync<CustomerWithdrawHistory>().ConfigureAwait(false);

                return result;
            }
        }

        public async Task<IEnumerable<CustomerDepositHistory>> GetDepositHistoryByCustIdAsync(GetCustomerInfoMetaModel metaModel)
        {
            const string spName = "Lrf_Rpt_Audit_AdminDepositHistory";
            using (var db = GetObjectDb(spName))
            {
                AssignCommonParams(db, metaModel);

                var result = await db.QueryAsync<CustomerDepositHistory>().ConfigureAwait(false);

                return result;
            }
        }

        private void AssignCommonParams(IObjectDb db, GetCustomerInfoMetaModel metaModel)
        {
            db.SetParameterValue("CustId", metaModel.CustId);
            db.SetParameterValue("FromDate", metaModel.FromDate);
            db.SetParameterValue("ToDate", metaModel.ToDate);
            db.SetParameterValue("BUDate", metaModel.BUDate);
        }

        private void AssignGetBetListParams(IObjectDb db, GetCustomerBetListMetaModel metaModel)
        {
            db.SetParameterValue("CustId", metaModel.CustId);
            db.SetParameterValue("FromDate", metaModel.FromDate);
            db.SetParameterValue("ToDate", metaModel.ToDate);
            db.SetParameterValue("PageIndex", metaModel.PageIndex);
            db.SetParameterValue("PageSize", metaModel.PageSize);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
        }
    }
}