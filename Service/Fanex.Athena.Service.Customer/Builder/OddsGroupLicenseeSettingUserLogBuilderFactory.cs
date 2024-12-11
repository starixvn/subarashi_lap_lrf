using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Extensions;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class OddsGroupLicenseeSettingUserLogBuilderFactory : IUserLogBuilderFactory
    {
        public IUserLogBuilderExtension GetBuilder(BusinessLogType businessLogType)
        {
#pragma warning disable S1301 // "switch" statements should have at least 3 "case" clauses
            switch (businessLogType)
#pragma warning restore S1301 // "switch" statements should have at least 3 "case" clauses
            {
                case BusinessLogType.OddsGroupLicenseeSettingUpdate:
                    return new OddsGroupLicenseeSettingUpdateLogBuilder();

                default: return null;
            }
        }
    }
}