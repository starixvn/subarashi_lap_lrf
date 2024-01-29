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
            var settledMatchCountReportRoute = routes.MapHttpRoute(
                   name: "settledMatchCountReportRoute",
                   routeTemplate: "SettledMatchCountReport/{*url}",
                   new { Controller = "Proxy", Action = "ReportViews", report = "SettledMatchCount", url = "Index" });
            settledMatchCountReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var weeklyLiveMatchReportRoute = routes.MapHttpRoute(
                   name: "weeklyLiveMatchReportRoute",
                   routeTemplate: "WeeklyLiveMatchReport/{*url}",
                   new { Controller = "Proxy", Action = "ReportViews", report = "WeeklyLiveMatch", url = "Index" });
            weeklyLiveMatchReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerBalanceReportRoute = routes.MapHttpRoute(
                name: "customerBalanceReportRoute",
                routeTemplate: "customerBalanceReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = "CustomerBalance", url = "Index" });
            customerBalanceReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var customerSupportTaskReportRoute = routes.MapHttpRoute(
                name: "customerSupportTaskReportRoute",
                routeTemplate: "CustomerSupportTaskReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = "CustomerSupportTask", url = "Index" });
            customerSupportTaskReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var extraPayoutReportRoute = routes.MapHttpRoute(
                name: "extraPayoutReportRoute",
                routeTemplate: "ExtraPayoutReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = "ExtraPayout", url = "Index" });
            extraPayoutReportRoute.RouteHandler = new ReadonlySessionRouteHandler();

            var leagueWinLossReportRoute = routes.MapHttpRoute(
                name: "leagueWinLossReportRoute",
                routeTemplate: "LeagueWinLossReport/{*url}",
                new { Controller = "Proxy", Action = "ReportViews", report = "LeagueWinLoss", url = "Index" });
            leagueWinLossReportRoute.RouteHandler = new ReadonlySessionRouteHandler();
        }
    }
}