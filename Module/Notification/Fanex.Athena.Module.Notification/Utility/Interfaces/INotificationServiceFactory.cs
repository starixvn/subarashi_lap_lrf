namespace Fanex.Athena.Module.Notification.Utility.Interfaces
{
    using Fanex.Athena.Module.Notification.Service.Interfaces;

    public interface INotificationServiceFactory
    {
        INotificationService CreateNotificationService(string sourceName);
    }
}