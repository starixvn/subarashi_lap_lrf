namespace Fanex.Athena.Model.Auth
{
    using System.Collections.Generic;

    public class RequestInfo
    {
        public bool IsSelfMode { get; set; }

        public string IdentityName { get; set; }

        public IEnumerable<ValidatedFunctionKey> FunctionKeys { get; set; }
    }
}