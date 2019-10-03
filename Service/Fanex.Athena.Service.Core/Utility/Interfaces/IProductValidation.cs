using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Service.Core.Utility.Interfaces
{
    public interface IProductValidation
    {
        bool IsValid(IMetaModelProductCodeList model, ProductValidationOption option);
    }
}