// --------------------------------------------------------------------------
// <copyright file="Global.asax.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena
{
    using Api.Base.Attributes;

    using Data;

    using Fanex.Athena.Extension.Helpers;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.RouterConfig;
    using Fanex.Data.SqlServer;
    using Fanex.Logging.Sentry.RavenClient;

    using Logging;

    using MessagePack.Resolvers;

    using RemotingRef;

    using SharpRaven;

    using System;
    using System.Configuration;
    using System.Diagnostics.CodeAnalysis;
    using System.Web;
    using System.Web.Helpers;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    public class MvcApplication : HttpApplication
    {
        private static readonly string[] RemovedHeaderKeys = { "Server", "X-AspNet-Version", "X-AspNetMvc-Version" };

        public void Application_Error(object sender, EventArgs e)
        {
            var deploymentMode = ConfigurationManager.AppSettings["DeploymentMode"];
            if (string.IsNullOrEmpty(deploymentMode) || !deploymentMode.Equals("Static"))
            {
                // Code that runs when an unhandled error occurs
                var exception = Server.GetLastError();
                var isIgnore = exception is HttpAntiForgeryException
                              || exception is HttpException
                           || (exception.TargetSite.DeclaringType == typeof(ActionDescriptor) &&
                                exception.TargetSite.Name == "ExtractParameterFromDictionary");
                // Exception when passing wrong data type to action method
                if (!isIgnore)
                {
                    LogService.Error(LogMessageHelper.GenerateMessage(exception), exception);
                }
            }
        }

        [SuppressMessage("Sonar Code Smell", "S2325:Methods and properties that don't access instance data should be static", Justification = "Reviewed.")]
        public void Application_Start(object sender, EventArgs e)
        {
            var deploymentMode = ConfigurationManager.AppSettings["DeploymentMode"];
            if (string.IsNullOrEmpty(deploymentMode) || !deploymentMode.Equals("Static"))
            {
                LogManager
                    .SetDefaultLogCategory(ConfigurationManager.AppSettings["Fanex.Logging-LogCategory"])
                    .Use(new SentryLogging(new SentryEngineOptions
                    {
                        Dsn = new Dsn(ConfigurationManager.AppSettings["Sentry-Dsn"])
                    }));

                ViewEngines.Engines.Clear();
                ViewEngines.Engines.Add(new RazorViewEngine());

                AreaRegistration.RegisterAllAreas();
                GlobalFilters.Filters.Add(new CustomAuthorizeAttribute());
                RouteTable.Routes.IgnoreRoute("favicon.ico");
                RouteConfig.RegisterRoutes(RouteTable.Routes);

                BundleConfig.RegisterBundles(BundleTable.Bundles);
                /*Web API*/
                GlobalConfiguration.Configuration.EnableCors();
                GlobalConfiguration.Configuration.Filters.Add(new CustomApiAuthorizeAttribute());
                GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
                /*End Web API*/

                AntiForgeryConfig.SuppressXFrameOptionsHeader = true;

                DbSettingProviderManager
                    .StartNewSession()
                    .WithSqlServer(resourcePath: "~/SpNameConfig/FanexSpName.xml")
                    .Run();

                RefDataTypeContainer
                .ConnectTo(new Uri(ConfigurationManager.AppSettings["Fanex.RemotingRef.Service.Url"]))
                .FromApplication("Fanex.LAP");

                DIConfig.Register();
                CompositeResolver.RegisterAndSetAsDefault(
                       // resolver custom types first
                       NativeDateTimeResolver.Instance,
                       // finally use standard resolver
                       ContractlessStandardResolver.Instance);
            }
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if (!Response.HeadersWritten)
            {
                Response.AddOnSendingHeaders((c) =>
                {
                    RemoveSensitiveHeaders(c);
                });
            }
        }

        private static void RemoveSensitiveHeaders(HttpContext httpContext)
        {
            if (httpContext != null && httpContext.Response != null && httpContext.Response.Headers != null)
            {
                foreach (string header in RemovedHeaderKeys)
                {
                    if (httpContext.Response.Headers[header] != null)
                    {
                        httpContext.Response.Headers.Remove(header);
                    }
                }
            }
        }
    }
}