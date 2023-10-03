namespace Fanex.Athena.Service.Core.Common.Interfaces
{
    public interface IDataPermissionService
    {
        T ClearDataByLimitPermission<T>(T data);
    }
}