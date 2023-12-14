using System;
using System.Collections.Generic;
using System.Linq;
using Fanex.Athena.Model.Core.MetaModel.Product;

namespace Fanex.Athena.Model.Core.Helper
{
    public static class MetaModelHelper
    {
        public static bool ValidateBaseCurrency(string baseCurrency, bool isAllowEmpty = true)
        {
            return isAllowEmpty || !string.IsNullOrEmpty(baseCurrency);
        }

        public static bool TryMetaModel<T>(IDictionary<string, object> actionArguments, out T model)
           where T : class
        {
            var metaModel = actionArguments.FirstOrDefault(x => x.Value is T);
            if (metaModel.Value is T value)
            {
                model = value;
                return true;
            }
            model = null;
            return false;
        }

        public static string ToSelectedProductCodeList(this IEnumerable<ProductOption> productOptions, Predicate<ProductOption> predicate = null)
            => string.Join(",", productOptions
                .Where(_ => _.Status && (predicate == null || predicate.Invoke(_)))
                .Select(_ => _.Code)
                );
    }
}