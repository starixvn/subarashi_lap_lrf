using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Extensions;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class PlayerSegmentationBusinessLogBuilderFactory : IBusinessLogBuilderFactory
    {
        public IBusinessLogBuilderExtension GetBuilder(BusinessLogType businessLogType)
        {
#pragma warning disable S1301 // "switch" statements should have at least 3 "case" clauses
            switch (businessLogType)
#pragma warning restore S1301 // "switch" statements should have at least 3 "case" clauses
            {
                case BusinessLogType.PlayerSegmentationUpdatePlayer:
                    return new PlayerSegmentUpdatePlayerLogBuilder();

                default: return null;
            }
        }
    }
}