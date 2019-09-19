using System;
using System.Net.Http;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IHttpClientFactory
    {
        HttpClient GetForHost(Uri uri, int timeout = 180000);
    }
}