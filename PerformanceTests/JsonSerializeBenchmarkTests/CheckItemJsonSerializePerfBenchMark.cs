using BenchmarkDotNet.Attributes;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Core.DTO.Common;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace JsonSerializeBenchmarkTests
{
    public class CheckItemJsonSerializePerformance
    {
        private List<CheckedItem> _checkItems;

        [Params(15)]
        public int NumberOfParent { get; set; }

        [Params(100)]
        public int NumberOfChild { get; set; }

       // public IEnumerable<string> SubsidiaryList = new[] { "pp", "FHagent1", "AFB", "ap", "bb", "ek9", "erw", "gg", "GO", "hh", "iBO9", "jj", "lk8", "lz8", "mgk", "on1", "ori", "PDB", "PUBG", "SPM", "sve", "u2", "WC", "win", "TYM", "WABO", "WB1", "aibo", "dia18", "reg", "wls", "aifa", "lkf", "s125", "vnf", "12CUCI", "1m88", "1stmy", "24kb", "7e11", "7ELV11", "8kgcb", "918ks", "99md", "9KLAB", "a88bt", "aas7", "AB996", "ABT99", "AG888", "AK4747", "albb6", "ALP8", "alp88", "ap88", "aph88", "AR66", "ARSN8", "ASCT8", "AUTO88", "BAPE88", "bb88c", "BBJudi", "bbk8", "BBS22", "BBS998", "BC888", "be88a", "bet66", "bg68", "bj88", "BJK88", "BJY89", "BK33", "bk918", "bkcci", "BLK138", "bn77", "BNK88", "bns88", "BNTL88", "BO8A", "bossk", "bp99", "BP99A", "BPY33", "bsc88", "BSSK", "BST99", "bt66", "btab66", "bts88", "cbt77", "CCK", "CHL888", "CK8", "ckg8", "crn99", "CSHSP", "cylsb", "DB88", "dbp77", "dbt67", "DEA88", "DMC8", "dn99b", "DNW8", "dt88", "DTPD", "DWJD88", "EFC88", "esw77", "ew77", "EXT88", "EZBET96", "EZS", "FB99A", "FH96", "FMM99", "FP99", "fr88a", "FW88", "fw88a", "GBP88", "GBPY88", "gcup1", "GDBET", "GDM33", "GDN888", "gds88", "GDS888", "GLY188", "GOWIN8", "gs99", "gsc88", "gtb7", "GUCCI8", "HHM44", "HIGBT", "HR2K", "HR2U", "hrm66", "HTU88", "i1MG", "i1mls", "i1rya", "i1slot", "ibayar", "iby88", "ic88", "id88", "IFUN88", "iG918", "iGB88", "IJAYA88", "ijd88", "ijd918", "ijk88", "iJudi99", "ikea66", "IMJ88", "imng", "IMRT88", "ip99", "iPAY88", "ipay9", "iPlay77", "irg99", "iRYL88", "ISPORT", "iw77", "iwt99", "jd77o", "JD888", "jda38", "jda96", "jdkc8", "jdkl7", "jdks8", "JDQ88", "JDSN", "jdw66", "JDWINS", "JDWS", "JE88", "jk8", "jk8v", "jp99", "jta1", "jtw88", "juta1", "JUTA66", "JUTAB", "jvbt", "KARI8", "kc31", "kd85", "KDK", "kdk88", "KISS2U", "kk88a", "KL77A", "KLB77", "KLCC777", "kldg7", "KLM99", "KNG88", "KPJ88", "ksy98", "LIVE188", "lkb88", "LUCKY7", "lv88a", "LV95A", "lv99a", "lvp888", "LXBET88", "m555", "MAH8", "MARIKL", "MARVE88", "MAXX6", "MB2U88", "mby88", "mc99", "MCD99", "mco99", "mct94", "md88", "MDP88", "MEECR", "MEM33", "mg8m", "MGG888", "mgmst", "MIAMI8", "MICKEY88", "MIN888", "MK369A", "MK77", "MK8A", "MKO888", "mmk24", "MN888a", "MNM4U", "MOICT", "mr88", "mrb98", "MRCC", "mt888", "MTH4u", "mufc8", "mvp77", "my918", "myc88", "MYCC", "MYR88", "NCE89", "NKC88", "NSKY88", "oa88", "ojd88", "ok8a", "on88a", "ON959", "ongm", "OYES88", "Patek99", "PlayB", "plv88", "pn88", "PRMA8", "ps77", "PSG1970", "PSG888", "ptn8", "PVL99", "PWK88", "RA88C", "RAP88", "RAYA365", "RB77R", "RBT66", "rc88", "rjb77", "RLXK88", "RLY888", "RM188", "RM8", "rm888", "RM88A", "RMEMPT", "RND777", "rp88", "RUGI99", "RVR88", "ry88", "RYLC77", "ryr88", "S8BET", "SANDS", "SHELL7", "skg88", "smb8", "smb88", "SP88A", "SPD44", "SPD88", "SPIN99", "SPP88", "stb88", "SW38", "SWAY99", "sy99", "SYOK88", "Taxi666", "tghub", "TGST8", "tkn88", "TLV88", "TNG88", "tt68c", "tt88a", "TT99", "TTS888", "ubc88", "ubt88", "UEFA8", "UMIBET", "URUS88", "VF88", "VGS38", "VGS888", "VGW888", "VIP88", "vp99a", "VR7", "VS88", "vs96", "VTAGE", "wb88", "WBOX8", "WIN888", "WINLAGI", "WKL1", "wn319", "wolo99", "wsc88", "WUK38", "WWBet21", "WWE3", "WWWE88", "XB77", "yes88a", "YMHW", "ysb77", "YTBet", "boinclub", "boinvip", "tdm", "H89EASYWIN", "H89JDWIN66", "H89KINGCLUB", "H89LDKING", "H89MY918", "H89SDMBET", "H89WE88CITY", "HTWSIAM88", "HWT918KISSER", "HWTCASHBET", "HWTDBET67", "HWTKISSY918", "HWTRJBET77", "HWTUBET", "HWTYSBET777", "WF7ELEVEN11", "WFAIFAROYAL168", "WFALIBABA", "WFANT88BET", "WFASIABET99", "WFAVENGERS78", "WFAWCLUB88", "WFAWCLUB99", "WFBET4WIN88", "WFBET66ASIA", "WFBONUS888MYR", "WFBOSKU918", "WFBOSSKUCUCI", "WFBWIN77", "WFCYLBET", "WFDJKING77", "WFDW88", "WFEASYWIN77", "WFEMAS888", "WFEVOKING88", "WFFORWIN88", "WFG918", "WFGELAP88", "WFGENTINGLIVE", "WFGOLD8CITY", "WFGOLDENCITY33", "WFGOLDENSKY88", "WFGONBET88", "WFHHGROUP68", "WFHOLIDAY88", "WFI1RAYA", "WFIGBET99", "WFIKINGBET", "WFINFINITY27", "WFIPAY99", "WFISHARE68", "WFJCLUB55", "WFJCLUB99", "WFJILICLUB", "WFJSTAR888", "WFJUDIASIA388", "WFJUDIASIA96", "WFJUDIKCLUB", "WFJUDIKING777", "WFJUDIKISS88", "WFJUDIKISS918", "WFJUDIKL777", "WFJUDIVIP77", "WFJUTAWAN88", "WFKCLUB8", "WFKINGBET888", "WFKLDIGI7777", "WFKUDAKING", "WFLKF99", "WFLUCKYGOD88", "WFMANU888", "WFMARIBET98", "WFMAYBANK88", "WFMCDT88", "WFMEGABET", "WFMIYA88", "WFMUTAHKING88", "WFMY13ASIA", "WFMY1BET88", "WFON88A", "WFONGJUDI88", "WFPAVILION88", "WFPPCLUB8", "WFPPCLUB99", "WFPUSSY777", "WFROJAK888", "WFROYALASIA77", "WFROYALBETS", "WFROYALTY88", "WFSLOTKING88", "WFSMB88", "WFSYOK99", "WFTEBET", "WFTTGROUP168", "WFUBET996", "WFUBETCITY88", "WFVEGASS99", "WFWIN319", "WFWIN8BETS", "WFWINSCLUB888", "WFWK88", "WFWYNN33", "dgn", "dst", "dstcm", "dstg", "H891", "H892", "H893", "H89APATU", "H89BOSSWIN", "H89DCITY99", "H89EWBANK", "H89HONDA", "H89JDHARIMAU", "H89JOMCUCI918", "H89JOMPLAY", "H89JUDIKING", "H89JUTABET", "HILLBET88", "HWRMESTICUBAIBC", "HWT1PLAYMYR", "HWT1XJUDI", "HWT33JOY", "HWT33VEGAS", "HWT365WINNER", "HWT55FUN", "HWT5STARCLUB", "HWT918KING88", "HWT918KISS", "HWT918SLOT", "HWT95PANDA", "HWT96BIGBET", "HWTA33ASIA", "HWTA6STAR", "HWTABCJUDI", "HWTACBET88", "HWTACE55", "HWTACE8KH", "HWTACECLUB888", "HWTAISKACANG88", "HWTALIBABA888", "HWTALLADIN555", "HWTAMPMWALLET", "HWTANGKOR88", "HWTARG383IBC", "HWTASIA36", "HWTASIA818", "HWTASIA818VIET", "HWTASIA818VIP", "HWTATMONLINE", "HWTATSTAR99", "HWTAU88", "HWTAUD77", "HWTAUDGAMING8", "HWTAUDPOKIES", "HWTAUS88", "HWTAUSSIEBET888", "HWTAUWIN", "HWTAXIA88", "HWTB2WIN8", "HWTB4WINS", "HWTBAGUS545", "HWTBAGUS777", "HWTBAYARKING", "HWTBBC63", "HWTBBCLUBS1", "HWTBBJUDI", "HWTBBW918", "HWTBBWIN33", "HWTBCB88", "HWTBESTBET18", "HWTBESTWIN88", "HWTBESTWIN88IDR", "HWTBET22WIN", "HWTBET2WIN", "HWTBET33CLUB", "HWTBET8TH", "HWTBETNOW365", "HWTBETRON99", "HWTBETSUPER8", "HWTBFF99", "HWTBIGWIN88", "HWTBILLIONS8", "HWTBK991IBC", "HWTBMW2U", "HWTBMWCUAN", "HWTBND88IBC", "HWTBNPROWIN33", "HWTBOSC66", "HWTBOSKU77", "HWTBOSSKU96", "HWTBTLABMYR", "HWTBUNGARAYA55", "HWTBURGERKING2U", "HWTBURMAKING88", "HWTBW8", "HWTCANDYB", "HWTCASHKINGBET", "HWTCCCBET333", "HWTCFUN777", "HWTCHAMPION88", "HWTCHROME88", "HWTCOUNTERSTKIB", "HWTCRAZYCASH", "HWTCSK77", "HWTCTG99", "HWTCUCI99A", "HWTCUCIBOXIB", "HWTCYBERPUNK", "HWTDADDYWIN", "HWTDARLIE888", "HWTDIGI918A", "HWTDISNEY", "HWTDISNEYLAND", "HWTDKBET", "HWTDOLPHIN63", "HWTDOTMOD88", "HWTDUIT2U", "HWTDUITPOKOK", "HWTEASTOCEAN", "HWTEASYGET", "HWTEASYWIN96", "HWTEBET55", "HWTECLUB77IB", "HWTECWIN99", "HWTELEGAMA", "HWTELIT88", "HWTEMPEROR77", "HWTEMPIREJUDI", "HWTEPAY88AIB", "HWTEVA", "HWTEW77", "HWTEZKAYA77", "HWTFAST2WIN", "HWTFDPANDA99", "HWTFENDI555", "HWTFORTUNEWIN", "HWTG7CLUB", "HWTGALAXY77", "HWTGANDAM777", "HWTGANE4U", "HWTGANJA44", "HWTGBET", "HWTGBETLUCKY", "HWTGDL88", "HWTGENGMENG", "HWTGENTING99", "HWTGILAMUNTAH", "HWTGOD918", "HWTGOLDEN6", "HWTGOLDENWIN88", "HWTGOODLUCK99A", "HWTGORICH", "HWTGOWIN333", "HWTGRANDDIAMOND", "HWTHAPPY918", "HWTHAPPYWIN666", "HWTHARIHARICUCI", "HWTHARIMAU66", "HWTHARLEYBET88", "HWTHERO7IB", "HWTHERROIBET", "HWTHIGHWAY888", "HWTHOKI88", "HWTHWAUD", "HWTHWT888KINGMY", "HWTICE22", "HWTIDJDK88", "HWTIFUN", "HWTIGGAMING", "HWTIKAYARAYA77", "HWTIMANTAP", "HWTIMEGA99", "HWTINFINITY27", "HWTISTANABYIB", "HWTIWANG88", "HWTJADI007", "HWTJAGOMERAH", "HWTJAYA66", "HWTJBPLAY1", "HWTJCCBET", "HWTJD168IB", "HWTJDK918", "HWTJDSLOT77", "HWTJILI88", "HWTJJASIA88", "HWTJKWIN77", "HWTJM88A", "HWTJOKERGAMING", "HWTJOM8888", "HWTJOM918", "HWTJOMCUCI88", "HWTJOMCUCIIB", "HWTJOX88IB", "HWTJOYI77", "HWTJQKING81", "HWTJRBET66", "HWTJSM888", "HWTJUDI666", "HWTJUDIBET", "HWTJUDIBOX", "HWTJUDIEWALLET", "HWTJUDIHERO", "HWTJUDIKAYA77IB", "HWTJUDIKU88", "HWTJUDIONG918", "HWTJUDIQUEEN918", "HWTJUMPALAGI666", "HWTJY669", "HWTKAYABET77", "HWTKEDAIMESIN", "HWTKINGNET88", "HWTKINGS96", "HWTKINGSPIN88", "HWTKJJUDI", "HWTKK9WIN", "HWTKKBET33", "HWTKLUBMEWAH", "HWTKOBA88", "HWTKUATBAYAR88", "HWTKUATBOSSIBC", "HWTKUATCUCI", "HWTKUATWIN8", "HWTLAJU777", "HWTLAKSA77", "HWTLAZABET888", "HWTLGD22", "HWTLUCKIN918IB", "HWTLUCKY4U", "HWTLUCKY555", "HWTLUCKY77BET", "HWTLUCKYWIN88", "HWTLUCKZ", "HWTLVCLUB33", "HWTLVGAME", "HWTLYCITY88", "HWTM33IBC", "HWTMAHKOTAJUDI", "HWTMANIS888", "HWTMANTAP88", "HWTMARI888", "HWTMARI99", "HWTMARIJOIN666", "HWTMATBET88", "HWTMAYA33", "HWTMAYBET33", "HWTMBB33", "HWTMBOBET", "HWTMCD76", "HWTMCITY68", "HWTME918", "HWTMEEJUDI888", "HWTMEGA888CS", "HWTMEGA996", "HWTMEGABET888", "HWTMEGAWIN", "HWTMEJABAYARIB", "HWTMENANG44", "HWTMENANG88", "HWTMENANG918", "HWTMG888COMPANY", "HWTMHBET88", "HWTMONOPOLY", "HWTMOTOWIN8IB", "HWTMUSE88", "HWTMY11", "HWTMYBOS", "HWTMYHERO88A", "HWTMYR777", "HWTMYWIN161", "HWTNGK22", "HWTOCLBET", "HWTOCTO8ASIA", "HWTOGMARI4", "HWTOK4BET", "HWTOKWIN333", "HWTOLDTOWN88", "HWTOLYMPUS77", "HWTONECHP8IB", "HWTONEPIECE123", "HWTONG2YOUIB", "HWTONG777", "HWTONG918", "HWTONGX2", "HWTOTS126CLUB", "HWTPADU99", "HWTPANAS777", "HWTPANDA55IB", "HWTPBESKING", "HWTPEGASUS88", "HWTPIKACHU55", "HWTPIT777", "HWTPIZZA88A", "HWTPLAYAUD", "HWTPLAYTECH88", "HWTPP888", "HWTPREFECTWIN88", "HWTPREMIER", "HWTPROSPER77", "HWTPROWIN333", "HWTPSTORE88", "HWTPUTRAWIN", "HWTQRPAY888", "HWTRAJAJUDI", "HWTRAJAKING666", "HWTRAMAICUCI88", "HWTRAMLYBET", "HWTRG77", "HWTRIPLEH77", "HWTRM918", "HWTROCKET88IB", "HWTRON7UP", "HWTROYAL47", "HWTROYAL47KH", "HWTROYALBET33", "HWTROYALL7", "HWTRTS66", "HWTRTS66IBC", "HWTRYB33", "HWTSAGA77A", "HWTSAIGON99IB", "HWTSATAYKING8", "HWTSCRKISS", "HWTSCRPLAY", "HWTSEMPOI89", "HWTSENANG888", "HWTSHAREBRG", "HWTSHOPEE918", "HWTSKYWIN1IB", "HWTSLKING88", "HWTSLOTMACHINE", "HWTSLTKINGDOM7", "HWTSNORLAX88", "HWTSPEEDAU", "HWTSPINAUD", "HWTSPLUS88", "HWTSTARSPIN996", "HWTSTEADY2U", "HWTSTGAMING888", "HWTSTONED68IB", "HWTSUPER222", "HWTSYARIKAT918", "HWTTEHTRIK8", "HWTTELEBET99", "HWTTHEONE", "HWTTIPTOPBET88", "HWTTOKYOBET333", "HWTTOMMY88", "HWTTOPBET", "HWTTOPGUN99", "HWTTOPSPIN777", "HWTTOPWIN", "HWTTOTO108", "HWTTRUSTED778", "HWTTSABET", "HWTTT33A", "HWTTTCITY", "HWTTWCBETS", "HWTTWCBRUNEIIB", "HWTTWCCANADA", "HWTTWCMY", "HWTU2WALLET", "HWTUUSLOT88", "HWTV66", "HWTV777", "HWTVARC8", "HWTVEGAS888", "HWTVICECITY77", "HWTVKB47", "HWTVPOWER88", "HWTVTECKING77", "HWTVWINBET916", "HWTW8IDR", "HWTWAN2WIN", "HWTWANGMARI", "HWTWBET3", "HWTWDSKUY", "HWTWEALTHCLUB", "HWTWEKING88", "HWTWEPAY88IB", "HWTWGC33", "HWTWILDPOKIES1", "HWTWIN2UCC", "HWTWIN555BET", "HWTWIN9BET", "HWTWINBET9", "HWTWINBIGMYR", "HWTWINBOX3", "HWTWINCITY77", "HWTWINHARIHARI", "HWTWINS169", "HWTWINSAFE88", "HWTWINWAYS88", "HWTWKWIN8", "HWTWW99", "HWTXJOKER888", "HWTYESBOSS77", "HWTZONCUCIB", "PB1957IB", "ttbet18", "WFNAGA68", "FXV", "MTVNDTEST", "PPGVND", "WDYND", "YNX", "899", "df", "hao", "ht", "im88", "inr", "lt", "mg", "nb", "par", "sh", "shwe999", "v89", "VB", "bmwbet", "typhu88", "ms", "sbt", "xg", "5g", "ac77", "bdc8", "bw88", "jay8", "lgd", "trust88", "U996", "uup", "wgw", "q01", "q02", "q03", "q04", "q05", "q06", "q07", "q08", "q09", "q10", "q11", "q12", "q13", "q14", "q15", "qqy", "188", "SBS", "agent01", "sy", "A2001", "bwg", "offical", "XBYL", "100cuci", "1fb-rubic", "1m", "365cuci", "369", "500582", "518", "555clubkhr", "55vp", "5g5", "5g8", "5gb", "5gi", "5gm", "5gp", "5gth", "5gw", "5HB", "5MK", "5MY", "63P", "66W", "711", "777vip", "77judi", "79sun", "7pl", "91w", "92s", "98", "99m", "9mt", "9sd", "9th", "9uc", "a66play", "a89", "aaclub88", "ab", "ac", "ac10k", "ac2", "ace22", "ae", "ae8", "AEM", "afggame", "AGA", "ah", "AIA", "AIO", "ak", "AKJJ", "ali88play", "ane", "aone", "ap68", "AP8", "apg", "aq", "aqkrw", "AST", "ast8", "ASW", "ATG", "auqi", "aussiebt", "awb", "awi", "b28", "B31", "bajiplus", "bb288", "bbet13", "BBT", "BC2", "BE88", "best88", "bet78", "bet9", "betkkk", "bewin68", "bku", "blive", "bnw", "bq", "BS6", "bs8", "bsk", "bt8", "BW", "bwg01", "bwg02", "bwg03", "bwg04", "bwg06", "bwg07", "bwg08", "bwg09", "CA", "CAT", "cat66", "cfg", "cga", "CL7", "cn", "cr155kh", "csl", "cxb", "cxbpt", "DDB", "DG", "DJJ", "dk8", "dk88bet", "DS", "dsn", "DWJ", "E01", "easykaya", "ee88", "eelotto", "eew", "egm", "ek88", "ekhelo", "Ekplus8", "em", "erw3399", "est", "EZ11", "ezbet", "fbw", "FC1", "FC2", "FFID", "FFMY", "FFUS", "fg8", "FT118", "FUN", "FX", "FXS", "G1", "G2W", "game", "gbet8", "GCS103", "GDMY", "ggc", "gggame", "gi18", "GK8", "GM", "goodwin89", "gr", "grace", "gs001", "gs3", "gscn", "GT126", "GX", "GXF", "H5W", "h85", "hahabet", "hay88", "hbkh", "hbth", "HengWin", "HGGJ", "hl", "HLB", "HWT3WIN8", "HWTHOKIPLAY888", "HWTSHOPEE99A", "HWTTEHTARIK8", "i58", "ibc", "IBCSB", "IBS", "id", "ig8", "imb", "intna", "ipg", "JAPJUDI", "jdk988", "jf8", "jibets", "JINLI", "JK365", "JNH", "jqk", "JSUN", "jubo188", "JWM", "JWT", "k1", "k555", "kb68", "kb86", "kgb", "KTB", "L3", "l33", "L7", "la33myr", "LBET1", "LBOW", "LC8", "lcky6", "lets", "liveplay", "lixi88", "LKBX", "LKP", "LM888", "loctai", "lot", "loto188", "lotvn", "LS88", "luck8", "LUCKYMX", "luckywin99", "LVMY", "lx6", "lxkj", "LY", "ly7", "ly9", "M16", "m2", "m368", "M918", "m91judi", "MA88", "mari444", "mbi", "mbi8", "MCMX", "ME88", "megaking88", "mgp", "mig8", "MJ", "mk", "MK88", "mlf", "mlyl", "mnc", "MPM57", "mrtcity", "MSU", "mtap", "mw7", "mx7", "MYB", "nb7", "nwcity", "nx50", "ocean11", "oh789", "ong", "ongcuci", "oren33", "P01", "p7u", "pcg", "PE", "pgmas", "pgvn", "pja", "pk", "ply", "porsche77", "PR", "PR1", "prs", "prt", "pxbrl", "QG", "qrb", "qt", "qyqy", "r7", "RB", "red36", "res", "RESIBC", "rgroup", "RP1", "RP2", "RP3", "RP4", "RP5", "RP6", "RP7", "RP8", "rubicplay", "RXM", "ryl6", "ryld", "s11", "s2u", "s666", "S9", "S918", "SC", "SC88", "scrk", "seven2umyr", "sg3d", "sg4u", "SGCS", "shaba", "shgj", "sky", "sn8", "snk", "Squeen668", "st", "st7", "starbox", "str99", "sunclub", "sunclub33", "t2c", "tbet", "testonly", "testonly2", "tf", "TFG", "tgp", "TH", "th99", "ThaiMillion", "top", "tp88", "trust888", "TTC", "ttiao", "TWC", "tx2", "ub99vip", "UCT", "ufabet88", "ug", "ug88", "ums", "umy", "utb", "uus", "uwin24", "v", "V5L", "V77CLUB", "vfu", "vg8", "vl8", "vn", "vnd", "vnloto", "vs", "VTH", "VV99", "VVN", "VW7", "VW88", "vzb", "w2b", "W33", "w85", "W99", "waja33", "WB", "WB3", "wbet", "wcm", "wct", "WFAIFAROYAL888", "wfb", "WG", "wgm", "WGW88", "WIB", "will8", "win813", "win8bet", "winbet", "wincity888", "wira888", "wk", "WM", "wm96club", "woc44", "wpbet", "wqb6", "WWF", "X77", "XF", "xl", "YATOU", "yb", "yb9", "YBC", "YBGJ", "YBJ", "YBK", "YBMY", "yee", "YES", "yes2d", "Yesclub88", "yfsh", "Z06", "zt188", "ztbox" };

        [GlobalSetup]
        public void Setup()
        {
            _checkItems = new List<CheckedItem>();
            for (int i = 0; i < NumberOfParent; i++)
            {
                var checkItem = new CheckedItem
                {
                    ID = i,
                    Name = $"Parent {i}",
                    Children = new List<CheckedItem>()
                };
                var children = new List<CheckedItem>();
                for (int j = 0; j < NumberOfChild; j++)
                {
                    children.Add(new CheckedItem
                    {
                        ID = i+j,
                        Name = $"Child {i+j}"
                    });
                }
                checkItem.Children = children;
                _checkItems.Add(checkItem);
            }
        }

        //[Benchmark]
        //public string SerializeWithNewtonsoftJson()
        //    => JsonConvert.SerializeObject(_checkItems);.


        [Benchmark]
        public string SerializeWithCurrentState()
        {
            var children = GetChildrenDistinct();
            var json = children.ToJson();
            return _checkItems.ToJsonWithServiceStack();
        }

        [Benchmark]
        public string SerializeWithNoChildrenSerialize()
        {
            var children = GetChildrenDistinct();
            return _checkItems.ToJsonWithServiceStack();
        }

        [Benchmark]
        public string SerializeWithServiceStackJsonOnly()
        {
            var children = GetChildrenDistinct();
            var json = children.ToJsonWithServiceStack();

            return _checkItems.ToJsonWithServiceStack();
        }

        //[Benchmark]
        //public string SerializeWithDefaultJson()
        //{
        //    return _checkItems.ToJson();
        //}

        [Benchmark]
        public string SerializeWithCustomJson()
        {
            var children = GetChildrenDistinct();
            var json = children.ToJsonWithServiceStack();
            return SerializeWithCustomJson(_checkItems);
        }

        private IEnumerable<string> GetChildrenDistinct()
            => _checkItems.SelectMany(x => x.Children.Select(y => y.Value)).Distinct();

        private string SerializeWithCustomJson(List<CheckedItem> checkItems)
        {
            using (var sw = new StringWriter())
            {
                JsonTextWriter writer = new JsonTextWriter(sw);

                // [
                writer.WriteStartArray();

                foreach (var item in checkItems)
                {
                    writer.WriteStartObject();
                    writer.WritePropertyName("ID");
                    writer.WriteValue(item.ID);
                    writer.WritePropertyName("Name");
                    writer.WriteValue(item.Name);
                    writer.WritePropertyName("Value");
                    writer.WriteValue(item.Value);
                    writer.WritePropertyName("Checked");
                    writer.WriteValue(item.Checked);

                    writer.WritePropertyName("Children");
                    writer.WriteStartArray();
                    foreach (var child in item.Children)
                    {
                        writer.WriteStartObject();
                        writer.WritePropertyName("ID");
                        writer.WriteValue(item.ID);
                        writer.WritePropertyName("Name");
                        writer.WriteValue(item.Name);
                        writer.WritePropertyName("Value");
                        writer.WriteValue(item.Value);
                        writer.WritePropertyName("Checked");
                        writer.WriteValue(item.Checked);
                        writer.WriteEndObject();
                    }
                    writer.WriteEndArray();
                    writer.WriteEndObject();
                }

                writer.WriteEndArray();

                return sw.ToString();
            }

        }
    }
}
