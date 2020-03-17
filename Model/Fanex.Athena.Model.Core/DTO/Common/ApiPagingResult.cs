using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Model.Core.DTO.Common
{
    public class ApiPagingResult<T>
    {
        public ApiPagingResult()
        {
            Data = Enumerable.Empty<T>();
        }

        public ApiPagingResult(IEnumerable<T> data, int pageIndex, int pageSize, byte orderCol, byte sortType, int totalItem)
        {
            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalItem = totalItem;
            OrderCol = orderCol;
            SortType = sortType;
        }

        public IEnumerable<T> Data { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public byte OrderCol { get; set; }
        public byte SortType { get; set; }

        public int TotalItem { get; set; }
    }
}