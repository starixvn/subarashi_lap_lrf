using Fanex.Athena.Api.Base;
using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;

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
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<JsonResult<ApiPagingResult<PlayerInfo>>> GetProblemPlayerList(ProblemPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetProblemPlayerListAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<JsonResult<ApiPagingResult<PlayerInfo>>> GetVipPlayerList(VipPlayerListMetaModel metaModel)
        {
            var result = await _playerDataAccess.GetVipPlayerListAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindUserId = true, BindIp = true)]
        public async Task<JsonResult<IEnumerable<UpdateStatusPlayerResult>>> UpdateVipStatus(UpdateStatusPlayerMetaModel metaModel)
        {
            var result = await _playerDataAccess.UpdateVipStatusAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }

        [HttpPost]
        public async Task<dynamic> UploadVipList()
        {
            var upLoadedFile = HttpContext.Current.Request.Files.Count > 0 ?
                    HttpContext.Current.Request.Files[0] : null;

            if (upLoadedFile?.InputStream == null)
            {
                return JsonApi(new { IsSuccess = false });
            }

            var systemIds = GetSystemIdsFromExcelFile(upLoadedFile.InputStream);
            var metaModel = BindUpdateStatusPlayerMetaModelWithFileUpload(systemIds);

            var result = await _playerDataAccess.UpdateVipStatusAsync(metaModel).ConfigureAwait(false);
            return JsonApi(result);
        }

        private static IEnumerable<string> GetSystemIdsFromExcelFile(Stream stream)
        {
            XSSFWorkbook workbook = new XSSFWorkbook(stream);
            ISheet sheet = workbook.GetSheetAt(0);
            for (int rowIndex = 1; rowIndex <= sheet.LastRowNum; rowIndex++)
            {
                var row = sheet.GetRow(rowIndex);
                if (row != null)
                {
                    yield return row.GetCell(0).StringCellValue;
                }
            }
        }

        private UpdateStatusPlayerMetaModel BindUpdateStatusPlayerMetaModelWithFileUpload(IEnumerable<string> systemIds)
        {
            var actionArgument = new Dictionary<string, object>() { { "metaModel", new UpdateStatusPlayerMetaModel() { SystemIds = string.Join(",", systemIds.ToArray()) } } };
            var userSession = SessionService.UserSession;
            AutoBindMetaModelService.MapAgentXml(actionArgument, userSession.CurrencyAgentList);
            AutoBindMetaModelService.MapUserId(actionArgument, userSession.UserId);
            AutoBindMetaModelService.MapIp(actionArgument, ClientHelper.GetClientIp(request: ActionContext.Request));

            return actionArgument["metaModel"] as UpdateStatusPlayerMetaModel;
        }
    }
}