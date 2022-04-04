using System.Net.Http;

namespace Fanex.Athena.Service.Core.OAuth
{
    public class OAuthOptions
    {
        public string Host { get; set; }
        public string TokenPath { get; set; }
        public string UserInfoPath { get; set; }
        public string RevocationPath { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string Scope { get; set; }

        public HttpClientHandler MessageHandler { get; set; }
    }
}