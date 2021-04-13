using System;
using System.Collections.Generic;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Criteria;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Repositories
{
    public class PlayerSubsidiaryRepository : IPlayerSubsidiaryRepository
    {
        private readonly IDbFactory dbFactory;

        public PlayerSubsidiaryRepository(IDbFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }

        public IEnumerable<SubsidiaryViewModel> GetSubsidaryGroups(GetSubsidiariesMetaModel param)
        {
            var result = new List<SubsidiaryViewModel>();
            var criteria = new GetSubsidaryGroupsCriteria
            {
                LicenseeName = param.LicenseeName
            };

            using (var objectDb = dbFactory.GetObjectDb(criteria.GetSpName()))
            {
                using (var reader = objectDb.ExecuteReader(criteria.GetSpParams()))
                {
                    while (reader.Read())
                    {
                        result.Add(new SubsidiaryViewModel
                        {
                            OperatorId = reader["OperatorId"].ToString(),
                            WhiteLabelId = reader["WhiteLabelID"] as int?,
                            WhiteLabelName = reader["Name"].ToString()
                        });
                    }
                }
            }

            return result;
        }

        public IEnumerable<SubsidiaryViewModel> GetSubsidiaries(GetSubsidiariesMetaModel param)
        {
            var result = new List<SubsidiaryViewModel>();
            var criteria = new GetSubsidaryCriteria
            {
                LicenseeName = param.LicenseeName
            };

            using (var objectDb = dbFactory.GetObjectDb(criteria.GetSpName()))
            {
                using (var reader = objectDb.ExecuteReader(criteria.GetSpParams()))
                {
                    while (reader.Read())
                    {
                        result.Add(new SubsidiaryViewModel
                        {
                            OperatorId = reader["OperatorID"].ToString(),
                            AgentId = Convert.ToInt32(reader["AgentID"]),
                            CurrencyId = Convert.ToInt32(reader["Currency"])
                        });
                    }
                }
            }

            return result;
        }
    }
}
