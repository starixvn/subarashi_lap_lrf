namespace Fanex.Athena.Extension.Helper
{
    public static class DynamicObjectHelper
    {
        public static object GetValue(dynamic obj, string propertyName, object defaultValue)
        {
            return obj.GetType().GetProperty(propertyName).GetValue(obj, defaultValue);
        }
    }
}