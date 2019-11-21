using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;

namespace Fanex.Athena.Extension
{
    public static class AutofacExtension
    {
        public static void WithHttpClient(this ContainerBuilder builder, string clientName,
            string baseAdress, IDictionary<string, string> headerValues = null)
        {
            builder.Register<HttpClient>(x =>
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
                return httpClient;
            }).Named<HttpClient>(clientName)
                .SingleInstance();
        }

        public static void RegisteModuleApiModule(this ContainerBuilder builder,
           IEnumerable<Assembly> assemblies, string moduleName)
        {
            var items = assemblies.Where(ass => ass.FullName.Contains(moduleName)).ToArray();
            builder.RegisterAssemblyTypes(items).AsImplementedInterfaces();
            builder.RegisterApiControllers(items).PropertiesAutowired();
        }

        public static void RegisteModuleModuleAndApi(this ContainerBuilder builder,
          IEnumerable<Assembly> assemblies, string moduleName)
        {
            var items = assemblies.Where(ass => ass.FullName.Contains(moduleName)).ToArray();
            builder.RegisterAssemblyTypes(items).AsImplementedInterfaces();
            builder.RegisterControllers(items).PropertiesAutowired();
            builder.RegisterApiControllers(items).PropertiesAutowired();
        }
    }
}