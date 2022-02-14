using System.Net.Http;
using Fanex.Athena.Service.StatelessCore.Abstraction;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class OicApiClient : BaseApiClient, IOicApiClient
    {
        public OicApiClient(HttpClient client) : base(client)
        {
        }

        protected override string ApiName => "OIC API";
    }
}