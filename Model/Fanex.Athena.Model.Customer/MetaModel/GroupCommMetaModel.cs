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

        public decimal FWComm { get; set; }

        public decimal SXGComm { get; set; }
        public decimal SGComm { get; set; }
        public decimal KNComm { get; set; }
        public decimal LTComm { get; set; }
        public decimal TGComm { get; set; }
        public decimal VSComm { get; set; }
        public decimal VS2Comm { get; set; }

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
