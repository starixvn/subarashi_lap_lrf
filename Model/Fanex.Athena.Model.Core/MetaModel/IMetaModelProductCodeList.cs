using Fanex.Athena.Model.Core.MetaModel.Product;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelProductCodeList
    {
        string ProductCodeList { get; set; }
        string OriginalProductCodeList { get; set; }
    }

    public interface IMetaModelProductOptions
    {
        IList<ProductOption> ProductOptions { get; set; }
        IList<ProductOption> OriginalProductOptions { get; set; }
    }
}
