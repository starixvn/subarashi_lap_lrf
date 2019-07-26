using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Service.Core.Utility.Interfaces
{
    public interface IValidationService
    {
        bool IsValid(object model, CurrencyValidationOption currencyValidationOption = null,
            ProductValidationOption productValidationOption = null);
    }
}