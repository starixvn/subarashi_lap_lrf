namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelPaging
    {
        int PageIndex { get; set; }
        int PageSize { get; set; }
        byte OrderCol { get; set; }
        byte SortType { get; set; }
    }
}