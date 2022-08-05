using Fanex.Athena.Service.Core.Users;
using Fanex.Data;
using System;
using System.Configuration;

namespace Fanex.Athena
{
    public static class DbSettingProviderManagerExtension
    {
        const string SpNameConfigSource = "~/SpNameConfig/FanexSpName.xml";

        [CLSCompliant(false)]
        public static DbSettingProviderManager UseShardDbSettingProvider(this DbSettingProviderManager dbSettingProviderManager)
            => dbSettingProviderManager.Use(new ShardDbSettingProvider(new ShardInfoAccessor(
                    new SessionService(),
                    Cryptography.DecryptConnectionString(ConfigurationManager.ConnectionStrings["DBEXT.bodb02.bodbLicenseeNet"].ConnectionString)),
                    resourcePath: SpNameConfigSource));

    }
}