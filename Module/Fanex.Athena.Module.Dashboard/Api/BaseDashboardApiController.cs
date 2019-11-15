namespace Fanex.Athena.Module.Dashboard.Api
{
    using Fanex.Athena.Api.StatelessBase;
    using Fanex.Athena.Module.Dashboard.MetaModel;

    public class BaseDashboardApiController : ExternalApiBaseController
    {
        protected const string DefaultWidgetResult = "{'Total':0,'Data':[] }";

    }
}