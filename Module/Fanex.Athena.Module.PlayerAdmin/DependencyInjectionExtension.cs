using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Integration.Mvc;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Module.PlayerAdmin.Services;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin
{
    public static class DependencyInjectionExtension
    {
        public static void RegisteModulePlayerAdmin(this ContainerBuilder builder,
         IEnumerable<Assembly> assemblies)
        {
            const string moduleName = "Fanex.Athena.Module.PlayerAdmin";
            var items = assemblies.Where(ass => ass.FullName.Contains(moduleName)
            && !ass.FullName.Contains("Fanex.Athena.Module.PlayerAdmin.Api")).ToArray();
            builder.Register<PlayerStatementService>(x => new PlayerStatementService(
              x.Resolve<IAppSettings>(),
              x.ResolveNamed<HttpClient>("EXTServiceTokenClient")
            )).As<IPlayerStatementService>()
            .InstancePerDependency();
            builder.RegisterAssemblyTypes(items).AsImplementedInterfaces();
            builder.RegisterControllers(items);
        }
    }
}
