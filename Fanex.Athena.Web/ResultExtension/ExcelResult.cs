// -----------------------------------------------------------------------
// <copyright file="ExcelResult.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Web.ResultExtension
{
    using System.Web.Mvc;
    using NPOI.SS.UserModel;
    using System;
    /// <summary>
    /// Excel Result.
    /// </summary>
    [System.CLSCompliant(false)]
    public class ExcelResult : ActionResult
    {
        private readonly string _fileName;

        private IWorkbook _hssfWorkBook;

        public ExcelResult(IWorkbook hssfWorkbook, string fileName)
        {
            this._hssfWorkBook = hssfWorkbook;
            this._fileName = fileName;
        }

        /// <summary>
        /// Execute result.
        /// </summary>
        /// <param name="context">The controller context.</param>
        public override void ExecuteResult(ControllerContext context)
        {
            try
            {
                var response = context.HttpContext.Response;
                response.Clear();
                response.ContentType = "application/vnd.ms-excel";
                response.AddHeader("Content-disposition", "attachment; filename=" + this._fileName + ".xls");
                this._hssfWorkBook.Write(response.OutputStream);
            }
            finally
            {
                if (this._hssfWorkBook != null)
                {
                    this._hssfWorkBook.Close();
                    this._hssfWorkBook = null;
                }
            }
        }
    }
}