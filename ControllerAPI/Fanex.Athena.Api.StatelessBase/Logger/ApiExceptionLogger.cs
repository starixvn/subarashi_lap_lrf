namespace Fanex.Athena.Api.StatelessBase.Logger
{
    using System;
    using System.Web.Http.ExceptionHandling;

    using Fanex.Athena.Extension.Helpers;
    using Fanex.Logging;

    [CLSCompliant(false)]
    public class ApiExceptionLogger : ExceptionLogger
    {
        private readonly ILogger _logger;

        public ApiExceptionLogger(ILogger logger)
        {
            _logger = logger;
        }

        public override void Log(ExceptionLoggerContext context)
        {
            _logger.Error(LogMessageHelper.GenerateMessage(context.Exception));
        }
    }
}