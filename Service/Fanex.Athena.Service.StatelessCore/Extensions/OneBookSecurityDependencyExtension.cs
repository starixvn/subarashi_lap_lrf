using System;
using System.Collections.Generic;
using System.Configuration;
using Autofac;
using Fanex.Athena.DataAccess.Core.Utilities;
using LAP.ONEBook.Security;
using LAP.ONEBook.Security.StorageProvider.SqlServer;

namespace Fanex.Athena.Service.StatelessCore.Extensions
{
    public static class OneBookSecurityDependencyExtension
    {
        public static void RegisterOnebookSecurity(this ContainerBuilder builder)
        {
            builder.Register<SqlServerProvider>(x =>
            {
                var encryptedConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString_ClearinghouseDB"].ConnectionString;
                var descryptor = new ConnectionStringDecryptor();
                var connectionString = descryptor.Decrypt(encryptedConnectionString);
                return new SqlServerProvider(connectionString);
            }).As<IStorageProvider>().SingleInstance();
            builder.RegisterType<OneBookSecurityWrapper>().AsImplementedInterfaces().SingleInstance();
        }
    }
}
