namespace Fanex.Athena.Module.Notification.Helper
{
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Module.Notification.Constants;

    public static class NotificationHelper
    {
        private static readonly IDictionary<string, string> _notificationType = new Dictionary<string, string>
        {
            { MessageType.ResettlementNotification , "Amendment" },
            { MessageType.AbnormalBetNotification , "AbnormalBet" }
        };

        private static readonly IDictionary<string, int> _messageType = new Dictionary<string, int>
        {
            { PermissionKeys.ResultAmendmentNotificationReport , 1 },
            { PermissionKeys.ReportAbnormalBet , 2 }
        };

        private static readonly IDictionary<string, string> _supportedLanguage = new Dictionary<string, string>
        {
            { "en", "En" }, //default
            { "ch", "Ch" },
            { "cs", "Cs" },
            { "zhcn", "Cs" }
        };

        private static readonly IDictionary<string, int> _sourceIdMapper = new Dictionary<string, int>
        {
            {NotificationSource.Internal, 0 },
            {NotificationSource.CRM, 1 },
        };

        public static int GetSourceIdBySourceName(string sourceName)
        {
            if (_sourceIdMapper.ContainsKey(sourceName))
            {
                return _sourceIdMapper[sourceName];
            }

            return default;
        }

        public static string GetNotificationTypeName(string messageType)
        {
            if (_notificationType.ContainsKey(messageType))
            {
                return _notificationType[messageType];
            }

            return string.Empty;
        }

        public static string GetMessageTypesByPermission(IEnumerable<string> functionKeys, bool isAdmin = false)
        {
            if (isAdmin)
            {
                return string.Join(",", _messageType.Values);
            }

            var messageTypes = (functionKeys ?? Enumerable.Empty<string>())
               .Where(x => _messageType.ContainsKey(x))
               .Select(x => _messageType[x]);

            return string.Join(",", messageTypes);
        }

        public static bool IsValidMessageTypeByPermission(string messageType, string[] permission)
        {
            if (string.IsNullOrEmpty(messageType))
            {
                return false;
            }
            return messageType.Split(',').Any(x => permission.Any(pers => _messageType.ContainsKey(pers) && x.Contains(_messageType[pers].ToString())));
        }

        public static string GetSupportedLanguage(string lang)
        {
            var key = lang.ToLowerInvariant();
            if (_supportedLanguage.ContainsKey(key))
            {
                return _supportedLanguage[key];
            }

            return _supportedLanguage.First().Value;
        }
    }
}