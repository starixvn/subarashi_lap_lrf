namespace Fanex.Athena.Api.Base
{
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Service.Core.Common.Interfaces;

    [XFrameOptionApi]
    [ApiUMFilter]
    public class CommonApiController : ApiController
    {
        private readonly IMoveBetService _moveBetService;

        private readonly ILanguageService _languageService;

        public CommonApiController(IMoveBetService moveBetService, ILanguageService languageService)
        {
            _moveBetService = moveBetService;
            _languageService = languageService;
        }

        [HttpGet]
        public async Task<string> GetMoveBetNotification()
        {
            var language = _languageService.GetCurrentLanguage();

            return await _moveBetService.GetMoveBetNotificationAsync(language).ConfigureAwait(false);
        }
    }
}