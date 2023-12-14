namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelFunctionContract
    {
        bool IsAllowedBA { get; set; }

        bool HasComm { get; set; }

        bool SystemIdVisible { get; set; }

        string FunctionKey { get; }
    }
}