namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelAgent
    {
        string AgentListXml { get; set; }

        bool IsExcludedTestData { get; set; }
    }
}
