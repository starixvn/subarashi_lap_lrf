// --------------------------------------------------------------------------
// <copyright file="CustomerLogMetaModel.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Model.Customer.MetaModel.CustomerLog
{
    using System;
    using Core.MetaModel;
    using Fanex.Athena.Extension.Helper;

    /// <summary>
    /// CustomerLogMetaModel class.
    /// </summary>
    public class CustomerLogMetaModel : BaseMetaModel
    {
        public CustomerLogMetaModel()
        {
            Year = DateTimeHelper.Today.Year;
            Month = DateTimeHelper.Today.Month;
            FromDay = 1;
            ToDay = DateTimeHelper.Today.Day;
            IsShowOldValue = false;

            // Default is view by all
            ViewById = 0;
        }

        public int ViewById { get; set; }

        public int FromDay { get; set; }

        public int ToDay { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        public DateTime FromDate
        {
            get
            {
                return DateTimeHelper.CreateDateTime(Year, Month, FromDay);
            }
        }

        public DateTime ToDate
        {
            get
            {
                return DateTimeHelper.CreateDateTime(Year, Month, ToDay);
            }
        }

        public string UserName { get; set; }

        public DateTime LogDate { get; set; }

        public bool IsShowOldValue { get; set; }

        public bool IsAllowBA { get; set; }

        public bool IsAllowCustComm { get; set; }

        public string SiteName { get; set; }

        public override bool IsValid
        {
            get
            {
                return !string.IsNullOrEmpty(UserName);
            }
        }
    }
}