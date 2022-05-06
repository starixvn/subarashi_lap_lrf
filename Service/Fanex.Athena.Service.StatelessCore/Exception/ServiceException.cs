namespace Fanex.Athena.Service.StatelessCore.CustomException
{
    using System;
    using System.Runtime.Serialization;

    [Serializable]
    public sealed class ServiceException : Exception, ISerializable
    {
        private readonly string _serviceName;

        private ServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public ServiceException(string message, string serviceName)
            : base(message)
        {
            _serviceName = serviceName;
        }

        public ServiceException(string message, string serviceName, Exception exception)
          : base(message, exception)
        {
            _serviceName = serviceName;
        }

        public override string Message
        {
            get
            {
                return $"Exception when call Service: {_serviceName}. Exception Message: {base.Message}";
            }
        }

        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            info.AddValue(nameof(_serviceName), _serviceName);
            base.GetObjectData(info, context);
        }
    }
}