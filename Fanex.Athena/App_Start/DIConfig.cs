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
using Autofac.Core;
using Autofac.Features.AttributeFilters;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Fanex.Athena.Api.StatelessBase.Logger;
using Fanex.Athena.DataAccess.Report;
using Fanex.Athena.DataAccess.Report.Interfaces;
using Fanex.Athena.Extension;
using Fanex.Athena.Extension.Utility.Internal;
using Fanex.Athena.Service.Core.OAuth;
using Fanex.Athena.Service.Core.Proxy;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Customer;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Extensions;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Logging;
using ONEbook.UM;
using ONEbook.UM.Services;

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

            RegisterBusinessLog(builder);

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
            builder.RegisteModuleModuleAndApi(moduleAssemblies, "Fanex.Athena.Module.LicenseeContact");
            builder.RegisteModuleModuleAndApi(moduleAssemblies, "Fanex.Athena.Module.Notification");
        }

        private static void RegisterHttpClient(ContainerBuilder builder)
        {
            var betListAPIheader = new Dictionary<string, string>
            { { "BETLIST_TOKEN_KEY", ConfigurationManager.AppSettings["BetListApiTokenValue"] } };

            builder.WithHttpClient("BETLISTAPICLIENT", ConfigurationManager.AppSettings["BetListApiHostUrl"], betListAPIheader);

            var lgApiheaedr = new Dictionary<string, string>
            { { "LGAPI_TOKEN_KEY", ConfigurationManager.AppSettings["LGAPITokenValue"] } };
            builder.WithHttpClient("LGAPICLIENT", ConfigurationManager.AppSettings["LGAPIHostUrl"], lgApiheaedr);
            builder.WithHttpClient("OICAPICLIENT", ConfigurationManager.AppSettings["OicApiHostUrl"]);

            builder.WithHttpClient("CTSAPICLIENT", ConfigurationManager.AppSettings["CTSApiHostUrl"]);
        }

        private static void RegisterThirdpartyServices(ContainerBuilder builder)
        {
            builder.RegisterInstance(new MaintenanceService(UMClientManager.RestClient, UMClientManager.CacheService,
                UMClientManager.UMClientConfigs, UMClientManager.HttpContext))
                .As<IMaintenanceService>().SingleInstance();
            builder.RegisterInstance(Logger.Log).As<ILogger>();
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

        private static void RegisterBusinessLog(ContainerBuilder builder)
        {
            builder.RegisterType<BusinessLogService>()
                .WithParameter(
                    new ResolvedParameter(
                        (pi, ctx) => pi.ParameterType == typeof(IBusinessLogBuilderFactory),
                        (pi, ctx) => ctx.ResolveKeyed<IBusinessLogBuilderFactory>("PlayerSegmentLogBuilder")))
                .Keyed<IBusinessLogService>("PlayerSegmentLogService");

            builder.RegisterType<PlayerSegmentationBusinessLogBuilderFactory>()
                .As<IBusinessLogBuilderFactory>()
                .Keyed<IBusinessLogBuilderFactory>("PlayerSegmentLogBuilder");

            // Specify WithAttributeFiltering for the consumer
            builder.RegisterType<PlayerSegmentationService>().As<IPlayerSegmentationService>().WithAttributeFiltering();
        }

        private static void RegisterSingleton(ContainerBuilder builder)
        {
            builder.RegisterType<CustomMemoryCache>().As<ICustomMemoryCache>().SingleInstance()
             .OnRelease(x => x.Dispose());
            builder.RegisterType<SessionService>().As<ISessionService>().SingleInstance();
            builder.RegisterInstance(new FunctionUMService()).As<IFunctionUMService>().SingleInstance();

            builder.Register(x => new BetListApiClient(
                 x.ResolveNamed<HttpClient>("BETLISTAPICLIENT")
                )).As<IBetListApiClient>().SingleInstance();

            builder.Register(x => new LGAPIClient(
                 x.ResolveNamed<HttpClient>("LGAPICLIENT")
                )).As<ILGAPIClient>().SingleInstance();

            builder.Register(x => new OicApiClient(
               x.ResolveNamed<HttpClient>("OICAPICLIENT")
              )).As<IOicApiClient>().SingleInstance();

            builder.Register(x => new CTSApiClient(
               x.ResolveNamed<HttpClient>("CTSAPICLIENT")
              )).As<ICTSApiClient>().SingleInstance();

            builder.RegisterType<PortalApiService>().As<IPortalApiService>().SingleInstance();
            builder.RegisterType<SubsidiaryService>().As<ISubsidiaryService>().SingleInstance();

            builder.Register(x => new ProxyService(
               new ProxyOptions(Convert.ToInt16(ConfigurationManager.AppSettings["Proxy_Timeout"])))
               ).As<IProxyService>().SingleInstance();

            builder.Register(x => new OAuthService(
               new OAuthOptions
               {
                   Host = ConfigurationManager.AppSettings["IdentityServer_Host"],
                   TokenPath = ConfigurationManager.AppSettings["IdentityServer_TokenPath"],
                   UserInfoPath = ConfigurationManager.AppSettings["IdentityServer_UserInfoPath"],
                   RevocationPath = ConfigurationManager.AppSettings["IdentityServer_RevocationPath"],
                   ClientId = ConfigurationManager.AppSettings["IdentityServer_ClientId"],
                   ClientSecret = ConfigurationManager.AppSettings["IdentityServer_ClientSecret"],
                   Scope = ConfigurationManager.AppSettings["IdentityServer_Scope"]
               })
               ).As<IOAuthService>().SingleInstance().OnRelease(x => x.Dispose());
        }
    }
}