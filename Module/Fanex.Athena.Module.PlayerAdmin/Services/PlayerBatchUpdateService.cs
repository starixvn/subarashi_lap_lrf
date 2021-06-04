using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac.Features.AttributeFilters;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.DataDomains;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;
using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    public class PlayerBatchUpdateService : IPlayerBatchUpdateService
    {
        private const int TurnOffVIPErrorCode = 105;
        private readonly IPlayerBatchUpdateRepository repository;
        private readonly IAuthorizationService authorizationService;
        private readonly IBusinessLogService businessLogService;

        public PlayerBatchUpdateService(
            IPlayerBatchUpdateRepository repository,
            IAuthorizationService authorizationService,
            [KeyFilter("CustomerLogService")] IBusinessLogService businessLogService)
        {
            this.repository = repository;
            this.authorizationService = authorizationService;
            this.businessLogService = businessLogService;
        }

        public async Task<IResultInfo> UpdateSpecialLevel(UpdateSpecialLevelQuery query)
        {
            var result = new ResultInfo();
            var errors = new List<string>();
            var extendedData = new List<string>();

            var custInfo = query.CustInfo();
            var validCustIds = authorizationService.GetBelongingCustIds(query.CurrencyAgentList, query.CustIds);
            var oldValues = await repository.GetOldValues(validCustIds, GetOldValuesCriteria.SpecialLevelType);

            for (var i = 0; i < custInfo.Count; i++)
            {
                var cust = custInfo[i];
                var custId = cust.Id.ToString();
                var custName = cust.Name;
                if (!validCustIds.Contains(cust.Id))
                {
                    errors.Add($"Access Denied. ({custName})");
                    continue;
                }

                var oldValue = oldValues.ContainsKey(custId) ? oldValues[custId] : string.Empty;
                if (string.Equals(query.SpecialLevelId, oldValue, StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                var criteria = new UpdateSpecialLevelCriteria(query, custId);
                var tempResult = await repository.Update(criteria);
                if (!tempResult.IsSuccessful)
                {
                    errors.Add($"{tempResult.Message} ({custName})");
                }
                else
                {
                    extendedData.Add(custId);
                }

                var log = new
                {
                    LicenseeCustId = query.LicenseeId,
                    SiteName = query.SiteName,
                    UserId = query.UserId,
                    CustId = custId,
                    ActionId = LogActionId.PlayerAdminUpdateSpecialLevel,
                    ActionDetailId = LogActionDetailId.UpdatingSpecialLevel,
                    Status = tempResult.IsSuccessful ? LogText.Success : LogText.False,
                    NewValue = query.SpecialLevelId,
                    OldValue = oldValue
                };

                businessLogService.Write(BusinessLogType.CustomerUpdateSpecialLevel, log);
            }

            result.Code = errors.Any() ? 1 : 0;
            result.Message = errors.Any() ? string.Join("<br />", errors) : ViewResources.UpdateSuccess;
            result.ExtendedData = string.Join(",", extendedData);
            return result;
        }

        public async Task<IResultInfo> UpdateOddsGroup(UpdateOddsGroupQuery query)
        {
            var result = new ResultInfo();
            var errors = new List<string>();
            var extendedData = new List<string>();

            var custInfo = query.CustInfo();
            var validCustIds = authorizationService.GetBelongingCustIds(query.CurrencyAgentList, query.CustIds);
            var oldValues = await repository.GetOldValues(validCustIds, GetOldValuesCriteria.OddsGroupType);
            var oldBAs = await repository.GetOldValues(validCustIds, GetOldValuesCriteria.BAStatusType);
            var addBAError = false;

            for (var i = 0; i < custInfo.Count; i++)
            {
                var cust = custInfo[i];
                var custId = cust.Id.ToString();
                var custName = cust.Name;
                if (!validCustIds.Contains(cust.Id))
                {
                    errors.Add($"Access Denied. ({custName})");
                    continue;
                }

                var oldValue = oldValues.ContainsKey(custId) ? oldValues[custId] : string.Empty;
                if (string.Equals(query.OddsGroupId, oldValue, StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                if (oldBAs.ContainsKey(custId) && IsBA(oldBAs[custId]))
                {
                    addBAError = true;
                    continue;
                }

                var criteria = new UpdateOddsGroupCriteria(query, custId);
                var tempResult = await repository.Update(criteria);
                if (!tempResult.IsSuccessful)
                {
                    errors.Add($"{tempResult.Message} ({custName})");
                }
                else
                {
                    extendedData.Add(custId);
                }

                var log = new
                {
                    LicenseeCustId = query.LicenseeId,
                    SiteName = query.SiteName,
                    UserId = query.UserId,
                    CustId = custId,
                    ActionId = LogActionId.PlayerAdminUpdateOddsGroup,
                    ActionDetailId = LogActionDetailId.UpdatingOddsGroup,
                    Status = tempResult.IsSuccessful ? LogText.Success : LogText.False,
                    NewValue = query.OddsGroupId,
                    OldValue = oldValue
                };

                businessLogService.Write(BusinessLogType.CustomerUpdateOddsGroup, log);
            }

            result.Code = errors.Any() ? 1 : 0;
            var msg = errors.Any() ? string.Join("<br />", errors) : ViewResources.UpdateSuccess;
            result.Message = addBAError ? $"{ViewResources.MessageUpdateOddsGroupForBAPlayers}<br />{msg}" : msg;
            result.ExtendedData = string.Join(",", extendedData);
            return result;
        }

        public async Task<IResultInfo> UpdateBAStatus(UpdateBAStatusQuery query)
        {
            var result = new ResultInfo();
            var errors = new List<string>();

            var custInfo = query.CustInfo();
            var validCustIds = authorizationService.GetBelongingCustIds(query.CurrencyAgentList, query.CustIds);
            var oldValues = await repository.GetOldValues(validCustIds, GetOldValuesCriteria.BAStatusType);
            var addTurnOffVIPError = false;
            var hasError = false;
            var extendedData = new List<string>();

            for (var i = 0; i < custInfo.Count; i++)
            {
                var cust = custInfo[i];
                var custId = cust.Id.ToString();
                var custName = cust.Name;

                if (!validCustIds.Contains(cust.Id))
                {
                    errors.Add($"Access Denied. ({custName})");
                    continue;
                }

                var oldValue = oldValues.ContainsKey(custId) ? oldValues[custId] : string.Empty;
                if (string.Equals(query.BAStatusId, oldValue, StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                var criteria = new UpdateBAStatusCriteria(query, custId);
                var tempResult = await repository.Update(criteria);
                if (tempResult.Code == TurnOffVIPErrorCode)
                {
                    addTurnOffVIPError = true;
                    continue;
                }
                else if (!tempResult.IsSuccessful)
                {
                    hasError = true;
                    errors.Add($"{tempResult.Message} ({custName})");
                }
                else
                {
                    extendedData.Add(custId);
                }

                var logMetaModel = new
                {
                    LicenseeCustId = query.LicenseeId,
                    SiteName = query.SiteName,
                    UserId = query.UserId,
                    CustId = custId,
                    ActionId = LogActionId.PlayerAdminUpdateBAStatus,
                    ActionDetailId = LogActionDetailId.UpdatingBA,
                    Status = tempResult.IsSuccessful ? LogText.Success : LogText.False,
                    NewValue = query.BAStatusId == "1" ? LogText.On : LogText.Off,
                    OldValue = oldValue
                };

                businessLogService.Write(BusinessLogType.CustomerUpdateBA, logMetaModel);
            }

            result.Code = hasError ? 1 : 0;
            var mssg = errors.Any() ? string.Join("<br />", errors) : ViewResources.UpdateSuccess;
            result.Message = addTurnOffVIPError ? $"{ViewResources.MessageTurnOffVIPError}<br />{mssg}" : mssg;
            result.ExtendedData = string.Join(",", extendedData);
            return result;
        }

        private static bool IsBA(string ba) => ba == "1";
    }
}
