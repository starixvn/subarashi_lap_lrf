namespace Fanex.Athena.Model.Auth
{
    using System;
    using System.Runtime.Serialization;

    [DataContract]
    [Serializable]
    public class OneAuthPermission
    {
        [DataMember]
        public string FunctionKey { get; set; }

        [DataMember]
        public string[] SubFunctionKeys { get; set; }
    }
}