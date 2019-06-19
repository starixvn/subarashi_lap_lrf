using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Core.Utility.Interfaces
{
    public interface IDataStreamService
    {
        Task WriteToStream(Stream outputStream, HttpContent content, TransportContext context);
    }
}