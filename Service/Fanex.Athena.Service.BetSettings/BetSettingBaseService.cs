// -----------------------------------------------------------------------
// <copyright file="BetSettingBaseService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.BetSettings
{
    using System.Collections.Generic;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DTO.Common;

    public class BetSettingBaseService
    {

        protected static IResultInfo ErrorResult(string message)
        {
            return new ResultInfo
            {
                Code = 1,
                Message = message
            };
        }

    }
}