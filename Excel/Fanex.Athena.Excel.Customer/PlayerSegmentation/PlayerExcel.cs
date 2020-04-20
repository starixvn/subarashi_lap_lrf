namespace Fanex.Athena.Excel.Customer
{
    using Fanex.Athena.Excel.Base;
    using Fanex.Athena.Excel.Base.Extension;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Resources;
    using NPOI.SS.UserModel;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class PlayerExcel<T> : ReportBase
        where T : PlayerInfo
    {
        private const int RowContentTemplate = 2;
        private const int NumberOfRowPerSheet = 20000;

        protected IList<Tuple<string, string, Func<object, object>>> _infoHeaders;

        protected IEnumerable<T> _dataSource;

        private readonly string _reportTitle;

        protected PlayerExcel(string templatePath, string reportTitle, IEnumerable<T> dataSource)
           : base(templatePath, dataSource.Count(), NumberOfRowPerSheet)
        {
            _dataSource = dataSource;
            _infoHeaders = new List<Tuple<string, string, Func<object, object>>>
            {
                new Tuple<string, string, Func<object, object>>(ViewResources.ExternalId, nameof(ViewResources.ExternalId), null),
                new Tuple<string, string, Func<object, object>>(ViewResources.SystemId, nameof(ViewResources.SystemId), null),
            };
            IsMultiSheet = true;
            _reportTitle = reportTitle;
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            for (int i = 0; i < _infoHeaders.Count; i++)
            {
                row.Cells[i].SetCellValue(_infoHeaders[i].Item1);
            }
        }

        protected override void AssignSheetData(ISheet sheet, int pageIndex)
        {
            int rowCount = Math.Min(_dataSource.Count(), checked((pageIndex + 1) * PageSize));
            var rowIndex = 0;
            var type = typeof(T);

            for (var dataIndex = pageIndex * PageSize; dataIndex < rowCount; dataIndex++, rowIndex++)
            {
                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, rowIndex + RowContentTemplate);
                var rowData = _dataSource.ElementAt(dataIndex);
                AssignRowData(row, rowData, type);
            }
        }

        protected virtual void AssignRowData(IRow row, T rowData, Type type)
        {
            for (int cellIndex = 0; cellIndex < _infoHeaders.Count; cellIndex++)
            {
                var tuple = _infoHeaders[cellIndex];
                var propertyName = tuple.Item2;
                var cellValue = type.GetProperty(propertyName)?.GetValue(rowData);
                var parseValue = ParseValue(cellValue, tuple.Item3);
                row.Cells[cellIndex].SetCellValue(parseValue);
            }
        }

        protected override void AssignTitle(ISheet sheet)
        {
            sheet.SetTextRowValue(TemplateSheet, RowTitleTemplate, 1, _reportTitle);
            sheet.CreateFreezePane(0, RowContentTemplate);
        }

        protected virtual object ParseValue(object cellValue, Func<object, object> parser)
        {
            if (cellValue == null)
            {
                return string.Empty;
            }
            return parser?.Invoke(cellValue) ?? cellValue;
        }
    }
}