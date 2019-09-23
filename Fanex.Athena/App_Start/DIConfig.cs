using System;
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
using CitiXchangeLibrary;
using Fanex.Athena.Api.StatelessBase.Logger;
using Fanex.Athena.DataAccess.Report;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Extension;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Extension.Utility.Internal;
using Fanex.Athena.Module.PlayerAdmin.Services;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Service.StatelessCore;
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
            var moduleAssemblies = GetModuleAssemblies(assemblies);
            builder.RegisterAssemblyTypes(serviceAssemblies).AsImplementedInterfaces();
            builder.RegisterControllers(controllerAssemblies);
            builder.RegisterApiControllers(apiControllerAssemblies);

            builder.RegisterAssemblyTypes(moduleAssemblies).AsImplementedInterfaces();
            builder.RegisterControllers(moduleAssemblies);
            builder.RegisterApiControllers(moduleAssemblies);

            builder.RegisterFilterProvider();
            builder.RegisterWebApiFilterProvider(config);

            RegisterThirdpartyServices(builder);
            RegisterSingleton(builder);

            // generic types
            builder.RegisterGeneric(typeof(ThirdPartyWinLossDataAccess<>))
                .As(typeof(IThirdPartyWinLossDataAccess<>));

            // static services
            builder.RegisterType<CustomMemoryCache>().As<ICustomMemoryCache>().SingleInstance()
                .OnRelease(x => x.Dispose());

            builder.RegisterType<ApiExceptionLogger>().As<IExceptionLogger>();

            builder.WithHttpClient("ReportAPIClient", ConfigurationManager.AppSettings["ReportAPIHostUrl"]);
            builder.WithHttpClient("EXTServiceTokenClient", ConfigurationManager.AppSettings["ExtAPITokenHostUrl"]);

            builder.Register<PlayerStatementService>(x => new PlayerStatementService(
                  x.Resolve<IAppSettings>(),
                  x.ResolveNamed<HttpClient>("EXTServiceTokenClient")
                )).As<IPlayerStatementService>()
                .InstancePerRequest();
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static void RegisterThirdpartyServices(ContainerBuilder builder)
        {
            builder.RegisterType<MaintenanceService>().As<IMaintenanceService>();

            builder.RegisterInstance(Logger.Log).As<Logging.ILogger>();

            builder.Register(x => (ICitiXchangeClient)Activator.GetObject(typeof(ICitiXchangeClient), ConfigurationManager.AppSettings["ExchangeProductApiHost"]))
                .As<ICitiXchangeClient>()
                .ExternallyOwned();
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
                "Fanex.Athena.Module"
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

        private static Assembly[] GetModuleAssemblies(Assembly[] assemblies)
        {
            return assemblies.Where(ass => ass.FullName.Contains("Fanex.Athena.Module")).ToArray();
        }

        private static void RegisterSingleton(ContainerBuilder builder)
        {
            builder.Register<ReportAPIClient>(x => new ReportAPIClient(
                 x.Resolve<IAppSettings>(),
                 x.ResolveNamed<HttpClient>("ReportAPIClient")
                )).As<IReportAPIClient>().SingleInstance();
        }
    }
}