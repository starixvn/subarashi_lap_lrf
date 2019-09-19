using ProtoBuf;

namespace Fanex.Athena.Model.Core.DataDomain
{
    [ProtoContract(SkipConstructor = true, Name = "Currency")]
    public class Currency
    {
        [ProtoMember(1)]
        public int ID { get; set; }

        [ProtoMember(1)]
        public string Name { get; set; }
    }
}
