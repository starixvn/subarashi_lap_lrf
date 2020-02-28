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
        private const int RowContentTemplate = 1;

        protected IList<Tuple<string, string>> _infoHeaders;

        protected IEnumerable<T> _dataSource;

        public PlayerExcel(string templatePath, string reportTitle, IEnumerable<T> dataSource)
           : base(templatePath, dataSource.Count())
        {
            _dataSource = dataSource;
            _infoHeaders = new List<Tuple<string, string>>
            {
                new Tuple<string, string>(ViewResources.ExternalId, nameof(ViewResources.ExternalId)),
                new Tuple<string, string>(ViewResources.SystemId, nameof(ViewResources.SystemId)),
                new Tuple<string, string>($"{ViewResources.AbnormalBet} (*)", "IsMarkVoid")
            };
        }

        protected override void AssignHeader(ISheet sheet)
        {
            var row = sheet.CopyRow(TemplateSheet, RowHeaderTemplate);
            for (int i = 0; i < _infoHeaders.Count; i++)
            {
                row.Cells[i].SetCellValue(_infoHeaders[i].Item1);
            }
        }

        protected override void AssignSheetData(ISheet sheet)
        {
            var type = typeof(T);
            for (int dataIndex = 0; dataIndex < _dataSource.Count(); dataIndex++)
            {
                var row = sheet.CopyRow(TemplateSheet, RowContentTemplate, dataIndex + RowContentTemplate);
                var rowData = _dataSource.ElementAt(dataIndex);
                AssignRowData(row, rowData, type);
            }
            AddRowDescription(sheet, sheet.LastRowNum);
        }

        protected virtual void AssignRowData(IRow row, T rowData, Type type)
        {
            for (int cellIndex = 0; cellIndex < _infoHeaders.Count; cellIndex++)
            {
                var tuple = _infoHeaders[cellIndex];
                var propertyName = tuple.Item2;
                var cellValue = type.GetProperty(propertyName)?.GetValue(rowData);
                var parseValue = ParseValue(cellValue ?? string.Empty);
                row.Cells[cellIndex].SetCellValue(parseValue);
            }
        }

        protected override void AssignTitle(ISheet sheet)
        {
            //none title
        }

        protected virtual void AddRowDescription(ISheet sheet, int lastRowIndex)
        {
            var row = sheet.CreateRow(lastRowIndex + 1);
            row.CreateCell(0).SetCellValue(ViewResources.AbnormalBetDescriptionReport);
        }

        protected virtual object ParseValue(object cellValue)
        {
            if (cellValue is bool @bool)
            {
                return @bool ? ViewResources.Yes : ViewResources.No;
            }
            return cellValue;
        }
    }
}