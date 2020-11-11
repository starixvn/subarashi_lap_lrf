namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class GetCustomerClassInformationMetaModel
    {
        public string SiteName { get; set; }

        public string GetSettingKey() => "Lrf_CustomerClassPolicySel";
    }
}
