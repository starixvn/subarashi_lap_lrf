using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.DTO.Common
{
    public class SabaSport
    {
        public int Id { get; set; }

        public int SportTypeId { get; set; }

        public string Name { get; set; }

        public IEnumerable<int> LeagueGroupIds { get; set; }
    }
}
