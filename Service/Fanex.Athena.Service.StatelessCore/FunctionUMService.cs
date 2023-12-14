using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Model.Core.Enum;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Newtonsoft.Json;

namespace Fanex.Athena.Service.StatelessCore
{
    public class FunctionUMService : IFunctionUMService
    {
        private readonly IEnumerable<FunctionUMSetting> _setting;

        public FunctionUMService()
        {
            _setting = GetSetting();
        }

        public (bool isUM, string timeFrom, string timeTo) GetUnderMaintenanceInfo(FunctionUMType functionUMType)
        {
            var umInfo = _setting.FirstOrDefault(_ => _.Type == functionUMType);
            return umInfo != null ? (umInfo.IsUM, umInfo.TimeFrom, umInfo.TimeTo) : (false, null, null);
        }

        private static IEnumerable<FunctionUMSetting> GetSetting()
        {
            IEnumerable<FunctionUMSetting> result = null;
            var jsonContent = GetSettingFromJsonFile();

            if (!string.IsNullOrEmpty(jsonContent))
            {
                result = JsonConvert.DeserializeObject<IEnumerable<FunctionUMSetting>>(jsonContent);
            }

            return result ?? new List<FunctionUMSetting>();
        }

        private static string GetSettingFromJsonFile()
        {
            const string SettingFilePath = "~/App_Data/FunctionUMSetting.json";
            using (var reader = new StreamReader(HostingEnvironment.MapPath(SettingFilePath)))
            {
                return reader.ReadToEnd();
            }
        }
    }
}