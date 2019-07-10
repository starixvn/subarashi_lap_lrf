using Fanex.Athena.Model.Auth;

namespace Fanex.Athena.DataAccess.Core.Users.Interfaces
{
    public interface IOneAuthDataAccess
    {
        OneAuthUserInfo GetUserInfo(int userSEQ, string vendorId);
    }
}