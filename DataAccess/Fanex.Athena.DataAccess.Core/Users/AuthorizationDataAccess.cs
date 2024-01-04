namespace Fanex.Athena.DataAccess.Core.Users
{
    using System;
    using System.Collections.Generic;
    using Fanex.Athena.DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;

    public class AuthorizationDataAccess : BaseDataAccess, IAthorizationDataAccess
    {
        public Tuple<int, int> IsCustomerBelonging(int custId, long transid)
        {
            using (var db = this.GetObjectDb("Lrf_CheckBelonging_GetAgentInfo"))
            {
                db.SetParameterValue("transid", transid);
                db.SetParameterValue("custid", custId);
                using (var reader = db.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new Tuple<int, int>(Convert.ToInt32(reader["CurrencyId"]), Convert.ToInt32(reader["CustId"]));
                    }
                }
            }

            return new Tuple<int, int>(0, 0);
        }

        public Dictionary<int, CustDTO> GetCustInfo(string custIds)
        {
            var result = new Dictionary<int, CustDTO>();

            using (var db = GetObjectDb("Lrf_CheckBelongingMultiple_GetAgentInfo"))
            {
                db.SetParameterValue("custids", custIds);
                using (var reader = db.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(Convert.ToInt32(reader["CustId"]), new CustDTO
                        {
                            Id = Convert.ToInt32(reader["agentid"]),
                            CurrencyId = Convert.ToInt32(reader["CurrencyId"])
                        });
                    }
                }
            }

            return result;
        }

        public bool IsProductBelonging(int productId, string licenseeName)
        {
            using (var db = this.GetObjectDb("Lrf_CheckBelonging_ValidateProduct"))
            {
                db.SetParameterValue("productId", productId);
                db.SetParameterValue("licenseeName", licenseeName);

                return Convert.ToBoolean(db.ExecuteScalar());
            }
        }
    }
}