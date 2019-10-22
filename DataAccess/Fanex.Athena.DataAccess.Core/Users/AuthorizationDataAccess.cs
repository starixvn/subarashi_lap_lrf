// -----------------------------------------------------------------------
// <copyright file="AuthorizationDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core.Users
{
    using System;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Core.Users.Interfaces;

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