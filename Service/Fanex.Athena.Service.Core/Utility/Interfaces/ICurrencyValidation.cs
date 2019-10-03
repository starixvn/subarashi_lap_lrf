namespace Fanex.Athena.Service.Core.Utility.Interfaces
{
    public interface ICurrencyValidation
    {
        bool IsValidBaseCurrency(string baseCurrency, bool isAllowEmpty = true);

        bool IsValidCurrency(int currencyId, bool isIncludeKeanOcean = false);

        bool IsValidCurrency(string currencyIdList);
    }
}