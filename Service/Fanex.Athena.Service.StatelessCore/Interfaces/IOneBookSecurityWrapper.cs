namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using Model.Core.DTO.OneAuth;

    public interface IOneBookSecurityWrapper
    {
        OneAuthToken Authenticate(string token);
    }
}