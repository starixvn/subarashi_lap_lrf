namespace Fanex.Athena.Module.PlayerAdmin.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using System.Xml.Linq;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Common;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Fanex.Logging;

    public class DcsBetSettingRepository : IDcsBetSettingRepository
    {
        private readonly IDbFactory _db;

        private readonly ILogger _logger;

        public DcsBetSettingRepository(IDbFactory dbFactory, ILogger logger)
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
                            SportId = reader.ToString("sporttype"),
                            BetType = reader.ToInt("bettype")
                        });
                    }
                }
            }

            return dataList;
        }

        public async Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitMetaModel metaModel)
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

        private static void AddUpdateParameter(IObjectDb db, PlayerBetLimitMetaModel metaModel)
        {
            db.SetParameterValue("custid", metaModel.CustId);
            db.SetParameterValue("userid", metaModel.UserId);
            db.SetParameterValue("ip", metaModel.Ip);
            db.SetParameterValue("betlimit", BuildBetLimitParameter(metaModel.Setting));
            db.SetParameterValue("errcode", null);
            db.SetParameterValue("errmsg", null);
        }

        private static string BuildBetLimitParameter(IEnumerable<PlayerBetLimitItemMetaModel> setting)
        {
            const string XMLPattern = "<ROOT>{0}</ROOT>";
            const string XMLElement = "<BetLimit SportType=\"{0}\" BetType=\"{1}\" MinBet=\"{2}\" MaxBet=\"{3}\" MaxPerMatch=\"{4}\" ></BetLimit>";

            var xmlElementBuilder = new StringBuilder();

            foreach (var item in setting)
            {
                xmlElementBuilder.Append(string.Format(XMLElement, item.SportId, item.BetType, item.MinBet, item.MaxBet, item.MaxPerMatch));
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
