using Fanex.Athena.Resources;

namespace Fanex.Athena.Module.PlayerAdmin.Api.ViewModels
{
    public class CommGroupViewModel
    {
        public CommGroupViewModel()
        {
            Id = "0";
            Name = ViewResources.None;
        }

        public string Id { get; set; }
        public string Name { get; set; }
    }
}
