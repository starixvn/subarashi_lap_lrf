using Fanex.Caching;
using ONEbook.UM.Helpers;
using System;

namespace Fanex.Athena.VendorAdapter
{
    [CLSCompliant(false)]
    public class CustomUMCacheService : IUMCacheService
    {
        private readonly ICacheService cacheService;

        public CustomUMCacheService(ICacheService cacheService)
        {
            this.cacheService = cacheService ?? new CacheService();
        }

        public T Get<T>(string key) => cacheService.Get<T>(key);

        public void Set<T>(string key, T value, TimeSpan absoluteExpiration)
           => cacheService.Set(key, value, new CacheItemOptions().SetAbsoluteExpiration(absoluteExpiration));
    }
}
