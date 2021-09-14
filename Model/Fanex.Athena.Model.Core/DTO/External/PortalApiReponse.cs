namespace Fanex.Athena.Model.Core.DTO.External
{
    public class PortalApiReponse
    {
        public int ErrorCoode { get; set; }
        public string ErrorMsg { get; set; }
    }

    public class PortalApiReponse<T> : PortalApiReponse
    {
        public T Data { get; set; }
    }
}