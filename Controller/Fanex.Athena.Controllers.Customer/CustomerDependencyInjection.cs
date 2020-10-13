using System.Collections.Generic;
using System.Reflection;
using Autofac;
using Autofac.Core;
using Fanex.Athena.Service.Customer;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Controllers.Customer
{
    public static class CustomerDependencyInjection
    {
        public static void RegisteModuleCustomer(this ContainerBuilder builder, IEnumerable<Assembly> assemblies)
        {
            builder.RegisterType<CustomerBusinessLogBuilderFactory>()
               .As<IBusinessLogBuilderFactory>()
               .Keyed<IBusinessLogBuilderFactory>("CustomerLogBuilder");

            builder.RegisterType<BusinessLogService>()
                .WithParameter(
                new ResolvedParameter(
                   (pi, ctx) => pi.ParameterType == typeof(IBusinessLogBuilderFactory),
                   (pi, ctx) => ctx.ResolveKeyed<IBusinessLogBuilderFactory>("CustomerLogBuilder")))
                   .Keyed<IBusinessLogService>("CustomerLogService");
        }
    }
}
