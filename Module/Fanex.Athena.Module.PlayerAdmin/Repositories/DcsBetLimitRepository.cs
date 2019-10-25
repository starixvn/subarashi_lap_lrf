namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Xml.Linq;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Common;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Fanex.Logging;

    public class DcsBetLimitRepository : IDcsBetLinitRepository
    {
        private readonly IDbFactory _db;

        private readonly ILogger _logger;

        private const int MemberRoleId = 1;

        private const int ProductStatusSettingType = 4;

        private static readonly IDictionary<int, string[]> ProductSportList = new Dictionary<int, string[]>
        {
            [ProductTypes.VirtualSports] = new[] { "180", "181", "182", "183", "184", "185", "186" },
            [ProductTypes.VirtualSports2] = new[] { "190", "191", "192", "193", "199" },
            [ProductTypes.Lottery] = new[] { "220" },
            [ProductTypes.Sportsbooks2] = new[] { "43" }
        };

        public DcsBetLimitRepository(IDbFactory dbFactory, ILogger logger)
        {
            _db = dbFactory;
            _logger = logger;
        }

        public async Task<IEnumerable<PlayerBetLimit>> GetSettingAsync(int custId, int productId)
        {
            const string UspName = "Acc_Dep_CustSetting_BetLimitSettingSelect";

            var dataList = new List<PlayerBetLimit>();

            using (var db = _db.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", custId);
                db.SetParameterValue("productid", productId);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        dataList.Add(new PlayerBetLimit
                        {
                            MinBet = reader.ToDecimal("minbet"),
                            BetValueMin = reader.ToDecimal("minbetmin"),
                            MaxBet = reader.ToDecimal("maxbet"),
                            BetValueMax = reader.ToDecimal("maxbetmax"),
                            MaxPerMatch = reader.ToDecimal("maxpermatch"),
                            MaxPerMatchMax = reader.ToDecimal("maxpermatchmax"),
                            Id = reader.ToString("sporttype"),
                            BetType = reader.ToInt("bettype")
                        });
                    }
                }
            }

            return dataList;
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel)
        {
            const string UspName = "Acc_Dep_CustSetting_BetLimitUpd";

            using (var db = _db.GetObjectDb(UspName))
            {
                AddUpdateParameter(db, metaModel);

                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                var errorCode = db.GetParameterValue("ErrCode");
                var errorMessage = db.GetParameterValue("ErrMsg");

                return new ResultInfo
                {
                    Code = Converter.ToInt(errorCode),
                    Message = GetErrorMessage(Converter.ToString2(errorMessage))
                };
            }
        }

        public async Task<bool> GetStatusAsync(int custId, int productId)
        {
            const string UspName = "Acc_Dep_CustSetting_StatusSettingSelect";

            using (var db = _db.GetObjectDb(UspName))
            {
                db.SetParameterValue("CustID", custId);
                db.SetParameterValue("ProductId", productId);
                db.SetParameterValue("SettingType", ProductStatusSettingType);
                db.SetParameterValue("RoleID", MemberRoleId);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    if (reader.Read())
                    {
                        return reader.ToInt("IsDisabled") == 0;
                    }
                }
            }

            return false;
        }

        private static void AddUpdateParameter(IObjectDb db, PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel)
        {
            db.SetParameterValue("custid", metaModel.CustId);
            db.SetParameterValue("userid", metaModel.UserId);
            db.SetParameterValue("ip", metaModel.Ip);
            db.SetParameterValue("betlimit", BuildBetLimitParameter(metaModel.ProductId, metaModel.Setting));
            db.SetParameterValue("errcode", null);
            db.SetParameterValue("errmsg", null);
        }

        private static string BuildBetLimitParameter(int productId, IEnumerable<PlayerBetLimitMetaModel> setting)
        {
            const string XMLPattern = "<ROOT>{0}</ROOT>";
            const string XMLElement = "<BetLimit SportType=\"{0}\" BetType=\"{1}\" MinBet=\"{2}\" MaxBet=\"{3}\" MaxPerMatch=\"{4}\" ></BetLimit>";

            var xmlElementBuilder = new StringBuilder();
            var sports = ProductSportList[productId];

            foreach (var item in setting)
            {
                if (sports.Contains(item.Id))
                {
                    xmlElementBuilder.Append(string.Format(XMLElement, item.Id, item.BetType, item.MinBet, item.MaxBet, item.MaxPerMatch));
                }
            }

            return string.Format(XMLPattern, xmlElementBuilder);
        }

        private string GetErrorMessage(string xmlErrorMessage)
        {
            if (!string.IsNullOrEmpty(xmlErrorMessage) && xmlErrorMessage.StartsWith("<"))
            {
                try
                {
                    var doc = XDocument.Parse(xmlErrorMessage);
                    return doc.Root.Attribute("Msg").Value;
                }
                catch (Exception)
                {
                    _logger.Error("Invalid xml content: " + xmlErrorMessage);

                }
            }

            return xmlErrorMessage;
        }
    }
}
