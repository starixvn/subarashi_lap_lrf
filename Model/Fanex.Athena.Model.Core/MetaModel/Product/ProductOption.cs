// -----------------------------------------------------------------------
// <copyright file="ProductOption.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

using ProtoBuf;

namespace Fanex.Athena.Model.Core.MetaModel.Product
{
    /// <summary>
    /// ProductOption class.
    /// </summary>
    [ProtoContract(SkipConstructor = true, Name = "ProductOption")]
    public class ProductOption
    {
        [ProtoMember(1)]
        public string Code { get; set; }

        [ProtoMember(2)]
        public string Name { get; set; }
        [ProtoMember(3)]
        public bool Status { get; set; }

        public override int GetHashCode()
        {
            return this.Code.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            var item = obj as ProductOption;

            if (item == null)
            {
                return false;
            }

            return this.Code.Equals(item.Code, System.StringComparison.OrdinalIgnoreCase);
        }
    }
}