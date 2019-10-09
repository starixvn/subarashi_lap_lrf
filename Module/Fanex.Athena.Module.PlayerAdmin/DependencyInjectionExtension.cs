namespace Fanex.Athena.Module.PlayerAdmin
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Reflection;
    using Autofac;
    using Autofac.Core;
    using Autofac.Integration.Mvc;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Module.PlayerAdmin.Extensions;
    using Fanex.Athena.Module.PlayerAdmin.Services;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public static class DependencyInjectionExtension
    {
        public static void RegisteModulePlayerAdmin(this ContainerBuilder builder, IEnumerable<Assembly> assemblies)
        {
            const string moduleName = "Fanex.Athena.Module.PlayerAdmin";

            var items = assemblies.Where(ass => ass.FullName.Contains(moduleName) && !ass.FullName.Contains("Fanex.Athena.Module.PlayerAdmin.Api")).ToArray();

            builder.Register<PlayerStatementService>(x => new PlayerStatementService(x.Resolve<IAppSettings>(), x.ResolveNamed<HttpClient>("EXTServiceTokenClient")))
                .As<IPlayerStatementService>()
                .InstancePerDependency();

            builder.RegisterType<PlayerAdminBusinessLogBuilderFactory>()
                .As<IBusinessLogBuilderFactory>()
                .Keyed<IBusinessLogBuilderFactory>("PlayerAdminLogBuilder");

            builder.RegisterType<BusinessLogService>()
                .WithParameter(
                new ResolvedParameter(
                   (pi, ctx) => pi.ParameterType == typeof(IBusinessLogBuilderFactory),
                   (pi, ctx) => ctx.ResolveKeyed<IBusinessLogBuilderFactory>("PlayerAdminLogBuilder")))
                   .Keyed<IBusinessLogService>("PlayerAdminLogService");

            builder.RegisterAssemblyTypes(items).AsImplementedInterfaces();

            builder.RegisterControllers(items);
        }
    }
}
