using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Model.Core.DTO.Common
{
    public class ApiPagingResult<T>
    {
        public ApiPagingResult()
        {
            IsSuccess = true;
            Data = Enumerable.Empty<T>();
        }

        public ApiPagingResult(IEnumerable<T> data, int pageIndex, int pageSize, int totalItem)
        {
            IsSuccess = true;
            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalItem = totalItem;
        }

        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public IEnumerable<T> Data { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public int TotalItem { get; set; }
    }
}