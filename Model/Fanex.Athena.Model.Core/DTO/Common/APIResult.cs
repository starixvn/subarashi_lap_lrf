using System;

namespace Fanex.Athena.Model.Core.DTO.Common
{
    [Serializable]
    public class APIResult<T>
    {
        public T Data { get; set; }
    }
}