using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Model.Core.DTO.Common
{
    public class PagingApiResult<T>
    {
        public PagingApiResult()
        {
            IsSuccess = true;
            Data = Enumerable.Empty<T>();
        }

        public PagingApiResult(IEnumerable<T> data, int totalItems)
        {
            IsSuccess = true;
            Data = data;
            TotalItems = totalItems;
        }

        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public IEnumerable<T> Data { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public int TotalItems { get; set; }
    }
}