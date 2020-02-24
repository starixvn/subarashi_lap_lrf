using Fanex.Athena.Api.Base;
using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using System.Threading.Tasks;
using System.Web.Http;

namespace Fanex.Athena.Api.Customer
{
    [ApiFunctionAuthorization(PermissionKeys.CustomerInfoCustomerLog)]
    public class PlayerSegmentationController : BaseApiController
    {
        private readonly IPlayerSegmentationDataAccess _playerDataAccess;

        public PlayerSegmentationController(ILanguageService languageService, IPlayerSegmentationDataAccess playerDataAccess)
            : base(languageService)
        {
            _playerDataAccess = playerDataAccess;
        }

        [HttpPost]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        public async Task<dynamic> UploadVipList()
        {
            return null;
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<PagingApiResult<PlayerInfo>> GetProblemPlayerList(ProblemPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetProblemPlayerListAsync(metaModel);
            return result;
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<PagingApiResult<PlayerInfo>> GetVipPlayerList(VipPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetVipPlayerListAsync(metaModel);
            return result;
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        public async Task<dynamic> UpdateVipStatus()
        {
            return null;
        }
    }
}