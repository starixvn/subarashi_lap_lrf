namespace Fanex.Athena.Model.BetSettings.ViewModel
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Resources;

    public class BetSettingBaseViewModel
    {
        public BetSettingMetaModel Param { get; set; }

        public bool? IsEnabled { get; set; }

        public bool Editable { get; set; }

        public IEnumerable<BetSettingProduct> BetSettingProducts { get; set; }

        public string Title
        {
            get
            {
                var result = $"{Param.BetSettingName} {ViewResources.BetSettings}";
                if (string.IsNullOrWhiteSpace(Param.CustIds) && !Param.IsFakeLicensee)
                {
                    result += " - " + Param.NickName + " (" + Param.UserName + ")";
                }

                return result;
            }
        }
    }
}
