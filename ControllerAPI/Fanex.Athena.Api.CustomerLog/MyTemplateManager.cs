using RazorEngine.Templating;

namespace Fanex.Athena.Api.CustomerLog
{
    public class MyTemplateManager : DelegateTemplateManager
    {
        public new void AddDynamic(ITemplateKey key, ITemplateSource source)
        {
            RemoveDynamic(key);
            base.AddDynamic(key, source);
        }
    }
}