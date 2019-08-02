namespace Fanex.Athena.Model.Auth
{
    using System;

    [Serializable]
    public class OneAuthPermission
    {
        public string FunctionKey { get; set; }

        public string[] SubFunctionKeys { get; set; }
    }
}