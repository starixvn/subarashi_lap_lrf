using System;
using System.Collections.Generic;
using System.Net.Http;

using Autofac;

namespace Fanex.Athena.Extension
{
    public static class AutofacExtension
    {
        public static void WithHttpClient(this ContainerBuilder builder, string clientName,
            string baseAdress, IDictionary<string, string> headerValues = null)
        {
            var endPoint = new Uri(baseAdress);
            var httpClient = new HttpClient
            {
                BaseAddress = endPoint
            };

            if (headerValues != null)
            {
                foreach (var item in headerValues)
                {
                    httpClient.DefaultRequestHeaders.Add(item.Key, item.Value);
                }
            }
            builder.Register<HttpClient>(x => httpClient).Named<HttpClient>(clientName)
                .SingleInstance();
        }
    }
}
