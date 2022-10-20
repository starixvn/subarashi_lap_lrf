using Fanex.Athena.Excel.Base;
using Fanex.Athena.Excel.Base.Extension;
using Fanex.Athena.Resources;
using NPOI.SS.UserModel;
using System.Collections.Generic;

namespace Fanex.Athena.Excel.Customer.PlayerSegmentation
{
    public class SampleExcel : ReportBase
    {
        private const int DEFAULT_TOTAL_ROW = 100;
        private const int HEADER_ROW_INDEX = 0;

        private readonly IEnumerable<string> _headerNames;

        public SampleExcel(string templatePath, IEnumerable<string> headerNames)
            :base(templatePath, DEFAULT_TOTAL_ROW) 
        {
            _headerNames = headerNames;
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, HEADER_ROW_INDEX);
            var index = 0;
            foreach (var header in _headerNames)
            {
                row.Cells[index].SetCellValue(header);
                index++;
            }
        }

        protected override void AssignTitle(ISheet sheet)
        {
            // NO Title
        }
    }
}
