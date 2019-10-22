using System.Collections.Generic;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class PlayerUpdatingBaseMetaModel : IMetalModelCustomerIdentity, IMetaModelIp, IMetaModelUserId, IMetaModelLanguage
    {
        public IEnumerable<OneAuthCurrency> CurrencyPermission { get; set; }

        public int UserId { get; set; }

        public int CustId { get; set; }

        public string Ip { get; set; }

        public string Language { get; set; }

        public int CurrencyId { get; set; }
    }
}