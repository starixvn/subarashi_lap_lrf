using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Module.PlayerAdmin.Api.ViewModels
{
    public class SubsidiaryViewModel
    {
        public SubsidiaryViewModel()
        {
            Children = Enumerable.Empty<SubsidiaryViewModel>();
        }

        public SubsidiaryViewModel(string id)
        {
            Id = id;
            Name = id;
            Children = Enumerable.Empty<SubsidiaryViewModel>();
        }

        public SubsidiaryViewModel(string id, string name, IEnumerable<SubsidiaryViewModel> children)
        {
            Id = id;
            Name = name;
            Children = children;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<SubsidiaryViewModel> Children { get; set; }

        public string OperatorId { get; set; }
        public int? WhiteLabelId { get; set; }
        public string WhiteLabelName { get; set; }
        public int AgentId { get; set; }
        public int CurrencyId { get; set; }
    }
}
