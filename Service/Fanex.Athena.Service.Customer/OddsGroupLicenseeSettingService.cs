using Autofac.Features.AttributeFilters;
using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.DTO.Users;
using Fanex.Athena.Model.Customer.DTO.OddsGroupLicenseeSetting;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Customer
{
    public class OddsGroupLicenseeSettingService : IOddsGroupLicenseeSettingService
    {
        private readonly IOddsGroupLicenseeSettingDataAccess _oddsGroupLicenseeSettingDataAccess;
        private readonly IUserLogDataAccess _userLogDataAccess;
        private readonly IUserLogService _userLogService;

        private readonly IList<int> _oddsGroupActionIds = new List<int> {
            LogActionId.UpdateCustomerOddsGroupByCurrency,
            LogActionId.UpdateCustomerOddsGroupBySubsidiary };

        public OddsGroupLicenseeSettingService(
            IOddsGroupLicenseeSettingDataAccess oddsGroupLicenseeSettingDataAccess,
            IUserLogDataAccess userLogDataAccess,
            [KeyFilter("OddsGroupLicenseeSettingService")] IUserLogService userLogService)
        {
            _oddsGroupLicenseeSettingDataAccess = oddsGroupLicenseeSettingDataAccess;
            _userLogDataAccess = userLogDataAccess;
            _userLogService = userLogService;
        }

        public async Task<IEnumerable<CustomerOddsGroupViewModel>> GetCustomerOddsGroup(GetCustomerOddsGroupMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            var data = await _oddsGroupLicenseeSettingDataAccess.GetCustomerOddsGroup(metaModel).ConfigureAwait(false);
            var result = GroupDataList(data, currencyList, metaModel);

            return result;
        }

        public IResultInfo UpdateCustomerOddsGroup(UpdateCustomerOddsGroupMetaModel metaModel)
        {
            var custIdList = metaModel.CustIds.Split(',');
            IResultInfo result = new ResultInfo();

            foreach (var custId in custIdList)
            {
                result = _oddsGroupLicenseeSettingDataAccess.UpdateCustomerOddsGroup(metaModel, Convert.ToInt32(custId));

                if (!result.IsSuccessful)
                {
                    return result;
                }
            }

            return result;
        }

        public void WriteCustomerOddsGroupLog(UpdateCustomerOddsGroupMetaModel metaModel)
        {
            var actionId = !string.IsNullOrEmpty(metaModel.Subsidiary)
                ? LogActionId.UpdateCustomerOddsGroupBySubsidiary
                : LogActionId.UpdateCustomerOddsGroupByCurrency;

            var logMetaModel = new UpdateCustomerOddsGroupLogMetaModel
            {
                LicenseeCustId = metaModel.LicenseeCustId,
                SiteName = metaModel.SiteName,
                UserId = metaModel.UserId,
                UserName = metaModel.UserName,
                Subsidiary = metaModel.Subsidiary,
                Currency = metaModel.Currency,
                ActionId = actionId,
                ActionDetailId = LogActionDetailId.UpdatingCustomerOddsGroup,
                NewValue = metaModel.NewValue,
                OldValue = metaModel.OldValue
            };
            _userLogService.Write(BusinessLogType.OddsGroupLicenseeSettingUpdate, logMetaModel);
        }

        public IResultInfo CheckAllowedDownlines(UpdateCustomerOddsGroupMetaModel metaModel)
        {
            return _oddsGroupLicenseeSettingDataAccess.CheckAllowedDownlines(metaModel);
        }

        public async Task<CustomerOddsGroupLogResultModel> GetLoglist(UserLogMetaModel metaModel)
        {
            metaModel.ActionIdList = GetActionIdList();

            var logs = await _userLogDataAccess.ReadLog(metaModel).ConfigureAwait(false);
            var (logByLicensee, totalRows) = FilterLogByLicensee(logs, metaModel.LicenseeId);

            return new CustomerOddsGroupLogResultModel
            {
                DataList = PaginateLogs(logByLicensee, metaModel.PageIndex, metaModel.PageSize),
                TotalRows = totalRows
            };
        }

        private DataTable GetActionIdList()
        {
            var actionIdList = new DataTable();
            actionIdList.Columns.Add("Val", typeof(int));
            foreach (var item in _oddsGroupActionIds)
            {
                actionIdList.Rows.Add(item);
            }

            return actionIdList;
        }

        private static (IEnumerable<CustomerOddsGroupLog>, int) FilterLogByLicensee(IEnumerable<UserLog> logs, int licenseeId)
        {
            var result = new List<CustomerOddsGroupLog>();

            foreach (var item in logs)
            {
                var doings = item.Doing.Split('-').Select(s => s.Trim()).ToArray();
                var itemLicenseeId = doings.Length > 1 ? doings[1] : string.Empty;

                if (itemLicenseeId == licenseeId.ToString())
                {
                    var subsidiary = doings.Length > 5 && !string.IsNullOrEmpty(doings[5]) ? $"{doings[5]} - " : string.Empty;
                    var currency = doings.Length > 6 ? doings[6] : string.Empty;
                    var newValue = doings.Length > 3 && !string.IsNullOrEmpty(doings[3])
                        ? doings[3] : ViewResources.ResourceManager.GetString("N_A");
                    var oldValue = doings.Length > 4 && !string.IsNullOrEmpty(doings[4])
                        ? doings[4] : ViewResources.ResourceManager.GetString("N_A");

                    result.Add(
                        new CustomerOddsGroupLog
                        {
                            LogId = item.LogID,
                            LogDate = item.LogDate.ToString("MM/dd/yyyy HH:mm:ss"),
                            Action = ViewResources.ResourceManager.GetString("LogAction_" + item.ActionID),
                            Object = subsidiary + currency,
                            NewValue = newValue,
                            OldValue = oldValue,
                            Modify = doings.Length > 7 ? doings[7] : string.Empty
                        }
                    );
                }
            }

            return (result, result.Count());
        }

        private static IEnumerable<CustomerOddsGroupLog> PaginateLogs(IEnumerable<CustomerOddsGroupLog> logs, int pageIndex, int pageSize)
        {
            return logs.Skip((pageIndex - 1) * pageSize).Take(pageSize); ;
        }

        private static IEnumerable<CustomerOddsGroupViewModel> GroupDataList(IEnumerable<CustomerOddsGroup> data, IDictionary<int, string> currencyList, GetCustomerOddsGroupMetaModel metaModel)
        {
            var subsidiaries = metaModel.SubsidiaryList.Split(',');

            var groupedData = data
               .Where(_ => !metaModel.SubsidiarySearch || subsidiaries.Contains(_.OperatorID))
               .GroupBy(_ => new { _.Currency, Subsidiary = metaModel.SubsidiarySearch ? _.OperatorID : string.Empty })
               .Select(g => new CustomerOddsGroupViewModel
               {
                   CurrencyId = g.Key.Currency,
                   Currency = currencyList.TryGetValue(g.Key.Currency, out string currency) ? currency : g.Key.Currency.ToString(),
                   Subsidiary = g.Key.Subsidiary,
                   Custids = string.Join(",", g.Select(c => c.Custid.ToString()).Distinct()),
                   OddsGroup = g.Select(c => c.Oddsgroup).Distinct().Count() == 1 ? g.First().Oddsgroup : string.Empty
               });

            return groupedData;
        }
    }
}