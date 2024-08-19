namespace Fanex.Athena.Module.Notification.Utility
{
    using Autofac;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Module.Notification.Utility.Interfaces;

    public class NotificationServiceFactory : INotificationServiceFactory
    {
        private readonly ILifetimeScope _lifetimeScope;

        public NotificationServiceFactory(ILifetimeScope lifetimeScope)
        {
            _lifetimeScope = lifetimeScope;
        }

        public INotificationService CreateNotificationService(string sourceName)
        {
            return _lifetimeScope.ResolveNamed<INotificationService>(sourceName);
        }
    }
}