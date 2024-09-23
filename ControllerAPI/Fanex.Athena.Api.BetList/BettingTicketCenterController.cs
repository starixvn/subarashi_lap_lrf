//namespace Fanex.Athena.Api.BetList
//{
//    using System.Threading.Tasks;
//    using System.Web.Http;

//    using Base;
//    using Base.Attributes;
//    using Fanex.Athena.Model.Auth.DataDomain;
//    using Fanex.Athena.Service.Customer.Interfaces;
//    using Fanex.Athena.Service.StatelessCore;
//    using Fanex.Athena.Service.StatelessCore.Interfaces;

//    using Model.BetList.MetaModel;

//    using Service.Core.Common.Interfaces;

//    [ApiFunctionAuthorization(PermissionKeys.BettingTicketCenter)]
//    public class BettingTicketCenterController : BaseApiController
//    {
//        private readonly IBetListApiClient _betListApiClient;
//        private readonly ICustomerClassService _customerClassService;

//        public BettingTicketCenterController(
//            ILanguageService langService,
//            IBetListApiClient betListApiClient,
//            ICustomerClassService customerClassService)
//            : base(langService)
//        {
//            _betListApiClient = betListApiClient;
//            _customerClassService = customerClassService;
//        }

//        [HttpPost]
//        [ApiFunctionAuthorization(PermissionKeys.BtcSingleCustomer)]
//        [ValidationApiRequest]
//        [ApiAutoBindMetaModel(BindAgent = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
//        public async Task<dynamic> GetBySingleCustomer(SingleCustomersBetListMetaModel metaModel)
//        {
//            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
//            metaModel.SpecialPlatform = LicenseeSession.SpecialPlatform;
//            metaModel.SportListXML = BettingTicketCenterSportService.BuildSportTypeXML(metaModel.SportIds);

//            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetBySingleCustomer",
//                metaModel,
//                SessionService.UserSession.Language
//                ).ConfigureAwait(false);
//        }

        //[HttpPost]
        //[ApiFunctionAuthorization(PermissionKeys.BtcRefNo)]
        //[ValidationApiRequest]
        //[ApiAutoBindMetaModel(BindAgent = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        //public async Task<dynamic> GetByRefno(RefNoBetListMetaModel metaModel)
        //{
        //    metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
        //    metaModel.SpecialPlatform = LicenseeSession.SpecialPlatform;
        //    return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByRefno",
        //        metaModel,
        //        SessionService.UserSession.Language
        //        ).ConfigureAwait(false);
        //}

        //[HttpPost]
        //[ApiFunctionAuthorization(PermissionKeys.BtcRunning)]
        //[ValidationApiRequest(IsValidCurrencyList = true)]
        //[ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        //public async Task<dynamic> GetByRunning(RunningBetListMetaModel metaModel)
        //{
        //    metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
        //    metaModel.SpecialPlatform = LicenseeSession.SpecialPlatform;
        //    metaModel.FullCustomerClass = string.Join(",", await _customerClassService.GetAllCustomerClassId());
        //    metaModel.SportListXML = BettingTicketCenterSportService.BuildSportTypeXML(metaModel.SportIds);

        //    return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByRunning",
        //        metaModel,
        //        SessionService.UserSession.Language
        //        ).ConfigureAwait(false);
        //}

        //[HttpPost]
        //[ApiFunctionAuthorization(PermissionKeys.BtcBookedBet)]
        //[ValidationApiRequest(IsValidCurrencyList = true)]
        //[ApiAutoBindMetaModel(BindAgent = true, BindShowingBetFromIP = true)]
        //public async Task<dynamic> GetByBookedBet(BookedBetBetListMetaModel metaModel)
        //{
        //    metaModel.SpecialPlatform = LicenseeSession.SpecialPlatform;
        //    return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByBookedBet",
        //        metaModel,
        //        SessionService.UserSession.Language
        //        ).ConfigureAwait(false);
        //}
//    }
//}