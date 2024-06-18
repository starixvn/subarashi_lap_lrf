namespace Fanex.Athena.Model.Customer.MetaModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Data;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Resources;

    public class GroupCommDetailMetaModel
    {
        public int Sporttype { get; set; }

        public int Bettype { get; set; }

        public decimal Discount { get; set; }

        public string DisplayName { get; set; }
    }
}