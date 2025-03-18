namespace Fanex.Athena.DataAccess.Core.Users
{
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.Athena.DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;

    public class LicenseeDataAccess : BaseDataAccess, ILicenseeDataAccess
    {
        public bool IsLicenseeBelongToUser(int licenseeId, int userId)
        {
            var licenseeList = GetByUser(userId);
            return licenseeList.Any(l => l.Id == licenseeId);
        }

        public IList<Licensee> GetByUser(int userId)
        {
            const string UspName = "Lrf_LicenseeSel";
            var uspParams = new { UserId = userId };

            var entityList = new List<Licensee>();
            using (var db = this.GetObjectDb(UspName))
            {
                using (var reader = db.ExecuteReader(uspParams))
                {
                    while (reader.Read())
                    {
                        var entity = new Licensee
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("LicenseeID")),
                            Name = reader.GetString(reader.GetOrdinal("LicenseeName")),
                            IsAllowedCustomerComm = reader.GetBoolean(reader.GetOrdinal("IsAllowedMemberComm"))
                        };
                        entityList.Add(entity);
                    }
                }
            }

            return entityList;
        }

        public Licensee GetLicenseeByName(string licenseeName)
        {
            const string UspName = "Lrf_LicenseeSelBySiteName";
            var uspParams = new { siteName = licenseeName };

            using (var db = this.GetObjectDb(UspName))
            {
                return db.QueryEntity<Licensee>(uspParams);
            }
        }
    }
}