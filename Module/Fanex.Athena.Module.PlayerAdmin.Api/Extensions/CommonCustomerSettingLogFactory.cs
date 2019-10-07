using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Extensions
{
    public class CommonCustomerSettingLogFactory : IBusinessLogBuilderFactory
    {
        private static readonly IDictionary<BusinessLogType, Func<IBusinessLogBuilderExtension>> LogBuilderByType =
            new Dictionary<BusinessLogType, Func<IBusinessLogBuilderExtension>>
        {
            { BusinessLogType.CustomerUpdateBA, () => new CommonCustomerSettingLogBuilder() },
            { BusinessLogType.CustomerUpdateOddsGroup, () => new CommonCustomerSettingLogBuilder() },
            { BusinessLogType.CustomerUpdateSpecialLevel, () => new CommonCustomerSettingLogBuilder() }
        };

        public IBusinessLogBuilderExtension GetBuilder(BusinessLogType businessLogType)
        {
            if (!LogBuilderByType.ContainsKey(businessLogType))
            {
                return new CommonCustomerSettingLogBuilder();
            }

            return LogBuilderByType[businessLogType]();
        }
    }
}