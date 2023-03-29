namespace Fanex.Athena.Service.Core.Utility.Interfaces
{
    public interface ICurrencyValidation
    {
        bool IsValidBaseCurrency(string baseCurrency, bool isAllowEmpty = true);

        bool IsValidCurrency(int currencyId);

        bool IsValidCurrency(string currencyIdList);
    }
}