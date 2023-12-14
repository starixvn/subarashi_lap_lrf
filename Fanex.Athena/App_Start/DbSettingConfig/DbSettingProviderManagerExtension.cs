using System;
using Fanex.Athena.Service.Core.Users;
using Fanex.Data;

namespace Fanex.Athena
{
    public static class DbSettingProviderManagerExtension
    {
        private const string SpNameConfigSource = "~/SpNameConfig/FanexSpName.xml";

        [CLSCompliant(false)]
        public static DbSettingProviderManager UseShardDbSettingProvider(this DbSettingProviderManager dbSettingProviderManager)
            => dbSettingProviderManager.Use(new ShardDbSettingProvider(new ShardInfoAccessor(new SessionService()),
                    resourcePath: SpNameConfigSource));
    }
}