using Fanex.Athena.Model.Core.MetaModel.Common;

namespace Fanex.Athena.DataAccess.Core.Common.Interfaces
{
    public interface ILogUserControlDataAccess
    {
        void Write(LogUserControlMetaModel metaModel);
    }
}