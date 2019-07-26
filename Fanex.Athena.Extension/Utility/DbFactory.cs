using System;

using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Data;

namespace Fanex.Athena.Extension.Utility
{
    public class DbFactory : IDbFactory
    {
        [CLSCompliant(false)]
        public IObjectDb GetObjectDb(string spName, int timeout = 120)
        {
            return new ObjectDb(spName, timeout);
        }
    }
}