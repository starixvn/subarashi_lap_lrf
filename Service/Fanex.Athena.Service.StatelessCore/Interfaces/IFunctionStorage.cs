namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;

    public interface IFunctionStorage
    {
        IEnumerable<Function> FunctionList { get; }

        IEnumerable<Function> MasterFunctions { get; }

        IDictionary<int, IEnumerable<Function>> SubFunctions { get; }
    }
}