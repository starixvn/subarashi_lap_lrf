using Fanex.Athena.Service.Core.Users.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

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

        protected Lazy<IReadOnlyDictionary<int, string>> SiteDBConfig { get; }

        private readonly ISessionService _sessionService; 

        public ShardInfoAccessor(ISessionService sessionService, string connectionStr, string prefixSharding = PrefixShardingDefault)
        {
            _sessionService = sessionService;

            SiteDBConfig = new Lazy<IReadOnlyDictionary<int, string>>(() =>
            {
                const string SpName = "Acc_SiteDBConfigSel";
                var config = new Dictionary<int, string>();
                using (var connection = new SqlConnection(connectionStr))
                {
                    connection.Open();

                    using (var comm = connection.CreateCommand())
                    {
                        comm.CommandType = CommandType.StoredProcedure;
                        comm.CommandText = SpName;
                        using (var reader = comm.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                config.Add(int.Parse(reader["SiteDBGroupID"].ToString()), reader["AGIP"].ToString());
                            }
                            return config;
                        }
                    }
                }
            });

            _prefixSharding = prefixSharding;
        }


        public bool TryUseShardDB(string key, out string dbServer)
        {
            if (IsSharding(key) && !ForceIgnoreSharding && SiteDBGroupID != 0)
            {
                return SiteDBConfig.Value.TryGetValue(SiteDBGroupID, out dbServer);
            }
            dbServer = null;
            return false;
        }

        public string GetShardSPKey(string key) => $"SiteDB_{key.Substring(_prefixSharding.Length)}";

        private bool IsSharding(string key) => key.StartsWith(_prefixSharding, StringComparison.OrdinalIgnoreCase);

        private int SiteDBGroupID => _sessionService.LicenseeSession.SiteDBGroupID;

        private bool ForceIgnoreSharding => bool.TrueString.Equals(_sessionService.RequestHeaders["X-IgnoreSharding"], StringComparison.OrdinalIgnoreCase);
    }
}