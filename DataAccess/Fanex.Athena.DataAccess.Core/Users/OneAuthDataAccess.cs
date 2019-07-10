// -----------------------------------------------------------------------
// <copyright file="UserDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core.Users
{
    using System;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.Model.Auth;
    using Interfaces;

    public class OneAuthDataAccess : BaseDataAccess, IOneAuthDataAccess
    {
        public OneAuthUserInfo GetUserInfo(int userSEQ, string vendorId)
        {
            const string UspName = "Lrf_GetUserLevelInfo";
            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("VendorID", vendorId);
                db.SetParameterValue("UserSEQ", userSEQ);
                db.SetParameterValue("UserLevel", null);
                db.SetParameterValue("SubsidiaryEnabled", null);
                db.SetParameterValue("OperatorID", null);
                db.SetParameterValue("BaseCurrency", null);
                var result = new OneAuthUserInfo();
                db.ExecuteNonQuery();

                result.UserLevel = Convert.ToByte(db.GetParameterValue("UserLevel"));
                result.IsEnabledSubsidiary = Convert.ToBoolean(db.GetParameterValue("SubsidiaryEnabled"));
                result.OperatorID = Convert.ToString(db.GetParameterValue("OperatorID"));
                result.BaseCurrency = db.GetParameterValue("BaseCurrency") != null ?
                    Convert.ToString(db.GetParameterValue("BaseCurrency")) : string.Empty;
                return result;
            }
        }
    }
}