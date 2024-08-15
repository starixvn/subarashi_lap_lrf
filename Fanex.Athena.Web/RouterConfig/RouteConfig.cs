namespace Fanex.Athena.Web.RouterConfig
{
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Fanex.Athena.Model.Core.DataDomain;

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
                    name: "apiRoute",
                    routeTemplate: "api/{controller}/{action}");
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
                name: "apiProxyHealthRoute",
                routeTemplate: "Health/{apiKey}",
                new { Controller = "Proxy", Action = "Health" });

            var apiProxyRoute = routes.MapHttpRoute(
                   name: "apiProxyRoute",
                   routeTemplate: "Proxy/{apiKey}/{apiUrl}",
                   new { Controller = "Proxy", Action = "Forward" });
            apiProxyRoute.RouteHandler = new ReadonlySessionRouteHandler();
        }

        private static void RegisterReportProxyRoutes(this RouteCollection routes)
        {
            var agCasinoWinLossReportRoute = routes.MapHttpRoute(
                "agCasinoWinLossReportRoute",
                "AgCasinoWinLossReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.AgCasinoWinLoss, });
            agCasinoWinLossReportRoute.RouteHandler = new ReadonlySessionRouteHandler();
            
            var agCasinoBalanceReportRoute = routes.MapHttpRoute(
                "agCasinoBalanceReportRoute",
                "AgCasinoBalanceReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.AgCasinoBalance, });
            agCasinoBalanceReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var subsidiaryPerformanceReportRoute = routes.MapHttpRoute(
                "subsidiaryPerformanceReportRoute",
                "SubsidiaryPerformanceReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.SubsidiaryPerformance, });
            subsidiaryPerformanceReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var turnoverReportRoute = routes.MapHttpRoute(
                "turnoverReportRoute",
                "TurnoverReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.Turnover, });
            turnoverReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerTurnoverReportRoute = routes.MapHttpRoute(
                "customerTurnoverReportRoute",
                "CustomerTurnoverReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.CustomerTurnover, });
            customerTurnoverReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var settledMatchCountReportRoute = routes.MapHttpRoute(
                "settledMatchCountReportRoute",
                "SettledMatchCountReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.SettledMatchCount, });
            settledMatchCountReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var weeklyLiveMatchReportRoute = routes.MapHttpRoute(
                "weeklyLiveMatchReportRoute",
                "WeeklyLiveMatchReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.WeeklyLiveMatches, });
            weeklyLiveMatchReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerBalanceReportRoute = routes.MapHttpRoute(
                "customerBalanceReportRoute",
                "customerBalanceReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.CustomerBalance, });
            customerBalanceReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerSupportTaskReportRoute = routes.MapHttpRoute(
                "customerSupportTaskReportRoute",
                "CustomerSupportTaskReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.CustomerSupportTask, });
            customerSupportTaskReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerPendingFundsReportRoute = routes.MapHttpRoute(
                "customerPendingFundsReportRoute",
                "CustomerPendingFundsReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.CustomerPendingFunds, });
            customerPendingFundsReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var extraPayoutReportRoute = routes.MapHttpRoute(
                "extraPayoutReportRoute",
                "ExtraPayoutReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.ExtraPayout, });
            extraPayoutReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var leagueWinLossReportRoute = routes.MapHttpRoute(
                "leagueWinLossReportRoute",
                "LeagueWinLossReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.LeagueWinLoss, });
            leagueWinLossReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var winlossAnalysisReportRoute = routes.MapHttpRoute(
                "winlossAnalysisReportRoute",
                "WinlossAnalysisReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.WinlossAnalysis, });
            winlossAnalysisReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var sabaVirtualSportsWinLossReportRoute = routes.MapHttpRoute(
                "sabaVirtualSportsWinLossReportRoute",
                "SabaVirtualSportsWinLossReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.SabaVirtualSportsWinLoss, });
            sabaVirtualSportsWinLossReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var winLossByTimeZoneReportRoute = routes.MapHttpRoute(
                "winLossByTimeZoneReportRoute",
                "LicenseeWinLossByTimeZoneReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.WinLossByTimeZone, });
            winLossByTimeZoneReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var matchWinLossReportRoute = routes.MapHttpRoute(
                "matchWinLossReportRoute",
                "MatchWinLossReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.MatchWinLoss, });
            matchWinLossReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var liveReportRoute = routes.MapHttpRoute(
                "liveReportRoute",
                "LiveReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = FunctionNames.LiveReport, });
            liveReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var betListRoute = routes.MapHttpRoute(
                "betListRoute",
                "BetList/Report/{report}/{*url}",
                new { Controller = "Proxy", Action = "ReportViews" });
            betListRoute.RouteHandler = new ReadonlySessionRouteHandler();
        }
    }
}