using System;
using System.Net.Http;

using Autofac;

namespace Fanex.Athena.Extension
{
    public static class AutofacExtension
    {
        public static void WithHttpClient(this ContainerBuilder builder, string clientName, string baseAdress)
        {
            var endPoint = new Uri(baseAdress);
            var httpClient = new HttpClient()
            {
                BaseAddress = endPoint
            };

            builder.Register<HttpClient>(x => httpClient).Named<HttpClient>(clientName)
                .SingleInstance();
        }
    }
}
