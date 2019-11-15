using System;
using System.Data;
using Fanex.Data;

namespace Fanex.Athena.Extension.Utility.Interfaces
{
    [CLSCompliant(false)]
    public interface IDbFactory
    {
        IObjectDb GetObjectDb(string spName, int timeout = 120);
    }
}