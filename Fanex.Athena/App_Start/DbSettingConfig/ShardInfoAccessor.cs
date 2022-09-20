using Fanex.Athena.Service.Core.Users.Interfaces;
using System;

namespace Fanex.Athena
{
    public interface IShardInfoAccessor
    {
        bool TryUseShardDB(string key, out string dbServer);

        string GetShardSPKey(string key);
    }

    public class ShardInfoAccessor : IShardInfoAccessor
    {
        const string PrefixShardingDefault = "shard_";

        readonly string _prefixSharding;

        private readonly ISessionService _sessionService; 

        public ShardInfoAccessor(ISessionService sessionService, string prefixSharding = PrefixShardingDefault)
        {
            _sessionService = sessionService;
            _prefixSharding = prefixSharding;
        }


        public bool TryUseShardDB(string key, out string dbServer)
        {
           if (IsSharding(key) && !ForceIgnoreSharding && !string.IsNullOrEmpty(SiteDBServer))
            {
                dbServer = SiteDBServer;
                return true;
            }
            dbServer = null;
            return false;
        }

        public string GetShardSPKey(string key) => $"SiteDB_{key.Substring(_prefixSharding.Length)}";

        private bool IsSharding(string key) => key.StartsWith(_prefixSharding, StringComparison.OrdinalIgnoreCase);

        private string SiteDBServer => _sessionService.LicenseeSession.SiteDBServer;

        private bool ForceIgnoreSharding => _sessionService.IsIgnoreSharding;
    }
}