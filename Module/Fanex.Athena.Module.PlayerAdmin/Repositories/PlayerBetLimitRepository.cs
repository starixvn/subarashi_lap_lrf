namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Common.Extensions;

    public class PlayerBetLimitRepository : IPlayerBetLimitRepository
    {
        private readonly IDbFactory _dbFactory;

        public PlayerBetLimitRepository(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public async Task<IEnumerable<PlayerBetLimitProduct>> GetEnableBetLimitProducts(string siteName)
        {
            const string UspName = "Lrf_LicenseeProductByBetLimitSel";
            var products = new List<PlayerBetLimitProduct>();

            using (var db = _dbFactory.GetObjectDb(UspName))
            {
                db.SetParameterValue("LicenseeName", siteName);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        if (reader.ToBool("IsEnable"))
                        {
                            products.Add(new PlayerBetLimitProduct
                            {
                                ProductId = reader.ToInt("ProductID"),
                                ProductCode = reader.ToString("ProductCode")
                            });
                        }
                    }
                }
            }

            return products;
        }
    }
}