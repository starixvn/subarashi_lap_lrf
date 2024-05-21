namespace Fanex.Athena.Api.StatelessBase.Utility
{
    using System;
    using System.Net.Http;
    using System.Net;
    using System.Web.Hosting;
    using System.Web;

    public static class RequestHelper
    {
        public static HttpResponseMessage HostRedirectResponse(string route)
        {
            var domain = HostingEnvironment.IsDevelopmentEnvironment ?
                HttpContext.Current.Request.Url.Authority :
                HttpContext.Current.Request.Url.IdnHost;

            var url = $"{HttpContext.Current.Request.Url.Scheme}://{domain}{VirtualPathUtility.ToAbsolute(route)}";

            var response = new HttpResponseMessage(HttpStatusCode.Moved);
            response.Headers.Location = new Uri(url);

            return response;
        }
    }
}
