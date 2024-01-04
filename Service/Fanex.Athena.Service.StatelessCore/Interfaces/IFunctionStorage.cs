namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Auth;

    public interface IFunctionStorage
    {
        IEnumerable<Function> FunctionList { get; }

        IEnumerable<Function> MasterFunctions { get; }

        IDictionary<int, IEnumerable<Function>> SubFunctions { get; }
    }
}