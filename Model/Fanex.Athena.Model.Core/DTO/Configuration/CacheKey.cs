// -----------------------------------------------------------------------
// <copyright file="CacheKey.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

using System.Net.NetworkInformation;

namespace Fanex.Athena.Model.Core.DTO.Configuration
{
    /// <summary>
    /// Cache key constant.
    /// </summary>
    public static class CacheKey
    {
        public static readonly string MemorycacheCommonMoveBet = "MemoryCache_Common_MoveBet";

        public static readonly string MemorycacheCommonBalanceup = "MemoryCache_Common_BalanceUp";

        public static readonly string MemorycacheCommonLicenseeCust = "MemoryCache_Common_LicenseeCust";

        public static readonly string MemorycacheCommonProduct = "MemoryCache_Common_Product";

        public static readonly string MemorycacheSubsidiaryListByLicensee = "MemoryCache_SubsidiaryList_{0}";

        public static readonly string MemorycacheGroupSubsidiaryListByLicensee = "MemoryCache_GroupSubsidiaryList_{0}";

        public static readonly string MemorycacheSubProductsByLicensee = "MemoryCache_SubProductsList";

        public static readonly string MemorycacheSportListByLicensee = "MemoryCache_SportList";

        public static readonly string MemorycacheSportListForTreeView = "MemoryCache_SportList_TreeView";

        public static readonly string MemorycacheCustomerClassCategories = "MemoryCache_CustomerClassCategories";

        public static readonly string MemorycacheBetTypeForTreeView = "MemoryCache_Bettype_TreeView";
    }
}