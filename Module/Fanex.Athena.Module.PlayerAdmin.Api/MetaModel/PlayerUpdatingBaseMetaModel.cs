using Fanex.Athena.Model.Auth;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class PlayerUpdatingBaseMetaModel
    {
        public OneAuthCurrency[] CurrencyPermission { get; set; }

        public int UserId { get; set; }

        public int CustId { get; set; }

        public string Ip { get; set; }

        public string Language { get; set; }
    }
}