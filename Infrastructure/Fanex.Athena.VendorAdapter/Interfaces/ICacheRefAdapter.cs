namespace Fanex.Athena.VendorAdapter.Interfaces
{
    using RemotingRef;

    public interface ICacheRefAdapter
    {
#pragma warning disable CS3003 // Type is not CLS-compliant

        IRemotingRefService RemotingRefService { get; }
#pragma warning restore CS3003 // Type is not CLS-compliant

        string GetBettype(object bettypeId);

        string GetBettype(int betType, bool liveIndicator);

        string GetBetTypeName(object bettypeId, string languageCode, bool isHideSaba);

        string GetBettypeWithProductName(int betType, string productCode = "", bool liveIndicator = false);

        string[] GetCombinationTypeCombo(string betTeam, string betCheck, decimal handicap1, decimal handicap2);

        string GetLeagueName(object leagueId, string langCode = null);

        string GetLeague3rdName(object leagueId);

        string GetSportName(object sportId, string languageCode = null);

        string GetDummySportName(object sportId, string languageCode = null);

        string GetTeamName(object teamId);
    }
}