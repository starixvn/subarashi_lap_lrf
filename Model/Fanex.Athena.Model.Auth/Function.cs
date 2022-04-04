namespace Fanex.Athena.Model.Auth
{
    using System;
    using Fanex.Athena.Resources;

    [Serializable]
    public class Function
    {
        public int FunctionId { get; set; }

        public string Name => Menu.ResourceManager.GetString(FunctionKey.ToLowerInvariant());

        public string Description { get; set; }

        public int ParentId { get; set; }

        public string Url { get; set; }

        public bool IsMenu { get; set; }

        public bool IsActive { get; set; }

        public int DisplayOrder { get; set; }

        public bool IsNew { get; set; }

        public string FunctionKey { get; set; }

        public bool IsFunction { get; set; }
    }
}