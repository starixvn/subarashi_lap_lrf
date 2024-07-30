using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IBettingTicketCenterSportService
    {
        IEnumerable<SabaSport> GetSabaSports(bool isHideSaba = false);

        SabaSport GetSabaSport(int id, bool isHideSaba = false);
    }
}