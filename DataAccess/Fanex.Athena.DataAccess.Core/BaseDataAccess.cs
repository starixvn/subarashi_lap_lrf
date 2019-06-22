// -----------------------------------------------------------------------
// <copyright file="BaseDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Common;
    using Fanex.Data;
    using Model.Core.DataDomain;

    public class BaseDataAccess
    {
        [CLSCompliant(false)]
        protected static void AddResultParam(IObjectDb db)
        {
            db.SetParameterValue("ErrCode", null);
            db.SetParameterValue("ErrMsg", null);
        }

        [CLSCompliant(false)]
        protected static IResultInfo GetResult(IObjectDb db)
        {
            var result = new ResultInfo();
            AssignResult(db, result);
            return result;
        }

        [CLSCompliant(false)]
        protected static IResultInfo<T> GetResult<T>(IObjectDb db)
        {
            var result = new ResultInfo<T>();
            AssignResult(db, result);
            return result;
        }

        [CLSCompliant(false)]
        protected internal virtual IObjectDb GetObjectDb(string spname, int timeout = 120)
        {
            return new ObjectDb(spname, timeout);
        }

        protected static IDictionary<string, T> InitSummaryTotalList<T>(string defaultBaseCurrency) where T : class
        {
            var summary = new Dictionary<string, T>();
            foreach (var currency in SystemConstants.BaseCurrencyListOfSummaryTotalRow)
            {
                summary.Add(currency, Activator.CreateInstance<T>());
            }

            if (!string.IsNullOrEmpty(defaultBaseCurrency) &&
                !SystemConstants.BaseCurrencyListOfSummaryTotalRow.Any(x => x.Equals(defaultBaseCurrency, System.StringComparison.OrdinalIgnoreCase)))
            {
                summary.Add(defaultBaseCurrency.ToUpperInvariant(), Activator.CreateInstance<T>());
            }

            return summary;
        }

        private static void AssignResult(IObjectDb db, IResultInfo result)
        {
            var errorCode = db.GetParameterValue("ErrCode");
            var errorMessage = db.GetParameterValue("ErrMsg");

            result.Code = Converter.ToInt(errorCode);
            result.Message = Converter.ToString2(errorMessage);
        }
    }
}