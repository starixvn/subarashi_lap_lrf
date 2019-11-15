namespace Fanex.Athena.Extension.Utility
{
    using System;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Data;

    [CLSCompliant(false)]
    public class DbFactory : IDbFactory
    {
        public IObjectDb GetObjectDb(string spName, int timeout = 120)
        {
            return ObjectDbFactory.CreateInstance(spName, timeout);
        }
    }
}