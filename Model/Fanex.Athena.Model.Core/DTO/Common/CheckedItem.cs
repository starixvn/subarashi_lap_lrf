// --------------------------------------------------------------------------
// <copyright file="CheckedItem.cs" company="">
// Copyright (coffee) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Model.Core.DTO.Common
{
    using System.Collections.Generic;

    public class CheckedItem
    {
        public string Name { get; set; }

        public int ID { get; set; }

        public string Value { get; set; }

        public bool Checked { get; set; }

        public IEnumerable<CheckedItem> Children { get; set; }
    }
}