namespace Fanex.Athena.Api.StatelessBase.Logger
{
    using System;
    using System.Linq;
    using System.Web.Http.ExceptionHandling;
    using Fanex.Athena.Extension.Helpers;
    using Fanex.Athena.Service.StatelessCore.CustomException;
    using Fanex.Logging;

    [CLSCompliant(false)]
    public class ApiExceptionLogger : ExceptionLogger
    {
        private readonly ILogger _logger;
        private static readonly string[] CriticalServiceNames = { "CTS" };

        public ApiExceptionLogger(ILogger logger)
        {
            _logger = logger;
        }

        private static bool IsCriticalException(Exception exception)
        {
            return exception is ServiceException serviceException && CriticalServiceNames.Contains(serviceException.ServiceName);
        }

        public override void Log(ExceptionLoggerContext context)
        {
            if (IsCriticalException(context.Exception))
            {
                _logger.Critical(LogMessageHelper.GenerateMessage(context.Exception));
            }
            else
            {
                _logger.Error(LogMessageHelper.GenerateMessage(context.Exception));
            }
        }
    }
}