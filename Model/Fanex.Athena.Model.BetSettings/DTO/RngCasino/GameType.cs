// -----------------------------------------------------------------------
// <copyright file="GameType.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.BetSettings.DTO.RngCasino
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// GameType class.
    /// </summary>
    [Serializable]
    public class GameType
    {
        public int GameTypeId { get; set; }

        public string GameTypeName { get; set; }

        public IList<StakeLevel> StakeLevelList { get; set; }
    }
}