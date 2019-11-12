// -----------------------------------------------------------------------
// <copyright file="UserSession.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------
using System;

namespace Fanex.Athena.Model.Auth
{
    using Fanex.Athena.Model.Auth.Enum;
    using System.Collections.Generic;
    [Serializable]
    public class UserAuthInfo
    {
        public string VendorID { get; set; }

        public string VendorIdentityID { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public byte UserLevel { get; set; }
        public byte SubsidiaryViewType { get; set; }
        public int? WhiteLabelID { get; set; }
        public string OperatorId { get; set; }
        public bool IsSuperAdmin { get; set; }
        /// <summary>
        /// Gets or sets Language Code.
        /// Default: en-US.
        /// </summary>
        /// <value>The Language Code.</value>
        public string Language { get; set; }

        /// <summary>
        /// Gets or sets logged-in identity on OnUser database.
        /// Used for re-check in and kick out features.
        /// Return 0 if it is not available.
        /// </summary>
        /// <value>The userId.</value>
        public int OnUserId { get; set; }

        public bool IsInternal { get; set; }

        public List<Function> FunctionList { get; set; }

        public OneAuthPermission[] PortalFunctionList { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public IDictionary<int, int[]> CurrencyAgentList { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings",
            Justification = "Reviewed. Suppression is OK here.")]
        public string DefaultReportUrl { get; set; }

        public AppMode ApplicationMode { get; set; }
        public string DefaultBaseCurrency { get; set; } = string.Empty;
    }
}