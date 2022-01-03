var Mahjong = {};

var MAHJONG = (function() {
	// 設定
	var imgPath = "./assets/images/";
	var wavPath = "./assets/wav/";
	var mp3Path = "./assets/mp3/";
	var timerInterval = 300;

	// 定数
	var paiMax = 136;
	var paiCategoryManzu = 0;
	var paiCategoryPinzu = 1;
	var paiCategorySouzu = 2;
	var paiCategoryKaze = 3;
	var paiCategorySangen = 4;
	var paiCategoryOther = 5;
	var paiCategoryMax = 6;

	var paiAttrChunchan = 0;
	var paiAttrRoutou = 1;
	var paiAttrJi = 2;
	var paiAttrMax = 3;

	var paiIdx1 = 0;
	var paiIdx2 = 1;
	var paiIdx3 = 2;
	var paiIdx4 = 3;
	var paiIdx5 = 4;
	var paiIdx6 = 5;
	var paiIdx7 = 6;
	var paiIdx8 = 7;
	var paiIdx9 = 8;
	var paiIdxTon = 0;
	var paiIdxNan = 1;
	var paiIdxSya = 2;
	var paiIdxPei = 3;
	var paiIdxHaku = 0;
	var paiIdxHatsu = 1;
	var paiIdxChun = 2;
	var paiIdxUra1 = 0;
	var paiIdxUra2 = 1;

	var playerUser = 0;
	var player1 = 1;
	var player2 = 2;
	var player3 = 3;
	var playerMax = 4;
	var playerChkList = 4;
	var playerNull = 5;

	var playerRight = 1;
	var playerTop = 2;
	var playerLeft = 3;

	var posYama = 0;
	var posTe = 1;
	var posNaki = 2;
	var posField = 3;
	var posDora = 4;

	var nakiCategoryNull = 0;
	var nakiCategoryPon = 1;
	var nakiCategoryChii = 2;
	var nakiCategoryAnkan = 3;
	var nakiCategoryMinkan = 4;
	var nakiCategoryMax = 5;

	var scoreAttrOyaTsumo = 0;
	var scoreAttrOyaRon = 1;
	var scoreAttrKoTsumoKo = 2;
	var scoreAttrKoTsumoOya = 3;
	var scoreAttrKoRon = 4;

	var paiKoutsuChunchan = 0;
	var paiKoutsuYaochu = 1;
	var paiPonChunchan = 2;
	var paiPonYaochu = 3;
	var paiAnkanChunchan = 4;
	var paiAnkanYaochu = 5;
	var paiMinkanChunchan = 6;
	var paiMinkanYaochu = 7;
	var paiToitsuJikaze = 8;
	var paiToitsuBakaze = 9;
	var paiToitsuSangen = 10;
	var paiMachiFu = 11;
	var paiFuMax = 12;

	var paiFuKoutsuChunchan = 4;
	var paiFuKoutsuYaochu = 8;
	var paiFuPonChunchan = 2;
	var paiFuPonYaochu = 4;
	var paiFuAnkanChunchan = 16;
	var paiFuAnkanYaochu = 32;
	var paiFuMinkanChunchan = 8;
	var paiFuMinkanYaochu = 16;
	var paiFuToitsuJikaze = 2;
	var paiFuToitsuBakaze = 2;
	var paiFuToitsuSangen = 2;
	var paiFuMachiFu = 2;

	var paiFuTbl = [
		paiFuKoutsuChunchan,
		paiFuKoutsuYaochu,
		paiFuPonChunchan,
		paiFuPonYaochu,
		paiFuAnkanChunchan,
		paiFuAnkanYaochu,
		paiFuMinkanChunchan,
		paiFuMinkanYaochu,
		paiFuToitsuJikaze,
		paiFuToitsuBakaze,
		paiFuToitsuSangen,
		paiFuMachiFu
	];

	var idChii = 0;
	var idPon = 1;
	var idMinkan = 2;
	var idRon = 3;
	var idAnkan = 4;
	var idRiichi = 5;
	var idTsumo = 6;
	var idMax = 7;

	var startPaiMax = 13;
	var yamaPaiMax = 17;
	var demeMax = 12;
	var startTsumoMax = Math.floor((startPaiMax * 4) / 2);
	var doraMax = 10;
	var tsumoMax = paiMax - ((startPaiMax * 4) + (7 * 2));

	var tonpuSen = 0;
	var nanpuSen = 4;
	var gameEndCnt = 8;

	var playerNameList = [
		"暮井慧",
		"フィネス・H",
		"戸増千由莉",
		"美雲このは"
	];

	var playerGraphicList = {
		"暮井慧": ["graphic11.png", "graphic12.png", "graphic13.png", "graphic14.png", "graphic15.png"],
		"フィネス・H": ["graphic21.png", "graphic22.png", "graphic23.png", "graphic24.png", "graphic25.png"],
		"戸増千由莉": ["graphic31.png", "graphic32.png", "graphic33.png", "graphic34.png", "graphic35.png"],
		"美雲このは": ["graphic41.png", "graphic42.png", "graphic43.png", "graphic44.png", "graphic45.png"]
	};

	var voiceChii = 0;
	var voicePon = 1;
	var voiceKan = 2;
	var voiceTsumo = 3;
	var voiceRon = 4;
	var voiceRiichi = 5;
	var voiceTenpai = 6;
	var voiceNoten = 7;

	var playerVoiceList = ({
		"暮井慧": ["voice11.wav", "voice12.wav", "voice13.wav", "voice14.wav", "voice15.wav", "voice16.wav", "voice17.wav", "voice18.wav"],
		"フィネス・H": ["voice21.wav", "voice22.wav", "voice23.wav", "voice24.wav", "voice25.wav", "voice26.wav", "voice27.wav", "voice28.wav"],
		"戸増千由莉": ["voice31.wav", "voice32.wav", "voice33.wav", "voice34.wav", "voice35.wav", "voice36.wav", "voice37.wav", "voice38.wav"],
		"美雲このは": ["voice11.wav", "voice12.wav", "voice13.wav", "voice14.wav", "voice15.wav", "voice16.wav", "voice17.wav", "voice18.wav"]
	});

	var playerBonusList = ({
		"暮井慧": ["bonus11", "bonus12"],
		"フィネス・H": ["bonus21", "bonus22"],
		"戸増千由莉": ["bonus31", "bonus32"],
		"美雲このは":  ["bonus41", "bonus42"]
	});

	var categoryList = ["A", "B", "C", "D", "E", "F"];
	var paiIdTbl = ["pai_bottom", "pai_right", "pai_top", "pai_left"];
	var yamaIdTbl = ["yama_bottom", "yama_right", "yama_top", "yama_left"];
	var fieldIdTbl = ["field_bottom", "field_right", "field_top", "field_left"];
	var nakiIdTbl = ["naki_bottom", "naki_right", "naki_top", "naki_left"];
	var riichiIdTbl = ["riichi_bottom", "riichi_right", "riichi_top", "riichi_left"];

	var chkNext = 0;
	var chkTrue = 1;
	var chkFalse = 2;

	// 型
	var paiData = function() {
		this.category = -1;
		this.attr = -1;
		this.listIdx = -1;
		this.idx = -1;
		this.pos = -1;
		this.player = -1;
		this.dora = -1;
		this.aka = false;
		this.nakiCategory = -1;
		this.nakiPlayer = false;
	}

	var bonusData = function(player, idx) {
		this.player = player;
		this.idx = idx;
	}

	// 変数
	var timerId;
	var timerEnabled = false;
	var playerMenu = false;
	var playerNakiMenu = false;

	var paiList = new Array(paiMax);
	for (var i = 0; i < paiList.length; i++)
		paiList[i] = new paiData();

	var playerList = new Array(playerMax + 1);
	for (var i = 0; i < playerList.length; i++)
		playerList[i] = new Array();

	var playerNakiList = new Array(playerMax + 1);
	for (var i = 0; i < playerNakiList.length; i++)
		playerNakiList[i] = new Array();

	var playerSuteList = new Array(playerMax);
	for (var i = 0; i < playerSuteList.length; i++)
		playerSuteList[i] = new Array();

	var playerSekiList = new Array(playerMax);
	for (var i = 0; i < playerSekiList.length; i++)
		playerSekiList[i] = i;

	var playerUserList = new Array(playerMax);
	var scoreList = new Array(playerMax);
	var prevScoreList = new Array(playerMax);

	var doraList = new Array();

	var fieldCnt = new Array(playerMax);
	for (var i = 0; i < playerMax; i++)
		fieldCnt[i] = 0;

	var paiCnt, yama, deme, tsumoPai, tsumoYama, sai1, sai2;
	var doraYama, doraStart, doraCnt;
	var gameCnt, oyaCnt, playerCnt, nowCnt, renchanCnt, riichiCnt;
	var gameStart = false
	var gameEnd = false
	var gameExit = false;
	var playerTsumo;
	var shitaTsumo, isRiichi, isChii, isKan, isDora, isChiitoi;
	var suteIdx;
	var nakiCnt, nakiStartCnt;
	var nakiIdx = new Array(3);

	var bonusIdx;
	var bonusCnt;
	var bonusTimerId;
	var bonusList = new Array();
	var bonusCnt1 = 20000;
	var bonusCnt2 = 8000;

	// 定数(役判定)
	var paiTanki = 0;
	var paiRyanmen = 1;
	var paiPenchan = 2;
	var paiToitsu = 3;
	var paiKanchan = 4;
	var paiSyuntsu = 5;
	var paiKoutsu = 6;
	var paiChii = 7;
	var paiPon = 8;
	var paiAnkan = 9;
	var paiMinkan = 10;
	var machiMax = 11;

	var paiSyuntsuStart = 12;
	var paiSyuntsuCenter = 13;
	var paiSyuntsuEnd = 14;

	var syuntsu123 = 0;
	var syuntsu234 = 1;
	var syuntsu345 = 2;
	var syuntsu456 = 3;
	var syuntsu567 = 4;
	var syuntsu678 = 5;
	var syuntsu789 = 6;
	var syuntsuMax = 7;

	var kazeStrTbl = ["東", "南", "西", "北"];

	var yakuTbl = {
		"立直": 1,
		"一発": 1,
		"門前清自摸和": 1,
		"断么九": 1,
		"平和": 1,
		"一盃口": 1,
		"自風": 1,
		"場風": 1,
		"白": 1,
		"發": 1,
		"中": 1,
		"嶺上開花": 1,
		"槍槓": 1,
		"海底摸月": 1,
		"河底撈魚": 1,
		"三色同順": 2,
		"一気通貫": 2,
		"混全帯么九": 2,
		"七対子": 2,
		"対々和": 2,
		"三暗刻": 2,
		"混老頭": 2,
		"三色同刻": 2,
		"三槓子": 2,
		"小三元": 2,
		"ダブル立直": 2,
		"混一色": 3,
		"純全帯么九": 3,
		"二盃口": 3,
		"清一色": 6,
		"国士無双": 13,
		"四暗刻": 13,
		"大三元": 13,
		"字一色": 13,
		"小四喜": 13,
		"大四喜": 13,
		"緑一色": 13,
		"清老頭": 13,
		"四槓子": 13,
		"九蓮宝燈": 13,
		"天和": 13,
		"地和": 13
	};

	var hanYakuman = 13;

	var scoreKoTsumoTbl = [
		[   0,  300,  400,  400,  500,  600,  700,  800],
		[ 400,  500,  700,  800, 1000, 1200, 1300, 1500],
		[ 700, 1000, 1300, 1600, 2000, 2000, 2000, 2000],
		[1300, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
		[2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
		[3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
		[3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000],
		[4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
		[4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
		[4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
		[6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000],
		[6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000],
		[8000, 8000, 8000, 8000, 8000, 8000, 8000, 8000]
	];

	var scoreOyaTsumoTbl = [
		[    0,   500,  700,   800,   1000,  1200,  1300,  1500],
		[  700,  1000, 1300,  1600,   2000,  2300,  2600,  2900],
		[ 1300,  2000, 2600,  3200,   3900,  4000,  4000,  4000],
		[ 2600,  3900, 4000,  4000,   4000,  4000,  4000,  4000],
		[ 4000,  4000, 4000,  4000,   4000,  4000,  4000,  4000],
		[ 6000,  6000, 6000,  6000,   6000,  6000,  6000,  6000],
		[ 6000,  6000, 6000,  6000,   6000,  6000,  6000,  6000],
		[ 8000,  8000, 8000,  8000,   8000,  8000,  8000,  8000],
		[ 8000,  8000, 8000,  8000,   8000,  8000,  8000,  8000],
		[ 8000,  8000, 8000,  8000,   8000,  8000,  8000,  8000],
		[12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000],
		[12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000],
		[16000, 16000, 16000, 16000, 16000, 16000, 16000, 16000]
	];

	var scoreKoRonTbl = [
		[ 1000,  1300,  1600,  2000,  2300,  2600,  2900,  3200],
		[ 2000,  2600,  3200,  3900,  4500,  5200,  5800,  6400],
		[ 3900,  5200,  6400,  7700,  8000,  8000,  8000,  8000],
		[ 7700,  8000,  8000,  8000,  8000,  8000,  8000,  8000],
		[ 8000,  8000,  8000,  8000,  8000,  8000,  8000,  8000],
		[12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000],
		[12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000],
		[16000, 16000, 16000, 16000, 16000, 16000, 16000, 16000],
		[16000, 16000, 16000, 16000, 16000, 16000, 16000, 16000],
		[16000, 16000, 16000, 16000, 16000, 16000, 16000, 16000],
		[24000, 24000, 24000, 24000, 24000, 24000, 24000, 24000],
		[24000, 24000, 24000, 24000, 24000, 24000, 24000, 24000],
		[32000, 32000, 32000, 32000, 32000, 32000, 32000, 32000]
	];

	var scoreOyaRonTbl = [
		[ 1500,  2000,  2400,  2900,  3400,  3900,  4400,  4800],
		[ 2900,  3900,  4800,  5800,  6800,  7700,  8700,  9600],
		[ 5800,  7700,  9600, 11600, 12000, 12000, 12000, 12000],
		[11600, 12000, 12000, 12000, 12000, 12000, 12000, 12000],
		[12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000],
		[18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000],
		[18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000],
		[24000, 24000, 24000, 24000, 24000, 24000, 24000, 24000],
		[24000, 24000, 24000, 24000, 24000, 24000, 24000, 24000],
		[24000, 24000, 24000, 24000, 24000, 24000, 24000, 24000],
		[36000, 36000, 36000, 36000, 36000, 36000, 36000, 36000],
		[36000, 36000, 36000, 36000, 36000, 36000, 36000, 36000],
		[42000, 42000, 42000, 42000, 42000, 42000, 42000, 42000]
	];

	// 型(役判定)
	var categoryData = function() {
		this.idx = -1;
		this.syuntsuIdx = -1;
		this.koutsuIdx = -1;
		this.chiiIdx = -1;
		this.ponIdx = -1;
		this.ankanIdx = -1;
		this.minkanIdx = -1;
		this.idxTbl = new Array(paiIdx9);
		this.syuntsuTbl = new Array(syuntsuMax);
		this.koutsuTbl = new Array(paiIdx9);
	}

	var riichiData = function() {
		this.idx = -1;
		this.enabled = false;
		this.ippatsu = false;
		this.naki = false;
	}

	var yakuData = function(arg1, arg2) {
		this.name = arg1;
		this.hanCnt = arg2;
	}

	// 変数(役判定)
	var tehaiTbl = new Array(startPaiMax + 1);
	var categoryTbl = new Array(paiCategoryMax);
	var attrCntTbl = new Array(paiAttrMax);
	var machiCntTbl = new Array(machiMax);
	var machiSubTbl = new Array(machiMax);

	var categoryCntTbl = new Array(paiCategoryMax);
	for (var i = 0; i < categoryTbl.length; i++)
		categoryTbl[i] = new categoryData();

	var tehaiMachiTbl = new Array(playerMax + 1);
	for (var i = 0; i < tehaiMachiTbl.length; i++)
		tehaiMachiTbl[i] = new Array(20);

	var playerRiichi = new Array(playerMax);
	for (var i = 0; i < playerRiichi.length; i++)
		playerRiichi[i] = new riichiData();

	var yakuList = new Array();
	var paiFuCntTbl = new Array(paiFuMax);

	var tenpaiList = new Array(playerMax);

	// 画像インデックス取得
	function getGraphicIndex(arg1) {
		var i = scoreList[arg1];
		if (i > 20000) {
			return 0;
		} else if (i > 15000) {
			return 1;
		} else if (i > 10000) {
			return 2;
		} else if (i > 5000) {
			return 3;
		} else {
			return 4;
		}
	}

	// 名前表示
	function showName() {
		var i = playerUserList[playerUser];
		var j = getGraphicIndex(playerUser);
		$("#chara_bottom").css({ "background-image" : "url(" + imgPath + "chara/" + playerGraphicList[playerNameList[i]][j] + ")" });
		$("#chara_name_bottom").html(playerNameList[playerUser]);
		i = playerUserList[playerRight];
		j = getGraphicIndex(playerRight);
		$("#chara_right").css({ "background-image" : "url(" + imgPath + "chara/" + playerGraphicList[playerNameList[i]][j] + ")" });
		$("#chara_name_right").html(playerNameList[i]);
		i = playerUserList[playerTop];
		j = getGraphicIndex(playerTop);
		$("#chara_top").css({ "background-image" : "url(" + imgPath + "chara/" + playerGraphicList[playerNameList[i]][j] + ")" });
		$("#chara_name_top").html(playerNameList[i]);
		i = playerUserList[playerLeft];
		j = getGraphicIndex(playerLeft);
		$("#chara_left").css({ "background-image" : "url(" + imgPath + "chara/" + playerGraphicList[playerNameList[i]][j] + ")" });
		$("#chara_name_left").html(playerNameList[i]);
		for (i = 0; i < playerMax; i++) {
			switch (getPlayerCnt((oyaCnt + i) % nanpuSen)) {
				case playerUser:
					$("#kaze_bottom").html(kazeStrTbl[i]);
					break;
				case playerRight:
					$("#kaze_right").html(kazeStrTbl[i]);
					break;
				case playerTop:
					$("#kaze_top").html(kazeStrTbl[i]);
					break;
				case playerLeft:
					$("#kaze_left").html(kazeStrTbl[i]);
					break;
			}
		}
	}

	// 点数表示
	function showScore() {
		$("#chara_score_bottom").html(scoreList[playerUser]);
		$("#chara_score_left").html(scoreList[playerLeft]);
		$("#chara_score_top").html(scoreList[playerTop]);
		$("#chara_score_right").html(scoreList[playerRight]);
	}

	// データ表示
	function showData(arg1) {
		$("#kaze_bottom").css({ backgroundColor: "" });
		$("#kaze_right").css({ backgroundColor: "" });
		$("#kaze_top").css({ backgroundColor: "" });
		$("#kaze_left").css({ backgroundColor: "" });
		switch (arg1) {
			case playerUser:
				$("#kaze_bottom").css({ backgroundColor: "#069" });
				break;
			case playerRight:
				$("#kaze_right").css({ backgroundColor: "#069" });
				break;
			case playerTop:
				$("#kaze_top").css({ backgroundColor: "#069" });
				break;
			case playerLeft:
				$("#kaze_left").css({ backgroundColor: "#069" });
				break;
		}
		$("#pai_cnt").html(paiCnt - 1);
		$("#sai1").attr("src", getSaiSrc(sai1 + 1));
		$("#sai2").attr("src", getSaiSrc(sai2 + 1));
	}

	// メッセージ表示
	function showMessage(arg1, arg2, arg3) {
		$("#game_cnt").html(kazeStrTbl[Math.floor(arg1 / nanpuSen)] + " " + (arg1 % 4 + 1) + " 局");
		$("#riibou_cnt").html(arg2);
		$("#renchan_cnt").html(arg3);
	}

	// リーチ表示
	function showRiichi(arg1) {
		$("#" + riichiIdTbl[arg1]).css("visibility", "visible");
	}

	// 対局結果表示
	function showDialog(arg1, arg2, arg3, arg4) {
		hidePlayerMenu();
		hidePlayerNakiMenu();
		var s;
		$("#dialog_name").html(kazeStrTbl[Math.floor(arg2 / nanpuSen)] + " " + (arg2 % 4 + 1) + " 局");
		if (renchanCnt > 0)
			$("#dialog_name").append("&nbsp;&nbsp;" + arg3 + " 本場");
		if (arg4 != "")
			$("#dialog_name").append("&nbsp;&nbsp;&nbsp;&nbsp;" + arg4);
		$("#dialog_pai").html("");
		$("#dialog_text").html("");
		if (arg4 == "ロン" || arg4 == "ツモ") {
			// 手牌
			for (var i = 0; i < playerList[arg1].length; i++) {
				with (paiList[playerList[arg1][i].split(":")[3]])
					s = getPaiSrc(playerUser, category, idx, aka);
				if (i == playerList[arg1].length - 1)
					$("#dialog_pai").append("&nbsp;&nbsp;");
				$("#dialog_pai").append("<img src='" + s + "'/>");
			}
			// 鳴牌
			for (var i = 0; i < playerNakiList[arg1].length; i++) {
				var idx = playerNakiList[arg1][i].split(":")[3];
				if (paiList[idx].nakiCategory == nakiCategoryAnkan && paiList[idx].nakiPlayer) {
					s = getPaiSrc(playerUser, paiCategoryOther, paiIdxUra1, aka);
				} else {
					with (paiList[idx]) {
						if (nakiPlayer)
							s = getPaiSrc(playerRight, category, idx, aka);
						else
							s = getPaiSrc(playerUser, category, idx, aka);
					}
				}
				if (i == 0)
					$("#dialog_pai").append("&nbsp;&nbsp;&nbsp;&nbsp;");
				$("#dialog_pai").append("<img src='" + s + "'/>");
			}
			// 役
			for (var i = 0; i < yakuList.length; i++) {
				var tmpHanCnt = yakuList[i].hanCnt;
				var tmpName = yakuList[i].name;
				if (tmpHanCnt)
					$("#dialog_text").append("<span style='display: inline-block; width: 140px;'>" + tmpName + "</span><span align='right' style='display: inline-block; width: 100px;'>" + tmpHanCnt + " 飜" + "</span><br/>");
				else
					$("#dialog_text").append("<span style='display: inline-block; width: 140px;'></span><span align='right' style='display: inline-block; width: 100px;'>" + tmpName + "</span><br/>");
			}
		}
		if (arg4 == "流局") {
			// 聴牌
			for (var i = 0; i < tenpaiList.length; i++) {
				var tmpName = playerNameList[playerUserList[i]];
				$("#dialog_text").append("<span style='display: inline-block; width: 140px;'>" + tmpName + "</span><span align='right' style='display: inline-block; width: 100px;'>" + (tenpaiList[i] ? "テンパイ" : "ノーテン") + "</span><br/>");
			}
			if (tenpaiList[playerUser]) {
				playVoice(playerUser, voiceTenpai);
			} else {
				playVoice(playerUser, voiceNoten);
			}
		}
		s = ["chara_score_bottom", "chara_score_right", "chara_score_top", "chara_score_left"];
		for (var i = 0; i < playerMax; i++) {
			var score = scoreList[i] - prevScoreList[i];
			$("#" + s[i]).html(score >= 0 ? ("+" + score) : score);
		}
		$("#dialog").fadeIn("fast");
	}

	// メニュー表示
	function showPlayerMenu(arg1) {
		if (!playerMenu) {
			$("#btn_ankan").hide();
			$("#btn_riichi").hide();
			$("#btn_tsumo").hide();
		}
		switch (arg1) {
			case idAnkan:
				$("#btn_ankan").show();
				break;
			case idRiichi:
				$("#btn_riichi").show();
				break;
			case idTsumo:
				$("#btn_tsumo").show();
				break;
		}
		$("#player_menu").fadeIn("fast");
		playerMenu = true;
	}

	// メニュー非表示
	function hidePlayerMenu() {
		$("#player_menu").hide();
		playerMenu = false;
	}

	// 鳴きメニュー表示
	function showPlayerNakiMenu(arg1) {
		if (!playerNakiMenu) {
			$("#btn_chii").hide();
			$("#btn_pon").hide();
			$("#btn_minkan").hide();
			$("#btn_ron").hide();
		}
		switch (arg1) {
			case idChii:
				$("#btn_chii").show();
				break;
			case idPon:
				$("#btn_pon").show();
				break;
			case idMinkan:
				$("#btn_minkan").show();
				break;
			case idRon:
				$("#btn_ron").show();
				break;
		}
		$("#player_naki_menu").fadeIn("fast");
		playerNakiMenu = true;
	}

	// 鳴きメニュー非表示
	function hidePlayerNakiMenu() {
		$("#player_naki_menu").hide();
		playerNakiMenu = false;
	}

	// 画面初期化
	function initScreen() {
		for (var i = 0; i < playerMax; i++) {
			for (var p = 1; p <= 14; p++)
				$("#" + paiIdTbl[i] + p).attr("src", getTransSrc(i));
			for (var p = 0; p <= 18; p++)
				$("#" + yamaIdTbl[i] + p).attr("src", getTransSrc(i));
			for (var p = 1; p <= 30; p++)
				$("#" + fieldIdTbl[i] + p).attr("src", getTransSrc(i));
			for (var p = 1; p <= 20; p++)
				$("#" + nakiIdTbl[i] + p).attr("src", getTransSrc(i));
			$("#" + riichiIdTbl[i]).css("visibility", "hidden");
		}
		for (var i = 0; i < playerMax; i++)
			fieldCnt[i] = 0;
	}

	// 新規ゲーム
	function newGame() {
		// キャラをシャッフル
		var i = playerNameList.length;
		while (i) {
			var p = Math.floor(Math.random() * i);
			var q = playerNameList[--i];
			// プレイヤーを固定
			/*
			if (p == 0)
				continue;
			*/
			playerNameList[i] = playerNameList[p];
			playerNameList[p] = q;
		}
		timerEnabled = false;
		clearTimeout(timerId);
		hidePlayerMenu();
		hidePlayerNakiMenu();
		doBagime();
		initScoreList();
		gameCnt = 0;
		oyaCnt = 0;
		riibouCnt = 0;
		renchanCnt = 0;
		showName();
		showScore();
	}

	// ゲーム開始
	function startGame() {
		playAudio(mp3Path + "audio1.mp3");
		gameStart = true;
		gameEnd = false;
		isRiichi = false;
		isChii = false;
		isKan = false;
		isDora = false;
		initScreen();
		clearPlayerList();
		initPaiList();
		playerCnt = getPlayerCnt(oyaCnt);
		nowCnt = playerCnt;
		paiCnt = tsumoMax;
		getDeme(playerCnt);
		setDoraStart();
		showYama();
		setStartTsumo();
		getDora();
		showDora();
		for (var i = 0; i < playerMax; i++) {
			playerRiichi[i].idx = 0;
			getStartPai(i);
			showPai(i, false);
			clearTsumoPai(i);
			// デバッグ(B)
			// showPai(i, true);
			// デバッグ(E)
		}
		showName();
		showScore();
		showMessage(gameCnt, riibouCnt, renchanCnt);
		showData(playerCnt);
		var s;
		s = kazeStrTbl[Math.floor(gameCnt / nanpuSen)] + toKanji((gameCnt % 4 + 1)) + "局";
		$("#eyecatch_game_cnt").html(s);
		if (renchanCnt > 0)
			s = toKanji(renchanCnt) + "本場";
		else
			s = "";
		$("#eyecatch_renchan_cnt").html(s);
		// $("#eyecatch").fadeIn("fast").delay(2000).fadeOut("fast", function() {
			timerEnabled = true;
			timerId = setTimeout(timer, timerInterval);
		// });
	}

	// ゲーム終了
	function endGame(arg1) {
		gameStart = false;
		gameEnd = true;
		if (arg1 == getPlayerCnt(oyaCnt)) {
			doRenchan(true);
		} else {
			renchanCnt = 0;
			oyaCnt++;
			oyaCnt = oyaCnt % nanpuSen;
			gameCnt++;
		}
		// chkGameOver();
		// if (!gameExit)
			// startGame();
	}

	// ゲームオーバー確認
	function chkGameOver() {
		if (gameCnt == gameEndCnt || gameCnt == gameEndCnt * 2) {
			timerEnabled = false;
			clearTimeout(timerId);
			gameExit = false;
			return true;
			// newGame();
		}
		return false;
	}

	// プレイヤーリストクリア
	function clearPlayerList() {
		for (var i = 0; i < playerList.length; i++)
			playerList[i].length = 0;
		for (var i = 0; i < playerNakiList.length; i++)
			playerNakiList[i].length = 0;
		for (var i = 0; i < playerSuteList.length; i++)
			playerSuteList[i].length = 0;
		for (var i = 0; i < playerRiichi.length; i++)
			playerRiichi[i].enabled = false;
		doraList.length = 0;
		yakuList.length = 0;
	}

	// 場決め
	function doBagime() {
		var i;
		var p;
		for (i = 0; i < playerSekiList.length; i++)
			playerSekiList[i] = playerNull;
		for (i = 0; i < playerSekiList.length; i++) {
			p = Math.floor(Math.random() * playerMax);
			if (playerSekiList[p] == playerNull)
				playerSekiList[p] = i;
			else {
				for (p = 0; p < playerSekiList.length; p++) {
					if (playerSekiList[p] == playerNull) {
						playerSekiList[p] = i;
						break;
					}
				}
			}
		}
		for (i = 0; i < playerSekiList.length; i++)
			if (playerSekiList[i] == playerUser)
				break;
		p = i;
		for (i = 0; i < playerMax; i++) {
			playerUserList[i] = playerSekiList[p];
			p++;
			if (p >= playerMax)
				p = 0;
		}
	}

	function initScoreList() {
		scoreList[playerUser] = 25000;
		scoreList[playerRight] = 25000;
		scoreList[playerTop] = 25000;
		scoreList[playerLeft] = 25000;
	}

	// 牌リスト初期化
	function initPaiList() {
		var paiIdx = 0;
		// 数牌
		for (var tmpCategory = 0; tmpCategory <= paiCategorySouzu; tmpCategory++) {
			for (var tmpIdx = paiIdx1; tmpIdx <= paiIdx9; tmpIdx++) {
				for (var i = 0; i <= 3; i++) {
					with (paiList[paiIdx]) {
						category = tmpCategory;
						idx = tmpIdx;
						listIdx = paiIdx;
						pos = posYama;
						dora = 0;
						aka = (tmpIdx == paiIdx5 && i == 0);
						player = playerNull;
						nakiCategory = nakiCategoryNull;
						nakiPlayer = false;
						if (tmpIdx == paiIdx1 || tmpIdx == paiIdx9)
							attr = paiAttrRoutou;
						else
							attr = paiAttrChunchan;
					}
					paiIdx++;
				}
			}
		}
		// 風牌
		tmpCategory = paiCategoryKaze;
		for (var tmpIdx = paiIdxTon; tmpIdx <= paiIdxPei; tmpIdx++) {
			for (var i = 0; i <= 3; i++) {
				with (paiList[paiIdx]) {
					category = tmpCategory;
					idx = tmpIdx;
					listIdx = paiIdx;
					pos = posYama;
					dora = 0;
					aka = false;
					player = playerNull;
					nakiCategory = nakiCategoryNull;
					nakiPlayer = false;
					attr = paiAttrJi;
				}
				paiIdx++;
			}
		}
		// 三元牌
		tmpCategory = paiCategorySangen;
		for (var tmpIdx = paiIdxHaku; tmpIdx <= paiIdxChun; tmpIdx++) {
			for (var i = 0; i <= 3; i++) {
				with (paiList[paiIdx]) {
					category = tmpCategory;
					idx = tmpIdx;
					listIdx = paiIdx;
					pos = posYama;
					dora = 0;
					aka = false;
					player = playerNull;
					nakiCategory = nakiCategoryNull;
					nakiPlayer = false;
					attr = paiAttrJi;
				}
				paiIdx++;
			}
		}
	}

	// プレイヤー位置取得
	function getPlayerCnt(arg1) {
		var i;
		for (i = 0; i < playerSekiList.length; i++)
			if (playerSekiList[i] == playerUser)
				break;
		var p = i;
		for (i = 0; i < playerMax; i++) {
			if (p == arg1)
				break;
			p++;
			if (p >= playerMax)
				p = 0;
		}
		return i;
	}

	// 出目取得
	function getDeme(arg1) {
		sai1 = Math.floor(Math.random() * demeMax / 2);
		sai2 = Math.floor(Math.random() * demeMax / 2);
		var tmpDeme = sai1 + sai2;
		var tmpYama = tmpDeme % 4;
		tmpYama = ((tmpYama + 1) + arg1) % 4;
		deme = tmpDeme + 2;
		yama = tmpYama;
	}

	// 透明画像取得
	function getTransSrc(arg1) {
		var s = imgPath + "pai/";
		switch (arg1) {
			case playerUser:
				s = s + "0";
				break;
			case playerLeft:
				s = s + "1";
				break;
			case playerTop:
				s = s + "2";
				break;
			case playerRight:
				s = s + "3";
				break;
		}
		return s + "/trans.png";
	}

	// サイコロ画像取得
	function getSaiSrc(arg1) {
		var s = imgPath + "pai/";
		return s + "/" + arg1 + ".png";
	}

	// 牌画像取得
	function getPaiSrc(arg1, arg2, arg3, arg4) {
		var s = imgPath + "pai/";
		switch (arg1) {
			case playerUser:
				s = s + "0";
				break;
			case playerLeft:
				s = s + "1";
				break;
			case playerTop:
				s = s + "2";
				break;
			case playerRight:
				s = s + "3";
				break;
		}
		s = s + "/";
		switch (arg2) {
			case paiCategoryManzu:
				s = s + "manzu";
				break;
			case paiCategorySouzu:
				s = s + "souzu";
				break;
			case paiCategoryPinzu:
				s = s + "pinzu";
				break;
			case paiCategoryKaze:
				s = s + "kaze";
				break;
			case paiCategorySangen:
				s = s + "sangen";
				break;
			case paiCategoryOther:
				s = s + "ura";
				break;
		}
		return s + (arg3 + 1) + (arg4 ? "a" : "") + ".png";
	}

	// 牌画像をリストから取得
	function getPaiListSrc(arg1) {
		with (paiList[arg1])
			return getPaiSrc(player, category, idx, aka);
	}

	// 牌画像をリストから取得(横)
	function getPaiListSrcEx(arg1) {
		var s = [playerRight, playerTop, playerLeft, playerUser];
		with (paiList[arg1])
			return getPaiSrc(s[player], category, idx, aka);
	}

	// 山表示
	function showYama() {
		for (var i = 0; i < playerMax; i++) {
			for (var p = 0; p < yamaPaiMax; p++)
				$("#" + yamaIdTbl[i] + (p + 1)).attr("src", getPaiSrc(i, paiCategoryOther, paiIdxUra1, false));
		}
	}

	// 山牌表示
	function showYamaPai(arg1, arg2, arg3, arg4, arg5) {
		var startPai = arg5;
		if (arg4 == playerUser || arg4 == playerLeft)
			startPai = (yamaPaiMax - 1) - startPai;
		$("#" + yamaIdTbl[arg4] + (startPai + 1)).attr("src", getPaiSrc(arg4, arg1, arg2, arg3));
	}

	// 山クリア
	function clearYama(arg1, arg2, arg3) {
		var i;
		var startPai = arg2;
		var endPai = arg3;
		if (arg1 == playerUser || arg1 == playerLeft) {
			i = startPai;
			startPai = yamaPaiMax - endPai;
			endPai = yamaPaiMax - i;
		}
		for (i = startPai; i < endPai; i++)
			$("#" + yamaIdTbl[arg1] + (i + 1)).attr("src", getTransSrc(arg1));
	}

	// 場表示
	function showField(arg1, arg2, arg3) {
		showFieldPai(arg1, arg2, arg3, fieldCnt[arg1]);
		fieldCnt[arg1]++;
	}

	// 場牌表示
	function showFieldPai(arg1, arg2, arg3, arg4) {
		var s;
		if (arg3)
			s = getPaiListSrcEx(arg2);
		else
			s = getPaiListSrc(arg2);
		with ($("#" + fieldIdTbl[arg1] + (arg4 + 1))) {
			attr("src", s);
			switch (arg1) {
				case playerUser:
					css({ opacity: "0", top: "20px" });
					animate({ opacity: "1", top: "0" }, "fast");
					break;
				case playerRight:
					css({ left: "20px", opacity: "0" });
					animate({ left: "0", opacity: "1" }, "fast");
					break;
				case playerTop:
					css({ opacity: "0", top: "-20px" });
					animate({ opacity: "1", top: "0" }, "fast");
					break;
				case playerLeft:
					css({ left: "-20px", opacity: "0" });
					animate({ left: "0", opacity: "1" }, "fast");
					break;
			}
		}
	}

	// 場クリア
	function clearField(arg1) {
		fieldCnt[arg1]--;
		$("#" + fieldIdTbl[arg1] + (fieldCnt[arg1] + 1)).attr("src", getTransSrc(arg1));
	}

	// 手牌表示
	function showPai(arg1, arg2) {
		for (var i = 0; i < 14; i++)
			$("#" + paiIdTbl[arg1] + (i + 1)).attr("src", getTransSrc(arg1));
		for (var i = 0; i < playerList[arg1].length; i++) {
			var s = "";
			if (arg1 == playerUser || arg2)
				s = getPaiListSrc(playerList[arg1][i].split(":")[3]);
			else
				s = getPaiSrc(arg1, paiCategoryOther, paiIdxUra1, false);
			$("#" + paiIdTbl[arg1] + (i + 1)).attr("src", s);
		}
		showNakiPai(arg1);
	}

	// 鳴牌表示
	function showNakiPai(arg1) {
		var nakiMax = 19;
		if (playerNakiList[arg1].length == 0)
			return;
		var p = 0;
		for (var i = playerNakiList[arg1].length - 1; i > -1 ; i--) {
			var idx = playerNakiList[arg1][i].split(":")[3];
			if (paiList[idx].nakiCategory == nakiCategoryAnkan && paiList[idx].nakiPlayer)
				$("#" + nakiIdTbl[arg1] + ((nakiMax - p) + 1)).attr("src", getPaiSrc(arg1, paiCategoryOther, paiIdxUra1, false));
			else
				showNakiPaiSub(arg1, idx, paiList[idx].nakiPlayer, nakiMax - p);
			p++;
		}
	}

	// ツモ牌表示
	function showTsumoPai(arg1) {
		if (arg1 == playerUser) {
			for (var i = 0; i < playerList[arg1].length; i++) {
				if (i == playerList[arg1].length - 1)
					$("#" + paiIdTbl[arg1] + (i + 1)).css({ marginLeft: "4px", marginRight: "-4px" });
				else
					$("#" + paiIdTbl[arg1] + (i + 1)).css({ margin: "0" });
			}
		}
	}

	// ツモ牌クリア
	function clearTsumoPai(arg1) {
		if (arg1 == playerUser) {
			for (var i = 0; i < playerList[arg1].length; i++) {
					$("#" + paiIdTbl[arg1] + (i + 1)).css({ margin: "0" });
			}
		}
	}

	// 場牌表示(補助)
	function showNakiPaiSub(arg1, arg2, arg3, arg4) {
		var s;
		if (arg3)
			s = getPaiListSrcEx(arg2);
		else
			s = getPaiListSrc(arg2);
		$("#" + nakiIdTbl[arg1] + (arg4 + 1)).attr("src", s);
	}

	// ドラ開始位置設定
	function setDoraStart() {
		if (deme == 2) {
			var tmpYama = yama + 1;
			if (tmpYama == playerMax)
				tmpYama = 0;
			doraYama = tmpYama;
			doraStart = yamaPaiMax;
		} else {
			doraYama = yama;
			doraStart = deme - 3;
		}
		doraCnt = 0;
	}

	// 最初のツモ設定
	function setStartTsumo() {
		var tmpYama = yama;
		var tmpDeme = deme;
		clearYama(tmpYama, tmpDeme, yamaPaiMax);
		var tsumoCnt = yamaPaiMax - tmpDeme;
		var tmpTsumoCnt;
		do {
			if (tmpYama == 0)
				tmpYama = playerLeft;
			else
				tmpYama--;
			tmpTsumoCnt = startTsumoMax - tsumoCnt;
			if (tmpTsumoCnt >= yamaPaiMax)
				tmpTsumoCnt = yamaPaiMax;
			clearYama(tmpYama, 0, tmpTsumoCnt);
		} while (tsumoCnt >= startTsumoMax);
		tsumoYama = tmpYama;
		tsumoPai = tmpTsumoCnt;
		shitaTsumo = false;
	}

	// 指定牌を取得
	function getPai(arg1, arg2, arg3) {
		for (var i = 0; i < paiList.length; i++) {
			if (paiList[i].pos == posYama) {
				if (paiList[i].category == arg2 && paiList[i].idx == arg3) {
					paiList[i].pos = posTe;
					paiList[i].player = arg1;
					playerList[arg1].push(categoryList[arg2] + ":" + paiList[i].idx + ":" + "A" + ":" + i);
					return i;
				}
			}
		}
		return -1;
	}

	// 前方検索
	function findNextPaiIdx(arg1, arg2) {
		for (var tmpIdx = arg1; tmpIdx < paiList.length; tmpIdx++)
			if (paiList[tmpIdx].pos == arg2)
				return tmpIdx;
		return -1;
	}

	// 後方検索
	function findPrevPaiIdx(arg1, arg2) {
		for (var tmpIdx = arg1; tmpIdx > -1; tmpIdx--)
			if (paiList[tmpIdx].pos == arg2)
				return tmpIdx;
		return -1;
	}

	// 牌インデックスをランダムに取得
	function getRandomPaiIdx() {
		var tmpIdx;
		var idx = Math.floor(Math.random() * paiMax);
		if (Math.floor(Math.random() * 2) == 0) {
			tmpIdx = findNextPaiIdx(idx, posYama);
			if (tmpIdx == -1)
				tmpIdx = findPrevPaiIdx(idx, posYama);
		} else {
			tmpIdx = findPrevPaiIdx(idx, posYama);
			if (tmpIdx == -1)
				tmpIdx = findNextPaiIdx(idx, posYama);
		}
		return tmpIdx;
	}

	// 牌をランダムに取得
	function getRandomPai(arg1) {
		var idx = getRandomPaiIdx();
		if (idx == -1)
			return -1;
		paiList[idx].pos = posTe;
		paiList[idx].player = arg1;
		var category = paiList[idx].category;
		playerList[arg1].push(categoryList[category] + ":" + paiList[idx].idx + ":" + "A" + ":" + idx);
		return idx;
	}

	// ドラ取得
	function getDora() {
		var tmpIdx;
		for (var i = 0; i < doraMax; i++) {
			tmpIdx = getRandomPaiIdx();
			if (tmpIdx == -1)
				return;
			with (paiList[tmpIdx]) {
				pos = posDora;
				doraList.push(categoryList[category] + ":" + idx + ":" + "A" + ":" + tmpIdx);
			}
		}
	}

	// ドラ設定
	function setDora(arg1) {
		var idxMax;
		switch (paiList[arg1].category) {
			case paiCategoryKaze:
				idxMax = paiIdxPei;
				break;
			case paiCategorySangen:
				idxMax = paiIdxChun;
				break;
			default:
				idxMax = paiIdx9;
				break;
		}
		var findIdx;
		if (arg1 == idxMax)
			findIdx = 0;
		else
			findIdx = paiList[arg1].idx + 1;
		var findCnt = 0;
		for (var tmpIdx = 0; tmpIdx < paiMax; tmpIdx++) {
			if (paiList[tmpIdx].category == paiList[arg1].category && paiList[tmpIdx].idx == findIdx) {
				paiList[tmpIdx].dora++;
				findCnt++
				if (findCnt == 4)
					return;
			}
		}
	}

	// ドラ表示
	function showDora() {
		var listIdx = doraCnt * 2;
		var paiIdx = doraList[listIdx].split(":")[3];
		with (paiList[paiIdx])
			showYamaPai(category, idx, aka, doraYama, doraStart);
		if (doraStart == 0) {
			tmpYama = yama + 1;
			if (tmpYama == playerMax)
				tmpYama = 0;
			doraYama = tmpYama;
			doraStart = yamaPaiMax - 1;
		} else {
			doraStart;
		}
		doraCnt++;
		setDora(paiIdx);
	}

	// 嶺上表示
	function showRinsyan() {
		var startPai = deme - Math.floor(doraCnt / 2);
		if (doraCnt % 2 == 1) {
			startPai--;
			if (yama == playerUser || yama == playerLeft)
				startPai = yamaPaiMax - 1 - startPai;
			$("#" + yamaIdTbl[yama] + (startPai + 1)).attr("src", getPaiSrc(yama, paiCategoryOther, paiIdxUra2, false));
		} else {
			clearYama(yama, startPai, startPai + 1);
		}
	}

	// 裏ドラ表示
	function showUraDora() {
		var listIdx;
		var paiIdx;
		for (var i = 0; i < doraCnt; i++) {
			listIdx = (i * 2) + 1;
			paiIdx = doraList[listIdx].split(":")[3];
			with (paiList[paiIdx])
				showYamaPai(category, idx, aka, yama, deme + 1 + i);
			setDora(paiIdx);
		}
	}

	// 最初の牌取得
	function getStartPai(arg1) {
		// デバッグ(B)
		/*
		if (arg1 == playerUser) {
			// 平和
			getPai(arg1, paiCategoryManzu, paiIdx3);
			getPai(arg1, paiCategoryManzu, paiIdx4);
			getPai(arg1, paiCategoryManzu, paiIdx5);
			getPai(arg1, paiCategoryManzu, paiIdx5);
			getPai(arg1, paiCategoryManzu, paiIdx6);
			getPai(arg1, paiCategoryManzu, paiIdx7);
			getPai(arg1, paiCategoryPinzu, paiIdx2);
			getPai(arg1, paiCategoryPinzu, paiIdx3);
			getPai(arg1, paiCategoryPinzu, paiIdx4);
			getPai(arg1, paiCategorySouzu, paiIdx3);
			getPai(arg1, paiCategorySouzu, paiIdx3);
			getPai(arg1, paiCategorySouzu, paiIdx7);
			getPai(arg1, paiCategorySouzu, paiIdx8);
			playerList[arg1].sort();
			playerTsumo = startPaiMax;
			return;
		}
		*/
		/*
		if (arg1 == playerUser) {
			// 七対子
			getPai(arg1, paiCategoryManzu, paiIdx2);
			getPai(arg1, paiCategoryManzu, paiIdx2);
			getPai(arg1, paiCategoryManzu, paiIdx5);
			getPai(arg1, paiCategoryManzu, paiIdx5);
			getPai(arg1, paiCategoryManzu, paiIdx7);
			getPai(arg1, paiCategoryManzu, paiIdx7);
			getPai(arg1, paiCategoryManzu, paiIdx8);
			getPai(arg1, paiCategoryManzu, paiIdx8);
			getPai(arg1, paiCategoryPinzu, paiIdx3);
			getPai(arg1, paiCategoryPinzu, paiIdx3);
			getPai(arg1, paiCategoryPinzu, paiIdx4);
			getPai(arg1, paiCategoryPinzu, paiIdx7);
			getPai(arg1, paiCategoryPinzu, paiIdx7);
			playerList[arg1].sort();
			playerTsumo = startPaiMax;
			return;
		}
		*/
		/*
		if (arg1 == playerUser) {
			// 国士無双
			getPai(arg1, paiCategoryManzu, paiIdx1);
			getPai(arg1, paiCategoryManzu, paiIdx9);
			getPai(arg1, paiCategoryPinzu, paiIdx1);
			getPai(arg1, paiCategoryPinzu, paiIdx9);
			getPai(arg1, paiCategorySouzu, paiIdx1);
			getPai(arg1, paiCategorySouzu, paiIdx9);
			getPai(arg1, paiCategoryKaze, paiIdx1);
			getPai(arg1, paiCategoryKaze, paiIdx2);
			getPai(arg1, paiCategoryKaze, paiIdx3);
			getPai(arg1, paiCategoryKaze, paiIdx4);
			getPai(arg1, paiCategorySangen, paiIdx1);
			getPai(arg1, paiCategorySangen, paiIdx2);
			getPai(arg1, paiCategorySangen, paiIdx3);
			playerList[arg1].sort();
			playerTsumo = startPaiMax;
			return;
		}
		*/
		/*
		if (arg1 == playerUser) {
			// カン
			getPai(arg1, paiCategoryManzu, paiIdx3);
			getPai(arg1, paiCategoryManzu, paiIdx3);
			getPai(arg1, paiCategoryPinzu, paiIdx1);
			getPai(arg1, paiCategoryPinzu, paiIdx5);
			getPai(arg1, paiCategorySouzu, paiIdx9);
			getPai(arg1, paiCategoryKaze, paiIdx1);
			getPai(arg1, paiCategoryKaze, paiIdx2);
			getPai(arg1, paiCategoryKaze, paiIdx3);
			getPai(arg1, paiCategoryKaze, paiIdx4);
			getPai(arg1, paiCategorySangen, paiIdx2);
			getPai(arg1, paiCategorySangen, paiIdx2);
			getPai(arg1, paiCategorySangen, paiIdx2);
			getPai(arg1, paiCategorySangen, paiIdx2);
			playerList[arg1].sort();
			playerTsumo = startPaiMax;
			return;
		}
		*/
		// デバッグ(E)
		for (var i = 0; i < startPaiMax; i++)
			getRandomPai(arg1);
		playerList[arg1].sort();
		playerTsumo = startPaiMax;
	}

	// タイマー処理
	function timer() {
		timerEnabled = false;
		if (gameEnd)
			return;
		nowCnt = playerCnt;
		playerCnt = incPlayerCnt(playerCnt);
		showData(nowCnt);
		chkMachi(nowCnt);
		getTsumo(nowCnt);
		if (nowCnt == playerUser) {
			showPai(playerUser, false);
			showTsumoPai(playerUser);
			playSound(wavPath + "sound4.wav");
			if (chkTsumo(playerUser)) {
				for (var i = 0; i < machiMax; i++)
					machiCntTbl[i] = machiSubTbl[i];
				showPlayerMenu(idTsumo);
				return;
			} else {
				if (playerRiichi[playerUser].enabled) {
					hidePlayerMenu();
					selPai(playerUser, playerList[playerUser].length - 1);
					if (!gameExit) {
						playerList[playerUser].sort();
						showPai(playerUser, false);
						setActiveSub(-1);
					}
					return;
				}
			}
			if (chkAnkan(playerUser) || chkPonToKan(playerUser)) {
				showPlayerMenu(idAnkan);
				return;
			}
			for (var i = 0; i < playerList[playerUser].length; i++) {
				playerList[playerChkList] = playerList[playerUser].slice();
				playerNakiList[playerChkList] = playerNakiList[playerUser].slice();
				playerList[playerChkList].splice(i, 1);
				playerList[playerChkList].sort();
				chkMachi(playerChkList);
				if (!playerRiichi[playerUser].enabled && playerNakiList[playerUser].length == 0 && paiCnt >= 4 && chkTenpai(playerChkList)) {
					showPlayerMenu(idRiichi);
					break;
				}
			}
			//
		} else {
			aiPlayer(nowCnt);
		}
	}

	// プレイヤーカウンタ更新
	function incPlayerCnt(arg1) {
		if (arg1 == playerLeft)
			arg1 = playerUser;
		else
			arg1++;
		return arg1;
	}

	// ツモ取得
	function getTsumo(arg1) {
		var r = getRandomPai(arg1);
		if (shitaTsumo) {
			clearYama(tsumoYama, tsumoPai, tsumoPai + 1);
			if (tsumoPai >= yamaPaiMax - 1) {
				if (tsumoYama == 0)
					tsumoYama = playerLeft;
				else
					tsumoYama--;
				tsumoPai = 0;
			} else {
				tsumoPai++;
			}
			shitaTsumo = false;
		} else {
			showYamaPai(paiCategoryOther, paiIdxUra2, false, tsumoYama, tsumoPai);
			shitaTsumo = true;
		}
	}

	// 手牌選択
	function selPai(arg1, arg2) {
		var idx;
		var tmpRiichi = isRiichi;
		if (playerRiichi[arg1].enabled)
			playerRiichi[arg1].ippatsu = false;
		if (playerRiichi[arg1].naki && playerRiichi[arg1].enabled) {
			if (playerRiichi[arg1].ippatsu)
				tmpRiichi = true;
			playerRiichi[arg1].naki = false;
		}
		playerSuteList[arg1].push(playerList[arg1][arg2]);
		idx = playerList[arg1][arg2].split(":")[3];
		suteIdx = idx;
		paiList[idx].pos = posField;
		showField(arg1, idx, tmpRiichi);
		playSound(wavPath + "sound3.wav");
		playerList[arg1].splice(arg2, 1);
		isKan = false;
		var tmpPlayer;
		for (tmpPlayer = playerUser; tmpPlayer < playerMax; tmpPlayer++) {
			if (tmpPlayer != arg1) {
				if (chkRon(tmpPlayer, idx)) {
					timerEnabled = false;
					clearTimeout(timerId);
					if (tmpPlayer == playerUser) {
						showPlayerNakiMenu(idRon);
					} else {
						showPai(arg1, false);
						doRon(tmpPlayer, arg1, idx);
						endGame(tmpPlayer);
						return;
					}
				}
				if (paiCnt > 1) {
					if (chkKan(tmpPlayer, idx)) {
						if (tmpPlayer == playerUser) {
							timerEnabled = false;
							clearTimeout(timerId);
							showPlayerNakiMenu(idMinkan);
						}
					}
					if (chkPon(tmpPlayer, idx)) {
						if (tmpPlayer == playerUser) {
							timerEnabled = false;
							clearTimeout(timerId);
							showPlayerNakiMenu(idPon);
						}
					}
				}
			}
		}
		if (paiCnt > 1 && chkChii(arg1, idx)) {
			if (arg1 == playerLeft) {
				timerEnabled = false;
				clearTimeout(timerId);
				showPlayerNakiMenu(idChii);
			}
		}
		if (isRiichi) {
			playVoice(arg1, voiceRiichi);
			setRiichi(arg1);
			riibouCnt++;
			scoreList[arg1] = scoreList[arg1] - 1000;
			isRiichi = false;
			showMessage(gameCnt, riibouCnt, renchanCnt);
			showScore();
			showRiichi(arg1);
			playAudio(mp3Path + "audio2.mp3");
		}
		if (playerNakiMenu)
		 return;
		paiCnt--;
		timerEnabled = true;
		timerId = setTimeout(timer, timerInterval);
		if (paiCnt == 0) {
			showPai(arg1, false);
			doNagare();
		}
	}

	// リーチを確認
	function chkRiichi() {
		for (var i = 0; i < playerMax; i++) {
			if (playerRiichi[i].enabled)
				return true;
		}
		return false;
	}

	// 牌検索
	function aiPlayerFindPai(arg1, arg2) {
		for (var listIdx = playerList[arg1].length - 1; listIdx >= 0; listIdx--) {
			if (tehaiTbl[arg1][listIdx] == arg2)
				return listIdx;
		}
		return -1;
	}

	// 属性検索
	function aiPlayerFindAttr(arg1, arg2) {
		for (var listIdx = playerList[arg1].length - 1; listIdx >= 0; listIdx--) {
			var tmpIdx = playerList[arg1][listIdx].split(":")[3];
			if (paiList[tmpIdx].attr == arg2)
				return listIdx;
		}
		return -1;
	}

	// カテゴリ・属性検索
	function aiPlayerFindCategoryAttr(arg1, arg2, arg3) {
		for (var listIdx = playerList[arg1].length - 1; listIdx >= 0; listIdx--) {
			var tmpIdx = playerList[arg1][listIdx].split(":")[3];
			if (paiList[tmpIdx].attr == arg3 && paiList[tmpIdx].category == arg2 &&
				tehaiTbl[arg1][listIdx] != paiKoutsu &&
				tehaiTbl[arg1][listIdx] != paiSyuntsuStart &&
				tehaiTbl[arg1][listIdx] != paiSyuntsuCenter &&
				tehaiTbl[arg1][listIdx] != paiSyuntsuEnd)
				return listIdx;
		}
		return -1;
	}

	// 降り検索
	function aiPlayerFindOri(arg1, arg2, arg3) {
		for (var i = 0; i < playerMax; i++) {
			if (i == arg1)
				continue;
			if (!playerRiichi[i].enabled)
				continue;
			for (var listIdx = playerSuteList[i].length - 1; listIdx >= 0; listIdx--) {
				var tmpIdx = playerSuteList[i][listIdx].split(":")[3];
				if (paiList[tmpIdx].idx == arg2 && paiList[tmpIdx].category == arg3)
					return true;
			}
		}
		return false;
	}

	// 降り
	function aiPlayerOri(arg1) {
		if (!chkRiichi)
			return -1;
		for (var listIdx = playerList[arg1].length - 1; listIdx >= 0; listIdx--) {
			var tmpIdx = playerList[arg1][listIdx].split(":")[3];
			if (aiPlayerFindOri(arg1, paiList[tmpIdx].idx, paiList[tmpIdx].category))
				return listIdx;
		}
		return -1;
	}

	// 棒テン即リー全ツッパ
	function aiPlayerFindA(arg1) {
		chkMachi(arg1);
		var listIdx = aiPlayerFindPai(arg1, paiTanki);
		if (listIdx != -1) {
			return listIdx;
		} else {
			if (machiCntTbl[paiPenchan] >= 2) {
				listIdx = aiPlayerFindPai(arg1, paiPenchan);
				if (listIdx != -1)
					return listIdx;
			} else if (machiCntTbl[paiToitsu] > 2) {
				listIdx = aiPlayerFindPai(arg1, paiToitsu);
				if (listIdx != -1)
					return listIdx;
			} else if (machiCntTbl[paiKanchan] >= 2) {
				listIdx = aiPlayerFindPai(arg1, paiKanchan);
				if (listIdx != -1)
					return listIdx;
			} else if (machiCntTbl[paiToitsu] == 0 && machiCntTbl[paiKoutsu] >= 1) {
				listIdx = aiPlayerFindPai(arg1, paiKoutsu);
				if (listIdx != -1)
					return listIdx;
			} else if (machiCntTbl[paiRyanmen] >= 2) {
				listIdx = aiPlayerFindPai(arg1, paiRyanmen);
				if (listIdx != -1)
					return listIdx;
			}
		}
		return playerList[arg1].length - 1;
	}

	// 断么九が好き
	function aiPlayerFindB(arg1) {
		chkMachi(arg1);
		var listIdx = aiPlayerOri(arg1);
		if (listIdx != -1)
			return listIdx;
		if (categoryCntTbl[paiCategoryKaze] != 0 || categoryCntTbl[paiCategorySangen]) {
			listIdx = aiPlayerFindAttr(arg1, paiAttrJi);
			if (listIdx != -1)
				return listIdx;
		}
		listIdx = aiPlayerFindPai(arg1, paiTanki);
		if (listIdx != -1)
			return listIdx;
		listIdx = aiPlayerFindAttr(arg1, paiAttrRoutou);
		if (listIdx != -1)
			return listIdx;
		if (machiCntTbl[paiPenchan] >= 2) {
			listIdx = aiPlayerFindPai(arg1, paiPenchan);
			if (listIdx != -1)
				return listIdx;
		} else if (machiCntTbl[paiToitsu] > 2) {
			listIdx = aiPlayerFindPai(arg1, paiToitsu);
			if (listIdx != -1)
				return listIdx;
		} else if (machiCntTbl[paiKanchan] >= 2) {
			listIdx = aiPlayerFindPai(arg1, paiKanchan);
			if (listIdx != -1)
				return listIdx;
		} else if (machiCntTbl[paiToitsu] == 0 && machiCntTbl[paiKoutsu] >= 1) {
			listIdx = aiPlayerFindPai(arg1, paiKoutsu);
			if (listIdx != -1)
				return listIdx;
		} else if (machiCntTbl[paiRyanmen] >= 2) {
			listIdx = aiPlayerFindPai(arg1, paiRyanmen);
			if (listIdx != -1)
				return listIdx;
		}
		return playerList[arg1].length - 1;
	}

	// 臨機応変早あがり
	function aiPlayerFindC(arg1) {
		chkMachi(arg1);
		var listIdx = aiPlayerOri(arg1);
		if (listIdx != -1)
			return listIdx;
		var chkAttr = paiAttrJi;
		if (attrCntTbl[paiAttrChunchan] < attrCntTbl[paiAttrRoutou] &&
			attrCntTbl[paiAttrChunchan] < attrCntTbl[paiAttrJi]) {
			chkAttr = paiAttrChunchan;
		} else if (attrCntTbl[paiAttrRoutou] < attrCntTbl[paiAttrChunchan] &&
			attrCntTbl[paiAttrRoutou] < attrCntTbl[paiAttrJi]) {
			chkAttr = paiAttrRoutou;
		}
		var category = paiCategoryKaze;
		var categoryCnt = categoryCntTbl[category];
		for (var i = 0; i <paiCategorySangen; i++) {
			if (categoryCntTbl[i] == 0)
				continue;
			if (categoryCntTbl[i] < categoryCnt) {
				category = i;
				categoryCnt = categoryCntTbl[i];
			}
		}
		listIdx = aiPlayerFindCategoryAttr(arg1, category, chkAttr);
		if (listIdx != -1)
			return listIdx;
		listIdx = aiPlayerFindPai(arg1, paiTanki);
		if (listIdx != -1) {
			return listIdx;
		} else if (machiCntTbl[paiPenchan] >= 2) {
			listIdx = aiPlayerFindPai(arg1, paiPenchan);
			if (listIdx != -1)
				return listIdx;
		} else if (machiCntTbl[paiToitsu] > 2) {
			listIdx = aiPlayerFindPai(arg1, paiToitsu);
			if (listIdx != -1)
				return listIdx;
		} else if (machiCntTbl[paiKanchan] >= 2) {
			listIdx = aiPlayerFindPai(arg1, paiKanchan);
			if (listIdx != -1)
				return listIdx;
		} else if (machiCntTbl[paiToitsu] == 0 && machiCntTbl[paiKoutsu] >= 1) {
			listIdx = aiPlayerFindPai(arg1, paiKoutsu);
			if (listIdx != -1)
				return listIdx;
		} else if (machiCntTbl[paiRyanmen] >= 2) {
			listIdx = aiPlayerFindPai(arg1, paiRyanmen);
			if (listIdx != -1)
				return listIdx;
		}
		return playerList[arg1].length - 1;
	}

	// 捨牌検索
	function aiPlayerFindSute(arg1) {
		switch (playerUserList[arg1]) {
			case 0:
				return aiPlayerFindA(arg1);
			case 1:
				return aiPlayerFindB(arg1);
			case 2:
				return aiPlayerFindC(arg1);
			default:
				return playerList[arg1].length - 1;
		}
	}

	// 自動処理
	function aiPlayer(arg1) {
		if (chkTsumo(arg1)) {
			doTsumo(arg1);
			endGame(arg1);
			return;
		}
		if (!playerRiichi[arg1].enabled) {
			playerList[arg1].sort();
			var idx = aiPlayerFindSute(arg1);
			playerList[playerChkList] = playerList[arg1].slice();
			playerNakiList[playerChkList] = playerNakiList[arg1].slice();
			playerList[playerChkList].splice(idx, 1);
			chkMachi(playerChkList);
			if (playerNakiList[arg1].length == 0 && paiCnt >= 4 && chkTenpai(playerChkList)) {
				isRiichi = true;
			}
			selPai(arg1, idx);
		} else {
			selPai(arg1, playerList[arg1].length - 1);
		}
		// デバッグ(B)
		// showPai(arg1, true);
		// デバッグ(E)
	}

	// 流局
	function doNagare() {
		playSound(wavPath + "sound5.wav");
		var bappuList1 = [3000, 1500, 1000];
		var bappuList2 = [-1000, -1500, -3000];
		prevScoreList = scoreList.slice();
		clearTimeout(timerId);
		timerEnabled = false;
		gameStart = false;
		gameEnd = true;
		var oyaTenpai = false;
		var tenpaiCnt = 0;
		for (var i = 0; i < playerMax; i++) {
			if (chkTenpai(i)) {
				tenpaiList[i] = true;
				tenpaiCnt++;
				if (i == getPlayerCnt(oyaCnt))
					oyaTenpai = true;
				showPai(i, true);
			} else {
				tenpaiList[i] = false;
			}
		}
		setTimeout(function() {
			bonusList.length = 0;
			if (tenpaiCnt > 0 && tenpaiCnt < 4) {
				for (var i = 0; i < playerMax; i++) {
					if (tenpaiList[i])
						setScore(i, bappuList1[tenpaiCnt - 1]);
					else
						setScore(i, bappuList2[tenpaiCnt - 1]);
				}
			}
			showBonus();
			setTimeout(function() {
				showDialog(-1, gameCnt, renchanCnt, "流局");
				doRenchan(oyaTenpai);
			}, bonusList.length * 4800);
		}, 1600);
	}

	// ロン
	function doRon(arg1, arg2, arg3) {
		playerList[arg1].push(paiList[arg3] + ":" + paiList[arg3].idx + ":" + "A" + ":" + arg3);
		setTimeout(function() {
			prevScoreList = scoreList.slice();
			if (playerRiichi[arg1].enabled)
				showUraDora();
			showPai(arg1, true);
			playEffect1(arg2, "#" + fieldIdTbl[arg2] + fieldCnt[arg2]);
			getYaku(arg1, playerChkList, true);
			chkDora(arg1, playerChkList, false);
			var tmpHan = getHan();
			var tmpFu = getFu(arg1, playerChkList, true);
			var tmpScore;
			if (arg1 == getPlayerCnt(oyaCnt))
				tmpScore = getScore(tmpHan, tmpFu, scoreAttrOyaRon);
			else
				tmpScore = getScore(tmpHan, tmpFu, scoreAttrKoRon);
			addMangan(arg1, tmpHan, tmpFu, tmpScore);
			setTimeout(function() {
				playVoice(arg1, voiceRon);
				setTimeout(function() {
					bonusList.length = 0;
					setScore(arg1, tmpScore + (riibouCnt * 1000) + (renchanCnt * 300));
					setScore(arg2, -1 * (tmpScore + renchanCnt * 300));
					showBonus();
					setTimeout(function() {
						showDialog(arg1, gameCnt, renchanCnt, "ロン");
						if (riibouCnt > 0)
							riibouCnt = 0;
						endGame(arg1);
					}, bonusList.length * 4800);
				}, 1000);
			}, 1000);
		}, 800);
	}

	// ツモ
	function doTsumo(arg1) {
		setTimeout(function() {
			prevScoreList = scoreList.slice();
			if (playerRiichi[arg1].enabled)
				showUraDora();
			showPai(arg1, true);
			playEffect2(arg1, "#" + paiIdTbl[arg1] + playerList[arg1].length);
			getYaku(arg1, playerChkList, false);
			chkDora(arg1, playerChkList, false);
			var tmpHan = getHan();
			var tmpFu = getFu(arg1, playerChkList, false);
			var tmpScore = new Array(playerMax);
			for (var i = 0; i < playerMax; i++) {
				if (i == arg1) {
					if (i == getPlayerCnt(oyaCnt))
						tmpScore[i] = getScore(tmpHan, tmpFu, scoreAttrKoTsumoOya) * 3;
					else
						tmpScore[i] = getScore(tmpHan, tmpFu, scoreAttrKoTsumoKo) * 2 + getScore(tmpHan, tmpFu, scoreAttrKoTsumoOya);
				} else {
					if (arg1 == getPlayerCnt(oyaCnt))
						tmpScore[i] = -getScore(tmpHan, tmpFu, scoreAttrOyaTsumo);
					else if (i == getPlayerCnt(oyaCnt))
						tmpScore[i] = -getScore(tmpHan, tmpFu, scoreAttrKoTsumoOya);
					else
						tmpScore[i] = -getScore(tmpHan, tmpFu, scoreAttrKoTsumoKo);
				}
			}
			addMangan(arg1, tmpHan, tmpFu, tmpScore[arg1]);
			setTimeout(function() {
				playVoice(arg1, voiceTsumo);
				setTimeout(function() {
					bonusList.length = 0;
					for (var i = 0; i < playerMax; i++) {
						if (i == arg1) {
							tmpScore[i] = tmpScore[i] + (riibouCnt * 1000);
							tmpScore[i] = tmpScore[i] + (renchanCnt * 100 * 3)
						} else {
							tmpScore[i] = tmpScore[i] - (renchanCnt * 100)
						}
						setScore(i, tmpScore[i]);
					}
					showBonus();
					setTimeout(function() {
						showDialog(arg1, gameCnt, renchanCnt, "ツモ");
						if (riibouCnt > 0)
							riibouCnt = 0;
						endGame(arg1);
					}, bonusList.length * 4800);
				}, 1000);
			}, 1000);
		}, 800);
	}

	// 連荘
	function doRenchan(arg1) {
		renchanCnt++;
		if (oyaCnt < nanpuSen && !arg1) {
			oyaCnt++;
			if (oyaCnt == nanpuSen)
				oyaCnt = 0;
			gameCnt++;
		}
	}

	// 満貫追加
	function addMangan(arg1, arg2, arg3, arg4) {
		addYaku("");
		if (arg2 >= 13)
			addYaku("役満");
		else {
			if (!isChiitoi)
				addYaku(arg3 + " 符 " + arg2 + " 飜");
			else
				addYaku(arg2 + " 飜");
		}
		switch (arg2) {
			case 6:
			case 7:
				addYaku("跳満");
				break;
			case 8:
			case 9:
			case 10:
				addYaku("倍満");
				break;
			case 11:
			case 12:
				addYaku("三倍満");
				break;
			default:
				if (arg2 < 13) {
					if (arg1 == getPlayerCnt(oyaCnt)) {
						if (arg4 >= 12000)
							addYaku("満貫");
					} else {
						if (arg4 >= 8000)
							addYaku("満貫");
					}
				}
				break;
		}
		addYaku(arg4 + " 点");
	}

	// チー設定
	function setChii(arg1, arg2, arg3, arg4) {
		var nakiPlayer = (arg1 + 1) % playerMax;
		paiList[arg2].pos = posNaki;
		paiList[arg2].player = nakiPlayer;
		paiList[arg2].nakiCategory = nakiCategoryChii;
		paiList[arg2].nakiPlayer = true;
		var prevNakiCnt = playerNakiList[nakiPlayer].length;
		var category = paiList[arg2].category;
		playerNakiList[nakiPlayer].push(categoryList[category] + ":" + paiList[arg2].idx + ":" + "A" + ":" + arg2);
		var tmpNakiIdx;
		for (var i = 0; i < 2; i++) {
			if (i == 0)
				tmpNakiIdx = arg3;
			else
				tmpNakiIdx = arg4;
			chkIdx = playerList[nakiPlayer][tmpNakiIdx].split(":")[3];
			paiList[chkIdx].pos = posNaki;
			paiList[chkIdx].nakiCategory = nakiCategoryChii;
			playerNakiList[nakiPlayer].push(categoryList[category] + ":" + paiList[chkIdx].idx + ":" + "A" + ":" + chkIdx);
		}
		for (var i = 0; i < 2; i++) {
			if (arg3 < arg4)
				tmpNakiIdx = arg3;
			else
				tmpNakiIdx = arg4;
			playerList[nakiPlayer].splice(tmpNakiIdx, 1);
		}
		clearField(arg1);
		showPai(nakiPlayer, false);
		playerCnt = (nakiPlayer + 1) % playerMax;
	}

	// ポン・カン設定
	function setPonKan(arg1, arg2, arg3, arg4) {
		var nakiCategory;
		if (arg4 == 2)
			nakiCategory = nakiCategoryPon;
		else
			nakiCategory = nakiCategoryMinkan;
		paiList[arg3].pos = posNaki;
		paiList[arg3].player = arg1;
		paiList[arg3].nakiCategory = nakiCategory;
		var category = paiList[arg3].category;
		var prevNakiCnt = playerNakiList[arg1].length;
		playerNakiList[arg1].push(categoryList[category] + ":" + paiList[arg3].idx + ":" + "A" + ":" + arg3);
		var chkCnt = 0;
		var i = 0;
		while (i < playerList[arg1].length) {
			chkIdx = playerList[arg1][i].split(":")[3];
			if (paiList[chkIdx].category == paiList[arg3].category &&
				paiList[chkIdx].idx == paiList[arg3].idx) {
				paiList[chkIdx].pos = posNaki;
				paiList[chkIdx].nakiCategory = nakiCategory;
				category = paiList[chkIdx].category;
				playerNakiList[arg1].push(categoryList[category] + ":" + paiList[chkIdx].idx + ":" + "A" + ":" + chkIdx);
				chkCnt++;
				playerList[arg1].splice(i, 1);
				if (chkCnt == arg4)
					break;
			} else {
				i++;
			}
		}
		if ((arg1 == playerUser && arg2 == playerLeft) || (arg1 - arg2 == 1))
			i = 0;
		else if (arg2 - arg1 == 2)
			i = 1;
		else
			i = arg4;
		chkIdx = playerNakiList[arg1][i + prevNakiCnt].split(":")[3];
		paiList[chkIdx].nakiPlayer = true;
	}

	// ポン設定
	function setPon(arg1, arg2, arg3) {
		setPonKan(arg1, arg2, arg3, 2);
		clearField(arg2);
		showPai(arg1, false);
		playerCnt = (arg1 + 1) % playerMax;
	}

	// 明カン設定
	function setMinkan(arg1, arg2, arg3) {
		setPonKan(arg1, arg2, arg3, 3);
		clearField(arg2);
		getRandomPai(arg1);
		showRinsyan();
		showPai(arg1, false);
		showTsumoPai(arg1);
		isKan = true;
		playerCnt = (arg1 + 1) % playerMax;
	}

	// 暗カン設定
	function setAnkan(arg1) {
		var idxMax = 4;
		var i;
		for (i = 0; i < tehaiTbl.length; i++)
			tehaiTbl[i] = false;
		var i, listIdx, tmpIdx, nextIdx, prevListIdx, nextListIdx;
		var chkIdx, idx;
		playerList[arg1].sort();
		for (listIdx = 0; listIdx < playerList[arg1].length; listIdx++) {
			if (tehaiTbl[listIdx] || listIdx == playerList[arg1].length - 1)
				continue;
			chkIdx = playerList[arg1][listIdx].split(":")[3];
			tehaiTbl[listIdx] = true;
			prevListIdx = listIdx;
			for (i = 1; i < idxMax; i++) {
				tmpIdx = i;
				nextListIdx = findListIdx(arg1, paiList[chkIdx].category, paiList[chkIdx].idx);
				if (nextListIdx !== -1) {
					prevListIdx = nextListIdx;
					tehaiTbl[nextListIdx] = true;
				} else {
					tmpIdx = 0;
					break;
				}
			}
			i = tmpIdx;
			if (i == idxMax - 1) {
				idx = listIdx;
				break;
			}
		}
		if (i !== idxMax - 1)
			return;
		var prevNakiCnt = playerNakiList[arg1].length;
		for (i = 0; i < 4; i++) {
			chkIdx = playerList[arg1][idx].split(":")[3];
			paiList[chkIdx].pos = posNaki;
			paiList[chkIdx].nakiCategory = nakiCategoryAnkan;
			var category = paiList[chkIdx].category;
			playerNakiList[arg1].push(categoryList[category] + ":" + paiList[chkIdx].idx + ":" + "A" + ":" + chkIdx);
			playerList[arg1].splice(idx, 1);
		}
		chkIdx = playerNakiList[arg1][prevNakiCnt].split(":")[3];
		paiList[chkIdx].nakiPlayer = true;
		chkIdx = playerNakiList[arg1][prevNakiCnt + 3].split(":")[3];
		paiList[chkIdx].nakiPlayer = true;
		getRandomPai(arg1);
		playerTsumo = playerTsumo - 3;
		showRinsyan();
		showTsumoPai(arg1);
		showDora();
		showPai(arg1, false);
		isKan = true;
	}

	// ポンからカン設定
	function setPonToKan(arg1) {
		var prevIdx = -1;
		var prevCategory = -1;
		var idx = -1;
		var chkIdx;
		var chkCnt = 0;
		for (var i = 0; i < playerList[arg1].length; i++) {
			idx = playerList[arg1][i].split(":")[3];
			chkCnt = 0;
			for (var j = 0; j < playerNakiList[arg1].length - 1; j++) {
				chkIdx = playerNakiList[arg1][j].split(":")[3];
				if (paiList[chkIdx].category == paiList[idx].category &&
					paiList[chkIdx].idx == paiList[idx].idx) {
					chkCnt++;
					if (chkCnt == 1) {
						paiList[idx].pos = posNaki;
						paiList[idx].nakiCategory = nakiCategoryMinkan;
						var category = paiList[idx].category;
						playerNakiList[arg1].splice(i, 0, categoryList[category] + ":" + paiList[idx].idx + ":" + "A" + ":" + idx);
					}
					if (chkCnt == 3) {
						playerList[arg1].splice(i, 1);
						break;
					}
				}
			}
		}
		getRandomPai(arg1);
		showRinsyan();
		showTsumoPai(arg1);
		showPai(arg1, false);
		paiCnt--;
		isDora = true;
		isKan = true;
	}

	// アクティブ設定
	function setActive(arg1) {
		for (var i = 0; i < 14; i++)
			// $(this).css({ cursor: "default" });
			$("#pai_bottom" + (i + 1)).css({ opacity: "1" });
		if (arg1 == -1)
			return;
		setActiveSub(arg1, false);
	}

	// アクティブ設定補助
	function setActiveSub(arg1, arg2) {
		if (!arg2) {
			// $(arg1).css({ cursor: "pointer" });
			$(arg1).css({ opacity: "0.6" });
		} else {
			// $(arg1).css({ cursor: "default" });
			$(arg1).css({ opacity: "1" });
		}
	}

	// 特典表示(やっつけ仕事)
	function showBonus() {
		bonusIdx = 0;
		bonusCnt = bonusList.length;
		if (bonusCnt > 0) {
			$("#bonus").fadeIn("slow");
			bonusTimer();
		}
	}

	// 特典表示(ひどすぎます)
	function bonusTimer() {
		if (bonusIdx < bonusCnt) {
			var s = playerBonusList[playerNameList[playerUserList[bonusList[bonusIdx].player]]][bonusList[bonusIdx].idx];
			$("#bonus_img").attr("src", imgPath + "bonus/" + s + ".png").fadeIn("fast", function() {
				playSound(wavPath + "bonus/" + s + ".wav");
			}).delay(4000).fadeOut("slow");
			setTimeout(bonusTimer, 4800);
		} else {
			$("#bonus").hide();
		}
		bonusIdx++;
	}

	// 待ちを確認
	function chkMachi(arg1) {
		var idxMax = 3;
		for (var i = 0; i < tehaiTbl.length; i++)
			tehaiTbl[i] = false;
		for (var i = 0; i < machiCntTbl.length; i++)
			machiCntTbl[i] = 0;
		initCategory();
		initAttrCnt(arg1);
		initCategoryCnt(arg1);
		var i, listIdx, tmpIdx, nextIdx, prevListIdx, nextListIdx;
		var chkIdx, chkCategory;
		for (listIdx = 0; listIdx < playerList[arg1].length; listIdx++) {
			chkIdx = playerList[arg1][listIdx].split(":")[3];
			chkCategory = paiList[chkIdx].category;
			categoryTbl[chkCategory].idx++;
			categoryTbl[chkCategory].idxTbl[paiList[chkIdx].idx]++;
			if (tehaiTbl[listIdx])
				continue;
			tehaiTbl[listIdx] = true;
			// 順子を確認(字牌以外)
			if (paiList[chkIdx].attr != paiAttrJi) {
				prevListIdx = listIdx;
				for (i = 1; i < idxMax; i++) {
					tmpIdx = i;
					nextListIdx = findListIdx(arg1, paiList[chkIdx].category, paiList[chkIdx].idx + i);
					if (nextListIdx > -1) {
						if (i == 1)
							prevListIdx = nextListIdx;
						tehaiTbl[nextListIdx] = true;
					} else {
						tmpIdx = 0;
						break;
					}
				}
				i = tmpIdx;
				if (i == idxMax - 1) {
					machiCntTbl[paiSyuntsu]++;
					tmpIdx = paiList[playerList[arg1][listIdx].split(":")[3]].idx +
						paiList[playerList[arg1][prevListIdx].split(":")[3]].idx +
						paiList[playerList[arg1][nextListIdx].split(":")[3]].idx;
					tmpIdx = Math.floor(tmpIdx / 3) - 1;
					chkCategory = paiList[chkIdx].category;
					categoryTbl[chkCategory].syuntsuTbl[tmpIdx]++;
					categoryTbl[chkCategory].syuntsuIdx++;
					tehaiMachiTbl[arg1][listIdx] = paiSyuntsuStart;
					tehaiMachiTbl[arg1][prevListIdx] = paiSyuntsuCenter;
					tehaiMachiTbl[arg1][nextListIdx] = paiSyuntsuEnd;
					continue;
				} else if (prevListIdx != listIdx) {
					tehaiTbl[prevListIdx] = false;
				}
			}
			// 刻子を確認
			prevListIdx = listIdx;
			for (i = 1; i < idxMax; i++) {
				tmpIdx = i;
				nextListIdx = findListIdx(arg1, paiList[chkIdx].category, paiList[chkIdx].idx);
				if (nextListIdx > -1) {
					prevListIdx = nextListIdx;
					tehaiTbl[nextListIdx] = true;
				} else {
					tmpIdx = 0;
					break;
				}
			}
			i = tmpIdx;
			if (i == idxMax - 1) {
				machiCntTbl[paiKoutsu]++;
				tmpIdx = paiList[chkIdx].idx;
				categoryTbl[chkCategory].koutsuTbl[tmpIdx]++;
				categoryTbl[chkCategory].koutsuIdx++;
				tehaiMachiTbl[arg1][listIdx] = paiKoutsu;
				tehaiMachiTbl[arg1][prevListIdx] = paiKoutsu;
				tehaiMachiTbl[arg1][nextListIdx] = paiKoutsu;
				continue;
			} else if (prevListIdx != listIdx) {
				tehaiTbl[prevListIdx] = false;
			}
			tehaiTbl[listIdx] = false;
		}
		// 残りを確認
		for (listIdx = 0; listIdx < playerList[arg1].length; listIdx++) {
			if (tehaiTbl[listIdx])
				continue;
			chkIdx = playerList[arg1][listIdx].split(":")[3];
			tehaiTbl[listIdx] = true;
			// 対子を確認
			nextListIdx = findListIdx(arg1, paiList[chkIdx].category, paiList[chkIdx].idx);
			if (nextListIdx !== -1) {
				tehaiTbl[nextListIdx] = true;
				tehaiMachiTbl[arg1][listIdx] = paiToitsu;
				tehaiMachiTbl[arg1][nextListIdx] = paiToitsu;
				machiCntTbl[paiToitsu]++;
				continue;
			}
			// 単騎待ち
			if (paiList[chkIdx].attr == paiAttrJi) {
				machiCntTbl[paiTanki]++;
				continue;
			}
			// 辺張待ちか両面待ちかを確認
			nextListIdx = findListIdx(arg1, paiList[chkIdx].category, paiList[chkIdx].idx + 1);
			if (nextListIdx > -1) {
				tehaiTbl[nextListIdx] = true;
				nextIdx = playerList[arg1][nextListIdx].split(":")[3];
				if (paiList[chkIdx].idx == paiIdx1 ||
					paiList[chkIdx].idx == paiIdx9 ||
					paiList[nextIdx].idx == paiIdx1 ||
					paiList[nextIdx].idx == paiIdx9) {
					// 辺張待ち
					tehaiMachiTbl[arg1][listIdx] = paiPenchan;
					tehaiMachiTbl[arg1][nextListIdx] = paiPenchan;
					machiCntTbl[paiPenchan]++;
				} else {
					// 両面待ち
					tehaiMachiTbl[arg1][listIdx] = paiRyanmen;
					tehaiMachiTbl[arg1][nextListIdx] = paiRyanmen;
					machiCntTbl[paiRyanmen]++;
				}
				continue;
			}
			// 嵌張待ちを確認
			nextListIdx = findListIdx(arg1, paiList[chkIdx].category, paiList[chkIdx].idx + 2);
			if (nextListIdx > -1) {
				tehaiTbl[nextListIdx] = true;
				tehaiMachiTbl[arg1][listIdx] = paiKanchan;
				tehaiMachiTbl[arg1][nextListIdx] = paiKanchan;
				machiCntTbl[paiKanchan]++;
				continue;
			}
			tehaiMachiTbl[arg1][listIdx] = paiTanki;
			machiCntTbl[paiTanki]++;
		}
		if (playerNakiList[arg1].length > 0) {
			i = 0;
			while (i < playerNakiList[arg1].length) {
				chkIdx = playerNakiList[arg1][i].split(":")[3];
				chkCategory = paiList[chkIdx].category;
				categoryTbl[chkCategory].idx++;
				switch (paiList[chkIdx].nakiCategory) {
					case nakiCategoryChii:
						machiCntTbl[paiChii]++;
						for (listIdx = 0; listIdx < idxMax; listIdx++) {
							chkIdx = playerNakiList[arg1][i + listIdx].split(":")[3];
							tmpIdx = tmpIdx + paiList[chkIdx].idx;
							categoryTbl[chkCategory].idxTbl[paiList[chkIdx].idx]++;
						}
						tmpIdx = Math.floor(tmpIdx / 3) - 1;
						categoryTbl[chkCategory].syuntsuTbl[tmpIdx]++;
						categoryTbl[chkCategory].chiiIdx++;
						break;
					case nakiCategoryPon:
						categoryTbl[chkCategory].ponIdx++;
						machiCntTbl[paiPon]++;
						tmpIdx = paiList[chkIdx].idx;
						categoryTbl[chkCategory].koutsuTbl[tmpIdx]++;
						categoryTbl[chkCategory].idx[tmpIdx]++;
						break;
					case nakiCategoryAnkan:
						categoryTbl[chkCategory].ankanIdx++;
						machiCntTbl[paiAnkan]++;
						tmpIdx = paiList[chkIdx].idx;
						categoryTbl[chkCategory].koutsuTbl[tmpIdx]++;
						categoryTbl[chkCategory].idx[tmpIdx]++;
						break;
					case nakiCategoryMinkan:
						categoryTbl[chkCategory].minkanIdx++;
						machiCntTbl[paiMinkan]++;
						tmpIdx = paiList[chkIdx].idx;
						categoryTbl[chkCategory].koutsuTbl[tmpIdx]++;
						categoryTbl[chkCategory].idx[tmpIdx]++;
						break;
				}
				if (paiList[chkIdx].nakiCategory == nakiCategoryPon ||
					paiList[chkIdx].nakiCategory == nakiCategoryChii) {
					i = i + 3;
				} else {
					i = i + 4;
				}
			}
		}
	}

	// カテゴリ初期化
	function initCategory() {
		for (var tmpCategory = 0; tmpCategory < categoryTbl.length; tmpCategory++) {
			with (categoryTbl[tmpCategory]) {
				idx = 0;
				syuntsuIdx = 0;
				koutsuIdx = 0;
				chiiIdx = 0;
				ponIdx = 0;
				ankanIdx = 0;
				minkanIdx = 0;
				for (var i = 0; i < idxTbl.length; i++)
					idxTbl[i] = 0;
				for (var i = 0; i < syuntsuTbl.length; i++)
					syuntsuTbl[i] = 0;
				for (var i = 0; i < koutsuTbl.length; i++)
					koutsuTbl[i] = 0;
			}
		}
	}

	// 属性数初期化
	function initAttrCnt(arg1) {
		var idx;
		var tmpAttr;
		for (var i = 0; i < attrCntTbl.length; i++)
			attrCntTbl[i] = 0;
		for (var i = 0; i < playerList[arg1].length; i++) {
			idx = playerList[arg1][i].split(":")[3];
			tmpAttr = paiList[idx].attr;
			attrCntTbl[tmpAttr]++;
		}
		for (var i = 0; i < playerNakiList[arg1].length; i++) {
			idx = playerNakiList[arg1][i].split(":")[3];
			tmpAttr = paiList[idx].attr;
			attrCntTbl[tmpAttr]++;
		}
	}

	// カテゴリ数初期化
	function initCategoryCnt(arg1) {
		var idx;
		var tmpCategory;
		for (var i = 0; i < categoryCntTbl.length; i++)
			categoryCntTbl[i] = 0;
		for (var i = 0; i < playerList[arg1].length; i++) {
			idx = playerList[arg1][i].split(":")[3];
			tmpCategory = paiList[idx].category;
			categoryCntTbl[tmpCategory]++;
		}
	}

	// 手牌をカテゴリとインデックスを基に検索
	function findListIdx(arg1, arg2, arg3) {
		var idx;
		for (var i = 0; i < playerList[arg1].length; i++) {
			if (tehaiTbl[i])
				continue;
			idx = playerList[arg1][i].split(":")[3];
			if (paiList[idx].category == arg2 && paiList[idx].idx == arg3)
				return i;
		}
		return -1;
	}

	// 立直設定
	function setRiichi(arg1) {
		playerRiichi[arg1].enabled = true;
		playerRiichi[arg1].ippatsu = true;
		playerRiichi[arg1].naki = false;
		playerRiichi[arg1].idx = Math.floor((tsumoMax - paiCnt) / playerMax);
	}

	// 立直クリア
	function clearRiichi(arg1) {
		playerRiichi[arg1].enabled = false;
		playerRiichi[arg1].ippatsu = false;
	}

	// 立直(一発)全クリア
	function clearRiichiAll() {
		for (var i = 0; i < playerRiichi.length; i++)
			playerRiichi[i].ippatsu = false;
	}

	// 鳴きを確認
	function chkNaki() {
		if (machiCntTbl[paiPon] > 0 ||
			machiCntTbl[paiChii] > 0 ||
			machiCntTbl[paiMinkan] > 0)
			return true;
		return false;
	}

	// 待ちを確認
	function chkUseMachi() {
		if (machiCntTbl[paiTanki] == 0 &&
			machiCntTbl[paiKanchan] == 0 &&
			machiCntTbl[paiPenchan] == 0 &&
			machiCntTbl[paiRyanmen] == 0 &&
			machiCntTbl[paiToitsu] == 0)
			return false;
		else
			return true;
	}

	// 両面待ちを確認
	function chkRyanmen(arg1) {
		switch (machiCntTbl[paiRyanmen]) {
			case 0:
				return chkNext;
			case 1:
				if (machiCntTbl[paiToitsu] == 1 &&
					machiCntTbl[paiPenchan] == 0 &&
					machiCntTbl[paiTanki] == 0 &&
					machiCntTbl[paiKanchan] == 0)
						return chkTrue;
		}
		return chkFalse;
	}

	// 辺張待ちを確認
	function chkPenchan(arg1) {
		switch (machiCntTbl[paiPenchan]) {
			case 0:
				return chkNext;
			case 1:
				if (machiCntTbl[paiToitsu] == 1 &&
					machiCntTbl[paiRyanmen] == 0 &&
					machiCntTbl[paiTanki] == 0 &&
					machiCntTbl[paiKanchan] == 0)
						return chkTrue;
		}
		return chkFalse;
	}

	// 嵌張待ちを確認
	function chkKanchan(arg1) {
		switch (machiCntTbl[paiKanchan]) {
			case 0:
				return chkNext;
			case 1:
				if (machiCntTbl[paiToitsu] == 1 &&
					machiCntTbl[paiTanki] == 0 &&
					machiCntTbl[paiPenchan] == 0 &&
					machiCntTbl[paiRyanmen] == 0)
						return chkTrue;
		}
		return chkFalse;
	}

	// 双碰待ちを確認
	function chkSyabo(arg1) {
		switch (machiCntTbl[paiToitsu]) {
			case 0:
			case 1:
				return chkNext;
			case 2:
				if (machiCntTbl[paiTanki] == 0 &&
					machiCntTbl[paiKanchan] == 0 &&
					machiCntTbl[paiPenchan] == 0 &&
					machiCntTbl[paiRyanmen] == 0)
						return chkTrue;
		}
		return chkFalse;
	}

	// 単騎待ちを確認
	function chkTanki(arg1) {
		switch (machiCntTbl[paiTanki]) {
			case 0:
				return chkNext;
			case 1:
			case 2:
				if (machiCntTbl[paiToitsu] == 0 &&
					machiCntTbl[paiPenchan] == 0 &&
					machiCntTbl[paiKanchan] == 0 &&
					machiCntTbl[paiRyanmen] == 0)
						return chkTrue;
		}
		return chkFalse;
	}

	// 聴牌を確認
	function chkTenpai(arg1) {
		chkMachi(arg1);
		isChiitoi = chkChiitoiSub(arg1);
		var chkCnt = 0;
		if (isChiitoi) {
			for (var i = 0; i < 2; i++) {
				switch (i) {
					case 0:
						chkCnt = chkChiitoi(arg1);
						break;
					case 1:
						chkCnt = chkKokushi(arg1);
						break;
				}
				if (chkCnt == chkTrue) {
					return true;
				}
			}
		}
		isChiitoi = false;
		if (!chkUseMachi())
			return false;
		chkMachi(arg1);
		for (var i = 0; i < 5; i++) {
			switch (i) {
				case 0:
					chkCnt = chkRyanmen(arg1);
					break;
				case 1:
					chkCnt = chkPenchan(arg1);
					break;
				case 2:
					chkCnt = chkKanchan(arg1);
					break;
				case 3:
					chkCnt = chkSyabo(arg1);
					break;
				case 4:
					chkCnt = chkTanki(arg1);
					break;
			}
			switch (chkCnt) {
				case chkTrue:
					return true;
				case chkFalse:
					return false;
			}
		}
		yakuList.length = 0;
		chkChinitsu(arg1, playerChkList, true);
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return true;
		}
		return false;
	}

	// ツモを確認
	function chkTsumo(arg1) {
		for (var i = 0; i < machiMax; i++)
			machiSubTbl[i] = machiCntTbl[i];
		playerList[playerChkList] = playerList[arg1].slice();
		playerNakiList[playerChkList] = playerNakiList[arg1].slice();
		playerList[playerChkList].sort();
		if (chkAgari(arg1, playerChkList))
			return true;
		return false;
	}

	// 和了を確認
	function chkAgari(arg1, arg2) {
		chkMachi(arg2);
		if (machiCntTbl[paiRyanmen] == 0 &&
			machiCntTbl[paiPenchan] == 0 &&
			machiCntTbl[paiKanchan] == 0) {
			if (machiCntTbl[paiToitsu] == 1) {
				getYaku(arg1, arg2, true);
				if (getHan() > 0)
					return true;
			} else if (chkKokushi(arg2) == chkTrue) {
				return true;
			} else if (chkChiitoi(arg2) == chkTrue) {
				return true;
			}
		}
		return false;
	}

	// ロンを確認
	function chkRon(arg1, arg2) {
		var idx;
		for (var i = 0; i < playerSuteList[arg1].length; i++) {
			idx = playerSuteList[arg1][i].split(":")[3];
			if (paiList[arg2].idx == paiList[idx].idx && paiList[arg2].category == paiList[idx].category)
				return false;
		}
		chkMachi(arg1);
		for (var i = 0; i < machiMax; i++)
			machiSubTbl[i] = machiCntTbl[i];
		playerList[playerChkList] = playerList[arg1].slice();
		playerNakiList[playerChkList] = playerNakiList[arg1].slice();
		var category = paiList[arg2].category;
		playerList[playerChkList].push(categoryList[category] + ":" + paiList[arg2].idx + ":" + "A" + ":" + arg2);
		playerList[playerChkList].sort();
		if (chkAgari(arg1, playerChkList))
			return true;
		return false;
	}

	// カンを確認
	function chkKan(arg1, arg2) {
		return chkPonKan(arg1, arg2, 3);
	}

	// ポンを確認
	function chkPon(arg1, arg2) {
		return chkPonKan(arg1, arg2, 2);
	}

	// ポン・カン確認
	function chkPonKan(arg1, arg2, arg3) {
		var chkIdx, chkCnt;
		if (playerRiichi[arg1].enabled)
			return false;
		chkCnt = 0;
		for (var i = 0; i < playerList[arg1].length; i++) {
			chkIdx = playerList[arg1][i].split(":")[3];
			if (paiList[chkIdx].category == paiList[arg2].category &&
				paiList[chkIdx].idx == paiList[arg2].idx) {
				chkCnt++;
				if (chkCnt == arg3)
					return true;
			}
		}
		return false;
	}

	// チーを確認
	function chkChii(arg1, arg2) {
		var chkPlayer, chkIdx, chkCnt, prevCnt;
		if (paiList[arg2].attr == paiAttrJi)
			return false;
		chkPlayer = (arg1 + 1) % playerMax;
		if (playerRiichi[chkPlayer].enabled)
			return false;
		chkCnt = 20;
		prevCnt = 20;
		nakiCnt = 0;
		var r = false;
		for (var i = 0; i < playerList[chkPlayer].length; i++) {
			chkIdx = playerList[chkPlayer][i].split(":")[3];
			if (paiList[chkIdx].category == paiList[arg2].category) {
				chkCnt = paiList[chkIdx].idx - paiList[arg2].idx;
				if (chkCnt != 0) {
					if ((prevCnt == -2 && chkCnt == -1) ||
						(prevCnt == -1 && chkCnt == 1) ||
						(prevCnt == 1 && chkCnt == -1) ||
						(prevCnt == 1 && chkCnt == 2)) {
						r = true;
						if (nakiCnt == 0)
							nakiIdx[1] = i;
						nakiCnt++;
					}
					prevCnt = chkCnt;
					if (nakiCnt == 0)
						nakiIdx[0] = i;
				}
			}
		}
		return r;
	}

	// ユーザのチーを確認
	function chkUserChii(arg1, arg2, arg3, arg4) {
		var chkPaiIdx1 = playerList[arg1][arg3].split(":")[3];
		var chkPaiIdx2 = playerList[arg1][arg4].split(":")[3];
		if (paiList[arg2].attr == paiAttrJi ||
			paiList[chkPaiIdx1].attr == paiAttrJi ||
			paiList[chkPaiIdx2].attr == paiAttrJi)
			return;
		if (paiList[chkPaiIdx1].category != paiList[arg2].category ||
			paiList[chkPaiIdx2].category != paiList[arg2].category)
			return;
		if (paiList[chkPaiIdx1].idx == paiList[arg2].idx ||
			paiList[chkPaiIdx2].idx == paiList[arg2].idx)
			return;
		if (playerRiichi[arg1].enabled)
			return;
		var i = Math.abs(paiList[chkPaiIdx1].idx - paiList[chkPaiIdx2].idx);
		if (i == 2) {
			if (Math.floor((paiList[chkPaiIdx1].idx + paiList[chkPaiIdx2].idx) / 2) == paiList[arg2].idx)
				return true;
		} else if (Math.abs(paiList[arg2].idx - paiList[chkPaiIdx1].idx) == 1 ||
			Math.abs(paiList[arg2].idx - paiList[chkPaiIdx2].idx) == 1){
			return true;
		}
	}

	// 暗カン確認
	function chkAnkan(arg1) {
		var chkIdx;
		var chkCnt;
		var idx;
		for (var i = 0; i < playerList[arg1].length; i++) {
			chkIdx = playerList[arg1][i].split(":")[3];
			chkCnt = 0;
			for (var j = 0; j < playerList[arg1].length; j++) {
				if (j == i)
					continue;
				idx = playerList[arg1][j].split(":")[3];
				if (paiList[chkIdx].category == paiList[idx].category &&
					paiList[chkIdx].idx == paiList[idx].idx) {
						chkCnt++;
						if (chkCnt == 3)
							return true;
					}
			}
		}
	}

	// ポンからカンを確認
	function chkPonToKan(arg1) {
		if (playerNakiList[arg1].length == 0)
			return false;
		var chkIdx;
		var chkCnt;
		var idx;
		for (var i = 0; i < playerList[arg1].length; i++) {
			idx = playerList[arg1][i].split(":")[3];
			chkCnt = 0;
			for (var j = 0; j < playerNakiList[arg1].length; j++) {
				chkIdx = playerNakiList[arg1][j].split(":")[3];
				if (paiList[chkIdx].category == paiList[idx].category &&
					paiList[chkIdx].idx == paiList[idx].idx) {
						chkCnt++;
						if (chkCnt == 3)
							return true;
					}
			}
		}
	}

	// 役・飜を追加
	function addYakuHan(arg1, arg2) {
		if (arg2 >= hanYakuman)
			yakuList.length = 0;
		yakuList.push(new yakuData(arg1, arg2));
	}

	// 役を追加
	function addYaku(arg1) {
		addYakuHan(arg1, yakuTbl[arg1]);
	}

	// 待ちを確認
	function chkNotMachi() {
		if (machiCntTbl[paiTanki] == 0 &&
			machiCntTbl[paiKanchan] == 0 &&
			machiCntTbl[paiPenchan] == 0 &&
			machiCntTbl[paiRyanmen] == 0)
			return true;
		return false;
	}

	// 場を確認
	function chkField(arg1, arg2, arg3) {
		var tmpRiichi = playerRiichi[arg1].enabled && chkTenpai(arg1);
		if (tmpRiichi) {
			if (playerRiichi[arg1].idx == 0)
				addYaku("ダブル立直");
			else
				addYaku("立直");
		}
		if (tmpRiichi && playerRiichi[arg1].ippatsu)
			addYaku("一発");
		if (!arg3 && !chkNaki())
			addYaku("門前清自摸和");
		if (paiCnt == 1 && machiCntTbl[paiToitsu] == 1 && chkNotMachi()) {
			if (arg3)
				addYaku("海底摸月");
			else
				addYaku("河底撈魚");
		}
		if (isKan && paiCnt == 1 && machiCntTbl[paiToitsu] == 1 && chkNotMachi())
			addYaku("嶺上開花");
		if (paiCnt == tsumoMax && arg1 == getPlayerCnt(oyaCnt)) {
			if (machiCntTbl[paiToitsu] == 1 && chkNotMachi() && machiCntTbl[paiSyuntsu] + machiCntTbl[paiKoutsu] == 4)
				addYaku("天和");
		} else if (paiCnt >= tsumoMax - 3 && !arg3 && arg1 != getPlayerCnt(oyaCnt)) {
			if (machiCntTbl[paiToitsu] == 1 && chkNotMachi() && machiCntTbl[paiSyuntsu] + machiCntTbl[paiKoutsu] == 4)
				addYaku("地和");
		}
	}

	// 役を取得
	function getYaku(arg1, arg2, arg3) {
		yakuList.length = 0;
		chkMachi(arg2);
		chkField(arg1, arg2, arg3);
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (chkKokushi(arg2) == chkTrue) {
			addYaku("国士無双");
			return;
		}
		if (chkChiitoi(arg2) == chkTrue) {
			addYaku("七対子");
			isChiitoi = true;
		} else {
			isChiitoi = false;
			chkMachi(arg2);
			chkPinfuToitoi(arg1, arg2, arg3);
			chkSanankou(arg1, arg2, arg3);
			chkSansyoku(arg1, arg2, arg3);
			chkIttsu(arg1, arg2, arg3);
			chkIipei(arg1, arg2, arg3);
			chkYakuhai(arg1, arg2);
		}
		chkTanyaoRoutou(arg1, arg2, arg3);
		chkChinitsu(arg1, arg2, arg3);
	}

	// 飜を取得
	function getHan() {
		var hanCnt = 0;
		for (var i = 0; i < yakuList.length; i++)
			hanCnt += yakuList[i].hanCnt;
		return hanCnt;
	}

	// 符を取得
	function getFu(arg1, arg2, arg3) {
		// 基本点(20符)
		tmpFu = 20;
		// アガリ方(2符, 10符)
		if (arg3)
			tmpFu += 10;
		else
			tmpFu += 2;
		for (var i = 0; i < tehaiTbl.length; i++)
			tehaiTbl[i] = false;
		for (var i = 0; i < paiFuMax; i++)
			paiFuCntTbl[i] = 0;
		// 待ちの形(2符)
		var chkCnt;
		for (var i = 0; i < 2; i++)	{
			switch (i) {
				case 0:
					chkCnt = chkPenchan(arg1);
					break;
				case 1:
					chkCnt = chkKanchan(arg1);
					break;
				case 2:
					chkCnt = chkTanki(arg1);
					break;
			}
			if (chkCnt == chkTrue) {
				paiFuCntTbl[paiMachiFu] += 2;
				break;
			}
		}
		var chkIdx;
		var findSeki, findJikaze;
		// メンゼンの場合
		for (var i = 0; i < playerList[arg2].length; i++) {
			if (tehaiTbl[i])
				continue;
			if (tehaiMachiTbl[arg1][i] == paiKoutsu) {
				tehaiTbl[i] = true;
				tehaiTbl[i + 1] = true;
				tehaiTbl[i + 2] = true;
				chkIdx = playerList[arg2][i].split(":")[3];
				if (paiList[chkIdx].attr == paiAttrJi || paiList[chkIdx].attr == paiAttrRoutou)
					// 1・9、字牌の暗コウ
					paiFuCntTbl[paiKoutsuYaochu]++;
				else
					// 2～8までの暗コウ
					paiFuCntTbl[paiKoutsuChunchan]++;
			} else if (tehaiMachiTbl[arg1][i] == paiToitsu) {
				tehaiTbl[i] = true;
				tehaiTbl[i + 1] = true;
				chkIdx = playerList[arg2][i].split(":")[3];
				if (paiList[chkIdx].attr == paiAttrJi) {
					if (paiList[chkIdx].category == paiCategoryKaze) {
						if (Math.floor(gameCnt / nanpuSen) == paiList[chkIdx].index)
							// 役牌の役がつく牌のアタマ(場風)
							paiFuCntTbl[paiToitsuBakaze]++;
						findSeki = oyaCnt;
						for (findJikaze = 0; findJikaze < playerMax; findJikaze++) {
							if (getPlayerCnt(findSeki) == arg1)
								break;
							findSeki++;
							findSeki = findSeki % playerMax;
						}
					}
					if (findJikaze == paiList[chkIdx].idx)
						// 役牌の役がつく牌のアタマ(自風)
						paiFuCntTbl[paiToitsuJikaze]++;
				} else if (paiList[chkIdx].category == paiCategorySangen) {
					// 役牌の役がつく牌のアタマ(役牌)
					paiFuCntTbl[paiToitsuSangen]++;
				}
			}
		}
		// 鳴きの場合
		if (playerNakiList[arg2].length > 0) {
			for (var i = 0; i < tehaiTbl.length; i++)
				tehaiTbl[i] = false;
			for (var i = 0; i < playerNakiList[arg2].length; i++) {
				if (tehaiTbl[i])
					continue;
				chkIdx = playerNakiList[arg2][i].split(":")[3];
				if (paiList[chkIdx].nakiCategory == nakiCategoryPon) {
					tehaiTbl[i] = true;
					tehaiTbl[i + 1] = true;
					tehaiTbl[i + 2] = true;
					if (paiList[chkIdx].attr == paiAttrJi || paiList[chkIdx].attr == paiAttrRoutou)
						// 1・9、字牌の暗コウ
						paiFuCntTbl[paiPonYaochu]++;
					else
						// 2～8までの暗コウ
						paiFuCntTbl[paiPonChunchan]++;
				} else if (paiList[chkIdx].nakiCategory == nakiCategoryAnkan) {
					tehaiTbl[i] = true;
					tehaiTbl[i + 1] = true;
					tehaiTbl[i + 2] = true;
					tehaiTbl[i + 3] = true;
					if (paiList[chkIdx].attr == paiAttrJi || paiList[chkIdx].attr == paiAttrRoutou)
						// 1・9、字牌の暗カン
						paiFuCntTbl[paiAnkanYaochu]++;
					else
						// 2～8までの暗カン
						paiFuCntTbl[paiAnkanChunchan]++;
				} else if (paiList[chkIdx].nakiCategory == nakiCategoryMinkan) {
					tehaiTbl[i] = true;
					tehaiTbl[i + 1] = true;
					tehaiTbl[i + 2] = true;
					tehaiTbl[i + 3] = true;
					if (paiList[chkIdx].attr == paiAttrJi || paiList[chkIdx].attr == paiAttrRoutou)
						// 1・9、字牌の明カン
						paiFuCntTbl[paiMinkanYaochu]++;
					else
						// 2～8までの明カン
						paiFuCntTbl[paiMinkanChunchan]++;
				}
			}
		}
		for (var i = 0; i < paiFuMax; i++)
			tmpFu = tmpFu + paiFuCntTbl[i] * paiFuTbl[i];
		// 1の位を切り上げ
		tmpFu = Math.floor((tmpFu + 9) / 10) * 10;
		return tmpFu;
	}

	// 点数を取得
	function getScore(arg1, arg2, arg3) {
		var tmpHan = arg1;
		var tmpFu = arg2;
		var tmpScore;
		tmpFu = Math.floor(tmpFu / 10);
		if (arg3 == scoreAttrKoRon || arg3 == scoreAttrOyaRon)
			tmpFu = tmpFu - 3;
		else
			tmpFu = tmpFu - 2;
		if (isChiitoi) {
			if (tmpHan <= 4) {
				if (tmpHan <= 3)
					tmpHan--;
				switch (arg3) {
					case scoreAttrOyaTsumo:
						tmpScore = 1600 * tmpHan;
						break;
					case scoreAttrOyaRon:
						tmpScore = 2400 * tmpHan;
						break;
					case scoreAttrKoTsumoKo:
						tmpScore = 800 * tmpHan;
						break;
					case scoreAttrKoTsumoOya:
						tmpScore = 1600 * tmpHan;
						break;
					case scoreAttrKoRon:
						tmpScore = 1600 * tmpHan;
						break;
				}
				return tmpScore;
			} else {
				tmpFu = 7;
			}
		}
		tmpHan--;
		tmpHan = tmpHan % 13;
		switch (arg3) {
			case scoreAttrOyaTsumo:
				tmpScore = scoreOyaTsumoTbl[tmpHan][tmpFu];
				break;
			case scoreAttrOyaRon:
				tmpScore = scoreOyaRonTbl[tmpHan][tmpFu];
				break;
			case scoreAttrKoTsumoKo:
				tmpScore = scoreKoTsumoTbl[tmpHan][tmpFu];
				break;
			case scoreAttrKoTsumoOya:
				tmpScore = scoreOyaTsumoTbl[tmpHan][tmpFu];
				break;
			case scoreAttrKoRon:
				tmpScore = scoreKoRonTbl[tmpHan][tmpFu];
				break;
		}
		if (renchanCnt > 0) {
			if (arg3 == scoreAttrOyaRon || arg3 == scoreAttrKoRon)
				tmpScore = tmpScore + (renchanCnt * 300);
			else
				tmpScore = tmpScore + (renchanCnt * 100);
		}
		return tmpScore;
	}

	// 点数を設定
	function setScore(arg1, arg2) {
		var tmpScore = scoreList[arg1];
		scoreList[arg1] += arg2;
		if (arg1 == playerUser)
			return;
		if (tmpScore > bonusCnt1 && scoreList[arg1] <= bonusCnt1)
			bonusList.push(new bonusData(arg1, 0));
		if (tmpScore > bonusCnt2 && scoreList[arg1] <= bonusCnt2)
			bonusList.push(new bonusData(arg1, 1));
	}

	// ドラを確認
	function chkDora(arg1, arg2, arg3) {
		if (yakuList.length > 0 && yakuList[yakuList.length - 1].hanCnt == hanYakuman)
			return;
		var chkIdx;
		var chkCnt = 0;
		for (var i = 0; i < playerList[arg2].length; i++) {
			chkIdx = playerList[arg2][i].split(":")[3];
			chkCnt += paiList[chkIdx].dora;
			if (paiList[chkIdx].aka)
				chkCnt++;
		}
		for (var i = 0; i < playerNakiList[arg2].length; i++) {
			chkIdx = playerNakiList[arg2][i].split(":")[3];
			chkCnt += paiList[chkIdx].dora;
			if (paiList[chkIdx].aka)
				chkCnt++;
		}
		if (chkCnt > 0)
			yakuList.push(new yakuData("ドラ", chkCnt));
	}

	// 七対子を確認
	function chkChiitoi(arg1) {
		if (chkNaki())
			return chkFalse;
		for (var i= 0; i < tehaiTbl.length; i++)
			tehaiTbl[i] = false;
		machiCntTbl[paiToitsu] = 0;
		machiCntTbl[paiTanki] = 0;
		for (var listIdx = 0; listIdx < playerList[arg1].length; listIdx++) {
			if (tehaiTbl[listIdx])
				continue;
			var chkIdx = playerList[arg1][listIdx].split(":")[3];
			tehaiTbl[listIdx] = true;
			var nextListIdx = findListIdx(arg1, paiList[chkIdx].category, paiList[chkIdx].idx);
			if (nextListIdx !== -1) {
				tehaiTbl[nextListIdx] = true;
				machiCntTbl[paiToitsu]++;
				continue;
			}
			machiCntTbl[paiTanki]++;
		}
		if ((machiCntTbl[paiToitsu] == 6 && machiCntTbl[paiTanki] == 1 && machiCntTbl[paiSyuntsu] < 4) ||
			(machiCntTbl[paiToitsu] == 7 && machiCntTbl[paiTanki] == 0 && machiCntTbl[paiSyuntsu] < 4))
			return chkTrue;
		return chkFalse;
	}

	// 七対子を確認(補助)
	function chkChiitoiSub() {
		var categoryCnt1 = 0;
		var categoryCnt2 = 0;
		var categoryCnt3 = 0;
		for (var i = 0; i < paiCategoryMax; i++) {
			if ((categoryCntTbl[i] % 2 == 0) &&
				(categoryCntTbl[i] !== 0))
				categoryCnt2++;
			if (categoryCntTbl[i] == 13 || categoryCntTbl[i] == 14)
				categoryCnt2++;
			if (categoryCntTbl[i] == 3)
				categoryCnt3++;
			if (categoryCntTbl[i] != 0)
				categoryCnt1++;
		}
		if ((categoryCnt2 == categoryCnt1 - 1 && categoryCnt3 == 0) ||
			(categoryCnt3 == 2 && categoryCntTbl[paiCategorySangen] == 3) ||
			(categoryCnt3 == 1))
				return true;
		return false;
	}

	// 国士無双を確認
	function chkKokushi(arg1) {
		if (chkNaki())
			return chkFalse;
		chkMachi(arg1);
		if (!(machiCntTbl[paiToitsu] == 1 || machiCntTbl[paiToitsu] == 0))
			return chkFalse;
		var prevIdx = -1;
		var prevCategory = -1;
		var tmpCnt = 0;
		for (var i = 0; i < playerList[arg1].length; i++) {
			var chkIdx = playerList[arg1][i].split(":")[3];
			if (paiList[chkIdx].attr == paiAttrJi) {
				if (prevCategory == paiList[chkIdx].category && prevIdx == paiList[chkIdx].idx)
					tmpCnt++;
				prevCategory = paiList[chkIdx].category;
				prevIdx = paiList[chkIdx].idx;
			} else if (paiList[chkIdx].idx == paiIdx1 || paiList[chkIdx].idx == paiIdx9) {
				if (prevIdx == paiList[chkIdx].idx)
					tmpCnt++;
				prevIdx = paiList[chkIdx].idx;
			} else {
				return chkFalse;
			}
			if ((tmpCnt != 0 && machiCntTbl[paiToitsu] == 0) ||
				(tmpCnt > 1 && machiCntTbl[paiToitsu] == 1))
				return chkFalse;
			machiCntTbl[paiTanki]++;
		}
		if (machiCntTbl[paiSyuntsu] >= 4 ||
			(machiCntTbl[paiSyuntsu] == 3 && machiCntTbl[paiRyanmen] == 1))
			return chkFalse;
		return chkTrue;
	}

	// 平和・対々和を確認
	function chkPinfuToitoi(arg1, arg2, arg3) {
		if (playerNakiList[arg1].length == 0 &&
			machiCntTbl[paiToitsu] == 1 &&
			machiCntTbl[paiSyuntsu] == 4 &&
			machiSubTbl[paiRyanmen] == 1 &&
			categoryCntTbl[paiCategoryKaze] == 0 &&
			categoryCntTbl[paiCategorySangen] == 0) {
			addYaku("平和");
		} else if (machiCntTbl[paiToitsu] == 1 &&
			machiCntTbl[paiSyuntsu] == 0) {
			if (machiCntTbl[paiKoutsu] + machiCntTbl[paiPon] + machiCntTbl[paiAnkan] + machiCntTbl[paiMinkan] >= 4)
				addYaku("対々和");
		}
	}

	// 四槓子・三槓子・四暗刻・三暗刻を確認
	function chkSanankou(arg1, arg2, arg3) {
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (!(machiCntTbl[paiToitsu] == 1 && chkNotMachi()))
			return;
		var chkKankou = machiCntTbl[paiAnkan] + machiCntTbl[paiMinkan];
		if (machiCntTbl[paiToitsu] == 1 && chkKankou == 4) {
			addYaku("四槓子");
			return;
		} else if (machiCntTbl[paiToitsu] == 1 && chkKankou == 3) {
			addYaku("三槓子");
		}
		var chkAnkou;
		if (arg3)
			chkAnkou = machiSubTbl[paiKoutsu] + machiCntTbl[paiAnkan];
		else
			chkAnkou = machiCntTbl[paiKoutsu] + machiCntTbl[paiAnkan];
		if (machiCntTbl[paiToitsu] == 1 && chkAnkou == 4)
			addYaku("四暗刻");
		else if (machiCntTbl[paiToitsu] == 1 && chkAnkou == 3)
			addYaku("三暗刻");
	}

	// 三色同刻・三色同順を確認
	function chkSansyoku() {
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (!(machiCntTbl[paiToitsu] == 1 && chkNotMachi()))
			return;
		var tmpHan;
		for (var i = 0; i < paiIdx9; i++) {
			if (categoryTbl[paiCategoryManzu].koutsuTbl[i] != 0 &&
				categoryTbl[paiCategoryPinzu].koutsuTbl[i] != 0 &&
				categoryTbl[paiCategorySouzu].koutsuTbl[i] != 0) {
				tmpHan = yakuTbl["三色同刻"];
				if (chkNaki())
					tmpHan--;
				addYakuHan("三色同刻", tmpHan);
				return;
			}
		}
		for (var i = 0; i < syuntsuMax; i++) {
			if (categoryTbl[paiCategoryManzu].syuntsuTbl[i] != 0 &&
				categoryTbl[paiCategoryPinzu].syuntsuTbl[i] != 0 &&
				categoryTbl[paiCategorySouzu].syuntsuTbl[i] != 0) {
				tmpHan = yakuTbl["三色同順"];
				if (chkNaki())
					tmpHan--;
				addYakuHan("三色同順", tmpHan);
				return;
			}
		}
	}

	// 一気通貫を確認
	function chkIttsu(arg1, arg2, arg3) {
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (!(machiCntTbl[paiToitsu] == 1 && chkNotMachi()))
			return;
		if (!(machiCntTbl[paiTanki] != 0))
			return;
		if (machiCntTbl[paiSyuntsu] + machiCntTbl[paiChii] < 3)
			return;
		var tmpHan;
		for (var tmpCategory = paiCategoryManzu; tmpCategory <= paiCategorySouzu; tmpCategory++) {
			with (categoryTbl[tmpCategory]) {
				if (syuntsuTbl[syuntsu123] != 0 &&
					syuntsuTbl[syuntsu456] != 0 &&
					syuntsuTbl[syuntsu789] != 0) {
					tmpHan = yakuTbl["一気通貫"];
					if (chkNaki())
						tmpHan--;
					addYakuHan("一気通貫", tmpHan);
					return;
				}
			}
		}
	}

	// 一盃口・二盃口を確認
	function chkIipei(arg1, arg2, arg3) {
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (!(machiCntTbl[paiToitsu] == 1 && chkNotMachi()))
			return;
		var iipeiCnt = 0;
		var tmpIipeiCnt, tmpHan;
		for (var tmpCategory = paiCategoryManzu; tmpCategory <= paiCategorySouzu; tmpCategory++) {
			tmpIipeiCnt = 0;
			for (var i = 0; i < syuntsuMax; i++) {
				if (categoryTbl[tmpCategory].syuntsuTbl[i] == 2)
					tmpIipeiCnt++;
			}
			if (tmpIipeiCnt > 0)
				iipeiCnt++;
		}
		if (chkNaki())
			return;
		if (iipeiCnt == 1)
			addYaku("一盃口");
		else if (iipeiCnt == 2)
			addYaku("二盃口");
	}

	// 役牌・大四喜・小四喜・大三元・小三元を確認
	function chkYakuhai(arg1, arg2, arg3) {
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (machiCntTbl[paiAnkan] + machiCntTbl[paiMinkan] +
			machiCntTbl[paiPon] + machiCntTbl[paiKoutsu] == 0)
			return;
		if (!(machiCntTbl[paiToitsu] == 1 && chkNotMachi()))
			return;
		var daiCnt = 0;
		var syoCnt = 0;
		var findSeki, findJikaze;
		for (var i = paiIdxTon; i <= paiIdxPei; i++) {
			if (categoryTbl[paiCategoryKaze].koutsuTbl[i] >= 1) {
				if (Math.floor(gameCnt / nanpuSen) == i)
					addYaku("場風");
				findSeki = oyaCnt;
				for (findJikaze = 0; findJikaze < playerMax; findJikaze++) {
					if (getPlayerCnt(findSeki) == arg1)
						break;
					findSeki++;
					findSeki = findSeki % playerMax;
				}
				if (findJikaze == i)
					addYaku("自風");
				daiCnt++;
			} else if (categoryTbl[paiCategoryKaze].koutsuTbl[i] == 2) {
				syoCnt++;
			}
		}
		if (daiCnt == 4) {
			addYaku("大四喜");
		} else if (daiCnt == 3 && syoCnt == 1) {
			addYaku("小四喜");
		}
		daiCnt = 0;
		syoCnt = 0;
		for (var i = paiIdxHaku; i <= paiIdxChun; i++) {
			if (categoryTbl[paiCategorySangen].koutsuTbl[i] >= 1) {
				daiCnt++;
				switch (i) {
					case paiIdxHaku:
						addYaku("白");
						break;
					case paiIdxHatsu:
						addYaku("發");
						break;
					case paiIdxChun:
						addYaku("中");
						break;
				}
			} else if (categoryTbl[paiCategorySangen].koutsuTbl[i] == 2) {
				syoCnt++;
			}
		}
		if (daiCnt == 3) {
			addYaku("大三元");
		} else if (daiCnt == 3 && syoCnt == 1) {
			addYaku("小三元");
		}
	}

	// 断么九・清老頭・混老頭を確認
	function chkTanyaoRoutou(arg1, arg2, arg3) {
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (!(machiCntTbl[paiToitsu] == 1 && chkNotMachi()))
			if (!isChiitoi)
				return;
		var cntMax = playerList[arg2].length + playerNakiList[arg2].length;
		if (attrCntTbl[paiAttrChunchan] >= cntMax)
			addYaku("断么九");
		else if (attrCntTbl[paiAttrRoutou] >= cntMax)
			addYaku("清老頭");
		else if (attrCntTbl[paiAttrRoutou] + attrCntTbl[paiAttrJi] >= cntMax)
			addYaku("混老頭");
		else
			chkChanta(arg1, arg2, arg3);
	}

	// 純全帯么九を確認
	function chkChanta(arg1, arg2, arg3) {
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (!(machiCntTbl[paiToitsu] == 1 && chkNotMachi()))
			return;
		for (var i = paiIdx2; i <= paiIdx8; i++) {
			if (categoryTbl[paiCategoryManzu].koutsuTbl[i] != 0 ||
				categoryTbl[paiCategoryPinzu].koutsuTbl[i] != 0 ||
				categoryTbl[paiCategorySouzu].koutsuTbl[i] != 0)
				return;
		}
		for (var i = syuntsu234; i <= syuntsu678; i++) {
			if (categoryTbl[paiCategoryManzu].syuntsuTbl[i] != 0 ||
				categoryTbl[paiCategoryPinzu].syuntsuTbl[i] != 0 ||
				categoryTbl[paiCategorySouzu].syuntsuTbl[i] != 0)
				return;
		}
		if (attrCntTbl[paiAttrChunchan] != machiCntTbl[paiSyuntsu] * 2)
			return;
		var tmpName;
		if (attrCntTbl[paiAttrJi] != 0)
			tmpName = "混全帯么九";
		else
			tmpName = "純全帯么九";
		var tmpHan = yakuTbl[tmpName];
		if (chkNaki())
			tmpHan--;
		addYakuHan(tmpName, tmpHan);
	}

	// 清一色を確認
	function chkChinitsu(arg1, arg2, arg3) {
		if (yakuList.length > 0) {
			if (yakuList[yakuList.length - 1].hanCnt == hanYakuman)
				return;
		}
		if (!(machiCntTbl[paiToitsu] == 1 && chkNotMachi()))
			if (!isChiitoi)
				return;
		var i;
		var tmpCategoryCntTbl = new Array(paiCategoryMax);
		for (i = 0; i < paiCategoryMax; i++)
			tmpCategoryCntTbl[i] = categoryCntTbl[i];
		var listCnt;
		var chkIdx;
		var chkCategory;
		if (playerNakiList[arg2].length > 0) {
			for (i = 0; i < playerNakiList.length; i++) {
				var chkIdx = playerNakiList[arg2][i].split(":")[3];
				var chkCategory = paiList[chkIdx].category;
				tmpCategoryCntTbl[chkCategory]++;
			}
			listCnt = (playerNakiList[arg2].length - 1) + (playerList[arg2].length - 1);
		} else {
			listCnt = playerList[arg2].length - 1;
		}
		var tmpCategory = 0;
		var tmpHan;
		for (i = 0; i < paiCategoryMax; i++) {
			if (tmpCategoryCntTbl[i] >= listCnt) {
				tmpCategory = i;
				break;
			}
			if (tmpCategoryCntTbl[i] > tmpCategoryCntTbl[tmpCategory])
				tmpCategory = i;
		}
		if (tmpCategoryCntTbl[tmpCategory] < listCnt) {
			tmpCategory = 0;
			for (i = 0; i < paiCategoryMax; i++) {
				if (i == paiCategoryKaze || i == paiCategorySangen)
					continue;
				if (tmpCategoryCntTbl[i] +
					tmpCategoryCntTbl[paiCategoryKaze] + 
					tmpCategoryCntTbl[paiCategorySangen] >= listCnt) {
					tmpCategory = i;
					break;
				}
			}
			if (tmpCategoryCntTbl[i] +
				tmpCategoryCntTbl[paiCategoryKaze] + 
				tmpCategoryCntTbl[paiCategorySangen] >= listCnt)
				return;
			if (machiCntTbl[paiTanki] != 0)
				return;
			if ((tmpCategoryCntTbl[paiCategoryKaze] != 0 || tmpCategoryCntTbl[paiCategorySangen] != 0) &&
				(tmpCategoryCntTbl[tmpCategory] + tmpCategoryCntTbl[paiCategoryKaze] + tmpCategoryCntTbl[paiCategorySangen] >= listCnt)) {
				if (tmpCategory == paiCategorySouzu) {
					var tmpCnt = categoryTbl[paiCategorySangen].idxTbl[paiIdxHatsu] +
						categoryTbl[paiCategorySangen].idxTbl[paiIdx2] +
						categoryTbl[paiCategorySangen].idxTbl[paiIdx3] +
						categoryTbl[paiCategorySangen].idxTbl[paiIdx4] +
						categoryTbl[paiCategorySangen].idxTbl[paiIdx6] +
						categoryTbl[paiCategorySangen].idxTbl[paiIdx8];
					if (tmpCnt == (playerNakiList[arg2].length - 1) + (playerList[arg2].length - 1)) {
						addYaku("緑一色");
						return;
					}
				} else if (tmpCategoryCntTbl[tmpCategory] == 0) {
					addYaku("字一色");
					return;
				}
				tmpHan = yakuTbl["混一色"];
				if (chkNaki())
					tmpHan--;
				addYakuHan("混一色", tmpHan);
			}
		} else {
			var tmpIdx;
			for (i = 0; i < paiCategoryMax; i++) {
				tmpIdx = i;
				if (i == tmpCategory)
					continue;
				if (tmpCategoryCntTbl[i] != 0) {
					tmpIdx = -1;
					break;
				}
			}
			i = tmpIdx;
			if (i != -1) {
				if (tmpCategory == paiCategoryManzu) {
					for (i = paiIdx1; i <= paiIdx9; i++) {
						tmpIdx = i;
						if (i == paiIdx1 || i == paiIdx9) {
							if (categoryTbl[paiCategoryManzu].idxTbl[i] < 3) {
								tmpIdx = 0;
								break;
							}
						} else {
							if (categoryTbl[paiCategoryManzu].idxTbl[i] == 0) {
								tmpIdx = 0;
								break;
							}
						}
					}
					i = tmpIdx;
					if (i != 0) {
						addYaku("九蓮宝燈");
						return;
					}
				}
				tmpHan = yakuTbl["清一色"];
				if (chkNaki())
					tmpHan--;
				addYakuHan("清一色", tmpHan);
			}
		}
	}

	// 漢数字に変換
	function toKanji(arg1){
		var kanjiStr = ":一二三四五六七八九".match(/./g);
		var ketaStr = ":十百千".match(/./g);
		var ketaStr2 = ":万億兆京".match(/./g);
		var i , j;
		if (arg1 == 0)
			return "零";
		arg1 = arg1 + "";
		arg1 = arg1.match(/./g).reverse().join("");
		arg1 = arg1.replace(/(\d{4})/g, "$1,").replace(/\,$/, "").split(",");
		for (i = 0; i < arg1.length; i++){
			var str = "";
			for (j = arg1[i].length - 1; 0 <= j; j--)
				str += kanjiStr[arg1[i].charAt(j)] + ketaStr[j];
			str = str.replace(/:./g,"") + ketaStr2[i];
			if (str.length == 1)
				str="";
			arg1[i] = str.replace(/:/g,"");
			arg1[i] = arg1[i].replace(/一(百)|一(十)/g, "$1$2");
		}
		arg1 = arg1.reverse().join("");
		return arg1;
	}
  
	// 画像先読み
	function initPaiSrc() {
		for (var i = 0; i < playerMax; i++) {
			// 数牌
			for (var tmpCategory = 0; tmpCategory <= paiCategorySouzu; tmpCategory++)
				for (var tmpIdx = paiIdx1; tmpIdx <= paiIdx9; tmpIdx++)
					(new Image()).src = getPaiSrc(i, tmpCategory, tmpIdx, false);
			// 赤ドラ
			(new Image()).src = getPaiSrc(i, paiCategoryManzu, paiIdx5, true);
			(new Image()).src = getPaiSrc(i, paiCategoryPinzu, paiIdx5, true);
			(new Image()).src = getPaiSrc(i, paiCategorySouzu, paiIdx5, true);
			// 風牌
			tmpCategory = paiCategoryKaze;
			for (var tmpIdx = paiIdxTon; tmpIdx <= paiIdxPei; tmpIdx++)
				(new Image()).src = getPaiSrc(i, tmpCategory, tmpIdx, false);
			// 三元牌
			tmpCategory = paiCategorySangen;
			for (var tmpIdx = paiIdxHaku; tmpIdx <= paiIdxChun; tmpIdx++)
				(new Image()).src = getPaiSrc(i, tmpCategory, tmpIdx, false);
			// 裏
			(new Image()).src = getPaiSrc(i, paiCategoryOther, paiIdxUra1, false);
			(new Image()).src = getPaiSrc(i, paiCategoryOther, paiIdxUra2, false);
		}
		for (var i = 0; i < 6; i++) {
			(new Image()).src = getSaiSrc(i + 1);
		}
	}

	initPaiSrc();

	// オープニング
	function doOpening() {
		stopAudio();
		$("#opening").delay(500);
		$("#opening").fadeIn("fast", function() {
			$("#opening_credits").fadeIn("slow").delay(3000).fadeOut("slow", function() {
				$("#opening_title").fadeIn("slow", function() {
					// playAudio(mp3Path + "");
				});
			});
		});
	}

	doOpening();
	// デバッグ(B)
	/*
	$("#opening").hide();
	newGame();
	startGame();
	*/
	// デバッグ(E)

	$("#opening_title_menu_start").click(function() {
		$("#opening_title").fadeOut("slow");
		stopAudio();
		playSound(wavPath + "sound1.wav");
		setTimeout(function() {
			newGame();
			startGame();
			$("#opening").fadeOut("slow");
		}, 1000);
	});

	var effectWidth = 0;
	var effectHeight = 0;
	var effectFps = 15;
	var nowFrame = 0;
	var maxFrame = 0;
	var paiSize1 = [24, 32];
	var paiSize2 = [32, 48];

	(new Image).src = imgPath + "effect/pipo-mapeffect001.png";
	(new Image).src = imgPath + "effect/pipo-mapeffect002.png";

	function effectTimer(){
		$("#effect").css({ "background-position": -effectWidth * nowFrame +"px 0" });
		nowFrame++;
		if (nowFrame >= maxFrame) {
			clearInterval(effectTimerId);
			nowFrame = 0;
			$("#effect").hide();
		};
	}

	function playEffect1(arg1, arg2) {
		var pos = $(arg2).offset();
		pos.left = pos.left / scaleX - transX / scaleX;
		pos.top = pos.top / scaleY - transY / scaleY;
		var src = imgPath + "effect/pipo-mapeffect001.png";
		var offsetLeft = 0;
		var offsetTop = -180;
		var paiWidth = paiSize1[arg1 % 2];
		var paiHeight = paiSize1[Math.floor(arg1 / 2)];
		effectWidth = 480;
		effectHeight = 480;
		maxFrame = 8;
		nowFrame = 0;
		playSound(wavPath + "sound6.wav");
		$("#effect").css({ left: (pos.left - (effectWidth / 2) + (paiWidth / 2) + offsetLeft), top: (pos.top - (effectHeight / 2) + (paiHeight / 2) + offsetTop) }).show();
		$("#effect").css({ background: "url(" + src + ")", width: effectWidth, height: effectHeight });
		effectTimerId = setInterval(effectTimer, 1 / effectFps * 1000);
	}

	function playEffect2(arg1, arg2) {
		var pos = $(arg2).offset();
		var src = imgPath + "effect/pipo-mapeffect002.png";
		pos.left = pos.left / scaleX - transX / scaleX;
		pos.top = pos.top / scaleY - transY / scaleY;
		var offsetLeft = 0;
		var offsetTop = 0;
		if (arg1 == playerUser) {
			var paiWidth = paiSize2[arg1 % 2];
			var paiHeight = paiSize2[Math.floor(arg1 / 2)];
		} else {
			var paiWidth = paiSize1[arg1 % 2];
			var paiHeight = paiSize1[Math.floor(arg1 / 2)];
		}
		effectWidth = 312;
		effectHeight = 312;
		maxFrame = 15;
		nowFrame = 0;
		playSound(wavPath + "sound7.wav");
		$("#effect").css({ left: (pos.left - (effectWidth / 2) + (paiWidth / 2) + offsetLeft), top: (pos.top - (effectHeight / 2) + (paiHeight / 2) + offsetTop) }).show();
		$("#effect").css({ background: "url(" + src + ")", width: effectWidth, height: effectHeight });
		effectTimerId = setInterval(effectTimer, 1 / effectFps * 1000);
	}

	// 声再生
	function playVoice(arg1, arg2) {
		var a = playerVoiceList[playerNameList[playerUserList[arg1]]];
		if (a.length > arg2) {
			with (voice) {
				src = wavPath + a[arg2];
				setTimeout(function() {
					currentTime = 0;
					play();
				}, 50);
			}
		}
	}

	// 効果音再生
	function playSound(arg1) {
		with (sound) {
			src = arg1;
			setTimeout(function() {
				currentTime = 0;
				play();
			}, 50);
		}
	}

	// 音楽再生
	function playAudio(arg1) {
		with (audio) {
			loop = true;
			volume = 0.32;
			src = arg1;
			currentTime = 0;
			play();
		}
	}

	// 音楽停止
	function stopAudio() {
		with (audio) {
			if (!paused) {
				pause();
				currentTime = 0;
			}
		}
	}

	// マウスイベント
	for (var i = 0; i < 14; i++) {
		$("#pai_bottom" + (i + 1)).hover(function() {
			if (/trans/.test($(this).attr("src")))
				$(this).css({ cursor: "default" });
			else
				$(this).css({ cursor: "pointer" });
		}, function() {
			$(this).css({ cursor: "default" });
		});
		$("#pai_bottom" + (i + 1)).click(function() {
			if (timerEnabled || !gameStart || playerNakiMenu)
				return;
			tmpIdx = $(this).attr("data-value");
			if ((playerRiichi[playerUser].enabled && tmpIdx != playerTsumo) || tmpIdx >= playerList[playerUser].length)
				return;
			if (isChii) {
				if (nakiIdx[0] == tmpIdx) {
					setActive(this, true);
					nakiStartCnt = 0;
				} else {
					setActive(this, false);
					nakiIdx[nakiStartCnt] = tmpIdx;
					nakiStartCnt++;
					if (nakiStartCnt == 2) {
						if (chkUserChii(playerUser, nakiIdx[2], nakiIdx[1], nakiIdx[0])) {
							setActive(-1);
							setChii(playerLeft, nakiIdx[2], nakiIdx[1], nakiIdx[0]);
							playerCnt++;
							isChii = false;
						} else {
							setActive(-1);
							nakiStartCnt = 0;
						}
					}
				}
			} else {
				hidePlayerMenu();
				selPai(playerUser, $(this).attr("data-value"));
				if (!gameExit) {
					playerList[playerUser].sort();
					showPai(playerUser, false);
					setActiveSub(-1);
					if (isDora) {
						showDora;
						isDora = false;
					}
				}
			}
		});
	}

	// 暗カンクリック時
	$("#btn_ankan").click(function() {
		playVoice(playerUser, voiceKan);
		hidePlayerMenu();
		if (chkAnkan(playerUser))
			setAnkan(playerUser);
		else if (chkPonToKan(playerUser))
			setPonToKan(playerUser);
	});

	// リーチクリック時
	$("#btn_riichi").click(function() {
		playSound(wavPath + "sound2.wav");
		hidePlayerMenu();
		if (playerCnt == playerUser + 1 && !playerRiichi[playerUser].enabled) {
			chkMachi(playerUser);
			if (!chkNaki()) {
				isRiichi = true;
			}
		}
	});

	// ツモクリック時
	$("#btn_tsumo").click(function() {
		playSound(wavPath + "sound2.wav");
		hidePlayerMenu();
		if (chkTsumo(playerUser)) {
			doTsumo(playerUser);
			endGame(playerUser);
		}
	});

	// チークリック時
	$("#btn_chii").click(function() {
		playVoice(playerUser, voiceChii);
		hidePlayerNakiMenu();
		if (nakiCnt > 1) {
			nakiIdx[2] = suteIdx;
			nakiIdx[1] = -1;
			nakiIdx[0] = -1;
			nakiStartCnt = 0;
			isChii = true;
		} else {
			setChii(playerLeft, suteIdx, nakiIdx[0], nakiIdx[1]);
			isChii = false;
		}
		isRiichi = false;
		clearRiichiAll();
		playerRiichi[playerLeft].naki = true;
	});

	// ポンクリック時
	$("#btn_pon").click(function() {
		playVoice(playerUser, voicePon);
		hidePlayerNakiMenu();
		setPon(playerUser, nowCnt, suteIdx);
		isRiichi = false;
		clearRiichiAll();
		playerRiichi[playerUser].naki = true;
	});

	// 明カンクリック時
	$("#btn_minkan").click(function() {
		playVoice(playerUser, voiceKan);
		hidePlayerNakiMenu();
		setMinkan(playerUser, nowCnt, suteIdx);
		paiCnt--;
		isRiichi = false;
		clearRiichiAll();
		playerRiichi[playerUser].naki = true;
	});

	// ロンクリック時
	$("#btn_ron").click(function() {
		playSound(wavPath + "sound2.wav");
		hidePlayerNakiMenu();
		if (chkRon(playerUser, suteIdx))
			doRon(playerUser, nowCnt, suteIdx);
	});

	// パスクリック時
	$("#btn_pass").click(function() {
		playSound(wavPath + "sound2.wav");
		hidePlayerNakiMenu();
		paiCnt--;
		timerEnabled = true;
		timerId = setTimeout(timer, timerInterval);
	});

	// 次へクリック時
	$("#dialog_next").click(function() {
		playSound(wavPath + "sound2.wav");
		$("#dialog").fadeOut("fast", function() {
			if (chkGameOver()) {
				$("#ending").fadeIn("fast");
			} else {
				if (!gameExit)
					startGame();
			}
		});
	});

	// 「もう一勝負、お願いします！」クリック時
	$("#ending_next").click(function() {
		playSound(wavPath + "sound2.wav");
		$("#ending").fadeOut("fast", function() {
			newGame();
			if (!gameExit)
				startGame();
		});
	});

	// 「もういいよっ！！」クリック時
	$("#ending_exit").click(function() {
		playSound(wavPath + "sound2.wav");
		$("#ending").fadeOut("fast");
		doOpening();
	});
}());
