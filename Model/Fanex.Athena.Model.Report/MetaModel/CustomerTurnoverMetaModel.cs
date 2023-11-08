// -----------------------------------------------------------------------
// <copyright file="CustomerTurnoverMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.MetaModel;

    public class CustomerTurnoverMetaModel : BaseReportMetaModel, IMetaModelValidation
    {
        public CustomerTurnoverMetaModel()
        {
            FromDate = DateTime.Today;
            ToDate = DateTime.Today;
            ReportBy = ReportByType.Daily;
            ShowWin = true;
            ShowLoss = true;
            ShowDraw = true;
            Odds = 0;
            SportProducts = new List<SportProductItem>();
        }

        public IList<SportProductItem> SportProducts { get; set; }

        public string Bettypes { get; set; }

        public string Username { get; set; }

        public decimal Odds { get; set; }

        public int ReportBy { get; set; }

        public bool ShowWin { get; set; }

        public bool ShowLoss { get; set; }

        public bool ShowDraw { get; set; }

        public override bool IsValid
        {
            get
            {
                /*Only suport filter by all customer for sungame licensee (licenseeId=8).*/
                var isShow = ShowWin || ShowLoss || ShowDraw;
                return isShow && FromDate <= ToDate &&
                    SportProducts.Any(i => i.Checked) && !string.IsNullOrEmpty(Bettypes);
            }
        }

        public string ProductParameters
        {
            get
            {
                var realCheckedProducts = new List<SportProductItem>();
                /*get products*/
                var checkedProducts = this.SportProducts.Where(i => i.Checked && i.ParentId == -1);
                foreach (var item in checkedProducts)
                {
                    /*get all sports*/
                    var allSport = this.SportProducts.Where(i => i.ParentId == item.ID).ToList();
                    if (allSport.Count > 0)
                    {
                        /* if this product has sports*/
                        /*get all checked sports*/
                        var allCheckedSport = allSport.Where(i => i.Checked).ToList();
                        if (allCheckedSport.Count > 0)
                        {
                            realCheckedProducts.AddRange(allCheckedSport);
                        }
                    }
                    else
                    {   /*this products no have any sport*/
                        realCheckedProducts.Add(item);
                    }
                }

                return string.Join(",", realCheckedProducts.Select(i => i.ID).ToArray());
            }
        }
    }
}