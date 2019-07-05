using Fanex.Data;
using System;

namespace Fanex.Athena.Extension.Utility.Interfaces
{
    [CLSCompliant(false)]
    public interface IDbFactory
    {
        IObjectDb GetObjectDb(string spName, int timeout = 120);
    }
}