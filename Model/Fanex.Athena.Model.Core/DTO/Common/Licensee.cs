// -----------------------------------------------------------------------
// <copyright file="Licensee.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Core.DTO.Common
{
    using System;
    using System.Runtime.Serialization;

    public class Licensee
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public bool IsAllowedCustomerComm { get; set; }

        public bool IsEnableBA { get; set; }
    }
}