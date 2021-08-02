namespace Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface IRngCasinoBetLimitRepository
    {
        Task<IResultInfo> UpdateStatusAsync(PlayerBetLimitProductStatusUpdateMetaModel metaModel, int sportId);
    }
}