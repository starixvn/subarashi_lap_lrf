// --------------------------------------------------------------------------
// <copyright file="Product.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------
namespace Fanex.Athena.Model.Core.DTO.Common
{
    using System;

    [Serializable]
    public class Product
    {
        #region Field

        public const string SB = "SB";

        public const string NG = "NG";

        public const string BA = "BA";

        public const string VS = "VS";

        public const string CS = "CS";

        public const string KN = "KN";

        public const string AGC = "AGC";

        public const string PTCS = "PTCS";

        public const string VG = "VG";

        public const string BT = "BT";

        public const string VB = "VB";

        public const string AB = "AB";

        public const string CO = "CO";

        public const string VS2 = "VS2";

        public const string LT = "LT";

        public const string PP = "PP";

        public const string LC = "LC";

        public const string CC = "CC";

        public const string SG = "SG";

        public const string VRG = "VRG";

        public const string TG = "TG";

        public const string I4D = "I4D";

        public const string SXG = "SXG";

        public const string SBC = "SBC";

        public const string PGS = "PGS";

        public const string SAG = "SAG";

        public const string JK = "JK";

        public const string BGG = "BGG";

        public const string SLT = "SLT";

        public const string HB = "HB";

        public const string WM = "WM";

        public const string VGA = "VGA";

        public const string CG = "CG";

        public const string BX = "BX";

        public const string AP = "AP";

        public const string BTC = "BTC";

        public const string SPR = "SPR";

        public const string APM = "APM";

        public const string VS3 = "VS3";

        public const string FGGL = "FGGL";

        public const string MXG = "MXG";

        public const string TIP = "TIP";

        public const string JIG = "JIG";

        public const string YB = "YB";

        public const string MGRNG = "MGRNG";

        public const string LG = "LG";

        public const string SEA = "SEA";

        public const string WE = "WE";

        #endregion Field

        #region Constructor

        public Product()
        {
            ProductCode = SB;
            ProductName = nameof(SB);
            AllowCommission = true;
            AllowWinloss = true;
        }

        #endregion Constructor

        #region Property

        public int ProductID { get; set; }

        public string ProductName { get; set; }

        public string ProductCode { get; set; }

        public bool AllowCommission { get; set; }

        public bool AllowWinloss { get; set; }

        public bool IsOfferedSingleWallet { get; set; }

        #endregion Property
    }
}