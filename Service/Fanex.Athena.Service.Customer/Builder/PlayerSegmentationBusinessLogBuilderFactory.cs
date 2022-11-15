using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Extensions;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class PlayerSegmentationBusinessLogBuilderFactory : IBusinessLogBuilderFactory
    {
        public IBusinessLogBuilderExtension GetBuilder(BusinessLogType businessLogType)
        {
            switch (businessLogType)
            {
                case BusinessLogType.PlayerSegmentationUpdatePlayer:
                    return new PlayerSegmentUpdatePlayerLogBuilder();

                default: return null;
            }
        }
    }
}