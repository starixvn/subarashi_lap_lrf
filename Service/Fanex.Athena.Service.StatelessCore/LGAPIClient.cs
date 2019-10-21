using System.Net.Http;

using Fanex.Athena.Service.StatelessCore.Abstraction;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class LGAPIClient : BaseApiClient, ILGAPIClient
    {
        public LGAPIClient(HttpClient httpClient) : base(httpClient)
        {
        }
        protected override string ApiName => "LG API";
    }
}
