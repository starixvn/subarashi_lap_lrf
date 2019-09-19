using System;
using System.Collections.Concurrent;
using System.Net;
using System.Net.Http;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class HttpClientFactory : IHttpClientFactory
    {
        private static readonly ConcurrentDictionary<string, HttpClient> HttpClientCache = new ConcurrentDictionary<string, HttpClient>();
        private const int ThreeMinuteInMilliseconds = 180000;

        public HttpClient GetForHost(Uri uri, int timeout = ThreeMinuteInMilliseconds)
        {
            var key = $"{uri.Scheme}://{uri.DnsSafeHost}:{uri.Port}";

            return HttpClientCache.GetOrAdd(key, k =>
            {
                var client = new HttpClient { BaseAddress = uri };

                var sp = ServicePointManager.FindServicePoint(uri);
                sp.ConnectionLeaseTimeout = ThreeMinuteInMilliseconds;

                return client;
            });
        }
    }
}