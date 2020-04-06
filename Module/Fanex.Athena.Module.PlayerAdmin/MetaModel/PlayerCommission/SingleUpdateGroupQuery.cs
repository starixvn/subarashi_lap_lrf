namespace Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission
{
    public class SingleUpdateGroupQuery : SingleMoveGroupQuery
    {
        public string[] Products { get; set; }

        public decimal[] Comms { get; set; }

        public override bool IsValid()
            => base.IsValid() && CommValidator.IsValid(Comms);
    }
}
