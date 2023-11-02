using Fanex.Athena.Model.Core.MetaModel;
using System.Collections.Generic;

namespace Fanex.Athena.Service.Core.Common.Interfaces
{
    public interface ICompressService
    {
        string EnsureFolderPath();

        byte[] CompressCompressDataInByteFormsData(IEnumerable<ZipEntry> entries, bool isDeleteOriginalAfterCompress);

        string CompressDataToFile(IEnumerable<ZipEntry> entries, bool isDeleteOriginalAfterCompress);
    }
}
