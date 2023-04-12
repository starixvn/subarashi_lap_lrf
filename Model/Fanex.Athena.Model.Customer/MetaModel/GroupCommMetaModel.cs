namespace Fanex.Athena.Model.Customer.MetaModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Data;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Resources;

    public class GroupCommMetaModel
    {
        private Dictionary<string, decimal> _commValues;

        private const int MaxGroupNameLength = 100;

        public GroupCommMetaModel()
        {
            GroupColor = "#ffffff";
        }

        [Required]
        public int LicenseeId { get; set; }

        [Required]
        public int GroupCommId { get; set; }

        [Required(ErrorMessageResourceType = typeof(ViewResources), ErrorMessageResourceName = "GroupNameNotEmptyMsg")]
        [StringLength(MaxGroupNameLength, ErrorMessageResourceType = typeof(ViewResources), ErrorMessageResourceName = "GroupNameNotExceed100CharactersMsg")]
        [RegularExpression(@"^[a-zA-Z0-9 ]+$",
         ErrorMessageResourceType = typeof(ViewResources), ErrorMessageResourceName = "GroupNameOnlyContainCharactersAndNumberMsg")]
        public string GroupName { get; set; }

        public string OriginalGroupName { get; set; }

        public int NumberOfCustomer { get; set; }

        [Required]
        public string GroupColor { get; set; }

        public bool IsDefaultGroup { get; set; }

        public int DefaultGroupId { get; set; }

        public bool IsResetDefault { get; set; }

        public IDictionary<string, bool> ProductPermissions { get; set; }

        public Dictionary<string, decimal> CommValues
        {
            get
            {
                if (_commValues == null)
                {
                    MapQuery();
                }

                return _commValues;
            }
            set
            {
                _commValues = value;
            }
        }

        [Required]
        public decimal SBComm { get; set; }

        [Required]
        public decimal ParlayComm { get; set; }

        [Required]
        public decimal NGComm { get; set; }

        [Required]
        public decimal CSComm { get; set; }

        public decimal ABComm { get; set; }

        public decimal VBComm { get; set; }

        public decimal PPComm { get; set; }

        public decimal SXGComm { get; set; }

        public decimal SGComm { get; set; }

        public decimal KNComm { get; set; }

        public decimal LTComm { get; set; }

        public decimal TGComm { get; set; }

        public decimal VSComm { get; set; }

        public decimal VS2Comm { get; set; }

        public decimal VRGComm { get; set; }

        public decimal CCComm { get; set; }

        public decimal SBCComm { get; set; }

        public decimal SAGComm { get; set; }

        public decimal PGSComm { get; set; }

        public decimal WMComm { get; set; }

        public decimal BGGComm { get; set; }

        public decimal JKComm { get; set; }

        public decimal HBComm { get; set; }

        public decimal VGAComm { get; set; }

        public decimal CGComm { get; set; }

        public decimal APComm { get; set; }

        public decimal APMComm { get; set; }

        public decimal VS3Comm { get; set; }

        public decimal FGGLComm { get; set; }

        public decimal MXGComm { get; set; }

        public decimal JIGComm { get; set; }

        public void MapQuery()
        {
            CommValues = new Dictionary<string, decimal>();
            CommValues.Add(Product.SB, SBComm);
            CommValues.Add(CommissionGroupHelper.ParlayName, ParlayComm);
            CommValues.Add(Product.NG, NGComm);
            CommValues.Add(Product.CS, CSComm);
            CommValues.Add(Product.VB, VBComm);
            CommValues.Add(Product.PP, PPComm);

            CommValues.Add(Product.SXG, SXGComm);
            CommValues.Add(Product.SG, SGComm);
            CommValues.Add(Product.KN, KNComm);
            CommValues.Add(Product.LT, LTComm);
            CommValues.Add(Product.TG, TGComm);
            CommValues.Add(Product.VS, VSComm);
            CommValues.Add(Product.VS2, VS2Comm);

            CommValues.Add(Product.VRG, VRGComm);
            CommValues.Add(Product.CC, CCComm);
            CommValues.Add(Product.SBC, SBCComm);
            CommValues.Add(Product.SAG, SAGComm);
            CommValues.Add(Product.PGS, PGSComm);
            CommValues.Add(Product.AB, ABComm);

            CommValues.Add(Product.WM, WMComm);
            CommValues.Add(Product.BGG, BGGComm);
            CommValues.Add(Product.JK, JKComm);
            CommValues.Add(Product.HB, HBComm);

            CommValues.Add(Product.VGA, VGAComm);
            CommValues.Add(Product.CG, CGComm);
            CommValues.Add(Product.AP, APComm);
            CommValues.Add(Product.APM, APMComm);
            CommValues.Add(Product.VS3, VS3Comm);

            CommValues.Add(Product.FGGL, FGGLComm);
            CommValues.Add(Product.MXG, MXGComm);
            CommValues.Add(Product.JIG, JIGComm);
        }

        public void MapData(IDataReader reader, IDictionary<string, string> columns, IDictionary<string, bool> visibility)
        {
            // Support config for new products
            GroupCommId = Convert.ToInt32(reader["GroupCommId"]);
            GroupColor = Convert.ToString(reader["GroupColor"]);
            IsDefaultGroup = Convert.ToBoolean(reader["IsDefault"]);
            CommValues = new Dictionary<string, decimal>();
            foreach (var c in columns)
            {
                var val = visibility[c.Key] ? reader[c.Value + "Comm"] : null;
                CommValues[c.Key] = val == DBNull.Value ? 0 : Convert.ToDecimal(val);
            }
        }
    }
}