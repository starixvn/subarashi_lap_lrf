namespace Fanex.Athena.Service.StatelessCore.CustomException
{
    using System;
    using System.Runtime.Serialization;

    [Serializable]
    public sealed class ProxyException : Exception, ISerializable
    {
        private readonly string _apiKey;
        private readonly string _apiUrl;
        private readonly string _url;

        private ProxyException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public ProxyException(string message, string apiKey, string apiUrl, string url, Exception exception)
          : base(message, exception)
        {
            _apiKey = apiKey;
            _apiUrl = apiUrl;
            _url = url;
        }

        public override string Message
        {
            get
            {
                return $"Proxy api exception: apiKey {_apiKey}, apiUrl {_apiUrl}, url {_url}. Exception Message: {base.Message}";
            }
        }

        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            info.AddValue(nameof(_apiKey), _apiKey);
            info.AddValue(nameof(_apiUrl), _apiUrl);
            info.AddValue(nameof(_url), _url);

            base.GetObjectData(info, context);
        }
    }
}