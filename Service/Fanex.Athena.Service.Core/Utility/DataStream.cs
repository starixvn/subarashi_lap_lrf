using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Fanex.Athena.Service.Core.Utility
{
    public class DataStreamService : IDataStreamService
    {
        private readonly string _filename;

        public DataStreamService(string filename)
        {
            _filename = filename;
        }

        public async Task WriteToStream(Stream outputStream, HttpContent content, TransportContext context)
        {
            try
            {
                var buffer = new byte[65536];
                using (var video = File.Open(_filename, FileMode.Open, FileAccess.Read))
                {
                    var length = (int)video.Length;
                    var bytesRead = 1;

                    while (length > 0 && bytesRead > 0)
                    {
                        bytesRead = video.Read(buffer, 0, Math.Min(length, buffer.Length));
                        await outputStream.WriteAsync(buffer, 0, bytesRead);
                        length -= bytesRead;
                    }
                }
            }
            catch (HttpException ex)
            {
                throw ex;
            }
            finally
            {
                outputStream.Close();
            }
        }
    }
}
