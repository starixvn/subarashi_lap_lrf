// -----------------------------------------------------------------------
// <copyright file="LicenseeSession.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------
using System;

namespace Fanex.Athena.Model.Auth
{
    [Serializable]
    public class LicenseeAuthInfo
    {
        public int LicenseeId { get; set; }

        public string LicenseeName { get; set; }

        public bool IsAllowedCustomerComm { get; set; }

        public bool IsEnableBA { get; set; }
    }
}