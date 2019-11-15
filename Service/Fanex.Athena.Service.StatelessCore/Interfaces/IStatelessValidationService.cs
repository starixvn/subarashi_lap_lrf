using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IStatelessValidationService
    {
        bool IsValid(IMetaModelValidation model);
    }
}