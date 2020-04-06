using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission
{
    public class MultipleUpdateGroupCriteria : BasePlayerCommissionUpdateCriteria
    {
        public MultipleUpdateGroupCriteria(MultipleUpdateGroupQuery query) : base(query)
        {
            Products = query.Products;
            Comms = query.Comms;
        }

        public string[] Products { get; set; }

        public decimal[] Comms { get; set; }

        public override string GetSPName() => "Lrf_LicenseeCustCommUpd";

        public override void SetParameterValues(IObjectDb db)
        {
            base.SetParameterValues(db);

            var hardcodedColumnNames = CommissionGroupHelper.MapHardcodedNameFromDB(Permissions, isUpdate: false);
            for (var i = 0; i < Products.Length; i++)
            {
                var p = Products[i];
                var code = hardcodedColumnNames[p];
                db.SetParameterValue(code + "Comm", Comms[i]);
                if (p == Product.SB || p == "Parlay")
                {
                    continue;
                }

                db.SetParameterValue("IsUpdate" + code, Permissions[p]);
            }
        }
    }
}
