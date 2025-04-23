using System;
using Fanex.Athena.Service.Core.Users;
using Fanex.Data;

namespace Fanex.Athena
{
    public static class DbSettingProviderManagerExtension
    {
        [CLSCompliant(false)]
        public static DbSettingProviderManager UseShardDbSettingProvider(this DbSettingProviderManager dbSettingProviderManager)
            => dbSettingProviderManager.Register(ShardDbSettingProvider.ProviderName, new ShardDbSettingProvider(new ShardInfoAccessor(new SessionService())).CreateObjectDbFunc);
    }
}