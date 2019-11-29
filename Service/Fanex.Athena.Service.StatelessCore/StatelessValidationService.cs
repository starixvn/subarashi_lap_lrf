using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.StatelessCore
{
    public class StatelessValidationService : IStatelessValidationService
    {
        public bool IsValid(IMetaModelValidation model)
        {
            return model != null && model.IsValid;
        }
    }
}