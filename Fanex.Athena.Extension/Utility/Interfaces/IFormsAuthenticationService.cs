namespace Fanex.Athena.Extension.Utility.Interfaces
{
    public interface IFormsAuthenticationService
    {
        void CreateFormAuth(string userName, bool createPersistentCookie);

        void SignOut();
    }
}