using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Web.Compilation;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Fanex.Athena.Api.StatelessBase.Logger;
using Fanex.Athena.DataAccess.Report;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Extension;
using Fanex.Athena.Extension.Utility.Internal;
using Fanex.Athena.Module.PlayerAdmin;
using Fanex.Athena.Module.PlayerAdmin.Api;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Extensions;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Logging;
using ONEbook.UM.Services;
using ONEbook.UM.Services.Impl;

namespace Fanex.Athena
{
    public static class DIConfig
    {
        public static void Register()
        {
            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;
            var assemblies = GetAssemblies();
            var serviceAssemblies = GetServiceAssemblies(assemblies);
            var controllerAssemblies = GetControllerAssemblies(assemblies);
            var apiControllerAssemblies = GetApiControllerAssemblies(assemblies);

            builder.RegisterAssemblyTypes(serviceAssemblies).AsImplementedInterfaces();
            builder.RegisterOnebookSecurity();

            builder.RegisterFilterProvider();
            builder.RegisterWebApiFilterProvider(config);
            // generic types
            builder.RegisterGeneric(typeof(ThirdPartyWinLossDataAccess<>))
                .As(typeof(IThirdPartyWinLossDataAccess<>));

            RegisterThirdpartyServices(builder);

            RegisterSingleton(builder);

            RegisterHttpClient(builder);

            RegisterModule(builder, assemblies);

            builder.RegisterControllers(controllerAssemblies).PropertiesAutowired();
            builder.RegisterApiControllers(apiControllerAssemblies).PropertiesAutowired();


            builder.RegisterType<ApiExceptionLogger>().As<IExceptionLogger>();

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static void RegisterModule(ContainerBuilder builder, Assembly[] assemblies)
        {
            var moduleAssemblies = GetModuleAssemblies(assemblies);

            builder.RegisteModuleApiModule(moduleAssemblies, "Fanex.Athena.Module.Dashboard");
            builder.RegisteModuleModuleAndApi(moduleAssemblies, "Fanex.Athena.Module.Notification");

            builder.RegisteModulePlayerAdminApi(moduleAssemblies);
            builder.RegisteModulePlayerAdmin(moduleAssemblies);
        }

        private static void RegisterHttpClient(ContainerBuilder builder)
        {
            var reportAPIheader = new Dictionary<string, string>
            { { "AUTH_TOKEN", ConfigurationManager.AppSettings["ReportAPITokenValue"] } };

            builder.WithHttpClient("ReportAPIClient", ConfigurationManager.AppSettings["ReportAPIHostUrl"], reportAPIheader);

            var betListAPIheader = new Dictionary<string, string>
            { { "BETLIST_TOKEN_KEY", ConfigurationManager.AppSettings["BetListApiTokenValue"] } };

            builder.WithHttpClient("BETLISTAPICLIENT", ConfigurationManager.AppSettings["BetListApiHostUrl"], betListAPIheader);

            var lgApiheaedr = new Dictionary<string, string>
            { { "LGAPI_TOKEN_KEY", ConfigurationManager.AppSettings["LGAPITokenValue"] } };
            builder.WithHttpClient("LGAPICLIENT", ConfigurationManager.AppSettings["LGAPIHostUrl"], lgApiheaedr);

            builder.WithHttpClient("EXTServiceTokenClient", ConfigurationManager.AppSettings["ExtAPITokenHostUrl"]);
        }

        private static void RegisterThirdpartyServices(ContainerBuilder builder)
        {
            builder.RegisterType<MaintenanceService>().As<IMaintenanceService>().SingleInstance();

            builder.RegisterInstance(Logger.Log).As<Logging.ILogger>();
            builder.RegisterType<RestSharp.RestClient>().As<RestSharp.IRestClient>().InstancePerDependency();
        }

        private static Assembly[] GetAssemblies()
        {
            Assembly[] assemblies = null;
            try
            {
                assemblies = BuildManager.GetReferencedAssemblies().Cast<Assembly>().ToArray();
            }
            catch (Exception)
            {
                assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(i => !i.IsDynamic).ToArray();
            }

            return assemblies.Where(x => x.FullName.StartsWith("Fanex.Athena", StringComparison.InvariantCulture))
                .ToArray();
        }

        private static Assembly[] GetServiceAssemblies(Assembly[] assemblies)
        {
            var controllerFileNames = new[]
            {
                "Fanex.Athena.Controllers",
                "Fanex.Athena.Api",
                "Fanex.Athena.Module",
                "LAP.ONEBook.Security"
            };
            return assemblies.Where(ass => !controllerFileNames.Any(x => ass.FullName.Contains(x))).ToArray();
        }

        private static Assembly[] GetControllerAssemblies(Assembly[] assemblies)
        {
            return assemblies.Where(ass => ass.FullName.Contains("Fanex.Athena.Controllers")).ToArray();
        }

        private static Assembly[] GetApiControllerAssemblies(Assembly[] assemblies)
        {
            return assemblies.Where(ass => ass.FullName.Contains("Fanex.Athena.Api")).ToArray();
        }

        private static IEnumerable<Assembly> GetModuleAssemblies(Assembly[] assemblies)
        {
            return assemblies.Where(ass => ass.FullName.Contains("Fanex.Athena.Module"));
        }

        private static void RegisterSingleton(ContainerBuilder builder)
        {
            builder.RegisterType<CustomMemoryCache>().As<ICustomMemoryCache>().SingleInstance()
             .OnRelease(x => x.Dispose());
            builder.RegisterType<SessionStorage>().As<ISessionStorage>().SingleInstance();
            builder.RegisterType<SessionService>().As<ISessionService>().SingleInstance();
            builder.Register<ReportAPIClient>(x => new ReportAPIClient(
                 x.ResolveNamed<HttpClient>("ReportAPIClient")
                )).As<IReportAPIClient>().SingleInstance();

            builder.Register<BetListApiClient>(x => new BetListApiClient(
                 x.ResolveNamed<HttpClient>("BETLISTAPICLIENT")
                )).As<IBetListApiClient>().SingleInstance();

            builder.Register<LGAPIClient>(x => new LGAPIClient(
                 x.ResolveNamed<HttpClient>("LGAPICLIENT")
                )).As<ILGAPIClient>().SingleInstance();
        }
    }
}