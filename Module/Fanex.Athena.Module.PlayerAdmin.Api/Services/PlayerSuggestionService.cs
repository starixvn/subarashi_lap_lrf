using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerSuggestionService : IPlayerSuggestionService
    {
        private readonly IDbFactory _dbFactory;

        public PlayerSuggestionService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public IEnumerable<string> SearchUserNameList(PlayerSuggestionMetaModel metaModel)
        {
            const string SpKey = "Lrf_CustomerSelUserSearchByOption";

            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                return objectDb.Query<string>(metaModel);
            }
        }
    }
}