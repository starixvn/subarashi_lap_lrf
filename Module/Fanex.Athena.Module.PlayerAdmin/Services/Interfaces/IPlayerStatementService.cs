namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface IPlayerStatementService
    {
        Task<string> GetUrl(PlayerStatementMetaModel metaModel);
    }
}
