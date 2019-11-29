using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Autofac;
using Autofac.Core;
using Autofac.Features.AttributeFilters;
using Autofac.Integration.WebApi;
using Fanex.Athena.Module.PlayerAdmin.Api.Extensions;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public static class DependencyInjectionExtension
    {
        public static void RegisteModulePlayerAdminApi(this ContainerBuilder builder,
         IEnumerable<Assembly> assemblies)
        {
            const string moduleName = "Fanex.Athena.Module.PlayerAdmin.Api";
            var items = assemblies.Where(ass => ass.FullName.Contains(moduleName)).ToArray();

            builder.RegisterAssemblyTypes(items).AsImplementedInterfaces();

            builder.RegisterType<CommonCustomerSettingLogFactory>()
                .As<IBusinessLogBuilderFactory>()
                .Keyed<IBusinessLogBuilderFactory>("PlayerAdminCommonCustomerSettingLogFactory");

            builder.RegisterType<BusinessLogService>()
                .WithParameter(
                new ResolvedParameter(
                   (pi, ctx) => pi.ParameterType == typeof(IBusinessLogBuilderFactory),
                   (pi, ctx) => ctx.ResolveKeyed<IBusinessLogBuilderFactory>("PlayerAdminCommonCustomerSettingLogFactory")))
                   .Keyed<IBusinessLogService>("PlayerAdminCommonCustomerSettingLogService");

            // Specify WithAttributeFiltering for the consumer
            builder.RegisterType<PlayerBaStatusService>().As<IPlayerBaStatusService>().WithAttributeFiltering();
            builder.RegisterType<PlayerOddsGroupService>().As<IPlayerOddsGroupService>().WithAttributeFiltering();
            builder.RegisterType<PlayerSpecialLevelService>().As<IPlayerSpecialLevelService>().WithAttributeFiltering();

            builder.RegisterApiControllers(items).PropertiesAutowired();

        }
    }
}