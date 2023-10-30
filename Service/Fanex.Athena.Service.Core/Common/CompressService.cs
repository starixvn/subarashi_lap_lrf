
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Hosting;

namespace Fanex.Athena.Service.Core.Common
{
    public class CompressService : ICompressService
    {
        private const string TEMP_FOLDER = "CompressTempFolder";

        private readonly IFileService _fileService;

        protected virtual string ContentRootPath => HostingEnvironment.MapPath("~/");

        public CompressService(IFileService fileService) 
        {
            _fileService = fileService;
        }

        public byte[] CompressCompressDataInByteFormsData(IEnumerable<ZipEntry> entries, bool isDeleteOriginalAfterCompress)
        { 
            var zipPath = Path.Combine(EnsureFolderPath(), $"{Guid.NewGuid()}.zip");
            _fileService.Compress(entries, zipPath, isDeleteOriginalAfterCompress);
            var bytes = _fileService.ReadAllBytes(zipPath);
            _fileService.DeleteFile(zipPath);
            return bytes;
        }

        public string CompressDataToFile(IEnumerable<ZipEntry> entries, bool isDeleteOriginalAfterCompress)
        {
            var zipPath = Path.Combine(EnsureFolderPath(), $"{Guid.NewGuid()}.zip");
            _fileService.Compress(entries, zipPath, isDeleteOriginalAfterCompress);
            return zipPath;
        }

        public string EnsureFolderPath()
        {
            var path = GetTempFolderPath();
            _fileService.CreateFolder(path);
            return path;
        }

        private string GetTempFolderPath()
        {
            var root = _fileService.GetParentDirectory(ContentRootPath);

            return Path.Combine(root.FullName, TEMP_FOLDER);
        }
    }
}
