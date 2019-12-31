namespace Fanex.Athena.UnitTest.Common.NUnitExtensions
{
    using Fanex.Athena.UnitTest.Common.Constraints;
    using NUnit.Framework;

    public class Tobe : Is
    {
        public static SamePropertiesConstraint SameProperties(object expected)
        {
            return new SamePropertiesConstraint(expected);
        }
    }
}