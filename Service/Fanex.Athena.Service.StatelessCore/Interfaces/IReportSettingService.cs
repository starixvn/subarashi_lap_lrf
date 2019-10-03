using Fanex.Athena.Model.Core.DTO.Configuration;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IReportSettingService
    {
        ReportSetting GetSetting(string reportKey, string licenseeName);
    }
}