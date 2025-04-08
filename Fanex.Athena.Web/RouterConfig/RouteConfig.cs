namespace Fanex.Athena.Web.RouterConfig
{
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Routing;

    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes, bool includeAttributeMapping = true)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("content/{*pathInfo}");
            routes.IgnoreRoute("images/{*pathInfo}");
            routes.IgnoreRoute("scripts/{*pathInfo}");

            if (includeAttributeMapping)
            {
                routes.MapMvcAttributeRoutes();
            }

            var apiRoute = routes.MapHttpRoute(
                "apiRoute",
                "api/{controller}/{action}");
            apiRoute.RouteHandler = new ReadonlySessionRouteHandler();

            routes.RegisterProxyRoutes();
            routes.RegisterReportProxyRoutes();

            routes.MapRoute(
                "Default",
                "{controller}/{action}",
                new { controller = "Home", action = "Index" });
        }

        private static void RegisterProxyRoutes(this RouteCollection routes)
        {
            routes.MapHttpRoute(
                "apiProxyHealthRoute",
                "Health/{apiKey}",
                new { Controller = "Proxy", Action = "Health" });

            var apiProxyRoute = routes.MapHttpRoute(
                "apiProxyRoute",
                "Proxy/{apiKey}/{apiUrl}",
                new { Controller = "Proxy", Action = "Forward" });
            apiProxyRoute.RouteHandler = new ReadonlySessionRouteHandler();
        }

        private static void RegisterReportProxyRoutes(this RouteCollection routes)
        {
            var subsidiaryPerformanceReportRoute = routes.MapHttpRoute(
                "subsidiaryPerformanceReportRoute",
                "SubsidiaryPerformanceReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            subsidiaryPerformanceReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var turnoverReportRoute = routes.MapHttpRoute(
                "turnoverReportRoute",
                "TurnoverReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            turnoverReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerTurnoverReportRoute = routes.MapHttpRoute(
                "customerTurnoverReportRoute",
                "CustomerTurnoverReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            customerTurnoverReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var settledMatchCountReportRoute = routes.MapHttpRoute(
                "settledMatchCountReportRoute",
                "SettledMatchCountReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            settledMatchCountReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var weeklyLiveMatchReportRoute = routes.MapHttpRoute(
                "weeklyLiveMatchReportRoute",
                "WeeklyLiveMatchReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            weeklyLiveMatchReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerBalanceReportRoute = routes.MapHttpRoute(
                "customerBalanceReportRoute",
                "customerBalanceReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            customerBalanceReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerSupportTaskReportRoute = routes.MapHttpRoute(
                "customerSupportTaskReportRoute",
                "CustomerSupportTaskReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            customerSupportTaskReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerPendingFundsReportRoute = routes.MapHttpRoute(
                "customerPendingFundsReportRoute",
                "CustomerPendingFundsReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            customerPendingFundsReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var extraPayoutReportRoute = routes.MapHttpRoute(
                "extraPayoutReportRoute",
                "ExtraPayoutReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            extraPayoutReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var leagueWinLossReportRoute = routes.MapHttpRoute(
                "leagueWinLossReportRoute",
                "LeagueWinLossReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            leagueWinLossReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var winlossAnalysisReportRoute = routes.MapHttpRoute(
                "winlossAnalysisReportRoute",
                "WinlossAnalysisReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            winlossAnalysisReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var sabaVirtualSportsWinLossReportRoute = routes.MapHttpRoute(
                "sabaVirtualSportsWinLossReportRoute",
                "SabaVirtualSportsWinLossReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            sabaVirtualSportsWinLossReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var winLossByTimeZoneReportRoute = routes.MapHttpRoute(
                "winLossByTimeZoneReportRoute",
                "LicenseeWinLossByTimeZoneReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            winLossByTimeZoneReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var matchWinLossReportRoute = routes.MapHttpRoute(
                "matchWinLossReportRoute",
                "MatchWinLossReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            matchWinLossReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var liveReportRoute = routes.MapHttpRoute(
                "liveReportRoute",
                "LiveReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            liveReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var betListRoute = routes.MapHttpRoute(
                "betListRoute",
                "BetList/Report/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            betListRoute.RouteHandler = new ReadonlySessionRouteHandler();
        }
    }
}