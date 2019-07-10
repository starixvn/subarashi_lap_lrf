namespace Fanex.Athena.Model.Auth
{
    using System.Runtime.Serialization;

    [DataContract]
    public class OneAuthPermission
    {
        [DataMember]
        public string FunctionKey { get; set; }

        [DataMember]
        public string[] SubFunctionKeys { get; set; }
    }
}