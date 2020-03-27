namespace Fanex.Athena.Model.Core.Helper
{
    using System;

    public static class MathHelper
    {
        public static decimal RoundDownDecimal(decimal value, int digits)
        {
            var power = (decimal)Math.Pow(10, digits);
            return Math.Floor(value * power) / power;
        }
    }
}
