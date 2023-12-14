using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Fanex.Athena.Service.Core.Attributes;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.Core.Common
{
    public class DataPermissionService : IDataPermissionService
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly ISessionService _sessionService;

        public DataPermissionService(IAuthorizationService permissionService, ISessionService sessionService)
        {
            _authorizationService = permissionService;
            _sessionService = sessionService;
        }

        public T ClearDataByLimitPermission<T>(T data)
        {
            var properties = GetPropertiesByDataAttribute<T>();

            if (_sessionService.UserSession.IsSuperAdmin)
            {
                return data;
            }

            foreach (var property in properties)
            {
                var (info, attribute) = property;

                if (!string.IsNullOrEmpty(attribute.Permission) && _authorizationService.HasPermissions(_sessionService.UserSession, attribute.Permission))
                {
                    info.SetValue(data, null);
                }
            }

            return data;
        }

        private static IEnumerable<(PropertyInfo, DataPermissionAttribute)> GetPropertiesByDataAttribute<T>()
        {
            var properties = typeof(T).GetProperties().Where(_ => Attribute.IsDefined(_, typeof(DataPermissionAttribute)));
            return properties.Select(_ =>
            {
                var attribute = Attribute.GetCustomAttribute(_, typeof(DataPermissionAttribute)) as DataPermissionAttribute;
                return (_, attribute);
            });
        }
    }
}