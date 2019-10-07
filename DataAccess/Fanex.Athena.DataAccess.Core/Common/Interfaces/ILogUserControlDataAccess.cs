namespace Fanex.Athena.DataAccess.Core.Common.Interfaces
{
    public interface ILogUserControlDataAccess
    {
        void Write(int custId, int userId, int actionId, string content);
    }
}