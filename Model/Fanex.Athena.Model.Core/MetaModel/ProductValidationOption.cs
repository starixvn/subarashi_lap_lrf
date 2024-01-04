namespace Fanex.Athena.Model.Core.MetaModel
{
    public class ProductValidationOption
    {
        public bool IsValidProductCodeList { get; set; }

        /// <summary>
        /// Required by IsValidProductCodeList
        /// </summary>
        public string FunctionConfig { get; set; }

        public bool IsSingleWallet { get; set; }
    }
}