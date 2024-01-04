namespace Fanex.Athena.Service.Core.Common.Interfaces
{
    using System.Collections.Generic;
    using System.IO;
    using System.Text;
    using Fanex.Athena.Model.Core.MetaModel;

    public interface IFileService
    {
        DirectoryInfo GetParentDirectory(string path);

        void DeleteFile(string path);

        void CreateFolder(string path);

        StreamWriter CreateStreamWriter(string path, bool append, Encoding encoding);

        void Compress(IEnumerable<ZipEntry> entries, string zipPath, bool deleteOriginalFiles);

        void WriteAllBytes(string path, byte[] bytes);

        byte[] ReadAllBytes(string path);
    }
}