using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.DTO
{
    public class EntityResult<T> where T : class
    {
        public IEnumerable<T> MainData { get; set; }

        public T Total { get; set; }

        public int TotalItem { get; set; }
    }
}
