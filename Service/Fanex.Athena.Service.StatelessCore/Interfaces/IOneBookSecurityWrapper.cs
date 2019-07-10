namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using Fanex.Athena.Model.Auth;

    public interface IOneBookSecurityWrapper
    {
        OneAuthToken Authenticate(string token);
    }
}