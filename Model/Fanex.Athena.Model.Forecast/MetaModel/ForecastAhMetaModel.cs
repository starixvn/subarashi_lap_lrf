// --------------------------------------------------------------------------
// <copyright file="ForecastAhMetaModel.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Model.Forecast.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;
    using System;

    /// <summary>
    /// ForecastAhMetaModel class.
    /// </summary>
    [Serializable]
    public class ForecastAHMetaModel : ForecastBaseMetaModel, IMetaModelValidation
    {
        public int CurrentScore { get; set; }

        public int MatchId { get; set; }
    }
}