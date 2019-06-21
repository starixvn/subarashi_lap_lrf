namespace Fanex.Athena.Api.Base.Logger
{
    using System.Web.Http.ExceptionHandling;
    using Fanex.Logging;
    using Service.Core.Utility.Interfaces;

    public class ApiExceptionLogger : ExceptionLogger
    {
        private readonly ILogger _logger;

        public ApiExceptionLogger(ILogger logger)
        {
            _logger = logger;
        }

        public override void Log(ExceptionLoggerContext context)
        {
            _logger.Error(context.Exception.Message, context.Exception);
        }
    }
}