/* ============================================================================================
@Project - SMIPL Matchcenter
@Description: controller for Matchcenter
@Copyright: SMIPL
============================================================================================ */
/******* declare global variables ******/
var time_on_page_sec = 0;
setInterval(function(){
	time_on_page_sec = time_on_page_sec + 1;
},1000);
$("#smMCWidget").html('<div class="smscorecardwidget matchCenter" ng-controller="mcCtrl" smlivescorecard widgettype="international"></div>');
/******* fixtures variable declaration ******/
var divisonId=getParameterByName('dId');
if(divisonId != undefined && divisonId != '')
	divisonId = parseInt(divisonId);

var comId=getParameterByName('cId');
var competitionId=getParameterByName('cId');
var matId=getParameterByName('mId');
var filterteam = getParameterByName('team');
var pScorecardPrint = getParameterByName('scorecardprint');
var liveTab=false;
var fixtureTab=false;
var resultTab=false;
var liveData='';
var liveInterval='';
var liveScoreCardInterval='';
var tourDetails=[];
var divisionList=[];
var seasonList=[];
var competitionList=[];
var matchSchedule=[];
var liveComlist=[];
var liveDataList=[];
var resultDataList=[];
var upcomDataList=[];
var selectedComList=[];
var seasonId=getParameterByName('sId');
if(seasonId != undefined && seasonId != '')
	seasonId = parseInt(seasonId);
var curSeasonName = '';
/******* batting stats variable declaration ******/
var playersData=[];
var tourBattingStats=[];
var battingStatsHeadTitle=[];
var tourBattingData=[];
var battingStatskeyVal=[];
var topBattingPlayerList=[];
var overallTeamStats=[];

/******* bowling stats variable declaration ******/
var tourBowlingStats=[];
var bowlingStatsHeadTitle=[];
var tourBowlingData=[];
var bowlingStatskeyVal=[];
var matchId='';
var curBatsmanViewBlkId='';
var curBowlerViewBlkId='';
var overBlkTransId=0;
var topBowlingPlayerList=[];

/******* batting head to head varibale ******/
var batHeadtoHead=[];

/******* bowling head to head varibale ******/
var bowHeadtoHead=[];
var playerBatWiseInnings=[];
var playerBowWiseInnings=[];

/******Over slider****************/
var ovrSliderPos = 0;
var overSlider = '';
var loadCnt='';
var urlString= getParameterByName('type');
var qstringType =  getParameterByName('type');
var viewCateg = getParameterByName('view');
var viewscorecard= getParameterByName('type');
if(viewscorecard!='')
{
	
	var qstring = getParameterByName('type');
	
	qstring = qstring.split("-");
	if(qstring.length>1)
	{
		qstringType = "scorecard";
		comId = qstring[2];
		competitionId = qstring[2];
		matId = qstring[1];
	}
	
	
}
var initLoad='';
var colorcodes = [];
var standings=[];
var keyperformersList=[];

/****** analytics variable****************/
var momInn='';
var wlpInn=1;
var analyticalInterval='';
var WagonWheelResult=[];
var barchartData = [];
var SM_Live = {};
var barColorTeamA="#2C82C9";
var barColorTeamB="#D14841";
var analyticsMatchId = '';

/****Scorecard summary *********/
var currentStrikerId = '';
var nonStrikerId = '';
var currentBowlerId = ''
var matchscheduleData = [];
var curInn='';
var matchSummaryData=[];
var overHistoryList=[];
var overHistory=[];
var currentBall = '';
var playListInterval  = '';
var screenBallCount='';
var cycle=1;
var screenBallWd='';

var momentumData = {};
var momentumChart;

var divSlider ='';

/***********fixturetimercountDown******/
var fixtureindex;
var fixturesCountDownData = [];
var timerInterval='';

var matchScheduleInitLoad = false;

var mobApp=getParameterByName('app');

var seasonChange = false;
var liveSPRefreshInterval = '';
var dsliderinit = false;
var videoPlayFirstClick = true;

var fivedayweather = '';
var cityWeatherData = [];
var cityCurWeatherData = [];
var FixturecitiesList = [];

/***TemplateVariables***/
var callFromTemplate = '';

var directPlayerPageView = false;

var fixCountdownInterval = "";
var fixCountdownInterval2 = [];

/************ PrintScorecard*********/
var printScoreData=[];

/******** all Live Match List *******/
var listenAllLiveMatRefersh = '';
var selDivCompetition = [];

/*******display timezone***/
var dateTimeWithTimezone = [];
var dateWithTimezone = [];
var timeWithTimezone = [];
var liveCompTimeZoneData = [];

/****Manhattan Chart version 2 (using c3 js)**/
var redrawCustomChanges = true;

var analyticsFeedFound = false;

/******* stats widget Integration ****/
var widgetViewType = "";
var widgetViewType2 = "";

/*********** Filter Stats By Team/Player ***********/
var fStats_teamId = getParameterByName('teamId');
var fStats_playerId = getParameterByName('playerId');

/**********Firebase Live Match Object ***********/
var firebaseRef = function(){
};
var firebaseObjChange = false;

/**********Firebase Schulde Object ***********/
var firebaseSRef = function(){
};
var firebaseSObjChange = false;
var cloudFirestoreDB = "";
var listencloudFirestoreDB = "";

var GwidgetLoadType = '';


var matchVideosList = [];
var matchPhotosList = [];

var internationalArchive = false;

var oneFallOvers = "";
var oneFallScore = "";
var oneFallWickets = "";
var twoFallOvers = "";
var twoFallScore = "";
var twoFallWickets = "";
var threeFallOvers = "";
var threeFallScore = "";
var threeFallWickets = "";
var fourFallOvers = "";
var fourFallScore = "";
var fourFallWickets = "";

var FOWHtml = '';
var monthAbrList = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
var monthFullNameList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var mvpStatsList = [];
var countdownInterval = '';

/******* Start of Control ******/
angular.module('MyApp').controller('mcCtrl', ['$scope','$filter','$compile','mcService','$rootScope',function($scope,$filter,$compile,mcService,$rootScope){
	
	/***** define scope variables******/
	$scope.matchSummary='';
	$scope.battingCard='';
	$scope.bowlingCard='';
	$scope.extras='';
	$scope.fallofWickets='';
	$scope.overHistory='';
	$scope.IsMatchEnd='';
	$scope.partnershipData='';
	$scope.wagonWheelSummary='';
	$scope.failed='color:#D14841';
	$scope.detailedTstats=detailedTstats;
	$scope.competitionType = '';
	$scope.liveShortWidget = liveShortWidget;
	$scope.statsListLimit = 20;
	$scope.maxInn1Overs = 20;
	$scope.maxInn2Overs = 20;
	$scope.superOverViewInnNo = '';
	
	$scope.basepath = basePath;
	
	$scope.playerImgPath = playerImgPath;
	$scope.curSeasonId='';
	$scope.disableScorecardRightClick = disableScorecardRightClick;
	
	$scope.showScorerInMatchDetails = false;
	
	$scope.showDivision = showDivision;
	$scope.showSeason = showSeason;
	if(!showDivision)
		$("#divisionWrap").css("display","none");

    $scope.videoClickables = videoClickables;

    if(typeof videodownload == "undefined") 
        $scope.downLoadVideo = false;
    else
        $scope.downLoadVideo = videodownload;

    if(typeof statsFeed == "undefined") 
        statsFeed = '';
    if(typeof statsCoding == "undefined") 
        statsCoding = '';
     if(typeof statsCID == "undefined") 
        statsCID = '';

    if(typeof AnalyticsFeed == "undefined") 
        AnalyticsFeed = '';

    if(typeof mcpath == "undefined") 
        mcpath = '';    

    if(typeof printScoreCard == "undefined") 
        printScoreCard = false; 
    if(typeof printStats == "undefined") 
        printStats = false; 
    if(typeof exportStats == "undefined") 
        exportStats = false; 

    if(typeof weatherInfo == "undefined") 
        weatherInfo = false; 
    if(typeof showMatchOrder == "undefined") 
        showMatchOrder = false; 

    if(typeof partialVideoScorecardCompetitionsID == "undefined") 
		partialVideoScorecardCompetitionsID = [];
	if(typeof disableVideoScorecardForCompetitionID == "undefined") 
		disableVideoScorecardForCompetitionID = [];
    
	if(typeof enableFixturesSearch == "undefined") 
        enableFixturesSearch = false;

    if(typeof showAllLiveMatches == "undefined") 
        showAllLiveMatches = false;
    if(typeof displayZoneTime == "undefined") 
        displayZoneTime = false;
    if(typeof displayGMTTime == "undefined") 
        displayGMTTime = false;    

    if(typeof showRecentMatchesOnLoad == "undefined") 
        showRecentMatchesOnLoad = false;

    if(typeof t20liteAnlaytics == "undefined") 
        t20liteAnlaytics = false;

    if(typeof cloudFirestore == "undefined") 
        cloudFirestore = false;

    if(typeof squadGenerationSource == "undefined")
    	squadGenerationSource = "";
    
    if(cloudFirestore){
    	 $.getScript(mcpath+"js/firebase-app.js", function() {
            $.getScript(mcpath+"js/firebase-firestore.js", function() {
            	firebase.initializeApp({
					  apiKey: cloudFireAPIKEY,
					  authDomain: cloudFireDomain,
					  projectId: cloudFireprojectId
					});
		    	cloudFirestoreDB = firebase.firestore();
            });
         });	
    	
    }

    if(typeof fullScorecardBasePath == "undefined") 
        fullScorecardBasePath = "matchcentre.html";

    $scope.fullScorecardBasePath = fullScorecardBasePath;


    $scope.enableFixturesSearch = enableFixturesSearch; 

    $scope.downloadfromURl = '';

    $scope.mcpath = mcpath;
    $scope.displayZoneTime = displayZoneTime;

    if(typeof hidestandingforcompetition == "undefined") 
        hidestandingforcompetition = [];
    $scope.hidestandingforcompetition = hidestandingforcompetition;
    $scope.isExist = function(id){
        var res = jQuery.inArray( id, hidestandingforcompetition );
        return res;
    }

    if(typeof hidestandingforseason == "undefined") 
        hidestandingforseason = [];
    $scope.hidestandingforseason = hidestandingforseason;
    $scope.checkInActiveForSeason = function(id){
        var res = jQuery.inArray( id, hidestandingforseason );
        return res;
    }

    if(typeof hideAnalyticsforcompetition == "undefined") 
        hideAnalyticsforcompetition = [];
    $scope.hideAnalyticsforcompetition = hideAnalyticsforcompetition;
    $scope.checkAnalyticshide =  function(id){
    	var res = jQuery.inArray( id, hideAnalyticsforcompetition );
        return res;
    }

    if(typeof showManhattanV2 == "undefined") 
        showManhattanV2 = true;

    if(showManhattanV2)
    	$("#manhattan-wrapper").addClass("version2");

    if(typeof showLiveMatchBasedOnZoneTime == "undefined") 
        showLiveMatchBasedOnZoneTime = false;

    if(typeof viewscorecardExternalLink == "undefined") 
        viewscorecardExternalLink = false;
    $scope.viewscorecardExternalLink = viewscorecardExternalLink;

    if(typeof externalScorecardBasepath == "undefined") 
        externalScorecardBasepath = "";
    $scope.externalScorecardBasepath = externalScorecardBasepath;

    if(typeof customSelectBoxStyle == "undefined") 
        customSelectBoxStyle = true; 
    $scope.customSelectBoxStyle = customSelectBoxStyle;

    if(typeof DisplayLocalTeamLogo == "undefined") 
        DisplayLocalTeamLogo = false; 
    $scope.DisplayLocalTeamLogo = DisplayLocalTeamLogo;

    if(typeof localTeamLogoPath == "undefined") 
        localTeamLogoPath = ""; 
    $scope.localTeamLogoPath = localTeamLogoPath;  

    if(typeof playerInitials == "undefined") 
        playerInitials = ["ms","ab","kl","kn"]; 

    if(typeof viewFixtureDetail == "undefined") 
        viewFixtureDetail = "";   
    $scope.viewFixtureDetail = viewFixtureDetail;
	
	$scope.nameConvertForURL = function(val){
		if(val == undefined || val == '') val=' ';
		val = val.toString();
		val = val.replace(/\//g, '-');
		val = val.replace(/  /g, '-');
		val = val.replace(/ /g, '-');

		val = val.toLowerCase();
		return val;		
	}
	
	$scope.clientbasePath = clientbasePath;
	
	$scope.getPSRunRate = function(val,inc){
		if(val == undefined || val == '') return '';
		val = parseFloat(val);
		var roundedVal = Math.round(val) + inc;
		return roundedVal;
	}

	$scope.titleCaseText = function(str){
		str = titleCase(str);
		return str;
	}

	$scope.getTime = function(matchDateTime){
		var pmatId = parseInt($scope.matchId);
		
		var matchDet = $filter('filter')(matchscheduleData,{MatchID:pmatId},true);		
		if(matchDet != undefined && matchDet.length > 0) 
		{
			var matchDateTime = matchDet[0].MatchDateNew+" "+matchDet[0].MatchTime;
		}
		
		var d = new Date(matchDateTime);
		var hours = d.getHours();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; 
		var min = d.getMinutes();
		var timeStr = hours;
		if(min > 0){
			if(min < 10){
				min = "0"+min;
			} 
			timeStr = timeStr+':'+min;
		}
		
		return timeStr+' '+ampm;
	}

	$scope.changeSuperOverSummary = function(soNo){
		if(soNo == 1)
			 $scope.superOverViewInn = 3;
		if(soNo == 2)
			 $scope.superOverViewInn = 5;
	}

	/***** init will be called when the page loads initially******/
	$scope.init=function(srType,vwType,loadType,widgetLoadType){
		ScorecardEvents();
		$scope.windowWdt = $(window).width();
		GwidgetLoadType = widgetLoadType;
		var scorecardType = $(".smscorecardwidget").attr("widgettype");	
			if(widgetLoadType == 'scorecard')
				$(".loader-main").show();

		$scope.scorecardType = scorecardType;
		$scope.widgettype = scorecardType;
		$scope.internationalArchive = internationalArchive;
		var pathname = window.location.pathname; 
			pathname = pathname.split("../index.html");
			var pathSplitLen = pathname.length;
			var matchParm = (pathname[pathSplitLen-2] != undefined && pathname[pathSplitLen-2] == 'match') ? 'match' : ((pathname[pathSplitLen-3] != undefined && pathname[pathSplitLen-3] == 'match') ? 'match' : '');
		if(widgetLoadType == 'scorecard' && scorecardType == 'international' && matchParm == 'match'){
			urlString= "scorecard";
			qstringType = "scorecard";
			viewscorecard= "scorecard";

			$(".standing-title").hide();
			/*if((pathname[pathSplitLen-5]) != undefined){
				comId= pathname[pathSplitLen-5];
				competitionId= pathname[pathSplitLen-5];
			}*/
			if((pathname[pathSplitLen-1]) != undefined){
				matId= pathname[pathSplitLen-1];
			}
			
			//if(competitionId >= 234 && competitionId <=311)
			//	$scope.internationalPulseMatches = 1;
		}
		if(widgetLoadType == 'standings'){
			urlString= "standings";
			qstringType = "standings";
			viewscorecard= "standings";
			
			if(scorecardType == 'international')
			{
				$scope.squadsmenu = true;
				
				urlString= "teamsquads";
				qstringType = "teamsquads";
				viewscorecard= "teamsquads";
				
				/*urlString= "tourstats";
				qstringType = "tourstats";
				viewscorecard= "tourstats";*/
			}

			/*var pathname = window.location.pathname; 
			pathname = pathname.split("/");
			var pathSplitLen = pathname.length;
			if((pathname[pathSplitLen-2]) != undefined){
				comId= pathname[pathSplitLen-2];
				competitionId= pathname[pathSplitLen-2];
			}*/
		}
		if(widgetLoadType == 'results'){
			urlString= "fixtures";
			qstringType = "fixtures";
			viewscorecard= "fixtures";

			var pathname = window.location.pathname; 
			pathname = pathname.split("../index.html");
			var pathSplitLen = pathname.length;
			if((pathname[pathSplitLen-2]) != undefined){
				comId= pathname[pathSplitLen-2];
				competitionId= pathname[pathSplitLen-2];
			}
			$("#scorecardTabs").hide();
			$("#overStreamMC").hide();
			$(".partnerChart").hide();
			$(".standing-title").show();	
			$("#series-tab").removeClass("active");
			$("#archive-tab").addClass("active");
		}
		widgetViewType = srType;
		widgetViewType2 = vwType;
		var smWidgetWdt = $(".smscorecardwidget").width();
		findDevice();
		$(".smscorecardwidget").removeClass("smTabview");
		$(".smscorecardwidget").removeClass("smMobview");
		$(".smscorecardwidget").addClass("smWebview");
		if(smWidgetWdt <= 1024 && smWidgetWdt > 767)
		{
			$(".smscorecardwidget").removeClass("smWebview");
			$(".smscorecardwidget").addClass("smTabview");
		}
		if(smWidgetWdt <= 767)
		{
			$(".smscorecardwidget").removeClass("smWebview");
			$(".smscorecardwidget").addClass("smMobview");
		}
		if(vwType != undefined && vwType != 'all')
			callFromTemplate = vwType;
		$scope.callFromTemplate = callFromTemplate;

		//config main Menus
		$scope.scorecardMenu = scorecardMenu;
		$scope.tstatsMenu = tstatsMenu;
		$scope.playerstatsMenu = playerstatsMenu;
		$scope.teamstatsMenu = teamstatsMenu;
		$scope.standingsMenu = standingsMenu;
		
		if(typeof squadsmenu == "undefined") 
			$scope.squadsmenu = false;
		else
			$scope.squadsmenu = squadsmenu;

		$scope.clientCode = '';
		$scope.clientName = '';
		$scope.clientLogo = '';
		if(typeof clientCode != "undefined") {
			$scope.clientCode = clientCode;
		}
		if(typeof clientName != "undefined") {
			$scope.clientName = clientName;
		}
		if(typeof clientLogo != "undefined") {
			$scope.clientLogo = clientLogo;
		}

		//config scorecard widgets menus
		$scope.wagonwheel_MH_menu = wagonwheel_MH_menu;
		$scope.analytics_menu = analytics_menu;
		if(typeof news_menu == "undefined") 
		{
			$scope.news_menu = false;
			news_menu = false;
		}
		if(typeof kpi_menu == "undefined") 
			kpi_menu = false;
		
		$scope.news_menu = news_menu;
	    $scope.photostream_menu = photostream_menu;
	    $scope.videostream_menu = videostream_menu;
		$scope.commentary_menu = commentary_menu;
		$scope.kpi_menu = kpi_menu;

		$scope.fullScoreCardBtnTxt = "Click here to view";
		$scope.fullScoreCardBtnTxt2 = "Full Scorecard";
		
			

		if(typeof showMatchType == "undefined") 
			$scope.showMatchType = false;
		else
			$scope.showMatchType = showMatchType;

		var matchTypeList = [];
		matchTypeList[0] = [];
		matchTypeList[0]["MatchTypeName"] = "Multi Day";
		matchTypeList[0]["MatchTypeID"] = "1";
		matchTypeList[1] = [];
		matchTypeList[1]["MatchTypeName"] = "One Day Match";
		matchTypeList[1]["MatchTypeID"] = "2";
		matchTypeList[2] = [];
		matchTypeList[2]["MatchTypeName"] = "Twenty20 Match";
		matchTypeList[2]["MatchTypeID"] = "3";
		$scope.matchTypeList = matchTypeList;

		matchScheduleInitLoad = true;
		$(".pageloader").addClass('active displayForScorecard');
		$(".pageloader").removeClass('hideForScorecard');
		$scope.CricketSMIPLMC = CricketSMIPLMC; /***** for widget ********/
		$scope.liveBriefWidget = liveBriefWidget; /***** for widget ********/
		$("#errMsg").html("");
		clearInterval(liveScoreCardInterval);/***** clear live scorecard interval ********/
		if(cloudFirestore)
    		firebaseRef();
		$(".mcTopPlayersList a").removeClass('selItemActive');
		$(".winlossPercentMeter").addClass("inactive");
		urlString=(qstringType != '' && loadType != 'tabchange') ? qstringType :srType ;
		viewCateg=(qstringType != '' && loadType != 'tabchange') ? getParameterByName('view') : vwType;
		initLoad=loadType;

		$scope.battingStatsList=[{'col1':'Orange Cap','col2':'mruns','col3':'toprunsscorers','col4':'mostRuns','col5':'MostRuns'},
		{'col1':'RuPay On-The-Go 4s of the Season','col2':'mf','col3':'mostfours','col4':'mostFours','col5':'MostFours'},
		{'col1':'Most Fours (Innings)','col2':'mfi','col3':'mostfoursinnings','col4':'mostFoursInnings','col5':'MostFours'},
		{'col1':'Angel One Super Sixes of the Season','col2':'ms','col3':'mostsixes','col4':'mostSixes','col5':'MostSixes'},
		{'col1':'Most Sixes (Innings)','col2':'msi','col3':'mostsixesinnings','col4':'mostSixesInnings','col5':'MostSixes'},
		{'col1':'Most Fifties','col2':'mff','col3':'mostfifties','col4':'mostFifties','col5':'MostFifties'},
		{'col1':'Most Centuries','col2':'mc','col3':'mostcenturies','col4':'mostCenturies','col5':'MostCenturies'},
		{'col1':'Fastest Fifties','col2':'ff','col3':'fastestfifties','col4':'fastestFifties','col5':'FastestFifties'},
		{'col1':'Fastest Centuries','col2':'fc','col3':'fastestcenturies','col4':'fastestCenturies','col5':'FastestCenturies'},
		{'col1':'Highest Scores','col2':'his','col3':'highestindividualscorers','col4':'highestScoresInnings','col5':'HighestScores'},
		{'col1':'Punch.ev Electric Striker of the Season','col2':'hsrt','col3':'higheststrikeratetournament','col4':'bestBattingStrikeRate','col5':'BestBattingStrikeRate'},
		{'col1':'Best Batting Strike Rate(I)','col2':'hsri','col3':'higheststrikerateinnings','col4':'bestBattingStrikeRateInnings','col5':'BestBattingStrikeRate'},
		{'col1':'Best Batting Averages','col2':'bba','col3':'highestaverages','col4':'bestBattingAverage','col5':'BestBattingAverage'}	
		];
		$scope.allStatsList=[{'col1':'Orange Cap','col2':'mruns','col3':'toprunsscorers','col4':'mostRuns','col5':'MostRuns','col6':'Batting Stats'},
		{'col1':'Highest Scores','col2':'his','col3':'highestindividualscorers','col4':'highestScoresInnings','col5':'HighestScores','col6':'Batting Stats'},
		{'col1':'Punch.ev Electric Striker of the Season','col2':'hsrt','col3':'higheststrikeratetournament','col4':'bestBattingStrikeRate','col5':'BestBattingStrikeRate','col6':'Batting Stats'},
		{'col1':'Best Batting Strike Rate(I)','col2':'hsri','col3':'higheststrikerateinnings','col4':'bestBattingStrikeRateInnings','col5':'BestBattingStrikeRate','col6':'Batting Stats'},
		{'col1':'Best Batting Averages','col2':'bba','col3':'highestaverages','col4':'bestBattingAverage','col5':'BestBattingAverage','col6':'Batting Stats'},
		{'col1':'Angel One Super Sixes of the Season','col2':'ms','col3':'mostsixes','col4':'mostSixes','col5':'MostSixes','col6':'Batting Stats'},
		{'col1':'Most Sixes (Innings)','col2':'msi','col3':'mostsixesinnings','col4':'mostSixesInnings','col5':'MostSixes','col6':'Batting Stats'},
		{'col1':'RuPay On-The-Go 4s of the Season','col2':'mf','col3':'mostfours','col4':'mostFours','col5':'MostFours','col6':'Batting Stats'},
		{'col1':'Most Fours (Innings)','col2':'mfi','col3':'mostfoursinnings','col4':'mostFoursInnings','col5':'MostFours','col6':'Batting Stats'},
		{'col1':'Most Fifties','col2':'mff','col3':'mostfifties','col4':'mostFifties','col5':'MostFifties','col6':'Batting Stats'},
		{'col1':'Most Centuries','col2':'mc','col3':'mostcenturies','col4':'mostCenturies','col5':'MostCenturies','col6':'Batting Stats'},
		{'col1':'Fastest Fifties','col2':'ff','col3':'fastestfifties','col4':'fastestFifties','col5':'FastestFifties','col6':'Batting Stats'},
		{'col1':'Fastest Centuries','col2':'fc','col3':'fastestcenturies','col4':'fastestCenturies','col5':'FastestCenturies','col6':'Batting Stats'},
		{'col1':'Purple Cap','col2':'mw','col3':'mostwickets','col4':'mostWickets','col5':'MostWickets','col6':'Bowling Stats'},
		{'col1':'Best Bowling Average','col2':'ba','col3':'bestaverages','col4':'bestBowlingAverage','col5':'BestBowlingAverage','col6':'Bowling Stats'},
		{'col1':'Best Bowling Economy','col2':'be','col3':'besteconomyrates','col4':'bestBowlingEconomy','col5':'BestEconomy','col6':'Bowling Stats'},
		{'col1':'Best Bowling Economy (Innings)','col2':'bei','col3':'besteconomyratesinnings','col4':'bestBowlingEconomyInnings','col5':'BestEconomy','col6':'Bowling Stats'},
		{'col1':'Best Bowling Strike-Rate','col2':'bsr','col3':'beststrikeratestournament','col4':'bestBowlingStrikeRate','col5':'BestBowlingStrikeRate','col6':'Bowling Stats'},
		{'col1':'Best Bowling Strike-Rate (Innings)','col2':'bsri','col3':'beststrikeratesinnings','col4':'bestBowlingStrikeRateInnings','col5':'BestBowlingStrikeRate','col6':'Bowling Stats'},
		{'col1':'Best Bowling Figures','col2':'bbf','col3':'bestbowlingfigures','col4':'bestbowlingfigures','col5':'bestbowlingfigures','col6':'Bowling Stats'},
		{'col1':'Most Runs Conceded (Innings)','col2':'mrc','col3':'mostrunsconceededinnings','col4':'mostRunsConcededInnings','col5':'MostRuns','col6':'Bowling Stats'},
		{'col1':'Most Dot Balls','col2':'mdb','col3':'mostdotballsbowledtournament','col4':'mostDotBalls','col5':'MostDotBalls','col6':'Bowling Stats'},
		{'col1':'Most Dot Balls (Innings)','col2':'mdbi','col3':'mostdotballsbowledinnings','col4':'mostDotBallsInnings','col5':'MostDotBalls','col6':'Bowling Stats'},
		{'col1':'Most Maidens','col2':'mmo','col3':'mostmaidenoversbowledtournament','col4':'mostMaidens','col5':'MostMaidens','col6':'Bowling Stats'},
		{'col1':'Hat-tricks','col2':'mhat','col3':'mosthattricks','col4':'mosthattricks','col5':'mosthattricks','col6':'Bowling Stats'}
		];
		$scope.selbattingStatsList=$scope.battingStatsList[0];

        $scope.bowlingStatsList=[
			{'col1':'Purple Cap','col2':'mw','col3':'mostwickets','col4':'mostWickets','col5':'MostWickets','col6':'Bowling Stats'},
			{'col1':'Most Maidens','col2':'mmo','col3':'mostmaidenoversbowledtournament','col4':'mostMaidens','col5':'MostMaidens','col6':'Bowling Stats'},
			{'col1':'Most Dot Balls','col2':'mdb','col3':'mostdotballsbowledtournament','col4':'mostDotBalls','col5':'MostDotBalls','col6':'Bowling Stats'},
			{'col1':'Most Dot Balls (Innings)','col2':'mdbi','col3':'mostdotballsbowledinnings','col4':'mostDotBallsInnings','col5':'MostDotBalls','col6':'Bowling Stats'},
			{'col1':'Best Bowling Average','col2':'ba','col3':'bestaverages','col4':'bestBowlingAverage','col5':'BestBowlingAverage','col6':'Bowling Stats'},
			{'col1':'Best Bowling Economy','col2':'be','col3':'besteconomyrates','col4':'bestBowlingEconomy','col5':'BestEconomy','col6':'Bowling Stats'},
			{'col1':'Best Bowling Economy (Innings)','col2':'bei','col3':'besteconomyratesinnings','col4':'bestBowlingEconomyInnings','col5':'BestEconomy','col6':'Bowling Stats'},
			{'col1':'Best Bowling Strike-Rate','col2':'bsr','col3':'beststrikeratestournament','col4':'bestBowlingStrikeRate','col5':'BestBowlingStrikeRate','col6':'Bowling Stats'},
			{'col1':'Best Bowling Strike-Rate (Innings)','col2':'bsri','col3':'beststrikeratesinnings','col4':'bestBowlingStrikeRateInnings','col5':'BestBowlingStrikeRate','col6':'Bowling Stats'},
			{'col1':'Best Bowling Figures','col2':'bbf','col3':'bestbowlingfigures','col4':'bestbowlingfigures','col5':'bestbowlingfigures','col6':'Bowling Stats'},
			{'col1':'Most Runs Conceded (Innings)','col2':'mrc','col3':'mostrunsconceededinnings','col4':'mostRunsConcededInnings','col5':'MostRuns','col6':'Bowling Stats'}	,
			{'col1':'Hat-tricks','col2':'mhat','col3':'mosthattricks','col4':'mosthattricks','col5':'mosthattricks','col6':'Bowling Stats'}
		];
		$scope.selbowlingStatsList=$scope.bowlingStatsList[0];

		$scope.videoscorecard = videoscorecard;
        if(videoscorecard)
        {
             var listenPlayerControls = setInterval(function(){
                    if($(".mejs-button.mejs-next").length > 0)
                    {
                        clearInterval(listenPlayerControls);
                        var nextIconObj = $(".mejs-button.mejs-next");
                        nextIconObj = $compile(nextIconObj)($scope);
                        if (!$scope.$$phase) {
                             $scope.$apply();
                        }
                        $(".mejs-button.mejs-next").replaceWith(nextIconObj);

                        var prevIconObj = $(".mejs-button.mejs-prev");
                        prevIconObj = $compile(prevIconObj)($scope);
                        if (!$scope.$$phase) {
                             $scope.$apply();
                        }
                        $(".mejs-button.mejs-prev").replaceWith(prevIconObj);
                    }
                },100);
        }

		if(initLoad=='init'){
			$(".pageloader").addClass('active');
			mcService.GetTournamentList(function(data){
				if(filterteam != undefined && filterteam!= ''){
					var teamFilteredCompData = [];
					var ftCdata = [];
					var ftuCdata = (data.competition != undefined) ? data.competition : [];
					if(ftuCdata != undefined && ftuCdata.length > 0){
						ftuCdata.map(function(item){
							var ftCteams = (item.Teams != undefined) ? item.Teams : "";
							ftCteams = ftCteams.split(",");
							var teamExist = ftCteams.includes(filterteam);
							if(teamExist)
								ftCdata.push(item);
						});
					}
					var ftDdata = [];
					var ftuDdata = (data.division != undefined) ? data.division : [];
					if(ftuDdata != undefined && ftuDdata.length > 0){
						ftuDdata.map(function(item){
							var ftcObj = $filter("filter")(ftCdata,{DivisionID:item.DivisionID,SeasonID:item.SeasonID},true);
							if(ftcObj != undefined && ftcObj.length > 0)
								ftDdata.push(item);
						});
					}
					data.competition = ftCdata;
					data.division = ftDdata;
				}


				tourDetails=data;
				
				
				var pathname = window.location.pathname; 
				pathname = pathname.split("../index.html");
				var pathSplitLen = pathname.length;
				
			var matchParm = (pathname[pathSplitLen-2] != undefined && pathname[pathSplitLen-2] == 'match') ? 'match' : ((pathname[pathSplitLen-3] != undefined && pathname[pathSplitLen-3] == 'match') ? 'match' : '');
			
				var scorecardType = $(".smscorecardwidget").attr("widgettype");
				if(widgetLoadType == 'scorecard' && scorecardType == 'domestic' && matchParm == 'match'){
					urlString= "scorecard";
					qstringType = "scorecard";
					viewscorecard= "scorecard";
					$(".standing-title").hide();

					var pathname = window.location.pathname; 
					pathname = pathname.split("../index.html");
					var pathSplitLen = pathname.length;
					if((pathname[pathSplitLen-3]) != undefined){
						var pCompetitionName = pathname[pathSplitLen-3];
						var pSeasonName = pCompetitionName.split("-");
						pSeasonName = pSeasonName[length-2]+'-'+pSeasonName[length-1];
						pCompetitionName = $scope.nameConvertForURL(pCompetitionName);
						if(tourDetails.competition != undefined && tourDetails.competition.length > 0){
							for(var i=0;i<tourDetails.competition.length;i++){
								var cName = $scope.nameConvertForURL(tourDetails.competition[i].CompetitionName);
								var cSeasonName = "";
								for(j=0;j<tourDetails.division.length;j++){
									if(tourDetails.division[j].SeasonID == tourDetails.competition[i].SeasonID)
										cSeasonName = tourDetails.division[j].SeasonName;
								}
								cName = cName+'-'+cSeasonName;								
								if(cName == pCompetitionName){
										comId= tourDetails.competition[i].CompetitionID;
										competitionId= tourDetails.competition[i].CompetitionID;
										
										break;
								}
							}
						}				
						
					
					}
					
				}
				
				
				
				
				
				var scorecardType = $(".smscorecardwidget").attr("widgettype");
				
				if((scorecardType == 'international' || scorecardType == 'domestic' ) & comId != ''){
					if(tourDetails.competition != undefined && tourDetails.competition.length > 0){
							for(var i=0;i<tourDetails.competition.length;i++){
								
								if(comId == tourDetails.competition[i].CompetitionID){
										seasonId= tourDetails.competition[i].SeasonID;
										divisonId = tourDetails.competition[i].DivisionID;
										break;
								}
							}
						}	
					
				}
				

				divisionList=data.division;
				if(divisionList != undefined && divisionList.length > 0)
				{
					divisionList.map(function(item){
						if(item.DivisionID != undefined && item.DivisionID != '')
							item.DivisionID = parseInt(item.DivisionID);
						if(item.SeasonID != undefined && item.SeasonID != '')
							item.SeasonID = parseInt(item.SeasonID);


					});
				}
				var seasonArr=[];
				var j=0;
				for(var i=0; i<divisionList.length; i++){
					if($.inArray(divisionList[i].SeasonID, seasonArr)==-1){
						seasonList[j]=[];
						seasonList[j]['SeasonID']=divisionList[i].SeasonID;
						seasonList[j]['seasonName']=divisionList[i].SeasonName;
						seasonArr[j]=divisionList[i].SeasonID;
						j++;
					}
				}
				//seasonList = seasonList.reverse();
				$scope.seasonList=seasonList;
				console.log(widgetLoadType);
				
				if(widgetLoadType == 'scorecard' && scorecardType == 'international' && matchParm == 'match'){
					
					var pathname = window.location.pathname; 
					pathname = pathname.split("../index.html");
					var pathSplitLen = pathname.length;
					if((pathname[pathSplitLen-2]) != undefined){
						var pSeasonName = pathname[pathSplitLen-2];	
						pSeasonName = pSeasonName.replace("women-",'');
						if(seasonList != undefined && seasonList.length > 0)
						{
							seasonList.map(function(item){
								if(item.seasonName == pSeasonName)
									seasonId = item.SeasonID;
							});
						}
						if(seasonId < 15){
							$(".smscorecardwidget.matchCenter").addClass("archievescorecard");
						}
						
						if(tourDetails.competition != undefined && tourDetails.competition.length > 0){
							for(var i=0;i<tourDetails.competition.length;i++){
															
								if(tourDetails.competition[i].SeasonID == seasonId){
										comId= tourDetails.competition[i].CompetitionID;
										competitionId= tourDetails.competition[i].CompetitionID;
										
										break;
								}
							}
						}			
											
					}
					
				}
				
				if(widgetLoadType == 'tstats'){
					var pathname = window.location.pathname; 
					pathname = pathname.split("../index.html");
					var pathSplitLen = pathname.length;
					if((pathname[pathSplitLen-2]) != undefined && (pathname[pathSplitLen-2]) == 'stats'){
						var pSeasonName = pathname[pathSplitLen-1];
						if(seasonList != undefined && seasonList.length > 0)
						{
							seasonList.map(function(item){
								if(item.seasonName == pSeasonName)
									seasonId = item.SeasonID;
							});
						}
						if(tourDetails.competition != undefined && tourDetails.competition.length > 0){
							for(var i=0;i<tourDetails.competition.length;i++){
															
								if(tourDetails.competition[i].SeasonID == seasonId){
										comId= tourDetails.competition[i].CompetitionID;
										competitionId= tourDetails.competition[i].CompetitionID;
										
										break;
								}
							}
						}	
					}
				}
				
				if(widgetLoadType == 'standings'){
					
					var pathname = window.location.pathname; 
					pathname = pathname.split("../index.html");
					var pathSplitLen = pathname.length;
					var genderTypeParm = (pathname[pathSplitLen-2] != undefined ) ? pathname[pathSplitLen-2] : '';
					if(genderTypeParm == 'women'){
						$(".vn-menWoTab2 .men_rs").removeClass("active");
						$(".vn-menWoTab2 .women_rs").addClass("active");
						$scope.womensmatches = true;
						$scope.playerGroup = 'WOMEN';
					}
					else{
						$scope.womensmatches = false;
						$scope.playerGroup = 'MEN';
					}

					
					var pathname = window.location.pathname; 
					pathname = pathname.split("../index.html");
					var pathSplitLen = pathname.length;
					if((pathname[pathSplitLen-3]) != undefined && (pathname[pathSplitLen-3]) == 'points-table'){
						var pSeasonName = pathname[pathSplitLen-1];
						if(seasonList != undefined && seasonList.length > 0)
						{
							seasonList.map(function(item){
								if(item.seasonName == pSeasonName)
									seasonId = item.SeasonID;
							});
						}
						if(tourDetails.competition != undefined && tourDetails.competition.length > 0){
							for(var i=0;i<tourDetails.competition.length;i++){
															
								if(tourDetails.competition[i].SeasonID == seasonId){
										comId= tourDetails.competition[i].CompetitionID;
										competitionId= tourDetails.competition[i].CompetitionID;
										
										break;
								}
							}
						}	
					}
				}
				
				
				if(seasonId == undefined || seasonId == ''){
					seasonId=seasonList[0].SeasonID;
					$scope.selectedSeason = (seasonList[0] != undefined) ? seasonList[0] : [];
				}
				else
				{
					var selectedSeasonobj = [];
					if(seasonList != undefined && seasonList.length > 0)
					{
						seasonList.map(function(item){
							if(item.SeasonID == seasonId)
								selectedSeasonobj = item;
						});
					}
					
					$scope.selectedSeason = selectedSeasonobj;
				}
					
				$scope.curSeasonId=seasonId;
				$scope.curSeasonName = '';
				if(seasonList != undefined && seasonList.length > 0)
				{
					seasonList.map(function(item){
						if(item.SeasonID == seasonId){
							$scope.curSeasonName = item.seasonName;
							curSeasonName = $scope.curSeasonName;
						}
					});
				}
				
				if($scope.curSeasonName < 2022){
					$(".ap-ball-summary-wrp").addClass("inactive");
					$(".mcTabsWrap .submenu").removeClass("active");
					$(".mcTabsWrap .submenu[data-id='scoreCard']").addClass("active");
					$(".mcTabContent").hide();
					$("#expertanalysis").hide();
					$("#scoreCard").show();
					$scope.archiveDataScoreCard = true;
				}
				else
					$scope.archiveDataScoreCard = false;
				var divisionListRcentList = [];
				var alldivisionsList = divisionList;
				if(alldivisionsList != undefined && alldivisionsList.length > 0 && showRecentMatchesOnLoad)
				{
					var divInx = 0;
					alldivisionsList.map(function(item){
						if(item.LastMatchDate != undefined && item.LastMatchDate != ""){
							var lastMatchDateTimestamp = new Date(item.LastMatchDate).getTime() / 1000;
							item.LastMatchDateTimestamp = lastMatchDateTimestamp;
							if(item.SeasonID == seasonId && item.OnGoing == 1){
								divisionListRcentList.push(item);
								divInx++;
							}
						}
						
					});
				}
				if((divisionListRcentList == undefined || divisionListRcentList.length == 0) && showRecentMatchesOnLoad)
				{
					if(alldivisionsList != undefined && alldivisionsList.length > 0 && alldivisionsList[0].LastMatchDateTimestamp != undefined)
					{
						var orderedDivList = $filter('orderBy')(alldivisionsList, '-LastMatchDateTimestamp');
						var divInx = 0;
						orderedDivList.map(function(item){
							if(item.SeasonID == seasonId)
							{
								divisionListRcentList.push(item);
								divInx++;
							}
						});
					}
				}


				divisionList=$filter('filter')(divisionList,{SeasonID:seasonId},true);
				

				$scope.divisionList=divisionList;

				if(divisonId == '')
					$scope.selectedDivision = (divisionListRcentList[0] != undefined) ? divisionListRcentList[0] : divisionList[0];
				else
				{
					if(divisionList != undefined && divisionList.length > 0){
		  				var selectedDivObj = $filter("filter")(divisionList,{DivisionID:divisonId},true);
		  				$scope.selectedDivision = (selectedDivObj != undefined && selectedDivObj[0] != undefined) ? selectedDivObj[0] : [];
		  			}	
				}
				
				competitionList=data.competition;
				competitionList[0].selected  =true;

				if(competitionList != undefined && competitionList.length > 0)
				{
					competitionList.map(function(item){
						var seasonObj = $filter("filter")(data.division,{SeasonID:item.SeasonID},true);
						item.SeasonName = (seasonObj != undefined && seasonObj.length > 0) ? seasonObj[0].SeasonName : '';
						if(item.DivisionID != undefined && item.DivisionID != '')
							item.DivisionID = parseInt(item.DivisionID);
						if(item.SeasonID != undefined && item.SeasonID != '')
							item.SeasonID = parseInt(item.SeasonID);
					});
				}
				
				$scope.competitionList = competitionList;
				$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId},true);
				
				
				if(widgetLoadType == 'standings'){
					urlString= "standings";
					qstringType = "standings";
					viewscorecard= "standings";			
					console.log($scope.curretSeasonCompList);
					console.log(competitionId);
					if(competitionId == undefined || competitionId == ''){
						comId = $scope.curretSeasonCompList[0].CompetitionID;
						competitionId = $scope.curretSeasonCompList[0].CompetitionID;
					}
					
				}
				
				
				

				



				liveComlist=(data.livecompetition != undefined && data.livecompetition[0] != undefined && data.livecompetition[0]["CompetitionID"] != undefined && data.livecompetition[0]["CompetitionID"] != '') ? data.livecompetition : [];
				if(liveComlist.length > 0)
				{
					var listenliveBtn = setInterval(function(){
						if($(".livematchLink").length > 0)
						{	
							var pageName=$("#pagename").attr("data-val");
							clearInterval(listenliveBtn);
							if(pageName=="home")
								$(".livematchLink").addClass("active");	
						}
					},1000);
				}

					
				
					
				if(divisonId=='')
					divisonId= (divisionListRcentList[0] != undefined) ? divisionListRcentList[0].DivisionID : divisionList[0].DivisionID;
				var liveComItems = [];
				var codingTypeObjKey = "CodingType";
				if(liveComlist.length!=0 && loadType != 'tabchange' && getParameterByName('cId') == '' && competitionId =='' && getParameterByName('sId') == ''){
					competitionId=liveComlist[0].CompetitionID;
					liveComItems=$filter('filter')(competitionList,{CompetitionID:competitionId},true);
					if(liveComItems[0] != undefined){
						divisonId=(liveComItems[0] != undefined && liveComItems[0].DivisionID != undefined) ? liveComItems[0].DivisionID : '';
						selectedComList=$filter('filter')(competitionList,{DivisionID:divisonId,SeasonID:seasonId},true);
						$scope.selectedCompetition=liveComItems[0];
					}
					else
					{
						selectedComList=$filter('filter')(competitionList,{DivisionID:divisonId,SeasonID:seasonId},true);
						if(selectedComList.length==0){
							selectedComList=competitionList;
						}
						competitionId=selectedComList[0].CompetitionID;
						$scope.selectedCompetition = selectedComList[0];
					}

					liveComlist.map(function(item){
						selDivCompetitionobj = $filter("filter")(competitionList,{CompetitionID:item.CompetitionID,SeasonID:seasonId},true);

						if(selDivCompetitionobj != undefined && selDivCompetitionobj.length > 0)
						{
							if(!selDivCompetitionobj[0].hasOwnProperty(codingTypeObjKey))
							{
								if(t20lite)
									selDivCompetitionobj[0].CodingType = "T20Lite";
								else	
									selDivCompetitionobj[0].CodingType = "T20Pro";
							} 
							selDivCompetition.push(selDivCompetitionobj[0]);
						}
							

					});

				}
				else{
					
					selectedComList=$filter('filter')(competitionList,{DivisionID:divisonId,SeasonID:seasonId},true);
					if(selectedComList.length==0){
						selectedComList=competitionList;
					}

					var recentcompetitionList = [];
					if(competitionList != undefined && competitionList.length > 0 && showRecentMatchesOnLoad)
					{
						var divInx = 0;
						competitionList.map(function(item){
							if(item.LastMatchDate != undefined && item.LastMatchDate != ""){
								var lastMatchDateTimestamp = new Date(item.LastMatchDate).getTime() / 1000;
								item.LastMatchDateTimestamp = lastMatchDateTimestamp;
								if(item.SeasonID == seasonId && item.OnGoing == 1 && item.DivisionID == divisonId){
									recentcompetitionList.push(item);
									divInx++;
								}
							}
							else
								item.LastMatchDateTimestamp=0;
							
						});

						if(recentcompetitionList.length == 0 && competitionList[0] != undefined && competitionList[0]["LastMatchDateTimestamp"] != undefined)
						{
							var orderedCompList = $filter('orderBy')(competitionList, '-LastMatchDateTimestamp');
							var divInx = 0;
							orderedCompList.map(function(item){
								if(item.SeasonID == seasonId && item.DivisionID == divisonId) 
								{
									recentcompetitionList.push(item);
									divInx++;
								}
							});
						}
						
					}


					if(competitionId == '')
							competitionId=  (recentcompetitionList != undefined && recentcompetitionList.length > 0) ? recentcompetitionList[0].CompetitionID : selectedComList[0].CompetitionID;
					if(getParameterByName('cId') == '' && competitionId == '')
						$scope.selectedCompetition= (recentcompetitionList != undefined && recentcompetitionList.length > 0) ? recentcompetitionList[0] : selectedComList[0];
					else
					{
						for(var i=0;i<selectedComList.length;i++)
						{
							if((getParameterByName('cId') == selectedComList[i].CompetitionID ) || (competitionId == selectedComList[i].CompetitionID))
								$scope.selectedCompetition = selectedComList[i];
						}
					}
				}
				if(competitionList.length == 1)
				{
					$(".mcSearchCompetition").addClass("singleSel");
				}
				$scope.competitionType = ($scope.selectedCompetition["CompetitionType"] != undefined) ? $scope.selectedCompetition["CompetitionType"] : '';

				$scope.selectedComList=selectedComList;

				$scope.competitionId = competitionId;
				

				if($scope.selectedCompetition.statsFeed != undefined && $scope.selectedCompetition.statsFeed != '')
						statsFeed = $scope.selectedCompetition.statsFeed;
				if($scope.selectedCompetition.statsCoding != undefined && $scope.selectedCompetition.statsCoding != '')
						statsCoding = $scope.selectedCompetition.statsCoding;
				if($scope.selectedCompetition.statsCID != undefined && $scope.selectedCompetition.statsCID != '')
					statsCID = $scope.selectedCompetition.statsCID;

				if($scope.selectedCompetition.AnalyticsFeed != undefined && $scope.selectedCompetition.AnalyticsFeed != '')
						AnalyticsFeed = $scope.selectedCompetition.AnalyticsFeed;
				

				if(!$scope.selectedCompetition.hasOwnProperty(codingTypeObjKey))
				{
					if(t20lite)
						$scope.selectedCompetition.CodingType = "T20Lite";
					else	
						$scope.selectedCompetition.CodingType = "T20Pro";
				} 
				if($scope.selectedCompetition.CodingType == 'T20Pro')
				{
					if($scope.selectedCompetition.feedsource != undefined)
						feedSource = $scope.selectedCompetition.feedsource;

					t20lite = false;
					$scope.teamstatsMenu = false;
					$scope.squadsmenu = squadsmenu;
					$scope.standingsMenu = false;
					$scope.analytics_menu = analytics_menu;
						
					
				}
				else if($scope.selectedCompetition.CodingType == 'T20Lite'){
					if($scope.selectedCompetition.feedsource != undefined)
						feedSource = $scope.selectedCompetition.feedsource;
					t20lite = true;
					$scope.squadsmenu =false;
					$scope.teamstatsMenu = teamstatsMenu;
					$scope.analytics_menu = analytics_menu;
					
					$scope.standingsMenu = standingsMenu;
					
					
					$(".winlossPercentMeter").addClass("inactive");
				}

				if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
					$scope.standingsMenu = false;
				else
					$scope.standingsMenu = standingsMenu;

				if(liveComItems.length > 0 && showAllLiveMatches)
				{
					$scope.getMatches('init');
				}
				else
					$scope.bindResult(competitionId,urlString);
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
			  	setTimeout(function(){
					if($(".mcYearArch li").length>0){
						divSlider = $('.mcYearArch').bxSlider();
						$(".mcYearArch li").removeClass('active');
			  			$(".mcYearArch li[data-value='"+divisonId+"']").addClass('active');
			  			
			  			
					}
		  			if($(window).width()<=767){
		  				var slidewidth = $(window).width();
                        // $('#mcFilterBtn').bxSlider({ slideWidth: slidewidth, speed: 200,  minSlides: 1,  maxSlides: 1, moveSlides: 1, slideMargin: 1, responsive: true  });
                        $('body').undelegate('.selectSchedules .scorecardTabNavRight', 'click')
				                .delegate('.selectSchedules .scorecardTabNavRight', 'click', function () {
					    	var currentObj = $("#mcFilterBtn li.mnActive");
					    	if($(currentObj).next().length > 0)
					    	{
					    		findnextmenu(currentObj);
					    	}
					    	else
					    	{
					    		$('.selectSchedules .scorecardTabNavRight').removeClass("active");
					    	}
					    });

					    $('body').undelegate('.selectSchedules .scorecardTabNavLeft', 'click')
					    .delegate('.selectSchedules .scorecardTabNavLeft', 'click', function () {
					    	var currentObj = $("#mcFilterBtn li.mnActive");
					    	if($(currentObj).prev().length > 0)
					    	{
					    		findprevmenu(currentObj);
					    	}
					    	else
					    	{
					    		$('.selectSchedules .scorecardTabNavLeft').removeClass("active");
					    	}
					    });

                    }
                    $(".seasonList li").removeClass('active');
                    $(".seasonList li[data-id='"+seasonId+"']").addClass('active');
                    if(divisionList != undefined && divisionList.length > 0){
		  				var selectedDivObj = $filter("filter")(divisionList,{DivisionID:divisonId},true);
		  				$scope.selectedDivision = (selectedDivObj != undefined && selectedDivObj[0] != undefined) ? selectedDivObj[0] : [];
		  			}
		  			if (!$scope.$$phase) {
						$scope.$apply();
				  	}
		  			
				},1000);
			  	$(".mcSelectDefault.mcSearchCompetition").attr("data-comId",competitionId);
			});
		}
		else {
			$scope.showContentBlk(urlString);
			$scope.changeMatchBlk(viewCateg);
			$scope.bindResult(competitionId,urlString);
		}
		
		/*******Set Nav ********/
		$scope.showMatchscheduleNav = showMatchscheduleNav;
		$scope.showCompetitionList = showCompetitionList;
		$scope.showTopMenus = showTopMenus;
	}
	/******* Fixture Page Binding *******/
	$scope.fixtureInDetail = function(mId,compId,Type,activeNav){
		$scope.matchId=mId;
		$(".widget.playingXI").find(".widgetTitle").text("SQUAD");
		fixturePageChange(Type);
		$scope.showFixture=false;
		$scope.showscorecard=true;
		$scope.goBackToFixture = true;
		if(activeNav != undefined && activeNav != '' && activeNav == 'fromUpcoming'){
			$('.matchNav').trigger('click');
		}
		$("#scorecardTabs").addClass("inactive");
		$("#scorecardTabs li").removeClass("current");
    	$("#scorecardTabs li[data-tab='fullScoreContent']").addClass("current");
    	$("#scorecardWrapper .mcTabContent").removeClass("current");
    	$("#scorecardWrapper #fullScoreContent.mcTabContent").addClass("current");
    	$("#leftPanel").addClass("inactive");
		$("#rightPanel").addClass("l12");
		mcService.GetMatchSchedule(compId,function(data){ 
			matchscheduleData = (data.Matchsummary != undefined) ? data.Matchsummary : ((data.Result != undefined) ? data.Result : []);	
			upcomDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Upcoming"});
			var currentFixture = [];
			upcomDataList.map(function(item){
				if(item.MatchID == mId){
					currentFixture.push(item);
				}
			});
			if(currentFixture != undefined && currentFixture[0] != undefined){
				$scope.matchSummary = currentFixture[0];
				$scope.matchSummary.FirstBattingTeam = (currentFixture[0]['FirstBattingTeamName'] != undefined) ? currentFixture[0]['FirstBattingTeamName'] : "";
				$scope.matchSummary.SecondBattingTeam = (currentFixture[0]['SecondBattingTeamName'] != undefined) ? currentFixture[0]['SecondBattingTeamName'] : "";
				$scope.matchSummary.FirstBattingTeamLogo = (currentFixture[0]['HomeTeamLogo'] != undefined) ? currentFixture[0]['HomeTeamLogo'] : "";
				$scope.matchSummary.SecondBattingTeamLogo = (currentFixture[0]['AwayTeamLogo'] != undefined) ? currentFixture[0]['AwayTeamLogo'] : "";
			}
			$scope.getFixtureSquad(mId);
			$scope.getExpertAnalysis(mId);
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}	
		});
	}

	$scope.getExpertAnalysis=function(matchId){
		mcService.GetHeadtoHead(matchId,function(data){
			$scope.HeadToHead=data;
			if($scope.HeadToHead != '' && $scope.HeadToHead.HeadToHead[0] != undefined && $scope.HeadToHead.HeadToHead[0] !=''){
			var TotalMatchPlayed = parseInt($scope.HeadToHead.HeadToHead[0].TotalMatches);
			var Team1Matchplayed = parseInt($scope.HeadToHead.HeadToHead[0].Team1Won);
			var Team2MatchPlayed = parseInt($scope.HeadToHead.HeadToHead[0].Team2Won);
			var NoResults 	= parseInt($scope.HeadToHead.HeadToHead[0].NoResult);
			Team1Perc = (Team1Matchplayed / TotalMatchPlayed) * 100;
			Team2Perc = (Team2MatchPlayed / TotalMatchPlayed) * 100;
			NoresPerc = (NoResults / TotalMatchPlayed) * 100;
			$scope.Team1Perc=Team1Perc;
			$scope.Team2Perc=Team2Perc;
			$scope.NoresPerc=NoresPerc;
			}
		
		})
			var Team1ID = parseInt($scope.matchSummary.HomeTeamID);
			console.log(Team1ID);
			var Team2ID = parseInt($scope.matchSummary.AwayTeamID);
			$scope.Team1ID=Team1ID;
			$scope.Team2ID=Team2ID;
			mcService.GetStandings(competitionId,function(data){
			var standingsdata= data;

			var Team1recentPerformance = standingsdata.points.filter( element => element.TeamID == $scope.Team1ID);
			var Team2recentPerformance = standingsdata.points.filter( element => element.TeamID == $scope.Team2ID);
			
			$scope.Team1recentPerformance=Team1recentPerformance;
			$scope.Team2recentPerformance=Team2recentPerformance;

			})

			mcService.GettopScorer(competitionId,function(data){
			$scope.statsData = data;
			var Team1batsstats = $scope.statsData.toprunsscorers.filter( element => element.TeamID == $scope.Team1ID);
			$scope.Team1batsstats=Team1batsstats;
			
			})
			mcService.Gettopwicketers(competitionId,function(data){
				$scope.statsData2 = data;
				var Team1bowlsstats = $scope.statsData2.mostwickets.filter( element => element.TeamID == $scope.Team1ID);
				$scope.Team1bowlsstats=Team1bowlsstats;
	
	
				
			})	
			
			var citywedataFound = 0;
			cityName=[];
			for (var i= 0;i<matchscheduleData.length; i++) {
				if (matchscheduleData[i].MatchID == matchId) {
					cityName.push(matchscheduleData[i]);

			}
		}		
			var cityname = cityName[0].city.toLowerCase();
			const MatchdatetimeForWeather  = new Date(cityName[0].MatchDateNew+' '+cityName[0].GMTMatchTime);
			MatchdatetimeForWeather.setHours(MatchdatetimeForWeather.getHours() - 2);
			const timestampInSeconds = Math.floor(MatchdatetimeForWeather.getTime() / 1000);
			var TimestampValue = timestampInSeconds+19800;
			console.log(TimestampValue);
			

			cityname = cityname.replace(" ", "");
			var calbackFunc = cityname+"fivedayweather";
			var url = feedSource+"/stats/match/"+cityname+"-fivedayweather.js";
			 $.ajax({
						crossDomain: true,
						type: "GET",
						contentType: "application/json; charset=utf-8",
						async: true,
						url: url,
						dataType: "jsonp",
						jsonpCallback: calbackFunc,
						success: function (data) {
							citywedataFound = citywedataFound + 1;
							fivedayweather = (data.fivedayweather != undefined) ? data.fivedayweather : [];
							fivedayweather.city = cityname;
							cityWeatherData.push(fivedayweather);
							$scope.cityWeathersData=cityWeatherData;
							if (!$scope.$$phase) {
								$scope.$apply();
							}
							let equalData = [];
							
							for (var i= 0;i<$scope.cityWeathersData[0].list.length; i++) {
								if ($scope.cityWeathersData[0].list[i].dt >= TimestampValue) {
									equalData.push($scope.cityWeathersData[0].list[i]);
							}
						}	
							var weatherForecast = equalData[0].weather[0].main;
							var weatherTemp = parseInt(equalData[0].main.temp);
							var weatherTempMax = parseInt(equalData[0].main.temp_max);
							var weatherTempMin = parseInt(equalData[0].main.temp_min);
							var weatherwindgusts = parseInt(equalData[0].wind.gust);
							var weatherhumidity = parseInt(equalData[0].main.humidity);

							$scope.weatherTemp=weatherTemp;
							$scope.weatherTempMax=weatherTempMax;
							$scope.weatherTempMin=weatherTempMin;
							$scope.WeatherForecast=weatherForecast;
							$scope.weatherwindgusts=weatherwindgusts;
							$scope.weatherHumidity=weatherhumidity;
							$("#WeatheryesData").show();
						},
						error:function(){
							$("#WeathernoData").show()
						}
					});
					
					$scope.matchPitchReportVideos =[];
					var cMatchId = matId;
					
					mcService.GetMediaList(cMatchId,'',function(data){
						data = (data.data != undefined) ? data.data : [];
						$scope.noMatchVideos = (data.length> 0) ? false: true;
						var videotagsFound = false;
						for(var i=0;i<data.length;i++){
							
								var PitchReportVideoFound = false;
								for(j=0;j<data[i].tags.length;j++){			
									if(data[i].tags[j].label == 'pitch-report'){
										videotagsFound = true;
										PitchReportVideoFound = true;
									}						
								}
						
								if(videotagsFound)
								{
									var date = data[i].date;
									date = date.split('T');
									date = (date[0] != undefined) ? date[0] : '';
									date = date.split("-");
									var y = date[0];
									var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
									var m = date[1];
									m = monthAr[m-1];
									d = date[2];
									data[i].DisplayDate = d+' '+m+' '+y;
									var duration = (data[i].duration != undefined) ? data[i].duration : 0;
									if(duration > 0){	
										if(duration > 60){
											var mins = duration / 60;
											mins = parseInt(mins);
											var secs = duration % 60;
										}
										else{
											var mins = 0;
											var secs = duration;
										}
										data[i].DisplayDuration = mins+":"+secs;
									}
									else
										data[i].DisplayDuration = '';
									matchVideosList.push(data[i]);
									
								}
								
								if(PitchReportVideoFound)
									$scope.matchPitchReportVideos.push(data[i]);
							}
							
					});
					
	}
		
		

	/******* Squad generation for fixture page from odms *******/
	$scope.getFixtureSquad=function(matchId){
		mcService.GetFixtureSquad(matchId, function(data) {
			if(data != undefined && data != ''){
				var squadA = (data.squadA != undefined) ? data.squadA : [];
				for(var i=0;i<squadA.length;i++){
					var playerName = (squadA[i].PlayerName != undefined) ? titleCase(squadA[i].PlayerName) : "";
					playerName = playerName.replace("(IP)", "");
					playerName = playerName.replace("(RP)", "");
					playerName = playerName.replace("(CS)", "");
					playerName = playerName.replace("(C SUB)", "");
					playerName = playerName.replace("*", "");
					playerName = playerName.replace("+", "");
					playerName = playerName.replace("(C)", "");
					playerName = playerName.replace("(WK)", "");
					playerName = playerName.replace("(C)(WK)", "");
					var PlayerSkill = (squadA[i].PlayerSkill != undefined) ? titleCase(squadA[i].PlayerSkill) : "";
					if(PlayerSkill == 'Batsman')
						PlayerSkill = 'Batter';
					var playerPref = PlayerSkill.toLowerCase();
					
					if(playerPref.indexOf("all") >= 0)
						PlayerSkill = 'All Rounder';
					squadA[i].PlayerSkill = PlayerSkill;
					squadA[i].PlayerName = playerName;
				}
				console.log(squadA);
				$scope.squadA = squadA;
				$scope.squadATeamName= (data != undefined && data.squadA[0].TeamName != undefined) ? data.squadA[0].TeamName : "";//data.squadA[0].TeamName;
				$scope.squadATeamCode= (data != undefined && data.squadA[0].TeamCode != undefined) ? data.squadA[0].TeamCode : "";
					
				if($scope.squadATeamName == $scope.matchSummary.FirstBattingTeam)
					$scope.squadATeamLogo = $scope.matchSummary.FirstBattingTeamLogo;
				else if($scope.squadATeamName == $scope.matchSummary.SecondBattingTeam)
					$scope.squadATeamLogo = $scope.matchSummary.SecondBattingTeamLogo;

				var squadB = (data.squadB != undefined) ? data.squadB : [];
				for(var i=0;i<squadB.length;i++){
					var playerName = (squadB[i].PlayerName != undefined) ? titleCase(squadB[i].PlayerName) : "";
					playerName = playerName.replace("(IP)", "");
					playerName = playerName.replace("(RP)", "");
					playerName = playerName.replace("(CS)", "");
					playerName = playerName.replace("(C SUB)", "");
					playerName = playerName.replace("*", "");
					playerName = playerName.replace("+", "");
					playerName = playerName.replace("(C)", "");
					playerName = playerName.replace("(WK)", "");
					playerName = playerName.replace("(C)(WK)", "");
					var PlayerSkill = (squadB[i].PlayerSkill != undefined) ? titleCase(squadB[i].PlayerSkill) : "";
					if(PlayerSkill == 'Batsman')
						PlayerSkill = 'Batter';
					var playerPref = PlayerSkill.toLowerCase();
					if(playerPref.indexOf("all") >= 0)
						PlayerSkill = 'All Rounder';
					squadB[i].PlayerSkill = PlayerSkill;
					squadB[i].PlayerName = playerName;
				}
				$scope.squadB = squadB;
				$scope.squadBTeamName= (data != undefined && data.squadB[0].TeamName != undefined) ? data.squadB[0].TeamName : "";//data.squadB[0].TeamName;
				$scope.squadBTeamCode= (data != undefined && data.squadB[0].TeamCode != undefined) ? data.squadB[0].TeamCode : "";//data.squadB[0].TeamName; 

				if($scope.squadBTeamName == $scope.matchSummary.FirstBattingTeam)
					$scope.squadBTeamLogo = $scope.matchSummary.FirstBattingTeamLogo;
				else if($scope.squadBTeamName == $scope.matchSummary.SecondBattingTeam)
					$scope.squadBTeamLogo = $scope.matchSummary.SecondBattingTeamLogo;
				$scope.squad=true;//$scope.FindWidget(scorecardSidewidgets,'squad');
			}
			else{
				$scope.squad= false;
			}
		
			if (!$scope.$$phase) {
				$scope.$apply();
			}
			
		});
	}

	
	$scope.changePlayerStats = function(pType){
		$("#expertanalysis .ap-inner-tb-click").removeClass("ap-active-team");
		$("#expertanalysis .ap-inner-tb-click."+pType).addClass("ap-active-team");
			var TeamId = $scope.Team2ID;
			var Team1batsstats = $scope.statsData.toprunsscorers.filter( element => element.TeamID == TeamId);
			$scope.Team1batsstats=Team1batsstats;
			
	
			var Team1bowlsstats = $scope.statsData2.mostwickets.filter( element => element.TeamID == TeamId);
			$scope.Team1bowlsstats=Team1bowlsstats;

	}
	$scope.changePlayerStats1 = function(pType){
		$("#expertanalysis .ap-inner-tb-click").removeClass("ap-active-team");
		$("#expertanalysis .ap-inner-tb-click."+pType).addClass("ap-active-team");
			var TeamId = $scope.Team1ID;
			var Team1batsstats = $scope.statsData.toprunsscorers.filter( element => element.TeamID == TeamId);
			$scope.Team1batsstats=Team1batsstats;
			
		
			var Team1bowlsstats = $scope.statsData2.mostwickets.filter( element => element.TeamID == TeamId);
			$scope.Team1bowlsstats=Team1bowlsstats;

	}
	

	
	function findnextmenu(currentObj){
		
		if($(currentObj).next().length > 0)
		{
			
			$('.selectSchedules .scorecardTabNavLeft').addClass("active");
			var currentObj1 = $("#mcFilterBtn li.mnActive");
			findNextMenuActive(currentObj1,"click");
			// var isnextMenuActive = findNextMenuActive(currentObj1);
			// console.log(isnextMenuActive);
			// if(isnextMenuActive)
			// 	$(".selectSchedules .scorecardTabNavRight").addClass("active");
			// else
			// 	$(".selectSchedules .scorecardTabNavRight").removeClass("active");

			// if($(currentObj1).next().length == 0)
			// 	$('.selectSchedules .scorecardTabNavRight').removeClass("active");    
		}
		else if($(currentObj).next().length > 0)
		{
			currentObj = $(currentObj).next();
			findnextmenu(currentObj);
		}
		else
			$('.selectSchedules .scorecardTabNavRight').removeClass("active");    
			
	}
	function findprevmenu(currentObj)
	{
		if($(currentObj).prev().length > 0)
		{
			
			$('.selectSchedules .scorecardTabNavRight').addClass("active");
			var currentObj1 = $("#mcFilterBtn li.mnActive");

			findPrevMenuActive(currentObj1,"click");
			// var isprevMenuActive = findPrevMenuActive(currentObj1);
			// if(isprevMenuActive)
			// 	$(".scorecardTabNavLeft").addClass("active");
			// else
			// 	$(".scorecardTabNavLeft").removeClass("active");

			// if($(currentObj1).prev().length == 0)
			// 	$('.selectSchedules .scorecardTabNavLeft').removeClass("active");    
		}
		else if($(currentObj).prev().length > 0)
		{
			currentObj = $(currentObj).prev();
			findprevmenu(currentObj);
		}
		else
			$('.selectSchedules .scorecardTabNavLeft').removeClass("active");    
	}
	/******* datas binding ******/
	var callMatchSchData = false;
	$scope.bindResult=function(cId,pageType){
		
		urlString=pageType;
		/******* get live,fixtures and result matches script ******/
			if(pageType=="fixtures" || matchscheduleData.length == 0){
				$scope.liveList=[];
				$scope.fixtureList=[];
				$scope.resultList=[];
				$scope.liveTabLink=false;
				$scope.fixtureTabLink=false;
				$scope.resultTabLink=false;
				$scope.getTeamSquads('init');
				mcService.GetMatchSchedule(cId,function(data){ 
					firebaseSObjChange = true;
					matchscheduleData = (data.Matchsummary != undefined) ? data.Matchsummary : ((data.Result != undefined) ? data.Result : []);	
					callMatchSchData = true;
					var scorecardType = $(".smscorecardwidget").attr("widgettype");
					if(GwidgetLoadType == 'scorecard' && scorecardType == 'domestic'){
						
						var pathname = window.location.pathname; 
						pathname = pathname.split("../index.html");
						var pathSplitLen = pathname.length;
						if((pathname[pathSplitLen-1]) != undefined){
							var mOrderNo = pathname[pathSplitLen-1];
							
							if(matchscheduleData != undefined && matchscheduleData.length > 0)
							{
								for(var i=0;i<matchscheduleData.length;i++){
									
									if(matchscheduleData[i].MatchRow == mOrderNo){
										 matId= matchscheduleData[i].MatchID;
										 
											if(matchscheduleData[i].MatchStatus == 'UpComing'){
												fixObj = matchscheduleData[i];
												$scope.fixtureDetailPage(fixObj,matId);
											}
											else{
												$(".widget.playingXI.hideMobOnly").removeClass("showForSpecialCase");
												$(".widget.matchDetails.hideMobOnly").removeClass("showForSpecialCase");
												
												$scope.constructScoreCard(matId,'','','');
											}
										 
										 
										 
										 break;
									}
								}
								
							}
							
						}
					}
					
					
					
					if(filterteam != undefined && filterteam != ''){
						var filterMSchedule = [];
						matchscheduleData.map(function(item){
							if(item.FirstBattingTeamID == filterteam || item.SecondBattingTeamID == filterteam)
								filterMSchedule.push(item);
						});
						matchscheduleData = filterMSchedule;
					}
					if(matchscheduleData.length == 0)
					{
						$scope.fixtureTabLink=true;
						$scope.resultTabLink=true;
						$("#errMsg").html("No Matches Found");
						$(".pageloader").removeClass("active");
						if(pageType=="fixtures")
						{
							$("#mcMenuWrapper .mcTabs li").removeClass('current');
							$("#mcMenuWrapper .mcTabs li[data-value='fixture']").addClass('current');	
							$scope.fixtureTab=true;
						}

						$scope.showAllStats = false;
						$scope.liveTab=false;
						$scope.resultTab=false;
						if (!$scope.$$phase) {
							$scope.$apply();
					  	}
						return;
					}
					
					if(!showMatchOrder)
					{
						if(matchscheduleData != undefined && matchscheduleData.length > 0)
						{
							matchscheduleData.map(function(item){
								//item.MatchOrder = "";
							});
						}
					}
					var CompetitionObj = $filter("filter")(competitionList,{CompetitionID:cId},true);
					var CompetitionName = (CompetitionObj[0] != undefined) ? CompetitionObj[0]['CompetitionName'] : '';
					if(matchscheduleData != undefined && matchscheduleData.length > 0)
					{
						matchscheduleData.map(function(item){
							if(item.MatchDateNew != undefined && item.MatchDateNew != '' )
								item.MatchDate = item.MatchDateNew;
							if(item.timezone1 != undefined && item.timezone1 != '')
								item.timezone = item.timezone1;
							item.CompetitionName = CompetitionName;
							
							item['1FallWickets']=item['1FallWickets'].replace("dec", "d");
							item['2FallWickets']=item['2FallWickets'].replace("dec", "d");
							item['3FallWickets']=item['3FallWickets'].replace("dec", "d");
							item['4FallWickets']=item['4FallWickets'].replace("dec", "d");
						});
					}
					
					/******* filtering datas ******/
					// data.Result[0].MatchStatus  = "Live";
					// data.Result[0].LiveStream = "Live";
					// matchscheduleData[0]["MatchStatus"] = "Live";
					liveDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Live"});
					resultDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Post"});
					upcomDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Upcoming"});
					var timezoneBasedOnComp = true;
					if(upcomDataList != undefined && upcomDataList[0] != undefined && upcomDataList[0]["timezone"] != undefined && upcomDataList[0]["timezone"] != "")
						timezoneBasedOnComp = false;

					if(resultDataList.length > 0)
					{
						$scope.tstatsMenu = tstatsMenu;
						$scope.playerstatsMenu = playerstatsMenu;

						resultDataList.map(function(item){
							if(item.DivisionID == undefined)
							{
								item.DivisionID = ($scope.selectedDivision.DivisionID != undefined) ? $scope.selectedDivision.DivisionID : '';
							}
							
						});

						
						$scope.teamstatsMenu = teamstatsMenu;
						$scope.standingsMenu = standingsMenu;
						if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
							$scope.standingsMenu = false;
						else
							$scope.standingsMenu = standingsMenu;
						
					}
					else
					{
						$scope.tstatsMenu = false;
						$scope.teamstatsMenu = false;
						$scope.playerstatsMenu = false;
						$scope.standingsMenu = false;
					}
					var lKey = 0;
					upcomDataList.map(function(item){
						if(upcomDataList[lKey] != undefined && upcomDataList[lKey+1] != undefined && upcomDataList[lKey]['MatchDate'] == upcomDataList[lKey+1]['MatchDate'])
							item.doubleheaderMatch = "doubleHeader1";
						if(upcomDataList[lKey] != undefined && upcomDataList[lKey-1] != undefined && upcomDataList[lKey]['MatchDate'] == upcomDataList[lKey-1]['MatchDate'])
							item.doubleheaderMatch = "doubleHeader2";
						lKey++;
						if(item.FixtureID == undefined)
							item.FixtureID = item.MatchID;
						
					});

					var uniqueCity = [];
					upcomDataList.map(function(item){
						if(item.city != undefined && item.city != '')
						{
							if(jQuery.inArray(item.city, uniqueCity ) == '-1' )
								uniqueCity.push(item.city);
						}
						else if(FixturecitiesList[item.GroundName] != undefined)
						{
							if(jQuery.inArray(FixturecitiesList[item.GroundName], uniqueCity ) == '-1' )
								uniqueCity.push(FixturecitiesList[item.GroundName]);

							item.city = FixturecitiesList[item.GroundName];
						}

						if(item.FixtureID == undefined)
							item.FixtureID = item.MatchID;

						if(item.timezone != undefined && item.timezone != "" && false){
							// var url = "http://52.74.184.76/wicbCRUD/timeapi/getCurrentTimefromzone";
							var url = "https://sportsmechanics.in/timeapi.php";
							var timezone = item.timezone;
							var d = new Date();
							var timeZoneOffset = d.getTimezoneOffset();
							var jan = new Date(d.getFullYear(), 0, 1);
						    var jul = new Date(d.getFullYear(), 6, 1);
						    var maxVal = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
						    var daylight = 0;
						    if(timeZoneOffset < maxVal)
						    	daylight = 1;
							 $.ajax({
					            crossDomain: true,
					            type: "POST",
					            // contentType: "application/json; charset=utf-8",
					            // async: true,
					            url: url,
					            data : {
						          timezone : timezone,
						          timeZoneOffset : timeZoneOffset,
						          daylight : daylight
						        },
					            dataType: "json",
					            success: function (data) {
					            	var zoneTime = (data.cuurenttime != undefined) ? data.cuurenttime : ''; 
					            	var zoneAbrv = (data.timezoneABBRV != undefined) ? data.timezoneABBRV : ''; 
					            	
					            	if(zoneTime != ''){
					            		zoneTime = new Date(zoneTime).getTime() / 1000;
					            		clearInterval(fixCountdownInterval2[item.FixtureID]);
					            		$scope.getFixtureCountDownInv(item,zoneTime);
					            		var currentZoneTime =  (data.currentTimezoneTime != undefined) ? data.currentTimezoneTime : ''; 
					            		currentZoneTime = new Date(currentZoneTime).getTime() / 1000;

					            		var matchLiveFromFixtures = [];
										if(upcomDataList != undefined && upcomDataList.length > 0)
										{
											upcomDataList.map(function(item){
												var currentZoneMatchTime = zoneTime - currentZoneTime;
												var matchDateTime = item.MatchDate+" "+item.MatchTime;
												var d = new Date(matchDateTime).getTime() / 1000;
												if(currentZoneMatchTime == 0)
													currentZoneMatchTime = d;
												else if(Math.sign(currentZoneMatchTime) == 1)
													currentZoneMatchTime = d - currentZoneMatchTime;
												else if(Math.sign(currentZoneMatchTime) == -1)
													currentZoneMatchTime = d - currentZoneMatchTime;
												else
													currentZoneMatchTime = d;

												if(currentZoneTime > currentZoneMatchTime && showLiveMatchBasedOnZoneTime && currentZoneTime <= (currentZoneMatchTime+28800)){
													item.MatchStatus = "Live";
													matchLiveFromFixtures.push(item.FixtureID);
												}
													
												
												currentZoneMatchTime = new Date(currentZoneMatchTime*1000);


												var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

												var day = currentZoneMatchTime.getDate();
												var mnth = currentZoneMatchTime.getMonth();	
												mnth = monthAr[mnth];
												var yr = currentZoneMatchTime.getFullYear();
												var hr = currentZoneMatchTime.getHours();
												if(hr < 10) hr = "0"+hr;
												var min = currentZoneMatchTime.getMinutes();
												if(min < 10) min = "0"+min;
												var hours = currentZoneMatchTime.getHours();
												  var minutes = currentZoneMatchTime.getMinutes();
												  var ampm = hours >= 12 ? 'pm' : 'am';
												  hours = hours % 12;
												  hours = hours ? hours : 12; // the hour '0' should be '12'
												  minutes = minutes < 10 ? '0'+minutes : minutes;
												  var strTime = hours + ':' + minutes + ' ' + ampm;
												var currentZoneMatchDateTime = day+" "+mnth+" "+yr+", "+strTime+" "+zoneAbrv;
												item.currentZoneMatchDateTime = currentZoneMatchDateTime;
												dateTimeWithTimezone[matchDateTime] = currentZoneMatchDateTime;
												dateWithTimezone[item.MatchDate] =  day+" "+mnth+" "+yr;
												timeWithTimezone[matchDateTime] =  hr+":"+min+" "+zoneAbrv;
											});
										}
										
										if(matchscheduleData != undefined && matchscheduleData.length > 0 && showLiveMatchBasedOnZoneTime){
											matchscheduleData.map(function(item){
												var checkMatchId = (item.FixtureID != undefined) ? item.FixtureID : item.MatchID;
												if(jQuery.inArray(checkMatchId, matchLiveFromFixtures ) != '-1' )
													item.MatchStatus = "Live";
											});
											liveDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Live"});
											var checkFixtures = $filter("filter")(upcomDataList,{MatchStatus:"Upcoming"});

											if(liveDataList != undefined && liveDataList.length > 0){
												$scope.liveTab=true;
												$scope.fixtureTab=false;
												$scope.resultTab=false;
												$scope.showLiveWidget=false;
												$scope.liveTabLink = true;
												
												setTimeout(function(){
														$("#mcFilterBtn li.mnActive").removeClass('mnActive');
														$("#mcMenuWrapper .mcTabs li").removeClass('current');
														$("#mcFilterBtn li[data-value='live']").addClass('mnActive');
														$("#mcMenuWrapper .mcTabs li[data-value='live']").addClass('current');
														if(checkFixtures==undefined || checkFixtures.length == 0)
															$scope.fixtureTabLink = false;

														if (!$scope.$$phase) {
															$scope.$apply();
													  	}

												},2100);
												clearInterval(liveInterval);
												if(cloudFirestore)
													firebaseSRef();
												if(urlString != "scorecard" && callFromTemplate =='')
												{
													if(!cloudFirestore){
														liveInterval=setInterval(function(){
															$scope.getLiveScore(cId); // calling live score  refreshing function
														},15000);
													}
													else{
														clearInterval(listencloudFirestoreDB);
															listencloudFirestoreDB = setInterval(function(){
																if(cloudFirestoreDB != ""){
																	clearInterval(listencloudFirestoreDB);
																	firebaseSRef = cloudFirestoreDB.collection("matchstatus")
																    .onSnapshot(function(doc) {
																        if(firebaseSObjChange){
																        	$scope.getLiveScore(cId);
																        }
																				    		
																    });
																	}
																},100);
													}
													
												}
											}
										}
										
										if(resultDataList != undefined && resultDataList.length > 0)
										{
											resultDataList.map(function(item){
												var currentZoneMatchTime = zoneTime - currentZoneTime;
												var matchDateTime = item.MatchDate+" "+item.MatchTime;
												var d = new Date(matchDateTime).getTime() / 1000;
												if(currentZoneMatchTime == 0)
													currentZoneMatchTime = d;
												else if(Math.sign(currentZoneMatchTime) == 1)
													currentZoneMatchTime = d - currentZoneMatchTime;
												else if(Math.sign(currentZoneMatchTime) == -1)
													currentZoneMatchTime = d - currentZoneMatchTime;
												else
													currentZoneMatchTime = d;
												currentZoneMatchTime = new Date(currentZoneMatchTime*1000);

												var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

												var day = currentZoneMatchTime.getDate();
												var mnth = currentZoneMatchTime.getMonth();	
												mnth = monthAr[mnth];
												var yr = currentZoneMatchTime.getFullYear();
												var hr = currentZoneMatchTime.getHours();
												if(hr < 10) hr = "0"+hr;
												var min = currentZoneMatchTime.getMinutes();
												if(min < 10) min = "0"+min;
												var hours = currentZoneMatchTime.getHours();
												  var minutes = currentZoneMatchTime.getMinutes();
												  var ampm = hours >= 12 ? 'pm' : 'am';
												  hours = hours % 12;
												  hours = hours ? hours : 12; // the hour '0' should be '12'
												  minutes = minutes < 10 ? '0'+minutes : minutes;
												  var strTime = hours + ':' + minutes + ' ' + ampm;
												var currentZoneMatchDateTime = day+" "+mnth+" "+yr+", "+strTime+" "+zoneAbrv;
												item.currentZoneMatchDateTime = currentZoneMatchDateTime;
												dateTimeWithTimezone[matchDateTime] = currentZoneMatchDateTime;
												dateWithTimezone[item.MatchDate] =  day+" "+mnth+" "+yr;
												timeWithTimezone[matchDateTime] =  hr+":"+min+" "+zoneAbrv;
												var currentZoneMatchTimeDisplay = strTime+" "+zoneAbrv;
												item.currentZoneMatchTimeDisplay = currentZoneMatchTimeDisplay;	
												item.currentZoneMatchDate = day+" "+mnth+" "+yr;
											});
										}
										
										if(liveDataList != undefined && liveDataList.length > 0)
										{
											liveDataList.map(function(item){
												var currentZoneMatchTime = zoneTime - currentZoneTime;
												var matchDateTime = item.MatchDate+" "+item.MatchTime;
												var d = new Date(matchDateTime).getTime() / 1000;
												if(currentZoneMatchTime == 0)
													currentZoneMatchTime = d;
												else if(Math.sign(currentZoneMatchTime) == 1)
													currentZoneMatchTime = d - currentZoneMatchTime;
												else if(Math.sign(currentZoneMatchTime) == -1)
													currentZoneMatchTime = d - currentZoneMatchTime;
												else
													currentZoneMatchTime = d;
												currentZoneMatchTime = new Date(currentZoneMatchTime*1000);

												var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

												var day = currentZoneMatchTime.getDate();
												var mnth = currentZoneMatchTime.getMonth();	
												mnth = monthAr[mnth];
												var yr = currentZoneMatchTime.getFullYear();
												var hr = currentZoneMatchTime.getHours();
												if(hr < 10) hr = "0"+hr;
												var min = currentZoneMatchTime.getMinutes();
												if(min < 10) min = "0"+min;
												var hours = currentZoneMatchTime.getHours();
												  var minutes = currentZoneMatchTime.getMinutes();
												  var ampm = hours >= 12 ? 'pm' : 'am';
												  hours = hours % 12;
												  hours = hours ? hours : 12; // the hour '0' should be '12'
												  minutes = minutes < 10 ? '0'+minutes : minutes;
												  var strTime = hours + ':' + minutes + ' ' + ampm;
												var currentZoneMatchDateTime = day+" "+mnth+" "+yr+", "+strTime+" "+zoneAbrv;
												item.currentZoneMatchDateTime = currentZoneMatchDateTime;
												dateTimeWithTimezone[matchDateTime] = currentZoneMatchDateTime;
												dateWithTimezone[item.MatchDate] =  day+" "+mnth+" "+yr;
												timeWithTimezone[matchDateTime] =  hr+":"+min+" "+zoneAbrv;
											});
										}
										$scope.liveList=liveDataList;
										$scope.fixtureList=upcomDataList;
										$scope.resultList=resultDataList;

										var allMatches = [];
										if(liveDataList != undefined && liveDataList.length > 0){
											liveDataList.map(function(item){
												var matchDateTime = item.MatchDate+" "+item.MatchTime;
												var d = new Date(matchDateTime).getTime() / 1000;
												item.timestamp = d;
												allMatches.push(item);
											});										
										}
										if(upcomDataList != undefined && upcomDataList.length > 0){
											upcomDataList.map(function(item){
												var matchDateTime = item.MatchDate+" "+item.MatchTime;
												var d = new Date(matchDateTime).getTime() / 1000;
												item.timestamp = d;
												allMatches.push(item);
											});										
										}
										if(resultDataList != undefined && resultDataList.length > 0){
											resultDataList.map(function(item){
												var matchDateTime = item.MatchDate+" "+item.MatchTime;
												var d = new Date(matchDateTime).getTime() / 1000;
												item.timestamp = d;
												allMatches.push(item);
											});										
										}
										$scope.allMatches = allMatches;

										if (!$scope.$$phase) {
											$scope.$apply();
									  	}
					            		
					            	}
					            		
					            },
					            error:function(){
					            	
					            }
					        });
						}

						if($scope.competitionType == "Twenty20 Match")
						{
							var matchStartTime = (item.MatchTime != undefined) ? item.MatchTime : "00:00";
							var timeAr = matchStartTime.split(":");
							var hrs = (timeAr[0] != undefined) ? timeAr[0] : 0;
							hrs = parseInt(hrs) + 4;
							if(hrs > 23) hrs = 23;
							var mins = (timeAr[1] != undefined) ? timeAr[1] : "00";
							var matchEndTime = hrs +":"+mins;
							item.matchEndTime = matchEndTime;

							var matchDateString = (item.MATCH_COMMENCE_START_DATE != undefined) ? item.MATCH_COMMENCE_START_DATE : "";
							matchDateString = matchDateString.split("T");
							matchDateString = (matchDateString[0] != undefined) ? matchDateString[0] : "";
							matchDateString = matchDateString.split("-");
							var matchDateCalFormat = "";
							if(matchDateString != undefined && matchDateString.length == 3)
							{
								matchDateCalFormat = matchDateString[2]+"-"+matchDateString[1]+"-"+matchDateString[0];
							}
							item.matchDateCalFormat = matchDateCalFormat;
							if(item.timezone == undefined || item.timezone == '')
								item.timezone = ($scope.selectedCompetition["timezone"] != undefined) ? $scope.selectedCompetition["timezone"] : 'Asia/Kolkata';
						}
						else {
							var matchStartTime = (item.MatchTime != undefined) ? item.MatchTime : "00:00";
							var timeAr = matchStartTime.split(":");
							var hrs = (timeAr[0] != undefined) ? timeAr[0] : 0;
							hrs = parseInt(hrs) + 9;
							if(hrs > 23) hrs = 23;
							var mins = (timeAr[1] != undefined) ? timeAr[1] : "00";
							var matchEndTime = hrs +":"+mins;
							item.matchEndTime = matchEndTime;

							var matchDateString = (item.MATCH_COMMENCE_START_DATE != undefined) ? item.MATCH_COMMENCE_START_DATE : "";
							matchDateString = matchDateString.split("T");
							matchDateString = (matchDateString[0] != undefined) ? matchDateString[0] : "";
							matchDateString = matchDateString.split("-");
							var matchDateCalFormat = "";
							if(matchDateString != undefined && matchDateString.length == 3)
							{
								matchDateCalFormat = matchDateString[2]+"-"+matchDateString[1]+"-"+matchDateString[0];
							}
							item.matchDateCalFormat = matchDateCalFormat;
							if(item.timezone == undefined || item.timezone == '')
								item.timezone = ($scope.selectedCompetition["timezone"] != undefined) ? $scope.selectedCompetition["timezone"] : 'Asia/Kolkata';
							
						}
					});

					if(uniqueCity.length > 0 && weatherInfo)
					{
						$scope.getfivedayweather(upcomDataList,uniqueCity);
					}
					
					// var url = "http://52.74.184.76/wicbCRUD/timeapi/getCurrentTimefromzone";
					var url = "https://sportsmechanics.in/timeapi.php";
					

					
					if(timezoneBasedOnComp && false){


					var timezone = ($scope.selectedCompetition["timezone"] != undefined) ? $scope.selectedCompetition["timezone"] : 'Asia/Kolkata';
					var d = new Date();
					var timeZoneOffset = d.getTimezoneOffset();
							
					var jan = new Date(d.getFullYear(), 0, 1);
				    var jul = new Date(d.getFullYear(), 6, 1);
				    var maxVal = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
				    var daylight = 0;
				    if(timeZoneOffset < maxVal)
				    	daylight = 1;
					 $.ajax({
			            crossDomain: true,
			            type: "POST",
			            // contentType: "application/json; charset=utf-8",
			            // async: true,
			            url: url,
			            data : {
				          timezone : timezone,
				          timeZoneOffset : timeZoneOffset,
				          daylight : daylight
				        },
			            dataType: "json",
			            success: function (data) {
			            	var zoneTime = (data.cuurenttime != undefined) ? data.cuurenttime : ''; 
			            	var zoneAbrv = (data.timezoneABBRV != undefined) ? data.timezoneABBRV : ''; 
			            	
			            	if(zoneTime != ''){
			            		zoneTime = new Date(zoneTime).getTime() / 1000;
			            		clearInterval(fixCountdownInterval);
			            		$scope.getFixtureCountDown(upcomDataList,zoneTime);
			            		var currentZoneTime =  (data.currentTimezoneTime != undefined) ? data.currentTimezoneTime : ''; 
			            		currentZoneTime = new Date(currentZoneTime).getTime() / 1000;
			            		var matchLiveFromFixtures = [];
								if(upcomDataList != undefined && upcomDataList.length > 0)
								{
									upcomDataList.map(function(item){
										var currentZoneMatchTime = zoneTime - currentZoneTime;
										var matchDateTime = item.MatchDate+" "+item.MatchTime;
										var d = new Date(matchDateTime).getTime() / 1000;
										if(currentZoneMatchTime == 0)
											currentZoneMatchTime = d;
										else if(Math.sign(currentZoneMatchTime) == 1)
											currentZoneMatchTime = d - currentZoneMatchTime;
										else if(Math.sign(currentZoneMatchTime) == -1)
											currentZoneMatchTime = d - currentZoneMatchTime;
										else
											currentZoneMatchTime = d;

										if(currentZoneTime > currentZoneMatchTime && showLiveMatchBasedOnZoneTime && currentZoneTime <= (currentZoneMatchTime+28800)){
											item.MatchStatus = "Live";
											matchLiveFromFixtures.push(item.FixtureID);
										}
											
										
										currentZoneMatchTime = new Date(currentZoneMatchTime*1000);


										var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

										var day = currentZoneMatchTime.getDate();
										var mnth = currentZoneMatchTime.getMonth();	
										mnth = monthAr[mnth];
										var yr = currentZoneMatchTime.getFullYear();
										var hr = currentZoneMatchTime.getHours();
										if(hr < 10) hr = "0"+hr;
										var min = currentZoneMatchTime.getMinutes();
										if(min < 10) min = "0"+min;
										var hours = currentZoneMatchTime.getHours();
												  var minutes = currentZoneMatchTime.getMinutes();
												  var ampm = hours >= 12 ? 'pm' : 'am';
												  hours = hours % 12;
												  hours = hours ? hours : 12; // the hour '0' should be '12'
												  minutes = minutes < 10 ? '0'+minutes : minutes;
												  var strTime = hours + ':' + minutes + ' ' + ampm;
										var currentZoneMatchDateTime = day+" "+mnth+" "+yr+", "+strTime+" "+zoneAbrv;
										item.currentZoneMatchDateTime = currentZoneMatchDateTime;
										dateTimeWithTimezone[matchDateTime] = currentZoneMatchDateTime;
										dateWithTimezone[item.MatchDate] =  day+" "+mnth+" "+yr;
										timeWithTimezone[matchDateTime] =  hr+":"+min+" "+zoneAbrv;
									});
								}
								
								if(matchscheduleData != undefined && matchscheduleData.length > 0 && showLiveMatchBasedOnZoneTime){
									matchscheduleData.map(function(item){
										var checkMatchId = (item.FixtureID != undefined) ? item.FixtureID : item.MatchID;
										if(jQuery.inArray(checkMatchId, matchLiveFromFixtures ) != '-1' )
											item.MatchStatus = "Live";
									});
									liveDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Live"});
									var checkFixtures = $filter("filter")(upcomDataList,{MatchStatus:"Upcoming"});

									if(liveDataList != undefined && liveDataList.length > 0){
										$scope.liveTab=true;
										$scope.fixtureTab=false;
										$scope.resultTab=false;
										$scope.showLiveWidget=false;
										$scope.liveTabLink = true;
										
										setTimeout(function(){
												$("#mcFilterBtn li.mnActive").removeClass('mnActive');
												$("#mcMenuWrapper .mcTabs li").removeClass('current');
												$("#mcFilterBtn li[data-value='live']").addClass('mnActive');
												$("#mcMenuWrapper .mcTabs li[data-value='live']").addClass('current');
												if(checkFixtures==undefined || checkFixtures.length == 0)
													$scope.fixtureTabLink = false;

												if (!$scope.$$phase) {
													$scope.$apply();
											  	}

										},2100);
										clearInterval(liveInterval);
										if(cloudFirestore)
													firebaseSRef();
										if(urlString != "scorecard" && callFromTemplate =='')
										{
											if(!cloudFirestore){
												liveInterval=setInterval(function(){
													$scope.getLiveScore(cId); // calling live score  refreshing function
												},15000);
											}
											else{
												clearInterval(listencloudFirestoreDB);
												listencloudFirestoreDB = setInterval(function(){
													if(cloudFirestoreDB != ""){
														clearInterval(listencloudFirestoreDB);
														firebaseSRef = cloudFirestoreDB.collection("matchstatus")
													    .onSnapshot(function(doc) {
													        if(firebaseSObjChange){
													        	$scope.getLiveScore(cId);
													        }
																	    		
													    });
														}
													},100);
											}
										}
									}
								}
								
								if(resultDataList != undefined && resultDataList.length > 0)
								{
									resultDataList.map(function(item){
										var currentZoneMatchTime = zoneTime - currentZoneTime;
										var matchDateTime = item.MatchDate+" "+item.MatchTime;
										var d = new Date(matchDateTime).getTime() / 1000;
										if(currentZoneMatchTime == 0)
											currentZoneMatchTime = d;
										else if(Math.sign(currentZoneMatchTime) == 1)
											currentZoneMatchTime = d - currentZoneMatchTime;
										else if(Math.sign(currentZoneMatchTime) == -1)
											currentZoneMatchTime = d - currentZoneMatchTime;
										else
											currentZoneMatchTime = d;
										currentZoneMatchTime = new Date(currentZoneMatchTime*1000);

										var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

										var day = currentZoneMatchTime.getDate();
										var mnth = currentZoneMatchTime.getMonth();	
										mnth = monthAr[mnth];
										var yr = currentZoneMatchTime.getFullYear();
										var hr = currentZoneMatchTime.getHours();
										if(hr < 10) hr = "0"+hr;
										var min = currentZoneMatchTime.getMinutes();
										if(min < 10) min = "0"+min;
										var hours = currentZoneMatchTime.getHours();
										  var minutes = currentZoneMatchTime.getMinutes();
										  var ampm = hours >= 12 ? 'pm' : 'am';
										  hours = hours % 12;
										  hours = hours ? hours : 12; // the hour '0' should be '12'
										  minutes = minutes < 10 ? '0'+minutes : minutes;
										  var strTime = hours + ':' + minutes + ' ' + ampm;

										var currentZoneMatchDateTime = day+" "+mnth+" "+yr+", "+strTime+" "+zoneAbrv;
										item.currentZoneMatchDateTime = currentZoneMatchDateTime;
										dateTimeWithTimezone[matchDateTime] = currentZoneMatchDateTime;
										dateWithTimezone[item.MatchDate] =  day+" "+mnth+" "+yr;
										timeWithTimezone[matchDateTime] =  hr+":"+min+" "+zoneAbrv;
										var currentZoneMatchTimeDisplay = strTime+" "+zoneAbrv;
												item.currentZoneMatchTimeDisplay = currentZoneMatchTimeDisplay;	
												item.currentZoneMatchDate = day+" "+mnth+" "+yr;
									});
								}
								
								if(liveDataList != undefined && liveDataList.length > 0)
								{
									liveDataList.map(function(item){
										var currentZoneMatchTime = zoneTime - currentZoneTime;
										var matchDateTime = item.MatchDate+" "+item.MatchTime;
										var d = new Date(matchDateTime).getTime() / 1000;
										if(currentZoneMatchTime == 0)
											currentZoneMatchTime = d;
										else if(Math.sign(currentZoneMatchTime) == 1)
											currentZoneMatchTime = d - currentZoneMatchTime;
										else if(Math.sign(currentZoneMatchTime) == -1)
											currentZoneMatchTime = d - currentZoneMatchTime;
										else
											currentZoneMatchTime = d;
										currentZoneMatchTime = new Date(currentZoneMatchTime*1000);

										var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

										var day = currentZoneMatchTime.getDate();
										var mnth = currentZoneMatchTime.getMonth();	
										mnth = monthAr[mnth];
										var yr = currentZoneMatchTime.getFullYear();
										var hr = currentZoneMatchTime.getHours();
										if(hr < 10) hr = "0"+hr;
										var min = currentZoneMatchTime.getMinutes();
										if(min < 10) min = "0"+min;

										var hours = currentZoneMatchTime.getHours();
										  var minutes = currentZoneMatchTime.getMinutes();
										  var ampm = hours >= 12 ? 'pm' : 'am';
										  hours = hours % 12;
										  hours = hours ? hours : 12; // the hour '0' should be '12'
										  minutes = minutes < 10 ? '0'+minutes : minutes;
										  var strTime = hours + ':' + minutes + ' ' + ampm;

										var currentZoneMatchDateTime = day+" "+mnth+" "+yr+", "+strTime+" "+zoneAbrv;
										item.currentZoneMatchDateTime = currentZoneMatchDateTime;
										dateTimeWithTimezone[matchDateTime] = currentZoneMatchDateTime;
										dateWithTimezone[item.MatchDate] =  day+" "+mnth+" "+yr;
										timeWithTimezone[matchDateTime] =  hr+":"+min+" "+zoneAbrv;
									});
								}
								$scope.liveList=liveDataList;
								$scope.fixtureList=upcomDataList;
								$scope.resultList=resultDataList;
								var allMatches = [];
								if(liveDataList != undefined && liveDataList.length > 0){
									liveDataList.map(function(item){
										var matchDateTime = item.MatchDate+" "+item.MatchTime;
										var d = new Date(matchDateTime).getTime() / 1000;
										item.timestamp = d;
										allMatches.push(item);
									});										
								}
								if(upcomDataList != undefined && upcomDataList.length > 0){
									upcomDataList.map(function(item){
										var matchDateTime = item.MatchDate+" "+item.MatchTime;
										var d = new Date(matchDateTime).getTime() / 1000;
										item.timestamp = d;
										allMatches.push(item);
									});										
								}
								if(resultDataList != undefined && resultDataList.length > 0){
									resultDataList.map(function(item){
										var matchDateTime = item.MatchDate+" "+item.MatchTime;
										var d = new Date(matchDateTime).getTime() / 1000;
										item.timestamp = d;
										allMatches.push(item);
									});										
								}
								$scope.allMatches = allMatches;
								if (!$scope.$$phase) {
									$scope.$apply();
							  	}

							  	$.getScript(mcpath+"js/atc.minv1.5.js", function() {
							  	});
			            	}
			            		
			            },
			            error:function(){
			            	
			            }
			        });
					}
					// $scope.getFixtureCountDown(upcomDataList);
					
					



					$scope.liveList=liveDataList;
				
					if(matId != undefined && matId != "" && pageType == "scorecard" && $scope.liveList.length > 0){
					
						$scope.checkMatchLive(matId);
					}
					
					$scope.fixtureList=upcomDataList;
					$scope.resultList=resultDataList;
					var allMatches = [];
					if(liveDataList != undefined && liveDataList.length > 0){
						liveDataList.map(function(item){
							var matchDateTime = item.MatchDate+" "+item.MatchTime;
							var d = new Date(matchDateTime).getTime() / 1000;
							item.timestamp = d;
							allMatches.push(item);
						});										
					}
					if(upcomDataList != undefined && upcomDataList.length > 0){
						upcomDataList.map(function(item){
							var matchDateTime = item.MatchDate+" "+item.MatchTime;
							var d = new Date(matchDateTime).getTime() / 1000;
							item.timestamp = d;
							allMatches.push(item);
						});										
					}
					if(resultDataList != undefined && resultDataList.length > 0){
						resultDataList.map(function(item){
							var matchDateTime = item.MatchDate+" "+item.MatchTime;
							var d = new Date(matchDateTime).getTime() / 1000;
							item.timestamp = d;
							allMatches.push(item);
						});										
					}
					
					$scope.allMatches = allMatches;
					liveData=(liveDataList[0] != undefined && liveDataList[0].MatchID!=0)? liveDataList[0].MatchID:0;
					upcomData=(upcomDataList[0] != undefined && upcomDataList[0]!=0)?upcomDataList[0].HomeTeamID:0;
					var resultsData=(resultDataList[0]!= undefined && resultDataList[0]!=0)?resultDataList[0].MatchID:0;

					if(liveDataList[0] != undefined && liveDataList[0].MatchID!=0)
					{
						$scope.liveTabLink=true;
						if(seasonChange)
						{
							viewCateg = "live";
							seasonChange = false;
						}
						var livematchuniqueCity = [];
						liveDataList.map(function(item){
							if(item.city != undefined && item.city != '')
							{
								if(jQuery.inArray(item.city, livematchuniqueCity ) == '-1' )
									livematchuniqueCity.push(item.city);
							}
							
						});
						// if(livematchuniqueCity.length > 0)
						// 	$scope.getcurrentDayweather(liveDataList,livematchuniqueCity);

					}
					if(upcomDataList[0] != undefined && upcomDataList[0]!=0)
					{
						$scope.fixtureTabLink=true;
						if(seasonChange)
						{
							viewCateg = "fixture";
							seasonChange = false;
						}
						
					}
					if(resultDataList[0]!= undefined && resultDataList[0]!=0)
					{
						$scope.resultTabLink=true;
						if(seasonChange)
						{
							viewCateg = "result";
							seasonChange = false;
						}
					}

					if($("#primary").length > 0)
							$("#primary").addClass("withLiveStream");
					if(liveDataList[0] != undefined && liveDataList[0].MatchID!=0){
						$("#streamingplayer").addClass("active");
						if($("#primary").length > 0)
							$("#primary").addClass("withLiveStream");
						else
							$("body").addClass("withLiveStream");
					}
					else
					{
						$("#streamingplayer").remove();
						// $("#primary").removeClass("withLiveStream");
						// $("body").removeClass("withLiveStream");
					}
					if(callFromTemplate != '')
					{
						viewCateg = callFromTemplate;
						if(viewCateg == 'result')
						{
							$scope.liveTab=false;
							$scope.fixtureTab=false;
							$scope.resultTab=true;
						}
						if(viewCateg == 'fixture')
						{
							$scope.liveTab=false;
							$scope.fixtureTab=true;
							$scope.resultTab=false;
						}
						
					}
				
					// Stop live stram
					$("#streamingplayer").remove();
					$(".matchScheduleSmipl").removeClass("hide");
						if(pageType=="fixtures"){
						if(liveData==0 && viewCateg != 'live'){
							clearInterval(liveInterval);
							if(cloudFirestore)
													firebaseSRef();
							if(((upcomData==0 && resultsData != 0) || (upcomData!=0 && resultsData != 0)) && (viewCateg != 'live' && viewCateg != 'fixture' && viewCateg != 'tourstats')){
								$scope.liveTab=false;
								$scope.fixtureTab=false;
								$scope.resultTab=true;
								$("#mcFilterBtn li.mnActive").removeClass('mnActive');
								$("#mcMenuWrapper .mcTabs li").removeClass('current');
								setTimeout(function(){
									$("#mcFilterBtn li[data-value='result']").addClass('mnActive');
									$("#mcMenuWrapper .mcTabs li[data-value='result']").addClass('current');
								},1000);
							}
							else if(upcomData!=0 && (viewCateg != 'live' && viewCateg != 'result' && viewCateg != 'tourstats')){
								$scope.liveTab=false;
								$scope.fixtureTab=true;
								$scope.resultTab=false;
								$("#mcFilterBtn li.mnActive").removeClass('mnActive');
								$("#mcMenuWrapper .mcTabs li").removeClass('current');
								setTimeout(function(){
									$("#mcFilterBtn li[data-value='fixture']").addClass('mnActive');
									$("#mcMenuWrapper .mcTabs li[data-value='fixture']").addClass('current');
								},1000);

								// clearInterval(liveInterval);
								// liveInterval=setInterval(function(){
								// 	$scope.getLiveScore(cId); // calling live score  refreshing function
								// },15000);
								
								if(cloudFirestore){
									firebaseSRef();
									clearInterval(listencloudFirestoreDB);
									listencloudFirestoreDB = setInterval(function(){
										if(cloudFirestoreDB != ""){
											clearInterval(listencloudFirestoreDB);
											firebaseSRef = cloudFirestoreDB.collection("matchstatus")
										    .onSnapshot(function(doc) {
										        if(firebaseSObjChange){
										        	$scope.getLiveScore(cId,pageType);
										        }
														    		
										    });
											}
									},100);
								}
								
								
							}
							else{
								$("#errMsg").html("No Match Found");
								$(".matchScheduleSmipl").addClass("hide");
							}
						}
						else if(liveData!=0){
							if((viewCateg != 'fixture' && viewCateg != 'result' && viewCateg != 'tourstats'))
							{
								$scope.liveTab=true;
								$scope.fixtureTab=false;
								$scope.resultTab=false;
								$scope.showLiveWidget=false;
								$("#mcFilterBtn li.mnActive").removeClass('mnActive');
								$("#mcMenuWrapper .mcTabs li").removeClass('current');
								setTimeout(function(){
										$("#mcFilterBtn li[data-value='live']").addClass('mnActive');
										$("#mcMenuWrapper .mcTabs li[data-value='live']").addClass('current');
								},1000);
								clearInterval(liveInterval);
								if(cloudFirestore)
													firebaseSRef();
								if(urlString != "scorecard" && callFromTemplate =='')
								{
									if(!cloudFirestore){
										liveInterval=setInterval(function(){
											$scope.getLiveScore(cId); // calling live score  refreshing function
										},15000);
									}
									else{
										clearInterval(listencloudFirestoreDB);
										listencloudFirestoreDB = setInterval(function(){
											if(cloudFirestoreDB != ""){
												clearInterval(listencloudFirestoreDB);
												firebaseSRef = cloudFirestoreDB.collection("matchstatus")
											    .onSnapshot(function(doc) {
											        if(firebaseSObjChange){
											        	$scope.getLiveScore(cId);
											        }
															    		
											    });
												}
											},100);
										
									}
								}
								
								
								if(liveBriefWidget)
								{
									$scope.constructScoreCard(liveDataList[0].MatchID,'','liveBriefWidget');
								}	
							}
							else if(((upcomData==0 && resultsData != 0) || (upcomData!=0 && resultsData != 0)) && (viewCateg != 'live' && viewCateg != 'fixture' && viewCateg != 'tourstats')){
								$scope.liveTab=false;
								$scope.fixtureTab=false;
								$scope.resultTab=true;
								$("#mcFilterBtn li.mnActive").removeClass('mnActive');
								$("#mcMenuWrapper .mcTabs li").removeClass('current');
								setTimeout(function(){
									$("#mcFilterBtn li[data-value='result']").addClass('mnActive');
									$("#mcMenuWrapper .mcTabs li[data-value='result']").addClass('current');
								},1000);
							}
							else if(upcomData!=0 && (viewCateg != 'live' && viewCateg != 'result' && viewCateg != 'tourstats')){
								$scope.liveTab=false;
								$scope.fixtureTab=true;
								$scope.resultTab=false;
								$("#mcFilterBtn li.mnActive").removeClass('mnActive');
								$("#mcMenuWrapper .mcTabs li").removeClass('current');
								setTimeout(function(){
									$("#mcFilterBtn li[data-value='fixture']").addClass('mnActive');
									$("#mcMenuWrapper .mcTabs li[data-value='fixture']").addClass('current');
								},1000);
								clearInterval(liveInterval);
								if(cloudFirestore)
													firebaseSRef();
								if(urlString != "scorecard" && callFromTemplate =='')
								{
									if(!cloudFirestore){
										liveInterval=setInterval(function(){
											$scope.getLiveScore(cId); // calling live score  refreshing function
										},15000);
									}
									else{
										clearInterval(listencloudFirestoreDB);
										listencloudFirestoreDB = setInterval(function(){
											if(cloudFirestoreDB != ""){
												clearInterval(listencloudFirestoreDB);
												firebaseSRef = cloudFirestoreDB.collection("matchstatus")
											    .onSnapshot(function(doc) {
											        if(firebaseSObjChange){
											        	$scope.getLiveScore(cId);
											        }
															    		
											    });
												}
											},100);
									}
								}
								
							}
							else{
								$("#errMsg").html("No Match Found");
								$(".matchScheduleSmipl").addClass("hide");
							}
							if(viewCateg == 'tourstats')
							{
								$scope.liveTab=false;
								$scope.fixtureTab=false;
								$scope.resultTab=false;
								$("#mcFilterBtn li.mnActive").removeClass('mnActive');
								$("#mcMenuWrapper .mcTabs li").removeClass('current');
								setTimeout(function(){
									$("#mcFilterBtn li.mnActive").removeClass('mnActive');
									$("#mcMenuWrapper .mcTabs li").removeClass('current');
									$("#mcFilterBtn li[data-value='stats']").addClass('mnActive');
									$("#mcMenuWrapper .mcTabs li[data-value='stats']").addClass('current');
								},1000);
							}
							
					}
					}
										
					if(viewCateg == 'tourstats')
					{
						$scope.liveTab=false;
						$scope.fixtureTab=false;
						$scope.resultTab=false;
						$("#mcFilterBtn li.mnActive").removeClass('mnActive');
						$("#mcMenuWrapper .mcTabs li").removeClass('current');
						setTimeout(function(){
							$("#mcFilterBtn li.mnActive").removeClass('mnActive');
							$("#mcMenuWrapper .mcTabs li").removeClass('current');
							$("#mcFilterBtn li[data-value='stats']").addClass('mnActive');
							$("#mcMenuWrapper .mcTabs li[data-value='stats']").addClass('current');
						},1000);
					}
					if (!$scope.$$phase) {
						$scope.$apply();
				  	}
				  	$scope.setFullwidth(pageType);
				  	// init tool tip
				  	setTimeout(function(){
				  		//$('[data-toggle="tooltip"]').tooltip();   
				  		$(".mcBoxFooter .btn-thin").click(function(e){
							e.preventDefault();
							return false;
						});
						var windowwdt = $(window).width();
						$(".nicescroll-rails").remove();
						if(windowwdt > 1024 && detailedTstats)
							$(".nicescroll_content").niceScroll({ cursorcolor: "#999",autohidemode:false, cursorwidth: "3px",cursorborder:"0px",cursorborderradius : "0px", cursorfixedheight: 50, smoothscroll: true });

						findPrevMenuActive($("#mcFilterBtn .mnActive"));
						// var isprevMenuActive = findPrevMenuActive($("#mcFilterBtn .mnActive"));
						// if(isprevMenuActive)
						// 	$(".selectSchedules .scorecardTabNavLeft").addClass("active");
						// else
						// 	$(".selectSchedules .scorecardTabNavLeft").removeClass("active");

						findNextMenuActive($("#mcFilterBtn .mnActive"));
						// var isnextMenuActive = findNextMenuActive($("#mcFilterBtn .mnActive"));
							// if(isnextMenuActive)
							// 	$(".selectSchedules .scorecardTabNavRight").addClass("active");
							// else
							// 	$(".selectSchedules .scorecardTabNavRight").removeClass("active");

				  	},2000);
				  	$(".pageloader").removeClass('active');
				  	$(".pageloader").removeClass("loadingPage");
				});
				if(pageType=="fixtures")
					$scope.showContentBlk(pageType);
			}
			if(pageType=="tourstats"){
				$scope.showstandings=false;
				$scope.showtourstats=false;
				$scope.showplayerstats=false;
				$scope.showteamstats = false;
				$scope.showteamsquads = false;
				$scope.showFixture=false;
				$scope.showscorecard=false;
				$scope.showAllStats = true;
				$scope.tstatsMenu = tstatsMenu;
				$scope.teamstatsMenu = teamstatsMenu;
				$scope.showteamsquads = false;
				if($scope.selectedCompetition.CodingType == 'T20Pro')
				{
					$scope.teamstatsMenu = false;
					$scope.detailedTstats = false;
					$scope.standingsMenu = false;
				}
				if($scope.selectedCompetition.CodingType == 'T20Lite')
				{
					$scope.teamstatsMenu = teamstatsMenu;
					$scope.detailedTstats = detailedTstats;
					$scope.standingsMenu = standingsMenu;
					if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
						$scope.standingsMenu = false;
					else
						$scope.standingsMenu = standingsMenu;
				}
				$("#mcFilterBtn li.mnActive").removeClass('mnActive');
				$("#mcMenuWrapper .mcTabs li").removeClass('current');
				$("#mcFilterBtn li[data-value='stats']").addClass('mnActive');
				$("#mcMenuWrapper .mcTabs li[data-value='stats']").addClass('current');
				
				$scope.playerstatsMenu = playerstatsMenu;
				$(".statsSubMenu li").removeClass("current");
				$(".statsSubMenu li[data-value='tmtStats']").addClass("current");
				

			//	$(".pageloader").addClass('active');
				/******* Initialize the tournament stats scope variables ******/
				$scope.tourBattingKPI = [];
				$scope.tourBattingStatsKPI = [];
				$scope.tourBowlingKPI = [];
				$scope.showtourstats=false;
				if (!$scope.$$phase) {
					$scope.$apply();
				}
				$scope.showContentBlk(pageType);
				// $scope.showtourstats = false;
				// $("#errMsg").html("No Stats Found");
				/******* get tournament stats ******/
				$scope.noTstats = false;
				
				$scope.showstandings=false;
				$scope.showtourstats=false;
				$scope.showplayerstats=false;
				$scope.showteamstats = false;
				$scope.showteamsquads = false;
				$scope.showFixture=false;
				$scope.showscorecard=false;
				$scope.showAllStats = true;
				
				$scope.showtourstats=true;
				
				$scope.displayStatsSeasonName = $scope.curSeasonName;
				
				var pathname = window.location.pathname; 
				pathname = pathname.split("../index.html");
				var pathSplitLen = pathname.length;
				var statsTypeParm = (pathname[pathSplitLen-1] != undefined) ? pathname[pathSplitLen-1] : '';
				console.log(statsTypeParm);
				
				if(statsTypeParm == 'mostRuns')
					$scope.tstatsBattingV2('mruns','MostRuns','','mostRuns','toprunsscorers');
				else if(statsTypeParm == 'mostWkts'){
					$("#htab .recordtab__btn").removeClass("active bg-red");
					$("#htab .recordtab__btn.bowling").addClass("active bg-red");
					$("#battingTAB").hide();
					$("#bowlingTAB").show();
					$(".battingTopper").addClass("inactive");
					$(".bowlingTopper").removeClass("inactive");
					$(".battingT").hide();
					$(".bowlingT").show();
					$("#mvpTAB").hide();
					$(".mvpButton").removeClass("active");
					$("#fairplayTAB").hide();
					$(".fairplayBtn").removeClass("active");
					$scope.tstatsBattingV2('mw','MostWickets','','mostWickets','mostwickets');
				}
				else if(statsTypeParm == 'highestInnScore'){
					$scope.tstatsBattingV2('his','HighestScores','','highestScoresInnings','highestindividualscorers');
				}
				else if(statsTypeParm == 'most50s'){
					$scope.tstatsBattingV2('mff','MostFifties','','mostFifties','mostfifties');
				}
				else if(statsTypeParm == 'most4s'){
					$scope.tstatsBattingV2('mf','MostFours','','mostFours','mostfours');
				}
				else if(statsTypeParm == 'most6s'){
					$scope.tstatsBattingV2('ms','MostSixes','','mostSixes','mostsixes');
				}
				else if(statsTypeParm == 'mostDotBalls'){
					$("#htab .recordtab__btn").removeClass("active bg-red");
					$("#htab .recordtab__btn.bowling").addClass("active bg-red");
					$("#battingTAB").hide();
					$("#bowlingTAB").show();
					$(".battingTopper").addClass("inactive");
					$(".bowlingTopper").removeClass("inactive");
					$(".battingT").hide();
					$(".bowlingT").show();
					$("#mvpTAB").hide();
					$(".mvpButton").removeClass("active");
					$("#fairplayTAB").hide();
					$(".fairplayBtn").removeClass("active");
				
					$scope.tstatsBattingV2('mdb','MostDotBalls','','mostDotBalls','mostdotballsbowledtournament');
				}
				else if(statsTypeParm == 'bestBowlInn'){
					$("#htab .recordtab__btn").removeClass("active bg-red");
					$("#htab .recordtab__btn.bowling").addClass("active bg-red");
					$("#battingTAB").hide();
					$("#bowlingTAB").show();
					$(".battingTopper").addClass("inactive");
					$(".bowlingTopper").removeClass("inactive");
					$(".battingT").hide();
					$(".bowlingT").show();
					$("#mvpTAB").hide();
					$(".mvpButton").removeClass("active");
					$("#fairplayTAB").hide();
					$(".fairplayBtn").removeClass("active");
				
					$scope.tstatsBattingV2('bbf','bestbowlingfigures','','bestbowlingfigures','bestbowlingfigures');
				}
				else if(statsTypeParm == 'fairplay'){
					$scope.showFairPlayList();
				}
				else if(statsTypeParm == 'playerPoints'){
					$scope.showMVPPlayersList();
				}
				else
					$scope.tstatsBatting();
				if(false){
				mcService.GetTourStats(cId,function(data){
					if(data.length == 0)
					{
						if($("#mcMenuWrapper .mcTabs li[data-value='stats']").hasClass("current"))
							$scope.noTstats = true;
						$scope.showtourstats = false;
						$("#errMsg").html("No Stats Found");
						$(".pageloader").removeClass('active');
						if (!$scope.$$phase) {
							$scope.$apply();
						}
						return;
					}

					/******* get  batting tournament stats ******/
					$scope.tourBattingKPI=data.TournamentBattingKPI[0];
					$scope.tourBattingStatsKPI=data.TournamentBattingStats[0];
					/******* get  bowling tournament stats ******/
					$scope.tourBowlingKPI=data.TournamentBowlingKPI[0];
					if($scope.tourBattingKPI.Status == 'Error'){
						$scope.showtourstats = false;
						if($("#mcMenuWrapper .mcTabs li[data-value='stats']").hasClass("current") || $scope.callFromTemplate == "tourstats")
							$scope.noTstats = true;
						$("#errMsg").html("No Stats Found");
						$(".pageloader").removeClass('active');
						if (!$scope.$$phase) {
							$scope.$apply();
						}
						return;
					}
					else{
						$scope.noTstats = false;
						if($("#mcMenuWrapper .mcTabs li[data-value='stats']").hasClass("current") || $scope.callFromTemplate == "tourstats")
							$scope.showtourstats = true;
						$("#errMsg").html("");
						if (!$scope.$$phase) {
							$scope.$apply();
						}
					}
					/******* get initial stat details ******/
					if(detailedTstats){
						$(".nicescroll-rails").remove();
						mcService.GetTourBattingStats(competitionId,"toprunsscorers",function(data){
							tourBattingStats=data["toprunsscorers"];
							if(tourBattingStats == undefined) return;
							if($(window).width() > 1024)
							{
								battingStatsHeadTitle=['pos','player','Team','M','R','I','NO','HS','AVG','BF','SR','100','50','4s','6s'];
								battingStatskeyVal=['pos','StrikerName','TeamName','Matches','TotalRuns','Innings','NotOuts','HighestScore','BattingAverage','Balls','StrikeRate','Centuries','FiftyPlusRuns','Fours','Sixes'];		
							}
							else
							{
								battingStatsHeadTitle=['pos','player','M','R'];
								battingStatskeyVal=['pos','StrikerName','Matches','TotalRuns'];			
							}
							
							for(var i=0; i<tourBattingStats.length; i++){
								tourBattingData[i]=[];
								for(var j=0; j<battingStatskeyVal.length; j++){
									tourBattingData[i][j] = [];
									if(j ==0)
										tourBattingData[i][j]['kpi']= i+1;
									else
										tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
								}
							}
							$scope.tbSecTitleBat="MOST RUNS";
							$scope.battingStatsHeadTitle=battingStatsHeadTitle;
							$scope.tourBattingStats=tourBattingStats;
							$scope.tourBattingData=tourBattingData;
						  	$(".battingList li").removeClass('menuActive');
						  	$(".battingList li#mostruns").addClass('menuActive');
						  	if (!$scope.$$phase) {
								$scope.$apply();
						  	}						  	
						  	setTimeout(function(){
         						$(".nicescroll_content").niceScroll({ cursorcolor: "#999",autohidemode:false, cursorwidth: "3px",cursorborder:"0px",cursorborderradius : "0px", cursorfixedheight: 50, smoothscroll: true });
         					},200);
						});
						mcService.GetTourBowlingStats(competitionId,"mostwickets",function(data){
							tourBowlingStats=data["mostwickets"];
							if(tourBowlingStats == undefined) return;
							if($(window).width() > 1024)
							{
								bowlingStatsHeadTitle=['pos','player','Team','M','WKTS','I','O','R','BBI','AVG','ECON','SR','4W','5W'];
								bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','Wickets','Innings','OversBowled','TotalRunsConceded','BBIW','BowlingAverage','EconomyRate','StrikeRate','FourWickets','FiveWickets'];
							}
							else
							{
								bowlingStatsHeadTitle=['pos','player','M','WKTS'];
								bowlingStatskeyVal=['pos','BowlerName','Matches','Wickets'];
							}
							
							
							for(var i=0; i<tourBowlingStats.length; i++){
								tourBowlingData[i]=[];
								for(var j=0; j<bowlingStatskeyVal.length; j++){
									tourBowlingData[i][j] = [];
									if(j ==0)
										tourBowlingData[i][j]['kpi']= i+1;
									else
										tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
								}
							}
							$scope.tbSecTitleBow="MOST WICKETS";
							$scope.bowlingStatsHeadTitle=bowlingStatsHeadTitle;
							$scope.tourBowlingStats=tourBowlingStats;
							$scope.tourBowlingData=tourBowlingData;
						  	$(".bowlingList li").removeClass('menuActive');
						  	$(".bowlingList li#mostWK").addClass('menuActive');
						  	if(!$scope.$$phase){
								$scope.$apply();
						  	}
						  	setTimeout(function(){
         						$(".nicescroll_content").niceScroll({ cursorcolor: "#999",autohidemode:false, cursorwidth: "3px",cursorborder:"0px",cursorborderradius : "0px", cursorfixedheight: 50, smoothscroll: true });
         					},200);
						});
					}
					
					$scope.loadkeyDatas("keyperformers");

					$("#TournamentStatsSMIPL .mcTabs .mcTabLink").removeClass("current");
					$("#TournamentStatsSMIPL .mcTabContent").removeClass("current");
					$("#TournamentStatsSMIPL .mcTabs .mcTabLink[data-tab='mcBattingStats']").addClass("current");
					$("#TournamentStatsSMIPL #mcBattingStats.mcTabContent").addClass("current");
				});
				}
				$("#TournamentStatsSMIPL .mcTabs .mcTabLink").removeClass("current");
					$("#TournamentStatsSMIPL .mcTabContent").removeClass("current");
					$("#TournamentStatsSMIPL .mcTabs .mcTabLink[data-tab='mcBattingStats']").addClass("current");
					$("#TournamentStatsSMIPL #mcBattingStats.mcTabContent").addClass("current");
				
			}	
			if(pageType=="teamstats"){
				$scope.searchPlayerName = {};
				$(".pStatsWrap").removeClass("inactive");
				$scope.showContentBlk(pageType);
				$scope.showplayerstats=false;
				/******* Initialize the player stats scope variables******/
				$scope.teamList = [];
				$scope.strikerInn1Data=[];
				$scope.strikerInn2Data=[];
				$scope.bowlerInn1Data=[];
				$scope.bowlerInn2Data=[];
				$scope.playersData = [];
				
				/******* get team List******/

				mcService.GetTeamList(cId,function(data){
					if(data.length == 0 || data.Teamlist.length == 0)
					{
						$scope.noTeamstats = true;
						$scope.showplayerstats=false;
						$("#errMsg").html("No Stats Found");
						if (!$scope.$$phase) {
							$scope.$apply();
					  	}
					  	if(widgetViewType == "teamstats" || widgetViewType == "teamDetailStats" || widgetViewType == "playerstats" ){
					  		$(".pageloader").removeClass('active');
					  	}
						return;
					}
					
				//	$(".pageloader").addClass('active');
					var teamList=[];
					var teamId='';
					teamList=data.Teamlist;
					if(filterteam != undefined && filterteam != ''){
						if(teamList != undefined && teamList.length > 0){
							var filteredTeamList = [];
							teamList.map(function(item){
								if(item.TeamID == filterteam)
									filteredTeamList.push(item);
							});
							teamList = filteredTeamList;
							teamId=teamList[0].TeamID;
							$scope.selectedTeam=teamList[0];
						}
					}
					
					$scope.teamList=teamList;
					if(initLoad=="init" || initLoad=="tabchange"){
						var lasmatchresult = $filter("filter")(matchscheduleData,{MatchStatus:"Post"},true);
						var lasmatchresultFil = [];
						if(lasmatchresult != undefined && lasmatchresult.length > 0)
						{
							lasmatchresult.map(function(item){
								if(item.FirstBattingSummary != undefined && item.FirstBattingSummary !='')
									lasmatchresultFil.push(item);
							});
							lasmatchresult = lasmatchresultFil;
						}
						if(lasmatchresult.length > 0 && (statsCID == undefined || statsCID == '') && teamId != ''){
							teamId = lasmatchresult[0]['FirstBattingTeamID'];
							for(var i=0;i<teamList.length;i++)
							{
								if(teamList[i].TeamID == teamId)
								{
									$scope.selectedTeam = teamList[i];
								}
							}
							// $scope.selectedTeam=$filter("filter")(teamList,{TeamID:teamId},true)[0];
						}
						else{
							teamId=teamList[0].TeamID;
							$scope.selectedTeam=teamList[0];
						}
						var playerProfType="init";
					}
					else{
						teamId=$(".mcTopPlayersList a.selItemActive").attr("data-tid");
						var playerProfType="topplayer";
					}
					if(fStats_teamId != undefined && fStats_teamId != ''){
						if(teamList != undefined && teamList.length > 0){
							var filteredTeamList = [];
							teamList.map(function(item){
								if(item.TeamID == fStats_teamId)
									filteredTeamList.push(item);
							});
							teamId=filteredTeamList[0].TeamID;
							$scope.selectedTeam=filteredTeamList[0];
						}
					}
					$(".mcSelectDefault.mcSearchTeam").attr("data-teamId",teamId);
					$scope.getPlayerList(cId,teamId,playerProfType);
					if (!$scope.$$phase) {
						$scope.$apply();
				  	}
				  
				});
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
			}
			if(pageType=="standings"){
				$scope.loadkeyDatas("standings");
				$scope.showContentBlk(pageType);
			}
			if(pageType=="teamDetailStats"){
				$scope.getoverallStats();
				$scope.showContentBlk(pageType);
			}
			if(pageType=='scorecard'){
				var comList = [];
				for(var i=0;i<competitionList.length;i++)
				{
					if(competitionList[i].CompetitionID == comId)
						comList.push(competitionList[i]);
				}



				// var comList=$filter('filter')(competitionList,{CompetitionID:comId},true);
				// divisonId=comList[0].DivisionID;
				// selectedComList=$filter('filter')(competitionList,{DivisionID:divisonId,SeasonID:seasonId},true);
				// $scope.selectedComList=selectedComList;
				// $scope.selectedCompetition=comList[0];

				// var divList=$filter('filter')(divisionList,{DivisionID:divisonId,SeasonID:seasonId},true);
				// seasonId=divList[0].SeasonID;
				// divisionList=$filter('filter')(tourDetails.division,{SeasonID:seasonId},true);
				// $scope.divisionList=divisionList;
				// $scope.selectedDivision = (divisionList[0] != undefined) ? divisionList[0] : [];
				var mend = getParameterByName('mend');
				var styp = "result";
				if(mend == 0)
					styp = "live";

				var livestreamView = getParameterByName('livestream');
				var pageloadtypeDirectview = '';
				if(livestreamView == 1)
					pageloadtypeDirectview = "livestream";

				if($scope.selectedCompetition.statsFeed != undefined && $scope.selectedCompetition.statsFeed != '')
						statsFeed = $scope.selectedCompetition.statsFeed;
				if($scope.selectedCompetition.statsCoding != undefined && $scope.selectedCompetition.statsCoding != '')
						statsCoding = $scope.selectedCompetition.statsCoding;
				if($scope.selectedCompetition.statsCID != undefined && $scope.selectedCompetition.statsCID != '')
					statsCID = $scope.selectedCompetition.statsCID;
				if($scope.selectedCompetition.AnalyticsFeed != undefined && $scope.selectedCompetition.AnalyticsFeed != '')
						AnalyticsFeed = $scope.selectedCompetition.AnalyticsFeed;

				if($scope.selectedCompetition.CodingType == 'T20Pro')
				{
					if($scope.selectedCompetition.feedsource != undefined)
						feedSource = $scope.selectedCompetition.feedsource;
					t20lite = false;
					$scope.teamstatsMenu = false;
					$scope.squadsmenu = squadsmenu;
					$scope.standingsMenu = false;
					$scope.analytics_menu = analytics_menu;
											
				}
				else if($scope.selectedCompetition.CodingType == 'T20Lite'){
					if($scope.selectedCompetition.feedsource != undefined)
						feedSource = $scope.selectedCompetition.feedsource;
					t20lite = true;
					$scope.squadsmenu =false;
					$scope.teamstatsMenu = teamstatsMenu;
					$scope.analytics_menu = analytics_menu;
					
					$scope.standingsMenu = standingsMenu;
					if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
						$scope.standingsMenu = false;
					else
						$scope.standingsMenu = standingsMenu;
					$(".winlossPercentMeter").addClass("inactive");
				}

				var scorecardType = $(".smscorecardwidget").attr("widgettype");				
				if(scorecardType == 'international'){
					var cMatchId = matId;
					//if(matId == 402)
						// cMatchId = 546;
					
					
						
				}
			
				var listenMatchSchdata = setInterval(function(){
					if(callMatchSchData){
						clearInterval(listenMatchSchdata);
						var isUpcoming = false;
						var fixObj = [];
						
						if(matchscheduleData != undefined && matchscheduleData.length > 0)
						{
							for(var i=0;i<matchscheduleData.length;i++){
								
								if(matchscheduleData[i].MatchID == matId && matchscheduleData[i].MatchStatus == 'UpComing'){
									isUpcoming = true;
									fixObj = matchscheduleData[i];
									 break;
								}
							}
							
						}
						
						if(isUpcoming){
							
							$scope.fixtureDetailPage(fixObj,matId);
						}
						else{
							
							$("#vote-btn-team1").hide();
							$("#vote-btn-team2").hide();
							$(".widget.playingXI.hideMobOnly").removeClass("showForSpecialCase");
							$(".widget.matchDetails.hideMobOnly").removeClass("showForSpecialCase");
							$scope.constructScoreCard(matId,'',pageloadtypeDirectview,styp);
						}
					}
				},100);
				
				
				
				
				$(".seasonList li").removeClass("active");
				$(".seasonList li[data-id='"+seasonId+"']").addClass("active");
				$(".mcYearArch li").removeClass('active');
	  			$(".mcYearArch li[data-value='"+divisonId+"']").addClass('active');
	  			if(divisionList != undefined && divisionList.length > 0){
	  				$scope.selectedDivision = $filter("filter")(divisionList,{DivisionID:divisonId},true)[0];
	  			}
	  			if (!$scope.$$phase) {
					$scope.$apply();
			  	}
			}
			if(pageType=="teamsquads"){
				//$scope.getTeamSquads();
				$scope.showCompetitionSquads();	
				$scope.showContentBlk(pageType);
			}
			if(mobApp != 1)
				$scope.getSidebarWidget(pageType);
			
	}

	function findPrevMenuActive(obj,typer)
	{
		if($(obj).prev().length > 0)
		{
			var obj = $(obj).prev();
			if($(obj).hasClass("ng-hide"))
				findPrevMenuActive(obj,typer);
			else
			{
				if(typer == "click")
				{	
					$("#mcFilterBtn li").removeClass("mnActive");
					$(obj).addClass("mnActive");
					$("#mcFilterBtn li.mnActive").trigger("click");
					findPrevMenuActive(obj);
				}
				else
					$(".scorecardTabNavLeft").addClass("active");

			}
				
		}
		else
		{
			if(typer == "click" && !$(obj).hasClass("ng-hide"))
				{	
					$("#mcFilterBtn li").removeClass("mnActive");
					$(obj).addClass("mnActive");
					$("#mcFilterBtn li.mnActive").trigger("click");
				}
			$(".scorecardTabNavLeft").removeClass("active");
		}
			
	}
	function findNextMenuActive(obj,typer)
	{
		if($(obj).next().length > 0)
		{
			var obj = $(obj).next();
			if($(obj).hasClass("ng-hide"))
			{
				findNextMenuActive(obj,typer);
			}
			else
			{
				if(typer == "click")
				{
					$("#mcFilterBtn li").removeClass("mnActive");
					$(obj).addClass("mnActive");
					$("#mcFilterBtn li.mnActive").trigger("click");
					findNextMenuActive(obj);
				}
				else
				{
					$(".selectSchedules .scorecardTabNavRight").addClass("active");
				}
				
			}
				
		}
		else
		{
			if(typer == "click" && !$(obj).hasClass("ng-hide"))
				{
					$("#mcFilterBtn li").removeClass("mnActive");
					$(obj).addClass("mnActive");
					$("#mcFilterBtn li.mnActive").trigger("click");
				}
				
			$(".selectSchedules .scorecardTabNavRight").removeClass("active");
		}
			
	}
	var photosTabViewed = false;
	$scope.getPhotosList = function(cMatchId){
		if(!photosTabViewed){
			mcService.getPhotosList(cMatchId,function(data){
				data = (data.data != undefined) ? data.data : [];
				
				$scope.matchPhotosList = data;
				
				$scope.showPhotostreamPage = true;
				
				setTimeout(function(){
				/*	$(".ap-photo-slider").length > 0 && $(".ap-photo-slider").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !0, dots: !1, speed: 1e3, asNavFor: ".ap-photo-cnt-slider" }),
					$(".ap-photo-cnt-slider").length > 0 && $(".ap-photo-cnt-slider").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !0, dots: !1, speed: 1e3, asNavFor: ".ap-photo-slider" }),*/
						$(".ap-phto-click").length > 0 &&
						$(".ap-phto-click").magnificPopup({
							type: "inline",
							preloader: !1,
							focus: "#name",
							closeOnBgClick: !1,
							callbacks: {
								beforeOpen: function () {
									$(".ap-photo-slider").slick("unslick"), $(".ap-photo-cnt-slider").slick("unslick");
								},
							},
						});
						
						$('.ap-photo-inner-wrp').on('click', function() {
							var current = $(this).attr('data-id');
							console.log($('.ap-photo-slider').length);
							$('.ap-photo-slider').slick('unslick');
							$('.ap-photo-cnt-slider').slick('unslick');

							$('.ap-photo-slider').slick({
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: true,
								dots: false,
								speed: 1000,
								asNavFor: '.ap-photo-cnt-slider',
							});

							$('.ap-photo-cnt-slider').slick({
								slidesToShow: 1,
								slidesToScroll: 1,
								arrows: false,
								dots: false,
								speed: 1000,
								asNavFor: '.ap-photo-slider',
							});

							$('.ap-photo-slider').slick('slickGoTo', parseInt(current));
							$('.ap-photo-cnt-slider').slick('slickGoTo', parseInt(current));
						});
						copyEvents();
				},2000);
				photosTabViewed = true;
				
				if (!$scope.$$phase) {
					$scope.$apply();
				}
			});	
		}
		
	}

	$scope.photoView = function(){
		$("#myHeader").removeClass("sticky");
	}
	
	$scope.getVideosList = function(cMatchId){
		$scope.matchVideosList = [];
		$scope.matchWkVideosList = [];
		$scope.matchHLVideosList = [];
		$scope.matchFVideosList = [];
		$scope.matchSixVideosList = [];
		matchVideosList = [];
		//cMatchId = 426;
		mcService.GetMediaList(cMatchId,'',function(data){
			data = (data.data != undefined) ? data.data : [];
			$scope.noMatchVideos = (data.length> 0) ? false: true;
			
			var videotagsFound = false;
			for(var i=0;i<data.length;i++){
					var wkVideoFound = false;
					var hlVideoFound = false;
					var fVideoFound = false;
					var sixVideoFound = false;
					for(j=0;j<data[i].tags.length;j++){
						if(data[i].tags[j].label == 'wicket'){
							videotagsFound = true;
							wkVideoFound = true;
						}
						if(data[i].tags[j].label == 'highlights'){
							videotagsFound = true;
							hlVideoFound = true;
						}
						if(data[i].tags[j].label == 'feature'){
							videotagsFound = true;
							fVideoFound = true;
						}
						if(data[i].tags[j].label == 'six'){
							videotagsFound = true;
							sixVideoFound = true;
						}
					}
					
					if(videotagsFound)
					{
						var date = data[i].date;
						date = date.split('T');
						date = (date[0] != undefined) ? date[0] : '';
						date = date.split("-");
						var y = date[0];
						var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
						var m = date[1];
						m = monthAr[m-1];
						d = date[2];
						data[i].DisplayDate = d+' '+m+' '+y;
						var duration = (data[i].duration != undefined) ? data[i].duration : 0;
						if(duration > 0){	
							if(duration > 60){
								var mins = duration / 60;
								mins = parseInt(mins);
								var secs = duration % 60;
							}
							else{
								var mins = 0;
								var secs = duration;
							}
							
							data[i].DisplayDuration = mins+":"+secs;
						}
						else
							data[i].DisplayDuration = '';
						
						var views = data[i].views;
						if(views != undefined && views != '')
							data[i].views = formatNumber(views);
						matchVideosList.push(data[i]);
						
					}
					
					if(wkVideoFound)
						$scope.matchWkVideosList.push(data[i]);
					if(hlVideoFound)
						$scope.matchHLVideosList.push(data[i]);
					if(fVideoFound)
						$scope.matchFVideosList.push(data[i]);
					if(sixVideoFound)
						$scope.matchSixVideosList.push(data[i]);
				}
				$scope.matchVideosList = matchVideosList;

				setTimeout(function(){
					$('.copyUrl1').on('click', function(){
						// $(".ctc .c").text("Copied!");
						var shareurl = $(this).attr('data-shareurl');
						var dummy = $('<input id="myInput">').val(shareurl).appendTo('body').select();
						dummy.focus();
						document.execCommand('copy');
						
						$(this).find(".c").text("Copied !");
						var obj = $(this);
						// var copyText = document.getElementById("myInput");
						// console.log(copyText.value);
						// // Select the text field
						// copyText.select();
						// copyText.setSelectionRange(0, 99999); // For mobile devices
			
						// // Copy the text inside the text field
						// navigator.clipboard.writeText(copyText.value);
						$("#myInput").remove();
						setTimeout(function(){
							$(obj).find(".c").text("Copy");
						},5000);
						
					});
				},2000);
				
				$scope.showVideoPage = true;
				if (!$scope.$$phase) {
					$scope.$apply();
				}
				
		});
	}
	
	$scope.getStandings = function(){
		$scope.standings=[];
		console.log($scope.standings);
		if (!$scope.$$phase) {
			$scope.$apply();
		}
		mcService.GetStandings(competitionId,function(data){
			var dataPoints = (data.points != undefined) ? data.points : [];
			dataPoints.map(function(item){
				$scope.standingFlag = (item.StandingFlag != undefined && item.StandingFlag != null) ? item.StandingFlag : '';
			});
			
		
			var grpCatg = (data.category != undefined) ? data.category : [];
			var points = (data.points != undefined) ? data.points : [];


			var standings = [];
			if(grpCatg != undefined && grpCatg.length > 0 && false)
			{
				for(var i=0;i<grpCatg.length;i++)
				{
					standings[i] = $filter('filter')(points, { Category: grpCatg[i].Category },true);
				}
			}
			else
				standings[0] = points;

			$scope.standings=standings;
			$scope.pointsTableData = points;
			/****************Standings Table*********/
			$scope.standingSmallWidgetHeadTitle=['TEAM','PLD','NET RR','PTS','FORM'];
			$scope.standingSmallWidgetkeyVal=['TeamCode','Matches','NetRunRate','Points','Performance'];		
			$("#ptdCID_"+competitionId).prop("checked","checked");

			if (!$scope.$$phase) {
				$scope.$apply();
			}
		});
	}

	$scope.standingsCatgChange = function(genderTypeParm,pwidType){
		
			if(genderTypeParm == 'women'){
				$(".vn-menWoTab2 .men_rs").removeClass("active");
				$(".vn-menWoTab2 .women_rs").addClass("active");
				$scope.womensmatches = true;
				$scope.playerGroup = 'WOMEN';
				competitionFeedPath = competitionFeedPath.replace("competition.html", "womenscompetition.html");
			}
			else{
				$scope.womensmatches = false;
				$scope.playerGroup = 'MEN';
				competitionFeedPath = competitionFeedPath.replace("womenscompetition.html", "competition.html");
			}

			mcService.GetTournamentList(function(data){
				tourDetails=data;
				divisionList=data.division;
				if(divisionList != undefined && divisionList.length > 0)
				{
					divisionList.map(function(item){
						if(item.DivisionID != undefined && item.DivisionID != '')
							item.DivisionID = parseInt(item.DivisionID);
						if(item.SeasonID != undefined && item.SeasonID != '')
							item.SeasonID = parseInt(item.SeasonID);


					});
				}
				var seasonArr=[];
				seasonList = [];
				var j=0;
				for(var i=0; i<divisionList.length; i++){
					if($.inArray(divisionList[i].SeasonID, seasonArr)==-1){
						seasonList[j]=[];
						seasonList[j]['SeasonID']=divisionList[i].SeasonID;
						seasonList[j]['seasonName']=divisionList[i].SeasonName;
						seasonArr[j]=divisionList[i].SeasonID;
						j++;
					}
				}
				//seasonList = seasonList.reverse();
				$scope.seasonList=seasonList;
				seasonId = seasonList[0].SeasonID;

				
				competitionList=data.competition;
				competitionList[0].selected  =true;

				if(competitionList != undefined && competitionList.length > 0)
				{
					competitionList.map(function(item){
						var seasonObj = $filter("filter")(data.division,{SeasonID:item.SeasonID},true);
						item.SeasonName = (seasonObj != undefined && seasonObj.length > 0) ? seasonObj[0].SeasonName : '';
						if(item.DivisionID != undefined && item.DivisionID != '')
							item.DivisionID = parseInt(item.DivisionID);
						if(item.SeasonID != undefined && item.SeasonID != '')
							item.SeasonID = parseInt(item.SeasonID);
					});
				}
				
				$scope.competitionList = competitionList;
				$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId},true);

				$scope.curSeasonId=seasonId;
				$scope.curSeasonName = '';
				if(seasonList != undefined && seasonList.length > 0)
				{
					seasonList.map(function(item){
						if(item.SeasonID == seasonId){
							$scope.curSeasonName = item.seasonName;
							curSeasonName = $scope.curSeasonName;
						}
					});
				}
				

				if(pwidType == 'standings')
				{
					$scope.standingsSeasonChange(competitionList[0].CompetitionID,competitionList[0]);
				}
			});

	}
	
	$scope.standingsSeasonChange = function(pFCId,obj){
		$(".cSBList").removeClass("active");
		for(var i=0;i<$scope.seasonList.length;i++){
			if($scope.seasonList[i].SeasonID == obj.SeasonID)
				seasonObj = $scope.seasonList[i];
		}
		
		var pathname = window.location.pathname; 
		pathname = pathname.split("../index.html");
		var pathSplitLen = pathname.length;
		var genderTypeParm = (pathname[pathSplitLen-2] != undefined ) ? pathname[pathSplitLen-2] : '';
		if(genderTypeParm == 'women'){
			var url = $scope.clientbasePath+"points-table/women/"+seasonObj.seasonName;
		}
		else{
			var url = $scope.clientbasePath+"points-table/men/"+seasonObj.seasonName;
		}
		
		if(seasonObj != undefined && seasonObj.seasonName != undefined){
			$scope.curSeasonName = seasonObj.seasonName;
			if($scope.playerGroup != 'WOMEN')
			window.location.assign(url);
		}
		$scope.standings=[];
		if (!$scope.$$phase) {
			$scope.$apply();
		}
		statsCID = pFCId;
		if(obj.statsFeed != undefined && obj.statsFeed != '')
			statsFeed = obj.statsFeed;
		$(".standings-filter").hide();
		mcService.GetStandings(pFCId,function(data){
			var dataPoints = (data.points != undefined) ? data.points : [];
			dataPoints.map(function(item){
				$scope.standingFlag = (item.StandingFlag != undefined && item.StandingFlag != null) ? item.StandingFlag : '';
			});
			
		
			var grpCatg = (data.category != undefined) ? data.category : [];
			var points = (data.points != undefined) ? data.points : [];


			var standings = [];
			if(grpCatg != undefined && grpCatg.length > 0)
			{
				for(var i=0;i<grpCatg.length;i++)
				{
					standings[i] = $filter('filter')(points, { Category: grpCatg[i].Category },true);
				}
			}
			else
				standings[0] = points;

			$scope.pointsTableData = points;
			setTimeout(function(){
				$scope.competitionList.map(function(item){
				if(pFCId == item.CompetitionID){
						item.selected = true;
					}
					else
						item.selected = false;
						
				});
				
				$(".ptdCFList").removeClass("active");
				$("#ptdCID_"+pFCId).prop("checked","checked");
				$("#ptdCID_"+pFCId).addClass("active");
			},2000);
			
			
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		});
	}
	
	$scope.bindRecentPerformance = function(val){
		var html = "";
		
		if(val != undefined && val !=''){
			var findsep = val.indexOf(",");
			if(findsep >= 0){				
				val = val.split(",");
				val = val.reverse();
				val.map(function(item){
					var ptsColor = '';
					if(item == 'W')
						ptsColor = 'g';
					if(item == 'L')
						ptsColor = 'r';
					html+= "<span class='rf "+item+" ih-pt-"+ptsColor+"'>"+item+"</span>";
				});
			}
			else{
				val = val.split("");
				var indx=0;
				val.map(function(item){
					if(indx < 5){
						var ptsColor = '';
							if(item == 'W')
								ptsColor = 'g';
							if(item == 'L')
								ptsColor = 'r';
							html+= "<span class='rf "+item+" ih-pt-"+ptsColor+"'>"+item+"</span>";
					}
					indx++;
				});
			}
			
		}
		return html;
			
		
	}
	$scope.showStandingsFilter = function(){
		$(".standings-filter").show();
		setTimeout(function(){
			$(".active.ptdCFList").prop("checked","checked");
		},100);
		
	}
	$scope.closeStandingsFilter = function(){
		$(".standings-filter").hide();
	}
	
	
	$scope.fixtureDetailPage = function(currentFixture){
		$scope.matchId=currentFixture.MatchID;
		$scope.squad=true;
		$scope.fixtureView = true;
		fixturePageChange('fromFixturePage');
		$scope.showFixture=false;
		$scope.showscorecard=true;
		$scope.goBackToFixture = false;
		/*if(activeNav != undefined && activeNav != '' && activeNav == 'fromUpcoming'){
			$('.matchNav').trigger('click');
		}*/
		$("#scorecardTabs").addClass("inactive");
		$("#scorecardTabs li").removeClass("current");
    	$("#scorecardTabs li[data-tab='fullScoreContent']").addClass("current");
    	$("#scorecardWrapper .mcTabContent").removeClass("current");
    	$("#scorecardWrapper #fullScoreContent.mcTabContent").addClass("current");
    	$("#leftPanel,#cmdBlockSmipl").addClass("inactive");
		$("#rightPanel,.commentarySidePanel").addClass("l12");
		$(".widget.playingXI.hideMobOnly").addClass("showForSpecialCase");
		$(".widget.matchDetails.hideMobOnly").addClass("showForSpecialCase");
		$(".ap-ball-summary-wrp").addClass("hideElement");
		$(".mcBriefScoreBox").show();
		$("#commentary .commentaryTitleWrap").addClass("inactive");
		
		$(".stadingsSideWidget").addClass("inactive");
		$("#commentary").hide();
		$("#matchInfo").show();
		$("#expertanalysis").hide();
		$(".submenu.matchInfo").addClass("active");		
		$("#commentary .commentarySidePanel").addClass("inactive");
		$(".fixtureViewTabs .submenu").removeClass("active");
		$(".fixtureViewTabs .submenu.matchInfo").addClass("active");
		$(".loader-main").hide();
			
			if(currentFixture != undefined){
				$scope.matchSummary = currentFixture;
				$scope.matchSummary.FirstBattingTeam = (currentFixture['FirstBattingTeamName'] != undefined) ? currentFixture['FirstBattingTeamName'] : "";
				$scope.matchSummary.SecondBattingTeam = (currentFixture['SecondBattingTeamName'] != undefined) ? currentFixture['SecondBattingTeamName'] : "";
				$scope.matchSummary.HomeTeamCode = (currentFixture['FirstBattingTeamCode'] != undefined) ? currentFixture['FirstBattingTeamCode'] : "";
				$scope.matchSummary.AwayTeamCode = (currentFixture['SecondBattingTeamCode'] != undefined) ? currentFixture['SecondBattingTeamCode'] : "";
				$scope.matchSummary.FirstBattingTeamLogo = (currentFixture['HomeTeamLogo'] != undefined) ? currentFixture['HomeTeamLogo'] : "";
				$scope.matchSummary.SecondBattingTeamLogo = (currentFixture['AwayTeamLogo'] != undefined) ? currentFixture['AwayTeamLogo'] : "";
				$scope.matchSummary.Umpire1Name = (currentFixture['GroundUmpire1'] != undefined) ? currentFixture['GroundUmpire1'] : "";
				$scope.matchSummary.Umpire2Name = (currentFixture['GroundUmpire2'] != undefined) ? currentFixture['GroundUmpire2'] : "";
				$scope.matchSummary.Umpire3Name = (currentFixture['ThirdUmpire'] != undefined) ? currentFixture['ThirdUmpire'] : "";
				var Umpire1Name = ($scope.matchSummary.Umpire1Name != undefined) ? titleCase($scope.matchSummary.Umpire1Name) : "";
				$scope.matchSummary.Umpire1Name = Umpire1Name;
				var Umpire2Name = ($scope.matchSummary.Umpire2Name != undefined) ? titleCase($scope.matchSummary.Umpire2Name) : "";
				$scope.matchSummary.Umpire2Name = Umpire2Name;
				var Umpire3Name = ($scope.matchSummary.Umpire3Name != undefined) ? titleCase($scope.matchSummary.Umpire3Name) : "";
				$scope.matchSummary.Umpire3Name = Umpire3Name;
				var Referee = ($scope.matchSummary.Referee != undefined) ? titleCase($scope.matchSummary.Referee) : "";
				$scope.matchSummary.Referee = Referee;
				$scope.matchSummary.MatchDateTime = (currentFixture['MATCH_COMMENCE_START_DATE'] != undefined) ? currentFixture['MATCH_COMMENCE_START_DATE'] : "";
				
				

				if(currentFixture.CompetitionID == 22){
					$scope.matchSummary.FirstBattingTeamLogo = "../../scores.bcci.tv/matchcentre/images/default-team-logo.png";
					$scope.matchSummary.SecondBattingTeamLogo = "../../scores.bcci.tv/matchcentre/images/default-team-logo.png";
					if(currentFixture.FirstBattingTeamID == 24)
						$scope.matchSummary.FirstBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/india.png";
					if(currentFixture.SecondBattingTeamID == 24)
						$scope.matchSummary.SecondBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/india.png";
					if(currentFixture.FirstBattingTeamID == 28)
						$scope.matchSummary.FirstBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/pakistan.png";
					if(currentFixture.SecondBattingTeamID == 28)
						$scope.matchSummary.SecondBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/pakistan.png";
					if(currentFixture.FirstBattingTeamID == 26)
						$scope.matchSummary.FirstBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/afg.png";
					if(currentFixture.SecondBattingTeamID == 26)
						$scope.matchSummary.SecondBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/afg.png";
					if(currentFixture.FirstBattingTeamID == 25)
						$scope.matchSummary.FirstBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/ban.png";
					if(currentFixture.SecondBattingTeamID == 25)
						$scope.matchSummary.SecondBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/ban.png";
					if(currentFixture.FirstBattingTeamID == 27)
						$scope.matchSummary.FirstBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/srilanka.png";
					if(currentFixture.SecondBattingTeamID == 27)
						$scope.matchSummary.SecondBattingTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/srilanka.png";
					
				}
				
					$scope.matchSummary['HomeTeamLogo']= $scope.matchSummary['HomeTeamLogo'].replace("http://feeds-100mb-test.s3-ap-southeast-1.amazonaws.com/teamLogos/teamLogos_2020/", "teamlogos/index.html");
				$scope.matchSummary['AwayTeamLogo']= $scope.matchSummary['AwayTeamLogo'].replace("http://feeds-100mb-test.s3-ap-southeast-1.amazonaws.com/teamLogos/teamLogos_2020/", "teamlogos/index.html");
				
				if(currentFixture.CompetitionID == 62){
					if($scope.matchSummary['HomeTeamLogo'] == '')
						$scope.matchSummary['HomeTeamLogo'] = "../../ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/images/womens-ipl-logo.png";
					if($scope.matchSummary['AwayTeamLogo'] == '')
						$scope.matchSummary['AwayTeamLogo'] = "../../ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/images/womens-ipl-logo.png";
				}
				
				var item = currentFixture;

				if(item.MatchDateNew == undefined)
					item.MatchDateNew = item.MatchDate;
				
				var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
				var d =  new Date(matchDateTime).getTime() / 1000;
				
				
				if(item.FixtureID == undefined)
					item.FixtureID = item.MatchID;
				
				item.zoneTime = new Date().getTime() / 1000;
					
				
				var zoneAbrv = getTimeZoneAbbrv(matchDateTime);
									
									
				var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
				var gmtDate = item.GMTMatchDate;
				if(gmtDate != undefined && gmtDate != null && gmtDate != ''){
					gmtDate = gmtDate.split("-");
					var GMTMatchTime = item.GMTMatchTime;
					GMTMatchTime = GMTMatchTime.split(" ");
					GMTMatchTime = GMTMatchTime[0];
					var gmtMonth = gmtDate[1];
					gmtMonth = parseInt(gmtMonth) - 1;
					gmtDate = gmtDate[2]+' '+monthAr[gmtMonth]+' '+gmtDate[0];;
					var d =  new Date(gmtDate+" "+GMTMatchTime).getTime() / 1000;
				}
				else
					var d =  new Date(matchDateTime).getTime() / 1000;
				
				
				var currentZoneMatchTime = d;
				var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
				var d = new Date(matchDateTime).getTime() / 1000;
				var diff = currentZoneMatchTime - d;
				var tmLoc = new Date(matchDateTime);
					//The offset is in minutes -- convert it to ms
					var localOffset = tmLoc.getTimezoneOffset() * 60;
				tmLoc =  tmLoc.getTime() ;//+ tmLoc.getTimezoneOffset() * 60000;
				var d1 = tmLoc / 1000;
				var offsetDiff = localOffset - diff;
				currentZoneMatchTime = d1 - offsetDiff;
				
					
				item.timestamp = new Date(currentZoneMatchTime*1000) / 1000;
				
				currentZoneMatchTime = new Date(currentZoneMatchTime*1000);
				

				var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

				var day = currentZoneMatchTime.getDate();
				var mnth = currentZoneMatchTime.getMonth();	
				mnth = monthAr[mnth];
				var yr = currentZoneMatchTime.getFullYear();
				var hr = currentZoneMatchTime.getHours();
				if(hr < 10) hr = "0"+hr;
				var min = currentZoneMatchTime.getMinutes();
				if(min < 10) min = "0"+min;
				var hours = currentZoneMatchTime.getHours();
					var minutes = currentZoneMatchTime.getMinutes();
					var ampm = hours >= 12 ? 'pm' : 'am';
					hours = hours % 12;
					hours = hours ? hours : 12; // the hour '0' should be '12'
					minutes = minutes < 10 ? '0'+minutes : minutes;
					var strTime = hours + ':' + minutes + ' ' + ampm;
				var currentZoneMatchDateTime = day+" "+mnth+" "+yr+", "+strTime+" "+zoneAbrv;
				item.currentZoneMatchDateTime = currentZoneMatchDateTime;

				var fixObj = [];
				fixObj[0] = item;
				$scope.getFixtureCountDown(fixObj,item.zoneTime);
				
			}
			$scope.getFixtureSquad(matId);
			$scope.getExpertAnalysis(matId);
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}	
			setTimeout(function(){
				$(".widget.playingXI").find(".widgetTitle").text("SQUADS");
			},1000)
	}
	
	$scope.filterMatchVideosList = function(fType){
		$(".MatchVideosListFilterMenus li").removeClass("current");
		if(fType == 'all'){
			$(".MatchVideosListFilterMenus .all").addClass("current");
			$scope.matchVideosList = matchVideosList;
		}
		if(fType == 'wicket'){
			var data = matchVideosList;
			var filteredMatchVideos = [];
			var videotagsFound = false;
			for(var i=0;i<data.length;i++){
				videotagsFound = false;
				for(j=0;j<data[i].tags.length;j++){
					if(data[i].tags[j].label == 'wicket')
						videotagsFound = true;
					
				}
				
				if(videotagsFound)
				{
					filteredMatchVideos.push(data[i]);	
				}
			}
			
			$scope.matchVideosList = filteredMatchVideos;
							
			$(".MatchVideosListFilterMenus .wicket").addClass("current");
			
		}
		if(fType == 'highlights'){
			var data = matchVideosList;
			var filteredMatchVideos = [];
			var videotagsFound = false;
			for(var i=0;i<data.length;i++){
				videotagsFound = false;
				for(j=0;j<data[i].tags.length;j++){					
					if(data[i].tags[j].label == 'highlights')
						videotagsFound = true;
					
				}
				
				if(videotagsFound)
				{
					filteredMatchVideos.push(data[i]);	
				}
			}
			
			$scope.matchVideosList = filteredMatchVideos;
							
			$(".MatchVideosListFilterMenus .highlights").addClass("current");
			
		}
		if(fType == 'feature'){
			var data = matchVideosList;
			var filteredMatchVideos = [];
			var videotagsFound = false;
			for(var i=0;i<data.length;i++){
				videotagsFound = false;
				for(j=0;j<data[i].tags.length;j++){
					if(data[i].tags[j].label == 'feature')
						videotagsFound = true;
				}
				
				if(videotagsFound)
				{
					filteredMatchVideos.push(data[i]);	
				}
			}
			$scope.matchVideosList = filteredMatchVideos;
							
			$(".MatchVideosListFilterMenus .feature").addClass("current");
			
		}
		if(fType == 'six'){
			var data = matchVideosList;
			var filteredMatchVideos = [];
			var videotagsFound = false;
			for(var i=0;i<data.length;i++){
				videotagsFound = false;
				for(j=0;j<data[i].tags.length;j++){
					if(data[i].tags[j].label == 'six')
						videotagsFound = true;
				}
				
				if(videotagsFound)
				{
					filteredMatchVideos.push(data[i]);	
				}
			}
			$scope.matchVideosList = filteredMatchVideos;
							
			$(".MatchVideosListFilterMenus .supersix").addClass("current");
			
		}
	}
	
	$scope.getoverallStats=function(){
		mcService.GetTeamList(competitionId,function(data){
			$scope.compMatchType = "";
			if(data.length == 0 || data.Teamlist.length == 0)
			{
				$("#errMsg").html("No Stats Found");
				$scope.noTeamstats = true;
				$scope.showteamstats = false;
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
				return;
			}
			
		//	$(".pageloader").addClass('active');
			var teamList=[];
			var teamId='';
			var teamList=data.Teamlist;

			if(filterteam != undefined && filterteam != ''){
				if(teamList != undefined && teamList.length > 0){
					var filteredTeamList = [];
					teamList.map(function(item){
						if(item.TeamID == filterteam)
							filteredTeamList.push(item);
					});
					teamList = filteredTeamList;
					teamId=teamList[0].TeamID;
					$scope.selectedTeamFilter=teamList[0];
				}
			}

			$scope.teamListFilter=teamList;
			var lasmatchresult = $filter("filter")(matchscheduleData,{MatchStatus:"Post"},true);
			var lasmatchresultFil = [];
			if(lasmatchresult != undefined && lasmatchresult.length > 0)
			{
				lasmatchresult.map(function(item){
					if(item.FirstBattingSummary != undefined && item.FirstBattingSummary !='')
						lasmatchresultFil.push(item);
				});
				lasmatchresult = lasmatchresultFil;
			}

			if(lasmatchresult.length > 0 && (statsCID == undefined || statsCID == '') && teamId != ''){
				teamId = lasmatchresult[0]['FirstBattingTeamID'];
				// $scope.selectedTeamFilter=$filter("filter")(teamList,{TeamID:teamId})[0];
				for(var i=0;i<teamList.length;i++)
				{
					if(teamList[i].TeamID == teamId)
					{
						$scope.selectedTeamFilter = teamList[i];
					}
				}
				$scope.compMatchType = (lasmatchresult[0] != undefined) ? ((lasmatchresult[0]['MatchType'] != undefined) ? lasmatchresult[0]['MatchType'] : '') : '';
			}
			else
			{
				teamId=teamList[0].TeamID;
				$scope.selectedTeamFilter=teamList[0];
			}
			if(fStats_teamId != undefined && fStats_teamId != ''){
				if(teamList != undefined && teamList.length > 0){
					var filteredTeamList = [];
					teamList.map(function(item){
						if(item.TeamID == fStats_teamId)
							filteredTeamList.push(item);
					});
					teamId=filteredTeamList[0].TeamID;
					$scope.selectedTeamFilter=filteredTeamList[0];
				}
			}
			$(".mcSelectDefault.mcSearchTeam").attr("data-teamId",teamId);
			$(".teamstatsFilter").val(teamId);
			$scope.bindTeamBasicstats(competitionId,teamId);
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}
		  	
		});
		
	}

	$scope.getTeamSquads=function(teamSquadsCallFrom){
		if(!teamsSquads)
			return;
		$(".teamSquadsDetailBlock").removeClass("active");
		$(".teamSquadsBlock").removeClass("inactive");
		mcService.GetTeamSquads(competitionId,function(data){
			if(data.length == 0)
			{
				$scope.squadsmenu = false;
				if(teamSquadsCallFrom != 'init')
					$("#errMsg").html("No Squads Found");
				$scope.showteamsquads = false;
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
				return;
			}
			else
				$scope.squadsmenu = squadsmenu;

			if(teamSquadsCallFrom == 'init') return;
			
			$scope.teamSquadsList = data;
			var activeSquadTeamName = (data[0] != undefined) ? data[0]: '';
			$scope.activeSquadTeamName = (activeSquadTeamName[0] != undefined) ? activeSquadTeamName[0]['TeamName'] : '';
			$scope.showteamsquads = true;
			$('body').undelegate('.TabNavItemsTheme1', 'click')
            .delegate('.TabNavItemsTheme1', 'click', function () {
		    	$(this).parents(".NavTheme1Block").find(".TabNavItemsTheme1").removeClass("active");
		    	$(this).addClass("active");
		    	var tabIndex = $(this).attr("data-tabIndex");
		    	$(this).parents(".NavTheme1Block").find(".TabNavTheme1Content").removeClass("active");
		    	$(this).parents(".NavTheme1Block").find(".TabNavTheme1Content."+tabIndex).addClass("active");

		    });
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}
		  	
		});

		mcService.GetPlayerProfileBattingStats(function(data){
			$scope.allplayerCareerBatingstats = data;
			
			
			
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}
		  	
		});
		mcService.GetPlayerProfileBowlingStats(function(data){
			$scope.allplayerCareerBowlingstats = data;
			
			
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}
		  	
		});
		
	}

	$scope.changeAutoSquadTeam = function(obj){
		$scope.activeSquadTeamName = (obj[0] != undefined) ? obj[0]['TeamName'] : '';
	}

	$scope.squadPayerProfile=function(obj){
		$(".teamSquadsDetailBlock").addClass("active");
		$(".teamSquadsBlock").addClass("inactive");
		$scope.playerProfileInfo = obj;
		var teamname = obj.TeamName;
		var pName = obj.PlayerName;
		var playerCareerBatingstats = $filter('filter')($scope.allplayerCareerBatingstats,{TeamName:teamname,PlayerName:pName});
		var playerCareerBowlingstats = $filter('filter')($scope.allplayerCareerBowlingstats,{TeamName:teamname,PlayerName:pName});
		$scope.playerCareerBatingstats = playerCareerBatingstats;
		$scope.playerCareerBowlingstats = playerCareerBowlingstats;
		if (!$scope.$$phase) {
				$scope.$apply();
		  	}
	}

	$scope.backTosquadList = function(){
		$(".teamSquadsDetailBlock").removeClass("active");
		$(".teamSquadsBlock").removeClass("inactive");
	}

	$scope.bindTeamBasicstats = function(competitionId,teamId){
		$scope.noTeamstats = false;
		mcService.getoverallStats(competitionId,function(data){
				if(data.teamstats.length == 0)
				{
					$scope.noTeamstats = true;
					$("#errMsg").html("No Stats Found");
					$scope.showteamstats = false;
					if (!$scope.$$phase) {
						$scope.$apply();
				  	}
				  	return;
				}	
				$scope.showteamstats = true;			
				overallTeamStats=(data.teamstats != undefined)  ? data.teamstats : [];
				$scope.overallTeamStats = [];
				if(overallTeamStats != undefined && overallTeamStats.length > 0)
				{
					overallTeamStats.map(function(item){
						if(teamId == item.TeamID){
							$scope.overallTeamStats = item;
						}
					});
				}
				
				 mcService.GetPlayerStats(competitionId,teamId,function(data) {
			 		if($(window).width()<=1024)
			 		{
			 			$scope.teambattingStatsHeadTitle=['Player','M','I','R'];
						$scope.teambattingStatskeyVal=['PlayerName','Matches','Innings','RunsScored'];					 		
						$scope.teambowlingStatsHeadTitle=['Player','M','I','WKTS'];
						$scope.teambowlingStatskeyVal=['PlayerName','Matches','InningsBowled','WicketsTaken'];					 				
			 		}
					else
					{
						$scope.teambattingStatsHeadTitle=['Player','M','I','R','B','HS','NO','AVG','SR','50s','100s','DB%','BDRY%'];
						$scope.teambattingStatskeyVal=['PlayerName','Matches','Innings','RunsScored','BallsFaced','HighestScore','NotOuts','BattingAverage','StrikeRate','Fifties','Hundreds','DBPercent','BdryPercent'];					 		
						$scope.teambowlingStatsHeadTitle=['Player','M','I','O','R','MD','WKTS','AVG','SR','ECON','NB','WB','DB%','BDRY%'];
						$scope.teambowlingStatskeyVal=['PlayerName','Matches','InningsBowled','OversBowled','TotalRunsConceeded','Maidens','WicketsTaken','BowlingAverage','BowlingSR','EconomyRate','NoBalls','Wides','BowlingDotBallPercent','BowlingBdryPercentage'];					 		
					}
					$scope.basicteamstats = data.playerstats;
					
					$("#teamStatsWrapper .mcTabLink").removeClass("current");
					$("#teamStatsWrapper .mcTabLink[data-tab='mcTeamBattingStats']").addClass("current");
					$("#teamStatsWrapper .tabTeamContent").removeClass("current");
					$("#mcTeamBattingStats").addClass("current");
					$(".pageloader").removeClass('active');
					scorecardTabMenuEvents();
					if (!$scope.$$phase) {	
						$scope.$apply();
				  	}
				 });
				
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
			});

		
	}

	$scope.changeTeamBasicStats = function(){
		$(".pageloader").addClass('active');
		var tId = $(".teamstatsFilter").val();
		// tId = $scope.teamListFilter[tId].TeamID;
		$scope.bindTeamBasicstats(competitionId,tId);
	}
	/******* get side bar widget ******/
	$scope.getSidebarWidget=function(pageType){
		if(pageType=="fixtures"){
			$scope.showFixWidget=$scope.FindWidget(FixturePageSidewidgets,'fixtures');
			$scope.showResWidget=$scope.FindWidget(FixturePageSidewidgets,'results');
			$scope.showLiveWidget=$scope.FindWidget(FixturePageSidewidgets,'live');
			$scope.showPTWidget=$scope.FindWidget(FixturePageSidewidgets,'standings');
			$scope.showLeadPlayes=$scope.FindWidget(FixturePageSidewidgets,'tstats');
			$scope.showMDWidget=$scope.FindWidget(FixturePageSidewidgets,'mcdetails');
			$scope.showPartnerShip=$scope.FindWidget(FixturePageSidewidgets,'partnership');
			$scope.squad=$scope.FindWidget(FixturePageSidewidgets,'squad');
			// if($scope.showFixWidget || $scope.showResWidget || $scope.showLiveWidget)
			// 	$scope.loadkeyDatas("matchschedule");
			// if($scope.showPTWidget)
			// 	$scope.loadkeyDatas("standings");
			// if($scope.showLeadPlayes)
			// 	$scope.loadkeyDatas("keyperformers");

			if(FixturePageSidewidgets.length==0)
				$(".fixWrap").addClass("fullWidth");
			else
				$(".fixWrap").removeClass("fullWidth");
		}
		else if(pageType=="teamstats"){
			$scope.showFixWidget=$scope.FindWidget(teamstatsPageSidewidgets,'fixtures');
			$scope.showResWidget=$scope.FindWidget(teamstatsPageSidewidgets,'results');
			$scope.showLiveWidget=$scope.FindWidget(teamstatsPageSidewidgets,'live');
			$scope.showPTWidget=$scope.FindWidget(teamstatsPageSidewidgets,'standings');
			$scope.showLeadPlayes=$scope.FindWidget(teamstatsPageSidewidgets,'tstats');
			$scope.showMDWidget=$scope.FindWidget(teamstatsPageSidewidgets,'mcdetails');
			$scope.showPartnerShip=$scope.FindWidget(teamstatsPageSidewidgets,'partnership');
			$scope.squad=$scope.FindWidget(teamstatsPageSidewidgets,'squad');

			// if($scope.showFixWidget || $scope.showResWidget || $scope.showLiveWidget)
			// 	$scope.loadkeyDatas("matchschedule");
			// if($scope.showPTWidget)
			// 	$scope.loadkeyDatas("standings");
			// if($scope.showLeadPlayes)
			// 	$scope.loadkeyDatas("keyperformers");
			if(teamstatsPageSidewidgets.length==0)
				$(".fixWrap").addClass("fullWidth");
			else
				$(".fixWrap").removeClass("fullWidth");
		}
		else if(pageType=="tourstats"){
			$scope.showFixWidget=$scope.FindWidget(tourstatsPageSidewidgets,'fixtures');
			$scope.showResWidget=$scope.FindWidget(tourstatsPageSidewidgets,'results');
			$scope.showLiveWidget=$scope.FindWidget(tourstatsPageSidewidgets,'live');
			$scope.showPTWidget=$scope.FindWidget(tourstatsPageSidewidgets,'standings');
			$scope.showLeadPlayes=$scope.FindWidget(tourstatsPageSidewidgets,'tstats');
			$scope.showMDWidget=$scope.FindWidget(tourstatsPageSidewidgets,'mcdetails');
			$scope.showPartnerShip=$scope.FindWidget(tourstatsPageSidewidgets,'partnership');
			$scope.squad=$scope.FindWidget(tourstatsPageSidewidgets,'squad');
			if(tourstatsPageSidewidgets.length==0)
				$(".fixWrap").removeClass("fullWidth");
				
			// if($scope.showFixWidget || $scope.showResWidget || $scope.showLiveWidget)
			// 	$scope.loadkeyDatas("matchschedule");	
		}
		else if(pageType=="standings"){
			$scope.showFixWidget=$scope.FindWidget(standPageSidewidgets,'fixtures');
			$scope.showResWidget=$scope.FindWidget(standPageSidewidgets,'results');
			$scope.showLiveWidget=$scope.FindWidget(standPageSidewidgets,'live');
			$scope.showPTWidget=$scope.FindWidget(standPageSidewidgets,'standings');
			$scope.showLeadPlayes=$scope.FindWidget(standPageSidewidgets,'tstats');
			$scope.showMDWidget=$scope.FindWidget(standPageSidewidgets,'mcdetails');
			$scope.showPartnerShip=$scope.FindWidget(standPageSidewidgets,'partnership');
			$scope.squad=$scope.FindWidget(standPageSidewidgets,'squad');

			// if($scope.showFixWidget || $scope.showResWidget || $scope.showLiveWidget)
			// 	$scope.loadkeyDatas("matchschedule");	
			// if($scope.showLeadPlayes)
			// 	$scope.loadkeyDatas("keyperformers");
			if(standPageSidewidgets.length==0)
				$(".fixWrap").addClass("fullWidth");
			else
				$(".fixWrap").removeClass("fullWidth");
		}
		else if(pageType=="teamDetailStats"){
			$scope.showFixWidget=false;
			$scope.showResWidget=false;
			$scope.showLiveWidget=false;
			$scope.showPTWidget=false;
			$scope.showLeadPlayes=false;
			$scope.showMDWidget=false;
			$scope.showPartnerShip=false;
			$scope.squad=false;

			// if($scope.showFixWidget || $scope.showResWidget || $scope.showLiveWidget)
			// 	$scope.loadkeyDatas("matchschedule");
			// if($scope.showPTWidget)
			// 	$scope.loadkeyDatas("standings");
			// if($scope.showLeadPlayes)
			// 	$scope.loadkeyDatas("keyperformers");
			if(teamstatsPageSidewidgets.length==0)
				$(".fixWrap").addClass("fullWidth");
			else
				$(".fixWrap").removeClass("fullWidth");
		}
		else if(pageType=="teamsquads"){
			$scope.showFixWidget=false;
			$scope.showResWidget=false;
			$scope.showLiveWidget=false;
			$scope.showPTWidget=false;
			$scope.showLeadPlayes=false;
			$scope.showMDWidget=false;
			$scope.showPartnerShip=false;
			$scope.squad=false;
		}
	}
	$scope.FindWidget = function(Arr,widgetType){
		if(Arr.indexOf(widgetType) != -1)
			return true;
		else
			return false;
	}
	/******* get standings and tourkeyperformers ******/

	$scope.loadkeyDatas=function(initType){
		if(initType=="keyperformers"){
			/******* get top players and bowlers list ******/
			if(keyperformersList.length==0){
				mcService.GetTourKeyPerformer(competitionId,function(data){
					keyperformersList=data;
					topBattingPlayerList[0]=[];
					topBowlingPlayerList[0]=[];
					topBattingPlayerList[0]['toprungetters']=$filter('filter')(data.TournamentKeyBattingPerformers,{KPIs:'Maximum Runs'});
					topBattingPlayerList[0]['highestSR']=$filter('filter')(data.TournamentKeyBattingPerformers,{KPIs:'Maximum Strike Rate'});

					topBowlingPlayerList[0]['highestWicket']=$filter('filter')(data.TournamentKeyBowlingPerformers,{KPIs:'HighestWicket'});

					topBowlingPlayerList[0]['economyRate']=$filter('filter')(data.TournamentKeyBowlingPerformers,{KPIs:'EconomyRate'});

					$scope.topBattingPlayerList=topBattingPlayerList;
					$scope.topBowlingPlayerList=topBowlingPlayerList;
					
					/******* get initial top bowlers and strikers data ******/
					
					var indivPlayerTR=$filter("filter")(topBattingPlayerList[0]["toprungetters"],{Rank:1});
					$scope.indivPlayerTR = (indivPlayerTR != undefined && indivPlayerTR.length > 0) ? indivPlayerTR[0] : []; 
					var indivPlayerHSR=$filter("filter")(topBattingPlayerList[0]["highestSR"],{Rank:1});
					$scope.indivPlayerHSR = (indivPlayerHSR != undefined && indivPlayerHSR.length > 0) ? indivPlayerHSR[0] : [];
					var indivPlayerHW=$filter("filter")(topBowlingPlayerList[0]["highestWicket"],{Rank:1});
					$scope.indivPlayerHW = (indivPlayerHW != undefined && indivPlayerHW.length > 0) ? indivPlayerHW[0] : [];
					var indivPlayerER=$filter("filter")(topBowlingPlayerList[0]["economyRate"],{Rank:1});
					$scope.indivPlayerER = (indivPlayerER != undefined && indivPlayerER.length > 0) ? indivPlayerER[0] : [];
					
					if (!$scope.$$phase) {
						$scope.$apply();
				  	}
					$("#TournamentStatsSMIPL .mcTabs .mcTabLink[data-tab='mcBattingStats']").addClass("current");
					$("#TournamentStatsSMIPL #mcBattingStats.mcTabContent").addClass("current");
					$(".pageloader").removeClass('active');
				});
			}
			else
				$(".pageloader").removeClass('active');
		}
		else if(initType=="standings"){
			/******* get standing details ******/
			if(standings.length==0){
				$scope.standings=[];
				mcService.GetStandings(competitionId,function(data){
					var dataPoints = (data.points != undefined) ? data.points : [];
					dataPoints.map(function(item){
						$scope.standingFlag = (item.StandingFlag != undefined && item.StandingFlag != null) ? item.StandingFlag : '';
					});
					if(dataPoints.length == 0)
					{
						$scope.standings = [];
						$scope.showstandings=false;
						setTimeout(function(){
							if($("#mcMenuWrapper .mcTabs li[data-value='standings']").hasClass("current") || $scope.callFromTemplate == "tourstats")
								$(".nostandings").removeClass("inactive");
						},1500);
						
						if (!$scope.$$phase) {
							$scope.$apply();
					  	}
					  	if(widgetViewType == "standings")
					  		$(".pageloader").removeClass('active');
					//	return;
					}
					$scope.showstandings=true;
				
					var grpCatg = (data.category != undefined) ? data.category : [];
					var points = (data.points != undefined) ? data.points : [];

					

					var standings = [];
					if(grpCatg != undefined && grpCatg.length > 0)
					{
						for(var i=0;i<grpCatg.length;i++)
						{
							standings[i] = $filter('filter')(points, { Category: grpCatg[i].Category },true);
						}
					}
					else
						standings[0] = points;




					$scope.standings=standings;
					$scope.pointsTableData = points;
					$("#ptdCID_"+competitionId).prop("checked","checked");
					/****************Standings Table*********/
					if($(window).width() > 767){
						if($scope.competitionType!='Twenty20 Match')
						{
							$scope.standingHeadTitle=['Pos','Team','Mat','Won','Lost','Tied','NR','NRR','For','Against','Pts'];
							$scope.standingkeyVal=['OrderNo','TeamName','Matches','Wins','Loss','Tied','NoResult','NetRunRate','ForTeams','AgainstTeam','Points'];	
							if($scope.standingFlag == 'NET'){
								$scope.standingHeadTitle.splice(7, 1, "NRR");
								$scope.standingkeyVal.splice(7, 1, "NetRunRate");
							}
							if($scope.standingFlag == 'QUO'){
								$scope.standingHeadTitle.splice(7, 1, "Quotient");
								$scope.standingkeyVal.splice(7, 1, "Quotient");
							}
						}
						else
						{
							$scope.standingHeadTitle=['Pos','Team','Mat','Won','Lost','NR','NRR','For','Against','Pts'];
							$scope.standingkeyVal=['OrderNo','TeamName','Matches','Wins','Loss','NoResult','NetRunRate','ForTeams','AgainstTeam','Points'];
							
							
						}
					}
					else{	
						$scope.standingHeadTitle=['Pos','Team','Mat','Pts'];
						$scope.standingkeyVal=['OrderNo','TeamName','Matches','Points'];
					}

					
					/*************************************/
				
					if($scope.standings.length == 0 && initLoad=='tabchange' && urlString == 'standings')
						$("#errMsg").html("No Points Table");
					if (!$scope.$$phase) {
						$scope.$apply();
				  	}
					$(".pageloader").removeClass('active');
					setTimeout(function(){
						$(".nicescroll_content").getNiceScroll().hide();
		                $(".nicescroll_content").getNiceScroll().resize();
		                $(".nicescroll_content").getNiceScroll().show();
					//	$(".pointsyear").prop("checked",false);
					},1000);
				});
			}
		}
		else if(initType=="matchschedule" && matchscheduleData.length == 0 && !matchScheduleInitLoad){
			mcService.GetMatchSchedule(competitionId,function(data){ 
				matchscheduleData = (data.Matchsummary != undefined) ? data.Matchsummary : ((data.Result != undefined) ? data.Result : []);		
				
				if(filterteam != undefined && filterteam != ''){
					var filterMSchedule = [];
					matchscheduleData.map(function(item){
						if(item.FirstBattingTeamID == filterteam || item.SecondBattingTeamID == filterteam)
							filterMSchedule.push(item);
					});
					matchscheduleData = filterMSchedule;
				}
				
				if(!showMatchOrder)
				{
					if(matchscheduleData != undefined && matchscheduleData.length > 0)
					{
						matchscheduleData.map(function(item){
							item.MatchOrder = "";
						});
					}
				}
			/******* filtering datas ******/				
				// liveDataList=(data.Live != undefined) ? data.Live : $filter("filter")(data.Matchsummary,{MatchStatus:"Live"});
				// resultDataList=(data.Result != undefined) ? data.Result : $filter("filter")(data.Matchsummary,{MatchStatus:"Post"});
				// upcomDataList=(data.Fixtures != undefined) ? data.Fixtures : $filter("filter")(data.Matchsummary,{MatchStatus:"Upcoming"});

				liveDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Live"});
				resultDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Post"});
				upcomDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Upcoming"});

				// if(liveDataList[0] != undefined)
				// {
				// 	if(liveDataList[0].MatchID != undefined && liveDataList[0].MatchID==6)
				// 		liveDataList[0]["LiveStream"] = "true";
				// }
				/******* asigning datas into scope variables ******/
				$scope.liveList=liveDataList;
				$scope.fixtureList=upcomDataList;
				$scope.resultList=resultDataList;
				var allMatches = [];
				if(liveDataList != undefined && liveDataList.length > 0){
					liveDataList.map(function(item){
						var matchDateTime = item.MatchDate+" "+item.MatchTime;
						var d = new Date(matchDateTime).getTime() / 1000;
						item.timestamp = d;
						allMatches.push(item);
					});										
				}
				if(upcomDataList != undefined && upcomDataList.length > 0){
					upcomDataList.map(function(item){
						var matchDateTime = item.MatchDate+" "+item.MatchTime;
						var d = new Date(matchDateTime).getTime() / 1000;
						item.timestamp = d;
						allMatches.push(item);
					});										
				}
				if(resultDataList != undefined && resultDataList.length > 0){
					resultDataList.map(function(item){
						var matchDateTime = item.MatchDate+" "+item.MatchTime;
						var d = new Date(matchDateTime).getTime() / 1000;
						item.timestamp = d;
						allMatches.push(item);
					});										
				}
				$scope.allMatches = allMatches;
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
			});	
		}
	}
	$scope.showContentBlk=function(shType){
		if(shType=='fixtures'){
			$scope.showFixture=true;
			$scope.showscorecard=false;
			$scope.showplayerstats=false;
			$scope.showstandings=false;
			$scope.showtourstats=false;
			$scope.showteamstats=false;
			$scope.showteamstats=false;
			$scope.showteamsquads = false;
			$(".navMainSmipl li a").removeClass("mcCurrent");
			$(".navMainSmipl li a.fixmenuItem").addClass("mcCurrent");
		}
		if(shType=='tourstats'){
			$scope.showFixture=false;
			$scope.showscorecard=false;
			$scope.showplayerstats=false;
			$scope.showstandings=false;
			//$scope.showtourstats=true;
			$scope.showteamstats=false;
			$scope.showteamsquads = false;
			$(".navMainSmipl li a").removeClass("mcCurrent");
			$(".navMainSmipl li a.tourmenuItem").addClass("mcCurrent");

			if(!$("#mcFilterBtn li[data-value='tourstats']").hasClass('mnActive'))
			{
				var setNavlinkactive = setInterval(function(){
					if(matchscheduleData.length != 0 && !$("#mcFilterBtn li[data-value='tourstats']").hasClass('mnActive'))
					{
						clearInterval(setNavlinkactive);
						setTimeout(function(){
							$("#mcFilterBtn li.mnActive").removeClass('mnActive');
							$("#mcFilterBtn li[data-value='tourstats']").addClass('mnActive');	
						},3000);
					}
				},1000);
			}
			
		}
		if(shType=='teamstats'){
			$scope.showFixture=false;
			$scope.showscorecard=false;
		//	$scope.showplayerstats=true;
			$scope.showstandings=false;
			$scope.showtourstats=false;
			$scope.showteamstats=false;
			$scope.showteamsquads = false;
			$(".navMainSmipl li a").removeClass("mcCurrent");
			$(".navMainSmipl li a.teammenuItem").addClass("mcCurrent");

			if(!$("#mcFilterBtn li[data-value='teamstats']").hasClass('mnActive'))
			{
				var setNavlinkactive = setInterval(function(){
					if(matchscheduleData.length != 0 && !$("#mcFilterBtn li[data-value='teamstats']").hasClass('mnActive'))
					{
						clearInterval(setNavlinkactive);
						setTimeout(function(){
							$("#mcFilterBtn li.mnActive").removeClass('mnActive');
							$("#mcFilterBtn li[data-value='teamstats']").addClass('mnActive');
						},3000);
					}
				},1000);
			}
			
		}
		if(shType=='standings'){
			$scope.showFixture=false;
			$scope.showscorecard=false;
			$scope.showplayerstats=false;
			//$scope.showstandings=true;
			$scope.showtourstats=false;
			$scope.showPTWidget=false;
			$scope.showteamstats=false;
			$scope.showteamsquads = false;
			$(".navMainSmipl li a").removeClass("mcCurrent");
			$(".navMainSmipl li a.standmenuItem").addClass("mcCurrent");

			if(!$("#mcFilterBtn li[data-value='standings']").hasClass('mnActive'))
			{
				var setNavlinkactive = setInterval(function(){
					if(matchscheduleData.length != 0 && !$("#mcFilterBtn li[data-value='standings']").hasClass('mnActive'))
					{
						clearInterval(setNavlinkactive);
						setTimeout(function(){
							$("#mcFilterBtn li.mnActive").removeClass('mnActive');
							$("#mcFilterBtn li[data-value='standings']").addClass('mnActive');
						},3000);
					}
				},1000);
			}

			$("#mcMenuWrapper .mcTabs li").removeClass('current');
			$("#mcMenuWrapper .mcTabs li[data-value='standings']").addClass('current');
		
		}
		if(shType=='teamDetailStats'){
			$scope.showFixture=false;
			$scope.showscorecard=false;
			$scope.showplayerstats=false;
			$scope.showstandings=false;
			$scope.showtourstats=false;
			$scope.showPTWidget=false;
		//	$scope.showteamstats=true;
			$scope.showteamsquads = false;
			$(".navMainSmipl li a").removeClass("mcCurrent");
			$(".navMainSmipl li a.teamstats").addClass("mcCurrent");

			if(!$("#mcFilterBtn li[data-value='teamDetailStats']").hasClass('mnActive'))
			{
				var setNavlinkactive = setInterval(function(){
					if(matchscheduleData.length != 0 && !$("#mcFilterBtn li[data-value='teamDetailStats']").hasClass('mnActive'))
					{
						clearInterval(setNavlinkactive);
						setTimeout(function(){
							$("#mcFilterBtn li.mnActive").removeClass('mnActive');
							$("#mcFilterBtn li[data-value='teamDetailStats']").addClass('mnActive');
						},3000);
					}
				},1000);
			}
		}
		if(shType=='teamsquads'){
			$scope.showFixture=false;
			$scope.showscorecard=false;
			$scope.showplayerstats=false;
			$scope.showstandings=false;
			$scope.showtourstats=false;
			$scope.showPTWidget=false;
			// $scope.showteamsquads=true;
			$(".navMainSmipl li a").removeClass("mcCurrent");
			$(".navMainSmipl li a.teamsquads").addClass("mcCurrent");

			if(!$("#mcFilterBtn li[data-value='teamsquads']").hasClass('mnActive'))
			{
				var setNavlinkactive = setInterval(function(){
					if(matchscheduleData.length != 0 && !$("#mcFilterBtn li[data-value='teamsquads']").hasClass('mnActive'))
					{
						clearInterval(setNavlinkactive);
						setTimeout(function(){
							$("#mcFilterBtn li.mnActive").removeClass('mnActive');
							$("#mcFilterBtn li[data-value='teamsquads']").addClass('mnActive');
						},3000);
					}
				},1000);
			}
		}
	}
	$scope.showAllBattingStatsList = function(){
		$scope.statsListLimit = $scope.tourBattingStats.length;
	}
	$scope.showAllmvpStatsList = function(){
		$scope.statsListLimit = $scope.mvpStatsList.length;
	}
	$scope.showStatsFilter = function(){
		$(".filter.statsFilter").addClass("active");
	}
	$scope.closeStatsFilter = function(){
		$(".statsFilter").removeClass("active");
	}
	$scope.statsfilterTeamCode = "All Teams";
	$scope.clearStatsFilter = function(){
		//$scope.statsfilterByTeam("All Teams");
		$scope.statsfilterTeamName = "All Teams";
		$scope.statsfilterTeamCode = "All Teams";
		$scope.displayStatsSeasonName = $scope.curSeasonName;
		$(".filterTeamsList").removeClass("active");
		$(".filterTeamsList[data-val='All Teams']").addClass("active");
		$scope.statsfilterBySeason($scope.competitionList[0]);
	}
	$scope.statsfilterByTeam = function(pFTeamName,pFTeamCode){
		$scope.statsListLimit = 20;
		var filtertourBattingStats = [];
		var filtertourBowlingStats = [];
		var filtermvpStatsList = [];
		$scope.statsfilterTeamName = pFTeamName;
		if(pFTeamCode != undefined && pFTeamCode != '')
			$scope.statsfilterTeamCode = pFTeamCode;
		$(".cSBList").removeClass("active");
		$scope.selectedPlayerCountry='All Players';
		if(pFTeamName != 'All Teams'){
			for(var i=0; i<tourBattingStats.length; i++){
				if(tourBattingStats[i].TeamName.toLowerCase() == pFTeamName.toLowerCase())
					filtertourBattingStats.push(tourBattingStats[i]);
			}
			$scope.tourBattingStats = filtertourBattingStats;
			for(var i=0; i<tourBowlingStats.length; i++){
				if(tourBowlingStats[i].TeamName.toLowerCase() == pFTeamName.toLowerCase())
					filtertourBowlingStats.push(tourBowlingStats[i]);
			}
			$scope.tourBowlingStats = filtertourBowlingStats;
			
			
			if($(".mvpButton").hasClass("active")){
				for(var i=0; i<mvpStatsList.length; i++){
					if(mvpStatsList[i].TeamName.toLowerCase() == pFTeamName.toLowerCase())
						filtermvpStatsList.push(mvpStatsList[i]);
				}
				$scope.mvpStatsList = filtermvpStatsList;
			}
			
		}
		else{
			$scope.tourBattingStats = tourBattingStats;
			$scope.tourBowlingStats = tourBowlingStats;
			$scope.mvpStatsList = mvpStatsList;
		}		
		$(".filterTeamsList").removeClass("active");
		$(".filterTeamsList[data-val='"+pFTeamName+"']").addClass("active");
		$(".statsFilter").removeClass("active");
	}
	$scope.selectedPlayerCountry='All Players';
	$scope.statsfilterByPlayerCountry = function(pFPlayerCountry){
		$scope.statsListLimit = 20;
		var filtertourBattingStats = [];
		var filtertourBowlingStats = [];
		var filtermvpStatsList = [];
		$scope.selectedPlayerCountry = pFPlayerCountry;
		
		$(".cSBList").removeClass("active");
		var pFTeamName = ($scope.statsfilterTeamName != undefined && $scope.statsfilterTeamName != '') ? $scope.statsfilterTeamName : 'All Teams';
		if(pFPlayerCountry == 'Indians'){
			if(pFTeamName != 'All Teams'){
				for(var i=0; i<tourBattingStats.length; i++){
					if(tourBattingStats[i].TeamName.toLowerCase() == pFTeamName.toLowerCase() && tourBattingStats[i].Nationality == 'Indian')
						filtertourBattingStats.push(tourBattingStats[i]);
				}
				$scope.tourBattingStats = filtertourBattingStats;
				for(var i=0; i<tourBowlingStats.length; i++){
					if(tourBowlingStats[i].TeamName.toLowerCase() == pFTeamName.toLowerCase() && tourBattingStats[i].Nationality == 'Indian')
						filtertourBowlingStats.push(tourBowlingStats[i]);
				}
				$scope.tourBowlingStats = filtertourBowlingStats;
			}
			else{
				for(var i=0; i<tourBattingStats.length; i++){
					if(tourBattingStats[i].Nationality == 'Indian')
						filtertourBattingStats.push(tourBattingStats[i]);
				}
				$scope.tourBattingStats = filtertourBattingStats;
				for(var i=0; i<tourBowlingStats.length; i++){
					if(tourBattingStats[i].Nationality == 'Indian')
						filtertourBowlingStats.push(tourBowlingStats[i]);
				}
				$scope.tourBowlingStats = filtertourBowlingStats;
			}
		}
		else if(pFPlayerCountry == 'Overseas'){
			if(pFTeamName != 'All Teams'){
				for(var i=0; i<tourBattingStats.length; i++){
					if(tourBattingStats[i].TeamName.toLowerCase() == pFTeamName.toLowerCase() && tourBattingStats[i].Nationality == 'Overseas')
						filtertourBattingStats.push(tourBattingStats[i]);
				}
				$scope.tourBattingStats = filtertourBattingStats;
				for(var i=0; i<tourBowlingStats.length; i++){
					if(tourBowlingStats[i].TeamName.toLowerCase() == pFTeamName.toLowerCase() && tourBattingStats[i].Nationality == 'Overseas')
						filtertourBowlingStats.push(tourBowlingStats[i]);
				}
				$scope.tourBowlingStats = filtertourBowlingStats;
			}
			else{
				for(var i=0; i<tourBattingStats.length; i++){
					if(tourBattingStats[i].Nationality == 'Overseas')
						filtertourBattingStats.push(tourBattingStats[i]);
				}
				$scope.tourBattingStats = filtertourBattingStats;
				for(var i=0; i<tourBowlingStats.length; i++){
					if(tourBattingStats[i].Nationality == 'Overseas')
						filtertourBowlingStats.push(tourBowlingStats[i]);
				}
				$scope.tourBowlingStats = filtertourBowlingStats;
			}
		}
		else{
			if(pFTeamName != 'All Teams'){
				for(var i=0; i<tourBattingStats.length; i++){
					if(tourBattingStats[i].TeamName.toLowerCase() == pFTeamName.toLowerCase())
						filtertourBattingStats.push(tourBattingStats[i]);
				}
				$scope.tourBattingStats = filtertourBattingStats;
				for(var i=0; i<tourBowlingStats.length; i++){
					if(tourBowlingStats[i].TeamName.toLowerCase() == pFTeamName.toLowerCase())
						filtertourBowlingStats.push(tourBowlingStats[i]);
				}
				$scope.tourBowlingStats = filtertourBowlingStats;
			}
			else{
				$scope.tourBattingStats = tourBattingStats;
				$scope.tourBowlingStats = tourBowlingStats;
			}
			
		}		
		
	}
	$scope.statsfilterBySeason = function(obj){
		if(seasonList != undefined && seasonList.length > 0)
		{
			seasonList.map(function(item){
				if(item.SeasonID == obj.SeasonID)
					$scope.displayStatsSeasonName = item.seasonName;
			});
		}
		$scope.statsListLimit = 20;
		competitionId = obj.CompetitionID;
		statsCID = obj.CompetitionID;
		var url = $scope.clientbasePath+"stats/"+$scope.displayStatsSeasonName;
		if($(".statsContentTab.seasonStats").hasClass("active"))
			window.location.assign(url);
		$(".cSBList").removeClass("active");
		if($(".mvpButton").hasClass("active") || ($scope.selectedAwards == 'MVP' && $(".statsContentTab.awardsStats").hasClass("active"))){
			$scope.showMVPPlayersList();
		}
		else if($(".fairplayBtn").hasClass("active")|| ($scope.selectedAwards == 'FAIRPLAY' && $(".statsContentTab.awardsStats").hasClass("active"))){
			$scope.showFairPlayList();
		}
		else if($(".statsTypeBtns.batting").hasClass("active")){
			$scope.tstatsBatting();
			$("#battingTAB").show();
			$("#bowlingTAB").hide();
			$(".battingT").show();
			$(".bowlingT").hide();
			$(".battingTopper").removeClass("inactive");
			$(".bowlingTopper").addClass("inactive");
		}
		else if($(".statsTypeBtns.bowling").hasClass("active")){
			$("#battingTAB").hide();
			$("#bowlingTAB").show();
			$(".battingT").hide();
			$(".bowlingT").show();
			$("#mvpTAB").hide();
			$(".battingTopper").addClass("inactive");
			$(".bowlingTopper").removeClass("inactive");
			
			$(".mvpButton").removeClass("active");
			$("#fairplayTAB").hide();
			$(".fairplayBtn").removeClass("active");
			$scope.tstatsBattingV2('mw','MostWickets','','mostWickets','mostwickets');
		}
		
		$(".filterSeasonList").removeClass("active");
		$(".filterSeasonList[data-val='"+competitionId+"']").addClass("active");
		$(".statsFilter").removeClass("active");
	}
	$scope.getStatsMatchDateDisplay = function(pDateString){
		if(pDateString == undefined || pDateString =='') return '';
		pDateString = pDateString.split("T");
		if(pDateString.length >= 2){
			pDateString = pDateString[0];
			pDateString = pDateString.split("-");
			pDateString = pDateString[2]+' '+monthAbrList[pDateString[1]-1]+' '+pDateString[0];
		}
		else if(pDateString.length == 1)
			pDateString = pDateString[0];
		else
			pDateString = '';
		
		return pDateString;
	}
	$scope.getStatsMatchDateDisplay2 = function(pDateString){
		if(pDateString == undefined || pDateString =='') return '';
		pDateString = pDateString.split("-");
		if(pDateString.length >= 2){
			pDateString = pDateString[2]+' '+monthFullNameList[pDateString[1]-1]+' '+pDateString[0];
		}
		else
			pDateString = '';
		
		return pDateString;
	}
	
	$scope.getBatsmanRuns = function(strikerID){
		var BatsmanRuns = '';
		if($scope.battingCard != undefined && $scope.battingCard.length > 0){
			$scope.battingCard.map(function(item){
				if(item.PlayerID == strikerID)
					BatsmanRuns = item.Runs;
			});
		}
		return BatsmanRuns;
	}
	$scope.isBatsManLBW = function(strikerID){
		var BatsmanWicketType = '';
		if($scope.battingCard != undefined && $scope.battingCard.length > 0){
			$scope.battingCard.map(function(item){
				if(item.PlayerID == strikerID)
					BatsmanWicketType = item.OutDesc.indexOf("lbw");
			});
		}
		return BatsmanWicketType;
	}

	$scope.statsTypeFilterChange = function(pType){
		$scope.selectedPlayerCountry='All Players';
		$(".statsTypeFilter .cSBListItems").removeClass("selected");
		$(".cSBListFItems").removeClass("selected");
		if(pType == 'batters'){
			$(".statsTypeFilter .cSBListItems.batters").addClass("selected");
			$(".cSBListFItems.batFItem").addClass("selected");
		}
			
		if(pType == 'bowlers'){
			$(".statsTypeFilter .cSBListItems.bowlers").addClass("selected");
			$(".cSBListFItems.bowFItem").addClass("selected");
		}
			
	}
	
	/******* get batting stats ******/
	var uniqueStatsTeamsList = [];
	var uniqueStatsTeamsCodes = [];
	var uniqueStatsTeamsIamges = [];
	$scope.tstatsBatting=function(stType='mruns',jsonFname='toprunsscorers',obj,flName='mostRuns'){
		$(".seasonFilterItems").removeClass("inactive");
		$(".cSBList").removeClass("active");
		console.log($scope.statsfilterTeamCode);
		$(".matches-main").addClass("inactive");
		if(stType == 'mruns')
			$(".np-list.toprunsscorers").addClass("active");
		else
			$(".np-list.toprunsscorers").removeClass("active");
		var selListObj = $filter("filter")($scope.allStatsList,{col4:flName},true);
		
		$scope.selbattingStatsList = (selListObj != undefined) ? selListObj[0] : [];
		$scope.statsTypeFilterName = $scope.selbattingStatsList.col1;
		
				$scope.showAwars = false;
		tourBattingData = [];
		$(".pageloader").addClass('active');
		$(".atl-mobile").removeClass("atl-mobile-t");
		var targetId= '';
		if(obj != undefined && obj != '')
			targetId=obj.currentTarget.id;
//		$(".nicescroll_content").getNiceScroll().hide();
 //       $(".nicescroll_content").getNiceScroll().resize();
  //      $(".nicescroll_content").getNiceScroll().show();
		$scope.statsListLimit = 20;
		if($scope.displayStatsSeasonName == 'All Time'){
			statsCID = 'alltime'
			var pcompID = 'alltime';
			if($(".statsTypeBtns.batting").hasClass("active")){
				$("#battingTAB").show();
				$(".battingTopper").removeClass("inactive");
				$(".bowlingTopper").addClass("inactive");
			}
		}
		else{
			var pcompID = competitionId;
			statsCID = competitionId;
		}
			if (!$scope.$$phase) {
            $scope.$apply();
        }
		
		mcService.GetTourBattingStats(pcompID,jsonFname,function(data){
			
			tourBattingStats = (data[jsonFname] != undefined) ? data[jsonFname] : [];
			uniqueStatsTeamsList = [];
			uniqueStatsTeamsCodes = [];
			uniqueStatsTeamsIamges = [];
			for(var i=0; i<tourBattingStats.length; i++){
				tourBattingStats[i]['pos'] = i+1;
				if(jQuery.inArray(tourBattingStats[i].TeamName, uniqueStatsTeamsList ) == '-1'){
								uniqueStatsTeamsList.push(tourBattingStats[i].TeamName);
								uniqueStatsTeamsCodes.push(tourBattingStats[i].TeamCode);
					}
			}
			
			if(stType=='mruns'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','R','I','NO','HS','AVG','BF','SR','100','50','4s','6s'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','TotalRuns','Innings','NotOuts','HighestScore','BattingAverage','Balls','StrikeRate','Centuries','FiftyPlusRuns','Fours','Sixes'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','R'];
					battingStatskeyVal=['pos','StrikerName','Matches','TotalRuns'];	
				}
				// uniqueStatsTeamsList = [];
				// uniqueStatsTeamsCodes = [];
				// uniqueStatsTeamsIamges = [];
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					// if(jQuery.inArray(tourBattingStats[i].TeamName, uniqueStatsTeamsList ) == '-1'){
					// 			uniqueStatsTeamsList.push(tourBattingStats[i].TeamName);
					// 			uniqueStatsTeamsCodes.push(tourBattingStats[i].TeamCode);
					// }
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
						
					}
				}
				$scope.tbSecTitleBat="MOST RUNS";
			}
			
			if(stType=='his'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','HS','BF','4s','6s','SR','AGAINST','VENUE','DATE'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','HighestScore','Balls','Fours','Sixes','StrikeRate','AgainstTeamName','VenueName','MatchDate'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','HS'];
					battingStatskeyVal=['pos','StrikerName','Matches','HighestScore'];
				}
				
			
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else{
							if(battingStatskeyVal[j] == 'MatchDate'){
								var date = tourBattingStats[i][battingStatskeyVal[j]];
								if(date != undefined && date != ''){
										date = date.split('T');  
										tourBattingData[i][j]['kpi']=date[0];
								}       
								else{
									tourBattingData[i][j]['kpi']='';
								}								
								
							}
							else
								tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBat="HIGHEST INDIVIDUAL SCORE";
			}
			if(stType=='hsrt'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','SR','I','NO','R','HS','AVG','BF','100','50','4S','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','StrikeRate','Innings','NotOuts','TotalRuns','HighestScore','BattingAverage','Balls','Centuries','FiftyPlusRuns','Fours','Sixes'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','SR'];
					battingStatskeyVal=['pos','StrikerName','Matches','StrikeRate'];
				}
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="HIGHEST STRIKE RATE (TOURNAMENT)";
			}
			if(stType=='hsri'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','SR','R','BF','4S','6S','AGAINST','VENUE','DATE'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','StrikeRate','TotalRuns','Balls','Fours','Sixes','AgainstTeamName','VenueName','MatchDate'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','SR'];
					battingStatskeyVal=['pos','StrikerName','Matches','StrikeRate'];
				}
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else{
							if(battingStatskeyVal[j] == 'MatchDate'){
								var date = tourBattingStats[i][battingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBat="HIGHEST STRIKE RATE (INNINGS)";
			}
			if(stType=='bba'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','AVG','I','NO','R','HS','BF','SR','100','50','4S','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','BattingAverage','Innings','NotOuts','TotalRuns','HighestScore','Balls','StrikeRate','Centuries','FiftyPlusRuns','Fours','Sixes'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','AVG'];
					battingStatskeyVal=['pos','StrikerName','Matches','BattingAverage'];
				}
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="BEST BATTING AVERAGE";
			}
			if(stType=='ms'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','6S','I','NO','R','HS','AVG','BF','SR','100','50','4S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','Sixes','Innings','NotOuts','TotalRuns','HighestScore','BattingAverage','Balls','StrikeRate','Centuries','FiftyPlusRuns','Fours'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','6S'];
					battingStatskeyVal=['pos','StrikerName','Matches','Sixes'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST SIXES";
			}
			if(stType=='msi'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','6S','I','NO','R','AVG','BF','SR','100','50','4S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','Sixes','Innings','NotOuts','TotalRuns','BattingAverage','Balls','StrikeRate','Centuries','FiftyPlusRuns','Fours'];
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','6S'];
					battingStatskeyVal=['pos','StrikerName','Matches','Sixes'];	
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST SIXES (INNINGS)";
			}

			if(stType=='mf'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','4S','I','NO','R','HS','AVG','BF','SR','100','50','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','Fours','Innings','NotOuts','TotalRuns','HighestScore','BattingAverage','Balls','StrikeRate','Centuries','FiftyPlusRuns','Sixes'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','4S'];
					battingStatskeyVal=['pos','StrikerName','Matches','Fours'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST FOURS";
			}
			if(stType=='mfi'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','4S','I','NO','R','AVG','BF','SR','100','50','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','Fours','Innings','NotOuts','TotalRuns','BattingAverage','Balls','StrikeRate','Centuries','FiftyPlusRuns','Sixes'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','4S'];
					battingStatskeyVal=['pos','StrikerName','Matches','Fours'];
				}
			
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j==0)
							tourBattingData[i][j]['kpi']= i+1;
						else 
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST FOURS (INNINGS)";
			}
			if(stType=='mff'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','50','I','NO','R','HS','AVG','BF','SR','100','4S','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','FiftyPlusRuns','Innings','NotOuts','TotalRuns','HighestScore','BattingAverage','Balls','StrikeRate','Centuries','Fours','Sixes'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','50'];
					battingStatskeyVal=['pos','StrikerName','Matches','FiftyPlusRuns'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST FIFTIES";
			}
			if(stType=='mc'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','M','100','I','NO','R','HS','AVG','BF','SR','50','4S','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','Matches','Centuries','Innings','NotOuts','TotalRuns','HighestScore','BattingAverage','Balls','StrikeRate','FiftyPlusRuns','Fours','Sixes'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','100'];
					battingStatskeyVal=['pos','StrikerName','Matches','Centuries'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST CENTURIES";
			}
			if(stType=='ff'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','BALLS','OPPOSITION','VENUE','DATE','6S','4S','TOTAL'];
					battingStatskeyVal=['pos','StrikerName','TeamName','FiftyBalls','AgainstTeamName','VenueName','MatchDate','Sixes','Fours','FinalScore'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','BALLS','TOTAL'];
					battingStatskeyVal=['pos','StrikerName','FiftyBalls','FinalScore'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else{
							if(battingStatskeyVal[j] == 'MatchDate'){
								var date = tourBattingStats[i][battingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBat="FASTEST FIFTIES";
			}
			if(stType=='fc'){
				if($(window).width() > 1024)
				{
					battingStatsHeadTitle=['pos','player','Team','BALLS','OPPOSITION','VENUE','DATE','6S','4S','TOTAL'];
					battingStatskeyVal=['pos','StrikerName','TeamName','FiftyBalls','AgainstTeamName','VenueName','MatchDate','Sixes','Fours','FinalScore'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','BALLS','TOTAL'];
					battingStatskeyVal=['pos','StrikerName','FiftyBalls','FinalScore'];	
				}
			
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else{
							if(battingStatskeyVal[j] == 'MatchDate'){
								var date = tourBattingStats[i][battingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBattingStats[i][battingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBat="FASTEST CENTURIES";
			}
			
			tourBowlingStats = tourBattingStats;
			var tourBowlingData = [];
			var bowlingStatsHeadTitle = [];
			if(stType=='mw'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','WKTS','I','O','R','BBI','AVG','ECON','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','Wickets','Innings','OversBowled','TotalRunsConceded','BBIW','BowlingAverage','EconomyRate','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','WKTS'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','Wickets'];		
				}
				uniqueStatsTeamsList = [];
				uniqueStatsTeamsCodes = [];
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					if(jQuery.inArray(tourBowlingStats[i].TeamName, uniqueStatsTeamsList ) == '-1'){
							uniqueStatsTeamsList.push(tourBowlingStats[i].TeamName);
							uniqueStatsTeamsCodes.push(tourBowlingStats[i].TeamCode);
						}
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST WICKETS";
			}
			if(stType=='ba'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','AVG','I','O','R','BBI','WKTS','ECON','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','BowlingAverage','Innings','OversBowled','TotalRunsConceded','BBIW','Wickets','EconomyRate','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','AVG'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','BowlingAverage'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST BOWLING AVERAGE";
			}
			if(stType=='be'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','ECON','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','EconomyRate','Innings','OversBowled','TotalRunsConceded','BBIW','Wickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','ECON'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','EconomyRate'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST ECONOMY";
			}
			if(stType=='bei'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','ECON','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','EconomyRate','Innings','OversBowled','InningsRuns','BBIW','InningsWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','ECON'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','EconomyRate'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST ECONOMY (INNINGS)";
			}
			if(stType=='bsr'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','SR','I','O','R','BBI','WKTS','AVG','ECON','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','StrikeRate','Innings','OversBowled','TotalRunsConceded','BBIW','Wickets','BowlingAverage','EconomyRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','SR'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','StrikeRate'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST STRIKE RATE";
			}
			if(stType=='bsri'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','SR','O','R','W','MD','AGAINST','VENUE','DATE'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','StrikeRate','OversBowled','InningsRuns','InningsWickets','Maidens','AgainstTeamName','VenueName','MatchDate'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','SR'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','StrikeRate'];
				}
			
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else{
							if(bowlingStatskeyVal[j] == 'MatchDate'){
								var date = tourBowlingStats[i][bowlingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBowlingData[i][j]['kpi']=date[0];
							}
							else
								tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBow="BEST STRIKE RATE (INNINGS)";
			}
			if(stType=='bbf'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','SR','O','R','W','MD','AGAINST','VENUE','DATE'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','StrikeRate','OversBowled','InningsRuns','InningsWickets','Maidens','AgainstTeamName','VenueName','MatchDate'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','SR'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','StrikeRate'];
				}
			
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else{
							if(bowlingStatskeyVal[j] == 'MatchDate'){
								var date = tourBowlingStats[i][bowlingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBowlingData[i][j]['kpi']=date[0];
							}
							else
								tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBow="Best Bowling Figures";
			}
			if(stType=='mrc'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','R','I','O','MDNS','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','InningsRuns','Innings','OversBowled','Maidens','BBIW','InningsWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','R'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','InningsRuns'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST RUNS CONCEDED";
			}
			if(stType=='mdb'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','DOTS','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','DotBallsBowled','Innings','OversBowled','TotalRunsConceded','BBIW','MatchWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','DOTS'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','DotBallsBowled'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST DOT BALLS";
			}
			if(stType=='mdbi'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','DOTS','O','R','W','MD','AGAINST','VENUE','DATE'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','DotBallsBowled','OversBowled','InningsRuns','InningsWickets','Maidens','AgainstTeamName','VenueName','MatchDate'];
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','DOTS'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','DotBallsBowled'];	
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else{
							if(bowlingStatskeyVal[j] == 'MatchDate'){
								var date = tourBowlingStats[i][bowlingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBowlingData[i][j]['kpi']=date[0];
							}
							else
								tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBow="MOST DOT BALLS (INNINGS)";
			}
			if(stType=='mmo'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','MD','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','Maidens','Innings','OversBowled','TotalRunsConceded','BBIW','MatchWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}	
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','MD'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','Maidens'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST MAIDEN OVERS BOWLED";
			}
			if(stType=='mhat'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','MD','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','Maidens','Innings','OversBowled','TotalRunsConceded','BBIW','MatchWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}	
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','MD'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','Maidens'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="Hat-tricks";
			}
			
			
		//	$scope.bowlingStatsHeadTitle=bowlingStatsHeadTitle;
			$scope.tourBowlingStats=tourBowlingStats;
		//	$scope.tourBowlingData=tourBowlingData;
			
			$scope.battingStatsHeadTitle=battingStatsHeadTitle;
			$scope.tourBattingStats=tourBattingStats;
			
			$scope.tourBattingData=tourBattingData;
			
			$scope.uniqueStatsTeamsList = uniqueStatsTeamsList;
			
			$scope.uniqueStatsTeamsCodes = uniqueStatsTeamsCodes;
			
			
			if($(".filterTeamsList.active").attr('data-val') != 'All Teams')
				$scope.statsfilterByTeam($(".filterTeamsList.active").attr('data-val'));
			if(bowlingStatsHeadTitle.length > 0)
				$scope.battingStatsHeadTitle=bowlingStatsHeadTitle;
			if(tourBowlingData.length > 0)
				$scope.tourBattingData=tourBowlingData;
			if(!$scope.$$phase){
				$scope.$apply();
		  	}
		  	$(".battingList li").removeClass('menuActive');
			if(targetId != '')
				$(".battingList li#"+targetId).addClass('menuActive');
			$(".pageloader").removeClass('active');
			
			
			if($("#batting").hasClass("active") || $(".statsTypeFilter .cSBListItems.batters").hasClass("selected"))
			{
				$("#battingTAB").show();
				$("#bowlingTAB").hide();
				$(".battingT").show();
				$(".bowlingT").hide();
				$("#mvpTAB").hide();
				$(".mvpButton").removeClass("active");
				$("#fairplayTAB").hide();
				$(".fairplayBtn").removeClass("active");
				$(".battingTopper").removeClass("inactive");
				$(".bowlingTopper").addClass("inactive");
			}
			if($("#bowling").hasClass("active") || $(".statsTypeFilter .cSBListItems.bowlers").hasClass("selected"))
			{
				$("#battingTAB").hide();
				$("#bowlingTAB").show();
				$(".battingT").hide();
				$(".bowlingT").show();
				$("#mvpTAB").hide();
				$(".mvpButton").removeClass("active");
				$("#fairplayTAB").hide();
				$(".fairplayBtn").removeClass("active");
				$(".battingTopper").addClass("inactive");
				$(".bowlingTopper").removeClass("inactive");
			}
			
			setTimeout(function(){
				$(".nicescroll_content").getNiceScroll().hide();
                $(".nicescroll_content").getNiceScroll().resize();
                $(".nicescroll_content").getNiceScroll().show();
			},1000);
			if($(window).width() > 1024){
				$([document.documentElement, document.body]).animate({
				        scrollTop: 0
				    }, 1000);
			}
			
		});
	}
	
	$scope.getCompetitionName = function(pCID){
	//	pCID = parseInt(pCID);
		var CompetitionName = "";
		for(var i=0;i<competitionList.length;i++){
			if(competitionList[i].CompetitionID == pCID){
				CompetitionName = competitionList[i].CompetitionName;
				break;
			}				
		}
		return CompetitionName;
	}
	$scope.tstatsBattingV2=function(stType='mruns',jsonFname='MostRuns',obj,flName='mostRuns',col3){
		$scope.selectedPlayerCountry='All Players';
		$(".cSBList").removeClass("active");
		$(".otherStats .cSBList").removeClass("active");
		$(".seasonStatsTitle").show();
		$("#alltimeRecords").hide();
		$("#mvpTAB").hide();
		if($(".mvpButton").hasClass("active")){
			$(".filterTeamsList").removeClass("active");
			$(".filterTeamsList[data-val='All Teams']").addClass("active");
		}
		$(".mvpButton").removeClass("active");
		$("#fairplayTAB").hide();
			$(".fairplayBtn").removeClass("active");
			
		$(".filterTeamsList").parents(".filters").show();
		$(".filterSeasonList").removeClass("inactive");
		
		
		if(stType == 'mruns' || stType == 'mf' || stType == 'ms' || stType == 'his' || stType == 'hsrt' || $(".statsTypeFilter .cSBListItems.batters").hasClass("selected")){
			$("#battingTAB").show();
			$("#bowlingTAB").hide();
			$(".battingT").show();
			$(".bowlingT").hide();
			$("#mvpTAB").hide();
			$(".mvpButton").removeClass("active");
			$("#fairplayTAB").hide();
			$(".fairplayBtn").removeClass("active");
			$("#htab .recordtab__btn").removeClass("active bg-red");
			$("#htab .recordtab__btn.batting").addClass("active bg-red");
			$(".battingTopper").removeClass("inactive");
			$(".bowlingTopper").addClass("inactive");
		}
		if(stType == 'mw' || stType == 'bbf' || stType == 'ba' || stType == 'be' || stType == 'mdb' || $(".statsTypeFilter .cSBListItems.bowlers").hasClass("selected")){
			$("#battingTAB").hide();
			$("#bowlingTAB").show();
			$(".battingT").hide();
			$(".bowlingT").show();
			$("#mvpTAB").hide();
			$(".mvpButton").removeClass("active");
			$("#fairplayTAB").hide();
			$(".fairplayBtn").removeClass("active");
			$("#htab .recordtab__btn").removeClass("active bg-red");
			$("#htab .recordtab__btn.bowling").addClass("active bg-red");
			$(".battingTopper").addClass("inactive");
			$(".bowlingTopper").removeClass("inactive");
		}
		
		if($scope.widgettype == 'international' || true)
		{
			$scope.tstatsBatting(stType,col3,obj,flName);
			return;
		}	
		var selListObj = $filter("filter")($scope.allStatsList,{col4:flName},true);
		$scope.selbattingStatsList = (selListObj != undefined) ? selListObj[0] : [];
		
		
		tourBattingData = [];
		$(".pageloader").addClass('active');
		var targetId= '';
		if(obj != undefined && obj != '')
			targetId=obj.currentTarget.id;
		$(".nicescroll_content").getNiceScroll().hide();
        $(".nicescroll_content").getNiceScroll().resize();
        $(".nicescroll_content").getNiceScroll().show();
		$scope.showtourstats = true;
		var pcId = parseInt(competitionId);
		var competitionName = $scope.getCompetitionName(pcId)+'-'+$scope.curSeasonName;
		
		competitionName = competitionName.toLowerCase();
		competitionName = competitionName.replace(/ /g, "-");
		
		mcService.GetTourBattingStatsV2(competitionName,jsonFname,flName,function(data){
			
			
			if(stType=='mruns'){
				tourBattingStats=(data['mostRuns'] != undefined) ? data['mostRuns'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','R','I','NO','HS','AVG','BF','SR','100','50','4s','6s'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','r','inns','no','hs','a','b','sr','100s','50s','4s','6s'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','R'];
					battingStatskeyVal=['pos','StrikerName','m','r'];	
				}
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST RUNS";
			}
			if(stType=='his'){
				tourBattingStats=(data['highestScores'] != undefined) ? data['highestScores'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','HS','BF','4s','6s','SR','AGAINST','VENUE','DATE'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','hs','b','4s','6s','sr','AgainstTeamName','VenueName','MatchDate'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','HS'];
					battingStatskeyVal=['pos','StrikerName','m','hs'];
				}
				
			
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else if(j ==9)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['opposition']['abbreviation'];
						else if(j ==10)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['venue']['city'];
						else if(j ==11){
							var date = new Date(tourBattingStats[i]['matchDate']);
							var m = date.getMonth();
							var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
                    		//	date = date.split('T');  
								tourBattingData[i][j]['kpi']=date.getDate()+' '+monthAr[m]+' '+date.getFullYear();
						}							
						else{
							if(battingStatskeyVal[j] == 'MatchDate'){
								var date = tourBattingStats[i][battingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBat="HIGHEST INDIVIDUAL SCORE";
			}
			if(stType=='hsrt'){
				tourBattingStats=(data['bestStrikeRate'] != undefined) ? data['bestStrikeRate'][0]['topPlayers'] : [];
				
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','SR','I','NO','R','HS','AVG','BF','100','50','4S','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','sr','inns','no','r','hs','a','b','100s','50s','4s','6s'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','SR'];
					battingStatskeyVal=['pos','StrikerName','m','sr'];
				}
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="HIGHEST STRIKE RATE (TOURNAMENT)";
			}
			if(stType=='hsri'){
				tourBattingStats=(data['bestStrikeRate'] != undefined) ? data['bestStrikeRate'][0]['topPlayers'] : [];
				
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','SR','R','BF','4S','6S','AGAINST','VENUE','DATE'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','sr','r','b','4s','6s','AgainstTeamName','VenueName','MatchDate'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','SR'];
					battingStatskeyVal=['pos','StrikerName','m','sr'];
				}
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else if(j ==9)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['opposition']['abbreviation'];
						else if(j ==10)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['venue']['city'];
						else if(j ==11){
							var date = new Date(tourBattingStats[i]['matchDate']);
							var m = date.getMonth();
							var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
                    		//	date = date.split('T');  
								tourBattingData[i][j]['kpi']=date.getDate()+' '+monthAr[m]+' '+date.getFullYear();
						}	
						else{
							if(battingStatskeyVal[j] == 'MatchDate'){
								var date = tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBat="HIGHEST STRIKE RATE (INNINGS)";
			}
			if(stType=='bba'){
				tourBattingStats=(data['bestAverage'] != undefined) ? data['bestAverage'][0]['topPlayers'] : [];
				
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','AVG','I','NO','R','HS','BF','SR','100','50','4S','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','a','inns','no','r','hs','b','sr','100s','50s','4s','6s'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','AVG'];
					battingStatskeyVal=['pos','StrikerName','m','a'];
				}
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="BEST BATTING AVERAGE";
			}
			if(stType=='ms'){
				tourBattingStats=(data['mostSixes'] != undefined) ? data['mostSixes'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','6S','I','NO','R','HS','AVG','BF','SR','100','50','4S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','6s','inns','no','r','hs','a','b','sr','100s','50s','4s'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','6S'];
					battingStatskeyVal=['pos','StrikerName','m','6s'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST SIXES";
			}
			if(stType=='msi'){
				tourBattingStats=(data['mostSixes'] != undefined) ? data['mostSixes'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','6S','I','NO','R','AVG','BF','SR','100','50','4S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','6s','inns','no','r','a','b','sr','100s','50s','4s'];
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','6S'];
					battingStatskeyVal=['pos','StrikerName','m','6s'];	
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST SIXES (INNINGS)";
			}

			if(stType=='mf'){
				tourBattingStats=(data['mostFours'] != undefined) ? data['mostFours'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','4S','I','NO','R','HS','AVG','BF','SR','100','50','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','4s','inns','no','r','hs','a','b','sr','100s','50s','6s'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','4S'];
					battingStatskeyVal=['pos','StrikerName','m','4s'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST FOURS";
			}
			if(stType=='mfi'){
				tourBattingStats=(data['mostFours'] != undefined) ? data['mostFours'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','4S','I','NO','R','AVG','BF','SR','100','50','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','4s','inns','no','r','a','b','sr','100s','50s','6s'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','4S'];
					battingStatskeyVal=['pos','StrikerName','m','4s'];
				}
			
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else 
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST FOURS (INNINGS)";
			}
			if(stType=='mff'){
				tourBattingStats=(data['mostFifties'] != undefined) ? data['mostFifties'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','50','I','NO','R','HS','AVG','BF','SR','100','4S','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','50s','inns','no','r','hs','a','b','sr','100s','4s','6s'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','50'];
					battingStatskeyVal=['pos','StrikerName','m','50s'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST FIFTIES";
			}
			if(stType=='mc'){
				tourBattingStats=(data['mostCenturies'] != undefined) ? data['mostCenturies'][0]['topPlayers'] : [];
				
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','100','I','NO','R','HS','AVG','BF','SR','50','4S','6S'];
					battingStatskeyVal=['pos','StrikerName','TeamName','m','100s','inns','no','r','hs','a','b','sr','50s','4s','6s'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','100'];
					battingStatskeyVal=['pos','StrikerName','m','100s'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBattingStats[i]['battingStats'][battingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBat="MOST CENTURIES";
			}
			if(stType=='ff'){
				tourBattingStats=(data['fastestFifties'] != undefined) ? data['fastestFifties'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','BALLS','OPPOSITION','VENUE','DATE','6S','4S','TOTAL'];
					battingStatskeyVal=['pos','StrikerName','TeamName','balls','AgainstTeamName','VenueName','MatchDate','sixes','fours','finalScore'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','BALLS','TOTAL'];
					battingStatskeyVal=['pos','StrikerName','balls','finalScore'];
				}
				
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else if(j ==4)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['opposition']['abbreviation'];
						else if(j ==5)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['venue']['city'];
						else if(j ==6){
							var date = new Date(tourBattingStats[i]['matchDate']);
							var m = date.getMonth();
							var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
                    		//	date = date.split('T');  
								tourBattingData[i][j]['kpi']=date.getDate()+' '+monthAr[m]+' '+date.getFullYear();
						}	
						else{
							if(battingStatskeyVal[j] == 'MatchDate'){
								var date = tourBattingStats[i]['fastestBuild'][battingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBattingStats[i]['fastestBuild'][battingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBat="FASTEST FIFTIES";
			}
			if(stType=='fc'){
				tourBattingStats=(data['fastestCenturies'] != undefined) ? data['fastestCenturies'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','BALLS','OPPOSITION','VENUE','DATE','6S','4S','TOTAL'];
					battingStatskeyVal=['pos','StrikerName','TeamName','balls','AgainstTeamName','VenueName','MatchDate','sixes','fours','finalScore'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','BALLS','TOTAL'];
					battingStatskeyVal=['pos','StrikerName','balls','finalScore'];	
				}
			
				for(var i=0; i<tourBattingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<battingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['team']['abbreviation'];
						else if(j ==4)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['opposition']['abbreviation'];
						else if(j ==5)
							tourBattingData[i][j]['kpi']= tourBattingStats[i]['venue']['city'];
						else if(j ==6){
							var date = new Date(tourBattingStats[i]['matchDate']);
							var m = date.getMonth();
							var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
                    		//	date = date.split('T');  
								tourBattingData[i][j]['kpi']=date.getDate()+' '+monthAr[m]+' '+date.getFullYear();
						}	
						else{
							if(battingStatskeyVal[j] == 'MatchDate'){
								var date = tourBattingStats[i]['fastestBuild'][battingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBattingStats[i]['fastestBuild'][battingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBat="FASTEST CENTURIES";
			}
			
			
			
			if(stType=='mw'){
				tourBowlingStats=(data['mostWickets'] != undefined) ? data['mostWickets'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','WKTS','I','O','R','BBI','AVG','ECON','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','w','inns','ov','r','bbiw','a','e','sr','4w','5w'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','WKTS'];
					bowlingStatskeyVal=['pos','BowlerName','m','w'];		
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST WICKETS";
			}
			if(stType=='ba'){
				tourBowlingStats=(data['bestAverage'] != undefined) ? data['bestAverage'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','AVG','I','O','R','BBI','WKTS','ECON','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','a','inns','ov','r','bbiw','w','e','sr','4w','5w'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','AVG'];
					bowlingStatskeyVal=['pos','BowlerName','m','a'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST BOWLING AVERAGE";
			}
			if(stType=='be'){
				tourBowlingStats=(data['bestEconomy'] != undefined) ? data['bestEconomy'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','ECON','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','e','inns','ov','r','bbiw','w','a','sr','4w','5w'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','ECON'];
					bowlingStatskeyVal=['pos','BowlerName','m','e'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST ECONOMY";
			}
			if(stType=='bei'){
				tourBowlingStats=(data['bestEconomy'] != undefined) ? data['bestEconomy'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','ECON','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','e','inns','ov','r','bbiw','w','a','sr','4w','5w'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','ECON'];
					bowlingStatskeyVal=['pos','BowlerName','m','e'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST ECONOMY (INNINGS)";
			}
			if(stType=='bsr'){
				tourBowlingStats=(data['bestStrikeRate'] != undefined) ? data['bestStrikeRate'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','SR','I','O','R','BBI','WKTS','AVG','ECON','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','sr','inns','ov','r','bbiw','w','a','e','4w','5w'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','SR'];
					bowlingStatskeyVal=['pos','BowlerName','m','sr'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST STRIKE RATE";
			}
			if(stType=='bsri'){
				tourBowlingStats=(data['bestStrikeRate'] != undefined) ? data['bestStrikeRate'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','SR','O','R','W','MD','AGAINST','VENUE','DATE'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','sr','ov','inns','w','maid','AgainstTeamName','VenueName','MatchDate'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','SR'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','sr'];
				}
			
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else if(j ==9)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['opposition']['abbreviation'];
						else if(j ==10)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['venue']['city'];
						else if(j ==11){
							var date = new Date(tourBowlingStats[i]['matchDate']);
							var m = date.getMonth();
							var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
                    		//	date = date.split('T');  
								tourBattingData[i][j]['kpi']=date.getDate()+' '+monthAr[m]+' '+date.getFullYear();
						}	
						else{
							if(bowlingStatskeyVal[j] == 'MatchDate'){
								var date = tourBowlingStats[i]['bowlingStats']['bowlingStats'][bowlingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBow="BEST STRIKE RATE (INNINGS)";
			}
			if(stType=='mrc'){
				tourBowlingStats=(data['mostRuns'] != undefined) ? data['mostRuns'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','R','I','O','MDNS','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','r','inns','ov','maid','bbiw','w','a','sr','4w','5w'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','R'];
					bowlingStatskeyVal=['pos','BowlerName','m','r'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST RUNS CONCEDED";
			}
			if(stType=='mdb'){
				tourBowlingStats=(data['mostDotBalls'] != undefined) ? data['mostDotBalls'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','DOTS','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','d','inns','ov','r','bbiw','w','a','sr','4w','5w'];	
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','DOTS'];
					bowlingStatskeyVal=['pos','BowlerName','m','d'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST DOT BALLS";
			}
			if(stType=='mdbi'){
				tourBowlingStats=(data['mostDotBalls'] != undefined) ? data['mostDotBalls'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','DOTS','O','R','W','MD','AGAINST','VENUE','DATE'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','d','ov','inns','w','maid','AgainstTeamName','VenueName','MatchDate'];
				}
				else
				{
					battingStatsHeadTitle=['pos','player','M','DOTS'];
					bowlingStatskeyVal=['pos','BowlerName','m','d'];	
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else if(j ==9)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['opposition']['abbreviation'];
						else if(j ==10)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['venue']['city'];
						else if(j ==11){
							var date = new Date(tourBowlingStats[i]['matchDate']);
							var m = date.getMonth();
							var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
                    		//	date = date.split('T');  
								tourBattingData[i][j]['kpi']=date.getDate()+' '+monthAr[m]+' '+date.getFullYear();
						}	
						else{
							if(bowlingStatskeyVal[j] == 'MatchDate'){
								var date = tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBattingData[i][j]['kpi']=date[0];
							}
							else
								tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBow="MOST DOT BALLS (INNINGS)";
			}
			if(stType=='mmo'){
				tourBowlingStats=(data['mostMaidens'] != undefined) ? data['mostMaidens'][0]['topPlayers'] : [];
				if($(window).width() > 1024 || true)
				{
					battingStatsHeadTitle=['pos','player','Team','M','MD','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','m','maid','inns','ov','r','bbiw','w','a','sr','4w','5w'];	
				}	
				else
				{
					battingStatsHeadTitle=['pos','player','M','MD'];
					bowlingStatskeyVal=['pos','BowlerName','m','maid'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBattingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBattingData[i][j] = [];
						if(j ==0)
							tourBattingData[i][j]['kpi']= i+1;
						else if(j ==1)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['player']['fullName'];
						else if(j ==2 && $(window).width() > 1024)
							tourBattingData[i][j]['kpi']= tourBowlingStats[i]['team']['abbreviation'];
						else
							tourBattingData[i][j]['kpi']=tourBowlingStats[i]['bowlingStats'][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST MAIDEN OVERS BOWLED";
			}
			
			
			
			
			$scope.battingStatsHeadTitle=battingStatsHeadTitle;
			$scope.tourBattingStats=tourBattingStats;
			$scope.tourBattingData=tourBattingData;
			if(!$scope.$$phase){
				$scope.$apply();
		  	}
		  	$(".battingList li").removeClass('menuActive');
			if(targetId != '')
				$(".battingList li#"+targetId).addClass('menuActive');
			$(".pageloader").removeClass('active');
			
			
			
			
			setTimeout(function(){
				$(".nicescroll_content").getNiceScroll().hide();
                $(".nicescroll_content").getNiceScroll().resize();
                $(".nicescroll_content").getNiceScroll().show();
			},1000);
			
			if($(window).width() > 1024){
			 $([document.documentElement, document.body]).animate({
				        scrollTop: 0
				    }, 1000);
			}
		});
	}

	/******* get bowling stats ******/
	$scope.tstatsBowling=function(stType,jsonFname,obj){
		tourBowlingData = [];
		$(".pageloader").addClass('active');
		var targetId= '';
		if(obj != undefined)
			targetId=obj.currentTarget.id;

		$(".nicescroll_content").getNiceScroll().hide();
        $(".nicescroll_content").getNiceScroll().resize();
        $(".nicescroll_content").getNiceScroll().show();
		mcService.GetTourBowlingStats(competitionId,jsonFname,function(data){
			tourBowlingStats=data[jsonFname];
			if(stType=='mw'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','WKTS','I','O','R','BBI','AVG','ECON','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','Wickets','Innings','OversBowled','TotalRunsConceded','BBIW','BowlingAverage','EconomyRate','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','WKTS'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','Wickets'];		
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST WICKETS";
			}
			if(stType=='ba'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','AVG','I','O','R','BBI','WKTS','ECON','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','BowlingAverage','Innings','OversBowled','TotalRunsConceded','BBIW','Wickets','EconomyRate','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','AVG'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','BowlingAverage'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST BOWLING AVERAGE";
			}
			if(stType=='be'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','ECON','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','EconomyRate','Innings','OversBowled','TotalRunsConceded','BBIW','Wickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','ECON'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','EconomyRate'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST ECONOMY";
			}
			if(stType=='bei'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','ECON','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','EconomyRate','Innings','OversBowled','InningsRuns','BBIW','InningsWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','ECON'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','EconomyRate'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST ECONOMY (INNINGS)";
			}
			if(stType=='bsr'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','SR','I','O','R','BBI','WKTS','AVG','ECON','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','StrikeRate','Innings','OversBowled','TotalRunsConceded','BBIW','Wickets','BowlingAverage','EconomyRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','SR'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','StrikeRate'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="BEST STRIKE RATE";
			}
			if(stType=='bsri'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','SR','O','R','W','MD','AGAINST','VENUE','DATE'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','StrikeRate','OversBowled','InningsRuns','InningsWickets','Maidens','AgainstTeamName','VenueName','MatchDate'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','SR'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','StrikeRate'];
				}
			
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else{
							if(bowlingStatskeyVal[j] == 'MatchDate'){
								var date = tourBowlingStats[i][bowlingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBowlingData[i][j]['kpi']=date[0];
							}
							else
								tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBow="BEST STRIKE RATE (INNINGS)";
			}
			if(stType=='mrc'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','R','I','O','MDNS','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','InningsRuns','Innings','OversBowled','Maidens','BBIW','InningsWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','R'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','InningsRuns'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST RUNS CONCEDED";
			}
			if(stType=='mdb'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','DOTS','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','DotBallsBowled','Innings','OversBowled','TotalRunsConceded','BBIW','MatchWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','DOTS'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','DotBallsBowled'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST DOT BALLS";
			}
			if(stType=='mdbi'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','DOTS','O','R','W','MD','AGAINST','VENUE','DATE'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','DotBallsBowled','OversBowled','InningsRuns','InningsWickets','Maidens','AgainstTeamName','VenueName','MatchDate'];
				}
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','DOTS'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','DotBallsBowled'];	
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else{
							if(bowlingStatskeyVal[j] == 'MatchDate'){
								var date = tourBowlingStats[i][bowlingStatskeyVal[j]];
                    			date = date.split('T');  
								tourBowlingData[i][j]['kpi']=date[0];
							}
							else
								tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
						}
					}
				}
				$scope.tbSecTitleBow="MOST DOT BALLS (INNINGS)";
			}
			if(stType=='mmo'){
				if($(window).width() > 1024)
				{
					bowlingStatsHeadTitle=['pos','player','Team','M','MD','I','O','R','BBI','WKTS','AVG','SR','4W','5W'];
					bowlingStatskeyVal=['pos','BowlerName','TeamName','Matches','Maidens','Innings','OversBowled','TotalRunsConceded','BBIW','MatchWickets','BowlingAverage','StrikeRate','FourWickets','FiveWickets'];	
				}	
				else
				{
					bowlingStatsHeadTitle=['pos','player','M','MD'];
					bowlingStatskeyVal=['pos','BowlerName','Matches','Maidens'];
				}
				
				for(var i=0; i<tourBowlingStats.length; i++){
					tourBowlingData[i]=[];
					for(var j=0; j<bowlingStatskeyVal.length; j++){
						tourBowlingData[i][j] = [];
						if(j ==0)
							tourBowlingData[i][j]['kpi']= i+1;
						else
							tourBowlingData[i][j]['kpi']=tourBowlingStats[i][bowlingStatskeyVal[j]];
					}
				}
				$scope.tbSecTitleBow="MOST MAIDEN OVERS BOWLED";
			}
			$scope.bowlingStatsHeadTitle=bowlingStatsHeadTitle;
			$scope.tourBowlingStats=tourBowlingStats;
			$scope.tourBowlingData=tourBowlingData;
		
			if(!$scope.$$phase){
				$scope.$apply();
		  	}
		  	$(".bowlingList li").removeClass('menuActive');
			if(targetId != '')
				$(".bowlingList li#"+targetId).addClass('menuActive');
			$(".pageloader").removeClass('active');
			
			setTimeout(function(){
				$(".nicescroll_content").getNiceScroll().hide();
                $(".nicescroll_content").getNiceScroll().resize();
                $(".nicescroll_content").getNiceScroll().show();
			},1000);
		});

	}
	
	$scope.tBatKPIChange = function(params){
	}

	/******* get top players data ******/
	$scope.getIndivTopPlayerData=function(playerId,type,domElem){
		var curPlayerId = domElem.currentTarget.attributes[0].nodeValue;
		$("#mcBestPerformers .mcOtherTpp").removeClass("active");
		if(type=='toprungetters'){
			$scope.indivPlayerTR=$filter('filter')(topBattingPlayerList[0][type],playerId)[0];
			$("#TopRunGetterSMIPL .mcOtherTpp[data-id='"+curPlayerId+"']").addClass("active");
		}
		if(type=='highestSR'){
			$scope.indivPlayerHSR=$filter('filter')(topBattingPlayerList[0][type],playerId)[0];
			$("#higiestSrSMIPL .mcOtherTpp[data-id='"+curPlayerId+"']").addClass("active");
		}
		if(type=='highestWicket'){
			$scope.indivPlayerHW=$filter('filter')(topBowlingPlayerList[0][type],playerId)[0];
			$("#leadWcktTakersSMIPL .mcOtherTpp[data-id='"+curPlayerId+"']").addClass("active");
		}
		if(type=='economyRate'){
			$scope.indivPlayerER=$filter('filter')(topBowlingPlayerList[0][type],playerId)[0];
			$("#bestEconSMIPL .mcOtherTpp[data-id='"+curPlayerId+"']").addClass("active");
		}
		if(!$scope.$$phase){
			$scope.$apply();
	  	}
	}

	/******* live score refreshing  script ******/
	$scope.getLiveScore=function(cId,pageType){
		mcService.GetMatchSchedule(cId,function(data){
			// liveDataList=(data.Live != undefined) ? data.Live : $filter("filter")(data.Matchsummary,{MatchStatus:"Live"});
			// upcomDataList=(data.Fixtures != undefined) ? data.Fixtures : $filter("filter")(data.Matchsummary,{MatchStatus:"Upcoming"});
			matchscheduleData = (data.Matchsummary != undefined) ? data.Matchsummary : ((data.Result != undefined) ? data.Result : []);	

			if(matchscheduleData.length == 0)
			{
				$scope.fixtureTabLink=true;
				$scope.resultTabLink=true;
				$("#errMsg").html("No Matches Found");
				return;
			}
			
			if(filterteam != undefined && filterteam != ''){
				var filterMSchedule = [];
				matchscheduleData.map(function(item){
					if(item.FirstBattingTeamID == filterteam || item.SecondBattingTeamID == filterteam)
						filterMSchedule.push(item);
				});
				matchscheduleData = filterMSchedule;
			}
			

			if(!showMatchOrder)
			{
				if(matchscheduleData != undefined && matchscheduleData.length > 0)
				{
					matchscheduleData.map(function(item){
						item.MatchOrder = "";
					});
				}
			}
			liveDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Live"});
			resultDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Post"});
			// upcomDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Upcoming"});

			if(upcomDataList != undefined && upcomDataList.length > 0 && showLiveMatchBasedOnZoneTime)
			{
				var liveMIds = [];
				for(var l=0;l<liveDataList.length;l++){
					liveMIds.push(liveDataList[l].MatchID);
				}
				upcomDataList.map(function(item){
					if(item.MatchStatus == 'Live' && jQuery.inArray(item.MatchID, liveMIds ) == '-1' && jQuery.inArray(item.FixtureID, liveMIds ) == '-1' ){
						liveDataList.push(item);							
					}
						
				});
			}
			
			$scope.liveList=liveDataList;
			// $scope.fixtureList=upcomDataList;
			$scope.resultList=resultDataList;
			liveData=(liveDataList[0]!=undefined)? liveDataList[0].MatchID : 0;
			if(liveData==0){
				$scope.liveTab=false;
				if(resultDataList != undefined && resultDataList.length > 0 && pageType!="fixtures")
				{
					$scope.fixtureTab=false;
					$scope.resultTab=true;
					$("#mcFilterBtn li.mnActive").removeClass('mnActive');
					$("#mcMenuWrapper .mcTabs li").removeClass('current');
					$("#mcFilterBtn li[data-value='result']").addClass('mnActive');
					$("#mcMenuWrapper .mcTabs li[data-value='result']").addClass('current');
				}
				else
				{
					$scope.fixtureTab=true;
					$scope.resultTab=false;
					$("#mcFilterBtn li.mnActive").removeClass('mnActive');
					$("#mcMenuWrapper .mcTabs li").removeClass('current');
					$("#mcFilterBtn li[data-value='fixture']").addClass('mnActive');
					$("#mcMenuWrapper .mcTabs li[data-value='fixture']").addClass('current');
				}
			}
			else{
				$scope.liveTab=true;
				$scope.fixtureTab=false;
				$scope.resultTab=false;
				$("#mcFilterBtn li.mnActive").removeClass('mnActive');
				$("#mcMenuWrapper .mcTabs li").removeClass('current');
				$("#mcFilterBtn li[data-value='live']").addClass('mnActive');
				$("#mcMenuWrapper .mcTabs li[data-value='live']").addClass('current');
			}
			var allMatches = [];
			if(liveDataList != undefined && liveDataList.length > 0){
				liveDataList.map(function(item){
					var matchDateTime = item.MatchDate+" "+item.MatchTime;
					var d = new Date(matchDateTime).getTime() / 1000;
					item.timestamp = d;
					allMatches.push(item);
				});										
			}
			if(upcomDataList != undefined && upcomDataList.length > 0){
				upcomDataList.map(function(item){
					var matchDateTime = item.MatchDate+" "+item.MatchTime;
					var d = new Date(matchDateTime).getTime() / 1000;
					item.timestamp = d;
					allMatches.push(item);
				});										
			}
			if(resultDataList != undefined && resultDataList.length > 0){
				resultDataList.map(function(item){
					var matchDateTime = item.MatchDate+" "+item.MatchTime;
					var d = new Date(matchDateTime).getTime() / 1000;
					item.timestamp = d;
					allMatches.push(item);
				});										
			}
			$scope.allMatches = allMatches;
			if (!$scope.$$phase) {
	            $scope.$apply();
            }
		});
	}
	/*******change tab ******/
	$scope.changeMatchBlk=function(type){
		$(".winlossPercentMeter").addClass("inactive");
		$("#errMsg").html("");
		$scope.showstandings=false;
		$scope.showtourstats=false;
		$scope.showplayerstats=false;
		$scope.showteamstats = false;
		$scope.showteamsquads = false;
		$scope.showFixture=true;
		$scope.showscorecard=false;
		$scope.showAllStats = false;
		$scope.noTstats = false;
		$scope.noTeamstats = false;
		$scope.noPlayerStats = false;
		$(".nostandings").addClass("inactive");
		if(type=='upcoming')
			type='fixture';
		if(type=='fixture'){
			urlString = "fixtures";
			$scope.fixtureTab=true;
			$scope.liveTab=false;
			$scope.resultTab=false;
			/******* clear live score  refreshing function *******/
			clearInterval(liveInterval);
			if(cloudFirestore)
					firebaseSRef();
			if($scope.liveBriefWidget)
				$scope.showscorecard=false;
		}
		else if(type=='live'){
			urlString = "fixtures";
			competitionId=$(".mcSelectDefault.mcSearchCompetition").attr("data-comid");
			$scope.liveTab=true;
			$scope.fixtureTab=false;
			$scope.resultTab=false;
			if(liveData!=0){
				clearInterval(liveInterval);
				if(cloudFirestore)
					firebaseSRef();
				if(!cloudFirestore){
					liveInterval=setInterval(function(){
						$scope.getLiveScore(competitionId); // calling live score  refreshing function
					},15000);
				}
				else{
					firebaseSRef = cloudFirestoreDB.collection("matchstatus")
				    .onSnapshot(function(doc) {
				        if(firebaseSObjChange)
							$scope.getLiveScore(competitionId);
				    });
				}
			}
			if($scope.liveBriefWidget)
				$scope.showscorecard=true;
		}
		else if(type=='result'){
			urlString = "fixtures";
			$scope.resultTab=true;
			$scope.liveTab=false;
			$scope.fixtureTab=false;
			/******* calling live score  refreshing function *******/
			clearInterval(liveInterval);
			if(cloudFirestore)
				firebaseSRef();
			if($scope.liveBriefWidget)
				$scope.showscorecard=false;
		}
		$scope.getSidebarWidget("fixtures");
		//$scope.showFixture=true;
		setTimeout(function(){
			$("#mcFilterBtn li").removeClass('mnActive');
			$("#mcMenuWrapper .mcTabs li").removeClass('current');
			$("#mcFilterBtn li[data-value='"+type+"']").addClass('mnActive');
			$("#mcMenuWrapper .mcTabs li[data-value='"+type+"']").addClass('current');
		},100);
		setTimeout(function(){
			$(".nicescroll_content").getNiceScroll().hide();
            $(".nicescroll_content").getNiceScroll().resize();
            $(".nicescroll_content").getNiceScroll().show();
		},500);
		if (!$scope.$$phase) {
	        $scope.$apply();
        }
        $scope.setFullwidth(type);
	}
	/********* check points entry*********/

	$scope.isNotNull=function(data,chkUrl){
		if(data===null || data==='' || data== undefined){
			return false;
		}
		else {
			if(chkUrl)
				return $scope.chlUrl(data);
			else
			  return true;
		}
	} 
	$scope.chlUrl=function(data){
		var getUrl = data.substring(0, 4);
		
		if(getUrl=='http')
			return true;
		else
			return false;
	}
	$scope.bindBriefScore=function(teamId,MatchDetail){
		if(teamId == MatchDetail.FirstInningsBattingTeamID)
		{
			if(MatchDetail.FirstBattingScore != null && MatchDetail.FirstBattingScore != ''){
				if(MatchDetail.MatchType == 'Live')
				{
					$scope.liveInn1 = 'mcCurrentPlay';
					if($scope.liveInn2 != '' && $scope.liveInn2 != undefined) 
						$scope.liveInn1 ='';
				}
				
				return 	MatchDetail.FirstBattingScore+"/"+MatchDetail.FirstBattingWickets+" ("+MatchDetail.FirstBattingOvers+" Ov)";
			}
			else
				return '';
		}
		else if(teamId == MatchDetail.SecondInningsBattingTeamID)
		{
			if(MatchDetail.SecondBattingScore != null && MatchDetail.SecondBattingScore != '')
			{
				if(MatchDetail.MatchType == 'Live')
				{
					$scope.liveInn1 = '';
					$scope.liveInn2 = 'mcCurrentPlay';
				}				
				return 	MatchDetail.SecondBattingScore+"/"+MatchDetail.SecondBattingWickets+" ("+MatchDetail.SecondBattingOvers+" Ov)";
			}
			else
				return '';
		}
		else
			return '';
	}	

	$scope.checkCompetitionSoure = function(){
		if($scope.selectedCompetition.CodingType == 'T20Pro')
		{
			if($scope.selectedCompetition.feedsource != undefined && $scope.selectedCompetition.feedsource != '')
				feedSource = $scope.selectedCompetition.feedsource;
			t20lite = false;
			$scope.teamstatsMenu = false;
			$scope.squadsmenu = squadsmenu;
			$scope.standingsMenu = false;
			$scope.analytics_menu = analytics_menu;
			
		}
		else if($scope.selectedCompetition.CodingType == 'T20Lite'){
			if($scope.selectedCompetition.feedsource != undefined && $scope.selectedCompetition.feedsource != '')
				feedSource = $scope.selectedCompetition.feedsource;
			t20lite = true;
			$scope.squadsmenu =false;
			$scope.teamstatsMenu = teamstatsMenu;
			$scope.analytics_menu = analytics_menu;
			
			$scope.standingsMenu = standingsMenu;
			if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
				$scope.standingsMenu = false;
			else
				$scope.standingsMenu = standingsMenu;
			
			$(".winlossPercentMeter").addClass("inactive");
		}
	}

	/********* change divsion *********/
	$scope.changeDivision=function(divId){
		if(divId == "alllivematches")
		{
			$scope.getMatches("divfilter");
			clearInterval(listenAllLiveMatRefersh);
			 return;
		}
		else
		{
			$scope.callFromTemplate = "";
			clearInterval(listenAllLiveMatRefersh);
			$scope.showCompetitionList = showCompetitionList;
		}
		$(".winlossPercentMeter").addClass("inactive");
		$("#errMsg").html("");
		divisonId = divId;
		selectedComList=$filter('filter')(competitionList,{DivisionID:divId,SeasonID:seasonId},true);
		
		var recentcompetitionList = [];
		var viewCurrentSeason = false;
		if(seasonId == seasonList[0].SeasonID)
			viewCurrentSeason = true;
		if(competitionList != undefined && competitionList.length > 0 && showRecentMatchesOnLoad && viewCurrentSeason)
		{
			var divInx = 0;
			competitionList.map(function(item){
				if(item.LastMatchDate != undefined && item.LastMatchDate != ""){
					var lastMatchDateTimestamp = new Date(item.LastMatchDate).getTime() / 1000;
					item.LastMatchDateTimestamp = lastMatchDateTimestamp;
					if(item.SeasonID == seasonId && item.OnGoing == 1 && item.DivisionID == divId){
						recentcompetitionList.push(item);
						divInx++;
					}
				}
				else
					item.LastMatchDateTimestamp=0;
				
			});

			if(recentcompetitionList.length == 0 && competitionList[0] != undefined && competitionList[0]["LastMatchDateTimestamp"] != undefined)
			{
				var orderedCompList = $filter('orderBy')(competitionList, '-LastMatchDateTimestamp');
				var divInx = 0;
				orderedCompList.map(function(item){
					if(item.SeasonID == seasonId && item.DivisionID == divId)
					{
						recentcompetitionList.push(item);
						divInx++;
					}
				});
			}
			
		}
		
		competitionId= (recentcompetitionList != undefined && recentcompetitionList.length > 0) ? recentcompetitionList[0].CompetitionID : selectedComList[0].CompetitionID;
		$scope.selectedCompetition= (recentcompetitionList != undefined && recentcompetitionList.length > 0) ? recentcompetitionList[0] : selectedComList[0];

		if(liveComlist.length!=0){

			for(var i=0;i<liveComlist.length;i++)
			{
				var lcompetitionId=liveComlist[i].CompetitionID;
				for(j=0;j<selectedComList.length;j++)
				{
					var sCId = selectedComList[j].CompetitionID;
					if(lcompetitionId == sCId)
					{
						$scope.selectedCompetition=selectedComList[j];	
						competitionId = sCId;
						break;
					}
				}
			}
			
		}
		
		if($scope.selectedCompetition.statsFeed != undefined && $scope.selectedCompetition.statsFeed != '')
				statsFeed = $scope.selectedCompetition.statsFeed;
		if($scope.selectedCompetition.statsCoding != undefined && $scope.selectedCompetition.statsCoding != '')
				statsCoding = $scope.selectedCompetition.statsCoding;
		if($scope.selectedCompetition.statsCID != undefined && $scope.selectedCompetition.statsCID != '')
					statsCID = $scope.selectedCompetition.statsCID;		
		if($scope.selectedCompetition.AnalyticsFeed != undefined && $scope.selectedCompetition.AnalyticsFeed != '')
			AnalyticsFeed = $scope.selectedCompetition.AnalyticsFeed;	

		if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
					$scope.standingsMenu = false;
		
		$scope.checkCompetitionSoure();
		
		$(".mcSelectDefault.mcSearchCompetition").attr("data-comId",competitionId);
		
		//Empty keyperformers,standings data for to refresh the data based on competition
		keyperformersList = [];standings= [];
		if(liveComlist.length!=0 && false){
			competitionId=liveComlist[0].CompetitionID;
			var selectedLiveComList=$filter('filter')(selectedComList,{CompetitionID:competitionId});
			if(selectedLiveComList.length>0)
				$scope.selectedCompetition=selectedLiveComList[0];
		}
		$scope.competitionId = competitionId;
		$scope.selectedComList=selectedComList;
		$scope.competitionType = ($scope.selectedCompetition["CompetitionType"] != undefined) ? $scope.selectedCompetition["CompetitionType"] : '';
		if($("#mcFilterBtn li.mnActive").length > 0)
			urlString = $("#mcFilterBtn li.mnActive").attr("data-value");
		if($("#mcMenuWrapper .mcTabs li.current").length > 0)
			urlString = $("#mcMenuWrapper .mcTabs li.current").attr("data-value");
		if(urlString == 'live' || urlString == 'fixture' || urlString == 'result')
			urlString = "fixtures";
		if($scope.curSeasonId!=7)
			urlString="fixtures";

		urlString = "fixtures";
		// viewCateg = "result";
		if(callFromTemplate == "tourstats")
			urlString = "tourstats";

		if(widgetViewType == "tourstats")
			urlString = "tourstats";
		if(widgetViewType == "teamstats")
			urlString = "teamstats";
		if(widgetViewType == "teamDetailStats")
			urlString = "teamDetailStats";
		if(widgetViewType == "standings")
			urlString = "standings";
		
		$scope.noTstats = false;
		$scope.showAllStats = false;
		$scope.noTeamstats = false;
		$scope.noPlayerStats = false;
		setTimeout(function(){
			$(".nicescroll_content").getNiceScroll().hide();
            $(".nicescroll_content").getNiceScroll().resize();
            $(".nicescroll_content").getNiceScroll().show();
		},500);
		$(".nostandings").addClass("inactive");
		if(!seasonChange)
			viewCateg = "all";
		$scope.bindResult(competitionId,urlString);
		
        $(".mcYearArch li").removeClass('active');
		$(".mcYearArch li[data-value='"+divId+"']").addClass('active');
		if (!$scope.$$phase) {
            $scope.$apply();
        }
        clearInterval(liveInterval);
        if(cloudFirestore)
			firebaseSRef();
        if(liveData!=0 && liveTab){
			// liveInterval=setInterval(function(){
			// 		$scope.getLiveScore(competitionId); // calling live score  refreshing function
			// },15000);
			if(!cloudFirestore){
				liveInterval=setInterval(function(){
					$scope.getLiveScore(competitionId); // calling live score  refreshing function
				},15000);
			}
			else{
				firebaseSRef = cloudFirestoreDB.collection("matchstatus")
			    .onSnapshot(function(doc) {
			        if(firebaseSObjChange)
							$scope.getLiveScore(competitionId);
			    });
			}
		}
	}

	$scope.changeSeason=function(){
		clearInterval(listenAllLiveMatRefersh);
		$(".pageloader").addClass('active');
		if($scope.selectedSeason == undefined || $scope.selectedSeason.SeasonID == undefined) return;
		var sid = $scope.selectedSeason.SeasonID;
		seasonChange = true;
		$("#errMsg").html("");
		seasonId = sid;
		$scope.curSeasonId=sid;
		$(".seasonList li").removeClass("active");
		$(".seasonList li[data-id='"+sid+"']").addClass("active");
		divisionList=$filter('filter')(tourDetails.division,{SeasonID:sid},true);
		
		var divisionListRcentList = [];
		var alldivisionsList = divisionList;
		var viewCurrentSeason = false;
		if(seasonId == seasonList[0].SeasonID)
			viewCurrentSeason = true;
		if(alldivisionsList != undefined && alldivisionsList.length > 0 && showRecentMatchesOnLoad && viewCurrentSeason)
		{
			var divInx = 0;
			alldivisionsList.map(function(item){
				if(item.LastMatchDate != undefined && item.LastMatchDate != ""){
					var lastMatchDateTimestamp = new Date(item.LastMatchDate).getTime() / 1000;
					item.LastMatchDateTimestamp = lastMatchDateTimestamp;
					if(item.SeasonID == seasonId && item.OnGoing == 1){
						divisionListRcentList.push(item);
						divInx++;
					}
				}
				
			});
		}
		if((divisionListRcentList == undefined || divisionListRcentList.length == 0) && showRecentMatchesOnLoad && viewCurrentSeason)
		{
			if(alldivisionsList != undefined && alldivisionsList.length > 0 && alldivisionsList[0].LastMatchDateTimestamp != undefined)
			{
				var orderedDivList = $filter('orderBy')(alldivisionsList, '-LastMatchDateTimestamp');
				var divInx = 0;
				orderedDivList.map(function(item){
					if(item.SeasonID == seasonId)
					{
						divisionListRcentList.push(item);
						divInx++;
					}
				});
			}
		}
		
		divisonId= (divisionListRcentList != undefined && divisionListRcentList.length > 0) ? divisionListRcentList[0].DivisionID : divisionList[0].DivisionID;

		var liveCompInSelSeason = false;
		if(liveComlist.length!=0){
			for(var i=0;i<liveComlist.length;i++)
			{
				var lcompetitionId=liveComlist[i].CompetitionID;
				for(j=0;j<competitionList.length;j++)
				{
					var sCId = competitionList[j].CompetitionID;
					if(lcompetitionId == sCId && competitionList[j].SeasonID == seasonId)
					{
						divisonId = competitionList[j].DivisionID;
						competitionId = sCId;
						liveCompInSelSeason = true;
						break;
					}
				}
			}
		}

		if(liveCompInSelSeason && showAllLiveMatches)
		{
			divId = divisonId;

			$scope.divisionList=divisionList;
			var selectedDivision = $filter('filter')(divisionList,{DivisionID:divisonId,SeasonID:seasonId},true);
			$scope.selectedDivision  = (selectedDivision[0] != undefined) ? selectedDivision[0] : divisionList[0];
			
			selectedComList=$filter('filter')(competitionList,{DivisionID:divisonId,SeasonID:seasonId},true);
		
			var recentcompetitionList = [];
			var viewCurrentSeason = false;
			if(seasonId == seasonList[0].SeasonID)
				viewCurrentSeason = true;
			if(competitionList != undefined && competitionList.length > 0 && showRecentMatchesOnLoad && viewCurrentSeason)
			{
				var divInx = 0;
				competitionList.map(function(item){
					if(item.LastMatchDate != undefined && item.LastMatchDate != ""){
						var lastMatchDateTimestamp = new Date(item.LastMatchDate).getTime() / 1000;
						item.LastMatchDateTimestamp = lastMatchDateTimestamp;
						if(item.SeasonID == seasonId && item.OnGoing == 1 && item.DivisionID == divisonId){
							recentcompetitionList.push(item);
							divInx++;
						}
					}
					else
						item.LastMatchDateTimestamp=0;
					
				});

				if(recentcompetitionList.length == 0 && competitionList[0] != undefined && competitionList[0]["LastMatchDateTimestamp"] != undefined)
				{
					var orderedCompList = $filter('orderBy')(competitionList, '-LastMatchDateTimestamp');
					var divInx = 0;
					orderedCompList.map(function(item){
						if(item.SeasonID == seasonId && item.DivisionID == divisonId)
						{
							recentcompetitionList.push(item);
							divInx++;
						}
					});
				}
				
			}
			
			competitionId= (recentcompetitionList != undefined && recentcompetitionList.length > 0) ? recentcompetitionList[0].CompetitionID : selectedComList[0].CompetitionID;
			$scope.selectedCompetition= (recentcompetitionList != undefined && recentcompetitionList.length > 0) ? recentcompetitionList[0] : selectedComList[0];

			if(liveComlist.length!=0){

				for(var i=0;i<liveComlist.length;i++)
				{
					var lcompetitionId=liveComlist[i].CompetitionID;
					for(j=0;j<selectedComList.length;j++)
					{
						var sCId = selectedComList[j].CompetitionID;
						if(lcompetitionId == sCId)
						{
							$scope.selectedCompetition=selectedComList[j];	
							competitionId = sCId;
							break;
						}
					}
				}
				
			}
			
			if($scope.selectedCompetition.statsFeed != undefined && $scope.selectedCompetition.statsFeed != '')
					statsFeed = $scope.selectedCompetition.statsFeed;
			if($scope.selectedCompetition.statsCoding != undefined && $scope.selectedCompetition.statsCoding != '')
					statsCoding = $scope.selectedCompetition.statsCoding;
			if($scope.selectedCompetition.statsCID != undefined && $scope.selectedCompetition.statsCID != '')
						statsCID = $scope.selectedCompetition.statsCID;		
			if($scope.selectedCompetition.AnalyticsFeed != undefined && $scope.selectedCompetition.AnalyticsFeed != '')
				AnalyticsFeed = $scope.selectedCompetition.AnalyticsFeed;	
			
			$scope.checkCompetitionSoure();
			
			$(".mcSelectDefault.mcSearchCompetition").attr("data-comId",competitionId);
			
			//Empty keyperformers,standings data for to refresh the data based on competition
			keyperformersList = [];standings= [];
			if(liveComlist.length!=0 && false){
				competitionId=liveComlist[0].CompetitionID;
				var selectedLiveComList=$filter('filter')(selectedComList,{CompetitionID:competitionId});
				if(selectedLiveComList.length>0)
					$scope.selectedCompetition=selectedLiveComList[0];
			}
			$scope.competitionId = competitionId;
			$scope.selectedComList=selectedComList;
			$scope.competitionType = ($scope.selectedCompetition["CompetitionType"] != undefined) ? $scope.selectedCompetition["CompetitionType"] : '';



			$scope.getMatches('init');
			return;
		}
		
		
		if($scope.callFromTemplate == 'alllivematches' && selDivCompetition[0] != undefined && selDivCompetition[0].SeasonID == seasonId)
			divisonId = "alllivematches";
		
		$scope.changeDivision(divisonId);
		$scope.divisionList=divisionList;
		var selectedDivision = $filter('filter')(divisionList,{DivisionID:divisonId,SeasonID:seasonId},true);
		$scope.selectedDivision  = (selectedDivision[0] != undefined) ? selectedDivision[0] : divisionList[0];
		
		if (!$scope.$$phase) {
            $scope.$apply();
        }
        
        var listenDivision=setInterval(function(){
        	clearInterval(listenDivision);
        	if($(".mcYearArch li").length>0){
				divSlider.reloadSlider();
				$(".mcYearArch li").removeClass('active');
	  			$(".mcYearArch li[data-value='"+divisonId+"']").addClass('active');
			}
        },1000);
	}

	/********* change competition *********/
	$scope.changeCompetition=function(comId){
		if(comId.CompetitionID == "alllivematches")
		{
			$scope.getMatches("compfilter");
			clearInterval(listenAllLiveMatRefersh);
			 return;
		}
		else
		{
			if(widgetViewType != "tourstats" && widgetViewType != "teamstats" && widgetViewType != "teamDetailStats" && widgetViewType != "playerstats" && widgetViewType != "standings")
				$scope.callFromTemplate = "";
			clearInterval(listenAllLiveMatRefersh);
		}
		$scope.selectedCompetition = comId;

		$("#errMsg").html("");
		$(".pageloader").addClass('active');
		competitionId=(comId.CompetitionID != undefined) ? comId.CompetitionID : "";
		$scope.competitionType = (comId.CompetitionType != undefined) ? comId.CompetitionType : "";
		if(competitionId == "5c967ceb08a14366")
			$scope.squadsmenu = false;
		else
		{
			if(typeof squadsmenu == "undefined") 
				$scope.squadsmenu = false;
			else if($scope.selectedCompetition.CodingType == 'T20Pro')
				$scope.squadsmenu = squadsmenu;
		}

		$scope.checkCompetitionSoure();

		$(".mcSelectDefault.mcSearchCompetition").attr("data-comId",competitionId);
		
		//Empty keyperformers,standings data for to refresh the data based on competition
		keyperformersList = [];standings = [];
		urlString = "fixtures";

		if(widgetViewType == "tourstats")
			urlString = "tourstats";
		if(widgetViewType == "teamstats")
			urlString = "teamstats";
		if(widgetViewType == "teamDetailStats")
			urlString = "teamDetailStats";
		if(widgetViewType == "standings")
			urlString = "standings";
		$scope.noTstats = false;
		$scope.showAllStats = false;
		$scope.noTeamstats = false;
		$scope.noPlayerStats = false;
		if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
			$scope.standingsMenu = false;
		setTimeout(function(){
			$(".nicescroll_content").getNiceScroll().hide();
            $(".nicescroll_content").getNiceScroll().resize();
            $(".nicescroll_content").getNiceScroll().show();
		},500);
		$(".nostandings").addClass("inactive");
		if(!seasonChange)
			viewCateg = "all";

		if($scope.selectedCompetition.statsFeed != undefined && $scope.selectedCompetition.statsFeed != '')
				statsFeed = $scope.selectedCompetition.statsFeed;
		if($scope.selectedCompetition.statsCoding != undefined && $scope.selectedCompetition.statsCoding != '')
				statsCoding = $scope.selectedCompetition.statsCoding;
		if($scope.selectedCompetition.statsCID != undefined && $scope.selectedCompetition.statsCID != '')
			statsCID = $scope.selectedCompetition.statsCID;

		if($scope.selectedCompetition.AnalyticsFeed != undefined && $scope.selectedCompetition.AnalyticsFeed != '')
				AnalyticsFeed = $scope.selectedCompetition.AnalyticsFeed;

		$scope.bindResult(competitionId,urlString);
		clearInterval(liveInterval);
		if(cloudFirestore)
			firebaseSRef();
		if(liveData!=0 && liveTab){
			// liveInterval=setInterval(function(){
			// 	$scope.getLiveScore(competitionId); // calling live score  refreshing function
			// },15000);
			if(!cloudFirestore){
				liveInterval=setInterval(function(){
					$scope.getLiveScore(competitionId); // calling live score  refreshing function
				},15000);
			}
			else{
				firebaseSRef = cloudFirestoreDB.collection("matchstatus")
			    .onSnapshot(function(doc) {
			        if(firebaseSObjChange)
							$scope.getLiveScore(competitionId);
			    });
			}
		}
	}

	/******* get player List based on team and competition Id ******/
	$scope.getPlayerList=function(cId,teamId,type){
		$("#plyRotateSmipl").html("");
		mcService.GetPlayerStats(cId,teamId,function(data){
			playersData=data.playerstats;
			if(playersData.length>0)
			{
				$(".errMsg").html("");
				$("#plyRotateSmipl").removeClass('hide');
				$(".mcPlyStatsHeader").removeClass('hide');
				$(".mcPlyStatsContent").removeClass('hide');
			}
			else
			{
				$scope.showplayerstats=false;
				$("#plyRotateSmipl").addClass('hide');
				$(".mcPlyStatsHeader").addClass('hide');
				$(".mcPlyStatsContent").addClass('hide');
				$("#errMsg").html("No Stats Found");
				return;
			}
			$scope.showplayerstats=true;
			$scope.playersData=playersData;
			var $bindPlayers="<div class='mcPlyRotList'>";
			for(var i=0; i<playersData.length; i++){
				var playerImg=($scope.isNotNull(playersData[i].profileimg) && playersData[i].profileimg != "no_image.html") ? playerImgPath+playersData[i].profileimg : $scope.basepath+"images/placeholder.png";
				
				$bindPlayers+="<div class='mcPlythumb' ng-click='getPlayerScores(\""+playersData[i].PlayerID+"\",\""+playersData[i].TeamID+"\",\"changeplayer\")'><a data-playId="+playersData[i].PlayerID+"><img src='"+playerImg+"' onerror=\"this.src = 'images/placeholder.png';\" /><span>"+playersData[i].PlayerName+"<i>"+playersData[i].Specialization+"</i></span></a></div>";
			}
			$bindPlayers = $compile($bindPlayers)($scope);
			if (!$scope.$$phase) {
           		 $scope.$apply();
        	}
      		$("#plyRotateSmipl").html($bindPlayers);
        	// List of Player Rolling Horizontal
        	var containerWdt = $("#playerStatsWrapper .mcContainer").width();
    		var windowWidth=$(window).width();
    		
			if(windowWidth<=1024){
				// var playerSlider=$('.mcPlyRotList').bxSlider({ infiniteLoop: false, slideWidth: containerWdt,  pager: false, responsive: true, hideControlOnEnd: true,
    //             autoControlsCombine: true, adaptiveWidth: true });		
			}
			else{
				var playerSlider=$('.mcPlyRotList').bxSlider({ infiniteLoop: false, slideWidth: containerWdt,  pager: false, responsive: true, hideControlOnEnd: true,
	                autoControlsCombine: true, adaptiveWidth: true,touchEnabled:false
	     //            onSlideBefore: function($slideElement, oldIndex, newIndex) {
						// $("#plyRotateSmipl .mcNextArrow").hide();
				  //   }, 
				  //   onSlideAfter: function($slideElement, oldIndex, newIndex) {
				  //       $("#plyRotateSmipl .mcNextArrow").show();
				  //   } 
	            });
			}
				

			
    		
    		//$('.fadeText').innerfade({ speed: '7000', timeout: 5000, type: 'random_start', containerheight: '42px' });
        	if(type=='change' || type=='init'){
        		var indvPlayerId=playersData[0].PlayerID;
        		var indvTeamId=playersData[0].TeamID;
        		var scType='init';
        	}
        	else if(type=='topplayer'){
        		var indvPlayerId=$(".mcTopPlayersList a.selItemActive").attr("data-pid");
        		var indvTeamId=teamId;
        		var scType=$(".mcTopPlayersList a.selItemActive").attr("data-ptype");
        		var keyVal=$(".mcSearchTeamKeys[data-teamId='"+indvTeamId+"']").attr("data-key");
        		$(".mcSelectDefault option[value='"+keyVal+"']").attr("selected","selected");
        		var totalSlides = parseInt(playersData.length / 3); 
        		setTimeout(function(){
        			var activePlayerIndex = $(".plyActive").parents('.mcPlythumb').index();
        			var slideCnt=parseInt(activePlayerIndex/3);
        			if(slideCnt>0)
        				playerSlider.goToSlide(slideCnt);
        		},1000);
        	}
        	if (!$scope.$$phase) {
           		 $scope.$apply();
        	}
        	if(fStats_playerId != undefined && fStats_playerId != '' && playersData != undefined && playersData.length > 0){
        		indvPlayerId = "noplayer";
        		playersData.map(function(item){
        			if(item.PlayerID == fStats_playerId)
        				indvPlayerId=item.PlayerID;
        		});
        	}
        	$scope.getPlayerInningsData(cId,teamId,indvPlayerId,scType);
        	$(".pageloader").removeClass('active');
		});
	}

	/********* change team *********/
	$scope.changeTeam=function(teamData){
		$(".mcSearchResults").val("");
		$(".pageloader").addClass('active');
		var teamId=teamData.TeamID;
		if($scope.searchPlayerName != undefined && $scope.searchPlayerName.PlayerName != undefined)
			$scope.searchPlayerName.PlayerName = '';
		$scope.getPlayerList(competitionId,teamId,'change');
	}

	$scope.getPlayerInningsData=function(cId,teamId,playerId,scType){
		mcService.GetPlayerInningsWiseStats(cId,teamId,function(data){
			playerBatWiseInnings=data.PlayerBattingKPI;
 			playerBowWiseInnings=data.PlayerBowlingKPI;
        	$scope.getPlayerScores(playerId,teamId,scType);
		});
	}

	/******* get individual player scores based on team and player Id ******/
	$scope.getPlayerScores=function(playerId,teamId,action){
		playerScoreData=$filter('filter')(playersData,{PlayerID:playerId,TeamID:teamId});
		$scope.playerScoreData=playerScoreData[0];
		$scope.noPlayerStats = false;
		$(".mcPlyOption").removeClass("inactive");
		if(playerScoreData[0]==undefined){
			$scope.noPlayerStats = true;
			$("#mcPlayerIndvStats .errMsg").html("Player statistics are currently not available");
			$("#playerStatsWrapper .errMsg").html("Player statistics are currently not available");
			$(".mcPlyStatsHeader").addClass('hide');
			$(".mcPlyStatsContent").addClass('hide');
			$scope.mcPlayerBattingStats=false;
		    $scope.mcPlayerBowlingStats=false;
	    	$scope.showStrikerInnBlk=false;
	    	$scope.showBowlerInnBlk=false;
		}
		else{
			$("#mcPlayerIndvStats .errMsg").html("");
			$(".mcPlyStatsHeader").removeClass('hide');
			$(".mcPlyStatsContent").removeClass('hide');
		 	/****innings wise player data****/
		 	var strikerInn1Data=$filter("filter")(playerBatWiseInnings,{PlayerID:playerId,InningsNo:1},true);
		 	$scope.strikerInn1Data = (strikerInn1Data != undefined && strikerInn1Data.length > 0) ? strikerInn1Data[0] : [];
			var strikerInn2Data=$filter("filter")(playerBatWiseInnings,{PlayerID:playerId,InningsNo:2},true);
			$scope.strikerInn2Data = (strikerInn2Data != undefined && strikerInn2Data.length > 0) ? strikerInn2Data[0] : [];
			var bowlerInn1Data=$filter("filter")(playerBowWiseInnings,{BowlerID:playerId,InningsNo:1},true);
			$scope.bowlerInn1Data = (bowlerInn1Data != undefined && bowlerInn1Data.length > 0) ? bowlerInn1Data[0] : [];
			var bowlerInn2Data=$filter("filter")(playerBowWiseInnings,{BowlerID:playerId,InningsNo:2},true);
			$scope.bowlerInn2Data = (bowlerInn2Data != undefined && bowlerInn2Data.length > 0) ? bowlerInn2Data[0] : [];
			$(".mcPlyOption span").removeClass("opActive");
			if(playerScoreData[0].Innings!=0){
				$scope.mcPlayerBattingStats=true;
			    $scope.mcPlayerBowlingStats=false;
		    	$scope.showStrikerInnBlk=true;
		    	$scope.showBowlerInnBlk=false;
		    	$(".mcPlyOption span.batOption").addClass("opActive");
		    	action = 'strikers';
			}
			else if(playerScoreData[0].InningsBowled!=0){
				$scope.mcPlayerBattingStats=false;
			    $scope.mcPlayerBowlingStats=true;
		    	$scope.showStrikerInnBlk=false;
		    	$scope.showBowlerInnBlk=true;
		    	$(".mcPlyOption span.bowOption").addClass("opActive");
		    	action = 'bowlers';
			}
			else{
				$scope.mcPlayerBattingStats=false;
			    $scope.mcPlayerBowlingStats=false;
		    	$scope.showStrikerInnBlk=false;
		    	$scope.showBowlerInnBlk=false;
		    	$(".mcPlyOption").addClass("inactive");
			}

			if(playerScoreData[0].InningsBowled==0){
				$(".mcPlyOption .bowOption").addClass("inactive");
			}
			else
			{
				$(".mcPlyOption .bowOption").removeClass("inactive");
			}

	    	if(action=='init')
	    		$(".mcPlyRotList .mcPlythumb:first-child a").addClass('plyActive');
	    	else{
	    		$(".mcPlyRotList .mcPlythumb a").removeClass('plyActive');
	    		$(".mcPlyRotList .mcPlythumb a[data-playId='"+playerId+"']").addClass('plyActive');
	    		$scope.showplayerstats=true;
		    	$scope.showFixture=false;
				$scope.showscorecard=false;
				$scope.showstandings=false;
				$scope.showtourstats=false;
				//window.scrollTo(0,0);
				$scope.activePlayerType(action);
	    	}
		}
		
    	if (!$scope.$$phase) {
           	$scope.$apply();
    	}
	}

	/******* active player type ******/
	$scope.activePlayerType=function(type){
		$(".mcPlyOption span").removeClass("opActive");
		if(type=="strikers"){
			$scope.mcPlayerBattingStats=true;
		    $scope.mcPlayerBowlingStats=false;
	    	$scope.showStrikerInnBlk=true;
	    	$scope.showBowlerInnBlk=false;
	    	$(".mcPlyOption span.batOption").addClass("opActive");
		}
		else if(type=="bowlers"){
			$scope.mcPlayerBattingStats=false;
		    $scope.mcPlayerBowlingStats=true;
	    	$scope.showStrikerInnBlk=false;
	    	$scope.showBowlerInnBlk=true;
	    	$(".mcPlyOption span.bowOption").addClass("opActive");
		}	
	}

	/******* change batting and bowling action ******/
	$scope.changePlayAction=function(action){
		if(action=='batOption'){
			$(".mcPlyOption span").removeClass("opActive");
			$(".mcPlyOption span."+action).addClass("opActive");
			$scope.mcPlayerBattingStats=true;
    		$scope.mcPlayerBowlingStats=false;
    		$scope.showStrikerInnBlk=true;
    		$scope.showBowlerInnBlk=false;
		}
		else{
			$(".mcPlyOption span").removeClass("opActive");
			$(".mcPlyOption span."+action).addClass("opActive");
			$scope.mcPlayerBattingStats=false;
    		$scope.mcPlayerBowlingStats=true;
    		$scope.showStrikerInnBlk=false;
    		$scope.showBowlerInnBlk=true;
		}
	}
	/******* get  player details  filter by name using watch ******/
	$scope.backToFixtures=function(){
		$scope.showscorecard=false;
		$scope.showFixture=true;
		$scope.showPTWidget=$scope.FindWidget(FixturePageSidewidgets,'standings');
		$scope.showLeadPlayes=$scope.FindWidget(FixturePageSidewidgets,'tstats');
		
		$scope.squad=false;
		$scope.showMDWidget=false;
		$scope.showPartnerShip=false;
		$scope.getSidebarWidget("fixtures");
		if(urlString=='scorecard'){
			var matchInResult = false;
			var matchInLive = false;
			var matchInUpcoming = false;
			if($scope.resultList != undefined && $scope.resultList.length > 0)
			{
				$scope.resultList.map(function(item){
					if(item.MatchID == matId)
					{
						matchInResult = true;
					}
				});
			}
			if($scope.liveList != undefined && $scope.liveList.length > 0)
			{
				$scope.liveList.map(function(item){
					if(item.MatchID == matId)
					{
						matchInLive = true;
					}
				});
			}
			$("#mcMenuWrapper .mcTabs li").removeClass("current");
			
			if(matchInLive){
				$("#mcMenuWrapper .mcTabs li[data-value='live']").addClass("current");
				$scope.liveTab=true;
				$scope.fixtureTab=false;
				$scope.resultTab=false;
			}
			else if(matchInResult){
				$("#mcMenuWrapper .mcTabs li[data-value='result']").addClass("current");
				$scope.liveTab=false;
				$scope.fixtureTab=false;
				$scope.resultTab=true;
			}
				
		}
		else
		{
			var matchInResult = false;
			var matchInLive = false;
			if($scope.resultList != undefined && $scope.resultList.length > 0)
			{
				matchInResult = true;
			}
			if($scope.liveList != undefined && $scope.liveList.length > 0)
			{
				matchInLive = true;
			}
			$("#mcMenuWrapper .mcTabs li").removeClass("current");
			
			if(matchInLive){
				$("#mcMenuWrapper .mcTabs li[data-value='live']").addClass("current");
				$scope.liveTab=true;
				$scope.fixtureTab=false;
				$scope.resultTab=false;
			}
			else if(matchInResult){
				$("#mcMenuWrapper .mcTabs li[data-value='result']").addClass("current");
				$scope.liveTab=false;
				$scope.fixtureTab=false;
				$scope.resultTab=true;
			}
			if(widgetViewType2 == 'result'){
				$("#mcMenuWrapper .mcTabs li[data-value='result']").addClass("current");
				$scope.liveTab=false;
				$scope.fixtureTab=false;
				$scope.resultTab=true;
			}
		}

		if($scope.goBackToFixture == true){
			$("#mcMenuWrapper .mcTabs li").removeClass("current");
			$("#mcMenuWrapper .mcTabs li[data-value='fixture']").addClass("current");
				$scope.liveTab=false;
				$scope.fixtureTab=true;
				$scope.resultTab=false;
		}
		$scope.goBackToFixture = false;

		setTimeout(function(){
			$("#smipl-manhattan-wrap").getNiceScroll().hide();
            $("#smipl-manhattan-wrap").getNiceScroll().resize();
		},500);

		$(".winlossPercentMeter").addClass("inactive");
		clearInterval(liveScoreCardInterval);
		if(cloudFirestore)
    		firebaseRef();

		clearInterval(liveInterval);
		if(cloudFirestore)
			firebaseSRef();
        if(liveData!=0 && $scope.liveTab){
			// liveInterval=setInterval(function(){
			// 		$scope.getLiveScore($scope.selectedCompetition.CompetitionID); // calling live score  refreshing function
			// },15000);
			if(!cloudFirestore){
				liveInterval=setInterval(function(){
					$scope.getLiveScore($scope.selectedCompetition.CompetitionID); // calling live score  refreshing function
				},15000);
			}
			else{
				firebaseSRef = cloudFirestoreDB.collection("matchstatus")
			    .onSnapshot(function(doc) {
			        if(firebaseSObjChange)
							$scope.getLiveScore($scope.selectedCompetition.CompetitionID);
			    });
			}
		}

		if (!$scope.$$phase) {
           	$scope.$apply();
    	}
    	if($scope.matchLiveStream)
		{
			// if(jwplayer().getState() == "playing")
			// 	jwplayer().pause();
			$("#liveStreamPlayer").html("");
		}
		if(!disableScorecardRightClick)
		{
			 var obj = { Title: "Matchcentre", Url: "matchcentre.html" };
			window.history.pushState(obj, "Matchcentre", "matchcentre.html");
		}
	}

	/******* get  player details  filter by name using watch ******/

	$scope.$watch('searchPlayerName.PlayerName',function(query){
		$(".pStatsWrap").addClass("inactive");
		$scope.mcPlayerBattingStats = false;
		$scope.mcPlayerBowlingStats=false;
		var playerSearchresult=[];
		playerSearchresult=$filter('filter')(playersData,{PlayerName:query});
		if(playerSearchresult.length!=0)
		{
			$("#plyRotateSmipl").html("");
			$(".errMsg").html("");
			$("#plyRotateSmipl").removeClass('hide');
			$(".mcPlyStatsHeader").removeClass('hide');
			$(".mcPlyStatsContent").removeClass('hide');
			var teamId=playerSearchresult[0].TeamID;
			var playerId=playerSearchresult[0].PlayerID;
			var cId=playerSearchresult[0].CompetitionID;
			$scope.mcPlayerBattingStats=true;
	    	$scope.mcPlayerBowlingStats=false;
	    	var $bindPlayers="<div class='mcPlyRotList'>";
			for(var i=0; i<playerSearchresult.length; i++){
				var playerImg=($scope.isNotNull(playerSearchresult[i].profileimg) && playerSearchresult[i].profileimg != "no_image.html") ? playerImgPath+playerSearchresult[i].profileimg : $scope.basepath+"images/placeholder.png";
				
				$bindPlayers+="<div class='mcPlythumb' ng-click='getPlayerScores(\""+playerSearchresult[i].PlayerID+"\",\""+playerSearchresult[i].TeamID+"\",\"changeplayer\")'><a data-playId="+playerSearchresult[i].PlayerID+"><img src='"+playerImg+"' onerror=\"this.src = 'images/placeholder.png';\" /><span>"+playerSearchresult[i].PlayerName+"<i>"+playerSearchresult[i].Specialization+"</i></span></a></div>";
			}
			$bindPlayers+="</div>";
			$bindPlayers = $compile($bindPlayers)($scope);
      		$("#plyRotateSmipl").html($bindPlayers);
        	$scope.getPlayerInningsData(cId,teamId,playerId,'init');
	    	var containerWdt = $("#playerStatsWrapper .mcContainer").width();
    		var windowWidth=$(window).width();
			if(windowWidth<=1024){
				// var playerSlider=$('.mcPlyRotList').bxSlider({ infiniteLoop: false, slideWidth: containerWdt,  pager: false, responsive: true, hideControlOnEnd: true,
    //             autoControlsCombine: true, adaptiveWidth: true });		
			}
			else{
				var playerSlider=$('.mcPlyRotList').bxSlider({ infiniteLoop: false, slideWidth: containerWdt,  pager: false, responsive: true, hideControlOnEnd: true,
                autoControlsCombine: true, adaptiveWidth: true,touchEnabled:false });		

                $('.mcPlyRotList').closest('.bx-viewport').on('touchstart',function(ev){
				const $image = $(ev.target);
					$image.closest('.mcPlythumb').trigger( "click" );
				});
			}

			$(".pStatsWrap").removeClass("inactive");
				
		}
		else{
			$("#plyRotateSmipl").addClass('hide');
			$(".mcPlyStatsHeader").addClass('hide');
			$(".mcPlyStatsContent").addClass('hide');
			$(".errMsg").html("Player Not Found");
			$scope.mcPlayerBattingStats = false;
			$scope.mcPlayerBowlingStats=false;
			$(".pStatsWrap").addClass("inactive");
			if (!$scope.$$phase) {
				$scope.$apply();
			}
			
		}
	});
	/******* full scorecard construction script ******/
	$scope.inningsTabsChange = function(pmId,ptype,pLoadType,pInningsNo){
		if(pInningsNo == 3 && ptype == 'dropdownInnChange'){
			if($scope.matchSummary.CurrentInnings > 3)
				pInningsNo = 4;
			$scope.superOverViewInnNo = pInningsNo;
		}
		if(pInningsNo == 5 && ptype == 'dropdownInnChange'){
			if($scope.matchSummary.CurrentInnings > 5)
				pInningsNo = 6;
			$scope.superOverViewInnNo = pInningsNo;
		}
		if(ptype == 'SOInnChange')
			ptype = 'dropdownInnChange';
		
		$(".inningsList").val(pInningsNo);
		
		
		$scope.constructScoreCard(pmId,ptype,pLoadType);
	}

	$scope.constructScoreCard=function(mId,Inn,LoadType,menuactive,pageFrom){
		if(mId == '') return;

		if(pageFrom == 'fromOtherPage'){
			fixturePageChange(pageFrom);
			$(".widget.playingXI").find(".widgetTitle").text("playing XI");
		}
		firebaseObjChange = true;
		$scope.getcurMatchDetFromSchdule(mId);
		
		$scope.checkMatchLive(mId);
		$scope.getPostMatchCommentary(mId);
		$scope.getPreMatchCommentary(mId);
		if($scope.callFromTemplate == 'alllivematches')
		{
			var matchDet = $filter('filter')($scope.liveList,{MatchID:mId},true);
			var curMatchDetCID = '';
			if(matchDet != undefined && matchDet.length > 0) 
				curMatchDetCID = (matchDet[0].CompetitionID != undefined) ? matchDet[0].CompetitionID : '';
		
			if(curMatchDetCID != '')
			{
				var curMatchDetCompObj = [];
				selDivCompetition.map(function(item){
					if(item.CompetitionID == curMatchDetCID)
						curMatchDetCompObj.push(item)
				});
				
				if(curMatchDetCompObj != undefined && curMatchDetCompObj.length > 0)
				{
					curMatchDetCompObj = curMatchDetCompObj[0];
					if(curMatchDetCompObj.CodingType == 'T20Pro')
					{
						if(curMatchDetCompObj.feedsource != undefined)
							feedSource = curMatchDetCompObj.feedsource;
						t20lite = false;
						$scope.teamstatsMenu = false;
						$scope.squadsmenu = squadsmenu;
						$scope.standingsMenu = false;
						$scope.analytics_menu = analytics_menu;
						

					}
					else if(curMatchDetCompObj.CodingType == 'T20Lite'){
						if(curMatchDetCompObj.feedsource != undefined)
							feedSource = curMatchDetCompObj.feedsource;
						t20lite = true;
						$scope.squadsmenu =false;
						$scope.teamstatsMenu = teamstatsMenu;
						$scope.analytics_menu = analytics_menu;
						
						$scope.standingsMenu = standingsMenu;
						if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
							$scope.standingsMenu = false;
						else
							$scope.standingsMenu = standingsMenu;
						$(".winlossPercentMeter").addClass("inactive");
					}
				}
			}

		}
		
        if(LoadType =='innchange'){
            $(".mcDetails .mcInnTabsItems").removeClass("active");
            $(".mcDetails .scoreWrap").removeClass("active");
        }
        if(LoadType == 'init')
        {
        	$("#scorecardTabs li").removeClass("current");
        	$("#scorecardTabs li[data-tab='fullScoreContent']").addClass("current");
        	$("#scorecardWrapper .mcTabContent").removeClass("current");
        	$("#scorecardWrapper #fullScoreContent.mcTabContent").addClass("current");
        }
		if(Inn =="dropdownInnChange" || Inn =="dropdownInnChangeWagon" || Inn =="dropdownCInnChange" || Inn =="dropdownWInnChange"){
			if(Inn =="dropdownInnChange" )
			Inn = $(".inningsList ").val();
			if(Inn =="dropdownCInnChange" )
			Inn = $(".inningsList.commentryinningsList").val();
			if(Inn =="dropdownWInnChange" )
			Inn = $(".inningsList.wagoninningsList").val();
			if(Inn =="dropdownInnChangeWagon" )
			Inn = $(".inningsList.innsFilter").val();
			if($scope.inningsList != undefined && $scope.inningsList.length > 0)
			{
				$scope.inningsList.map(function(item){
					if(item.innNo == Inn){
						$scope.selectedInnWagonList = item;
						$scope.selectedInnList = item;
						$scope.selectedCInnList = item;
						$scope.selectedWInnList = item;
					}
						
				});
			}
		}

		if(menuactive != undefined)
		{
			setTimeout(function(){
				$("#mcFilterBtn li.mnActive").removeClass('mnActive');
				$("#mcFilterBtn li").removeClass('mnActive');
				$("#mcFilterBtn li[data-value='"+menuactive+"']").addClass('mnActive');
				$("#mcMenuWrapper .mcTabs li").removeClass('current');
				$("#mcMenuWrapper .mcTabs li[data-value='"+menuactive+"']").addClass('current');
			},2000);
		}
		$("#errMsg").html("");
		if(Inn > $scope.matchSummary.CurrentInnings && $scope.matchSummary.CurrentInnings != '') return;
		if(mId!='' && mId!=undefined)
			matchId = mId;
		else
		{
			matchId = getParameterByName("mId");
			LoadType = '';
			Inn = '';
		}

		$scope.matchId=matchId;
		
		$scope.matchInn = Inn;

		if (!$scope.$$phase) {
				$scope.$apply();
			}
		$scope.$broadcast ('getMatchSpecificNews');
		// if((LoadType == 'refresh' && $scope.matchSummary.CurrentInnings == curInn) || (LoadType != 'refresh'))
		if((LoadType != 'refresh'))
			ovrSliderPos = 0;
		if(LoadType != 'refresh'){
            $("#videoplayer").attr('poster', '');
			$("#contentDetails .scorecardItems").removeClass("active");
			$(".pageloader").addClass('active');
			if($("#contentDetails .mcTabs .mcTabLink[data-tab='mwpage']").hasClass('current'))
				$("#manhattan-wrapper").addClass('active');
			else
				$("#manhattan-wrapper").removeClass('active');
			
			var slidewidth = $(window).width();
			if(slidewidth <=767)
			{
				setTimeout(function(){

					// $('#scorecardTabs').bxSlider({ slideWidth: slidewidth, speed: 200,  minSlides: 1,  maxSlides: 1, moveSlides: 1, slideMargin: 1,infiniteLoop:false,hideControlOnEnd:true, responsive: true  });
				},2000);
			}
			
		}
		if(Inn==''){
			$("#contentDetails .mcTabs .mcTabLink").removeClass("current");
			$("#contentDetails .mcTabContent").removeClass("current");
			$("#contentDetails .mcTabs .mcTabLink[data-tab='fullScorePage']").addClass("current");
			$("#contentDetails #fullScorePage.mcTabContent").addClass("current");
		}
		
		/****** widgets show and hide  ******/
		if(LoadType != 'liveBriefWidget' && LoadType != 'livestream' && Inn=='')
		{
			$scope.showFixture=false;
			$scope.showscorecard=true;
			$scope.showplayerstats=false;
			$scope.showstandings=false;
			$scope.showtourstats=false;
			$scope.hideLiveStream = true;
			$scope.showSA =sentimentalAnalysis;
			$scope.showWC = wordCloud;
			$scope.showFixWidget=$scope.FindWidget(scorecardSidewidgets,'fixtures');
			$scope.showResWidget=$scope.FindWidget(scorecardSidewidgets,'results');
			$scope.showLiveWidget=$scope.FindWidget(scorecardSidewidgets,'live');
			$scope.showPTWidget=$scope.FindWidget(scorecardSidewidgets,'standings');
			$scope.showLeadPlayes=$scope.FindWidget(scorecardSidewidgets,'tstats');
			$scope.showMDWidget=$scope.FindWidget(scorecardSidewidgets,'mcdetails');
			$scope.showPartnerShip=$scope.FindWidget(scorecardSidewidgets,'partnership');
			
			if(scorecardSidewidgets.length==0)
				$(".fixWrap").addClass("fullWidth");
			else
				$(".fixWrap").removeClass("fullWidth");
				
			$scope.liveBriefWidget = false;	
			$("#analytPage").removeClass("current");
			$("#fullScorePage").addClass("current");	
		}
		if($scope.matchLiveStream)
			$scope.hideLiveStream = false;

		if(LoadType == 'livestream')
		{
			$scope.showFixture=false;
			$scope.showscorecard=true;
			$scope.hideLiveStream = false;
			$scope.showplayerstats=false;
			$scope.showstandings=false;
			$scope.showtourstats=false;

			$scope.hideLiveStream = false;
			$(".mcTabContent").removeClass("current");
			$("#liveStreamingBlock.mcTabContent").addClass("current");
			$(".mcTabs li").removeClass("current");

			$(".fixWrap").addClass("fullWidth");
			$("#briefScoreBox").addClass("inactive");
			$("#contentDetails").addClass("inactive");
			$("#smipl-manhattan-wrap").getNiceScroll().hide();
		}
		mcService.GetMatchSummary(matchId,function(data){
			if(Inn=='' || Inn==undefined){
				if(data.MatchSummary[0] !=undefined && LoadType != 'refresh' && (data.MatchSummary[0].CurrentInnings == undefined || data.MatchSummary[0].CurrentInnings == ""))
					data.MatchSummary[0].CurrentInnings = 1;
				curInn=data.MatchSummary[0].CurrentInnings;
			}
			else{
				curInn=Inn;
			}
			if((LoadType != 'refresh'))
				$scope.superOverViewInn = data.MatchSummary[0].CurrentInnings;
			var GetDataInn='Innings'+curInn;
			$scope.currentInnText = GetDataInn;
			matchSummaryData=(data.MatchSummary[0] != undefined) ? data.MatchSummary[0] : [];
			
			

			var Umpire1Name = (matchSummaryData.Umpire1Name != undefined) ? titleCase(matchSummaryData.Umpire1Name) : "";
			matchSummaryData.Umpire1Name = Umpire1Name;
			var Umpire2Name = (matchSummaryData.Umpire2Name != undefined) ? titleCase(matchSummaryData.Umpire2Name) : "";
			matchSummaryData.Umpire2Name = Umpire2Name;
			var Umpire3Name = (matchSummaryData.Umpire3Name != undefined) ? titleCase(matchSummaryData.Umpire3Name) : "";
			matchSummaryData.Umpire3Name = Umpire3Name;
			var VideoAnalyst1 = (matchSummaryData.VideoAnalyst1 != undefined) ? titleCase(matchSummaryData.VideoAnalyst1) : "";
			matchSummaryData.VideoAnalyst1 = VideoAnalyst1;
			var VideoAnalyst2 = (matchSummaryData.VideoAnalyst2 != undefined) ? titleCase(matchSummaryData.VideoAnalyst2) : "";
			matchSummaryData.VideoAnalyst2 = VideoAnalyst2;
			var Referee = (matchSummaryData.Referee != undefined) ? titleCase(matchSummaryData.Referee) : "";
			matchSummaryData.Referee = Referee;
			var Scorer1Name = (matchSummaryData.Scorer1Name != undefined) ? titleCase(matchSummaryData.Scorer1Name) : "";
			matchSummaryData.Scorer1Name = Scorer1Name;
			var Scorer2Name = (matchSummaryData.Scorer2Name != undefined) ? titleCase(matchSummaryData.Scorer2Name) : "";
			matchSummaryData.Scorer2Name = Scorer2Name;

			var FirstBattingTeam = (matchSummaryData.FirstBattingTeam != undefined) ? titleCase(matchSummaryData.FirstBattingTeam) : "";
			matchSummaryData.FirstBattingTeam = FirstBattingTeam;
			var SecondBattingTeam = (matchSummaryData.SecondBattingTeam != undefined) ? titleCase(matchSummaryData.SecondBattingTeam) : "";
			matchSummaryData.SecondBattingTeam = SecondBattingTeam;

			
			
			oneFallOvers = matchSummaryData['1FallOvers'];
			oneFallScore = matchSummaryData['1FallScore'];
			oneFallWickets = matchSummaryData['1FallWickets'];
			twoFallOvers = matchSummaryData['2FallOvers'];
			twoFallScore = matchSummaryData['2FallScore'];
			twoFallWickets = matchSummaryData['2FallWickets'];
			threeFallOvers = matchSummaryData['3FallOvers'];
			threeFallScore = matchSummaryData['3FallScore'];
			threeFallWickets = matchSummaryData['3FallWickets'];
			fourFallOvers = matchSummaryData['4FallOvers'];
			fourFallScore = matchSummaryData['4FallScore'];
			fourFallWickets = matchSummaryData['4FallWickets'];
			
			if(matchSummaryData.TotalOvers == undefined || matchSummaryData.TotalOvers == '') matchSummaryData.TotalOvers = 20;
			
			if(LoadType != 'refresh' || $scope.widgettype == 'international')
				$scope.matchSummary = matchSummaryData;
			if($scope.widgettype == 'domestic' && LoadType != 'refresh' && LoadType == 'init'){
				$scope.matchSummary['1FallOvers'] = "";
				$scope.matchSummary['1FallScore'] = "";
				$scope.matchSummary['1FallWickets'] = "";
				$scope.matchSummary['2FallOvers'] = "";
				$scope.matchSummary['2FallScore'] = "";
				$scope.matchSummary['2FallWickets'] = "";
				$scope.matchSummary['3FallOvers'] = "";
				$scope.matchSummary['3FallScore'] = "";
				$scope.matchSummary['3FallWickets'] = "";
				$scope.matchSummary['4FallOvers'] = "";
				$scope.matchSummary['4FallScore'] = "";
				$scope.matchSummary['4FallWickets'] = "";
				
			}
			$(".pageloader").removeClass('displayForScorecard').addClass("hideForScorecard");
			$(".mcBriefScoreBox").show();
			if($scope.matchSummary.CurrentInnings == undefined || $scope.matchSummary.CurrentInnings == '')
				$scope.matchSummary.CurrentInnings = 1;		
				
			$(".loader-main").hide();
			if(LoadType != 'refresh' && LoadType != 'innchange'){
				$scope.getSquadList(matchId);
				$scope.getStandings();
				if($scope.matchSummary.IsMatchEnd == 0 || $scope.matchSummary.IsMatchEnd ==1)
					$scope.getExpertAnalysis(matId);
			}
			$scope.getMatchNotes(matchId,curInn);
							
			var inningsList = [];
			if($scope.matchSummary.HomeTeamCode == undefined || $scope.matchSummary.HomeTeamCode=='')
				$scope.matchSummary.HomeTeamCode = $scope.matchSummary.FirstBattingTeam;
			if($scope.matchSummary.AwayTeamCode == undefined || $scope.matchSummary.AwayTeamCode=='')
				$scope.matchSummary.AwayTeamCode = $scope.matchSummary.SecondBattingTeam;
				if($scope.matchSummary.HomeTeamID == undefined || $scope.matchSummary.HomeTeamID=='')
				$scope.matchSummary.HomeTeamID = $scope.matchSummary.FirstBattingTeamID;
				if($scope.matchSummary.AwayTeamID == undefined || $scope.matchSummary.AwayTeamID=='')
				$scope.matchSummary.AwayTeamID = $scope.matchSummary.SecondBattingTeamID;
			if($scope.archiveDataScoreCard && $scope.matchSummary.FirstBattingTeamLogo == ''){
				var ln = $scope.matchSummary.FirstBattingTeam;
				if(ln == 'Rising Pune Supergiant')
					ln = 'RPS';
				if(ln == 'Gujarat Lions')
					ln = 'GL';
				if(ln == 'Deccan Chargers')
					ln = 'DEC';
				if(ln == 'Pune Warriors India')
					ln = 'PWI';
				if(ln == 'Kochi Tuskers Kerala')
					ln = 'KTK';			
				
				$scope.matchSummary.FirstBattingTeamLogo = "https://scores.iplt20.com/ipl/teamlogos/"+ln+".png";
			}
			if($scope.archiveDataScoreCard && $scope.matchSummary.SecondBattingTeamLogo == ''){
				var ln = $scope.matchSummary.SecondBattingTeam;
				if(ln == 'Rising Pune Supergiant')
					ln = 'RPS';
				if(ln == 'Gujarat Lions')
					ln = 'GL';
				if(ln == 'Deccan Chargers')
					ln = 'DEC';
				if(ln == 'Pune Warriors India')
					ln = 'PWI';
				if(ln == 'Kochi Tuskers Kerala')
					ln = 'KTK';		
				
				$scope.matchSummary.SecondBattingTeamLogo = "https://scores.iplt20.com/ipl/teamlogos/"+ln+".png";
			}
			if($scope.curSeasonName < 2019){
				if($scope.matchSummary.HomeTeamCode == 'DC')
					$scope.matchSummary.HomeTeamCode = 'DD';
				if($scope.matchSummary.HomeTeamCode == 'Delhi Capitals')
					$scope.matchSummary.HomeTeamCode = 'Delhi Daredevils';
				if($scope.matchSummary.FirstBattingTeam == 'Delhi Capitals'){
					$scope.matchSummary.FirstBattingTeam = 'Delhi Daredevils';
					$scope.matchSummary.FirstBattingTeamLogo ='../../scores.iplt20.com/ipl/teamlogos/DD.png';
				}
				if($scope.matchSummary.AwayTeamCode == 'DC')
					$scope.matchSummary.AwayTeamCode = 'DD';
				if($scope.matchSummary.AwayTeamCode == 'Delhi Capitals')
					$scope.matchSummary.AwayTeamCode = 'Delhi Daredevils';
				if($scope.matchSummary.SecondBattingTeam == 'Delhi Capitals'){
					$scope.matchSummary.SecondBattingTeam = 'Delhi Daredevils';
					$scope.matchSummary.SecondBattingTeamLogo ='../../scores.iplt20.com/ipl/teamlogos/DD.png';
				}
				if($scope.matchSummary.Comments != undefined && $scope.matchSummary.Comments != '')
					$scope.matchSummary.Comments = $scope.matchSummary.Comments.replace("Delhi Capitals", "Delhi Daredevils");

			}
			
			$scope.curInnData = {};
			var cInnNumInt = ($scope.matchSummary.CurrentInnings != undefined && $scope.matchSummary.CurrentInnings != '') ? parseInt($scope.matchSummary.CurrentInnings) : 0;
			for(var i=1;i<=cInnNumInt;i++)
			{
				var innListItem = [];
				var name = '';
				if(i == 1 && $scope.matchSummary.FirstBattingTeam != '')
				{
					name = $scope.matchSummary.FirstBattingTeam;
					innListItem["teamName"] = name;
					innListItem["teamCode"] = ($scope.matchSummary.FirstBattingTeamID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamCode : $scope.matchSummary.AwayTeamCode;
					innListItem["teamImage"] = ($scope.matchSummary.FirstBattingTeamID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamLogo : $scope.matchSummary.AwayTeamLogo;
					if($scope.matchSummary.MatchType == 'Multi Day'){
						innListItem["name"] = name + " 1st Innings";
						innListItem["innShortName"] = "1st Inns";
						innListItem["innCode"] = innListItem["teamCode"] + " 1st Innings";
					}						
					else{
						innListItem["name"] = name + " 1st Innings";
						innListItem["innCode"] = innListItem["teamCode"] + " 1st Innings";
						innListItem["innShortName"] = "1st Inns";
					}
					//innListItem["name"] = name + " (INN - "+i+")";
					innListItem["innNo"] = i;
					inningsList.push(innListItem);
				}
					
				if(i == 2){
					name = $scope.matchSummary.SecondBattingTeam;
					innListItem["teamName"] = name;
					innListItem["teamCode"] = ($scope.matchSummary.SecondBattingTeamID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamCode : $scope.matchSummary.AwayTeamCode;
					innListItem["teamImage"] = ($scope.matchSummary.SecondBattingTeamID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamLogo : $scope.matchSummary.AwayTeamLogo;
					if($scope.matchSummary.MatchType == 'Multi Day'){
						innListItem["name"] = name + " 1st Innings";
						innListItem["innShortName"] = "1st Inns";
						innListItem["innCode"] = innListItem["teamCode"] + " 1st Innings";
					}
					else{
						innListItem["name"] = name + " 2nd Innings";
						innListItem["innShortName"] = "2nd Inns";
						innListItem["innCode"] = innListItem["teamCode"] + " 2nd Innings";
					}
					//innListItem["name"] = name + " (INN - "+i+")";
					innListItem["innNo"] = i;
					inningsList.push(innListItem);
				}
					
				var T20LiteSuperOver = 	($scope.matchSummary.T20LiteSuperOver != undefined) ? $scope.matchSummary.T20LiteSuperOver : "";
				if($scope.matchSummary.IsSuperOver != 1 || T20LiteSuperOver == 1)
				{
					printScoreCard = true; 
					if(i == 3 && $scope.matchSummary.SecondInningsFirstBattingName != ''){
						name = $scope.matchSummary.SecondInningsFirstBattingName;
						innListItem["teamName"] = name;
						innListItem["teamCode"] = ($scope.matchSummary.SecondInningsFirstBattingID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamCode : $scope.matchSummary.AwayTeamCode;
						innListItem["teamImage"] = ($scope.matchSummary.SecondInningsFirstBattingID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamLogo : $scope.matchSummary.AwayTeamLogo;
						if($scope.matchSummary.MatchType == 'Multi Day'){
							innListItem["name"] = name + " 2nd Innings";
							innListItem["innShortName"] = "2nd Inns";
							innListItem["innCode"] = innListItem["teamCode"] + " 2nd Innings";
						}
						else{
							innListItem["name"] = name + " Super Over-1";
							innListItem["innShortName"] = "Super Over-1";
							innListItem["innCode"] = innListItem["teamCode"] + " Super Over-1";
						}
						//innListItem["name"] = name + " (INN - "+i+")";
						innListItem["innNo"] = i;
						inningsList.push(innListItem);
					}
						
					if(i == 4 && $scope.matchSummary.SecondInningsSecondBattingName != ''){
						name = $scope.matchSummary.SecondInningsSecondBattingName;	
						innListItem["teamName"] = name;
						innListItem["teamCode"] = ($scope.matchSummary.SecondInningsSecondBattingID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamCode : $scope.matchSummary.AwayTeamCode;
						innListItem["teamImage"] = ($scope.matchSummary.SecondInningsSecondBattingID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamLogo : $scope.matchSummary.AwayTeamLogo;
						if($scope.matchSummary.MatchType == 'Multi Day'){
							innListItem["name"] = name + " 2nd Innings";
							innListItem["innShortName"] = "2nd Inns";
						}
						else{
							innListItem["name"] = name + " Super Over-1";
							innListItem["innShortName"] = "Super Over-1";
							innListItem["innCode"] = innListItem["teamCode"] + " Super Over-1";
						}
						//innListItem["name"] = name + " (INN - "+i+")";
						innListItem["innNo"] = i;
						inningsList.push(innListItem);
					}
					
					if(i == 5 && $scope.matchSummary.ThirdInningsFirstBattingID != ''){
						name = ($scope.matchSummary.HomeTeamID == $scope.matchSummary.ThirdInningsFirstBattingID) ? $scope.matchSummary.HomeTeamName : $scope.matchSummary.AwayTeamName;	
						innListItem["teamName"] = name;
						innListItem["name"] = name + " Super Over-2";
						innListItem["innShortName"] = "Super Over-2";
						innListItem["innCode"] = innListItem["teamCode"] + " Super Over-2";
						innListItem["innNo"] = i;
						innListItem["teamCode"] = ($scope.matchSummary.ThirdInningsFirstBattingID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamCode : $scope.matchSummary.AwayTeamCode;
						innListItem["teamImage"] = ($scope.matchSummary.ThirdInningsFirstBattingID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamLogo : $scope.matchSummary.AwayTeamLogo;
						innListItem["innCode"] = innListItem["teamCode"] + " Super Over-2";
						inningsList.push(innListItem);
						
					}
					if(i == 6 && $scope.matchSummary.ThirdInningsSecondBattingID != ''){
						name = ($scope.matchSummary.HomeTeamID == $scope.matchSummary.ThirdInningsSecondBattingID) ? $scope.matchSummary.HomeTeamName : $scope.matchSummary.AwayTeamName;	
						innListItem["teamName"] = name;
						innListItem["name"] = name + " Super Over-2";
						innListItem["innShortName"] = "Super Over-2";
						innListItem["innNo"] = i;
						innListItem["teamCode"] = ($scope.matchSummary.ThirdInningsSecondBattingID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamCode : $scope.matchSummary.AwayTeamCode;
						innListItem["teamImage"] = ($scope.matchSummary.ThirdInningsSecondBattingID == $scope.matchSummary.HomeTeamID) ? $scope.matchSummary.HomeTeamLogo : $scope.matchSummary.AwayTeamLogo;
						innListItem["innCode"] = innListItem["teamCode"] + " Super Over-2";
						inningsList.push(innListItem);
					}
						
				}
				
				var curInnno = $scope.matchInn;
				if(curInnno == '' || curInnno == undefined)
				curInnno = cInnNumInt
				if(i == curInnno)
				{
					$scope.curInnData.teamName = innListItem["teamName"];
					$scope.curInnData.teamCode = innListItem["teamCode"];
					$scope.curInnData.teamImage = innListItem["teamImage"];
					console.log($scope.curInnData);
				}
				
			}
			
			
			if(LoadType != 'refresh' && LoadType != 'innchange')
			{
				$scope.inningsList = inningsList;
				if(inningsList != undefined && inningsList.length > 0)
				{
					inningsList.map(function(item){
						if(item.innNo == cInnNumInt){
							$scope.selectedInnWagonList = item;
							$scope.selectedInnList = item;
							$scope.selectedCInnList = item;
							$scope.selectedWInnList = item;
						}
							
					});
				}
			}
			
			// data.MatchSummary[0].IsMatchEnd = 0;
			if(data.MatchSummary[0]['HomeTeamLogo'] != undefined){
					data.MatchSummary[0]['HomeTeamLogo']=data.MatchSummary[0]['HomeTeamLogo'].replace("http://feeds-100mb-test.s3-ap-southeast-1.amazonaws.com/teamLogos/teamLogos_2020/", "teamlogos/index.html");
				data.MatchSummary[0]['AwayTeamLogo']=data.MatchSummary[0]['AwayTeamLogo'].replace("http://feeds-100mb-test.s3-ap-southeast-1.amazonaws.com/teamLogos/teamLogos_2020/", "teamlogos/index.html");
			}
			
			if(data.MatchSummary[0]['1FallOvers'] == "0.0")
			{
				$("#contentDetails").addClass("inactive");
				$("#partnership-section").addClass("inactive");
			}
			else if(LoadType != 'livestream' && LoadType != 'refresh')
			{
				$("#contentDetails").removeClass("inactive");
				$("#briefScoreBox").removeClass("inactive");
				$("#partnership-section").removeClass("inactive");
			}
			
			
			if(data.MatchSummary[0].VideoScorecard != undefined && data.MatchSummary[0].VideoScorecard == 1 && false)
			{
				var commonVideoScorecard = videoscorecard;
				videoscorecard = false;
				if(!commonVideoScorecard)
				{
	                 $.getScript(mcpath+"js/jquery-ui.min.js", function() {
	                        $.getScript(mcpath+"js/videoplayer.js", function() {
	                            $.getScript(mcpath+"js/mediaelement-and-player.js", function() {
	                               player = new MediaElementPlayer('#videoplayer', {
	                                    success: function (mediaElement, domObject) {
	                                        mediaElement.addEventListener('ended', function (e) {
	                                             $("#videoplayer").attr('poster', '');
	                                                playnextvideo(e.target);
	                                            }, false);
	                                        mediaElement.addEventListener("canplay", function () {
	                                             $("#videoplayer").attr('poster', '');                                            
	                                        }, false);
	                                        mediaElement.addEventListener("error", function (e) {
	                                            canplay = false;
	                                            applyPoster(e.target);
	                                        }, false);

	                                        var vcssfiles = [];
											vcssfiles.push("videoplayer/jquery-ui.min.html","videoplayer/mediaelementplayer.html","videoplayer/videoplayer.html");

											for(var i=0;i<vcssfiles.length;i++)
											{
												loadjscssfile(mcpath+vcssfiles[i], "css");
											}


	                                        videoControlsEvents();
	                                    }
	                                });
	                            });
	                        });
	                    });

	
	                
						 var listenPlayerControls = setInterval(function(){
	                    if($(".mejs-button.mejs-next").length > 0)
	                    {
	                        clearInterval(listenPlayerControls);
	                        var nextIconObj = $(".mejs-button.mejs-next");
	                        nextIconObj = $compile(nextIconObj)($scope);
	                        if (!$scope.$$phase) {
	                             $scope.$apply();
	                        }
	                        $(".mejs-button.mejs-next").replaceWith(nextIconObj);

	                        var prevIconObj = $(".mejs-button.mejs-prev");
	                        prevIconObj = $compile(prevIconObj)($scope);
	                        if (!$scope.$$phase) {
	                             $scope.$apply();
	                        }
	                        $(".mejs-button.mejs-prev").replaceWith(prevIconObj);
	                    }
	                },100);
					
				}
			}
			else if(data.MatchSummary[0].VideoScorecard != undefined && data.MatchSummary[0].VideoScorecard == 0)
			{
				videoscorecard = false;
			}
			// if(data.MatchSummary[0].VideoScorecard ==undefined && $scope.selectedCompetition.CodingType == 'T20Pro')
			// 	videoscorecard = true;

			if(LoadType != 'refresh')
				$scope.matchLiveStream = false;
			
			if((LoadType == 'livestream' || LoadType == 'refresh') && data.MatchSummary[0]['1FallScore'] == '')
			{
				$("#scorecardTabs").addClass("inactive");
				$("#overStreamMC").addClass("inactive");
			}
			else
				$("#scorecardTabs").removeClass("inactive");	

			if(data.MatchSummary[0].LiveStream != undefined && data.MatchSummary[0].LiveStream != '')
			{
				$scope.matchLiveStream = true;
				if(LoadType != 'refresh' && LoadType == 'livestream')
				{
					$scope.hideLiveStream = false;
					$(".mcTabContent").removeClass("current");
					$("#liveStreamingBlock.mcTabContent").addClass("current");
					$(".mcTabs li").removeClass("current");
					 $([document.documentElement, document.body]).animate({
				        scrollTop: $("#scorecardTabs").offset().top - 120
				    }, 1000);
					//https://wowzaec2demo.streamlock.net/live/bigbuckbunny/playlist.m3u8
					//http://purplelivecloud.purplestream.in/purplelive/ngrp:sm_all/playlist.m3u8
					// jwplayer("liveStreamPlayer").setup({
	    //                 file: data.MatchSummary[0].LiveStream,
	    //                 width: '100%',
	    //                 aspectratio: '16:9',
	    //                 autostart: true,
	    //                 androidhls: true,
	    //                 skin: 'vapor',
	    //                 primary: 'html5'
     //                });
				}
			}
			// data.MatchSummary[0].FBURL = "dfsd";
			if(data.MatchSummary[0].FBURL != undefined && data.MatchSummary[0].FBURL != '')
			{
				$scope.matchLiveStream = true;
				if(LoadType != 'refresh' && LoadType == 'livestream')
				{
					$scope.hideLiveStream = false;
					$("#liveStreamPlayer").html(data.MatchSummary[0].FBURL);
					$(".mcTabContent").removeClass("current");
					$("#liveStreamingBlock.mcTabContent").addClass("current");
					$(".mcTabs li").removeClass("current");
					 $([document.documentElement, document.body]).animate({
					        scrollTop: $("#scorecardTabs").offset().top - 120
					    }, 1000);
				}
			}

			if(typeof enableVideoScorecardForCompetition == "undefined") 
				enableVideoScorecardForCompetition = [];
			if(data.MatchSummary[0].CompetitionName != undefined && $.inArray(data.MatchSummary[0].CompetitionName, delayVideoScorecardCompetitions)== -1 && enableVideoScorecardForCompetition.length > 0)
			{
				if(data.MatchSummary[0].CompetitionName != undefined && $.inArray(data.MatchSummary[0].CompetitionName, enableVideoScorecardForCompetition)!= -1)
				{
					videoscorecard = true;
				}
				else
					videoscorecard = false;	
				if(videoscorecard)
					$("#matchCenter").addClass("videoscorecard");
				else
					$("#matchCenter").removeClass("videoscorecard");
			}
			
			if(typeof disableVideoScorecardForCompetition == "undefined") 
				disableVideoScorecardForCompetition = [];

			
			$("#matchCenter").removeClass("videoscorecard");
			if(data.MatchSummary[0].CompetitionName != undefined && $.inArray(data.MatchSummary[0].CompetitionName, delayVideoScorecardCompetitions)== -1)
			{
				if(videoscorecard)
					$("#matchCenter").addClass("videoscorecard");
				else
					$("#matchCenter").removeClass("videoscorecard");

				if(((data.MatchSummary[0].CompetitionName != undefined && $.inArray(data.MatchSummary[0].CompetitionName, partialVideoScorecardCompetitions)!= -1) || (data.MatchSummary[0].CompetitionID != undefined && $.inArray(data.MatchSummary[0].CompetitionID, partialVideoScorecardCompetitionsID)!= -1)) && videoscorecard )
				{
					$("#matchCenter").addClass("partialvideoscorecard");
				}
				else
					$("#matchCenter").removeClass("partialvideoscorecard");	


				if(data.MatchSummary[0].CompetitionName != undefined && $.inArray(data.MatchSummary[0].CompetitionName, disableVideoScorecardForCompetition)!= -1)
				{
					$("#matchCenter").removeClass("videoscorecard");
				}
				if(data.MatchSummary[0].CompetitionID != undefined && $.inArray(data.MatchSummary[0].CompetitionID, disableVideoScorecardForCompetitionID)!= -1)
				{
					$("#matchCenter").removeClass("videoscorecard");
				}
			}
			else
			{
				/******* filtering datas ******/
				var matchListAr = matchscheduleData;

				var viewingMatchDetails = $filter("filter")(matchListAr,{MatchID:data.MatchSummary[0].MatchID},true);
				if(viewingMatchDetails[0] != undefined)
				{
					var matchDateTime = viewingMatchDetails[0].MatchDate+" "+viewingMatchDetails[0].MatchTime;
					// var matchDateTime = "21 Jun 2017 16:30";// fixturesData[i].MatchDate+" "+fixturesData[i].MatchTime;
					
					var timeOffset = getTimezoneOffset();
					
					var matchdateString = calcTime(matchDateTime,timeOffset);
					// var d = new Date(matchDateTime).getTime() / 1000;
					if (GetIEVersion() > 0) 
					{
						// var dateAr = matchdateString.split(" ");
						// console.log(dateAr);
						// var dy = dateAr[0].toString();
						// var mn = dateAr[1].toString();
						// var yr = dateAr[2].toString();
						// var timestr =  dateAr[3];
						// timestr = timestr.split(":");
						// var hr = timestr[0].toString();
						// var min = timestr[1].toString();
						// matchdateString = dy + " "+mn+" "+yr+", "+hr+":"+min;
						// console.log(matchdateString);
						matchdateString = matchdateString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
						$("#matchCenter").addClass("iedevice");
					}
					

					var isMobile = {
					    Android: function() {
					        return navigator.userAgent.match(/Android/i);
					    },
					    BlackBerry: function() {
					        return navigator.userAgent.match(/BlackBerry/i);
					    },
					    iOS: function() {
					        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
					    },
					    Opera: function() {
					        return navigator.userAgent.match(/Opera Mini/i);
					    },
					    Windows: function() {
					        return navigator.userAgent.match(/IEMobile/i);
					    },
					    any: function() {
					        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
					    }
					};
					var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
					var windwdt = $(window).width();
						// alert(matchdateString);
					if((isMobile.iOS() || isSafari) && windwdt > 767) 
		   			{
						// var dateAr = matchdateString.split(",");
						// var datestr = dateAr[0];
						// var dy = datestr[0].toString();
						// var mn = datestr[1].toString();
						// var yr = datestr[2].toString();
						// var timestr =  dateAr[1];
						// timestr = timestr.split(":");
						// var hr = timestr[0].toString();
						// var min = timestr[1].toString();

						var dateAr = matchdateString.split(" ");
						
						var dy = dateAr[0].toString();
						var mn = dateAr[1].toString();
						var yr = dateAr[2].toString();
						var timestr =  dateAr[3];
						// timestr = timestr.split(":");
						var hr = dateAr[4];
						var min = dateAr[5];

						mn = mn.substring(0, 3);
						matchdateString = dy + "-"+mn+"-"+yr+", 09:00:00 AM";
						// console.log(matchdateString);
						// matchdateString = "10-Jun-2017,12:00:00 AM";
						// alert(matchdateString);
					}

					var d = new Date(matchdateString).getTime() / 1000;
					
					d = d + (timeDelayforVideoScorecard * 3600) + (matchduration * 3600);
					
					var d1 = new Date().getTime() / 1000;
				
					var sec = d - d1;
					sec = parseInt(sec);
					if(!isNaN(sec) && sec <= 0)
					{
						if(videoscorecard)
							$("#matchCenter").addClass("videoscorecard");
						else
							$("#matchCenter").removeClass("videoscorecard");

						if((data.MatchSummary[0].CompetitionName != undefined && $.inArray(data.MatchSummary[0].CompetitionName, partialVideoScorecardCompetitions)!= -1) || (data.MatchSummary[0].CompetitionID != undefined && $.inArray(data.MatchSummary[0].CompetitionID, partialVideoScorecardCompetitionsID)!= -1))
						{
							$("#matchCenter").addClass("partialvideoscorecard");
						}
						else
							$("#matchCenter").removeClass("partialvideoscorecard");	
					}
				}
			}

			if(typeof disableVideoScorecardForMatches == "undefined") {
				disableVideoScorecardForMatches = [];
			}

			if(data.MatchSummary[0].MatchID != undefined && $.inArray(data.MatchSummary[0].MatchID, disableVideoScorecardForMatches) != -1)
			{
				$("#matchCenter").removeClass("videoscorecard");
				$("#matchCenter").removeClass("partialvideoscorecard");	
			}
			
			//check super over match
			$scope.superOverSummary = '';
			var T20LiteSuperOver = 	(data.MatchSummary[0] != undefined && data.MatchSummary[0].T20LiteSuperOver != undefined) ? data.MatchSummary[0].T20LiteSuperOver : "";
			if(data.MatchSummary[0].IsSuperOver == 1 && T20LiteSuperOver != 1)
			{
				mcService.GetSuperOverMatchSummary(matchId,function(data){
					if(data.superovermatchsummary == undefined){
						currentStrikerId = $scope.matchSummary.CurrentStrikerID;
						nonStrikerId = $scope.matchSummary.CurrentNonStrikerID;
						currentBowlerId = $scope.matchSummary.CurrentBowlerID;
						
						$scope.IsMatchEnd=$scope.matchSummary.IsMatchEnd; // check the current match is live 
						$scope.scorecardHelper(mId,Inn,LoadType);
					}
						
					if(data.superovermatchsummary != undefined && data.superovermatchsummary[0] != undefined){
						$scope.superOverSummary=data.superovermatchsummary[0];
						var cInnNumInt = ($scope.superOverSummary.CurrentInnings != undefined && $scope.superOverSummary.CurrentInnings != '') ? parseInt($scope.superOverSummary.CurrentInnings) : 0;
						for(var i=1;i<=cInnNumInt;i++)
						{
							var innListItem = [];
							var name = '';
							if(i == 1)
							{
								name = $scope.superOverSummary.FirstBattingTeam;
								innListItem["innNo"] = 3;
							}
							if(i == 2)
							{
								name = $scope.superOverSummary.SecondBattingTeam;
								innListItem["innNo"] = 4;
							}
								
							innListItem["name"] = name + " (SUPER OVER INN - "+i+")";
							innListItem["teamName"] = name;
							innListItem["innShortName"] = "SUPER OVER INN "+i;
							
							innListItem["innType"] = "superover";
							inningsList.push(innListItem);
						}
						if(LoadType != 'refresh' && LoadType != 'innchange')
						{
							$scope.inningsList = inningsList;
							if(cInnNumInt == 1)
								cInnNumInt = 3;
							if(cInnNumInt == 2)
								cInnNumInt = 4;
							if(inningsList != undefined && inningsList.length > 0)
							{
								inningsList.map(function(item){
									if(item.innNo == cInnNumInt && item.innType == "superover"){
										$scope.selectedInnWagonList = item;
										$scope.selectedInnList = item;
										$scope.selectedCInnList = item;
										$scope.selectedWInnList = item;
									}
										
								});
							}
						}
						
							
						currentStrikerId = data.superovermatchsummary[0].CurrentStrikerID;
						nonStrikerId = data.superovermatchsummary[0].CurrentNonStrikerID;
						currentBowlerId = data.superovermatchsummary[0].CurrentBowlerID;
						
						$scope.IsMatchEnd=data.superovermatchsummary[0].IsMatchEnd; // check the current match is live 
						$scope.scorecardHelper(mId,Inn,LoadType);
					}
						

					
				});
				
			}
			else
			{
				//set current strikerId,nonStrikerId,currentBowlerId
				currentStrikerId = $scope.matchSummary.CurrentStrikerID;
				nonStrikerId = $scope.matchSummary.CurrentNonStrikerID;
				currentBowlerId = $scope.matchSummary.CurrentBowlerID;
				
				$scope.IsMatchEnd=$scope.matchSummary.IsMatchEnd; // check the current match is live 
				$scope.scorecardHelper(mId,Inn,LoadType);
			}
			
			if($scope.IsMatchEnd == 0 && LoadType == undefined)
			{
				$("#contentDetails .mcTabs .mcTabLink").removeClass("current");
				$("#contentDetails .mcTabContent").removeClass("current");
				$("#contentDetails .mcTabs .mcTabLink[data-tab='commentPage']").addClass("current");
				$("#contentDetails #commentPage.mcTabContent").addClass("current");
			}
			if(curInn > 2 && $scope.matchSummary.MatchType == "Twenty20 Match"){
				$("#scorecardTabs li[data-tab='mwpage']").addClass("inactive");
			}
			else{
				$("#scorecardTabs li[data-tab='mwpage']").removeClass("inactive");
			}
			if($scope.matchSummary.MatchType == "Twenty20 Match" && $scope.selectedCompetition.CodingType == 'T20Pro' && curInn <= 2)
			{
				$scope.analytics_menu = analytics_menu;
			}
			else if($scope.matchSummary.MatchType == "Twenty20 Match" && curInn > 2)
				$scope.analytics_menu = false;	

			if($scope.matchSummary.MatchType == "Multi Day")
			{
				$scope.commentary_menu = commentary_menu;
			}
			else 
				$scope.commentary_menu = commentary_menu;

			

			if(curInn==2 && $scope.IsMatchEnd!=1 && $scope.matchSummary.MatchType == "Twenty20 Match" && $scope.selectedCompetition.CodingType == 'T20Pro'){
				if(LoadType==undefined && Inn=='' && winlossPercentMeter){
					speedometer = new Speedometer ('speedometer', {theme: 'default'});
			        speedometer.draw ();
			        speedometer.addEventListener ('speedometer:animateend', function () {
			          controls.start ();
			        });

			        var controls = new Controls ();
			        controls.start ();
					
					$(".winlossPercentMeter").removeClass("inactive");
				}
				if(scorePotential && $("#spotential_widget").hasClass("inactive"))
				{
					$scope.bindWLP(curInn,matchId);
				}
					
			}

			scorecardTabMenuEvents();
			$scope.videoscorecard = videoscorecard;

			if($scope.selectedCompetition.Standings != undefined && $scope.selectedCompetition.Standings == 'No')
				$scope.standingsMenu = false;
			else
				$scope.standingsMenu = standingsMenu;
		});
	}

	/******* get squad list function ******/	
	$scope.getSquadList=function(matchId){
		mcService.GetSquad(matchId, function(data) {
			var squadA = (data.squadA != undefined) ? data.squadA : [];
			var squadAPlayerIds = [];
			$scope.squadANonPlaying = [];
			$scope.squadBNonPlaying = [];
			
			for(var i=0;i<squadA.length;i++){
				var playerName = (squadA[i].PlayerName != undefined) ? titleCase(squadA[i].PlayerName) : "";
				var impactPlayer = playerName.includes("(IP)");
				if(impactPlayer)
					squadA[i].IP = 1;
				var replacePlayer = playerName.includes("(RP)");
				if(replacePlayer)
					squadA[i].RP = 1;

				playerName = playerName.replace("(IP)", "");
				playerName = playerName.replace("(RP)", "");
				playerName = playerName.replace("(CS)", "");
				playerName = playerName.replace("(C SUB)", "");
				playerName = playerName.replace("*", "");
					playerName = playerName.replace("+", "");
					playerName = playerName.replace("(C)", "");
					playerName = playerName.replace("(WK)", "");
					playerName = playerName.replace("(C)(WK)", "");
				var PlayerSkill = (squadA[i].PlayerSkill != undefined) ? titleCase(squadA[i].PlayerSkill) : "";
				if(PlayerSkill == 'Batsman')
					PlayerSkill = 'Batter';
				squadA[i].PlayerSkill = PlayerSkill;
				squadA[i].PlayerName = playerName;
				squadAPlayerIds.push(squadA[i].PlayerID);
				if(squadA[i].PlayingOrder == undefined)
					squadA[i].PlayingOrder = 1;
				if(squadA[i].PlayingOrder > 11)
					$scope.squadANonPlaying.push(squadA[i]);
			}
			$scope.squadA = squadA;
			$scope.squadATeamName= data.squadA[0].TeamName;
			$scope.squadATeamCode= data.squadA[0].TeamCode;
			
			
			
			if($scope.squadATeamName == $scope.matchSummary.FirstBattingTeam)
				$scope.squadATeamLogo = $scope.matchSummary.FirstBattingTeamLogo;
			else if($scope.squadATeamName == $scope.matchSummary.SecondBattingTeam)
				$scope.squadATeamLogo = $scope.matchSummary.SecondBattingTeamLogo;

			var squadB = (data.squadB != undefined) ? data.squadB : [];
			var squadBPlayerIds = [];
			for(var i=0;i<squadB.length;i++){
				var playerName = (squadB[i].PlayerName != undefined) ? titleCase(squadB[i].PlayerName) : "";
				var impactPlayer = playerName.includes("(IP)");
				if(impactPlayer)
					squadB[i].IP = 1;
				var replacePlayer = playerName.includes("(RP)");
				if(replacePlayer)
					squadB[i].RP = 1;
				playerName = playerName.replace("(IP)", "");
				playerName = playerName.replace("(RP)", "");
				playerName = playerName.replace("(CS)", "");
				playerName = playerName.replace("(C SUB)", "");
				playerName = playerName.replace("*", "");
					playerName = playerName.replace("+", "");
					playerName = playerName.replace("(C)", "");
					playerName = playerName.replace("(WK)", "");
					playerName = playerName.replace("(C)(WK)", "");
				var PlayerSkill = (squadB[i].PlayerSkill != undefined) ? titleCase(squadB[i].PlayerSkill) : "";
				if(PlayerSkill == 'Batsman')
					PlayerSkill = 'Batter';
				squadB[i].PlayerSkill = PlayerSkill;
				squadB[i].PlayerName = playerName;
				squadBPlayerIds.push(squadB[i].PlayerID);
				if(squadB[i].PlayingOrder == undefined)
					squadB[i].PlayingOrder = 1;
				if(squadB[i].PlayingOrder > 11)
					$scope.squadBNonPlaying.push(squadB[i]);
			}
			$scope.squadB = squadB;
			$scope.squadBTeamName= data.squadB[0].TeamName;
			$scope.squadBTeamCode= data.squadB[0].TeamCode;

			if($scope.squadBTeamName == $scope.matchSummary.FirstBattingTeam)
				$scope.squadBTeamLogo = $scope.matchSummary.FirstBattingTeamLogo;
			else if($scope.squadBTeamName == $scope.matchSummary.SecondBattingTeam)
				$scope.squadBTeamLogo = $scope.matchSummary.SecondBattingTeamLogo;
			$scope.squad=$scope.FindWidget(scorecardSidewidgets,'squad');
			
			if($scope.curSeasonName < 2019){
				if($scope.squadATeamName == 'Delhi Capitals')
					$scope.squadATeamName = 'Delhi Daredevils';
				if($scope.squadATeamCode == 'DC')
					$scope.squadATeamCode = 'DD';
				if($scope.squadBTeamName == 'Delhi Capitals')
					$scope.squadBTeamName = 'Delhi Daredevils';
				if($scope.squadBTeamCode == 'DC')
					$scope.squadBTeamCode = 'DD';
			}
			
			if (!$scope.$$phase) {
				$scope.$apply();
			}

			
			/*mcService.GetFixtureSquad(matchId, function(data) {
					if(data != undefined && data != ''){
						var squadAFullList = (data.squadA != undefined) ? data.squadA : [];
						var squadANonPlaying = [];
						for(var i=0;i<squadAFullList.length;i++){
							var playerName = (squadAFullList[i].PlayerName != undefined) ? titleCase(squadAFullList[i].PlayerName) : "";
							playerName = playerName.replace("(IP)", "");
							playerName = playerName.replace("(RP)", "");
							playerName = playerName.replace("(CS)", "");
							playerName = playerName.replace("(C SUB)", "");
							playerName = playerName.replace("*", "");
							playerName = playerName.replace("+", "");
							playerName = playerName.replace("(C)", "");
							playerName = playerName.replace("(WK)", "");
							playerName = playerName.replace("(C)(WK)", "");
							var PlayerSkill = (squadAFullList[i].PlayerSkill != undefined) ? titleCase(squadAFullList[i].PlayerSkill) : "";
							if(PlayerSkill == 'Batsman')
								PlayerSkill = 'Batter';
							squadAFullList[i].PlayerSkill = PlayerSkill;
							squadAFullList[i].PlayerName = playerName;
							if( jQuery.inArray( squadAFullList[i].PlayerID, squadAPlayerIds ) < 0)
								squadANonPlaying.push(squadAFullList[i]);
						}
						$scope.squadANonPlaying = squadANonPlaying;

						var squadBFullList = (data.squadB != undefined) ? data.squadB : [];
						var squadBNonPlaying = [];
						for(var i=0;i<squadBFullList.length;i++){
							var playerName = (squadBFullList[i].PlayerName != undefined) ? titleCase(squadBFullList[i].PlayerName) : "";
							playerName = playerName.replace("(IP)", "");
							playerName = playerName.replace("(RP)", "");
							playerName = playerName.replace("(CS)", "");
							playerName = playerName.replace("(C SUB)", "");
							playerName = playerName.replace("*", "");
							playerName = playerName.replace("+", "");
							playerName = playerName.replace("(C)", "");
							playerName = playerName.replace("(WK)", "");
							playerName = playerName.replace("(C)(WK)", "");
							var PlayerSkill = (squadBFullList[i].PlayerSkill != undefined) ? titleCase(squadBFullList[i].PlayerSkill) : "";
							if(PlayerSkill == 'Batsman')
								PlayerSkill = 'Batter';
							squadBFullList[i].PlayerSkill = PlayerSkill;
							squadBFullList[i].PlayerName = playerName;
							if( jQuery.inArray( squadBFullList[i].PlayerID, squadBPlayerIds ) < 0)
								squadBNonPlaying.push(squadBFullList[i]);
						}
						$scope.squadBNonPlaying = squadBNonPlaying;
					}
				
					if (!$scope.$$phase) {
						$scope.$apply();
					}
					
				});*/
			
		});
	}
	
	$scope.viewTeamSquad = function(pType){
		$("#fixtureSquad-block .ap-inner-tb-click").removeClass("ap-active-team");
		$("#fixtureSquad-block .ap-inner-tb-click."+pType).addClass("ap-active-team");
		$("#teams .ap-inner-tb-click").removeClass("ap-active-team");
		$("#teams .ap-inner-tb-click."+pType).addClass("ap-active-team");
		
		$(".fixtureSquad-content").removeClass("active");
		$(".fixtureSquad-content."+pType).addClass("active");
	}
	
	$scope.getMatchNotes = function(pmatchId,pInn){
		mcService.getMatchNotes(pmatchId, function(data) {
			
			var matchNotes = (data.matchnotes != undefined) ? data.matchnotes : [];
			$scope.matchNotes = matchNotes;
			/*for(var i=0;i<matchNotes.length;i++){
					if(matchNotes[i].InningsNo == pInn)
						$scope.matchNotes.push(matchNotes[i]);
			}*/
			if (!$scope.$$phase) {
				$scope.$apply();
			}
		});
	}

	$scope.showPhotostreamPage = false;
	$scope.showVideoPage = false;
	$scope.scorecardTabsChange = function(activeTabLink){
		$("#expertanalysis").hide();
		$("#liveStreamPlayer").html("");
		// if(activeTabLink != "summaryPage" || true)
		// {
		// 	$scope.hideLiveStream = true;
		// 	if($scope.matchLiveStream && $scope.IsMatchEnd == 0)
		// 	{
		// 		if(jwplayer().getState() == "playing")
		// 			jwplayer().pause();
		// 	}
		// }
		// else
		// {
		// 	$scope.hideLiveStream = false;
		// 	if($scope.matchLiveStream && $scope.IsMatchEnd == 0)
		// 		jwplayer().play();
			
		// }

		if(activeTabLink == 'photostreamPage'){
			$("#expertanalysis").hide();
			$scope.getPhotosList($scope.matchId);
		}
		else{
			$scope.showPhotostreamPage = false;
		}
		
		if(activeTabLink == 'videostreamPage'){
			$("#expertanalysis").hide();
			$scope.getVideosList($scope.matchId);
		}
		else{
			$scope.showVideoPage = false;
		}	
				
		if(activeTabLink == "newsPage" || activeTabLink == "photostreamPage" || activeTabLink == "videostreamPage")
		{
			$scope.$broadcast ('getMatchSpecificNews');
		}

		if(activeTabLink == "matchInfo"){
			$("#expertanalysis").hide();
			$("#fixtureSquad").hide();
			$("#matchInfo").show();
		}
		if(activeTabLink == "fixtureSquad"){
			$("#matchInfo").hide();
			$("#expertanalysis").hide();
			$("#fixtureSquad").show();
		}
		if(activeTabLink == "expertanalysis"){
			$("#matchInfo").hide();
			$("#fixtureSquad").hide();
			$("#expertanalysis").show();
		}


		if(activeTabLink == "mwpage"){
			$("#expertanalysis").hide();
			$scope.manhattanRefresh();
			setTimeout(function(){
			//	$("#smipl-manhattan-wrap").getNiceScroll().hide();
	         //   $("#smipl-manhattan-wrap").getNiceScroll().resize();
	         //   $("#smipl-manhattan-wrap").getNiceScroll().show();
			},1000);
		}
		else
		{
			setTimeout(function(){
				$("#smipl-manhattan-wrap").getNiceScroll().hide();
	            $("#smipl-manhattan-wrap").getNiceScroll().resize();
			},1000);
		}

	/*	 $([document.documentElement, document.body]).animate({
	        scrollTop: $("#scorecardTabs").offset().top - 120
	    }, 1000);*/
	}
	
	$scope.inningsMediaList = [];
	$scope.getWicketMedia = function(overNo,BallNo){
		var returnObj = [];
		for(var i=0;i<$scope.inningsMediaList.length;i++){
			var overfound = false;
			var ballfound = false;
			for(j=0;j<$scope.inningsMediaList[i].tags.length;j++){
				if($scope.inningsMediaList[i].tags[j].label == 'over-'+overNo)
					overfound = true;
				if($scope.inningsMediaList[i].tags[j].label == 'ball-'+BallNo)
					ballfound = true;
			}
			
			if(overfound && ballfound)
			{
				returnObj = $scope.inningsMediaList[i];
				break;
			}
		}
		return returnObj;
	}

	/******* scorecard sub function ******/
	var inningsMediaListReqCompleted = false;
	$scope.scorecardHelper=function(mId,Inn,LoadType){
		$scope.matchType=$scope.matchSummary.MatchType;

		if (!$scope.$$phase) {
			$scope.$apply();
		}
		var scorecardType = $(".smscorecardwidget").attr("widgettype");				
		$scope.scorecardType = scorecardType;
				
		
		if((LoadType == 'refresh' && $scope.matchSummary.CurrentInnings == curInn) || (LoadType != 'refresh')){
				if(scorecardType == 'international' && LoadType != 'refresh'){
					var cMatchId = matId;
				//	if(matId == 402)
				//		cMatchId = 33759;
					$scope.inningsMediaList = [];
					inningsMediaListReqCompleted = false;
					mcService.GetMediaList(cMatchId,curInn,function(data){						
						$scope.inningsMediaList = 	(data.data != undefined) ? data.data : [];
						inningsMediaListReqCompleted = true;
					});

					$scope.getInningsData(matchId,$scope.currentInnText,LoadType);
					
				}
				else{
					$scope.getInningsData(matchId,$scope.currentInnText,LoadType);
				}
		}
		else
			$(".pageloader").removeClass('active');
		clearInterval(liveScoreCardInterval);
		// if(cloudFirestore)
  //   		firebaseRef();
		liveScoreCardInterval = '';
		if($scope.checkMatchEnd(matchId))
			$scope.IsMatchEnd = 1;
		if($scope.IsMatchEnd ==0 && !$scope.checkMatchEnd(matchId) && !cloudFirestore){
			liveScoreCardInterval=setInterval(function(){
					$scope.constructScoreCard(matchId,curInn,'refresh');  // calling live scorecard  refreshing function
				},15000);
			
		}
		$(".teamVteam").addClass('endInning');
		$(".teamVteam[data-curInn='"+curInn+"']").removeClass('endInning');
		
		if(LoadType != 'refresh' && cloudFirestore){
			var matchIdString = matchId.toString();
			clearInterval(listencloudFirestoreDB);
			listencloudFirestoreDB = setInterval(function(){
				if(cloudFirestoreDB != ""){
					clearInterval(listencloudFirestoreDB);
					firebaseRef = cloudFirestoreDB.collection("matchstatus").doc(matchIdString)
				    .onSnapshot(function(doc) {
				        if(firebaseObjChange)
				        	$scope.constructScoreCard(matchId,curInn,'refresh'); 
				    });
				}
				
			},100);


			

		}

		//call word cloud
		//	$scope.bindWC(matchId);
		//	$scope.bindSA(matchId);
		if($scope.liveBriefWidget)
		{
			$scope.bindmomentum(matchId,curInn,"init");
			// call score potential function
			if(curInn < 2)
			{
				if($(".potenTab").hasClass("active"))
					$scope.bindSP(matchId,curInn);
			}	
			else	
			{
				if($("#spotential_widget").hasClass("inactive"))
				{
					$scope.bindWLP(curInn,matchId);
				}
					
				//$scope.showWLP = true;
			}

			$(".mcTabContent").removeClass("current");
			$("#analytPage").addClass("current");
			$(".fixWrap").addClass("fullWidth");
			$scope.showMDWidget=false;
			$scope.showPartnerShip=false;
			$scope.showFixWidget=false;
			$scope.showResWidget=false;
			$scope.showLiveWidget=false;
			$scope.showPTWidget=false;
			$scope.showLeadPlayes=false;
			$scope.showSA =false;
			$scope.showWC = false;
			
			$scope.showFixture=true;
			if($('.liveListHead').hasClass('mnActive') || LoadType == 'liveBriefWidget')
				$scope.showscorecard=true;
			else
				$scope.showscorecard=false;	
			$scope.showplayerstats=false;
			$scope.showstandings=false;
			$scope.showtourstats=false;
			
			$(".winlossPercentMeter").addClass("inactive");
		}
		if(LoadType != 'refresh')
				$scope.getAnalyticsInfo("init");
	} 

	$scope.getInningsDataOnly=function(matchId,curInn){
		var iText = "Innings" +$scope.matchSummary.CurrentInnings;
		$(".scorecardOverlay .teamScore").removeClass("current");
		$(".scorecardOverlay .teamScore.teamS"+curInn).addClass("current");
		$(".scorecardOverlay .teamsummary").addClass("innchange");
		if(curInn == iText)
		{
			$scope.pbattingCard=[];
			$scope.pbowlingCard=[];
			$scope.pextras=[];
		}
		else
		{
			mcService.GetScoringJs(matchId,curInn,function(data){
				data=data[curInn];
				$scope.pbattingCard=data.BattingCard;
				$scope.pbowlingCard=data.BowlingCard;
				$scope.pextras=data.Extras[0];
				
				if (!$scope.$$phase) {
	           		$scope.$apply();
	    		}
			});
		}
		
	}
	
	$scope.displayOverNo = function(n){
		 var result = (n - Math.floor(n)) !== 0; 
   
		  if (result)
			return n;
		   else
			 return parseInt(n);
		  
	}

	$scope.viewPopupscorecard = function(){
		var scorecardHtml = "";
		var briefscoreHtml = $("#briefScoreBox").html();
		var scoreContentHtml = $("#contentDetails").html();
		scorecardHtml += briefscoreHtml + scoreContentHtml;
		$(".popupScorecardContent").html(scorecardHtml);
		$(".popupScorecard").addClass("active");
		$(".popupScorecardContent .mcTabs .mcTabLink").removeClass("current");
		$(".popupScorecardContent .mcTabs .mcTabLink[data-tab='fullScorePage']").addClass("current");
		$(".popupScorecardContent .mcTabContent").removeClass("current");
		$(".popupScorecardContent #fullScorePage.mcTabContent").addClass("current");
		scorecardTabMenuEvents();
	}

	var innRef = 0;
	/******* get players innings data ******/
	$scope.getInningsData=function(matchId,curInn,LoadType){
		
		mcService.GetScoringJs(matchId,curInn,function(data){
			if(data.length == 0)
			{
				$(".pageloader").removeClass("active");
				var prevInn = $scope.matchSummary.CurrentInnings - 1;
				if(curInn == 'Innings1'){
					$("#scorecardTabs").addClass("inactive");
					$("#scorecardTabs li").removeClass("current");
					$("#scorecardTabs li[data-tab='fullScoreContent']").addClass("current");
					$("#scorecardWrapper .mcTabContent").removeClass("current");
					$("#scorecardWrapper #fullScoreContent.mcTabContent").addClass("current");
					$("#leftPanel").addClass("inactive");
					$("#rightPanel").addClass("l12");
					$(".preliveCommentary").removeClass("inactive");
					
					$("#cmdBlockSmipl").addClass("inactive");
					$(".commentarySidePanel").addClass("l12");
					$(".ap-ball-summary-wrp").addClass("hideElement");
					$(".mcBriefScoreBox").show();
					$("#commentary .commentaryTitleWrap").addClass("inactive");
					$(".stadingsSideWidget,.mcTabsWrap").addClass("inactive");
					
					$("#commentary").show();
					//$("#fixtureSquad").hide();
				}
				else{
					// if(prevInn > 0)
					// 	$scope.constructScoreCard(matchId,prevInn);
				}
				
				return;
			}
			else if(data[curInn] != undefined)
			{
				$(".preliveCommentary").addClass("inactive");
				if(curInn == 'Innings1' && data[curInn]['BattingCard'][0]['MatchID'] == 0)
				{
					$("#scorecardTabs").addClass("inactive");
					$("#leftPanel").addClass("inactive");
					$("#rightPanel").addClass("l12");
					$(".pageloader").removeClass("active");
					
					$("#scorecardTabs").addClass("inactive");
					$("#scorecardTabs li").removeClass("current");
					$("#scorecardTabs li[data-tab='fullScoreContent']").addClass("current");
					$("#scorecardWrapper .mcTabContent").removeClass("current");
					$("#scorecardWrapper #fullScoreContent.mcTabContent").addClass("current");
					$("#leftPanel").addClass("inactive");
					$("#rightPanel").addClass("l12");
					$(".preliveCommentary").removeClass("inactive");
					
					$("#cmdBlockSmipl").addClass("inactive");
					$(".commentarySidePanel").addClass("l12");
					$(".ap-ball-summary-wrp").addClass("hideElement");
					$(".mcBriefScoreBox").show();
					$("#commentary .commentaryTitleWrap").addClass("inactive");
					$(".stadingsSideWidget").addClass("inactive");
					// $(".stadingsSideWidget,.mcTabsWrap").addClass("inactive");
					
					$("#commentary .commentarySidePanel").addClass("inactive");
					$(".fixtureViewTabs .submenu").removeClass("active");
					$(".fixtureViewTabs .submenu.matchInfo").addClass("active");
					// $("#fixtureSquad").show();
					$scope.tossView = true;
					$(".fixtureTimerCountdown").addClass('inactive');
					if(LoadType != 'refresh'){
						$scope.scorecardTabsChange('matchInfo');
						// $scope.getFixtureSquad(matchId);
					}
					if (!$scope.$$phase) {
						$scope.$apply();
					}
					
					return;
				}
				else
				{
					$scope.tossView = false;
					$("#scorecardTabs").removeClass("inactive");
					$("#leftPanel").removeClass("inactive");
					$("#rightPanel").removeClass("l12");
					
					$("#cmdBlockSmipl").removeClass("inactive");
					$(".commentarySidePanel").removeClass("l12");
					$(".ap-ball-summary-wrp").removeClass("hideElement");
					$(".mcBriefScoreBox").show();
					$("#commentary .commentaryTitleWrap").removeClass("inactive");
					$(".stadingsSideWidget,.mcTabsWrap").removeClass("inactive");
					$("#commentary .commentarySidePanel").removeClass("inactive");
					$("#fixtureSquad").hide();
					if($(".submenu[data-id='commentary']").hasClass("active")){
						$("#commentary").show();
					}
				}
				if(data[curInn]['BattingCard'][0]['MatchID'] == 0)
				{
					$(".pageloader").removeClass("active");
					var prevInn = $scope.matchSummary.CurrentInnings - 1;
					if(prevInn > 0)
						$scope.constructScoreCard(matchId,prevInn);
					return;
				}
				var battingCard = (data[curInn].BattingCard != undefined) ? data[curInn].BattingCard : [];
					for(var i=0;i<battingCard.length;i++){
						var playerName = (battingCard[i].PlayerName != undefined) ? titleCase(battingCard[i].PlayerName) : "";
						
						var impactPlayer = playerName.includes("(IP)");
						if(impactPlayer)
							battingCard[i].IP = 1;
						var replacePlayer = playerName.includes("(RP)");
						if(replacePlayer)
							battingCard[i].RP = 1;
						var cs = playerName.includes("(CS)");
						if(cs)
							battingCard[i].CS = 1;
						playerName = playerName.replace("(IP)", "");
						playerName = playerName.replace("(RP)", "");
						playerName = playerName.replace("(CS)", "");
						battingCard[i].PlayerName = playerName;
						var OutDesc = (battingCard[i].OutDesc != undefined) ? outDescTitleCase(battingCard[i].OutDesc) : "";
						battingCard[i].OutDesc = OutDesc;
					}
					var bowlingCard = (data[curInn].BowlingCard != undefined) ? data[curInn].BowlingCard : [];
					for(var i=0;i<bowlingCard.length;i++){
						var playerName = (bowlingCard[i].PlayerName != undefined) ? titleCase(bowlingCard[i].PlayerName) : "";
						var impactPlayer = playerName.includes("(IP)");
						if(impactPlayer)
							bowlingCard[i].IP = 1;
						var replacePlayer = playerName.includes("(RP)");
						if(replacePlayer)
							bowlingCard[i].RP = 1;
						var cs = playerName.includes("(CS)");
						if(cs)
							bowlingCard[i].CS = 1;
						playerName = playerName.replace("(IP)", "");
						playerName = playerName.replace("(RP)", "");
						playerName = playerName.replace("(CS)", "");
						bowlingCard[i].PlayerName = playerName;
					}
                if((LoadType == 'refresh' && $scope.currentInnViewNo == curInn) || (LoadType != 'refresh'))
                {                    $scope.mcVOverlaybattingCard = battingCard;
                    $scope.mcVOverlaybowlingCard = bowlingCard;
                    $scope.mcVOverlayOverHistory =data[curInn].OverHistory;
                }
			}
            if($scope.mcOverlayScorecard)
            {
                $(".pageloader").removeClass('active');
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                if(LoadType == "innchange")
                {
                    var viewinnNo = curInn;
                    viewinnNo = viewinnNo.replace("Innings", "");
                    viewinnNo = parseInt(viewinnNo);
                    $scope.currentInnViewNo = viewinnNo;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return;
                }
                    
            }

            if(LoadType != 'refresh' && LoadType != 'innchange' && printScoreCard)
				$scope.printScoreCard(matchId,curInn);
            
			var playerInningsData=[];
			var overpartList=[];
			var OverNo=0;
			var $bindText='<ul class="bbbSMIPL bbbMC">';
			playerInningsData=data[curInn];
			//var battingCard = (playerInningsData.BattingCard != undefined) ? playerInningsData.BattingCard : [];
			var fallOfWickets = (playerInningsData.FallOfWickets != undefined) ? playerInningsData.FallOfWickets : [];
			if(matchId > 9999 && $scope.curSeasonName < 2022){
				for(var i=0;i<fallOfWickets.length;i++){
					var FallOvers = (fallOfWickets[i].FallOvers != undefined) ? fallOfWickets[i].FallOvers : '';
					if(FallOvers != '')
						FallOvers = parseFloat(FallOvers);
					FallOvers = FallOvers - 1;
					FallOvers = Math.round(FallOvers * 10) / 10;
					fallOfWickets[i].FallOvers = FallOvers.toString();

					var wicketBall = [];
					wicketBall[0] = fallOfWickets[i];					
					if(wicketBall != undefined && wicketBall.length > 0){
						wicketBall = wicketBall[0].FallOvers;
						if(wicketBall != undefined && wicketBall != ''){
							wicketBall = wicketBall.split(".");
							fallOfWickets[i].wicketVideo = $scope.getWicketMedia(wicketBall[0],wicketBall[1]);
						}						
						
					}
				}
			}

			for(var i=0;i<fallOfWickets.length;i++){
				var wicketBall = [];
				wicketBall[0] = fallOfWickets[i];					
				if(wicketBall != undefined && wicketBall.length > 0){
					wicketBall = wicketBall[0].FallOvers;
					if(wicketBall != undefined && wicketBall != ''){
						wicketBall = wicketBall.split(".");
						fallOfWickets[i].wicketVideo = $scope.getWicketMedia(wicketBall[0],wicketBall[1]);
					}						
					
				}
			}
			
			for(var i=0;i<battingCard.length;i++){
				var playerName = (battingCard[i].PlayerName != undefined) ? titleCase(battingCard[i].PlayerName) : "";
				battingCard[i].PlayerName = playerName;
				var OutDesc = (battingCard[i].OutDesc != undefined) ? outDescTitleCase(battingCard[i].OutDesc) : "";
				battingCard[i].OutDesc = OutDesc;
				if(OutDesc != '' && OutDesc != 'not out'){					
					var PlayerID = battingCard[i].PlayerID;
					var wicketBall = $filter('filter')(fallOfWickets,{PlayerID : PlayerID},true);
					if(wicketBall != undefined && wicketBall.length > 0){
						wicketBall = wicketBall[0].FallOvers;
						if(wicketBall != undefined && wicketBall != ''){
							wicketBall = wicketBall.split(".");
							battingCard[i].wicketVideo = $scope.getWicketMedia(wicketBall[0],wicketBall[1]);
						}						
						
					}
				}
					
			}
			
			
			//var bowlingCard = (playerInningsData.BowlingCard != undefined) ? playerInningsData.BowlingCard : [];
			// for(var i=0;i<bowlingCard.length;i++){
			// 	var playerName = (bowlingCard[i].PlayerName != undefined) ? titleCase(bowlingCard[i].PlayerName) : "";
			// 	bowlingCard[i].PlayerName = playerName;
			// }

			$scope.indvBattingData = battingCard;
			$scope.indvBowlingData = bowlingCard;
			
			$scope.battingCard=battingCard;
								
			$scope.bowlingCard=bowlingCard;
			$scope.extras= (playerInningsData.Extras != undefined && playerInningsData.Extras.length > 0) ? playerInningsData.Extras[0] : [];
			if($scope.extras.Penalty == undefined || $scope.extras.Penalty == '')
				$scope.extras.Penalty = 0;
			if($scope.widgettype == 'domestic'){
				$scope.matchSummary = matchSummaryData;
				if(LoadType != 'refresh'){
					$scope.matchSummary['1FallOvers'] = oneFallOvers;
					$scope.matchSummary['1FallScore'] = oneFallScore;
					$scope.matchSummary['1FallWickets'] = oneFallWickets;
					$scope.matchSummary['2FallOvers'] = twoFallOvers;
					$scope.matchSummary['2FallScore'] = twoFallScore;
					$scope.matchSummary['2FallWickets'] = twoFallWickets;
					$scope.matchSummary['3FallOvers'] = threeFallOvers;
					$scope.matchSummary['3FallScore'] = threeFallScore;
					$scope.matchSummary['3FallWickets'] = threeFallWickets;
					$scope.matchSummary['4FallOvers'] = fourFallOvers;
					$scope.matchSummary['4FallScore'] = fourFallScore;
					$scope.matchSummary['4FallWickets'] = fourFallWickets;					
				}
				if(curInn == 'Innings1')
				{
					$scope.matchSummary['1FallOvers'] = $scope.extras.FallOvers;
					$scope.matchSummary['1FallScore'] = $scope.extras.FallScore;
					$scope.matchSummary['1FallWickets'] = $scope.extras.FallWickets;
				}
				if(curInn == 'Innings2')
				{
					$scope.matchSummary['2FallOvers'] = $scope.extras.FallOvers;
					$scope.matchSummary['2FallScore'] = $scope.extras.FallScore;
					$scope.matchSummary['2FallWickets'] = $scope.extras.FallWickets;
				}
				if(curInn == 'Innings3')
				{
					$scope.matchSummary['3FallOvers'] = $scope.extras.FallOvers;
					$scope.matchSummary['3FallScore'] = $scope.extras.FallScore;
					$scope.matchSummary['3FallWickets'] = $scope.extras.FallWickets;
				}
				if(curInn == 'Innings4')
				{
					$scope.matchSummary['4FallOvers'] = $scope.extras.FallOvers;
					$scope.matchSummary['4FallScore'] = $scope.extras.FallScore;
					$scope.matchSummary['4FallWickets'] = $scope.extras.FallWickets;
				}
			}

			FOWHtml = '<div class="fow-slider">';
			for(var i=0;i<fallOfWickets.length;i++){
				var playerName = (fallOfWickets[i].PlayerName != undefined) ? titleCase(fallOfWickets[i].PlayerName) : "";
				fallOfWickets[i].PlayerName = playerName;
				if(fallOfWickets[i].FallWickets != undefined && fallOfWickets[i].FallWickets != 0 && fallOfWickets[i].FallWickets != '')
					FOWHtml += '<div class="ap-fow-item"><div class="ap-fow-content">'+fallOfWickets[i].FallWickets+'-'+fallOfWickets[i].FallScore+' ('+playerName+', '+fallOfWickets[i].FallOvers+'ov)</div></div>';
			}
			FOWHtml +='</div>';
			if(fallOfWickets != undefined && fallOfWickets.length > 0 && fallOfWickets[0].MatchID != 0){
				$scope.fallofWickets = fallOfWickets;
				var currentInnFOF = "";
				$("#fall-of-wickets").html(FOWHtml);
				
				$('.fow-slider').slick({
					slidesToShow: 5,
					slidesToScroll: 1,
					arrows: true,
					dots: false,
					speed: 1000,
					infinite:false,
					responsive: [
						{
							breakpoint: 1025,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,

							}
						},
						{
							breakpoint: 950,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,

							}
						},
						{
							breakpoint: 700,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,

							}
						},

					]

				});
				//$(".ap-overs-slider").addClass("show-content");
				
			}				
			else
				$scope.fallofWickets = '';
			
			
			if(LoadType != 'refresh'){
				var listenMedReq = setInterval(function(){
					if(inningsMediaListReqCompleted){
						clearInterval(listenMedReq);
						for(var i=0;i<$scope.battingCard.length;i++){
							
							var OutDesc = ($scope.battingCard[i].OutDesc != undefined) ? outDescTitleCase($scope.battingCard[i].OutDesc) : "";
							
							if(OutDesc != '' && OutDesc != 'not out'){					
								var PlayerID = $scope.battingCard[i].PlayerID;
								var wicketBall = $filter('filter')($scope.fallofWickets,{PlayerID : PlayerID},true);
								if(wicketBall != undefined && wicketBall.length > 0){
									wicketBall = wicketBall[0].FallOvers;
									if(wicketBall != undefined && wicketBall != ''){
										wicketBall = wicketBall.split(".");
										$scope.battingCard[i].wicketVideo = $scope.getWicketMedia(wicketBall[0],wicketBall[1]);
									}
									
								}
							}
								
						}

						if($scope.fallofWickets != undefined && $scope.fallofWickets != ''){
							$scope.fallofWickets.map(function(item){
								var wicketBall = [];
								wicketBall[0] = item;
								if(wicketBall != undefined && wicketBall.length > 0){
									wicketBall = wicketBall[0].FallOvers;
									if(wicketBall != undefined && wicketBall != ''){
										wicketBall = wicketBall.split(".");
										item.wicketVideo = $scope.getWicketMedia(wicketBall[0],wicketBall[1]);
									}						
									
								}
							});
						}
						console.log($scope.fallofWickets);

						if (!$scope.$$phase) {
							$scope.$apply();
						}
						
					}
				},1000);
				
			}
			
			overHistory=playerInningsData.OverHistory;
			overHistoryList=playerInningsData.OverHistory;
			
			var newBatsmanList = [];
			for(var i=0;i<overHistory.length;i++){
				if(overHistory[i].IsWicket == '1'){
					var OutBatsManID = overHistory[i].OutBatsManID;
					var StrikerID = overHistory[i].StrikerID;
					var NonStrikerID = overHistory[i].NonStrikerID;
					var NotoutBatsManID = '';
					if(OutBatsManID == StrikerID)
					{
						NotoutBatsManID = NonStrikerID;
					}
					if(OutBatsManID == NonStrikerID)
					{
						NotoutBatsManID = StrikerID;
					}
					var NewBatsmanID = '';
					var NewBatsmanClientID = '';
					if(overHistory[i+1] != undefined && NotoutBatsManID != '')
					{
						var StrikerID = overHistory[i+1].StrikerID;
						var NonStrikerID = overHistory[i+1].NonStrikerID;
						if(NotoutBatsManID == StrikerID)
						{
							NewBatsmanID = NonStrikerID;
							NewBatsmanClientID = overHistory[i+1].NSTclientID;
						}
						if(NotoutBatsManID == NonStrikerID)
						{
							NewBatsmanID = StrikerID;
							NewBatsmanClientID = overHistory[i+1].STclientID;
						}
					}
					var NewBatsmanObj = {};
					if(NewBatsmanID != ''){
						NewBatsmanObj.NewBatsmanID = NewBatsmanID;
						NewBatsmanObj.NewBatsmanClientID = NewBatsmanClientID;
						NewBatsmanObj.OverNo = overHistory[i].OverNo;
						NewBatsmanObj.ActualBallNo = overHistory[i].ActualBallNo;
						NewBatsmanObj.InningsNo = overHistory[i].InningsNo;
						var NewBatsmanDet = $filter('filter')(battingCard,{PlayerID : NewBatsmanID},true)[0];
						if(NewBatsmanDet != undefined){
							NewBatsmanObj.PLAYER_ID = NewBatsmanDet.PLAYER_ID;
							NewBatsmanObj.PlayerName = NewBatsmanDet.PlayerName;
						}
						
						newBatsmanList.push(NewBatsmanObj);
					}
				}
			}
			$scope.newBatsmanList = newBatsmanList;
			if(LoadType != 'refresh'){
				$scope.allPlayerCareerStats = [];
				mcService.GetAllPlayerCareerStats(function(data){		
					$scope.allPlayerCareerStats = data;		
					
					if($scope.newBatsmanList != undefined && $scope.newBatsmanList.length > 0)			{
						$scope.newBatsmanList.map(function(item){
							
							if($scope.allPlayerCareerStats.Batting != undefined && $scope.allPlayerCareerStats.Batting.length > 0){
								var cPlayerId = item.PLAYER_ID.toString();
								item.BattingStats = $filter('filter')($scope.allPlayerCareerStats.Batting,{PlayerId : cPlayerId},true)[0];
								if(item.BattingStats != undefined && item.BattingStats.Fifties == null)
									item.BattingStats.Fifties = '-';
								if(item.BattingStats != undefined && item.BattingStats.Hundreds == null)
									item.BattingStats.Hundreds = '-';
							}
								
							
						});
					}

					if (!$scope.$$phase) {
							$scope.$apply();
					}

				});
			}
			else{
				if($scope.newBatsmanList != undefined && $scope.newBatsmanList.length > 0)			{
					$scope.newBatsmanList.map(function(item){
						
						if($scope.allPlayerCareerStats.Batting != undefined && $scope.allPlayerCareerStats.Batting.length > 0){
							var cPlayerId = item.PLAYER_ID.toString();
							item.BattingStats = $filter('filter')($scope.allPlayerCareerStats.Batting,{PlayerId : cPlayerId},true)[0];
							if(item.BattingStats != undefined && item.BattingStats.Fifties == null)
								item.BattingStats.Fifties = '-';
							if(item.BattingStats != undefined && item.BattingStats.Hundreds == null)
								item.BattingStats.Hundreds = '-';
						}
							
						
					});
				}
			}
			console.log($scope.newBatsmanList);

			/*overHistoryList = [];
			for(var o=0;o<=innRef;o++){
				overHistoryList.push(playerInningsData.OverHistory[o]);
			}
			innRef = innRef+13;
			*/
			batHeadtoHead=(playerInningsData.battingheadtohead != undefined) ? playerInningsData.battingheadtohead : [];
			bowHeadtoHead=(playerInningsData.bowlingheadtohead != undefined) ? playerInningsData.bowlingheadtohead : [];

			for(var i=0;i<batHeadtoHead.length;i++){
				var BatsManName = (batHeadtoHead[i].BatsManName != undefined) ? titleCase(batHeadtoHead[i].BatsManName) : "";
				batHeadtoHead[i].BatsManName = BatsManName;
				var BowlerName = (batHeadtoHead[i].BowlerName != undefined) ? titleCase(batHeadtoHead[i].BowlerName) : "";
				batHeadtoHead[i].BowlerName = BowlerName;
			}
			for(var i=0;i<bowHeadtoHead.length;i++){
				var BatsManName = (bowHeadtoHead[i].BatsManName != undefined) ? titleCase(bowHeadtoHead[i].BatsManName) : "";
				bowHeadtoHead[i].BatsManName = BatsManName;
				var BowlerName = (bowHeadtoHead[i].BowlerName != undefined) ? titleCase(bowHeadtoHead[i].BowlerName) : "";
				bowHeadtoHead[i].BowlerName = BowlerName;
			}

			var inntxt = "Innings" +$scope.matchSummary.CurrentInnings;
			if(inntxt == curInn)
			{
				$scope.CurrentStrikerData = $filter('filter')(playerInningsData.BattingCard,{PlayerID : $scope.matchSummary.CurrentStrikerID},true)[0];
				$scope.CurrentNonStrikerData = $filter('filter')(playerInningsData.BattingCard,{PlayerID : $scope.matchSummary.CurrentNonStrikerID},true)[0];
				$scope.CurrentBowlerData = $filter('filter')(playerInningsData.BowlingCard,{PlayerID : $scope.matchSummary.CurrentBowlerID},true)[0];	
			}
			
			var titleSummary = "";
			/*if($scope.matchSummary.CurrentInnings == 1 && $scope.matchSummary.IsMatchEnd != 1){
				var p = ($scope.matchSummary['1InningsName'] != undefined) ?  $scope.matchSummary['1InningsName'].indexOf("(") : 0;
				var cTemName = $scope.matchSummary['1InningsName'];
				if(p > 0)
					cTemName = $scope.matchSummary['1InningsName'].substring(0, p);

				if($scope.CurrentStrikerData != undefined)
					titleSummary +=  cTemName+$scope.matchSummary['1FallScore']+'/'+$scope.matchSummary['1FallWickets']+' ('+$scope.matchSummary['1FallOvers']+' ov, '+$scope.CurrentStrikerData.PlayerName+' '+$scope.CurrentStrikerData.Runs+'*, '+$scope.CurrentNonStrikerData.PlayerName+' '+$scope.CurrentNonStrikerData.Runs+'*)';
			}
			if($scope.matchSummary.CurrentInnings == 2 && $scope.matchSummary.IsMatchEnd != 1){
				var p = ($scope.matchSummary['2InningsName'] != undefined) ? $scope.matchSummary['2InningsName'].indexOf("(") : 0;
				var cTemName = $scope.matchSummary['2InningsName'];
				if(p > 0)
					cTemName = $scope.matchSummary['2InningsName'].substring(0, p);

				if($scope.CurrentStrikerData != undefined)
					titleSummary +=  cTemName+$scope.matchSummary['2FallScore']+'/'+$scope.matchSummary['2FallWickets']+' ('+$scope.matchSummary['2FallOvers']+' ov, '+$scope.CurrentStrikerData.PlayerName+' '+$scope.CurrentStrikerData.Runs+'*, '+$scope.CurrentNonStrikerData.PlayerName+' '+$scope.CurrentNonStrikerData.Runs+'*)';
			}
			if($scope.matchSummary.CurrentInnings == 3 && $scope.matchSummary.IsMatchEnd != 1){
				var p = ($scope.matchSummary['3InningsName'] != undefined) ? $scope.matchSummary['3InningsName'].indexOf("(") : 0;
				var cTemName = $scope.matchSummary['3InningsName'];
				if(p > 0)
					cTemName = $scope.matchSummary['3InningsName'].substring(0, p);

				if($scope.CurrentStrikerData != undefined)
					titleSummary +=  cTemName+$scope.matchSummary['3FallScore']+'/'+$scope.matchSummary['3FallWickets']+' ('+$scope.matchSummary['3FallOvers']+' ov, '+$scope.CurrentStrikerData.PlayerName+' '+$scope.CurrentStrikerData.Runs+'*, '+$scope.CurrentNonStrikerData.PlayerName+' '+$scope.CurrentNonStrikerData.Runs+'*)';
			}
			if($scope.matchSummary.CurrentInnings == 4 && $scope.matchSummary.IsMatchEnd != 1){
				var p = ($scope.matchSummary['3InningsName'] != undefined) ? $scope.matchSummary['4InningsName'].indexOf("(") : 0;
				var cTemName = $scope.matchSummary['4InningsName'];
				if(p > 0)
					cTemName = $scope.matchSummary['4InningsName'].substring(0, p);

				if($scope.CurrentStrikerData != undefined)
					titleSummary +=  cTemName+$scope.matchSummary['4FallScore']+'/'+$scope.matchSummary['4FallWickets']+' ('+$scope.matchSummary['4FallOvers']+' ov, '+$scope.CurrentStrikerData.PlayerName+' '+$scope.CurrentStrikerData.Runs+'*, '+$scope.CurrentNonStrikerData.PlayerName+' '+$scope.CurrentNonStrikerData.Runs+'*)';
			} */
			
			var cTemName = $scope.extras['BattingTeamName'];
					
			if($scope.matchSummary.IsMatchEnd == 1)
				titleSummary = $scope.matchSummary.MatchName +' ('+$scope.matchSummary.Comments+')';
			else{
				titleSummary +=  cTemName;
				if($scope.CurrentStrikerData != undefined && $scope.CurrentNonStrikerData != undefined){
					titleSummary +=  ' '+$scope.extras['FallScore']+'/'+$scope.extras['FallWickets']+' ('+$scope.extras['FallOvers']+' ov, '+$scope.CurrentStrikerData.PlayerName+' '+$scope.CurrentStrikerData.Runs+'*, '+$scope.CurrentNonStrikerData.PlayerName+' '+$scope.CurrentNonStrikerData.Runs+'*)';
				}					
			}
			/*if(titleSummary != '' && inntxt == curInn)
				$(document).prop('title', titleSummary);*/
			
			
			
			// divide overhistory by overs
			var j=0;
			if($scope.IsMatchEnd!=1 || true){
				for(var i=overHistoryList.length-1; i>=0; i--){
					if(overHistoryList[i].OverNo!=OverNo){

						//reverse the ball list
						var ballsList=$filter('filter')(overHistoryList,{OverNo:overHistoryList[i].OverNo},true);
						var revBallList = [];
						var m=0;
						for(var k=ballsList.length-1;k>=0;k--)
						{
							//ballsList[k]["Commentry"] = ballsList[k]["NewCommentry"];
							if(ballsList[k]['UPDCommentry'] != undefined && ballsList[k]['UPDCommentry'] != '')
							{
								var commentaryText = ballsList[k]['UPDCommentry'];
								var sepPos = commentaryText.indexOf(",");
								var commentaryFirstBlock = commentaryText.substring(0, sepPos);
								var commentaryOtherTxt = commentaryText.substring(sepPos+1, commentaryText.length);
								commentaryOtherTxt = commentaryOtherTxt.trim();
								commentaryOtherTxt = commentaryOtherTxt.charAt(0).toUpperCase() + commentaryOtherTxt.slice(1); 
								ballsList[k]['commentaryFirstBlock'] = commentaryFirstBlock;
								ballsList[k]['UPDCommentry'] = commentaryOtherTxt;
							}
							if((ballsList[k]['UPDCommentry'] == undefined || ballsList[k]['UPDCommentry'] == '') && (ballsList[k]['Commentry'] != undefined && ballsList[k]['Commentry'] != ''))
							{
								var commentaryText = ballsList[k]['Commentry'];
								var sepPos = commentaryText.indexOf(",");
								var commentaryFirstBlock = commentaryText.substring(0, sepPos);
								var commentaryOtherTxt = commentaryText.substring(sepPos+1, commentaryText.length);
								commentaryOtherTxt = commentaryOtherTxt.trim();
								commentaryOtherTxt = commentaryOtherTxt.charAt(0).toUpperCase() + commentaryOtherTxt.slice(1); 
								ballsList[k]['commentaryFirstBlock'] = commentaryFirstBlock;
								ballsList[k]['Commentry'] = commentaryOtherTxt;
							}
							revBallList[m] = ballsList[k];
							m++;
						}
						overpartList[j]=revBallList;
						j++;
					}
					OverNo=overHistoryList[i].OverNo;
				}
			}
			else{
				for(var i=0; i<overHistoryList.length; i++){
					if(overHistoryList[i].OverNo!=OverNo){
						//reverse the ball list
						var ballsList=$filter('filter')(overHistoryList,{OverNo:overHistoryList[i].OverNo},true);
						var revBallList = [];
						var m=0;
						for(var k=0;k<ballsList.length;k++)
						{
						//	ballsList[k]["Commentry"] = ballsList[k]["NewCommentry"];
							revBallList[m] = ballsList[k];
							m++;
						}
						overpartList[j]=revBallList;
						j++;
					}
					OverNo=overHistoryList[i].OverNo;
				}
			}
			if($scope.matchSummary.Innings1Overs == undefined) $scope.matchSummary.Innings1Overs = 20;
			if($scope.matchSummary.Innings2Overs == undefined) $scope.matchSummary.Innings2Overs = 20;
			$scope.overHistory=overpartList;
			if(LoadType != 'refresh'){
				$scope.maxInn1Overs = parseInt($scope.matchSummary.Innings1Overs);
				$scope.maxInn2Overs = parseInt($scope.matchSummary.Innings2Overs);
			}				
			var OverNoList = [];			
			var Inn1TotalOvers = ($scope.matchSummary.Innings1Overs != undefined && $scope.matchSummary.Innings1Overs != '') ? $scope.matchSummary.Innings1Overs : 20;
			for(var n=1;n<=Inn1TotalOvers;n++){
				var overObj = {OverNo:n};
				OverNoList.push(overObj);
			}
			$scope.Inn1OverNoList = OverNoList;
			var OverNoList = [];	
			var Inn2TotalOvers = ($scope.matchSummary.Innings2Overs != undefined && $scope.matchSummary.Innings2Overs != '') ? $scope.matchSummary.Innings2Overs : 20;
			for(var n=1;n<=Inn2TotalOvers;n++){
				var overObj = {OverNo:n};
				OverNoList.push(overObj);
			}
			$scope.Inn2OverNoList = OverNoList;
			
			//bind ball by ball data
			var ballbyBallHtml = '<div class="ap-overs-slider">';
			
			for(var k=0; k<overpartList.length; k++){
				ballbyBallHtml += '<div class="ap-overs-item"><div class="ap-overs-content col-100 floatLft flexDisplay alignCenter"><span class="ap-over-num">OVER '+overpartList[k][0].OverNo+'</span>';
				$bindText+="<li class='mcOver vclickable' ng-click='playOverVideo("+overpartList[k][0].OverNo+","+overpartList[k][0].InningsNo+")'>OV "+overpartList[k][0].OverNo+"</li>";
				for(var m=0; m<overpartList[k].length; m++){
					if(overpartList[k][m].BallID != ''){					
					
						if(overpartList[k][m].BallRuns==0){
							$bindText+="<li title='"+overpartList[k][m].BallName+"' ng-mouseover='viewBallDetails("+overpartList[k][m].BallCount+","+overpartList[k][0].OverNo+","+"$event"+")' ng-click='playBYBVideo("+overpartList[k][m].BallCount+","+overpartList[k][0].OverNo+")' class='vclickable'><a class='"+$scope.genColor(overpartList[k][m])+"'>&#8226;</a></li>";
						}							
						else{
							$bindText+="<li title='"+overpartList[k][m].BallName+"' ng-mouseover='viewBallDetails("+overpartList[k][m].BallCount+","+overpartList[k][0].OverNo+","+"$event"+")' ng-click='playBYBVideo("+overpartList[k][m].BallCount+","+overpartList[k][0].OverNo+")' class='vclickable'>";	
							if(overpartList[k][m].IsWide != 1 && overpartList[k][m].IsNoBall != 1 && overpartList[k][m].IsBye != 1 && overpartList[k][m].IsLegBye != 1)
								$bindText+="<a  class='"+$scope.genColor(overpartList[k][m])+"'>"+overpartList[k][m].BallRuns+"</a>";
							if(overpartList[k][m].IsWide == 1)
								$bindText+="<a  class='ovExRun "+$scope.genColor(overpartList[k][m])+"'>"+overpartList[k][m].BallRuns+"WD</a>";
							if(overpartList[k][m].IsNoBall == 1)
								$bindText+="<a  class='ovExRun "+$scope.genColor(overpartList[k][m])+"'>"+overpartList[k][m].BallRuns+"NB</a>";
							if(overpartList[k][m].IsBye == 1 && overpartList[k][m].IsWide != 1 && overpartList[k][m].IsNoBall != 1)
								$bindText+="<a  class='ovExRun "+$scope.genColor(overpartList[k][m])+"'>"+overpartList[k][m].BallRuns+"B</a>";
							if(overpartList[k][m].IsLegBye == 1 && overpartList[k][m].IsWide != 1 && overpartList[k][m].IsNoBall != 1)
								$bindText+="<a  class='ovExRun "+$scope.genColor(overpartList[k][m])+"'>"+overpartList[k][m].BallRuns+"LB</a>";
							$bindText+="</li>";
						}
							
						
						ballbyBallHtml += '<div class="ap-overs-ball"><span class="ap-ball-single">'+overpartList[k][m].BallRuns+'</span></div>';
					}
				}
				ballbyBallHtml +=  '</div></div>';
			}
			$bindText+="</ul>";
			ballbyBallHtml +=  '</div>';
			if(overpartList != undefined && overpartList[0] != undefined && overpartList[0][0] != undefined && overpartList[0][0]["BallID"] != undefined && overpartList[0][0]["BallID"] !== 0)
			{
				$("#overStreamMC").removeClass("inactive");
				$("#overStreamSMIPL").html(
				  $compile(
				    $bindText
				  )($scope)
				);	
				/*$("#ball-by-ball").html(ballbyBallHtml);
				setTimeout(function(){
					if ($('.ap-overs-slider').length > 0) {
						$('.ap-overs-slider').slick({
								slidesToShow: 3,
								slidesToScroll: 1,
								arrows: true,
								dots: false,
								speed: 1000,
								infinite:false,
								responsive: [
									{
										breakpoint: 950,
										settings: {
											slidesToShow: 2,
											slidesToScroll: 1,

										}
									},
									{
										breakpoint: 700,
										settings: {
											slidesToShow: 1,
											slidesToScroll: 1,

										}
									},

								]

							});
							$(".ap-overs-slider").addClass("show-content");
							var currentSlide = $('.ap-overs-slider').slick('slickCurrentSlide');
							console.log(currentSlide);
						
					}
					
				});*/
				
			}
			else{
				$("#overStreamMC").addClass("inactive");
			}
				
			// get wagon wheel summary
			if(playerInningsData.WagonWheelSummary!=undefined && playerInningsData.WagonWheelSummary[0]!=undefined){
				$scope.wagonWheelSummary=playerInningsData.WagonWheelSummary[0];
				console.log($scope.wagonWheelSummary);
				// $scope.wagonWheelSummaryTotal = $scope.wagonWheelSummary.Ones + $scope.wagonWheelSummary.Twos + $scope.wagonWheelSummary.Threes + $scope.wagonWheelSummary.Fours  + $scope.wagonWheelSummary.Sixes;
				
			}
			//draw wagon wheel
			if(playerInningsData.WagonWheel!=undefined && playerInningsData.WagonWheel[0]!=undefined){
				WagonWheelResult=playerInningsData.WagonWheel;
				var wagonWheelSummaryTotal = 0;
				WagonWheelResult.map(function(item){
					wagonWheelSummaryTotal = wagonWheelSummaryTotal + item.Runs;
				});
				$scope.wagonWheelSummaryTotal = wagonWheelSummaryTotal;
				$scope.constructWagon(WagonWheelResult);
				$(window).resize(function(){
					$scope.constructWagon(WagonWheelResult);
				});
			}
			//partnership
			if(playerInningsData.PartnershipBreak != undefined && playerInningsData.PartnershipScores != undefined){
				var teamTotal = parseInt(playerInningsData.Extras[0].FallScore);
				 var PartnerShipRuns = playerInningsData.PartnershipScores, PartnerShipWicket = playerInningsData.PartnershipBreak;
                    var len = PartnerShipRuns.length, leng = PartnerShipWicket.length;
                    var partnershipData = [];
					var MaxPartnerShipRuns = parseInt(playerInningsData.Extras[0].MaxPartnerShipRuns) + 50;
                    for (var i = 0; i < len; i += 2) {
                        var isOut = '*';
                        for (var j = 0; j < leng; j++) {
                            if (PartnerShipWicket[j].OutBatsmanID == PartnerShipRuns[i].NonStrikerID || PartnerShipWicket[j].OutBatsmanID == PartnerShipRuns[i].StrikerID) {
                                isOut = '';
                            }
                        }
                        var PartnershipTotal = PartnerShipRuns[i].PartnershipTotal;
                        var wid = 0, ewid = 0, nonwid = 0;
                        if (PartnershipTotal == 0) {
                            wid = 0;
                            ewid = 0;
                            nonwid = 0;
                        } else {
                            wid = (PartnerShipRuns[i].StrikerRuns / MaxPartnerShipRuns) * 100;
                            ewid = (PartnerShipRuns[i].Extras / MaxPartnerShipRuns) * 100;
                            nonwid = (PartnerShipRuns[i].NonStrikerRuns / MaxPartnerShipRuns) * 100;
                        }

                        if (wid == 0 && ewid == 0 && nonwid == 0) {
                            PartnerShipRuns[i].TableWid = true;
                        } else {
                            PartnerShipRuns[i].TableWid = false;
                        }
                        PartnerShipRuns[i].isOut = isOut;
                        PartnerShipRuns[i].StrikerWid = wid;
                        PartnerShipRuns[i].ExtraWid = ewid;
                        PartnerShipRuns[i].NonStrikerWid = nonwid;
                        PartnerShipRuns[i].PartnershipBalls = parseInt(PartnerShipRuns[i].StrikerBalls, 0) + parseInt(PartnerShipRuns[i].NonStrikerBalls, 0);

                        var strikerName = (PartnerShipRuns[i].Striker != undefined) ? titleCase(PartnerShipRuns[i].Striker) : "";
						PartnerShipRuns[i].Striker = strikerName;
						var nonstrikerName = (PartnerShipRuns[i].NonStriker != undefined) ? titleCase(PartnerShipRuns[i].NonStriker) : "";
						PartnerShipRuns[i].NonStriker = nonstrikerName;

                        partnershipData.push(PartnerShipRuns[i]);
                    }
                    $scope.PartnerShipRuns = partnershipData;
                    
			}
			// Manhattan Graph
			if (playerInningsData.ManhattanGraph != undefined && playerInningsData.ManhattanWickets != undefined && $scope.matchSummary.CurrentInnings <= 2) {

                    var inn1bar = [];
                    var inn2bar = [];
                    if (parseInt(playerInningsData.ManhattanGraph[0]['InningsNo']) != 0) {
                        inn1bar = playerInningsData.ManhattanGraph;
                    }
					for(var i=0;i<inn1bar.length;i++){
						var Bowler = (inn1bar[i].Bowler != undefined) ? titleCase(inn1bar[i].Bowler) : "";
						inn1bar[i].Bowler = Bowler;
						inn1bar[i].OverRuns = (inn1bar[i].OverRuns != undefined && inn1bar[i].OverRuns != '') ?  parseInt(inn1bar[i].OverRuns) : inn1bar[i].OverRuns;
						
					}
                    barchartData['BarChart'] = inn1bar;
                    var inn1worm = [];
                    var inn2worm = [];
                    if (playerInningsData.ManhattanWickets[0] != undefined && parseInt(playerInningsData.ManhattanWickets[0]['InningsNo']) != 0)
                        inn1worm = playerInningsData.ManhattanWickets;
                    for(var i=0;i<inn1worm.length;i++){
						var OutBatsman = (inn1worm[i].OutBatsman != undefined) ? titleCase(inn1worm[i].OutBatsman) : "";
						inn1worm[i].OutBatsman = OutBatsman;
						var OutDesc = (inn1worm[i].OutDesc != undefined) ? outDescTitleCase(inn1worm[i].OutDesc) : "";
						inn1worm[i].OutDesc = OutDesc;
					}
                    barchartData['WormChart'] = inn1worm;
                    var selectedInn = playerInningsData.Extras[0].InningsNo;
                    barchartData['MatchType'] = [];
                    barchartData['MatchType']['MatchTypeName'] = $scope.matchSummary.MatchType;

                    if ($scope.matchSummary.MatchType == "Twenty20 Match")
                        $('.manhattan-nav').addClass('inactive');
                    else
                        $('.manhattan-nav').removeClass('inactive');

                    manInn = selectedInn;
					if(manInn > 2)
						manInn = 2;

                    if(LoadType != 'refresh')
                    {
                    	$('.manhattan-nav').attr('c-start',"");
                    	$('.manhattan-nav').attr('c-end',"");
                    }
					
					var c_mc_start = $('.manhattan-nav').attr('c-start');
					var c_mc_end = $('.manhattan-nav').attr('c-end');
									
					if(c_mc_start == undefined || c_mc_start == 0 || c_mc_start == ''){
						if(showManhattanV2)
							drawManhattanV2(barchartData, selectedInn,LoadType);
						else
							loadBarChart(barchartData, selectedInn);
						$(window).resize(function(){
							if(showManhattanV2)
								drawManhattanV2(barchartData, selectedInn,LoadType);
							else
								loadBarChart(barchartData, selectedInn);
						}); 
					}
					else
					{
						var c_next_start = $('.manhattan-nav').attr('c-next-start');
						var c_next_end = $('.manhattan-nav').attr('c-next-end');
						$('.manhattan-nav .MHnext').attr('start',c_next_start);
						$('.manhattan-nav .MHnext').attr('end',c_next_end);
						var c_prev_start = $('.manhattan-nav').attr('c-prev-start');
						var c_prev_end = $('.manhattan-nav').attr('c-prev-end');
						$('.manhattan-nav .MHprev').attr('start',c_prev_start);
						$('.manhattan-nav .MHprev').attr('end',c_prev_end);
						
						if($('.manhattan-nav').attr('c-next-inactive') == 'true')
							$('.manhattan-nav .MHnext').addClass('inactive');
						if($('.manhattan-nav').attr('c-prev-inactive') == 'true')
							$('.manhattan-nav .MHprev').addClass('inactive');
					
						var navData = [];
						navData['start'] = c_mc_start;
						navData['end'] = c_mc_end;
						loadBarChartNav(barchartData, manInn, navData);
					}
                }
				// get partnership last even value
				var getlastEvenArry=playerInningsData.PartnershipScores.length-2;
				$scope.partnershipData=(playerInningsData.PartnershipScores[getlastEvenArry] != undefined) ? playerInningsData.PartnershipScores[getlastEvenArry] : [];
				$scope.PartnershipBalls = ($scope.partnershipData.StrikerBalls != undefined && $scope.partnershipData.NonStrikerBalls != undefined) ? parseInt($scope.partnershipData.StrikerBalls, 0) + parseInt($scope.partnershipData.NonStrikerBalls, 0) : 0;
				// did not players list
				$scope.didNotBatList=$filter('filter')($scope.battingCard,{OutDesc:''},true);
			
				if($scope.IsMatchEnd!=1 && curInn == 'Innings'+$scope.matchSummary.CurrentInnings){
					$scope.liveCommentary=true;
					$scope.CurrentStriker=$filter('filter')($scope.battingCard,{PlayerID:currentStrikerId},true)[0];
					
					$scope.CurrentNonStriker=$filter('filter')($scope.battingCard,{PlayerID:nonStrikerId},true)[0];
					$scope.CurrentBowler=$filter('filter')($scope.bowlingCard,{PlayerID:currentBowlerId},true)[0];
					
				}
				else{
					$scope.liveCommentary=false;
					$scope.CurrentStriker='';
					$scope.CurrentNonStriker='';
					$scope.CurrentBowler='';
				}
		
				if (!$scope.$$phase) {
	           		$scope.$apply();
	    		}
	    		// For Ball by Ball
				if($scope.matchSummary.MatchType != 'Multi Day' || true)
				{
					if(ovrSliderPos == 0)
					{
						overSlider = $('.bbbSMIPL').bxSlider({
						 	infiniteLoop: false, pager: false, responsive: true, hideControlOnEnd: true,
                			autoControlsCombine: true, adaptiveWidth: true,touchEnabled:true,moveSlides:10,
            			  	onSlideNext: function($slideElement, oldIndex, newIndex) {
						        ovrSliderPos = newIndex;
								console.log(ovrSliderPos);
						    }, 
						    onSlidePrev: function($slideElement, oldIndex, newIndex) {
						        ovrSliderPos = newIndex;
						    } 
                		});		
					}
					else
					{
						overSlider = $('.bbbSMIPL').bxSlider({ 
							infiniteLoop: false, pager: false, responsive: true, hideControlOnEnd: true,
                			autoControlsCombine: true, adaptiveWidth: true,startSlide: ovrSliderPos,touchEnabled:true,moveSlides:10,
                			onSlideNext: function($slideElement, oldIndex, newIndex) {
						        ovrSliderPos = newIndex;
								console.log(ovrSliderPos);
						    }, 
						    onSlidePrev: function($slideElement, oldIndex, newIndex) {
						        ovrSliderPos = newIndex;
						    } 
                		});		
					}
					
					// overSlider.goToSlide(ovrSliderPos);
				}
	           	if($scope.IsMatchEnd==0){
	           		$scope.viewIndvPlayerData(curBatsmanViewBlkId,'init');
	            	$scope.viewIndvBowlerData(curBowlerViewBlkId);
	           	}

	           	if(photostream_menu || videostream_menu)
	           		$scope.getPhotosVideos(matchId);
	           
	           	$(".pageloader").removeClass('active');


                    var viewinnNo = curInn;
                viewinnNo = viewinnNo.replace("Innings", "");
                viewinnNo = parseInt(viewinnNo);
                $scope.currentInnViewNo = viewinnNo;
                $scope.scorecardcurrentInnViewNo = viewinnNo;
                var obj = $scope.matchSummary;
                $scope.currentTeamView = '';
                $scope.currentTeamInn1ID = '';
                $scope.currentTeamInn2ID = '';
                if(viewinnNo == 1){
                    $scope.currentTeamView = obj.FirstBattingTeam;
                    if(obj.CurrentInnings > 2 && $scope.superOverSummary == '')
                    {
                        $scope.currentTeamInn1ID = 1;
                        if(obj.FirstBattingTeamID == obj.SecondInningsFirstBattingID)
                            $scope.currentTeamInn2ID = 3;
                        if(obj.FirstBattingTeamID == obj.SecondInningsSecondBattingID)
                            $scope.currentTeamInn2ID = 4;
                    }
                    if($scope.superOverSummary != '')
                    {
                        $scope.currentTeamInn1ID = 1;
                        if(obj.FirstBattingTeamID == $scope.superOverSummary.FirstBattingTeamID)
                            $scope.currentTeamInn2ID = 3;
                        if(obj.FirstBattingTeamID == $scope.superOverSummary.SecondBattingTeamID)
                            $scope.currentTeamInn2ID = 4;
                    }
                }
                if(viewinnNo == 2){
                    $scope.currentTeamView = obj.SecondBattingTeam;
                    if(obj.CurrentInnings > 2 && $scope.superOverSummary == '')
                    {
                        $scope.currentTeamInn1ID = 2;
                        if(obj.SecondBattingTeamID == obj.SecondInningsFirstBattingID)
                            $scope.currentTeamInn2ID = 3;
                        if(obj.SecondBattingTeamID == obj.SecondInningsSecondBattingID)
                            $scope.currentTeamInn2ID = 4;
                    }
                    if($scope.superOverSummary != '')
                    {
                        $scope.currentTeamInn1ID = 2;
                        if(obj.SecondBattingTeamID == $scope.superOverSummary.FirstBattingTeamID)
                            $scope.currentTeamInn2ID = 3;
                        if(obj.SecondBattingTeamID == $scope.superOverSummary.SecondBattingTeamID)
                            $scope.currentTeamInn2ID = 4;
                    }
                }
                if(viewinnNo == 3){
                    if($scope.superOverSummary == '')
                    {
                        $scope.currentTeamView = obj.SecondInningsFirstBattingName;
                        $scope.currentTeamInn2ID = 3;
                        if(obj.SecondInningsFirstBattingID == obj.FirstBattingTeamID)
                                $scope.currentTeamInn1ID = 1;
                            if(obj.SecondInningsFirstBattingID == obj.SecondBattingTeamID)
                                $scope.currentTeamInn1ID = 2;
                    }
                    if($scope.superOverSummary != '')
                    {
                        $scope.currentTeamView = $scope.superOverSummary.FirstBattingTeam;
                        $scope.currentTeamInn2ID = 3;
                        if($scope.superOverSummary.FirstBattingTeamID == obj.FirstBattingTeamID)
                                $scope.currentTeamInn1ID = 1;
                            if($scope.superOverSummary.FirstBattingTeamID == obj.SecondBattingTeamID)
                                $scope.currentTeamInn1ID = 2;
                    }
                    
                }
                if(viewinnNo == 4){
                    if($scope.superOverSummary == '')
                    {
                        $scope.currentTeamView = obj.SecondInningsSecondBattingName;
                        $scope.currentTeamInn2ID = 4;
                        if(obj.SecondInningsSecondBattingID == obj.FirstBattingTeamID)
                                $scope.currentTeamInn1ID = 1;
                            if(obj.SecondInningsSecondBattingID == obj.SecondBattingTeamID)
                                $scope.currentTeamInn1ID = 2;
                    }
                    if($scope.superOverSummary != '')
                    {
                        $scope.currentTeamView = $scope.superOverSummary.SecondBattingTeam;
                        $scope.currentTeamInn2ID = 4;
                        if($scope.superOverSummary.SecondBattingTeamID == obj.FirstBattingTeamID)
                                $scope.currentTeamInn1ID = 1;
                            if($scope.superOverSummary.SecondBattingTeamID == obj.SecondBattingTeamID)
                                $scope.currentTeamInn1ID = 2;
                    }
                }
                var qPlayerId = getParameterByName('playerId');
                var qVSType = getParameterByName('vstype');
                if(qPlayerId != undefined && qPlayerId != '' && qVSType != undefined && qVSType != '' && !directPlayerPageView){
                	directPlayerPageView = true;
                	$("#videoplayer").attr('poster', '');
                	var listenPlayerObj = setInterval(function(){
                		if(typeof player != "undefined" && player != '')
                		{
                			clearInterval(listenPlayerObj);
                			$scope.playVideo(qPlayerId,qVSType);
                		}
                	},1000);
                	
                }
	           	
		});
	}
	$scope.IsOverCompleted = function(cOver,TotalOver){
		
		if(cOver != undefined & cOver != '') cOver = parseInt(cOver);
		if(TotalOver != undefined & TotalOver != '') TotalOver = parseInt(TotalOver);
		
		if(cOver >= TotalOver && $scope.matchSummary.CurrentInnings <=2) return true;
		else return false;
	}
	/******* construct wagon wheel graph ******/
	$scope.constructWagon=function(wagonData){
		$("#wagon-panel").attr("data-active","");
		var windowWdt = $(window).width();
		wagonData = $scope.applyWagonFilters();
	    if (windowWdt > 760)
	        playWW('Wagonwheel', wagonData, '');
	    else
	    	playWW('mob_Wagonwheel', wagonData, '');
	}
	$scope.closeAnimation = function(){
		$(".ballAnimations").addClass("inactive");
	}
	$scope.initBallAnimations = function(ballId){
		
		setTimeout(function(){
			for(var i=0;i<$scope.overHistory[0].length;i++){
				if($scope.overHistory[0][i].BallID == ballId)
					$scope.overHistory[0][i].ShowAnimation = false;
			}
			$scope.lastBallSeen = ballId;
			if (!$scope.$$phase) {
              $scope.$apply();
        	}
			
		},20000);
	}
	$scope.showCommentaryImgPreview = function(imgSrc){
		var windowHeight = $(window).height();
		$(".commentaryImgPreview").height(windowHeight+'px');
		$(".commentaryImgPreview img.commentaryPreviewImg").attr("src",imgSrc);
		$(".commentaryImgPreview").addClass("active");
		$(".commentaryImgPreview").click(function(){
			$(".commentaryImgPreview").removeClass("active");			
		});
	}
	$scope.manhattanRefresh=function(){
		if($scope.matchSummary.CurrentInnings > 2){
			mcService.GetScoringJs(matId,'Innings2',function(data){
				var playerInningsData=[];
				playerInningsData=data['Innings2'];
			// Manhattan Graph
				if (playerInningsData.ManhattanGraph != undefined && playerInningsData.ManhattanWickets != undefined) {

						var inn1bar = [];
						var inn2bar = [];
						if (parseInt(playerInningsData.ManhattanGraph[0]['InningsNo']) != 0) {
							inn1bar = playerInningsData.ManhattanGraph;
						}
						for(var i=0;i<inn1bar.length;i++){
							var Bowler = (inn1bar[i].Bowler != undefined) ? titleCase(inn1bar[i].Bowler) : "";
							inn1bar[i].Bowler = Bowler;
							inn1bar[i].OverRuns = (inn1bar[i].OverRuns != undefined && inn1bar[i].OverRuns != '') ?  parseInt(inn1bar[i].OverRuns) : inn1bar[i].OverRuns;
							
						}
						barchartData['BarChart'] = inn1bar;
						var inn1worm = [];
						var inn2worm = [];
						if (playerInningsData.ManhattanWickets[0] != undefined && parseInt(playerInningsData.ManhattanWickets[0]['InningsNo']) != 0)
							inn1worm = playerInningsData.ManhattanWickets;
						for(var i=0;i<inn1worm.length;i++){
							var OutBatsman = (inn1worm[i].OutBatsman != undefined) ? titleCase(inn1worm[i].OutBatsman) : "";
							inn1worm[i].OutBatsman = OutBatsman;
							var OutDesc = (inn1worm[i].OutDesc != undefined) ? outDescTitleCase(inn1worm[i].OutDesc) : "";
							inn1worm[i].OutDesc = OutDesc;
						}
						barchartData['WormChart'] = inn1worm;
						var selectedInn = playerInningsData.Extras[0].InningsNo;
						barchartData['MatchType'] = [];
						barchartData['MatchType']['MatchTypeName'] = $scope.matchSummary.MatchType;

						if ($scope.matchSummary.MatchType == "Twenty20 Match")
							$('.manhattan-nav').addClass('inactive');
						else
							$('.manhattan-nav').removeClass('inactive');

						manInn = selectedInn;
						if(manInn > 2)
							manInn = 2;
						var LoadType = 'refresh';
						if(LoadType != 'refresh')
						{
							$('.manhattan-nav').attr('c-start',"");
							$('.manhattan-nav').attr('c-end',"");
						}
						
						var c_mc_start = $('.manhattan-nav').attr('c-start');
						var c_mc_end = $('.manhattan-nav').attr('c-end');
										
						if(c_mc_start == undefined || c_mc_start == 0 || c_mc_start == ''){
							if(showManhattanV2)
								drawManhattanV2(barchartData, selectedInn,LoadType);
							else
								loadBarChart(barchartData, selectedInn);
							$(window).resize(function(){
								if(showManhattanV2)
									drawManhattanV2(barchartData, selectedInn,LoadType);
								else
									loadBarChart(barchartData, selectedInn);
							}); 
						}
						else
						{
							var c_next_start = $('.manhattan-nav').attr('c-next-start');
							var c_next_end = $('.manhattan-nav').attr('c-next-end');
							$('.manhattan-nav .MHnext').attr('start',c_next_start);
							$('.manhattan-nav .MHnext').attr('end',c_next_end);
							var c_prev_start = $('.manhattan-nav').attr('c-prev-start');
							var c_prev_end = $('.manhattan-nav').attr('c-prev-end');
							$('.manhattan-nav .MHprev').attr('start',c_prev_start);
							$('.manhattan-nav .MHprev').attr('end',c_prev_end);
							
							if($('.manhattan-nav').attr('c-next-inactive') == 'true')
								$('.manhattan-nav .MHnext').addClass('inactive');
							if($('.manhattan-nav').attr('c-prev-inactive') == 'true')
								$('.manhattan-nav .MHprev').addClass('inactive');
						
							var navData = [];
							navData['start'] = c_mc_start;
							navData['end'] = c_mc_end;
							loadBarChartNav(barchartData, manInn, navData);
						}
					}
			});
		}
	}

	/******* Start analytics script ******/
	$scope.getAnalyticsInfo=function(Loadtype){
		if(Loadtype != 'init' && Loadtype!= 'liveRefresh'){
			$([document.documentElement, document.body]).animate({
		        scrollTop: $("#scorecardTabs").offset().top - 120
		    }, 1000);
		}
		 
		if(t20lite && (momentumGraph || scorePotential))
		{
			
			var mappedT20ProMatchId = ($scope.matchSummary.T20ProMatchID != undefined) ? $scope.matchSummary.T20ProMatchID  :'';
			if(t20liteAnlaytics)
			{
				analyticsMatchId = matchId;
				$scope.analyticsDataInvoke(Loadtype,analyticsMatchId);
			}
			else if(mappedT20ProMatchId != '')
			{
				analyticsMatchId = mappedT20ProMatchId;
				$scope.analyticsDataInvoke(Loadtype,analyticsMatchId);
			}
			else
			{
				var listenMatchSchedule = setInterval(function(){
					if(matchscheduleData != undefined && matchscheduleData.length > 0)
					{
						clearInterval(listenMatchSchedule);
						var mappedT20ProMatchObj = $filter("filter")(matchscheduleData,{MatchID:matchId},true);
						if(mappedT20ProMatchObj != undefined && mappedT20ProMatchObj != '' && mappedT20ProMatchObj[0] != undefined)
						{
							var mappedT20ProMatchId = (mappedT20ProMatchObj[0].T20ProMatchID != undefined) ? mappedT20ProMatchObj[0].T20ProMatchID  :'';
							if(mappedT20ProMatchId != '')
							{
								analyticsMatchId = mappedT20ProMatchId;
								$scope.analyticsDataInvoke(Loadtype,analyticsMatchId);
							}
						}
					}
					
				},1000);
			}
			
		}
		else{
			analyticsMatchId = matchId;
			$scope.analyticsDataInvoke(Loadtype,analyticsMatchId);
		}
		$scope.analyticsMatchId = analyticsMatchId;
			
		// 

		
	}

	$scope.analyticsDataInvoke = function(Loadtype,pMatchId){
		// call momentum function
		var isSuperInn = (curInn > 2 && $scope.superOverSummary != '') ? true : false;
		if(momentumGraph && !isSuperInn){
			if((Loadtype!='liveRefresh') || ($scope.matchSummary.CurrentInnings==momInn && Loadtype=='liveRefresh'))
				$scope.bindmomentum(pMatchId,curInn,Loadtype);
		}
		else
			$scope.showmomentumWidget = false;
		
		// call score potential function
		if(scorePotential && !isSuperInn){
			if(curInn < 2)
			{
				// if(((Loadtype!='liveRefresh') || ($scope.matchSummary.CurrentInnings==wlpInn && Loadtype=='liveRefresh')) && $(".potenTab").hasClass("active"))
				if(((Loadtype!='liveRefresh') || (Loadtype=='liveRefresh')) && $(".potenTab").hasClass("active"))
					$scope.bindSP(pMatchId,curInn);
			}	
			else
			{
				// if(((Loadtype!='liveRefresh') || ($scope.matchSummary.CurrentInnings==wlpInn && Loadtype=='liveRefresh')))
				if(((Loadtype!='liveRefresh') || (Loadtype=='liveRefresh' && $(".winlossTab").hasClass("active"))))
				{
					$scope.bindWLP(curInn,pMatchId);
				}
					
			}
		}
		else{
			$scope.showSP = false;
			$scope.showWLP = false;
		}
		//call word cloud
		if(wordCloud)
			$scope.bindWC(pMatchId);
		if(sentimentalAnalysis)
			$scope.bindSA(pMatchId);
		if(momentumGraph || scorePotential || wordCloud || sentimentalAnalysis){
			clearInterval(analyticalInterval);
			if($scope.IsMatchEnd ==0 && $scope.matchSummary.CurrentInnings == curInn){
	    		analyticalInterval=setInterval(function(){
	    			if($('ul.mcTabs li[data-tab="analytPage"]').hasClass('current')){
	    				$scope.getAnalyticsInfo('liveRefresh');
	    			}
    			},20000);
    		}
		}
	}

	/********* Photo and Video Stram ****************/
	$scope.getPhotosVideos=function(mid){
		if(!teamNews)
			return;
		mcService.getPhotosVideos(function(data) {
			newsList=data.news;
			$scope.photoGallery=$filter('filter')(newsList,{category:'1'},true);
			$scope.bannerNews=$filter('filter')(newsList,{category:'2'},true);
			//$scope.latestNews=$filter('filter')(newsList,{category:'1',display_status:'1'},true);
			$scope.bannerNews=$filter('filter')(newsList,{category:'2',display_status:'1'},true);
            $scope.testimonials=$filter('filter')(newsList,{category:'3',display_status:'1'},true);
            
            var newsTotalList = [];
            for(var i=0;i<newsList.length;i++)
            {
                if(newsList[i].data.newstype != undefined && newsList[i].data.newstype.length > 0)
                {
                	if($.inArray("matchspecific", newsList[i].data.newstype)!= -1 && $.inArray("photos", newsList[i].data.newstype) == -1 && $.inArray("videos", newsList[i].data.newstype) == -1){
                		if(newsList[i].data.matchId==mid){
                			
                			newsTotalList.push(newsList[i]);
                		}
                	}
                }
            }
            newsTotalList=$filter('filter')(newsTotalList,{category:'1'},true);
            $scope.newsTotalList = newsTotalList;
            var latestphotos = [];
            for(var i=0;i<newsList.length;i++)
            {
                if(newsList[i].data.newstype != undefined)
                {
                        if($.inArray("matchspecific", newsList[i].data.newstype)!= -1 && $.inArray("photos", newsList[i].data.newstype) != -1){
           
                        	if(newsList[i].data.matchId==mid){
                				latestphotos.push(newsList[i]);
                			}
                        }
                }
            }

            $scope.latestphotos = latestphotos;
            if(latestphotos.length == 0)
           		$scope.photostream_menu = false;
           	else
           		$scope.photostream_menu = photostream_menu;
            
            var latestvideos = [];
            for(var i=0;i<newsList.length;i++)
            {
                if(newsList[i].data.newstype != undefined)
                {
                         if($.inArray("matchspecific", newsList[i].data.newstype)!= -1 &&  $.inArray("videos", newsList[i].data.newstype) != -1){
                         	
                         	if(newsList[i].data.matchId==mid){
                				latestvideos.push(newsList[i]);
                			}
                         }
                            
                    
                }
            }
            $scope.latestvideos = latestvideos;

            if(latestvideos.length == 0)
           		$scope.videostream_menu = false;
           	else
           		$scope.videostream_menu = videostream_menu;
             
			if (!$scope.$$phase) {
              $scope.$apply();
        	}
            if(latestphotos.length>0){
                setTimeout(function(){
                   
                    $scope.getPhotoGallery();
                },2000);
                
            }
         	setTimeout(function(){
                siteEvents();
            },2000);
          
            $(".year-team-smipl .mcSelectBox").show();
            
            
		});
	}

	 $scope.getPhotoGallery=function(Loadtype){
        initPhotoSwipeFromDOM('.my-gallery');
    }


	/******* momentum graph ******/
	$scope.bindmomentum = function (pmatchId,curInn,loadType) { 
		momInn=curInn;
		var cInnNo=curInn;
		if(cInnNo >=2)
			$scope.momentuminn2 = true;
		mcService.GetMomentum(cInnNo,pmatchId,function (data) {
			if(data.length == 0)
			{
				// $scope.analytics_menu = false;
				if(!analyticsFeedFound)
					$scope.analytics_menu = false;
				else
					$scope.analytics_menu = analytics_menu;
				return;
			}
			else{
				analyticsFeedFound = true;
				$scope.analytics_menu = analytics_menu;
			}
				

			res = data;
			var BteamName = '';
			var BowlName = '';
			var colorArr = '';
			var t1color ='#eb7500';
			var t2color ='#513092';

			BteamName = res.momentum[0].BatLogo;
			BowlName = res.momentum[0].BowlLogo;
			colorArr = [t1color,t2color];
			if(typeof clientId != "undefined") {
				clientId = clientId.toLowerCase();
				if(clientId == "ipl" && false){
					if(BteamName == "CSG"){t1color = "#EA0813";}
						else if(BowlName == "CSG"){t2color = "#EA0813";}
					if(BteamName == "TUT"){t1color = "#0B4DC5";}
						else if(BowlName == "TUT"){t2color = "#0B4DC5";}
					if(BteamName == "LKK"){t1color = "#C4BC37";}
						else if(BowlName == "LKK"){t2color = "#C4BC37";}
					if(BteamName == "KK"){t1color = "#F41089";}
						else if(BowlName == "KK"){t2color = "#F41089";}
					if(BteamName == "RKW"){t1color = "#FE833F";}
						else if(BowlName == "RKW"){t2color = "#FE833F";}
					if(BteamName == "DDR"){t1color = "#FFE401";}
						else if(BowlName == "DDR"){t2color = "#FFE401";}
					if(BteamName == "MSG"){t1color = "#E1B723";}
						else if(BowlName == "MSG"){t2color = "#E1B723";}
					if(BteamName == "VBT"){t1color = "#F5EC21";}
						else if(BowlName == "VBT"){t2color = "#F5EC21";}
				}
			}
			
			if(cInnNo > 2)
			{
				cInnNo = 2;
			}							
			
			if(cInnNo == 1){ 
				BteamName = res.momentum[0].BatLogo;
				BowlName = res.momentum[0].BowlLogo;
				//colorArr = ['#a1bbe2', '#27347e'];
				colorArr = [t1color,t2color];
				
				// else
				// {
				// 	colorArr = ['#00b2e3', '#7b0041'];
				// }
				//colorArr = [colorcodes[$scope.MatchSummary.FirstBattingTeam], colorcodes[$scope.MatchSummary.SecondBattingTeam]];
				//$('#widget_momentum .lengent_team1').html('<span style="color:'+colorcodes[$scope.MatchSummary.FirstBattingTeam]+'">'+BteamName+'</span>');
				//$('#widget_momentum .lengent_team2').html('<span style="color:'+ colorcodes[$scope.MatchSummary.SecondBattingTeam]+'">'+BowlName+'</span>');
				$('#widget_momentum .lengent_team1').html('<span style="color:'+colorArr[0]+'">'+BteamName+'</span>');
				$('#widget_momentum .lengent_team2').html('<span style="color:'+ colorArr[1]+'">'+BowlName+'</span>');
				$("#widget_momentum.momentum_widget .tabItem").removeClass("active");
				$("#widget_momentum.momentum_widget .tabItem.inn1").addClass("active");

				var mmLength = res.momentum.length - 1;

				$scope.mmT1 = (res.momentum[mmLength].BatLogo != undefined) ? res.momentum[mmLength].BatLogo : "";
				$scope.mT1Score = (res.momentum[mmLength].BatTeamPer != undefined) ? res.momentum[mmLength].BatTeamPer : "";
				$scope.mmT2 = (res.momentum[mmLength].BowlLogo != undefined) ? res.momentum[mmLength].BowlLogo : "";
				$scope.mT2Score = (res.momentum[mmLength].BowlTeamPer != undefined) ? res.momentum[mmLength].BowlTeamPer : "";

			} else if(cInnNo == 2){  
				t1color ='#513092';
				t2color ='#eb7500';				
				BteamName = res.momentum[0].BatLogo;
				BowlName = res.momentum[0].BowlLogo;
				colorArr = [t1color,t2color];
				
				// else
				// {
				// 	colorArr = ['#00b2e3', '#7b0041'];
				// }
				//colorArr = [colorcodes[$scope.MatchSummary.SecondBattingTeam], colorcodes[$scope.MatchSummary.FirstBattingTeam]];
				$('#widget_momentum .lengent_team1').html('<span style="color:'+colorArr[0]+'">'+BteamName+'</span>');
				$('#widget_momentum .lengent_team2').html('<span style="color:'+ colorArr[1]+'">'+BowlName+'</span>');
				$("#widget_momentum .tabBlock .tabItem").removeClass("active");
				$("#widget_momentum .tabBlock .tabItem.inn2").addClass("active");

				var mmLength = res.momentum.length - 1;

				$scope.mmT1 = (res.momentum[mmLength].BatLogo != undefined) ? res.momentum[mmLength].BatLogo : "";
				$scope.mT1Score = (res.momentum[mmLength].BatTeamPer != undefined) ? res.momentum[mmLength].BatTeamPer : "";
				$scope.mmT2 = (res.momentum[mmLength].BowlLogo != undefined) ? res.momentum[mmLength].BowlLogo : "";
				$scope.mT2Score = (res.momentum[mmLength].BowlTeamPer != undefined) ? res.momentum[mmLength].BowlTeamPer : "";
			}  	
			var BattingTeam_Arr = [];
			var BowlingTeam_Arr = [];	
			var OverNo_Arr =[];
			 
			var BatMomentum_Arr = [];
			var BowlMomentum_Arr = []; 
			 var TooltipAr = [];
			var momentumDataSet = [];
			for(var i=0; i<res.momentum.length; i++){ 
				var OverNo = res.momentum[i].OverNo;	
				var BatMomentum = res.momentum[i].BatTeamPer;	 
				var BowlMomentum = res.momentum[i].BowlTeamPer;	
				var curScore = res.momentum[i].CurrentScore;
				//$('#perctvalue').text(BatMomentum);
				OverNo_Arr.push(OverNo);								
				BattingTeam_Arr.push(BatMomentum);	
				BowlingTeam_Arr.push(BowlMomentum);	
				var str = "<div class='customToolTip'><p>"+res.momentum[i].BattingTeam+" : "+curScore+"</p><p>"+BteamName+" Momentum : "+BatMomentum+"</p><p>"+BowlName+" Momentum : "+BowlMomentum+"</p></div>";
				TooltipAr[i] = str;
			}	 
			
			$('#widget_momentum .wlpTeam1').css("color",t1color);
			$('#widget_momentum .wlpTeam2').css("color",t2color);

				
			if(loadType == "init")
			{
				 momentumData = {
					labels: OverNo_Arr,
					datasets: [{
						label: BteamName,
						backgroundColor: t1color,
						data: BattingTeam_Arr
					}, {
						label: BowlName,
						backgroundColor: t2color,
						data: BowlingTeam_Arr
					}]

				};
				drawMomentumchart();
			}
			else
			{
				momentumData.labels = OverNo_Arr;
				$.each(momentumData.datasets, function(i, dataset) {
					if(i==0)
					{
						dataset.data = BattingTeam_Arr;
					}
					if(i==1)
					{
						dataset.data = BowlingTeam_Arr;
					}
						
				});
				momentumData.datasets[0].label = BteamName;
				momentumData.datasets[1].label = BowlName;
				momentumData.datasets[0].backgroundColor = colorArr[0];
				momentumData.datasets[1].backgroundColor = colorArr[1];
			}
			
			if(window.myBar != undefined)
				window.myBar.update();
			$scope.showmomentumWidget = true;
			if (!$scope.$$phase) {
	        	$scope.$apply();
	    	}
			
		});	
		if (!$scope.$$phase) {
        	$scope.$apply();
    	}
	}


	/******* Score potential ******/
	$scope.bindSP = function(pmatchId,cInnNo){
		mcService.GetScorePotential(pmatchId,cInnNo,function (data) {
			res = data;
			if(res.scorePotentials == undefined){
				if(!analyticsFeedFound)
					$scope.analytics_menu = false;
				else
					$scope.analytics_menu = analytics_menu;
				return;
			}
			analyticsFeedFound = true;
			$scope.analytics_menu = analytics_menu;
			var BteamName = res.scorePotentials[0].BatLogo; 
			var BowlName = res.scorePotentials[0].BowlLogo;
			var OverNo_Arr = [];

			var t1color ='#eb7500';
			var t2color ='#513092';
			colorArr = [t1color,t2color];
			if(typeof clientId != "undefined") {
				clientId = clientId.toLowerCase();
				if(clientId == "ipl" && false){
					if(BteamName == "CSG"){t1color = "#EA0813";}
						else if(BowlName == "CSG"){t2color = "#EA0813";}
					if(BteamName == "TUT"){t1color = "#0B4DC5";}
						else if(BowlName == "TUT"){t2color = "#0B4DC5";}
					if(BteamName == "LKK"){t1color = "#C4BC37";}
						else if(BowlName == "LKK"){t2color = "#C4BC37";}
					if(BteamName == "KK"){t1color = "#F41089";}
						else if(BowlName == "KK"){t2color = "#F41089";}
					if(BteamName == "RKW"){t1color = "#FE833F";}
						else if(BowlName == "RKW"){t2color = "#FE833F";}
					if(BteamName == "DDR"){t1color = "#FFE401";}
						else if(BowlName == "DDR"){t2color = "#FFE401";}
					if(BteamName == "MSG"){t1color = "#E1B723";}
						else if(BowlName == "MSG"){t2color = "#E1B723";}
					if(BteamName == "VBT"){t1color = "#F5EC21";}
						else if(BowlName == "VBT"){t2color = "#F5EC21";}
				}
			}
			var fxdTeamName = $scope.matchSummary.FirstBattingTeam;
			var firstBatTeamName = fxdTeamName;
			var ScorePotential_Arr = [fxdTeamName];		
			var TooltipAr = [];	
			var potentiallength = res.scorePotentials.length - 1;
			for(var i=0; i<res.scorePotentials.length; i++){ 
				var OverNo = res.scorePotentials[i].OverNo;	
				var ScorePotential = res.scorePotentials[i].ScorePotential;	
				var score = res.scorePotentials[i].CurrScore;	
				var wick = res.scorePotentials[i].CurrWickets;	
				var curScore = score + '/'+wick;
				OverNo_Arr.push(OverNo);	
				ScorePotential_Arr.push(ScorePotential);
				var str = "<div class='customToolTip'><p>Score : "+curScore+"</p><p>"+firstBatTeamName+" Score Potential : "+ScorePotential+"</p></div>";
				TooltipAr[i] = str;
			}
			var colorArr = [t1color];
			$scope.showSP = true;
			
			$("#spotential_widget").removeClass("inactive");
			$("#wlProb_widget").addClass("inactive");
			$('#spotential_widget .lengent_team1').text(BteamName);
			$('#spotential_widget .lengent_team1').css("color",t1color);
			$scope.potentialTeam = (res.scorePotentials[potentiallength].BattingTeam != undefined) ? res.scorePotentials[potentiallength].BattingTeam : "";
			$scope.potentialScore = (res.scorePotentials[potentiallength].ScorePotential != undefined) ? res.scorePotentials[potentiallength].ScorePotential : "";
			$scope.potentialTeamCurrentScore = (res.scorePotentials[potentiallength].CurrScore != undefined) ? res.scorePotentials[potentiallength].CurrScore : "";
			$scope.potentialTeamCurrentWicket = (res.scorePotentials[potentiallength].CurrWickets != undefined) ? res.scorePotentials[potentiallength].CurrWickets : "";
			var containerWdt = $("#scorecardWrapper .mcContainer").width();
			
			var windowWdt = $(window).width();
			if(windowWdt > 640)
				containerWdt = containerWdt - 62;
			else
				containerWdt = containerWdt - 32;
			$("#potentialChart").css("width",containerWdt+"px");
			drawPotential(OverNo_Arr,ScorePotential_Arr,TooltipAr,colorArr);	
			if (!$scope.$$phase) {
	        	$scope.$apply();
	    	}
		});
	}

	/******* winloss probability ******/
	$scope.bindWLP = function(cInnNo,pmatchId){
		mcService.GetWLProbability(cInnNo,pmatchId,function (res) {
			if(res.WinLossData == undefined) {
				if(!analyticsFeedFound)
					$scope.analytics_menu = false;
				else
					$scope.analytics_menu = analytics_menu;
				return;
			}
			analyticsFeedFound = true;
			$scope.analytics_menu = analytics_menu;
				var BteamName = res.WinLossData[0].BatLogo;
				var BowlName = res.WinLossData[0].BowlLogo;
				var t1color ='#eb7500';
				var t2color ='#513092';
				colorArr = [t2color,t1color];
				if(typeof clientId != "undefined") {
					clientId = clientId.toLowerCase();
					if(clientId == "ipl" && false){
						if(BteamName == "CSG"){t1color = "#EA0813";}
							else if(BowlName == "CSG"){t2color = "#EA0813";}
						if(BteamName == "TUT"){t1color = "#0B4DC5";}
							else if(BowlName == "TUT"){t2color = "#0B4DC5";}
						if(BteamName == "LKK"){t1color = "#C4BC37";}
							else if(BowlName == "LKK"){t2color = "#C4BC37";}
						if(BteamName == "KK"){t1color = "#F41089";}
							else if(BowlName == "KK"){t2color = "#F41089";}
						if(BteamName == "RKW"){t1color = "#FE833F";}
							else if(BowlName == "RKW"){t2color = "#FE833F";}
						if(BteamName == "DDR"){t1color = "#FFE401";}
							else if(BowlName == "DDR"){t2color = "#FFE401";}
						if(BteamName == "MSG"){t1color = "#E1B723";}
							else if(BowlName == "MSG"){t2color = "#E1B723";}
						if(BteamName == "VBT"){t1color = "#F5EC21";}
							else if(BowlName == "VBT"){t2color = "#F5EC21";}
					}
				}
				var WinbatTeam_arr = [];
				var WinbowlTeam_arr = [];
				var WinOverNo_arr = [];
				var TooltipAr = [];	  
				var wlpLength = res.WinLossData.length - 1;

				$scope.wlpT1 = (res.WinLossData[wlpLength].BatLogo != undefined) ? res.WinLossData[wlpLength].BatLogo : "";
				$scope.wlpT1Score = (res.WinLossData[wlpLength].BatWinLoss != undefined) ? res.WinLossData[wlpLength].BatWinLoss : "";
				$scope.wlpT2 = (res.WinLossData[wlpLength].BowlLogo != undefined) ? res.WinLossData[wlpLength].BowlLogo : "";
				$scope.wlpT2Score = (res.WinLossData[wlpLength].BowlWinLoss != undefined) ? res.WinLossData[wlpLength].BowlWinLoss  : "";
				$scope.wlpTeamCurrentScore = (res.WinLossData[wlpLength].CurrScore != undefined) ? res.WinLossData[wlpLength].CurrScore : "";
				$scope.wlpTeamCurrentWicket = (res.WinLossData[wlpLength].CurrWickets != undefined) ? res.WinLossData[wlpLength].CurrWickets : "";



				colorArr = [t2color,t1color];
				$('#wlProb_widget .lengent_team1').text(BteamName + ": " +$scope.wlpT1Score+"%");
				$('#wlProb_widget .lengent_team2').text(BowlName+ ": " +$scope.wlpT2Score+"%");
				$('#wlProb_widget .lengent_team1').css("color",colorArr[0]);
				$('#wlProb_widget .lengent_team2').css("color",colorArr[1]);
				var WinBatWinLoss_arr= [BteamName];
				var WinBowlWinLoss_arr = [BowlName];
				var fxdTeamName = $scope.matchSummary.FirstBattingTeam;
				var TeamWinLoss_arr = [fxdTeamName];
				
				for(var i=0; i<res.WinLossData.length; i++){ 				 
					var WinOverNo = res.WinLossData[i].OverNo;		
					WinOverNo_arr.push(WinOverNo);
					var BatWinLoss = res.WinLossData[i].BatWinLoss;					
					WinBatWinLoss_arr.push(BatWinLoss);
					var BowlWinLoss = res.WinLossData[i].BowlWinLoss;		
					WinBowlWinLoss_arr.push(BowlWinLoss);
					
					var TeamWinLoss = res.WinLossData[i].TeamWinLoss;		
					TeamWinLoss_arr.push(TeamWinLoss);
					
					var BatTeamname = res.WinLossData[i].BatLogo;
					var BowlTeamname = res.WinLossData[i].BowlLogo;
					var score = res.WinLossData[i].CurrScore;	
					var wick = res.WinLossData[i].CurrWickets;	
					var curScore = score + '/'+wick;
					
					var str = "<div class='customToolTip'><p>Score : "+curScore+"</p><p>"+BatTeamname+"&nbsp;:&nbsp;"+BatWinLoss+"%<br/>"+BowlTeamname+"&nbsp;:&nbsp;"+BowlWinLoss+"%</p></div>";
					TooltipAr[i] = str; 
				 
				}
			
			 	var last_element = WinBatWinLoss_arr[WinBatWinLoss_arr.length - 1];
			 	
			 	if(last_element != null && last_element !== '' && last_element != undefined)
			 	{
					 $('.quote').html(''); 
					 $('.quote').html('Chance of Winning for <span> '+BteamName+'</span> is <span id="perctvalue">'+last_element+'</span>%'); 
					// if(curInn==2 && $scope.IsMatchEnd!=1)
					//	$(".winlossPercentMeter").removeClass("inactive");
			 	}
				
				
				$scope.showWLP = true;
				$("#wlProb_widget").removeClass("inactive");
				$("#spotential_widget").addClass("inactive");
				$(".pageloader").removeClass('active');
				var containerWdt = $("#scorecardWrapper .mcContainer").width();
				
				var windowWdt = $(window).width();
				if(windowWdt > 640)
					containerWdt = containerWdt - 62;
				else
					containerWdt = containerWdt - 32;
				$("#winloss_prb").css("width",containerWdt+"px");
				winlossProb(WinOverNo_arr,WinBatWinLoss_arr,WinBowlWinLoss_arr, TooltipAr,colorArr);	
				
				if (!$scope.$$phase) {
		        	$scope.$apply();
		    	}
		});		 
	}

	/******* word cloud ******/
	$scope.bindWC = function (pmatchId) { 
		mcService.GetWC(pmatchId,function (data) {
				$scope.wordcloud = data.wordcloud;
				if (!$scope.$$phase) {
					$scope.$apply();
				}
				var wcInterval = setInterval(function(){
					var wclistLen = $("#wordcloud1 .wclist").length;
					if(wclistLen == data.wordcloud.length)
					{
						clearInterval(wcInterval);
						$scope.drawWC('#wordcloud1');
						$scope.drawWC('#wordcloud2');
						
						$(window).resize(function(){
							$scope.drawWC('#wordcloud1');
							$scope.drawWC('#wordcloud2');
							
						});
					}
				},500) ; 

		});	
		$scope.drawWC=function(widgetId){
			if(widgetId == "#wordcloud1")
				$("#awesomeCloudwordcloud1").remove();
			if(widgetId == "#wordcloud2")	
			 $("#awesomeCloudwordcloud2").remove();
			$(widgetId).awesomeCloud({
					"size" : {
						"grid" : 12,
						"factor" : 0,
						 "normalize" : true 
					},
					"options" : {
						"color" : "random-dark",
						"rotationRatio" : 0.35
					},
					"font" : "'Times New Roman', Times, serif",
					"shape" : "circle"
				});

			$scope.showWC = wordCloud;
			$(".pageloader").removeClass('active');
			if (!$scope.$$phase) {
	        	$scope.$apply();
	    	}
		}
	}

	/******* score potential ******/
	$scope.bindSA = function (pmatchId) { 
		mcService.GetSA(pmatchId,function (data) {
		    $scope.drawSA("widget_sa",data) ;
			$scope.drawSA("widget_sa_small",data) ;
		});

		$scope.drawSA = function(widgetId,data){
			$("#"+widgetId).html('');
			var SAData = data.sentimentanalysis;
			var w = 320,                        //width
			h = 200,                            //height
			r = 150,                            //radius
			ir = 75,
			pi = Math.PI;
			
			//color = d3.scale.category20c();     
			
			var color = d3.scale.ordinal()
			.range(["#7DB343", "#FF9801", "#D60000",]);
		 
			var data = [];
			data = [{"label":SAData[2].FrequencyPercent, "value":SAData[2].Frequency}, 
					{"label":SAData[0].FrequencyPercent, "value":SAData[0].Frequency}, 
					{"label":SAData[1].FrequencyPercent, "value":SAData[1].Frequency}];
			
			var vis = d3.select("#"+widgetId) 
			   .append("svg:svg") 
				.data([data])          
					.attr("width", w)  
					.attr("height", h)
				.append("svg:g")       
					.attr("transform", "translate(" + r + "," + r + ")")    
		 
			var arc = d3.svg.arc()              
				.outerRadius(r)
			.innerRadius(ir);
		 
			var pie = d3.layout.pie()           
				.value(function(d) { return d.value; })
				.startAngle(-90 * (pi/180))
				.endAngle(90 * (pi/180));
		 
			var arcs = vis.selectAll("g.slice")     
				.data(pie)                          
				.enter()                            
					.append("svg:g")                
						.attr("class", "slice");    
		 
				arcs.append("svg:path")
						.attr("fill", function(d, i) { return color(i); } ) 
						.attr("d", arc);                                    
		 
				arcs.append("svg:text")                                     
						.attr("transform", function(d) {                    

						return "translate(" + arc.centroid(d) + ")";        
					})
					.attr("text-anchor", "middle")  
					.style("fill", "White")					
					.text(function(d, i) { return data[i].label; });   


				$scope.showSA = sentimentalAnalysis;
				$(".pageloader").removeClass('active');	
				if (!$scope.$$phase) {
		        	$scope.$apply();
		    	}
		}
	}

	$scope.changePotential = function (pType) {
		$(".pageloader").addClass('active');	
		if(pType == 'SP')
		{
			wlpInn=1;
			$scope.bindSP(analyticsMatchId,"");
		}
		if(pType == 'WLP')
		{
			wlpInn=2;
			$scope.bindWLP("",analyticsMatchId);	
		}
	}
	/******* generate ball bg ******/
	$scope.genColor=function(data){
		var color='mcBall';
		if(data.IsFour == true){
			color +=' bgFour';
		}
		if(data.IsDotball){
			color +=' mcBall';
		}
		if(data.IsOne){
			color +=' mcBall';
		}
		if(data.IsTwo){
			color +=' mcBall';
		}
		if(data.IsThree){
			color +=' mcBall';
		}
		if(data.IsSix == true){
			color +=' bgSix';
		}
		if(data.IsWicket == true){
			color +=' bgWicket';
		}
		if(data.IsWide == true){
			color +=' bgWide';
		}
		if(data.IsNoBall == true){
			color +=' bgNoball';
		}
		if(data.IsMaiden){
			color +=' mcBall';
		}
		if(data.IsBye == true){
			color +=' mcBall';
		}
		if(data.IsLegBye == true){
			color +=' mcBall';
		}
		return color;
	}

	/******* individual player data ******/
	$scope.viewIndvPlayerData=function(playerId,calledFrom){
		$(".battingCardMC").attr("data-active","");
		if(playerId !='' && playerId!=undefined){
			if(($(".viewBatData span").hasClass('icon-minus-circled')) && (!$("#viewPl_"+playerId).find('span').hasClass('icon-minus-circled'))){
				$(".viewBatData span").removeClass('icon-minus-circled').addClass('icon-plus-circled');
				$("#viewPl_"+playerId).find('span').removeClass('icon-minus-circled').addClass('icon-plus-circled');
				$('.playerWagonBatting').find('.mcPlyBat').removeClass('tr_show');
			}
			if($("#viewPl_"+playerId).find('span').hasClass('icon-minus-circled')){
				curBatsmanViewBlkId='';
			}
			else
				 curBatsmanViewBlkId=playerId;
			$("#viewPl_"+playerId).parents('.playerWagonBatting').find('.mcPlyBat').toggleClass('tr_show');
			$("#viewPl_"+playerId).find('span').toggleClass('icon-plus-circled icon-minus-circled');
			
	        var playerWWData = $filter('filter')(WagonWheelResult, { StrikerID: playerId });
			if(calledFrom != 'init')
				PactiveWagonEvent = '';
	        playWW(playerId, playerWWData, 'player');
	        $scope.indvPlayerH2HData=$filter("filter")(batHeadtoHead,{BatsManID:playerId},true);
		}
		else 
			curBatsmanViewBlkId='';
	}

	/******* individual player data ******/
	$scope.viewIndvBowlerData=function(playerId){

		if(playerId !='' && playerId!=undefined){
			if(($(".viewBowData span").hasClass('icon-minus-circled')) && (!$("#viewBl_"+playerId).find('span').hasClass('icon-minus-circled'))){
				$(".viewBowData span").removeClass('icon-minus-circled').addClass('icon-plus-circled');
				$('.playerWagonBowling').find('.mcPlyBow').removeClass('tr_show');
			}
			if($("#viewBl_"+playerId).find('span').hasClass('icon-minus-circled')){
				curBowlerViewBlkId='';
			}
			else
				 curBowlerViewBlkId=playerId;
			$("#viewBl_"+playerId).parents('.playerWagonBowling').find('.mcPlyBow').toggleClass('tr_show');
	 		$("#viewBl_"+playerId).find('span').toggleClass('icon-plus-circled icon-minus-circled');
	       	$scope.indvBowH2HData=$filter("filter")(bowHeadtoHead,{BowlerID:playerId},true);
		}
		else 
				curBowlerViewBlkId='';
	}
	$scope.viewIndvBatData=function(){
			$("#wagon-panel").attr("data-active","");
	        var playerWWData = $scope.applyWagonFilters();
	        // playWW('Wagonwheel', playerWWData, '');
	        $scope.constructWagon(playerWWData);
	}
	$scope.viewIndvBowlData=function(){
			$("#wagon-panel").attr("data-active","");
	        var playerWWData = $scope.applyWagonFilters();
	        // playWW('Wagonwheel', playerWWData, '');
	        $scope.constructWagon(playerWWData);
	}
	$scope.wagonLHBView = false;
	$scope.applyWagonFilters = function(){
		var filteredWagonData = WagonWheelResult;
		if($scope.selectedBowlPlayer != undefined && $scope.selectedBowlPlayer != null && ($scope.selectedBatPlayer != undefined && $scope.selectedBatPlayer != null)){
			filteredWagonData = [];
			var batsmanAgBowlerFilterData = $filter('filter')(WagonWheelResult, { StrikerID: $scope.selectedBatPlayer.PlayerID,BowlerID: $scope.selectedBowlPlayer.PlayerID  });
			if(batsmanAgBowlerFilterData != undefined && batsmanAgBowlerFilterData.length > 0)
			{
				batsmanAgBowlerFilterData.map(function(item){
					filteredWagonData.push(item);
				});
			}
			if(filteredWagonData != undefined && filteredWagonData.length > 0){
				if(filteredWagonData[0].BatType == 'L'){
					$("#wagonWheelContent").addClass("leftHandBatsman");
					$scope.wagonLHBView = true;
				}					
				else{
					$scope.wagonLHBView = false;
					$("#wagonWheelContent").removeClass("leftHandBatsman");
				}
					
			}
		}
		else if($scope.selectedBatPlayer != undefined && $scope.selectedBatPlayer != null && ($scope.selectedBowlPlayer == undefined || $scope.selectedBowlPlayer == null))
		{
			filteredWagonData = [];
			var batsmanFilterData = $filter('filter')(WagonWheelResult, { StrikerID: $scope.selectedBatPlayer.PlayerID });
			if(batsmanFilterData != undefined && batsmanFilterData.length > 0)
			{
				batsmanFilterData.map(function(item){
					filteredWagonData.push(item);
				});
			}
			if(filteredWagonData != undefined && filteredWagonData.length > 0){
				if(filteredWagonData[0].BatType == 'L'){
					$scope.wagonLHBView = true;
					$("#wagonWheelContent").addClass("leftHandBatsman");
				}					
				else{
					$("#wagonWheelContent").removeClass("leftHandBatsman");
					$scope.wagonLHBView = false;
				}
					
			}
		}
		else if($scope.selectedBowlPlayer != undefined && $scope.selectedBowlPlayer != null && ($scope.selectedBatPlayer == undefined || $scope.selectedBatPlayer == null))
		{
			filteredWagonData = [];
			var bowlerFilterData = $filter('filter')(WagonWheelResult, { BowlerID: $scope.selectedBowlPlayer.PlayerID });
			if(bowlerFilterData != undefined && bowlerFilterData.length > 0)
			{
				bowlerFilterData.map(function(item){
					filteredWagonData.push(item);
				});
			}
		}
		if($scope.selectedBatPlayer == '' || $scope.selectedBatPlayer == null){
			$scope.wagonLHBView = false;
			$("#wagonWheelContent").removeClass("leftHandBatsman");
		}
		
		var oneCount = $filter('filter')(filteredWagonData, { Runs: "1" });
		oneCount = (oneCount != undefined) ? oneCount.length : 0;
		var twosCount = $filter('filter')(filteredWagonData, { Runs: "2" });
		twosCount = (twosCount != undefined) ? twosCount.length : 0;
		var threesCount = $filter('filter')(filteredWagonData, { Runs: "3" });
		threesCount = (threesCount != undefined) ? threesCount.length : 0;
		var foursCount = $filter('filter')(filteredWagonData, { IsFour: 1 });
		if(foursCount == undefined || foursCount == '' || foursCount.length == 0)
			foursCount = $filter('filter')(filteredWagonData, { IsFour: true });
		foursCount = (foursCount != undefined) ? foursCount.length : 0;
		var sixCount = $filter('filter')(filteredWagonData, { IsSix: 1 });
		if(sixCount == undefined || sixCount == '' || sixCount.length == 0)
			sixCount = $filter('filter')(filteredWagonData, { IsSix: true });
		sixCount = (sixCount != undefined) ? sixCount.length : 0;
		$scope.wagonWheelSummary.Ones = oneCount;
		$scope.wagonWheelSummary.Twos = twosCount;
		$scope.wagonWheelSummary.Threes = threesCount;
		$scope.wagonWheelSummary.Fours = foursCount;
		$scope.wagonWheelSummary.Sixes = sixCount;
		var wagonWheelSummaryTotal = 0;
		filteredWagonData.map(function(item){
			wagonWheelSummaryTotal = wagonWheelSummaryTotal + item.Runs;
		});
		$scope.wagonWheelSummaryTotal = wagonWheelSummaryTotal;
		
		
		return filteredWagonData;
	}

	/******* reverse function using filter ******/
	angular.module('MyApp').filter('reverse', function() {
	  	return function(items) {
	    	return items.slice().reverse();
	  	};
	});

	/******* reverse stats data ******/
	$scope.changeSorting = function(key,type,eventOrder) {
		return;
		var clsName = eventOrder.currentTarget.className;
		if(type=='batting'){
			var orderBy=battingStatskeyVal[key];
			if (clsName.indexOf('asc') > -1) {
				orderBy = $filter('orderBy')(tourBattingStats, "-"+orderBy);
				$("#batCardTable th[data-key='"+key+"']").removeClass('asc');
				$("#batCardTable th[data-key='"+key+"']").addClass('desc');
			}
			else {
				orderBy = $filter('orderBy')(tourBattingStats, orderBy);
				$("#batCardTable th[data-key='"+key+"']").removeClass('desc');
				$("#batCardTable th[data-key='"+key+"']").addClass('asc');
			}
			 
			for(var i=0; i<tourBattingStats.length; i++){
				tourBattingData[i]=[];
				for(var j=0; j<battingStatskeyVal.length; j++){
					tourBattingData[i][j] = [];
					if(j ==0)
						tourBattingData[i][j]['kpi']= i+1;
					else
						tourBattingData[i][j]['kpi']=orderBy[i][battingStatskeyVal[j]];
				}
			}
			$scope.tourBattingData=tourBattingData;
			
		}
		if(type=='bowling'){
			var orderBy=bowlingStatskeyVal[key];
			if (clsName.indexOf('asc') > -1) {
				orderBy = $filter('orderBy')(tourBowlingStats, "-"+orderBy);
				$("#bowCardTable th[data-key='"+key+"']").removeClass('asc');
				$("#bowCardTable th[data-key='"+key+"']").addClass('desc');
			}
			else {
				orderBy = $filter('orderBy')(tourBowlingStats, orderBy);
				$("#bowCardTable th[data-key='"+key+"']").removeClass('desc');
				$("#bowCardTable th[data-key='"+key+"']").addClass('asc');
			}
			for(var i=0; i<tourBowlingStats.length; i++){
				tourBowlingData[i]=[];
				for(var j=0; j<bowlingStatskeyVal.length; j++){
					tourBowlingData[i][j] = [];
					if(j ==0)
						tourBowlingData[i][j]['kpi']= i+1;
					else
						tourBowlingData[i][j]['kpi']=orderBy[i][bowlingStatskeyVal[j]];
				}
			}
			$scope.tourBowlingData=tourBowlingData;
		}
		if (!$scope.$$phase) {
           		$scope.$apply();
		}
    };

	/*******  filter empty or null values ******/
	$scope.notEmptyOrNull = function(item){
 		return !(item.OutDesc === null || item.OutDesc === '')
	}

	/**** check data is notempty ****/
	$scope.isZero=function(dataVal){
		if(dataVal=='' || dataVal==undefined)
			return 0;
		else
			return dataVal;
	}

	/*******Start video play script ******/
	if(videoscorecard || true){
		if(videoscorecard)
			$("#matchCenter").addClass("videoscorecard");
		$scope.playVideo = function (playerId,searchStr,listen) {
			$(".cd-popup").removeClass("inactive");
			if($scope.matchLiveStream && !listen)
			{
				// if(jwplayer().getState() == "playing")
				// 	jwplayer().pause();
				$("#liveStreamPlayer").html("");
			}
				
            if($scope.mcOverlayScorecard)
                overHistory = $scope.mcVOverlayOverHistory;
			var result = '';
			if(searchStr == 'all')
				result = $filter('filter')(overHistory, { StrikerID:playerId });
			if(searchStr == 'runs')
			{
				if(t20lite)
					result = $filter('filter')(overHistory, {IsDotball:0,IsWide:0,IsLegBye:0,IsBye:0, StrikerID:playerId });	
				else
					result = $filter('filter')(overHistory, {IsDotball:0,IsWide:false,IsLegBye:false,IsBye:false, StrikerID:playerId });
			}
				
			if (searchStr == 'balls')
			{
				if(t20lite)
					result = $filter('filter')(overHistory, { IsWide:0, StrikerID:playerId});
				else	
					result = $filter('filter')(overHistory, { IsWide:false, StrikerID:playerId});
			}
			if(searchStr == 'ones')
				result = $filter('filter')(overHistory, {IsOne:1, StrikerID:playerId });
				
			if(searchStr == 'twos')
				result = $filter('filter')(overHistory, {IsTwo:1, StrikerID:playerId });
			if (searchStr == 'threes')
	        	result = $filter('filter')(overHistory, { IsThree: 1, StrikerID: playerId });
			if(searchStr == 'four')
			{
				if(t20lite)
					var result1 = $filter('filter')(overHistory, {IsFour:1,StrikerID:playerId, IsExtra:0  });
				else
					var result1 = $filter('filter')(overHistory, {IsFour: true,StrikerID:playerId, IsExtra:0  });


				if(t20lite)
					var result2 = $filter('filter')(overHistory, {IsFour:1,StrikerID:playerId, IsExtra:1,IsNoBall:1  });
				else
					var result2 = $filter('filter')(overHistory, {IsFour: true,StrikerID:playerId, IsExtra:1,IsNoBall:true  });

				if(result1 == undefined)
					result1 = [];
				if(result2 == undefined)
					result2 = [];
				result = result1.concat(result2);

			}
				
			if(searchStr == 'six')
			{
				if(t20lite)
					var result1 = $filter('filter')(overHistory, {IsSix:1, StrikerID:playerId,IsExtra:0 });
				else
					var result1 = $filter('filter')(overHistory, {IsSix:true, StrikerID:playerId,IsExtra:0 });		

				if(t20lite)
					var result2 = $filter('filter')(overHistory, {IsSix:1,StrikerID:playerId, IsExtra:1,IsNoBall:1  });
				else
					var result2 = $filter('filter')(overHistory, {IsSix: true,StrikerID:playerId, IsExtra:1,IsNoBall:true  });

				if(result1 == undefined)
					result1 = [];
				if(result2 == undefined)
					result2 = [];
				result = result1.concat(result2);
			}
				
	    	if (searchStr == 'bowlerall')
	       		result = $filter('filter')(overHistory, { BowlerID: playerId });
	        if (searchStr == 'dotballs') {
	            var result = $filter('filter')(overHistory, { IsDotball: 1, StrikerID: playerId });
	            for (var i = 0; i < result.length; i++) {
	                result[i]['BallRuns'] = 0;
	                result[i]['RunsText'] = 'Zero';
	            }
	        } 
	        if (searchStr == 'dotballsbowled') {
	            var result = $filter('filter')(overHistory, { IsDotball: 1, BowlerID: playerId });
	            for (var i = 0; i < result.length; i++) {
	                result[i]['BallRuns'] = 0;
	                result[i]['RunsText'] = 'Zero';
	            }
	        } 
	    	if (searchStr == 'wicket')
            {
                if(t20lite)
                    result = $filter('filter')(overHistory, { IsWicket:1, OutBatsManID: playerId });
                else{
                    result = $filter('filter')(overHistory, { IsWicket: true, OutBatsManID: playerId });
                    if(result.length==0)
                        result = $filter('filter')(overHistory, { IsWicket: 1, OutBatsManID: playerId });
                }
            }
	        	
	        if (searchStr == 'overs')
	            result = $filter('filter')(overHistory, { BowlerID: playerId });
	        if (searchStr == 'runsconceded')
	            result = $filter('filter')(overHistory, { IsDotball: 0, BowlerID: playerId });
	        if (searchStr == 'wicketstaken')
	        {
	        	if(t20lite)
	        		result = $filter('filter')(overHistory, { IsWicket:1, BowlerID: playerId });	
	        	else
	        	{
	        		result = $filter('filter')(overHistory, { IsWicket: true, BowlerID: playerId });
	        		if(result.length == 0 || result == undefined || result == '')
	        			result = $filter('filter')(overHistory, { IsWicket:1, BowlerID: playerId });	
	        	}
	        		
	           	var cResult = [];
	           	var j =0 ;
				for(var i=0;i<result.length;i++)
				{
					if(result[i]['WicketType'] != 'Run Out'){
						cResult[j] = result[i];
						j++;
					}						
				}
				result = cResult;
	        } 
	        if(searchStr == 'foursgiven')
	        {
	        	if(t20lite)
	        		result = $filter('filter')(overHistory, {IsFour:1,BowlerID:playerId});
	        	else
	        		result = $filter('filter')(overHistory, {IsFour: true,BowlerID:playerId});
	        }
				
			if(searchStr == 'sixesgiven')
			{
				if(t20lite)
					result = $filter('filter')(overHistory, {IsSix:1, BowlerID:playerId});
				else
					result = $filter('filter')(overHistory, {IsSix:true, BowlerID:playerId});		
			}
				
	        if (searchStr == 'wides')
	        {
	        	if(t20lite)
	        		result = $filter('filter')(overHistory, { IsWide:1, BowlerID: playerId });
	        	else
	        		result = $filter('filter')(overHistory, { IsWide: true, BowlerID: playerId });
	        }
	            
	        if (searchStr == 'noballs')
	        {
	        	if(t20lite)
	        		result = $filter('filter')(overHistory, { IsNoBall:1, BowlerID: playerId });
	        	else
	        		result = $filter('filter')(overHistory, { IsNoBall: true, BowlerID: playerId });
	        }
	            
	        if (searchStr == 'maiden')
	            result = $filter('filter')(overHistory, { IsMaiden: 1, BowlerID: playerId });

	        var inputParms={playerId:playerId,listen:listen,searchStr:searchStr,callBack:'playVideo'};
			$scope.constructPlaylist(result,inputParms);
	 	}

	 	/**** play video for full over function******/
	 	$scope.playOverVideo=function(overNo,innNo,listen){
	 		var result=$filter('filter')(overHistory,{OverNo:overNo,InningsNo:innNo},true);
	 		var inputParms={innNo:innNo,listen:listen,overNo:overNo,callBack:'playOverVideo'};
			$scope.constructPlaylist(result,inputParms);
		}

		/******* play video based on innings ******/
	    $scope.playInnVideo = function (innNo,listen) {
			var result = $filter('filter')(overHistory, {InningsNo:innNo});	
			var inputParms={innNo:innNo,listen:listen,callBack:'playInnVideo'};
			$scope.constructPlaylist(result,inputParms);
		}

	    /******* play individual ball ******/
	    $scope.playIndvBall=function(ballId){
	    	$(".mejs-list li.current").removeClass('current');
	    	var current_item=$(".mejs-list li[id='"+ballId+"']");
	    	$(current_item).addClass('current');
	    	currentBall = $(current_item).attr('id');
	    	var vidSrc=$(".mejs-list li[id='"+ballId+"']").attr('data-value');
	    	/*for (var pl in mejs.players) {
				mejs.players[pl].media.setSrc(vidSrc);
				mejs.players[pl].media.load();
				mejs.players[pl].media.play();
				mejs.players[pl].media.muted = false;
			}*/
			
			if(mejs.players.length == 0 || mejs.players.length == undefined)
			{
				player.setSrc(vidSrc);
				setTimeout(function() {
					player.load();
					player.play();
				}, 1000);
			}
			else
			{
				for (var pl in mejs.players) {
				  mejs.players[pl].media.setSrc(vidSrc);
				  mejs.players[pl].media.load();
				  mejs.players[pl].media.play();
				  mejs.players[pl].media.muted = false;
				}
			}
	    }

	    /**** play individual ball in an over  function******/
	    $scope.playBYBVideo=function(ballNo,overNo){
	    	var indvOvrBallList=$filter('filter')(overHistory,{BallCount:ballNo,OverNo:overNo},true);
	    	
	    	$scope.playLists = indvOvrBallList;
			var vid = document.getElementById("myVideo"); 
			if(indvOvrBallList[0] != undefined)
			{
				var ballcount = indvOvrBallList.length;
				var parentWidth = $('.playlistWrap').width();
				var listwidth = ( ballcount * 50 ) + 30;
				$('.mejs-list').css('width',listwidth+'px');
				if(listwidth > parentWidth)				
					$('.ballslide.nextBall').addClass('active');
				var ballTime="1460114940";// ball time
				if($scope.chkVideoPlay(ballTime)){
					if(indvOvrBallList[0].VideoFile != '')
					{
                        $("#videoplayer").attr('poster', '');
						playVideoFile(indvOvrBallList[0].VideoFile);
						$('.cd-popup').addClass('active');
					}
				}	
			}
			clearInterval(playListInterval);
			if (!$scope.$$phase) {
				$scope.$apply();
		  	} 
	    }

	    $scope.viewBallDetails = function(ballNo,overNo,evt){
	    	$(".BallDetails").addClass("active");
	    	$(".BallDetailsPointericon").addClass("active");		
	    	var ballOffset = $(evt.target).offset();
	    	var leftpos = ballOffset.left;
	    	if(leftpos <= 130)
	    		leftpos = 130;
	    	$(".BallDetails").css("left",leftpos);
	    	$(".BallDetails").css("top",ballOffset.top + 35);
	    	$(".BallDetailsPointericon").css("left",ballOffset.left);
	    	$(".BallDetailsPointericon").css("top",ballOffset.top + 16);
	    	var ballDetails = $filter('filter')(overHistory,{BallCount:ballNo,OverNo:overNo},true);
	    	$scope.ballDetails = (ballDetails[0] != undefined) ? ballDetails[0] : [];
	    }

	    /**** play overall runs video******/
	    $scope.playOverAllVideo = function (searchStr,listen) {
			if(searchStr == 'runs')
				var result = $filter('filter')(overHistory, {IsDotball:0});
			if(searchStr == 'fours')
				var result = $filter('filter')(overHistory, { IsFour: true});
			if(searchStr == 'dots')
			{
				var result = $filter('filter')(overHistory, {RunsText:"Zero",IsDotball:1});
				for(var i=0;i<result.length;i++)
				{
					result[i]['BallRuns'] = 0;
				}
			}
			if(searchStr == 'ones')
				var result = $filter('filter')(overHistory, {IsOne:1});
			if(searchStr == 'twos')
				var result = $filter('filter')(overHistory, {IsTwo:1});
			if(searchStr == 'threes')
				var result = $filter('filter')(overHistory, {IsThree:1});
			if(searchStr == 'sixes')
				var result = $filter('filter')(overHistory, {IsSix:true});
			if(searchStr == 'wicket')
				var result = $filter('filter')(overHistory, {IsWicket:true});
			if(searchStr == 'overs')
				var result = $filter('filter')(overHistory, {BowlerID:playerId});
			if(searchStr == 'wicketstaken')
				var result = $filter('filter')(overHistory, {IsWicket:true});
			if(searchStr == 'wides')
				var result = $filter('filter')(overHistory, {IsWide:true});
			if(searchStr == 'noballs')
				var result = $filter('filter')(overHistory, {IsNoBall:true});
			if(searchStr == 'maiden')
				var result = $filter('filter')(overHistory, {IsMaiden:1});	
			var inputParms={listen:listen,searchStr:searchStr,callBack:'playOverAllVideo'};
				$scope.constructPlaylist(result,inputParms);
		}

		/**** play partnership video******/
		$scope.playPartnership = function(searchStr,strikerId,nonStrikerId,listen){
			var result = [];
			if(searchStr == 'all')
			{
				var partStrikerData = $filter('filter')(overHistory, {StrikerID:strikerId,NonStrikerID:nonStrikerId});	
				var partNonStrikerData = $filter('filter')(overHistory, {StrikerID:nonStrikerId,NonStrikerID:strikerId});	
				result = $.merge(partStrikerData,partNonStrikerData);	
			}
			if(searchStr == 'extras')
			{
				var partStrikerData = $filter('filter')(overHistory, {StrikerID:strikerId,NonStrikerID:nonStrikerId,Extras:1});	
				var partNonStrikerData = $filter('filter')(overHistory, {StrikerID:nonStrikerId,NonStrikerID:strikerId,Extras:1});	
				result = $.merge(partStrikerData,partNonStrikerData);	
			}
			if(searchStr == 'striker')
				result = $filter('filter')(overHistory, {StrikerID:strikerId,NonStrikerID:nonStrikerId});	
			if(searchStr == 'nonstriker')
				result = $filter('filter')(overHistory, {StrikerID:nonStrikerId,NonStrikerID:strikerId});	
			
			var inputParms={listen:listen,searchStr:searchStr,callBack:'playPartnership',nonStrikerId:nonStrikerId,strikerId:strikerId};
				$scope.constructPlaylist(result,inputParms);
	   	}

	   	/**** common playlist  bind function******/
		$scope.constructPlaylist=function(result,inputParms){
			if(result != undefined && result.length > 0){
				result = $filter('orderBy')(result, ['OverNo','BallName']);
			}
			var finalresult = [];
			var listen=inputParms.listen;
			var k = 0;
			for (var i=0;i< result.length;i++) {
				var ballTime="1460114940";// ball time
				if($scope.chkVideoPlay(ballTime)){
					if(result[i] != undefined && result[i]['VideoFile'] != undefined && result[i]['VideoFile'] != '')
					{
						finalresult[k] = result[i];
						k++;
					}
				}
			}

			result = finalresult;
			if(result.length==0) return;
			if(listen != 'true')
			{
				$scope.playLists = result;
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
			}
			else{
				$scope.playLists = result;
			 	if (!$scope.$$phase) {
					$scope.$apply();
			  	}
				$('#'+currentBall).addClass('current');
			}

			if(result[0] != undefined && listen != 'true')
			{
                $("#videoplayer").attr('poster', '');
				var ballcount = result.length;
				var parentWidth = $('.playlistWrap').width();
				var listwidth = ( ballcount * 50 ) + 30;
				$('.mejs-list').css('width',listwidth+'px');
				if(listwidth > parentWidth)				
					$('.ballslide.nextBall').addClass('active');
				if(advVideo==true){
					loadCnt=1;
					playVideoFile("video/videoplayback.mp4");
					$(".customControlsWrap").addClass("inactive");
					$(".playlistWrap").addClass("inactive");
					$(".nextBall").addClass("inactive");
					$(".mejs-controls").addClass("inactive");
					$(".cd-popup-close").addClass("inactive");
				}
				else{
					playVideoFile(result[0].VideoFile);
					// applyPoster();
				}

				$('.cd-popup').addClass('active');
					
				clearInterval(playListInterval);
				if($scope.IsMatchEnd == 0)
					playListInterval = setInterval(function () { $scope.listenPlayList(inputParms); }, 12000);

				$scope.liveSPRefresh();
			}

             $scope.downloadfromURl = '';
             if(typeof videodownload == "undefined") 
                $scope.downLoadVideo = false;
            else
                $scope.downLoadVideo = videodownload;

             if($scope.downLoadVideo == 1 || $scope.downLoadVideo == '1')
                $scope.downloadfromURl = 'http://52.27.27.254/download/download.aspx?url=' 
		}

		$scope.liveSPRefresh = function(){
			if($scope.matchSummary.MatchType == "Twenty20 Match" && $scope.IsMatchEnd != 1){
				if(curInn == 1)
				{
					clearInterval(liveSPRefreshInterval);
					liveSPRefreshInterval = setInterval(function(){
						$scope.bindSP(matchId,curInn);
					},15000);
						
				}
				if(curInn == 2)
				{
					clearInterval(liveSPRefreshInterval);
					liveSPRefreshInterval = setInterval(function(){
						$scope.bindWLP(curInn,matchId);
					},15000);
				}
			}
			else if($scope.IsMatchEnd != 1)
			{
				clearInterval(liveSPRefreshInterval);
				liveSPRefreshInterval = setInterval(function(){
					mcService.GetScoringJs(matchId,$scope.currentInnText,function(data){
						var playerInningsData=[];
						playerInningsData=data[$scope.currentInnText];
						$scope.CurrentStrikerData = $filter('filter')(playerInningsData.BattingCard,{PlayerID : $scope.matchSummary.CurrentStrikerID},true)[0];
						$scope.CurrentNonStrikerData = $filter('filter')(playerInningsData.BattingCard,{PlayerID : $scope.matchSummary.CurrentNonStrikerID},true)[0];
						$scope.CurrentBowlerData = $filter('filter')(playerInningsData.BowlingCard,{PlayerID : $scope.matchSummary.CurrentBowlerID},true)[0];
						if (!$scope.$$phase) {
							$scope.$apply();
					  	} 
					});	
				},22000);
			}
			
		}

		/****  check video play time function******/
		$scope.chkVideoPlay=function(ballTime){
				return true;
				var now = new Date;
				var utc_timestamp = Date.UTC(now.getFullYear(),now.getMonth(), now.getDate() , 
				  now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
				var currentTimestamp = Math.floor(utc_timestamp/ 1000); 
				var offset = (new Date()).getTimezoneOffset();
				currentTimestamp = currentTimestamp + (offset * 60);

				var viewvideoTimeLimit = parseInt(ballTime) + (videoplayTimelimit * 60);
				if(currentTimestamp > viewvideoTimeLimit || true)
					return true;
				else 
					return false;
		}
		/****  playlist  live refresh function******/
		$scope.listenPlayList = function(params) {
	        if (params['callBack'] != undefined && params['callBack'] == 'playVideo') 
	        {
	            var playerId = params['playerId'];
	            var searchStr = params['searchStr'];
	            $scope.playVideo(playerId, searchStr, 'true');
	        }
	        if(params['callBack'] != undefined && params['callBack'] == 'playInnVideo')
			{
				var innNo = params['innNo'];
				$scope.playInnVideo(innNo,'true'); 
			}
			if(params['callBack'] != undefined && params['callBack'] == 'playOverVideo')
			{
				var innNo = params['innNo'];
				var overNo = params['overNo'];
				$scope.playOverVideo(overNo,innNo,'true'); 
			}
			if(params['callBack'] != undefined && params['callBack'] == 'playOverAllVideo')
			{
				var searchStr = params['searchStr'];
				$scope.playOverAllVideo(searchStr,'true'); 
			}
			if(params['callBack'] != undefined && params['callBack'] == 'playPartnership')	
			{
				var strikerId = params['strikerId'];
				var nonStrikerId = params['nonStrikerId'];
				var searchStr = params['searchStr'];
				$scope.playPartnership(searchStr,strikerId,nonStrikerId,'true'); 
			}
			if(params['callBack'] != undefined && params['callBack'] == 'playInnExtras')	
			{
				var searchStr = params['searchStr'];
				var innNo = params['innNo'];
				$scope.playInnExtras(searchStr,innNo,'true'); 
			}
			if(params['callBack'] != undefined && params['callBack'] == 'playHtHVideo')	
			{
				var strikerId = params['StrikerID'];
				var bowlerId = params['BowlerID'];
				var searchStr = params['searchStr'];
				$scope.playHtHVideo(strikerId,bowlerId,searchStr,'true'); 
			}
	    }
	    /****  play extras videos function******/
	    $scope.playInnExtras = function (searchStr,innNo,listen) {
			var result = [];
			if(searchStr == 'all')
			{
				var legbyes = $filter('filter')(overHistory, {InningsNo:innNo,IsLegBye:true});	
				var noballs = $filter('filter')(overHistory, {InningsNo:innNo,IsNoBall:true});	
				var wide = $filter('filter')(overHistory, {InningsNo:innNo,IsWide:true});	
				var bye = $filter('filter')(overHistory, {InningsNo:innNo,IsBye:true});	
				result = $.merge(legbyes,noballs);	
				result = $.merge(result,wide);
				result = $.merge(result,bye);			
			}
			if(searchStr == 'legbyes')
			{
				var result = $filter('filter')(overHistory, {InningsNo:innNo,IsLegBye:true});	
			}	
			if(searchStr == 'noballs')
			{
				var result = $filter('filter')(overHistory, {InningsNo:innNo,IsNoBall:true});	
			}	
			if(searchStr == 'wide')
			{
				var result = $filter('filter')(overHistory, {InningsNo:innNo,IsWide:true});	
			}	
			if(searchStr == 'bye')
			{
				var result = $filter('filter')(overHistory, {InningsNo:innNo,IsBye:true});	
			}		
			var inputParms={listen:listen,searchStr:searchStr,callBack:'playInnExtras',innNo:innNo};
			$scope.constructPlaylist(result,inputParms);
		}	
		/****  play head to haed videos function******/
		$scope.playHtHVideo=function(strikerId,bowlerId,searchStr,listen){
			var result = [];
			//IsDotball:0,IsWide:0,IsLegBye:0,IsBye:0,
			if(searchStr == 'runs'){
				if(t20lite)
					result = $filter('filter')(overHistory, {StrikerID:strikerId,BowlerID:bowlerId });	
				else
					result = $filter('filter')(overHistory, {StrikerID:strikerId,BowlerID:bowlerId });
			}			
			if (searchStr == 'balls'){
				if(t20lite)
					result = $filter('filter')(overHistory, { IsWide:0, StrikerID:strikerId,BowlerID:bowlerId});
				else
					result = $filter('filter')(overHistory, { IsWide:false, StrikerID:strikerId,BowlerID:bowlerId});
			}	       		
			if(searchStr == 'ones')
				result = $filter('filter')(overHistory, {IsOne:1, StrikerID:strikerId,BowlerID:bowlerId });
			if(searchStr == 'twos')
				result = $filter('filter')(overHistory, {IsTwo:1, StrikerID:strikerId,BowlerID:bowlerId });
			if (searchStr == 'threes')
	        	result = $filter('filter')(overHistory, { IsThree: 1, StrikerID:strikerId,BowlerID:bowlerId });
			if(searchStr == 'four'){
				if(t20lite)
					result = $filter('filter')(overHistory, {IsFour: 1,StrikerID:strikerId,BowlerID:bowlerId, IsExtra:0  });
				else
					result = $filter('filter')(overHistory, {IsFour: true,StrikerID:strikerId,BowlerID:bowlerId, IsExtra:0  });
			}	
			if(searchStr == 'six'){
				if(t20lite)
					result = $filter('filter')(overHistory, {IsSix:1, StrikerID:strikerId,BowlerID:bowlerId,IsExtra:0 });
				else
					result = $filter('filter')(overHistory, {IsSix:true, StrikerID:strikerId,BowlerID:bowlerId,IsExtra:0 });
			}
	    	if (searchStr == 'bowlerall')
	       		result = $filter('filter')(overHistory, { StrikerID:strikerId,BowlerID:bowlerId });
	        if (searchStr == 'dotballs') {
	            var result = $filter('filter')(overHistory, { IsDotball: 1, StrikerID:strikerId,BowlerID:bowlerId });
	            for (var i = 0; i < result.length; i++) {
	                result[i]['BallRuns'] = 0;
	                result[i]['RunsText'] = 'Zero';
	            }
	        } 
	    	if (searchStr == 'LegalBallsBowled'){
				if(t20lite)
					result = $filter('filter')(overHistory, { StrikerID:strikerId,BowlerID:bowlerId,IsNoBall:0,IsWide:0});
				else
					result = $filter('filter')(overHistory, { StrikerID:strikerId,BowlerID:bowlerId,IsNoBall:false,IsWide:false});
			}
	        if (searchStr == 'wicket'){
				if(t20lite)
					result = $filter('filter')(overHistory, { IsWicket: 1, OutBatsManID: strikerId,BowlerID:bowlerId});
				else
					result = $filter('filter')(overHistory, { IsWicket: true, OutBatsManID: strikerId,BowlerID:bowlerId});
			}	        	
	        if (searchStr == 'overs')
	            result = $filter('filter')(overHistory, { StrikerID:strikerId,BowlerID:bowlerId });
	        if (searchStr == 'runsconceded')
	            result = $filter('filter')(overHistory, { IsDotball: 0, StrikerID:strikerId,BowlerID:bowlerId });
	        if (searchStr == 'wicketstaken')
	        {
				if(t20lite)
					result = $filter('filter')(overHistory, { IsWicket: 1, StrikerID:strikerId,BowlerID:bowlerId });
				else
					result = $filter('filter')(overHistory, { IsWicket: true, StrikerID:strikerId,BowlerID:bowlerId });
	           	var cResult = [];
	           	var j=0;
				for(var i=0;i<result.length;i++)
				{
					if(result[i]['WicketType'] != 'Run Out')
					{
						cResult[j] = result[i];
						j++;
					}
				}
				result = cResult;
	        } 
	        if(searchStr == 'foursgiven'){
				if(t20lite)
					result = $filter('filter')(overHistory, {IsFour: 1,StrikerID:strikerId,BowlerID:bowlerId});
				else
					result = $filter('filter')(overHistory, {IsFour: true,StrikerID:strikerId,BowlerID:bowlerId});
			}
			if(searchStr == 'sixesgiven'){
				if(t20lite)
					result = $filter('filter')(overHistory, {IsSix:1, StrikerID:strikerId,BowlerID:bowlerId});
				else
					result = $filter('filter')(overHistory, {IsSix:true, StrikerID:strikerId,BowlerID:bowlerId});
			}
	        if (searchStr == 'wides'){
				if(t20lite)
					result = $filter('filter')(overHistory, { IsWide: 1,StrikerID:strikerId,BowlerID:bowlerId });
				else
					result = $filter('filter')(overHistory, { IsWide: true,StrikerID:strikerId,BowlerID:bowlerId });
			}
	        if (searchStr == 'noballs'){
				if(t20lite)
					result = $filter('filter')(overHistory, { IsNoBall: 1, StrikerID:strikerId,BowlerID:bowlerId });
				else
					result = $filter('filter')(overHistory, { IsNoBall: true, StrikerID:strikerId,BowlerID:bowlerId });
			}	            
	        if (searchStr == 'maiden')
	            result = $filter('filter')(overHistory, { IsMaiden: 1, StrikerID:strikerId,BowlerID:bowlerId });
			
			
	        var inputParms={StrikerID:strikerId,BowlerID:bowlerId,listen:listen,searchStr:searchStr,callBack:'playHtHVideo'};
			$scope.constructPlaylist(result,inputParms);
		}
	}
	else {
			$(".scorecardBlk").removeClass("videoscorecard");
	}

    /*******End video play script ******/

    $scope.innGraphCalc=function(Innval,totVal){
    	if(Innval==undefined || Innval==0){
    		var innPer=0;
    		return innPer;
    	}
    	else{
    		var innPer=(Innval/totVal)*100+"%";
    		return innPer;
    	}
    	if (!$scope.$$phase) {
			$scope.$apply();
	  	} 
    }

    $scope.dateFormat=function(string){
    	var d = new Date(string);
    	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			];
    	var date = d.getDate() + ' '+ monthNames[(d.getMonth())] + " " +  d.getFullYear();
    	return date;
    }

    /******* get individual top batsmen and blowler scores ******/
    $scope.getIndvPlayerScore=function(playerId,teamId,type){
    	initLoad='';
    	clearInterval(liveScoreCardInterval);
    	if(cloudFirestore)
    		firebaseRef();
    	$(".pageloader").addClass('active');
    	$(".mcTopPlayersList a").removeClass('selItemActive');
    	//Make Select Player stats Tab Active
    	$("#navWrapperSmipl .navMainSmipl li a").removeClass("mcCurrent");
    	$("#navWrapperSmipl .navMainSmipl li a.teammenuItem").addClass("mcCurrent");
    	if(type=="batsmen")
    		$("#topBatsmenSmipl .mcTopPlayersList a[data-pId='"+playerId+"']").addClass('selItemActive');
    	else if(type=="bowlers")
    		$("#topBowlersSmipl .mcTopPlayersList a[data-pId='"+playerId+"']").addClass('selItemActive');
    	if($scope.teamList==undefined)
    		$scope.bindResult(competitionId,"teamstats");
    	else
    		$scope.getPlayerList(competitionId,teamId,'topplayer');
    	//Clear Error Message Text
    	$("#errMsg").html("");
		$("#matchCenter").scrollTop(0);
    }
	
	/****Fixer countdown**********/
	function calcTime(datestring,offset) {
	    // create Date object for current location
	    var d = new Date(datestring);

	    // convert to msec
	    // subtract local time zone offset
	    // get UTC time in msec
	    var utc = d.getTime() + (60 * 60000);
  
	    // create new Date object for different city
	    // using supplied offset
	    var nd = new Date(utc + (3600000*offset));

	    // return time as a string
	    var options = { year: 'numeric', month: 'short', day: '2-digit',hour : '2-digit',minute:'2-digit' };
	    return nd.toLocaleString("en-GB",options);
	}

	function calcTime2(datestring,offset) {
	    // create Date object for current location
	    var d = new Date(datestring);

	    // convert to msec
	    // subtract local time zone offset
	    // get UTC time in msec
	    var utc = d.getTime();
  
	    // create new Date object for different city
	    // using supplied offset
	    var nd = new Date(utc + (3600000*offset));

	    // return time as a string
	    var options = { year: 'numeric', month: 'short', day: '2-digit',hour : '2-digit',minute:'2-digit' };
	    return nd.toLocaleString("en-GB",options);
	}

	function calcTime3(city, offset) {
	    // create Date object for current location
	    var d = new Date();

	    // convert to msec
	    // subtract local time zone offset
	    // get UTC time in msec
	    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);

	    // create new Date object for different city
	    // using supplied offset
	    var nd = new Date(utc + (3600000*offset));

	     var options = { year: 'numeric', month: 'short', day: '2-digit',hour : '2-digit',minute:'2-digit' };
	    return nd.toLocaleString("en-GB",options);
	}

	function getTimezoneOffset() {
	  function z(n){return (n<10? '0' : '') + n}
	  var offset = new Date().getTimezoneOffset();
	  var sign = offset < 0? '+' : '-';
	  offset = Math.abs(offset);
	  return sign + (offset/60);
	}

	$scope.getFixtureCountDown=function(fixturesData,cuurentISTtime){
		 
     	
		clearInterval(countdownInterval);
		if(fixturesData == undefined) return;
		else{
			var fixLength=[];
			var timerFlag=1;
			var incSecs = 0;
			countdownInterval = setInterval(function() {
			cuurentISTtime = cuurentISTtime + 1;	
			incSecs = incSecs+1;
			for(var i=0;i<fixturesData.length;i++)
			{
				fixLength[i]=i;
				var matchDateTime = fixturesData[i].MatchDateNew+" "+fixturesData[i].MatchTime;
				

				var matchDateTime = fixturesData[i].MatchDateNew+" "+fixturesData[i].MatchTime;
				//var d =  new Date(matchDateTime).getTime() / 1000;
				
				//var d1 = fixturesData[i].zoneTime + incSecs;
				
				var monthAr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
				var gmtDate = fixturesData[i].GMTMatchDate;
				if(gmtDate != undefined && gmtDate != null && gmtDate != ''){
					gmtDate = gmtDate.split("-");
					var GMTMatchTime = fixturesData[i].GMTMatchTime;
					GMTMatchTime = GMTMatchTime.split(" ");
					GMTMatchTime = GMTMatchTime[0];
					var gmtMonth = gmtDate[1];
					gmtMonth = parseInt(gmtMonth) - 1;
					gmtDate = gmtDate[2]+' '+monthAr[gmtMonth]+' '+gmtDate[0];;
					var d =  new Date(gmtDate+" "+GMTMatchTime).getTime() / 1000;
				}
				else
					var d =  new Date(matchDateTime).getTime() / 1000;
				
				var tmLoc = new Date();
					//The offset is in minutes -- convert it to ms
				tmLoc =  tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000;
				var d1 = tmLoc / 1000;
				
				var sec = d - d1;
				sec = parseInt(sec);
				
				if(isNaN(sec))
				{
					$(".fix_"+fixturesData[i].FixtureID).addClass("inactive");
					return;
				}
				else{
						// $(".fixtureTimerCountdown").removeClass("inactive");			
				}
				
				// sec = sec + 34200;
				var upgradeTime = sec;
				var seconds = upgradeTime;
				fixtureindex = i;
				fixturesCountDownData = fixturesData;
				var days        = Math.floor(seconds/24/60/60);
				var hoursLeft   = Math.floor((seconds) - (days*86400));
				var hours       = Math.floor(hoursLeft/3600);
				var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
				var minutes     = Math.floor(minutesLeft/60);
				var remainingSeconds = seconds % 60;
				if (remainingSeconds < 10) {
					remainingSeconds = "0" + remainingSeconds; 
				}

				var winSelfieImg = $(".WinningSelfieBlock img").attr("src");
				
				if(hours > 2 && i==0 && winSelfieImg != '')
		        {
		        	$(".countDownBlock").addClass("inactive");
	            	$(".WinningSelfieBlock").removeClass("inactive");
	            	$(".fixtureSECTION").addClass("w1");
	            	$(".fixtureSECTION").addClass("photoView");
		        }


				 if(days < 10)
		            days = "0"+days;
		          if(hours < 10)
		            hours = "0"+hours;
		          if(minutes < 10)
		            minutes = "0"+minutes;

		        	if (!$scope.$$phase) {
						$scope.$apply();
				  	}

				//document.getElementById('countdown').innerHTML = days + ":" + hours + ":" + minutes + ":" + remainingSeconds;
				$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.days .timervalue").text(days);
				if(days == 1)
					$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.days .timerLabel").text("day");
				if(days < 1)					
					$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.days").addClass("inactive");
				$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.hrs .timervalue").text(hours);
				$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.mins .timervalue").text(minutes);
				$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.secs .timervalue").text(remainingSeconds);
				if (seconds <= 0) {
					//clearInterval(countdownTimer[i]);
					$(".fix_"+fixturesData[i].FixtureID).addClass("inactive");
					$(".fix_"+fixturesData[i].FixtureID).siblings(".countdownTitleWrap").addClass("inactive");
					$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.days .timervalue").text("");
					$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.hrs .timervalue").text("");
					$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.mins .timervalue").text("");
					$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimerWrap.secs .timervalue").text("");
				} else {
					$(".fix_"+fixturesData[i].FixtureID).removeClass("inactive");
					$(".fix_"+fixturesData[i].FixtureID).siblings(".countdownTitleWrap").removeClass("inactive");
					seconds--;
				}
			}
		}, 1000);
		
		}
    }

	 $scope.getFixtureCountDownold=function(fixturesData,zoneTime){
		if(fixturesData == undefined) return;
		else{
			var fixLength=[];
			var timerFlag=1;
			fixCountdownInterval = setInterval(function() {
			zoneTime = zoneTime + 1;
			for(var i=0;i<fixturesData.length;i++)
			{
				fixLength[i]=i;
				var matchDateTime = fixturesData[i].MatchDate+" "+fixturesData[i].MatchTime;
					// var matchDateTime = "25 Jun 2017 09:00 AM";// fixturesData[i].MatchDate+" "+fixturesData[i].MatchTime;
				
				
				var timeOffset = getTimezoneOffset();
				var matchdateString = calcTime2(matchDateTime,timeOffset);

				
				// var d = new Date(matchDateTime).getTime() / 1000;
				if (GetIEVersion() > 0) 
				{
					// var dateAr = matchdateString.split(" ");
					// console.log(dateAr);
					// var dy = dateAr[0].toString();
					// var mn = dateAr[1].toString();
					// var yr = dateAr[2].toString();
					// var timestr =  dateAr[3];
					// timestr = timestr.split(":");
					// var hr = timestr[0].toString();
					// var min = timestr[1].toString();
					// matchdateString = dy + " "+mn+" "+yr+", "+hr+":"+min;
					// console.log(matchdateString);
					matchdateString = matchdateString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
					$("#matchCenter").addClass("iedevice");
				}
				

				var isMobile = {
				    Android: function() {
				        return navigator.userAgent.match(/Android/i);
				    },
				    BlackBerry: function() {
				        return navigator.userAgent.match(/BlackBerry/i);
				    },
				    iOS: function() {
				        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
				    },
				    Opera: function() {
				        return navigator.userAgent.match(/Opera Mini/i);
				    },
				    Windows: function() {
				        return navigator.userAgent.match(/IEMobile/i);
				    },
				    any: function() {
				        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
				    }
				};
				var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
				var windwdt = $(window).width();
					// alert(matchdateString);
				if((isMobile.iOS() || isSafari) && windwdt > 767 && false) 
	   			{
					// var dateAr = matchdateString.split(",");
					// var datestr = dateAr[0];
					// var dy = datestr[0].toString();
					// var mn = datestr[1].toString();
					// var yr = datestr[2].toString();
					// var timestr =  dateAr[1];
					// timestr = timestr.split(":");
					// var hr = timestr[0].toString();
					// var min = timestr[1].toString();

					var dateAr = matchdateString.split(" ");
					var dy = dateAr[0].toString();
					var mn = dateAr[1].toString();
					var yr = dateAr[2].toString();
					// var timestr =  dateAr[3];
					// timestr = timestr.split(":");
					var hr = dateAr[4];
					var min = dateAr[5];

					mn = mn.substring(0, 3);
					matchdateString = dy + "-"+mn+"-"+yr+", 02:00:00 PM";
					// console.log(matchdateString);
					// matchdateString = "10-Jun-2017,12:00:00 AM";
					// alert(matchdateString);
				}

				// var d = new Date(matchdateString).getTime() / 1000;
				var matchDateTime = fixturesData[i].MatchDate+" "+fixturesData[i].MatchTime;
				var d = new Date(matchDateTime).getTime() / 1000;

				
				var d1 =  zoneTime ;//new Date().getTime() / 1000;
				// var d1 =  new Date(zoneTime).getTime() / 1000;
				// console.log(d);
				
				var sec = d - d1;

				sec = parseInt(sec);
				
				if(isNaN(sec))
				{
					// $(".fix_"+fixturesData[i].FixtureID).addClass("inactive");
					$(".fixtureTimerCountdown").addClass("inactive");

					return;
				}
				else{
						// $(".fixtureTimerCountdown").removeClass("inactive");			
				}
				
				// sec = sec + 34200;
				var upgradeTime = sec;
				var seconds = upgradeTime;
				fixtureindex = i;
				fixturesCountDownData = fixturesData;
				var days        = Math.floor(seconds/24/60/60);
				var hoursLeft   = Math.floor((seconds) - (days*86400));
				var hours       = Math.floor(hoursLeft/3600);
				var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
				var minutes     = Math.floor(minutesLeft/60);
				var remainingSeconds = seconds % 60;
				if (remainingSeconds < 10) {
					remainingSeconds = "0" + remainingSeconds; 
				}

				if(days > 1)
				{
					$(".fix_"+fixturesData[i].FixtureID).addClass("hide");					
					var countDays = $scope.timeGoFromEpochTime(d,zoneTime);
					$(".matchCountdown.mfix_"+fixturesData[i].FixtureID).find(".count").removeClass("hide");
					$(".matchCountdown.mfix_"+fixturesData[i].FixtureID).find(".count").text(countDays);
				}
				else{
					$(".fix_"+fixturesData[i].FixtureID).removeClass("hide");
					$(".matchCountdown.mfix_"+fixturesData[i].FixtureID).find(".count").addClass("hide");
					
				}

				//document.getElementById('countdown').innerHTML = days + ":" + hours + ":" + minutes + ":" + remainingSeconds;
				$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimer.days .timervalue").text(days);
				if(days == 1)
					$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimer.days .timerLabel").text("day");
				$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimer.hrs .timervalue").text(hours);
				$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimer.mins .timervalue").text(minutes);
				$(".fix_"+fixturesData[i].FixtureID).find(".fixtureTimer.secs .timervalue").text(remainingSeconds);
								
				if (seconds <= 0) {
					$(".fix_"+fixturesData[i].FixtureID).addClass("inactive");
					$(".matchCountdown.mfix_"+fixturesData[i].FixtureID).addClass("inactive");
					$(".mId_"+fixturesData[i].FixtureID+" .hideBasedOntime").addClass("hide");
				} else {
					$(".fix_"+fixturesData[i].FixtureID).removeClass("inactive");
					$(".mId_"+fixturesData[i].FixtureID+" .hideBasedOntime").removeClass("hide");
					seconds--;
				}
			}
		}, 1000);
		
		}
    }

    $scope.getFixtureCountDownInv=function(fixturesData,zoneTime){
		if(fixturesData == undefined) return;
		else{
			var fixLength=[];
			var timerFlag=1;
			fixCountdownInterval2[fixturesData.FixtureID] = setInterval(function() {
			zoneTime = zoneTime + 1;
			// for(var i=0;i<fixturesData.length;i++)
			// {
				// fixLength[i]=i;
				var matchDateTime = fixturesData.MatchDate+" "+fixturesData.MatchTime;
					// var matchDateTime = "25 Jun 2017 09:00 AM";// fixturesData[i].MatchDate+" "+fixturesData[i].MatchTime;
				
				
				var timeOffset = getTimezoneOffset();
				var matchdateString = calcTime2(matchDateTime,timeOffset);

				
				// var d = new Date(matchDateTime).getTime() / 1000;
				if (GetIEVersion() > 0) 
				{
					// var dateAr = matchdateString.split(" ");
					// console.log(dateAr);
					// var dy = dateAr[0].toString();
					// var mn = dateAr[1].toString();
					// var yr = dateAr[2].toString();
					// var timestr =  dateAr[3];
					// timestr = timestr.split(":");
					// var hr = timestr[0].toString();
					// var min = timestr[1].toString();
					// matchdateString = dy + " "+mn+" "+yr+", "+hr+":"+min;
					// console.log(matchdateString);
					matchdateString = matchdateString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
					$("#matchCenter").addClass("iedevice");
				}
				

				var isMobile = {
				    Android: function() {
				        return navigator.userAgent.match(/Android/i);
				    },
				    BlackBerry: function() {
				        return navigator.userAgent.match(/BlackBerry/i);
				    },
				    iOS: function() {
				        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
				    },
				    Opera: function() {
				        return navigator.userAgent.match(/Opera Mini/i);
				    },
				    Windows: function() {
				        return navigator.userAgent.match(/IEMobile/i);
				    },
				    any: function() {
				        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
				    }
				};
				var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
				var windwdt = $(window).width();
					// alert(matchdateString);
				if((isMobile.iOS() || isSafari) && windwdt > 767 && false) 
	   			{
					// var dateAr = matchdateString.split(",");
					// var datestr = dateAr[0];
					// var dy = datestr[0].toString();
					// var mn = datestr[1].toString();
					// var yr = datestr[2].toString();
					// var timestr =  dateAr[1];
					// timestr = timestr.split(":");
					// var hr = timestr[0].toString();
					// var min = timestr[1].toString();

					var dateAr = matchdateString.split(" ");
					var dy = dateAr[0].toString();
					var mn = dateAr[1].toString();
					var yr = dateAr[2].toString();
					// var timestr =  dateAr[3];
					// timestr = timestr.split(":");
					var hr = dateAr[4];
					var min = dateAr[5];

					mn = mn.substring(0, 3);
					matchdateString = dy + "-"+mn+"-"+yr+", 02:00:00 PM";
					// console.log(matchdateString);
					// matchdateString = "10-Jun-2017,12:00:00 AM";
					// alert(matchdateString);
				}

				// var d = new Date(matchdateString).getTime() / 1000;
				var matchDateTime = fixturesData.MatchDate+" "+fixturesData.MatchTime;
				var d = new Date(matchDateTime).getTime() / 1000;

				
				var d1 =  zoneTime ;//new Date().getTime() / 1000;
				// var d1 =  new Date(zoneTime).getTime() / 1000;
				// console.log(d);
				
				var sec = d - d1;

				sec = parseInt(sec);
				
				if(isNaN(sec))
				{
					// $(".fix_"+fixturesData[i].FixtureID).addClass("inactive");
					$(".fixtureTimerCountdown").addClass("inactive");

					return;
				}
				else{
						// $(".fixtureTimerCountdown").removeClass("inactive");			
				}
				
				// sec = sec + 34200;
				var upgradeTime = sec;
				var seconds = upgradeTime;
				fixtureindex = i;
				fixturesCountDownData = fixturesData;
				var days        = Math.floor(seconds/24/60/60);
				var hoursLeft   = Math.floor((seconds) - (days*86400));
				var hours       = Math.floor(hoursLeft/3600);
				var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
				var minutes     = Math.floor(minutesLeft/60);
				var remainingSeconds = seconds % 60;
				if (remainingSeconds < 10) {
					remainingSeconds = "0" + remainingSeconds; 
				}

				if(days > 1)
				{
					$(".fix_"+fixturesData.FixtureID).addClass("hide");
					var countDays = $scope.timeGoFromEpochTime(d,zoneTime);
					$(".matchCountdown.mfix_"+fixturesData.FixtureID).find(".count").removeClass("hide");
					$(".matchCountdown.mfix_"+fixturesData.FixtureID).find(".count").text(countDays);
				}
				else{
					$(".fix_"+fixturesData.FixtureID).removeClass("hide");
					$(".matchCountdown.mfix_"+fixturesData.FixtureID).find(".count").addClass("hide");
					
				}

				//document.getElementById('countdown').innerHTML = days + ":" + hours + ":" + minutes + ":" + remainingSeconds;
				$(".fix_"+fixturesData.FixtureID).find(".fixtureTimer.days .timervalue").text(days);
				if(days == 1)
					$(".fix_"+fixturesData.FixtureID).find(".fixtureTimer.days .timerLabel").text("day");
				$(".fix_"+fixturesData.FixtureID).find(".fixtureTimer.hrs .timervalue").text(hours);
				$(".fix_"+fixturesData.FixtureID).find(".fixtureTimer.mins .timervalue").text(minutes);
				$(".fix_"+fixturesData.FixtureID).find(".fixtureTimer.secs .timervalue").text(remainingSeconds);
								
				if (seconds <= 0) {
					$(".fix_"+fixturesData.FixtureID).addClass("inactive");
					$(".matchCountdown.mfix_"+fixturesData.FixtureID).addClass("inactive");
				} else {
					$(".fix_"+fixturesData.FixtureID).removeClass("inactive");
					seconds--;
				}
			// }
		}, 1000);
		
		}
    }

	/******* get tournament stats ******/
	$scope.getTStats=function(type){
		$(".winlossPercentMeter").addClass("inactive"); 	
		$("#errMsg").html("");
		clearInterval(liveInterval);
		if(cloudFirestore)
			firebaseSRef();
		var comId=$(".mcSearchCompetition").attr("data-comid");
		// $("#mcFilterBtn li.mnActive").removeClass('mnActive');
		// $("#mcFilterBtn li").removeClass('mnActive');
		// $("#mcFilterBtn li[data-value='"+type+"']").addClass('mnActive');
		// $("#mcMenuWrapper .mcTabs li").removeClass('current');
		// $("#mcMenuWrapper .mcTabs li[data-value='"+type+"']").addClass('current');
		$scope.noTstats = false;
		$(".nostandings").addClass("inactive");
		$scope.bindResult(comId,type);
		$scope.fullWidth='';
		if(type == "standings"){
			$scope.showAllStats = false;
			$scope.showteamsquads = false;
		}
			
		

		if(type == "teamDetailStats")
		{
			$(".statsSubMenu li").removeClass("current");
			$(".statsSubMenu li[data-value='teamStats']").addClass("current");
		}
		else if(type == "teamstats"){
			$(".statsSubMenu li").removeClass("current");
			$(".statsSubMenu li[data-value='playerStats']").addClass("current");
		}
		else if(type == "tourstats"){
			$(".statsSubMenu li").removeClass("current");
			$(".statsSubMenu li[data-value='tmtStats']").addClass("current");
		}
		setTimeout(function(){
			$(".nicescroll_content").getNiceScroll().hide();
            $(".nicescroll_content").getNiceScroll().resize();
            $(".nicescroll_content").getNiceScroll().show();
		},500);
	}

	$scope.showStatsBlock = function(){
		
		if(tstatsMenu)
			$scope.getTStats('tourstats');
		else if(teamstatsMenu)
			$scope.getTStats('teamDetailStats');
		else if(playerstatsMenu)
			$scope.getTStats('teamstats');
		
		$scope.showstandings=false;
		$scope.showtourstats=false;
		$scope.showplayerstats=false;
		$scope.showteamstats = false;
		$scope.showteamsquads = false;
		$scope.showFixture=false;
		$scope.showscorecard=false;
		$scope.showAllStats = true;
		
		$scope.showtourstats=true;
	}
	
	$scope.showCompetitionSquads = function(){
		mcService.GetCompetitionSquads(competitionId,function(data){
			console.log(data);
			
			var competitionSquadsTeamsList = (data.teams != undefined) ? data.teams : [];
			var competitionSquadsList = (data.squads != undefined) ? data.squads : [];
			$scope.competitionSquadsTeamsList = competitionSquadsTeamsList;
			$scope.competitionSquadsList = competitionSquadsList;
			$scope.showteamsquads = true;
			$scope.squadsmenu =true;
			
			    $scope.showstandings=false;
				$scope.showtourstats=false;
				$scope.showplayerstats=false;
				$scope.showteamstats = false;
				$scope.showFixture=false;
				$scope.showscorecard=false;
				$scope.showAllStats = false;
			
				$("#mcMenuWrapper .mcTabs li").removeClass('current');
				$("#mcMenuWrapper .mcTabs li[data-value='csquads']").addClass('current');
			
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}
		  	
		});
	}

	$scope.setFullwidth=function(type){
		if(type!="standings"){
			if($scope.fixtureList.length>0 && $scope.liveList.length==0 && $scope.resultList.length==0){
				$scope.fullWidth={'width':'100%'};
			}
			else{
				$scope.fullWidth='';
			}
		}
		else{
			$scope.fullWidth='';
		}
		if (!$scope.$$phase) {
			$scope.$apply();
	  	} 
	}

	$scope.viewOverlayBriefscore = function(){
		// $(".briefscoreOverlay").toggleClass("active");
	}

	$scope.getfivedayweather = function(fixturesData,uniqueCity){
		if(fixturesData.length == 0) return;

		var citywedataFound = 0;
		for(var index2=0;index2<uniqueCity.length;index2++)
		{
			(function(j){
					var cityname = (uniqueCity[j] != undefined && uniqueCity[j] != '') ? uniqueCity[j].toLowerCase() : '';
					cityname = cityname.replace(" ", "");
					var calbackFunc = cityname+"fivedayweather";
					var url = "https://icct20wc2016-dev.s3-ap-southeast-1.amazonaws.com/weather/"+cityname+"-fivedayweather.js";
					 $.ajax({
					            crossDomain: true,
					            type: "GET",
					            contentType: "application/json; charset=utf-8",
					            async: true,
					            url: url,
					            dataType: "jsonp",
					            jsonpCallback: calbackFunc,
					            success: function (data) {
					            	citywedataFound = citywedataFound + 1;
					            	fivedayweather = (data.fivedayweather != undefined) ? data.fivedayweather : [];
					            	fivedayweather.city = uniqueCity[j];
					            	cityWeatherData.push(fivedayweather);
					            },
					            error:function(){
					            	citywedataFound = citywedataFound + 1;
					            }
					        });
			  })(index2);
		}

		var listenweatherData = setInterval(function(){
			if(citywedataFound>= uniqueCity.length)
			{
				clearInterval(listenweatherData);
			
			
			// var matchDateTime = "25 Jun 2017 09:00 AM";// fixturesData[i].MatchDate+" "+fixturesData[i].MatchTime;
				
		for(var index=0;index<fixturesData.length;index++)
			{

				(function(i){
					fivedayweather = '';;
					for(var k=0;k<cityWeatherData.length;k++)
					{
						if(cityWeatherData[k].city == fixturesData[i]['city'])
							fivedayweather = cityWeatherData[k];
					}
					if(fivedayweather != '')
					{

					            		var matchDateTime = fixturesData[i].MatchDate+" 14:30:00";
					            		var timeOffset = getTimezoneOffset();
				
										var matchdateString = calcTime(matchDateTime,timeOffset);	
										
										// var d = new Date(matchDateTime).getTime() / 1000;
										if (GetIEVersion() > 0) 
										{
											// var dateAr = matchdateString.split(" ");
											// console.log(dateAr);
											// var dy = dateAr[0].toString();
											// var mn = dateAr[1].toString();
											// var yr = dateAr[2].toString();
											// var timestr =  dateAr[3];
											// timestr = timestr.split(":");
											// var hr = timestr[0].toString();
											// var min = timestr[1].toString();
											// matchdateString = dy + " "+mn+" "+yr+", "+hr+":"+min;
											// console.log(matchdateString);
											matchdateString = matchdateString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
											$("#matchCenter").addClass("iedevice");
										}
										

										var isMobile = {
										    Android: function() {
										        return navigator.userAgent.match(/Android/i);
										    },
										    BlackBerry: function() {
										        return navigator.userAgent.match(/BlackBerry/i);
										    },
										    iOS: function() {
										        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
										    },
										    Opera: function() {
										        return navigator.userAgent.match(/Opera Mini/i);
										    },
										    Windows: function() {
										        return navigator.userAgent.match(/IEMobile/i);
										    },
										    any: function() {
										        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
										    }
										};
										var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
										var windwdt = $(window).width();
											// alert(matchdateString);
										if((isMobile.iOS() || isSafari) && windwdt > 767) 
							   			{
											// var dateAr = matchdateString.split(",");
											// var datestr = dateAr[0];
											// var dy = datestr[0].toString();
											// var mn = datestr[1].toString();
											// var yr = datestr[2].toString();
											// var timestr =  dateAr[1];
											// timestr = timestr.split(":");
											// var hr = timestr[0].toString();
											// var min = timestr[1].toString();

											var dateAr = matchdateString.split(" ");
											var dy = dateAr[0].toString();
											var mn = dateAr[1].toString();
											var yr = dateAr[2].toString();
											// var timestr =  dateAr[3];
											// timestr = timestr.split(":");
											var hr = dateAr[4];
											var min = dateAr[5];

											mn = mn.substring(0, 3);
											matchdateString = dy + "-"+mn+"-"+yr+", 09:00:00 AM";
											// console.log(matchdateString);
											// matchdateString = "10-Jun-2017,12:00:00 AM";
											// alert(matchdateString);
										}

										var matchdateString = fixturesData[i].MatchDate+" "+fixturesData[i].MatchTime;

					            		var d = new Date(matchdateString).getTime() / 1000;
										
										if(fivedayweather != '')
										{
											var weatherinfolist = (fivedayweather.list != undefined) ? fivedayweather.list : [];
											$(".fixweather_"+fixturesData[i].FixtureID).addClass("inactive");
											for(var w=0;w<weatherinfolist.length;w++)
											{
												var dt = weatherinfolist[w].dt;
												if(dt >= d)
												{
													$(".fixweather_"+fixturesData[i].FixtureID).removeClass("inactive");
													var wIcon = mcpath+"images/weathericons/"+weatherinfolist[w].weather[0].icon+'.png';
													var weatherindeg = parseInt(weatherinfolist[w].main.temp);
													$(".fixweather_"+fixturesData[i].FixtureID+" .temperatureText").text(weatherindeg);
													$(".fixweather_"+fixturesData[i].FixtureID+" img").attr("src",wIcon);
													break;
												}
											}
											

										}	
					          
							   

								}	
					            
					       

				  })(index);

				
				
			}

		}
		},1000);
	

		
	}


	$scope.getcurrentDayweather = function(fixturesData,uniqueCity){
		
	}

	$scope.timeGoFromEpochTime = function(epoch,zTime) {
        var secs = epoch - zTime;
        Math.floor(secs);
        var minutes = secs / 60;
        secs = Math.floor(secs % 60);
        if (minutes < 1) {
            return secs + (secs > 1 ? ' seconds to go' : ' second to go');
        }
        var hours = minutes / 60;
        minutes = Math.floor(minutes % 60);
        if (hours < 1) {
            return minutes + (minutes > 1 ? ' minutes to go' : ' minute to go');
        }
        var days = hours / 24;
        hours = Math.floor(hours % 24);
        if (days < 1) {
            return hours + (hours > 1 ? ' hours to go' : ' hour to go');
        }
        var weeks = days / 7;
        days = Math.floor(days % 7);
        if (weeks < 1) {
            return days + (days > 1 ? ' days to go' : ' day to go');
        }
        var months = weeks / 4.35;
        weeks = Math.floor(weeks % 4.35);
        if (months < 1) {
            return weeks + (weeks > 1 ? ' weeks to go' : ' week to go');
        }
        var years = months / 12;
        months = Math.floor(months % 12);
        if (years < 1) {
            return months + (months > 1 ? ' months to go' : ' month to go');
        }
        years = Math.floor(years);
        return years + (years > 1 ? ' years to go' : ' years to go');
    }

    $scope.showTourDetStats = function(contentId){
		if($(".mvpButton").hasClass("active")){
			$(".filterTeamsList").removeClass("active");
			$(".filterTeamsList[data-val='All Teams']").addClass("active");
		}
		$scope.showAwars = false;
    	$(".mcTabs.tourTab li").removeClass("current");
    	$(".mcTabs.tourTab li[data-tab='"+contentId+"']").addClass("current");
    	$(".tabTourContent").removeClass("current");
    	$("#"+contentId).addClass("current");
		
		$("#htab .recordtab__btn").removeClass("active bg-red");
		$(".atl-mobile .ap-tabs-wrp .recordtab__btn").removeClass("active bg-red");
		$("#htab .recordtab__btn."+contentId).addClass("active bg-red");
		$(".atl-mobile .ap-tabs-wrp .recordtab__btn."+contentId).addClass("active bg-red").removeClass("bg-none");
		
		if(contentId == 'batting'){
			$("#battingTAB").show();
			$(".battingTopper").removeClass("inactive");
			$(".bowlingTopper").addClass("inactive");
			$("#bowlingTAB").hide();
			$(".battingT").show();
			$(".bowlingT").hide();
			$("#mvpTAB").hide();
			$(".mvpButton").removeClass("active");
			$("#fairplayTAB").hide();
			$(".fairplayBtn").removeClass("active");
			$scope.tstatsBatting();
		}
		if(contentId == 'bowling'){
			$("#battingTAB").hide();
			$("#bowlingTAB").show();
			$(".battingTopper").addClass("inactive");
			$(".bowlingTopper").removeClass("inactive");
			$(".battingT").hide();
			$(".bowlingT").show();
			$("#mvpTAB").hide();
			$(".mvpButton").removeClass("active");
			$("#fairplayTAB").hide();
			$(".fairplayBtn").removeClass("active");
			$scope.tstatsBattingV2('mw','MostWickets','','mostWickets','mostwickets');
		}
    	setTimeout(function(){
	        $(".nicescroll_content").getNiceScroll().resize();
    	},500);
    }
	
	$scope.showMVPPlayersList = function(){
		$("#battingTAB").hide();
		$("#bowlingTAB").hide();
		$("#fairplayTAB").hide();
		$('#mvpTAB').show();
		$(".battingTopper").addClass("inactive");
		$(".bowlingTopper").addClass("inactive");
		$scope.mvpStatsList = "";
		$(".mvpButton").addClass("active");
		$(".fairplayBtn").removeClass("active");
		$scope.showAwars = true;
		$(".atl-mobile").removeClass("atl-mobile-t");
		$scope.selectedAwards = 'MVP';

		$(".awa-container").addClass("inactive");
		$(".np-battingtable_contaner").removeClass("inactive");
		$(".matches-main").addClass("inactive");
		$(".awardsHeader").removeClass("inactive");
		$(".statsContentTab").removeClass("active");
		$(".statsContentTab.awardsStats").addClass("active");
		$(".drop-down-filter").removeClass("inactive");
		$(".drop-down-filter .statsFilter").addClass("inactive");
		//$(".drop-down-filter .teamFilter").addClass("inactive");
		$(".drop-down-filter .teamFilter").removeClass("inactive");
		$(".drop-down-filter .inputSearch").removeClass("inactive");
		$(".drop-down-filter .playerCountryFilter").addClass("inactive");
		$(".cSBList").removeClass("active");
		
	//	$(".filterTeamsList").parents(".filters").hide();
		$(".filterSeasonList").addClass("inactive");
		$(".filterSeasonList[data-val='60']").removeClass("inactive");
		$(".filterSeasonList[data-val='70']").removeClass("inactive");
		$(".filterSeasonList[data-val='10013']").removeClass("inactive");
		$(".filterSeasonList[data-val='10012']").removeClass("inactive");
		$(".filterSeasonList[data-val='10011']").removeClass("inactive");
		$(".filterSeasonList[data-val='10010']").removeClass("inactive");
		$(".filterSeasonList[data-val='10009']").removeClass("inactive");
		for(var s=2008;s<=2016;s++){
			$(".seasonFilterItems[data-val='"+s+"']").addClass("inactive");
		}
		 uniqueStatsTeamsList = [];	
		 uniqueStatsTeamsCodes = [];
		 uniqueStatsTeamsIamges = [];
		 $scope.statsfilterTeamCode = "All Teams";

		$("#mvpTAB").show();
			$(".mvpButton").addClass("active");
			$(".fairplayBtn").removeClass("active");
			if($scope.displayStatsSeasonName == '2022')
				$(".showAwars").text("Most Valuable Player");
			else
				$(".showAwars").text("Most Valuable Player");
		mvpStatsList = [];
		mcService.GetMVPPlayers($scope.displayStatsSeasonName,function(data){
			$scope.mvpStatsList = (data.mvp != undefined) ? data.mvp : [];
			if($scope.mvpStatsList != undefined && $scope.mvpStatsList.length > 0){
				var idx = 1;
				$scope.mvpStatsList.map(function(item){
					item.pos = idx;
					idx = idx + 1;
					var playerName = item.Player;
					playerName = playerName.split('(');
					var teamcode = playerName[1].trim();
					teamcode = teamcode.replace(")", "");
					teamcode = teamcode.trim();
					if(teamcode == 'SR') teamcode = 'SRH';
					playerName = playerName[0].trim();
					item.playerName = playerName;
					item.TeamCode = teamcode;
					if(item.RunOut != undefined){
						var runout = item.RunOut;
						runout = parseFloat(runout);
						item.RunOut = runout.toFixed(1);
					}
					
					 if(jQuery.inArray(item.TeamName, uniqueStatsTeamsList ) == '-1'){
					 			uniqueStatsTeamsList.push(item.TeamName);
					 			uniqueStatsTeamsCodes.push(item.TeamCode);
					 }
					 
					
					

				});
				 $scope.uniqueStatsTeamsList = uniqueStatsTeamsList;
				 $scope.uniqueStatsTeamsCodes = uniqueStatsTeamsCodes;
				
				
				
				if (!$scope.$$phase) {
					$scope.$apply();
				}
			}
			mvpStatsList = $scope.mvpStatsList;
			console.log($scope.mvpStatsList);
			//$scope.selbattingStatsList.col1 = "Upstox Most Valuable Player";
			$("#mvpTAB").show();
			$(".mvpButton").addClass("active");
			$(".fairplayBtn").removeClass("active");
			if($scope.displayStatsSeasonName == '2022')
				$(".showAwars").text("Most Valuable Player");
			else
				$(".showAwars").text("Most Valuable Player");
			
			// if($scope.statsfilterTeamName != undefined && $scope.statsfilterTeamName != '')
			// 		$scope.statsfilterByTeam($scope.statsfilterTeamName);
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}
		  	
		});
	}
	
	$scope.showFairPlayList = function(){
		$("#battingTAB").hide();
		$("#bowlingTAB").hide();
		$("#mvpTAB").hide();
		$("#fairplayTAB").show();
		$(".fairplayBtn").addClass("active");
		$(".mvpButton").removeClass("active");
		$(".battingTopper").addClass("inactive");
		$(".bowlingTopper").addClass("inactive");

		$(".awa-container").addClass("inactive");
		$(".np-battingtable_contaner").removeClass("inactive");
		$(".matches-main").addClass("inactive");
		$(".awardsHeader").removeClass("inactive");
		$(".statsContentTab").removeClass("active");
		$(".statsContentTab.awardsStats").addClass("active");
		$(".drop-down-filter").removeClass("inactive");
		$(".drop-down-filter .statsFilter").addClass("inactive");
		$(".drop-down-filter .teamFilter").addClass("inactive");
		$(".drop-down-filter .inputSearch").addClass("inactive");
		$(".drop-down-filter .playerCountryFilter").addClass("inactive");
		$(".cSBList").removeClass("active");

		$scope.fairPlayList = "";
		$scope.showAwars = true;
		$scope.selectedAwards = 'FAIRPLAY';
		$(".atl-mobile").removeClass("atl-mobile-t");
		$(".filterTeamsList").parents(".filters").hide();
		$(".filterSeasonList").addClass("inactive");
		$(".filterSeasonList[data-val='60']").removeClass("inactive");
		$(".filterSeasonList[data-val='70']").removeClass("inactive");
		$(".filterSeasonList[data-val='10013']").removeClass("inactive");
		$(".filterSeasonList[data-val='10012']").removeClass("inactive");
		$(".filterSeasonList[data-val='10011']").removeClass("inactive");
		$(".filterSeasonList[data-val='10010']").removeClass("inactive");
		$(".filterSeasonList[data-val='10009']").removeClass("inactive");
		for(var s=2008;s<=2016;s++){
			$(".seasonFilterItems[data-val='"+s+"']").addClass("inactive");
		}
		
		mcService.GetFairPlayList($scope.displayStatsSeasonName,function(data){			
			$scope.fairPlayList = (data.fairplayTotal != undefined) ? data.fairplayTotal : [];
			if($scope.fairPlayList != undefined && $scope.fairPlayList.length > 0){
				var idx = 1;
				$scope.fairPlayList.map(function(item){
					item.pos = idx;
					idx = idx + 1;
					item.TeamCode = item.TeamName;
					if(item.TeamCode == 'RR')
						item.TeamFullName = "Rajasthan Royals";
					if(item.TeamCode == 'CSK')
						item.TeamFullName = "Chennai Super Kings";
					if(item.TeamCode == 'SRH')
						item.TeamFullName = "Sunrisers Hyderabad";
					if(item.TeamCode == 'DC')
						item.TeamFullName = "Delhi Capitals";
					if(item.TeamCode == 'PBKS')
						item.TeamFullName = "Punjab Kings";
					if(item.TeamCode == 'KKR')
						item.TeamFullName = "Kolkata Knight Riders";
					if(item.TeamCode == 'MI')
						item.TeamFullName = "Mumbai Indians";
					if(item.TeamCode == 'RCB')
						item.TeamFullName = "Royal Challengers Bengaluru";
					if(item.TeamCode == 'LSG')
						item.TeamFullName = "Lucknow Super Giants";
					if(item.TeamCode == 'GT')
						item.TeamFullName = "Gujarat Titans";
					if(item.TeamCode == 'KXIP' || item.TeamCode == 'KXI')
						item.TeamFullName = "Kings XI Punjab";
					if(item.TeamCode == 'DD')
						item.TeamFullName = "Delhi Daredevils";
					if(item.TeamCode == 'GL')
						item.TeamFullName = "Gujarat Lions";
					if(item.TeamCode == 'SG' || item.TeamCode == 'RPS')
						item.TeamFullName = "Rising Pune Supergiant";
					
				});
			}
			console.log($scope.fairPlayList);
			//$scope.selbattingStatsList.col1 = "Paytm Fairplay";
			if($scope.displayStatsSeasonName == '2022')
				$(".showAwars").text("Fairplay");
			else
				$(".showAwars").text("Fairplay");
			$("#fairplayTAB").show();
			$(".fairplayBtn").addClass("active");
			$(".mvpButton").removeClass("active");
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}
			
			
		  	
		});
	}
	
	$scope.showSeasonStats = function(){
		if($(".mvpButton").hasClass("active")){
			$(".filterTeamsList").removeClass("active");
			$(".filterTeamsList[data-val='All Teams']").addClass("active");
		}
		if($scope.lastdisplayStatsSeasonName != undefined)
			$scope.displayStatsSeasonName = $scope.lastdisplayStatsSeasonName;
		else{
			$scope.displayStatsSeasonName = $scope.curSeasonName;
			if($scope.selectedCompetition.statsCID != undefined && $scope.selectedCompetition.statsCID != ''){
					statsCID = $scope.selectedCompetition.statsCID;
					competitionId = $scope.selectedCompetition.statsCID;
			}
		}

			
		$("#battingTAB").show();
		$("#bowlingTAB").hide();
		$(".battingTopper").removeClass("inactive");
		$(".bowlingTopper").addClass("inactive");
		$(".battingT").show();
		$(".bowlingT").hide();
		$(".statsFilterIcon").show();
		$(".seasonStatsTitle").show();
		$(".statsContentTab").removeClass("firstbtn");
		$(".statsContentTab.allTimeStats").addClass("firstbtn");
		
		$("#htab .recordtab__btn").removeClass("active bg-red");
		$("#htab .recordtab__btn.batting").addClass("active bg-red");

		$(".matches-main").addClass("inactive");
		$(".statsContentTab").removeClass("active");
		$(".statsContentTab.seasonStats").addClass("active");
		$(".drop-down-filter").removeClass("inactive");
		$(".drop-down-filter .statsFilter").removeClass("inactive");
		$(".drop-down-filter .teamFilter").removeClass("inactive");
		$(".drop-down-filter .inputSearch").removeClass("inactive");
		$(".drop-down-filter .playerCountryFilter").removeClass("inactive");
		$(".awa-container").addClass("inactive");
		$(".np-battingtable_contaner").removeClass("inactive");
		$('.awardFilter').addClass('inactive');
		$(".seasonFilterItems").removeClass("inactive");
		$scope.statsTypeFilterChange('batters');
		$scope.tstatsBatting();
		
		$("#alltimeRecords").hide();
	}
	$scope.showAwards = function(){
		$(".awa-container").removeClass("inactive");
		$(".np-battingtable_contaner").addClass("inactive");
		$(".matches-main").addClass("inactive");
		$(".awardsHeader").removeClass("inactive");
		$(".statsContentTab").removeClass("active");
		$(".statsContentTab.awardsStats").addClass("active");
		$(".drop-down-filter").addClass("inactive");
		$(".battingTopper").addClass("inactive");
		$(".bowlingTopper").addClass("inactive");
		$("#alltimeRecords").hide();
		$('.awardFilter').removeClass('inactive');
		$(".drop-down-filter .inputSearch").removeClass("inactive");
		$(".drop-down-filter .playerCountryFilter").addClass("inactive");
		if($scope.lastdisplayStatsSeasonName != undefined)
			$scope.displayStatsSeasonName = $scope.lastdisplayStatsSeasonName;
		else
			$scope.displayStatsSeasonName = $scope.curSeasonName;
	}
	$scope.showAllTimeStats = function(){
		if($(".mvpButton").hasClass("active")){
			$(".filterTeamsList").removeClass("active");
			$(".filterTeamsList[data-val='All Teams']").addClass("active");
		}
		if($scope.displayStatsSeasonName != 'All Time')
			$scope.lastdisplayStatsSeasonName = $scope.displayStatsSeasonName;
		$scope.displayStatsSeasonName = "All Time";
		$(".statsTypeFilter .cSBListItems").removeClass("selected");
		$("#battingTAB").hide();
		$("#bowlingTAB").hide();
		$(".battingTopper").addClass("inactive");
		$(".bowlingTopper").addClass("inactive");
		$(".battingT").show();
		$(".bowlingT").hide();
		$(".seasonStatsTitle").hide();
		$(".battingT .np-list").removeClass("active");
		$("#alltimeRecords").show();
		$(".statsContentTab").removeClass("firstbtn");
		$(".statsContentTab.seasonStats").addClass("firstbtn");
		$("#htab .recordtab__btn").removeClass("active bg-red");
		$("#htab .recordtab__btn.batting").addClass("active bg-red");
		$(".statsFilterIcon").hide();
		$('.awardFilter').addClass('inactive');
		
		$("#mvpTAB").hide();		
		$("#fairplayTAB").hide();
		$(".fairplayBtn").removeClass("active");
		$(".mvpButton").removeClass("active");
		$(".matches-main").addClass("inactive");
		$(".recordsHeader").removeClass("inactive");
		$(".statsContentTab").removeClass("active");
		$(".statsContentTab.allTimeStats").addClass("active");
		$(".drop-down-filter").addClass("inactive");
		$(".awa-container").addClass("inactive");
		$(".np-battingtable_contaner").removeClass("inactive");
		mcService.GetAllTimeLeaders(function(data){
			console.log(data);
			var allTimeLeaders = (data.allTimeLeaders != undefined) ?  data.allTimeLeaders : [];
			var allTimeMostRuns = $filter('filter')(allTimeLeaders,{KPIType:"MostRuns"},true);
			$scope.allTimeMostRuns = (allTimeMostRuns != undefined && allTimeMostRuns[0] != undefined) ? allTimeMostRuns[0] : [];
			
			var allTimeMostFours = $filter('filter')(allTimeLeaders,{KPIType:"MostFours"},true);
			$scope.allTimeMostFours = (allTimeMostFours != undefined && allTimeMostFours[0] != undefined) ? allTimeMostFours[0] : [];
			
			var allTimeMostSixes = $filter('filter')(allTimeLeaders,{KPIType:"MostSixes"},true);
			$scope.allTimeMostSixes = (allTimeMostSixes != undefined && allTimeMostSixes[0] != undefined) ? allTimeMostSixes[0] : [];
			
			var allTimeHS= $filter('filter')(allTimeLeaders,{KPIType:"HighestScore"},true);
			$scope.allTimeHS = (allTimeHS != undefined && allTimeHS[0] != undefined) ? allTimeHS[0] : [];
			
			var allTimeSR = $filter('filter')(allTimeLeaders,{KPIType:"BestStrikeRate"},true);
			$scope.allTimeSR = (allTimeSR != undefined && allTimeSR[0] != undefined) ? allTimeSR[0] : [];
			
			var allTimeMostWkts = $filter('filter')(allTimeLeaders,{KPIType:"MostWickets"},true);
			$scope.allTimeMostWkts = (allTimeMostWkts != undefined && allTimeMostWkts[0] != undefined) ? allTimeMostWkts[0] : [];
			
			var allTimeBestBowling = $filter('filter')(allTimeLeaders,{KPIType:"BestBowling"},true);
			$scope.allTimeBestBowling = (allTimeBestBowling != undefined && allTimeBestBowling[0] != undefined) ? allTimeBestBowling[0] : [];
			
			var allTimeBestBowlingAvg = $filter('filter')(allTimeLeaders,{KPIType:"BestBowlingAvg"},true);
			$scope.allTimeBestBowlingAvg = (allTimeBestBowlingAvg != undefined && allTimeBestBowlingAvg[0] != undefined) ? allTimeBestBowlingAvg[0] : [];
			
			var allTimeBestBowlingEcon = $filter('filter')(allTimeLeaders,{KPIType:"BestEconomy"},true);
			$scope.allTimeBestBowlingEcon = (allTimeBestBowlingEcon != undefined && allTimeBestBowlingEcon[0] != undefined) ? allTimeBestBowlingEcon[0] : [];
			
			var allTimeMostDots = $filter('filter')(allTimeLeaders,{KPIType:"MostDots"},true);
			$scope.allTimeMostDots = (allTimeMostDots != undefined && allTimeMostDots[0] != undefined) ? allTimeMostDots[0] : [];
			
			var allTimeFF = $filter('filter')(allTimeLeaders,{KPIType:"Fastest50"},true);
			$scope.allTimeFF = (allTimeFF != undefined && allTimeFF[0] != undefined) ? allTimeFF[0] : [];
			
			var allTimeFC = $filter('filter')(allTimeLeaders,{KPIType:"Fastest100"},true);
			$scope.allTimeFC = (allTimeFC != undefined && allTimeFC[0] != undefined) ? allTimeFC[0] : [];
			
			if (!$scope.$$phase) {
				$scope.$apply();
		  	}
		  	
		});
	}

     $scope.showTeamDetStats = function(contentId){
    	$(".mcTabs.teamTab li").removeClass("current");
    	$(".mcTabs.teamTab li[data-tab='"+contentId+"']").addClass("current");
    	$(".tabTeamContent").removeClass("current");
    	$("#"+contentId).addClass("current");
    	setTimeout(function(){
	        $(".nicescroll_content").getNiceScroll().resize();
    	},500);
    }

    $scope.checkVideoclickables = function(key){
         if(jQuery.inArray( key, videoClickables ) == -1)
            return false;
          else
            return true;
    }

    /********* Video Player New UI Updates **********/
    $scope.playNextVideo = function(){
        var nextBallId = $(".mejs-list li.current").next().attr("id");
        $scope.playIndvBall(nextBallId);
    }
    $scope.playPrevVideo = function(){
        var prevBallId = $(".mejs-list li.current").prev().attr("id");
        $scope.playIndvBall(prevBallId);
    }

    $scope.mcVideoOverlayTeamChange = function(obj,viewinnNo){
        if(viewinnNo != 3 && viewinnNo != 4)
        {
        	$(".mcDetails .mcInnTabsItems").removeClass("active");
        	 $scope.currentTeamView = '';
	        $scope.currentTeamInn1ID = '';
	        $scope.currentTeamInn2ID = '';
        }
       
        if(viewinnNo == 1){
            $scope.currentTeamView = obj.FirstBattingTeam;
            if(obj.CurrentInnings > 2 && $scope.superOverSummary == '')
            {
                $scope.currentTeamInn1ID = 1;
                if(obj.FirstBattingTeamID == obj.SecondInningsFirstBattingID)
                    $scope.currentTeamInn2ID = 3;
                if(obj.FirstBattingTeamID == obj.SecondInningsSecondBattingID)
                    $scope.currentTeamInn2ID = 4;
            }
            if($scope.superOverSummary != '')
            {
                $scope.currentTeamInn1ID = 1;
                if(obj.FirstBattingTeamID == $scope.superOverSummary.FirstBattingTeamID)
                    $scope.currentTeamInn2ID = 3;
                if(obj.FirstBattingTeamID == $scope.superOverSummary.SecondBattingTeamID)
                    $scope.currentTeamInn2ID = 4;
            }
        }
        if(viewinnNo == 2){
            $scope.currentTeamView = obj.SecondBattingTeam;
            if(obj.CurrentInnings > 2  && $scope.superOverSummary == '')
            {
                $scope.currentTeamInn1ID = 2;
                if(obj.SecondBattingTeamID == obj.SecondInningsFirstBattingID)
                    $scope.currentTeamInn2ID = 3;
                if(obj.SecondBattingTeamID == obj.SecondInningsSecondBattingID)
                    $scope.currentTeamInn2ID = 4;
            }
            if($scope.superOverSummary != '')
            {
                $scope.currentTeamInn1ID = 2;
                if(obj.SecondBattingTeamID == $scope.superOverSummary.FirstBattingTeamID)
                    $scope.currentTeamInn2ID = 3;
                if(obj.SecondBattingTeamID == $scope.superOverSummary.SecondBattingTeamID)
                    $scope.currentTeamInn2ID = 4;
            }
        }
        $scope.mcOverlayScorecard = true;   
        
        $scope.constructScoreCard(obj.MatchID,viewinnNo,'innchange');
    }

    $scope.closeMCOverlay = function(){
        $("body").css({"overflow":"auto",'position':'static'});
        $scope.mcOverlayScorecard = false;
        $scope.constructScoreCard($scope.matchId,$scope.scorecardcurrentInnViewNo,'innchange');
        $(".pageloader").removeClass('active');
        $("#matchCenter").removeClass("mobLandscapemode");
    }

    $scope.$on('storiesdata', function(e,data) {  
     	$scope.checkMatchSpecficData();
    });

    $scope.checkMatchSpecficData = function(){
    	$scope.$broadcast ('getMatchSpecificNews',3);
		$scope.$broadcast ('getMatchSpecificNews',2);
		$scope.$broadcast ('getMatchSpecificNews',1);
    }

    /******** Scorecard Print ********/
	$scope.printScoreCard=function(matchId,curInn){
		$scope.printScoreData = [];
		printScoreData=[];
		NotBatList=[];
		var innCnt=curInn.charAt(curInn.length-1);
		var notbatPlayerList='';
		var matchsummaryPrint=[];
		mcService.getScoreCardData(innCnt,matchId).then(
            function(finalData){
            	j=1;
            	for(var i=0;i<finalData.length;i++){
            		var battingCard = (finalData[i]['Innings'+j]['BattingCard'] != undefined) ? finalData[i]['Innings'+j]['BattingCard'] : [];
					for(var k=0;k<battingCard.length;k++){
						var playerName = (battingCard[k].PlayerName != undefined) ? titleCase(battingCard[k].PlayerName) : "";
						battingCard[k].PlayerName = playerName;
						var OutDesc = (battingCard[k].OutDesc != undefined) ? outDescTitleCase(battingCard[k].OutDesc) : "";
						battingCard[k].OutDesc = OutDesc;
					}
					finalData[i]['Innings'+j]['BattingCard'] = battingCard;
					var bowlingCard = (finalData[i]['Innings'+j]['BowlingCard'] != undefined) ? finalData[i]['Innings'+j]['BowlingCard'] : [];
					for(var k=0;k<bowlingCard.length;k++){
						var playerName = (bowlingCard[k].PlayerName != undefined) ? titleCase(bowlingCard[k].PlayerName) : "";
						bowlingCard[k].PlayerName = playerName;
					}
					finalData[i]['Innings'+j]['BowlingCard'] = bowlingCard;
					var fow = (finalData[i]['Innings'+j]['FallOfWickets'] != undefined) ? finalData[i]['Innings'+j]['FallOfWickets'] : [];
					for(var k=0;k<fow.length;k++){
						var playerName = (fow[k].PlayerName != undefined) ? titleCase(fow[k].PlayerName) : "";
						fow[k].PlayerName = playerName;
					}
					finalData[i]['Innings'+j]['FallOfWickets'] = fow;
            		printScoreData.push(finalData[i]['Innings'+j]);
            		notbatPlayerList=$filter('filter')(finalData[i]['BattingCard'],{OutDesc:''},true);
            		if(notbatPlayerList!=undefined)
            		{
            			NotBatList.push(notbatPlayerList);
            		}
            		else 
            			NotBatList.push([]);
            		j++;
            	}
            	$scope.printScoreData=printScoreData;
				console.log($scope.printScoreData);
            	$scope.NotBatList=NotBatList;
            	if (!$scope.$$phase) {
			        $scope.$apply();
			    }
			    $(".printIcon").addClass("active");
            }
        ); 
        for(var m=1;m<=innCnt;m++){
        	var dataObj={};
        	if(m==1){
        		dataObj={'teamName':$scope.matchSummary.FirstBattingTeam,'summary':$scope.matchSummary['1Summary'],'RR':$scope.matchSummary['1RunRate']};
        	}
        	else if(m==2){
        		dataObj={'teamName':$scope.matchSummary.SecondBattingTeam,'summary':$scope.matchSummary['2Summary'],'RR':$scope.matchSummary['2RunRate']};
        	}
        	else if(m==3){
        		if($scope.superOverSummary!=''){
        			dataObj={'teamName':$scope.superOverSummary.FirstBattingTeam,'summary':$scope.superOverSummary['1Summary'],'RR':$scope.superOverSummary['1RunRate']};
        		}
        		else{
        			if($scope.matchSummary.ThirdBattingTeam != undefined)
        				var teamName3=$scope.matchSummary.ThirdBattingTeam;
        			else($scope.matchSummary.SecondInningsFirstBattingName != undefined)
        				var teamName3=$scope.matchSummary.SecondInningsFirstBattingName;
        			dataObj={'teamName':teamName3,'summary':$scope.matchSummary['3Summary'],'RR':$scope.matchSummary['3RunRate']};
        		}
        	}
        	else if(m==4){
        		if($scope.superOverSummary!=''){
        			dataObj={'teamName':$scope.superOverSummary.SecondBattingTeam,'summary':$scope.superOverSummary['2Summary'],'RR':$scope.superOverSummary['2RunRate']};
        		}
        		else{
        			if($scope.matchSummary.FouthBattingTeam != undefined)
        				var teamName4=$scope.matchSummary.FouthBattingTeam;
        			else($scope.matchSummary.SecondInningsSecondBattingName != undefined != undefined)
        				var teamName4=$scope.matchSummary.SecondInningsSecondBattingName;
        			dataObj={'teamName':teamName4,'summary':$scope.matchSummary['4Summary'],'RR':$scope.matchSummary['4RunRate']};
        		}
        	}
        	matchsummaryPrint.push(dataObj);
        	$scope.matchsummaryPrint=matchsummaryPrint;
        	if (!$scope.$$phase) {
			    $scope.$apply();
			}
        }
       
	}

	$scope.checkMatchResult = function(obj){
		if(obj.MatchStatus == "Post" && obj['1FallScore'] == "")
			return false;

		else
			return true;
	}

	$scope.checkMatchEnd = function(matId){
		return false;
		if(matId != undefined && matId != ""){
			var matchDet = $filter('filter')(matchscheduleData,{MatchID:matId},true);
			if(matchscheduleData != undefined && matchscheduleData.length > 0){
				matchscheduleData.map(function(item){
					if(item.MatchID == matId)
						matchDet[0] = item;
				});
			}
			if(matchDet != undefined && matchDet.length > 0 && matchDet[0].MatchStatus == "Post")
				return true;
			else
				return false;
		}
		else
			return false;
		
	}
	
	$scope.getMatchNumber = function(matId){
		var MatchNumber = '';
		
		if(matId != undefined && matId != ""){
			var matchDet = $filter('filter')(matchscheduleData,{MatchID:matId},true);
			if(matchscheduleData != undefined && matchscheduleData.length > 0){
				matchscheduleData.map(function(item){
					if(item.MatchID == matId){
						
						if(item.MatchOrder == 'Qualifier 1' || item.MatchOrder == 'Qualifier 2' || item.MatchOrder == 'Eliminator' || item.MatchOrder == 'Final')
							MatchNumber = item.MatchOrder;
						else
							MatchNumber = "Match "+item.MatchRow;
					}
				});
			}
			
		}
		
		return MatchNumber;
		
	}

	$scope.getPostMatchCommentary = function(matId){
		$scope.postMatchCommentary = "";
		if(matId != undefined && matId != ""){
			var matchDet = $filter('filter')(matchscheduleData,{MatchID:matId},true);
			if(matchscheduleData != undefined && matchscheduleData.length > 0){
				matchscheduleData.map(function(item){
					if(item.MatchID == matId)
						matchDet[0] = item;
				});
			}
			if(matchDet != undefined && matchDet.length > 0){
				$scope.postMatchCommentary = (matchDet[0].PostMatchCommentary != undefined) ? matchDet[0].PostMatchCommentary : "";
			}	
		}
	}

	$scope.getPreMatchCommentary = function(matId){
		$scope.preMatchCommentary = "";
		if(matId != undefined && matId != ""){
			var matchDet = $filter('filter')(matchscheduleData,{MatchID:matId},true);
			if(matchscheduleData != undefined && matchscheduleData.length > 0){
				matchscheduleData.map(function(item){
					if(item.MatchID == matId)
						matchDet[0] = item;
				});
			}
			if(matchDet != undefined && matchDet.length > 0){
				$scope.preMatchCommentary = (matchDet[0].PreMatchCommentary != undefined) ? matchDet[0].PreMatchCommentary : "";
			}		
		}
	}

	$scope.checkMatchLive = function(matId){
		$scope.IsMatchLive = true;
		return true;
		if(matId != undefined && matId != ""){
			var matchDet = [];//$filter('filter')($scope.liveList,{MatchID:matId},true);
			if($scope.liveList != undefined && $scope.liveList.length > 0){
				$scope.liveList.map(function(item){
					if(item.MatchID == matId)
						matchDet[0] = item;
				});
			}
			if(matchDet != undefined && matchDet.length > 0){
				$scope.IsMatchLive = true;
				return true;
			}
			else{
				$scope.IsMatchLive = false;
				
				return false;
			}
		}
		else
		{
			$scope.IsMatchLive = false;
			return false;
		}
		
		
	}

	$scope.getcurMatchDetFromSchdule = function(matId){
		if(matId != undefined && matId != ""){
			var matchDet = $filter('filter')(matchscheduleData,{MatchID:matId},true);
			if(matchDet != undefined && matchDet.length > 0 && matchDet[0].MatchStatus == "Post") 
				$scope.curMatchDetFromSchdule = matchDet[0];
			else
				$scope.curMatchDetFromSchdule = [];
		}
	}

	$scope.getMatches = function(callFrom){
		var fixtures = [];
		var resultMatches = [];
		var liveMatches = [];
		var fixtureMatches = [];
		var liveResMatches = [];
		var matchIndex = 0;
		var initScheduleCall = false;
		var liveCompTimeZones = [];
		clearInterval(liveInterval);
		if(cloudFirestore)
			firebaseSRef();

		if(selDivCompetition.length > 0)
		{
			var listenMatches = setInterval(function(){
				if(matchIndex <= selDivCompetition.length - 1 && !initScheduleCall)
				{
					competitionObj = selDivCompetition[matchIndex];
					initScheduleCall = true;
					var compTimeZone = (competitionObj.timezone != undefined) ? competitionObj.timezone : 'Asia/Kolkata';
					if(jQuery.inArray(compTimeZone, liveCompTimeZones ) == '-1' )
						liveCompTimeZones.push(compTimeZone);
					mcService.getMatches(competitionObj,function(data){
						var matches = [];
						if(competitionObj.CodingType == "T20Pro")
							matches = (data.Result != undefined) ? data.Result : [];
						if(competitionObj.CodingType == "T20Lite")
							matches = (data.Matchsummary != undefined) ? data.Matchsummary : [];
						matchIndex = matchIndex + 1;
						initScheduleCall = false;	
						
						if(matches.length > 0)
						{
							var liveData = $filter("filter")(matches,{MatchStatus:"Live"});
							var fixtureData = $filter("filter")(matches,{MatchStatus:"Upcoming"});
							if(liveData.length > 0)
							{
								liveData.map(function(item){
									item.CompetitionName = competitionObj.CompetitionName;
									item.CompetitionType = competitionObj.CompetitionType;
									item.IsMatchEnd = 0;
									item.DivisionID = competitionObj.DivisionID;
									item.activeLiveRes = $scope.activeLiveRes;
									item.matchType = "Live";
									if(item.CurrentInnings == 1)
									{
										item.curTeamBatLogo = item.FirstBattingTeamLogo;
										item.curTeamBowLogo = item.SecondBattingTeamLogo;
									}
									if(item.CurrentInnings == 2)
									{
										item.curTeamBatLogo = item.SecondBattingTeamLogo;
										item.curTeamBowLogo = item.FirstBattingTeamLogo;
									}
									if(item.CurrentInnings == 3 && (item.SecondInningsFirstBattingID == item.FirstBattingTeamID))
									{
										item.curTeamBatLogo = item.FirstBattingTeamLogo;
										item.curTeamBowLogo = item.SecondBattingTeamLogo;
									}
									if(item.CurrentInnings == 3 && (item.SecondInningsSecondBattingID == item.FirstBattingTeamID))
									{
										item.curTeamBatLogo = item.SecondBattingTeamLogo;
										item.curTeamBowLogo = item.FirstBattingTeamLogo;
									}

									if(item.CurrentInnings == 3 && (item.SecondInningsFirstBattingID == item.SecondBattingTeamID))
									{
										item.curTeamBatLogo = item.SecondBattingTeamLogo;
										item.curTeamBowLogo = item.FirstBattingTeamLogo;
									}

									if(item.CurrentInnings == 4 && (item.SecondInningsFirstBattingID == item.SecondBattingTeamID))
									{
										item.curTeamBatLogo = item.FirstBattingTeamLogo;
										item.curTeamBowLogo = item.SecondBattingTeamLogo;
									}
									if(item.CurrentInnings == 4 && (item.SecondInningsSecondBattingID == item.SecondBattingTeamID))
									{
										item.curTeamBatLogo = item.SecondBattingTeamLogo;
										item.curTeamBowLogo = item.FirstBattingTeamLogo;
									}

									if(item.CurrentInnings == 4 && (item.SecondInningsSecondBattingID == item.FirstBattingTeamID))
									{
										item.curTeamBatLogo = item.FirstBattingTeamLogo;
										item.curTeamBowLogo = item.SecondBattingTeamLogo;
									}
										
									liveMatches.push(item);
								});
							}
							if(fixtureData.length > 0)
							{
								fixtureData.map(function(item){
									item.CompetitionName = competitionObj.CompetitionName;
									item.CompetitionType = competitionObj.CompetitionType;
									item.IsMatchEnd = 0;
									item.DivisionID = competitionObj.DivisionID;
									item.activeLiveRes = $scope.activeLiveRes;
									item.matchType = "Live";
									if(item.timezone == undefined || item.timezone == '')
										item.timezone = (competitionObj.timezone != undefined) ? competitionObj.timezone : 'Asia/Kolkata';
										
									fixtureMatches.push(item);
								});
							}
						}

					});
				}
				
				if(matchIndex > selDivCompetition.length - 1){
					clearInterval(listenMatches);

						$scope.AllliveMatchBind = function(callFrom){
							if(liveMatches.length == 0)  $scope.bindResult(competitionId,urlString);
							else
								{
									$scope.fixtureList=[];
									$scope.resultList=[];
									$scope.liveList=liveMatches;
									if(callFrom != "refresh"){
										$scope.liveTabLink=true;
										$scope.liveTab = true;
										$scope.resultTab = false;
										$scope.fixtureTab=false;
										$scope.showFixture = true;
										$scope.showtourstats = false;
										$scope.showplayerstats = false;
										$scope.showteamstats = false;
										$scope.showAllStats = false;
										console.log($scope.showFixture);
										setTimeout(function(){
											$(".nicescroll_content").getNiceScroll().hide();
								            $(".nicescroll_content").getNiceScroll().resize();
								            $(".nicescroll_content").getNiceScroll().show();
										},500);
										$scope.callFromTemplate = 'alllivematches';
										if($scope.showDivision)
											$scope.showCompetitionList = false;
										if (!$scope.$$phase) {
			                          	   $scope.$apply();
			                        	}
									}
									
									if(callFrom == "init" || callFrom== "filter" || callFrom == "divfilter" || callFrom == "compfilter"){
										if(callFrom != "divfilter" && callFrom != "compfilter"){
											//Add All Option in Division List
											var divObj = {};
											divObj.DivisionID = "alllivematches";
											divObj.DivisionName = "All Live Matches";
											divObj.SeasonID = selDivCompetition[0].SeasonID;
											$scope.divisionList.push(divObj);
											var len = $scope.divisionList.length - 1;
											$scope.selectedDivision = ($scope.divisionList[len] != undefined) ? $scope.divisionList[len] : [];								
											setTimeout(function(){
												var len = $scope.divisionList.length - 1;
												$scope.selectedDivision = ($scope.divisionList[len] != undefined) ? $scope.divisionList[len] : [];
												if (!$scope.$$phase) {
					                          	   $scope.$apply();
					                        	}
											},1000);
										}
										
										if(callFrom != "compfilter"){
											var compObj = {};
											compObj.DivisionID = "alllivematches";
											compObj.DivisionName = "All Live Matches";
											compObj.CompetitionID = "alllivematches";
											compObj.CompetitionName = "All Live Matches";
											compObj.SeasonID = selDivCompetition[0].SeasonID;
											$scope.selectedComList.push(compObj);
											var len = $scope.selectedComList.length - 1;
											$scope.selectedCompetition = ($scope.selectedComList[len] != undefined) ? $scope.selectedComList[len] : [];

											clearInterval(listenAllLiveMatRefersh);
											 listenAllLiveMatRefersh = setInterval(function(){
												 $scope.getMatches('refresh');
											 },10000);
										}
										

										if (!$scope.$$phase) {
			                          	   $scope.$apply();
			                        	}
									}
									

									if (!$scope.$$phase) {
			                             $scope.$apply();
			                        }
			                        $(".pageloader").removeClass("active").removeClass("loadingPage");

								}
						}

						if(showLiveMatchBasedOnZoneTime && callFrom != "refresh"){
							var tzIndex = 0;
							var initTZCall = false;
							if(liveCompTimeZones.length > 0)
							{
								var listenTZ = setInterval(function(){
									if(tzIndex <= liveCompTimeZones.length - 1 && !initTZCall && (liveCompTimeZones[tzIndex] != undefined) )
									{
										initTZCall = true;
										// var url = "http://52.74.184.76/wicbCRUD/timeapi/getCurrentTimefromzone";
										var url = "https://sportsmechanics.in/timeapi.php";

										var timezone = liveCompTimeZones[tzIndex];
										var d = new Date();
										var timeZoneOffset = d.getTimezoneOffset();
										var jan = new Date(d.getFullYear(), 0, 1);
									    var jul = new Date(d.getFullYear(), 6, 1);
									    var maxVal = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
									    var daylight = 0;
									    if(timeZoneOffset < maxVal)
									    	daylight = 1;
										 $.ajax({
								            crossDomain: true,
								            type: "POST",
								            // contentType: "application/json; charset=utf-8",
								            // async: true,
								            url: url,
								            data : {
									          timezone : timezone,
									          timeZoneOffset : timeZoneOffset,
									          daylight : daylight
									        },
								            dataType: "json",
								            success: function (data) {
								            	var zoneTime = (data.cuurenttime != undefined) ? data.cuurenttime : ''; 
								            	var zoneAbrv = (data.timezoneABBRV != undefined) ? data.timezoneABBRV : ''; 
								            	
								            	if(zoneTime != ''){
								            		zoneTime = new Date(zoneTime).getTime() / 1000;
								            		var currentZoneTime =  (data.currentTimezoneTime != undefined) ? data.currentTimezoneTime : ''; 
								            		currentZoneTime = new Date(currentZoneTime).getTime() / 1000;
								            		
													var zoneTimeData = {};
													zoneTimeData.zoneTime = zoneTime;
													zoneTimeData.currentZoneTime = currentZoneTime;
													liveCompTimeZoneData[timezone] = zoneTimeData;
												}

												initTZCall = false;
												tzIndex = tzIndex+1;
								            },
								            error:function(){
								            	
								            }
								        });

									}
									if(tzIndex > liveCompTimeZones.length - 1){
										clearInterval(listenTZ);
										if(fixtureMatches != undefined && fixtureMatches.length > 0)
										{
											var matchLiveFromFixtures = [];
											fixtureMatches.map(function(item){
												var timezone = item.timezone;
												var zoneTime = (liveCompTimeZoneData[timezone] != undefined) ? liveCompTimeZoneData[timezone].zoneTime : "";
												var currentZoneTime = (liveCompTimeZoneData[timezone] != undefined) ? liveCompTimeZoneData[timezone].currentZoneTime : "";
												
												if(zoneTime != "")
												{
													var currentZoneMatchTime = zoneTime - currentZoneTime;
													var matchDateTime =  item.MatchDate+" "+item.MatchTime;
													var d = new Date(matchDateTime).getTime() / 1000;
													
													if(currentZoneMatchTime == 0)
														currentZoneMatchTime = d;
													else if(Math.sign(currentZoneMatchTime) == 1)
														currentZoneMatchTime = d - currentZoneMatchTime;
													else if(Math.sign(currentZoneMatchTime) == -1)
														currentZoneMatchTime = d - currentZoneMatchTime;
													else
														currentZoneMatchTime = d;
													if(currentZoneTime > currentZoneMatchTime && currentZoneTime <= (currentZoneMatchTime+28800)){
														item.matchType = "Live";
														item.MatchStatus = "Live";
														liveMatches.push(item);
													}
												}

											});
										}
										$scope.AllliveMatchBind(callFrom);
									}

								},100);	
							}		
						}
						else if(showLiveMatchBasedOnZoneTime && callFrom == "refresh"){
							if(fixtureMatches != undefined && fixtureMatches.length > 0)
							{
								var matchLiveFromFixtures = [];
								fixtureMatches.map(function(item){
									var timezone = item.timezone;
									var zoneTime = (liveCompTimeZoneData[timezone] != undefined) ? liveCompTimeZoneData[timezone].zoneTime : "";
									var currentZoneTime = (liveCompTimeZoneData[timezone] != undefined) ? liveCompTimeZoneData[timezone].currentZoneTime : "";
									
									if(zoneTime != "")
									{
										var currentZoneMatchTime = zoneTime - currentZoneTime;
										var matchDateTime = item.MatchDate+" "+item.MatchTime;
										var d = new Date(matchDateTime).getTime() / 1000;
										
										if(currentZoneMatchTime == 0)
											currentZoneMatchTime = d;
										else if(Math.sign(currentZoneMatchTime) == 1)
											currentZoneMatchTime = d - currentZoneMatchTime;
										else if(Math.sign(currentZoneMatchTime) == -1)
											currentZoneMatchTime = d - currentZoneMatchTime;
										else
											currentZoneMatchTime = d;

										if(currentZoneTime > currentZoneMatchTime && currentZoneTime <= (currentZoneMatchTime+28800)){
											item.matchType = "Live";
											item.MatchStatus = "Live";
											liveMatches.push(item);
										}
									}

								});
							}
							
							$scope.AllliveMatchBind(callFrom);
						}
						else{
							$scope.AllliveMatchBind(callFrom);
						}
							
							

						

					
				}
					
			},100);
		}
	}

	$scope.getDateTimeWithTimeZone = function(matchDate,matchTime){
		
		var matchDateTime = matchDate+" "+matchTime;
		return (dateTimeWithTimezone[matchDateTime] != undefined) ? dateTimeWithTimezone[matchDateTime] : "";
	}

	$scope.getDateWithTimeZone = function(matchDate){
		return (dateWithTimezone[matchDate] != undefined) ? dateWithTimezone[matchDate] : "";
	}

	$scope.getTimeWithTimeZone = function(matchDate,matchTime){
		var matchDateTime = matchDate+" "+matchTime;
		return (timeWithTimezone[matchDateTime] != undefined) ? timeWithTimezone[matchDateTime] : "";
	}

	$scope.GetKPIInfo = function(){
		var currentMatID = $scope.matchId;
		mcService.GetKPIInfo(currentMatID, function (data) {
			$scope.battingKPI = data.BattingKPIs;
			$scope.battingKeyNotes = data.BattingKeyNotes;
			$scope.BattingOverslab = data.BattingOverslab;
			$scope.BowlingKPIs = data.BowlingKPIs;
			$scope.BowlingKeyNotes = data.BowlingKeyNotes;
			$scope.BowlingOverslab = data.BowlingOverslab;
			$scope.ComfortLevelsInnings1 = data.ComfortLevelsInnings1;
			$scope.ComfortLevelsInnings2 = data.ComfortLevelsInnings2;
			$scope.DismissalSummaryinnings1 = data.DismissalSummaryinnings1;
			$scope.Individualbatting = data.Individualbatting;
			$scope.MatchSummary = data.MatchSummary;
			$scope.Variationsinnings1 = data.Variationsinnings1;
			$scope.Variationsinnings2 = data.Variationsinnings2;
			$scope.individualbowling = data.individualbowling;
			function propName(prop, value){
			   for(var i in prop) {
			       if (prop[i] == value){
			            return i;
			       }
			   }
			   return false;
			}
			if($scope.battingKPI.length > 0){	
				var batkpiTitle = ["Team Name", "Runs Scored", "Overs","Balls faced","Wickets Lost","Run Rate","Average Runs Per Wicket","Dot Balls","Dot Balls %","Boundary 4s","Boundary 6s","Boundary %","No of 30+ scores"];
				var batkpi = ["TeamName","Total","Overs","Ball","Wickets","RR","AverageRunsperWicket","DotBall","DBPercentage","Boundary4s","Boundary6s","BoundaryPer","30plus"];
				var battingKPITitleArr = [];
				batkpi.map(function(item,index){
					battingKPITitleArr[item]=batkpiTitle[index];
				});
				var prop = '';
				var finalData = [];
				var kpiFinal = [];
				
				for (var i=0; i < batkpi.length; i++){
					finalData[i] = [];
					for(var j=0 ; j < $scope.battingKPI.length; j++){
						prop =  propName($scope.battingKPI[j],$scope.battingKPI[j][batkpi[i]]);
						finalData[i].push($scope.battingKPI[j][prop]);
					}
				}
				finalData.map(function(item,index){
					kpiFinal[index] = [];
					kpiFinal[index]["title"] = batkpiTitle[index];
					kpiFinal[index]["data1"] = item[0];
					kpiFinal[index]["data2"] = item[1];
				});
				$scope.kpiFinal = kpiFinal;
				if (!$scope.$$phase) {
					$scope.$apply();
	  			} 
			}
			if($scope.battingKeyNotes.length > 0){	
				var batKeyNotesTitle = ["Team Name", "No of Boundaries", "Boundary Frequency","No of Dot Balls","Dot Balls Frequency","No of Dot Ball Strings (3 or more)","No of Scoring Ball Strings","No of 30+ Partnerships","9 and Above Runs Scored","6 and Below Runs Scored"];
				var batKeyNotes = ["TeamName","NoofBoundaries","BoundaryFrequency","DotBall","DotBallFrequency","DotBallcount","Ball","THIRTYPLUSPARTNERSHIP","ABOVE9RUNS","BELOW6RUNS"];
				var battingKeyTitleArr = [];
				batKeyNotes.map(function(item,index){
					battingKeyTitleArr[item]=batKeyNotesTitle[index];
				});
				var keyProp = '';
				var keyfinalData = [];
				var keyNotesFinal = [];
				for (var i=0; i < batKeyNotes.length; i++){
					keyfinalData[i] = [];
					for(var j=0 ; j < $scope.battingKeyNotes.length; j++){
						keyProp =  propName($scope.battingKeyNotes[j],$scope.battingKeyNotes[j][batKeyNotes[i]]);
						keyfinalData[i].push($scope.battingKeyNotes[j][keyProp]);
					}
				}
				keyfinalData.map(function(item,index){
					keyNotesFinal[index] = [];
					keyNotesFinal[index]["title"] = batKeyNotesTitle[index];
					keyNotesFinal[index]["data1"] = item[0];
					keyNotesFinal[index]["data2"] = item[1];
				});
				$scope.keyNotesFinal = keyNotesFinal;
				if (!$scope.$$phase) {
					$scope.$apply();
	  			} 
			}
			if($scope.BowlingKPIs.length > 0){	
				var bowkpiTitle = ["Team Name", "Runs Scored", "Overs","Balls Bowled","NoBalls","Wides","Byes","Leg Byes","Wickets","Economy","Strike Rate","Dot Balls","Dot Balls %","Boundary 4s Conceded","Boundary 6s Conceded","Boundary %","Maidens"];
				var bowkpi = ["TeamName","Total","Overs","Ball","NoBalls","Wides","Byes","LegByes","Wickets","Economy","StrikeRate","DotBall","DBPercentage","Boundary4s","Boundary6s","BoundaryPer","Maidens"];
				var bowlingKPITitleArr = [];
				bowkpi.map(function(item,index){
					bowlingKPITitleArr[item]=bowkpiTitle[index];
				});
				var bowKPIprop = '';
				var BowKPIfinalData = [];
				var BowkpiFinal = [];
				
				for (var i=0; i < bowkpi.length; i++){
					BowKPIfinalData[i] = [];
					for(var j=0 ; j < $scope.BowlingKPIs.length; j++){
						bowKPIprop =  propName($scope.BowlingKPIs[j],$scope.BowlingKPIs[j][bowkpi[i]]);
						BowKPIfinalData[i].push($scope.BowlingKPIs[j][bowKPIprop]);
					}
				}
				BowKPIfinalData.map(function(item,index){
					BowkpiFinal[index] = [];
					BowkpiFinal[index]["title"] = bowkpiTitle[index];
					BowkpiFinal[index]["data1"] = item[0];
					BowkpiFinal[index]["data2"] = item[1];
				});
				$scope.BowkpiFinal = BowkpiFinal;
				if (!$scope.$$phase) {
					$scope.$apply();
	  			} 
			}
			if($scope.BowlingKeyNotes.length > 0){	
				var bowKeyNotesTitle = ["Team Name", "No of Boundaries", "Boundary Frequency","No of Dot Balls","Dot Balls Frequency","No of Dot Ball Strings (3 or more)","No of Scoring Ball Strings","No of 30+ Partnerships","9 and Above Runs Scored","6 and Below Runs Scored"];
				var bowKeyNotes = ["TeamName","NoofBoundaries","BoundaryFrequency","DotBall","DotBallFrequency","DotBallcount","Runcount","THIRTYPLUSPARTNERSHIP","ABOVE9RUNS","BELOW6RUNS"];
				var bowlingKeyTitleArr = [];
				bowKeyNotes.map(function(item,index){
					bowlingKeyTitleArr[item]=bowKeyNotesTitle[index];
				});
				var BowkeyProp = '';
				var BowkeyfinalData = [];
				var BowkeyNotesFinal = [];
				for (var i=0; i < bowKeyNotes.length; i++){
					BowkeyfinalData[i] = [];
					for(var j=0 ; j < $scope.BowlingKeyNotes.length; j++){
						BowkeyProp =  propName($scope.BowlingKeyNotes[j],$scope.BowlingKeyNotes[j][bowKeyNotes[i]]);
						BowkeyfinalData[i].push($scope.BowlingKeyNotes[j][BowkeyProp]);
					}
				}
				BowkeyfinalData.map(function(item,index){
					BowkeyNotesFinal[index] = [];
					BowkeyNotesFinal[index]["title"] = bowKeyNotesTitle[index];
					BowkeyNotesFinal[index]["data1"] = item[0];
					BowkeyNotesFinal[index]["data2"] = item[1];
				});
				$scope.BowkeyNotesFinal = BowkeyNotesFinal;
				if (!$scope.$$phase) {
					$scope.$apply();
	  			} 
			}
			var comfortInn1finalData = [];
			var comfortInn2finalData = [];
			var batComfortlevel = [];
			if($scope.ComfortLevelsInnings1.length > 0){	
				var comfortInn1Title = ["Runs","BallS","Wickets","DotBall","Dotball Percentage","Dotball Frequency","Boundary 4s","Boundary 6s","Boundary Percentage","Boundary Frequency"];
				var comfortInn1KPI = ["Runs","Ball","Wickets","DotBall","DBPercentage","DotBallFrequency","Boundary4s","Boundary6s","BoundaryPer","BoundaryFrequency"];
				var comfortInn1TitleArr = [];
				comfortInn1KPI.map(function(item,index){
					comfortInn1TitleArr[item]=comfortInn1Title[index];
				});
				var comfortInn1Prop = '';
				
				var comfortInn1Final = [];
				for (var i=0; i < comfortInn1KPI.length; i++){
					comfortInn1finalData[i] = [];
					for(var j=0 ; j < $scope.ComfortLevelsInnings1.length; j++){
						comfortInn1Prop =  propName($scope.ComfortLevelsInnings1[j],$scope.ComfortLevelsInnings1[j][comfortInn1KPI[i]]);
						comfortInn1finalData[i].push($scope.ComfortLevelsInnings1[j][comfortInn1Prop]);
					}
				} 
				
			}
			if($scope.ComfortLevelsInnings2.length > 0){	
				var comfortInn2Title = ["Runs","BallS","Wickets","DotBall","Dotball Percentage","Dotball Frequency","Boundary 4s","Boundary 6s","Boundary Percentage","Boundary Frequency"];
				var comfortInn2KPI = ["Runs","Ball","Wickets","DotBall","DBPercentage","DotBallFrequency","Boundary4s","Boundary6s","BoundaryPer","BoundaryFrequency"];
				var comfortInn2TitleArr = [];
				comfortInn2KPI.map(function(item,index){
					comfortInn2TitleArr[item]=comfortInn2Title[index];
				});
				var comfortInn2Prop = '';
				
				var comfortInn2Final = [];
				for (var i=0; i < comfortInn2KPI.length; i++){
					comfortInn2finalData[i] = [];
					for(var j=0 ; j < $scope.ComfortLevelsInnings2.length; j++){
						comfortInn2Prop =  propName($scope.ComfortLevelsInnings2[j],$scope.ComfortLevelsInnings2[j][comfortInn2KPI[i]]);
						comfortInn2finalData[i].push($scope.ComfortLevelsInnings2[j][comfortInn2Prop]);
					}
				} 
				
			}
			if($scope.ComfortLevelsInnings1.length > 0 || $scope.ComfortLevelsInnings2.length > 0){
				comfortInn1finalData.map(function(item,index){
					batComfortlevel[index] = [];
					batComfortlevel[index]["title"] = comfortInn2Title[index];
					batComfortlevel[index]["data1"] = item[0];
					batComfortlevel[index]["data2"] = item[1];
					batComfortlevel[index]["data3"] = (comfortInn2finalData[index][0] != undefined && comfortInn2finalData[index][0] != '')?comfortInn2finalData[index][0]:'';
					batComfortlevel[index]["data4"] = (comfortInn2finalData[index][1] != undefined && comfortInn2finalData[index][1] != '')?comfortInn2finalData[index][1]:'';
				});
				$scope.batComfortlevel = batComfortlevel;
				if (!$scope.$$phase) {
					$scope.$apply();
	  			} 
	  			
			}
			if($scope.Individualbatting.length > 0){
				$scope.IndividualbattingInn1 = $filter('filter')($scope.Individualbatting,{InningsNo:1},true);
				$scope.IndividualbattingInn2 = $filter('filter')($scope.Individualbatting,{InningsNo:2},true)
				if (!$scope.$$phase) {
					$scope.$apply();
	  			}
			}
			if($scope.individualbowling.length > 0){
				$scope.IndividualbowlingInn1 = $filter('filter')($scope.individualbowling,{InningsNo:1},true);
				$scope.IndividualbowlingInn2 = $filter('filter')($scope.individualbowling,{InningsNo:2},true)
				if (!$scope.$$phase) {
					$scope.$apply();
	  			}
			}

			if (!$scope.$$phase) {
				$scope.$apply();
	  		} 
		});
	}

	$scope.cSBShowList = function(event){
		$(".cSBList").removeClass("active");
		$(".customSelecBox").removeClass("openSBox");
		$(event.target).parents(".customSelecBox").addClass("openSBox")
		$(event.target).parents(".customSelecBox").find(".cSBList").toggleClass("active");
	}

	$scope.cSBSeasonSelect = function(event,obj){
		$scope.selectedSeason = obj;
		$(".cSBList").removeClass("active");
		$(".customSelecBox").removeClass("openSBox");
		$scope.changeSeason();
	}
	$scope.cSBDivisionSelect = function(event,obj){
		$scope.selectedDivision = obj;
		$(".cSBList").removeClass("active");
		$(".customSelecBox").removeClass("openSBox");
		$scope.changeDivision($scope.selectedDivision.DivisionID);
	}
	$scope.cSBCompSelect = function(event,obj){
		$scope.selectedCompetition = obj;
		$(".cSBList").removeClass("active");
		$(".customSelecBox").removeClass("openSBox");
		$scope.changeCompetition($scope.selectedCompetition);
	}
	$scope.cSBShowSFList = function(){
		$(".cSBList").removeClass("active");
		$(".customSelecBox").removeClass("openSBox");
		$(".statsTypeFilter .cSBList").addClass("active");
		$(".statsTypeFilter").addClass("openSBox");
	}

	$scope.changeMatchType = function () {
    /*    var mTypeId = $('.matchTypeSel').val();
        mTypeId = matchType[mTypeId].MatchTypeID;*/
        
      	$("#errMsg").html("");
      	$scope.showAllStats = false;
      	$scope.noTstats = false;
      	$scope.noTeamstats = false;
      	$scope.noPlayerStats = false;
        var arr = []; var selectedFilternames = '';
        $(".matchTypeFilter .resultItems").each(function () {
            if ($(this).find("input").is(":checked")) {
                var mTypeId = $(this).find("input").attr("data-value");
                
                if(mTypeId == 'T20 Match' || mTypeId == 'Twenty20 Match'){
                	var filterresult = $filter('filter')(selectedComList, { CompetitionType: 'T20 Match' }, true);
                	if(filterresult != undefined && filterresult.length > 0)
                		arr.push(filterresult);
                	var filterresult = $filter('filter')(selectedComList, { CompetitionType: 'Twenty20 Match' }, true);
                	if(filterresult != undefined && filterresult.length > 0)
                		arr.push(filterresult);

                }
                if(mTypeId == 'Test Match' || mTypeId == 'Multi Day'){
                	var filterresult = $filter('filter')(selectedComList, { CompetitionType: 'Test Match' }, true);
                	if(filterresult != undefined && filterresult.length > 0)
                		arr.push(filterresult);
                	var filterresult = $filter('filter')(selectedComList, { CompetitionType: 'Multi Day Match' }, true);
                	if(filterresult != undefined && filterresult.length > 0)
                		arr.push(filterresult);
                }
                else{
                	var filterresult = $filter('filter')(selectedComList, { CompetitionType: mTypeId }, true);
                	 arr.push(filterresult);
                }
               

                if (selectedFilternames == '') {
                    selectedFilternames = selectedFilternames + $(this).find("input").attr("data-display");
                }
                else {
                    selectedFilternames = selectedFilternames + ' + ' + $(this).find("input").attr("data-display");
                }

               
            }
        });
        if (selectedFilternames != '')
        {
        	$(".cSelect.matchTypeSel").text(selectedFilternames);
        	$(".cSelect.matchTypeSel").attr("title",selectedFilternames);
        }
        else
        {
        	$(".cSelect.matchTypeSel").text('Select Match Type');
        	
        	for(var c=0;c<selectedComList.length;c++)
        	{
        		var fC = [];
        		fC.push(selectedComList[c]);
        		arr.push(fC);
        	}
        }

        var tournamentFilteredData = [];
        for (var i = 0; i < arr.length; i++)
        {
            for(var j=0;j<arr[i].length;j++)
            {
                tournamentFilteredData.push(arr[i][j]);
            }
        }

        if (tournamentFilteredData.length > 0)
        {
            var options = [];
            var selindex = '';
            for (var i = 0; i < tournamentFilteredData.length; i++) {
                options[i] = [];
                options[i] = tournamentFilteredData[i];

            }

            $scope.selectedComList = options;
            $scope.selectedCompetition = $scope.selectedComList[0];
            competitionId = $scope.selectedCompetition.CompetitionID;

            if($("#mcFilterBtn li.mnActive").length > 0)
				urlString = $("#mcFilterBtn li.mnActive").attr("data-value");
			if(urlString == 'live' || urlString == 'fixture' || urlString == 'result')
				urlString = "fixtures";
			if($scope.curSeasonId!=7)
				urlString="fixtures";
			$scope.bindResult(competitionId,urlString);
			
	     
			if (!$scope.$$phase) {
	            $scope.$apply();
	        }
	        clearInterval(liveInterval);
	        if(cloudFirestore)
				firebaseSRef();
	        if(liveData!=0 && liveTab){
				// liveInterval=setInterval(function(){
				// 		$scope.getLiveScore(competitionId); // calling live score  refreshing function
				// },15000);
				if(!cloudFirestore){
					liveInterval=setInterval(function(){
						$scope.getLiveScore(competitionId); // calling live score  refreshing function
					},15000);
				}
				else{
					firebaseSRef = cloudFirestoreDB.collection("matchstatus")
				    .onSnapshot(function(doc) {
				        if(firebaseSObjChange)
							$scope.getLiveScore(competitionId);
				    });
				}
			}
        }
        else
        {
        	$scope.selectedComList = [];
        	if($("#mcFilterBtn li.mnActive").length > 0)
				urlString = $("#mcFilterBtn li.mnActive").attr("data-value");
			if(urlString == 'live' || urlString == 'fixture' || urlString == 'result')
				urlString = "fixtures";
			if($scope.curSeasonId!=7)
				urlString="fixtures";
			competitionId = '';
			$scope.bindResult(competitionId,urlString);
        }

        clearInterval(liveInterval);
        if(cloudFirestore)
				firebaseSRef();
		if(liveData!=0 && liveTab){
			// liveInterval=setInterval(function(){
			// 	$scope.getLiveScore(competitionId); // calling live score  refreshing function
			// },15000);
			if(!cloudFirestore){
				liveInterval=setInterval(function(){
					$scope.getLiveScore(competitionId); // calling live score  refreshing function
				},15000);
			}
			else{
				firebaseSRef = cloudFirestoreDB.collection("matchstatus")
			    .onSnapshot(function(doc) {
			        if(firebaseSObjChange)
							$scope.getLiveScore(competitionId);
			    });
			}
		}
       
    }

    $scope.clickMatchType = function(event){
    	$(event.currentTarget).find(".inputSearchResultWrap").toggleClass("active");
        $(event.currentTarget).find(".unit_filterItemBlock.textBlock").toggleClass("enlarge");
    }
	
	$scope.getPlayerProfileLink = function(playerObj){
		var teamName = (playerObj.TeamName != undefined) ? playerObj.TeamName : '';
		teamName = teamName.trim();
		teamName = teamName.replace(/ /g, "-");
		teamName = teamName.toLowerCase();
		var ClientPlayerID = (playerObj.ClientPlayerID != undefined) ? playerObj.ClientPlayerID : '';
		var profileLink = clientbasePath+"teams/"+teamName+"/squad-details/"+ClientPlayerID;
		return profileLink;
		
	}
	
	$scope.click_stats = function(obj,clickType,elementText){
		console.log("click_stats");
		if(clickType == 'player'){
			var statsType = "";
			if($(".seasonStats.statsContentTab").hasClass("active"))
				statsType = "Season";			
			if($(".awardsStats.statsContentTab").hasClass("active"))
				statsType = "Awards";
			if($(".allTimeStats.statsContentTab").hasClass("active"))
				statsType = "Records";		
			
			var event_context = statsType+' '+$scope.selbattingStatsList.col1;
			
			dataLayer.push({
			  'event': 'click_stats',
			  'event_context': event_context,
			  'element_text': elementText,
			  'team_name' : 	obj.TeamCode,
			  'time_on_page' : time_on_page_sec			  
			});
			console.log(dataLayer);
		}
		if(clickType == 'viewall'){
			var statsType = "";
			if($(".seasonStats.statsContentTab").hasClass("active"))
				statsType = "Season";			
			if($(".awardsStats.statsContentTab").hasClass("active"))
				statsType = "Awards";
			if($(".allTimeStats.statsContentTab").hasClass("active"))
				statsType = "Records";		
			
			var event_context = statsType+' '+$scope.selbattingStatsList.col1;
			
			dataLayer.push({
			  'event': 'click_stats',
			  'event_context': event_context,
			  'element_text': elementText,
			  'time_on_page' : time_on_page_sec
			});
			console.log(dataLayer);
		}
		if(clickType == 'viewallrecords'){
					
			dataLayer.push({
			  'event': 'click_stats',
			  'event_context': elementText,
			  'element_text': "View full list",
			  'time_on_page' : time_on_page_sec
			});
			console.log(dataLayer);
		}
		
	}

}]);

/******* End of Control ******/


angular.module('MyApp')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

/******* Draw wagon Wheel ******/
function playWW(container,wwData,loadFile){
	var wagonWheelData = [];
	for(var i=0;i<wwData.length;i++)
	{
		wagonWheelData[i] = [];
		wagonWheelData[i][0] = wwData[i].FielderAngle;
		wagonWheelData[i][1] = wwData[i].FielderLengthRatio;
		wagonWheelData[i][2] = wwData[i].Runs;
		wagonWheelData[i][3] = wwData[i].BatType;
		if(wwData[i].IsFour && wwData[i].IsFour != '0')
			wagonWheelData[i][4] = "True";
		else
			wagonWheelData[i][4] = "False";
			
		if(wwData[i].IsSix && wwData[i].IsSix !='0')
			wagonWheelData[i][5] = "True";
		else
			wagonWheelData[i][5] = "False";
	}
	
	if(loadFile == 'player')
		loadWagonwheelP(wagonWheelData,container);
	else
		loadWagonwheel(wagonWheelData,container);
}

/******* Manhattan navigation ******/
function loadBarChartNav(data, innings, navData) {
    if (SM_Live.manhattanplot != null)
        SM_Live.manhattanplot.destroy();
    var len = data.BarChart.length;
    var scores = [], overs = [], wickets = [], count = 0, wicCount = 0, Nextscores = [], Nextovers = [], Nextwickets = [], Nextcount = 0, NextwicCount = 0;
    var Bowlers = {}, NextBowlers = {};
    for (var i = 0; i < len; i++) {
        if (data.BarChart[i].InningsNo == innings) {
            scores[count] = [];
            scores[count][0] = (data.BarChart[i].OverNo);
            scores[count][1] = parseInt(data.BarChart[i].OverRuns, 10);
            if (!Bowlers[data.BarChart[i].BowlerID]) {
                Bowlers[data.BarChart[i].BowlerID] = {};
                Bowlers[data.BarChart[i].BowlerID].overs = 0;
                Bowlers[data.BarChart[i].BowlerID].Wickets = 0;
                Bowlers[data.BarChart[i].BowlerID].Runs = 0;
            }
            Bowlers[data.BarChart[i].BowlerID].overs++;
            Bowlers[data.BarChart[i].BowlerID].Wickets += parseInt(data.BarChart[i].Wickets, 10);
            Bowlers[data.BarChart[i].BowlerID].Runs += parseInt(data.BarChart[i].BowlerRuns, 10);
            scores[count][2] = (data.BarChart[i].Bowler + ' - ' + Bowlers[data.BarChart[i].BowlerID].Runs + '/' + Bowlers[data.BarChart[i].BowlerID].Wickets + ' (' + Bowlers[data.BarChart[i].BowlerID].overs + ' Overs)');
            overs.push(data.BarChart[i].OverNo);
            if (data.BarChart[i].Wickets > 0) {
                var NoofWickets = data.BarChart[i].Wickets;
                for (var j = 1; j <= NoofWickets; j++) {
                    wickets[wicCount] = [];
                    wickets[wicCount][0] = (data.BarChart[i].OverNo);
                    wickets[wicCount][1] = (parseInt(data.BarChart[i].OverRuns, 10) + j * 0.6);
                    wicCount++;
                }
            }
            count++;
        } else {
            Nextscores[Nextcount] = [];
            Nextscores[Nextcount][0] = (data.BarChart[i].OverNo);
            Nextscores[Nextcount][1] = parseInt(data.BarChart[i].OverRuns, 10);
            if (!NextBowlers[data.BarChart[i].BowlerID]) {
                NextBowlers[data.BarChart[i].BowlerID] = {};
                NextBowlers[data.BarChart[i].BowlerID].overs = 0;
                NextBowlers[data.BarChart[i].BowlerID].Wickets = 0;
                NextBowlers[data.BarChart[i].BowlerID].Runs = 0;
            }
            NextBowlers[data.BarChart[i].BowlerID].overs++;
            NextBowlers[data.BarChart[i].BowlerID].Wickets += parseInt(data.BarChart[i].Wickets, 10);
            NextBowlers[data.BarChart[i].BowlerID].Runs += parseInt(data.BarChart[i].BowlerRuns, 10);
            Nextscores[Nextcount][2] = (data.BarChart[i].Bowler + ' - ' + NextBowlers[data.BarChart[i].BowlerID].Runs + '/' + NextBowlers[data.BarChart[i].BowlerID].Wickets + ' (' + NextBowlers[data.BarChart[i].BowlerID].overs + ' Overs)');
            Nextovers.push(data.BarChart[i].OverNo);
            if (data.BarChart[i].Wickets > 0) {
                var NoofWickets = data.BarChart[i].Wickets;
                for (var j = 1; j <= NoofWickets; j++) {
                    Nextwickets[NextwicCount] = [];
                    Nextwickets[NextwicCount][0] = (data.BarChart[i].OverNo);
                    Nextwickets[NextwicCount][1] = (parseInt(data.BarChart[i].OverRuns, 10) + j * 0.6);
                    NextwicCount++;
                }
            }
            Nextcount++;
        }
    }
    var len = data.WormChart.length, wicCount = 0, NextwicCount = 0;

    for (var i = 0; i < len; i++) {
        if (data.WormChart[i].InningsNo == innings) {
            //wickets[wicCount] = [];
            if (wickets[wicCount] != undefined)
                wickets[wicCount][2] = data.WormChart[i].OutBatsman + ' ' + data.WormChart[i].OutDesc + ' ' + data.WormChart[i].BatsmanRuns + '(' + data.WormChart[i].BatsmanBalls + ')';
            wicCount++;
        } else {
            //	Nextwickets[NextwicCount] = [];
            if (Nextwickets[NextwicCount] != undefined)
                Nextwickets[NextwicCount][2] = data.WormChart[i].OutBatsman + ' ' + data.WormChart[i].OutDesc + ' ' + data.WormChart[i].BatsmanRuns + '(' + data.WormChart[i].BatsmanBalls + ')';
            NextwicCount++;
        }
    }
    var s1 = scores;
    var s2 = Nextscores;
    var ticks = overs;
    $.jqplot.config.enablePlugins = true;
    var manH = [];
    var j = 0;
    var start = navData['start'];
    if (start > 1) start = navData['start'] - 1;
    else start = navData['start'];
    for (var i = start; i < navData['end']; i++) {
        manH[j] = [];
        manH[j] = scores[i];
        j++;
    }
    var manH2 = [];
    var j = 0;
    for (var i = start; i < navData['end']; i++) {
        manH2[j] = [];
        manH2[j] = Nextscores[i];
        j++;
    }
    manW = [];
    var j = 0;
    for (var i = 0; i < wickets.length; i++) {
        manW[j] = [];
        if (wickets[i][0] >= navData['start'] && wickets[i][0] <= navData['end']) {
            manW[j] = wickets[i];
            j++;
        }
    }
    manW2 = [];
    var j = 0;
    for (var i = 0; i < Nextwickets.length; i++) {
        manW2[j] = [];
        if (Nextwickets[i][0] >= navData['start'] && Nextwickets[i][0] <= navData['end']) {
            manW2[j] = Nextwickets[i];
            j++;
        }
    }
    var s1 = manH;  //scores;
    var s2 = Nextscores;
    var manhattanparam = [];
    if (innings == 2) {
        manhattanparam = [manH2, manW2, s1, manW];
    }
    else
        manhattanparam = [s1, manW];
    var barwidth = 5;
    var xmax = 20.2;
    if (data['MatchType']['MatchTypeName'] == "One Day Match" || data['MatchType']['MatchTypeName'] == "Twenty20 Match") {
        var manhattanparam = [];
        if (innings == 2 || true) {
            manhattanparam = [manH2, manW2, s1, manW];
        }
        else
            manhattanparam = [s1, manW];

        if (data['MatchType']['MatchTypeName'] == "One Day Match")
            xmax = 50.2;
        
        SM_Live.manhattanplot = $.jqplot('smipl-manhattan', manhattanparam, {
            grid: {
                drawGridLines: true,
                gridLineColor: 'transparent',
                background: 'transparent',
                borderColor: '#2C8BC6',
                borderWidth: 1
            },
            seriesDefaults: {

        	},
	        series: [{
	            renderer: $.jqplot.BarRenderer,
	            color: barColorTeamA,
	            shadowDepth: 0,
	            pointLabels: {
	                show: false
	            },
	            rendererOptions: {
	                barWidth: barwidth,
	                barMargin: 0,
	                barPadding: 0,
	                highlightMouseDown: false
	            }
	        },
			{
			    color: barColorTeamA,
			    showLine: false,
			    pointLabels: {
			        show: false
			    }
			},
			{
			    renderer: $.jqplot.BarRenderer,
			    color: barColorTeamB,
			    shadowDepth: 0,
			    pointLabels: {
			        show: false
			    },
			    rendererOptions: {
			        barWidth: barwidth,
			        barMargin: 0,
			        barPadding: 0,
			        highlightMouseDown: false
			    }
			}, 
			{
			    color: barColorTeamB,
			    showLine: false,
			    pointLabels: {
			        show: false
			    }
			}
			],
        	axes: {
	            xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: 20,
	                shadow: false,
	                min: 0,
	                label: 'Overs',
	                tickOptions: { formatString: '%d' },
	                labelOptions: {
	                    color: '#444'
	                }

	            }, 
	            yaxis: {
	                min: 0,
	                tickOptions: { formatString: '%d' },
	                pad: 0.05,
	                label: 'Runs',
	                textColor: '#444',
	                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
	                labelOptions: {
	                    color: '#444'
	                }
	            },
	            highlighter: {
	                show: false,
	                showLabel: false
	            }
       		}
    	});
	}
	if (data['MatchType']['MatchTypeName'] == "Multi Day") {
		    var manhattanparam = [];
		    manhattanparam = [s1, manW];
		    barwidth = 10;
		    xmax = OvrLength;

		    SM_Live.manhattanplot = $.jqplot('smipl-manhattan', manhattanparam, {
		        grid: {
		            drawGridLines: true,
		            gridLineColor: 'transparent',
		            background: 'transparent',
		            borderColor: '#2C8BC6',
		            borderWidth: 1
		        },
		        seriesDefaults: {

		    	},
		    	series: [
					{
					    renderer: $.jqplot.BarRenderer,
					    color: barColorTeamA,
					    shadowDepth: 0,
					    pointLabels: {
					        show: false
					    },
					    rendererOptions: {
					        barWidth: barwidth,
					        barMargin: 0,
					        barPadding: 0,
					        highlightMouseDown: false
					    }
					}, {
					    color: barColorTeamA,
					    showLine: false,
					    pointLabels: {
					        show: false
					    }
					}
				],
			    axes: {
			        xaxis: {
			            renderer: $.jqplot.CategoryAxisRenderer,
			            ticks: 20,
			            shadow: false,
			            min: 0,
			            label: 'Overs',
			            tickOptions: { formatString: '%d' },
			            labelOptions: {
			                color: '#444'
			            }

			        }, yaxis: {
			            min: 0,
			            tickOptions: { formatString: '%d' },
			            pad: 0.05,
			            label: 'Runs',
			            textColor: '#444',
			            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
			            labelOptions: {
			                color: '#444'
			            }
			        },
			        highlighter: {
			            show: false,
			            showLabel: false
			        }
			    }
			});
		}    
}

/******* Manhattan and Worm Graph ******/
function loadBarChart(data, innings) {
    if (SM_Live.manhattanplot != null)
        SM_Live.manhattanplot.destroy();
    if (SM_Live.wormplot != null)
        SM_Live.wormplot.destroy();
    
    if (data['MatchType']['MatchTypeName'] == "One Day Match") {
        $('.manhattan-nav .MHprev').attr('start', '0');
        $('.manhattan-nav .MHprev').attr('end', '0');
        $('.manhattan-nav .MHprev').addClass('inactive');
        $('.manhattan-nav .MHnext').removeClass('inactive');
        $('.manhattan-nav .MHnext').attr('start', '21');
        $('.manhattan-nav .MHnext').attr('end', '40');
    }
    if (data['MatchType']['MatchTypeName'] == "Multi Day") {
        OvrLength = data['BarChart'].length;
        if (OvrLength > 20) {
            $('.manhattan-nav .MHprev').attr('start', '0');
            $('.manhattan-nav .MHprev').attr('end', '0');
            $('.manhattan-nav .MHprev').addClass('inactive');
            $('.manhattan-nav .MHnext').removeClass('inactive');
            $('.manhattan-nav .MHnext').attr('start', '21');
            $('.manhattan-nav .MHnext').attr('end', '40');
        }
		else
		{
			$('.manhattan-nav .MHprev').addClass('inactive');
            $('.manhattan-nav .MHnext').addClass('inactive');
		}
    }
    
    var len = data.BarChart.length;
    var scores = [], overs = [], wickets = [], count = 0, wicCount = 0, Nextscores = [], Nextovers = [], Nextwickets = [], Nextcount = 0, NextwicCount = 0;
    var Bowlers = {}, NextBowlers = {};

    for (var i = 0; i < len; i++) {
        if (data.BarChart[i].InningsNo == innings) {
            scores[count] = [];
            scores[count][0] = (data.BarChart[i].OverNo);
            scores[count][1] = parseInt(data.BarChart[i].OverRuns, 10);
            if (!Bowlers[data.BarChart[i].BowlerID]) {
                Bowlers[data.BarChart[i].BowlerID] = {};
                Bowlers[data.BarChart[i].BowlerID].overs = 0;
                Bowlers[data.BarChart[i].BowlerID].Wickets = 0;
                Bowlers[data.BarChart[i].BowlerID].Runs = 0;
            }
            Bowlers[data.BarChart[i].BowlerID].overs++;
            Bowlers[data.BarChart[i].BowlerID].Wickets += parseInt(data.BarChart[i].Wickets, 10);
            Bowlers[data.BarChart[i].BowlerID].Runs += parseInt(data.BarChart[i].BowlerRuns, 10);
            scores[count][2] = (data.BarChart[i].Bowler + ' - ' + Bowlers[data.BarChart[i].BowlerID].Runs + '/' + Bowlers[data.BarChart[i].BowlerID].Wickets + ' (' + Bowlers[data.BarChart[i].BowlerID].overs + ' Overs)');
            overs.push(data.BarChart[i].OverNo);
            if (data.BarChart[i].Wickets > 0) {
                var NoofWickets = data.BarChart[i].Wickets;
                for (var j = 1; j <= NoofWickets; j++) {
                    wickets[wicCount] = [];
                    wickets[wicCount][0] = (data.BarChart[i].OverNo);
                    wickets[wicCount][1] = (parseInt(data.BarChart[i].OverRuns, 10) + j * 0.6);
                    wicCount++;
                }
            }
            count++;
        } else {
            Nextscores[Nextcount] = [];
            Nextscores[Nextcount][0] = (data.BarChart[i].OverNo);
            Nextscores[Nextcount][1] = parseInt(data.BarChart[i].OverRuns, 10);
            if (!NextBowlers[data.BarChart[i].BowlerID]) {
                NextBowlers[data.BarChart[i].BowlerID] = {};
                NextBowlers[data.BarChart[i].BowlerID].overs = 0;
                NextBowlers[data.BarChart[i].BowlerID].Wickets = 0;
                NextBowlers[data.BarChart[i].BowlerID].Runs = 0;
            }
            NextBowlers[data.BarChart[i].BowlerID].overs++;
            NextBowlers[data.BarChart[i].BowlerID].Wickets += parseInt(data.BarChart[i].Wickets, 10);
            NextBowlers[data.BarChart[i].BowlerID].Runs += parseInt(data.BarChart[i].BowlerRuns, 10);
            Nextscores[Nextcount][2] = (data.BarChart[i].Bowler + ' - ' + NextBowlers[data.BarChart[i].BowlerID].Runs + '/' + NextBowlers[data.BarChart[i].BowlerID].Wickets + ' (' + NextBowlers[data.BarChart[i].BowlerID].overs + ' Overs)');
            Nextovers.push(data.BarChart[i].OverNo);
            if (data.BarChart[i].Wickets > 0) {
                var NoofWickets = data.BarChart[i].Wickets;
                for (var j = 1; j <= NoofWickets; j++) {
                    Nextwickets[NextwicCount] = [];
                    Nextwickets[NextwicCount][0] = (data.BarChart[i].OverNo);
                    Nextwickets[NextwicCount][1] = (parseInt(data.BarChart[i].OverRuns, 10) + j * 0.6);
                    NextwicCount++;
                }
            }
            Nextcount++;
        }
    }
    var len = data.WormChart.length, wicCount = 0, NextwicCount = 0;
    for (var i = 0; i < len; i++) {
        if (data.WormChart[i].InningsNo == innings) {
            //wickets[wicCount] = [];
            if (wickets[wicCount] != undefined)
                wickets[wicCount][2] = data.WormChart[i].OutBatsman + ' ' + data.WormChart[i].OutDesc + ' ' + data.WormChart[i].BatsmanRuns + '(' + data.WormChart[i].BatsmanBalls + ')';
            wicCount++;
        } else {
            //	Nextwickets[NextwicCount] = [];
            if (Nextwickets[NextwicCount] != undefined)
                Nextwickets[NextwicCount][2] = data.WormChart[i].OutBatsman + ' ' + data.WormChart[i].OutDesc + ' ' + data.WormChart[i].BatsmanRuns + '(' + data.WormChart[i].BatsmanBalls + ')';
            NextwicCount++;
        }
    }
    var s1 = scores;
    var s2 = Nextscores;
    var ticks = overs;
    $.jqplot.config.enablePlugins = true;
    var manH = [];
    var j = 0;
    for (var i = 0; i < 20; i++) {
        manH[j] = [];
        manH[j] = scores[i];
        j++;
    }
    var manH2 = [];
    for (var i = 0; i < 20; i++) {
        manH2[i] = [];
        manH2[i] = Nextscores[i];
    }
    manW = [];
    var j = 0;
    for (var i = 0; i < wickets.length; i++) {
        manW[j] = [];
        if (wickets[i][0] <= 20) {
            manW[j] = wickets[i];
            j++;
        }
    }
    manW2 = [];
    var j = 0;
    for (var i = 0; i < Nextwickets.length; i++) {
        manW2[j] = [];
        if (Nextwickets[i][0] <= 20) {
            manW2[j] = Nextwickets[i];
            j++;
        }
    }
    var s1 = manH;  //scores;
    var s2 = Nextscores;
    var manhattanparam = [];
    if (innings == 2) {
        manhattanparam = [manH2, manW2, s1, manW];
    }
    else
        manhattanparam = [s1, wickets];

    var barwidth = 5;
    var xmax = 20.2;
    if (data['MatchType']['MatchTypeName'] == "One Day Match" || data['MatchType']['MatchTypeName'] == "Twenty20 Match") {
        var manhattanparam = [];
        if (innings == 2) {
            manhattanparam = [manH2, manW2, s1, manW];
        }
        else
            manhattanparam = [s1, manW];

        if (data['MatchType']['MatchTypeName'] == "One Day Match")
            xmax = 50.2;
        SM_Live.manhattanplot = $.jqplot('smipl-manhattan', manhattanparam, {
            grid: {
                drawGridLines: true,
                gridLineColor: 'transparent',
                background: 'transparent',
                borderColor: '#222',
                borderWidth: 1
            },
            seriesDefaults: {
        	},
	        series: [{
	            renderer: $.jqplot.BarRenderer,
	            color: barColorTeamA,
	            shadowDepth: 0,
	            pointLabels: {
	                show: false
	            },
	            rendererOptions: {
	                barWidth: barwidth,
	                barMargin: 0,
	                barPadding: 0,
	                highlightMouseDown: false
	            }
	        },
			{
			    color: barColorTeamA,
			    showLine: false,
			    pointLabels: {
			        show: false
			    }
			},
			{
			    renderer: $.jqplot.BarRenderer,
			    color: barColorTeamB,
			    shadowDepth: 0,
			    pointLabels: {
			        show: false
			    },
			    rendererOptions: {
			        barWidth: barwidth,
			        barMargin: 0,
			        barPadding: 0,
			        highlightMouseDown: false
			    }
			}, 
			{
			    color: barColorTeamB,
			    showLine: false,
			    pointLabels: {
			        show: false
			    }
			}
			],
        	axes: {
	            xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: 20,
	                shadow: false,
	                min: 0,
	                label: 'Overs',
	                tickOptions: { formatString: '%d' },
	                labelOptions: {
	                    color: '#444'
	                }

	            }, 
	            yaxis: {
	                min: 0,
	                tickOptions: { formatString: '%d' },
	                pad: 0.05,
	                label: 'Runs',
	                textColor: '#444',
	                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
	                labelOptions: {
	                    color: '#444'
	                }
           		 },
	            highlighter: {
	                show: false,
	                showLabel: false
	            }
       		}
         });
    }
    if (data['MatchType']['MatchTypeName'] == "Multi Day") {
        var manhattanparam = [];
        manhattanparam = [s1, manW];
        barwidth = 10;
        xmax = OvrLength;
        SM_Live.manhattanplot = $.jqplot('smipl-manhattan', manhattanparam, {
            grid: {
                drawGridLines: true,
                gridLineColor: 'transparent',
                background: 'transparent',
                borderColor: '#222',
                borderWidth: 1
            },
            seriesDefaults: {

        	},
        	series: [
				{
				    renderer: $.jqplot.BarRenderer,
				    color: barColorTeamA,
				    shadowDepth: 0,
				    pointLabels: {
				        show: false
				    },
				    rendererOptions: {
				        barWidth: barwidth,
				        barMargin: 0,
				        barPadding: 0,
				        highlightMouseDown: false
				    }
				}, 
				{
				    color: barColorTeamA,
				    showLine: false,
				    pointLabels: {
				        show: false
				    }
				}
			],
        	axes: {
	            xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: 20,
	                shadow: false,
	                min: 0,
	                label: 'Overs',
	                tickOptions: { formatString: '%d' },
	                labelOptions: {
	                    color: '#444'
	                }

	            }, 
	            yaxis: {
	                min: 0,
	                tickOptions: { formatString: '%d' },
	                pad: 0.05,
	                label: 'Runs',
	                textColor: '#444',
	                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
	                labelOptions: {
	                    color: '#444'
	                }
            	},
            	highlighter: {
	                show: false,
	                showLabel: false
            	}
        	}
    	});
    }    

	var len = data.BarChart.length, count = 0, score = 0, wicCount = 0, Nextcount = 0, Nextscore = 0, NextwicCount = 0;
	for (var i = 0; i < len; i++) {
	    if (data.BarChart[i].InningsNo == innings) {
	        score += parseInt(data.BarChart[i].OverRuns, 10);
	        scores[count][1] = score;
	        if (data.BarChart[i].Wickets > 0) {
	            var NoofWickets = parseInt(data.BarChart[i].Wickets, 10);
	            for (var j = 0; j < NoofWickets; j++) {
	                wickets[wicCount][1] = (score + j * 7);
	                wicCount++;
	            }
	        }
	        count++;
	    } else {
	        Nextscore += parseInt(data.BarChart[i].OverRuns, 10);
	        Nextscores[Nextcount][1] = Nextscore;
	        if (data.BarChart[i].Wickets > 0) {
	            var NoofWickets = parseInt(data.BarChart[i].Wickets, 10);
	            for (var j = 0; j < NoofWickets; j++) {
	                Nextwickets[NextwicCount][1] = (Nextscore + j * 7);
	                NextwicCount++;
	            }
	        }
	        Nextcount++;
	    }
	}
	if(xmax < 15) xmax = 15;
	var s1 = scores, s2 = Nextscores;
	var wormD = [];
	if (innings == 2 && data['MatchType']['MatchTypeName'] != "Multi Day") {
        wormD = [s2, s1, Nextwickets, wickets];
    }
    else
        wormD = [s1, s2, wickets, Nextwickets];
	SM_Live.wormplot = $.jqplot('smipl-worm', wormD, {
	    grid: {
	        drawGridLines: true,
	        gridLineColor: 'transparent',
	        background: 'transparent',
	        borderColor: '#222',
	        borderWidth: 1
	    },
	    seriesDefaults: {
		},
		series: [
			{
			    pointLabels: {
			        show: false
			    }, rendererOptions: {
			        barWidth: 10,
			        smooth: true,
			        barMargin: 0
			    },
			    showMarker: false,
			    color: barColorTeamA 
			},
	        {
	            pointLabels: {
	                show: false
	            }, rendererOptions: {
	                barWidth: 10,
	                smooth: true,
	                barMargin: 0
	            },
	            showMarker: false,
	            color: barColorTeamB
	        },
	        {
	            color: barColorTeamA ,
	            showLine: false,
	            pointLabels: {
	                show: false
	            }
	        },
	        {
	        color: barColorTeamB,
	        showLine: false,
	        pointLabels: {
	            show: false
	        }
		}],
		axes: {
	    	xaxis: {
		        // renderer: $.jqplot.CategoryAxisRenderer,
		        //   ticks: ticks,
		        shadow: false,
		        min: 0,
		        max: xmax,
		        label: 'Overs',
		        tickOptions: { formatString: '%d' },
		        labelOptions: {
		            color: '#444'
		        }

	    	}, 
		    yaxis: {
		        min: 0,
		        tickOptions: { formatString: '%d' },
		        label: 'Runs',
		        labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
		        labelOptions: {
		            color: '#444'
	        	}
	   		},
	    	highlighter: {
		        show: false,
		        showLabel: false
	    	}
		}
	});
	$('#smipl-manhattan, #smipl-worm').bind("jqplotDataMouseOver", function(ev, seriesIndex, pointIndex, data) {
	    var myText = data[2] ? data[2] : "";
	    var pos = $(this).position();
	    var epagex = pos.left - 45;
	    var epagey = $(this).offset().top;
	    $('.tool-value').html(myText);
	    $('.smipl-chart-popup').show();
	    $('.smipl-chart-popup').hide();
	    $('.smipl-chart-popup').css({ 'left': (epagex + 80), 'top': (epagey) }).show();
	});

	$('#smipl-manhattan, #smipl-worm').bind("jqplotDataMouseOut", function(ev, seriesIndex, pointIndex, data) {
	    $('.smipl-chart-popup').hide();
	});
	$('.jqplot-grid-canvas').mouseout(function() {
	    $('.smipl-chart-popup').hide();
	});
}

/***********Manhattan chart Version 2***********/
function drawManhattanV2(data, innings,LoadType) {
	var man_chart_matchType = (data['MatchType']['MatchTypeName'] != undefined) ? data['MatchType']['MatchTypeName'] : "";
	var firstBattingTeam = "";
	var secondBattingTeam = "";
	if(innings<=2){
		if(man_chart_matchType != 'Multi Day'){
			firstBattingTeam = matchSummaryData.FirstBattingTeam;
			secondBattingTeam = matchSummaryData.SecondBattingTeam;
		}
		else if(innings == 1){
			firstBattingTeam = matchSummaryData.FirstBattingTeam;
		}
		else if(innings == 2){
			firstBattingTeam = matchSummaryData.SecondBattingTeam;
		}
	}
	else if(innings == 3){
		if(matchSummaryData.FirstBattingTeamID == matchSummaryData.SecondInningsFirstBattingID){
			firstBattingTeam = matchSummaryData.FirstBattingTeam;
			secondBattingTeam = matchSummaryData.SecondBattingTeam;
		}
		if(matchSummaryData.SecondBattingTeamID == matchSummaryData.SecondInningsFirstBattingID){
			firstBattingTeam = matchSummaryData.SecondBattingTeam;
			secondBattingTeam = matchSummaryData.FirstBattingTeam;
		}
	}
	else if(innings == 4){
		if(matchSummaryData.FirstBattingTeamID == matchSummaryData.SecondInningsSecondBattingID){
			firstBattingTeam = matchSummaryData.FirstBattingTeam;
			secondBattingTeam = matchSummaryData.SecondBattingTeam;
		}
		if(matchSummaryData.SecondBattingTeamID == matchSummaryData.SecondInningsSecondBattingID){
			firstBattingTeam = matchSummaryData.SecondBattingTeam;
			secondBattingTeam = matchSummaryData.FirstBattingTeam;
		}
	}
	
	var InnTeam1 = [];
	var InnTeam2 = [];
	var chartDataX =  [];
	var chartDataY = [];
	var chartDataZ = [];
	var chartDataA = [];
	var inn1WicketsData = [];
	var inn2WicketsData = [];
	var inn1WormWicketsData = [];
	var inn2WormWicketsData = [];
	var OverNo_Arr = [];
	var chartToolTip = [];
	var toolTipInn1 = [];
	var toolTipInn2 = [];
	var toolTipContent = "<div class='customToolTip'>";
	var toolTipWicInn1 = [];
	var toolTipWicInn2 = [];
	var colorAr = [];
	chartDataX[0] = firstBattingTeam;
	chartDataY[0] = secondBattingTeam;
	chartDataZ[0] = "InnOneWickets";
	chartDataA[0] = "InnTwoWickets";
	var wormInn1 = [];
	var wormInn2 = [];
	wormInn1[0] = firstBattingTeam;
	wormInn2[0] = secondBattingTeam;
	wormInn1[1] = 0;
	if(innings > 1 && man_chart_matchType != "Multi Day")
		wormInn2[1] = 0;

	var manhattanPoints = (data['BarChart'] != undefined) ? data['BarChart'] : [];
	var manhattanWickets = (data['WormChart'] != undefined) ? data['WormChart'] : [];

	var overNoStart = 1;
	if(manhattanPoints != undefined && manhattanPoints.length > 0 && manhattanPoints[0].OverNo == 0)
		overNoStart = 0;

	manhattanWickets.map(function(item){
		if(item.InningsNo == "1" || man_chart_matchType == "Multi Day"){
			var overNo = (overNoStart == 0) ? parseInt(item.OverNo) + 1 : parseInt(item.OverNo);
				toolTipContent = "<p class='mchart-wkts'><span class='mchart-label'>Wicket: </span>"+item.OutBatsman+" "+item.OutDesc+" "+item.BatsmanRuns+"("+item.BatsmanBalls+")</p>";
				if(toolTipWicInn1[overNo] == undefined)
				{
					toolTipWicInn1[overNo] = [];	
					toolTipWicInn1[overNo].push(toolTipContent);
				} 
				else
					toolTipWicInn1[overNo] = toolTipWicInn1[overNo] + "<span class='mchart-wkts'> "+item.OutBatsman+" "+item.OutDesc+" "+item.BatsmanRuns+"("+item.BatsmanBalls+")</span>";
				
		}

		if(item.InningsNo == "2" && man_chart_matchType != "Multi Day"){
			var overNo = (overNoStart == 0) ? parseInt(item.OverNo) + 1 : parseInt(item.OverNo);
				toolTipContent = "<p class='mchart-wkts'><span class='mchart-label'>Wicket: </span>"+item.OutBatsman+" "+item.OutDesc+" "+item.BatsmanRuns+"("+item.BatsmanBalls+")</p>";
				if(toolTipWicInn2[overNo] == undefined){
					toolTipWicInn2[overNo] = [];
					toolTipWicInn2[overNo].push(toolTipContent);
				} 				
				else{
					toolTipWicInn2[overNo] = toolTipWicInn2[overNo] + "<span class='mchart-wkts'> "+item.OutBatsman+" "+item.OutDesc+" "+item.BatsmanRuns+"("+item.BatsmanBalls+")</span>";
				}
		}
	});

	if(manhattanPoints.length <= 6){
		$(".powerPlayHL").addClass('fWdth');
	}
	else{
		$(".powerPlayHL").removeClass('fWdth');
	}
	manhattanPoints.map(function(item){
		if(item.InningsNo == "1" || man_chart_matchType == "Multi Day"){
			var overNo = (overNoStart == 0) ? parseInt(item.OverNo) + 1 : parseInt(item.OverNo);
						
			item.Wickets = parseInt(item.Wickets);
							
			toolTipContent = "<p class='mchart-teamname'>"+firstBattingTeam+"</p><p class='mchart-overno'><span class='mchart-label'>Over No: </span>"+overNo+"<span class='mchart-label'> Bowled By: </span>"+item.Bowler+" - "+item.BowlerRuns+"/"+item.Wickets+"</p>";
		    if(toolTipInn1[overNo] == undefined)
		    	toolTipInn1[overNo] = toolTipContent;
		    else
		    	toolTipInn1[overNo] = toolTipInn1[overNo] + "<span class='mchart-overno'> "+item.Bowler+" - "+item.BowlerRuns+"/"+item.Wickets+"</span>";
		}
		if(item.InningsNo == "2" && man_chart_matchType != "Multi Day"){
			InnTeam2.push(item);
			var overNo = (overNoStart == 0) ? parseInt(item.OverNo) + 1 : parseInt(item.OverNo);
			
			item.Wickets = parseInt(item.Wickets);
			toolTipContent = "<p class='mchart-teamname'>"+secondBattingTeam+"</p><p class='mchart-overno'><span class='mchart-label'>Over No: </span>"+overNo+"<span class='mchart-label'> Bowled By: </span>"+item.Bowler+" - "+item.BowlerRuns+"/"+item.Wickets+"</p>";
			if(toolTipInn2[overNo] == undefined)
		    	toolTipInn2[overNo] = toolTipContent;
		    else
		    	toolTipInn2[overNo] = toolTipInn2[overNo] + "<span class='mchart-overno'> "+item.Bowler+" - "+item.BowlerRuns+"/"+item.Wickets+"</span>";

		}
	});

	var filmanhattanPointsAr = (data['BarChart'] != undefined) ? data['BarChart'] : [];
	var filmanhattanPoints = [];
	var uniqOvers = [];
	var uniqInx = 0;
	if(filmanhattanPointsAr != undefined && filmanhattanPointsAr.length > 0){
		filmanhattanPointsAr.map(function(item){
				if(uniqOvers[item.InningsNo] == undefined)
					uniqOvers[item.InningsNo] = [];
			if(jQuery.inArray(item.OverNo, uniqOvers[item.InningsNo]) == -1){
				filmanhattanPoints.push(item);
				uniqOvers[item.InningsNo].push(item.OverNo);
				uniqInx++;
			}
			else{
				filmanhattanPoints[uniqInx - 1]['OverRuns'] = parseInt(filmanhattanPoints[uniqInx - 1]['OverRuns']) + parseInt(item.OverRuns);
				filmanhattanPoints[uniqInx - 1]['Wickets'] = parseInt(filmanhattanPoints[uniqInx - 1]['Wickets']) + parseInt(item.Wickets);
				filmanhattanPoints[uniqInx - 1]['BowlerRuns'] = parseInt(filmanhattanPoints[uniqInx - 1]['BowlerRuns']) + parseInt(item.BowlerRuns);
			}
		});
	}
	
	var inn1Scores = 0;
	var inn2Scores = 0;

	if(firstBattingTeam == 'Chennai Super Kings')
		$(".teamALegendItem").addClass("CSK");
	else if(firstBattingTeam == 'Delhi Capitals')
		$(".teamALegendItem").addClass("DC");
	else if(firstBattingTeam == 'Punjab Kings')
		$(".teamALegendItem").addClass("PK");
	else if(firstBattingTeam == 'Kolkata Knight Riders')
		$(".teamALegendItem").addClass("KKR");
	else if(firstBattingTeam == 'Mumbai Indians')
		$(".teamALegendItem").addClass("MI");
	else if(firstBattingTeam == 'Rajasthan Royals')
		$(".teamALegendItem").addClass("RR");
	else if(firstBattingTeam == 'Royal Challengers Bangalore' || firstBattingTeam == 'Royal Challengers Bengaluru')
		$(".teamALegendItem").addClass("RCB");
	else if(firstBattingTeam == 'Sunrisers Hyderabad')
		$(".teamALegendItem").addClass("SH");
	else if(firstBattingTeam == 'Gujarat Titans')
		$(".teamALegendItem").addClass("GT");
	else if(firstBattingTeam == 'Lucknow Super Giants')
		$(".teamALegendItem").addClass("LSG");

	if(secondBattingTeam == 'Chennai Super Kings')
		$(".teamBLegendItem").addClass("CSK");
	else if(secondBattingTeam == 'Delhi Capitals')
		$(".teamBLegendItem").addClass("DC");
	else if(secondBattingTeam == 'Punjab Kings')
		$(".teamBLegendItem").addClass("PK");
	else if(secondBattingTeam == 'Kolkata Knight Riders')
		$(".teamBLegendItem").addClass("KKR");
	else if(secondBattingTeam == 'Mumbai Indians')
		$(".teamBLegendItem").addClass("MI");
	else if(secondBattingTeam == 'Rajasthan Royals')
		$(".teamBLegendItem").addClass("RR");
	else if(secondBattingTeam == 'Royal Challengers Bangalore' || secondBattingTeam == 'Royal Challengers Bengaluru')
		$(".teamBLegendItem").addClass("RCB");
	else if(secondBattingTeam == 'Sunrisers Hyderabad')
		$(".teamBLegendItem").addClass("SH");
	else if(secondBattingTeam == 'Gujarat Titans')
		$(".teamBLegendItem").addClass("GT");
	else if(secondBattingTeam == 'Lucknow Super Giants')
		$(".teamBLegendItem").addClass("LSG");
	

	filmanhattanPoints.map(function(item){
		if(item.InningsNo == "1" || man_chart_matchType == "Multi Day"){
			InnTeam1.push(item);
			var overNo = (overNoStart == 0) ? parseInt(item.OverNo) + 1 : parseInt(item.OverNo);
			chartDataX.push(item.OverRuns);
			inn1Scores += parseInt(item.OverRuns);
			wormInn1.push(inn1Scores);
			if(item.OverNo == overNoStart)
			{
				if(firstBattingTeam == 'Chennai Super Kings')
					colorAr.push("#ffb90e");
				else if(firstBattingTeam == 'Delhi Capitals')
					colorAr.push("#282968");
				else if(firstBattingTeam == 'Punjab Kings')
					colorAr.push("#d71920");
				else if(firstBattingTeam == 'Kolkata Knight Riders')
					colorAr.push("#6616b7");
				else if(firstBattingTeam == 'Mumbai Indians')
					colorAr.push("#004f9a");
				else if(firstBattingTeam == 'Rajasthan Royals')
					colorAr.push("#ff5692");
				else if(firstBattingTeam == 'Royal Challengers Bangalore' || firstBattingTeam == 'Royal Challengers Bengaluru')
					colorAr.push("#2b2a29");
				else if(firstBattingTeam == 'Sunrisers Hyderabad')
					colorAr.push("#e2520e");
				else if(firstBattingTeam == 'Gujarat Titans')
					colorAr.push("#77c7f2");
				else if(firstBattingTeam == 'Lucknow Super Giants')
					colorAr.push("#1c982c");					
				else
					colorAr.push("#58508d");
			}
				
				
			if(inn1WicketsData[0] == undefined) inn1WicketsData[0] = [];
			inn1WicketsData[0][0] = "InningsOneWickets0";
			if(inn1WormWicketsData[0] == undefined) inn1WormWicketsData[0] = [];
			inn1WormWicketsData[0][0] = "InningsOneWickets0";
			inn1WormWicketsData[0][1] = 0;
			
			item.Wickets = parseInt(item.Wickets);
			if(item.Wickets != 0)
			{
				if(item.Wickets == 1){
					inn1WicketsData[0][overNo] = item.OverRuns + 1;
					inn1WormWicketsData[0][overNo+1] = inn1Scores;
				}
				else
				{
					for(var i=0;i<item.Wickets;i++)
					{
						if(inn1WicketsData[i] == undefined) inn1WicketsData[i] = [];
						inn1WicketsData[i][0] = "InningsOneWickets"+i;
						inn1WicketsData[i][overNo] = item.OverRuns + i + 1;

						if(inn1WormWicketsData[i] == undefined) inn1WormWicketsData[i] = [];
						inn1WormWicketsData[i][0] = "InningsOneWickets"+i;
						inn1WormWicketsData[i][1] = 0;
						inn1WormWicketsData[i][overNo+1] = inn1Scores + (i*10);

					}
				}
			}
			else{
				inn1WicketsData[0][overNo] = item.Wickets;
				inn1WormWicketsData[0][overNo+1] = item.Wickets;
			}
				
			// toolTipContent = "<p class='mchart-teamname'>"+firstBattingTeam+"</p><p class='mchart-overno'><span class='mchart-label'>Over No: </span>"+overNo+"<span class='mchart-label'> Bowled By: </span>"+item.Bowler+" - "+item.BowlerRuns+"/"+item.Wickets+"</p>";
		 //    if(toolTipInn1[overNo] == undefined)
		 //    	toolTipInn1[overNo] = toolTipContent;
		 //    else
		 //    	toolTipInn1[overNo] = toolTipInn1[overNo] + "<span class='mchart-overno'> "+item.Bowler+" - "+item.BowlerRuns+"/"+item.Wickets+"</span>";
		}
		if(item.InningsNo == "2" && man_chart_matchType != "Multi Day"){
			InnTeam2.push(item);
			var overNo = (overNoStart == 0) ? parseInt(item.OverNo) + 1 : parseInt(item.OverNo);
			chartDataY.push(item.OverRuns);
			inn2Scores += parseInt(item.OverRuns);
			wormInn2.push(inn2Scores);
			if(item.OverNo == overNoStart){
				if(secondBattingTeam == 'Chennai Super Kings')
					colorAr.push("#ffb90e");
				else if(secondBattingTeam == 'Delhi Capitals')
					colorAr.push("#282968");
				else if(secondBattingTeam == 'Punjab Kings')
					colorAr.push("#d71920");
				else if(secondBattingTeam == 'Kolkata Knight Riders')
					colorAr.push("#6616b7");
				else if(secondBattingTeam == 'Mumbai Indians')
					colorAr.push("#004f9a");
				else if(secondBattingTeam == 'Rajasthan Royals')
					colorAr.push("#ff5692");
				else if(secondBattingTeam == 'Royal Challengers Bangalore' || secondBattingTeam == 'Royal Challengers Bengaluru')
					colorAr.push("#2b2a29");
				else if(secondBattingTeam == 'Sunrisers Hyderabad')
					colorAr.push("#e2520e");
				else if(secondBattingTeam == 'Gujarat Titans')
					colorAr.push("#77c7f2");
				else if(secondBattingTeam == 'Lucknow Super Giants')
					colorAr.push("#1c982c");	
				else
					colorAr.push("#ffa600");
			}
				
			if(inn2WicketsData[0] == undefined) inn2WicketsData[0] = [];
			inn2WicketsData[0][0] = "InningsTwoWickets0";
			if(inn2WormWicketsData[0] == undefined) inn2WormWicketsData[0] = [];
			inn2WormWicketsData[0][0] = "InningsTwoWickets0";
			inn2WormWicketsData[0][1] = 0;
			
			item.Wickets = parseInt(item.Wickets);
			if(item.Wickets != 0)
			{
				if(item.Wickets == 1){
					inn2WicketsData[0][overNo] = item.OverRuns + 1;
					inn2WormWicketsData[0][overNo+1] = inn2Scores;
				}
				else
				{
					for(var i=0;i<item.Wickets;i++)
					{
						if(inn2WicketsData[i] == undefined) inn2WicketsData[i] = [];
						inn2WicketsData[i][0] = "InningsTwoWickets"+i;
						inn2WicketsData[i][overNo] = item.OverRuns + i + 1;

						if(inn2WormWicketsData[i] == undefined) inn2WormWicketsData[i] = [];
						inn2WormWicketsData[i][0] = "InningsTwoWickets"+i;
						inn2WormWicketsData[i][1] = 0;
						inn2WormWicketsData[i][overNo+1] = inn2Scores + (i*10);
					}
				}
			}
			else
			{
				inn2WicketsData[0][overNo] = item.Wickets;
				inn2WormWicketsData[0][overNo+1] = item.Wickets;
			}

			// toolTipContent = "<p class='mchart-teamname'>"+secondBattingTeam+"</p><p class='mchart-overno'><span class='mchart-label'>Over No: </span>"+overNo+"<span class='mchart-label'> Bowled By: </span>"+item.Bowler+" - "+item.BowlerRuns+"/"+item.Wickets+"</p>";
			// if(toolTipInn2[overNo] == undefined)
		 //    	toolTipInn2[overNo] = toolTipContent;
		 //    else
		 //    	toolTipInn2[overNo] = toolTipInn2[overNo] + "<span class='mchart-overno'> "+item.Bowler+" - "+item.BowlerRuns+"/"+item.Wickets+"</span>";

		}
	});
	var Innings1Overs = 0;
	var Innings2Overs = 0;
	if(InnTeam1 != undefined && InnTeam1.length > 0)
		Innings1Overs = (InnTeam1[InnTeam1.length-1].OverNo != undefined) ? parseInt(InnTeam1[InnTeam1.length-1].OverNo):0;
	if(InnTeam2 != undefined && InnTeam2.length > 0)
		Innings2Overs = (InnTeam2[InnTeam2.length-1].OverNo != undefined) ? parseInt(InnTeam2[InnTeam2.length-1].OverNo):0;

	var maxOvers = (Innings1Overs > Innings2Overs) ? parseInt(Innings1Overs) + 1: parseInt(Innings2Overs) + 1;

	for(var i=0;i<maxOvers;i++){
		OverNo_Arr.push(i+1);
		var overToolTip = "<div class='customToolTip'>";
		overToolTip += (toolTipInn1[i+1] != undefined) ? toolTipInn1[i+1]:'';
		if(toolTipWicInn1[i+1] != undefined){
			for(var w=0;w<toolTipWicInn1[i+1].length;w++){
				overToolTip += (toolTipWicInn1[i+1][w] != undefined) ? toolTipWicInn1[i+1][w]:'';
			}
		}
		overToolTip += (toolTipInn2[i+1] != undefined) ? toolTipInn2[i+1]:'';
		if(toolTipWicInn2[i+1] != undefined){
			for(var x=0;x<toolTipWicInn2[i+1].length;x++){
				overToolTip += (toolTipWicInn2[i+1][x] != undefined) ? toolTipWicInn2[i+1][x]:'';
			}
		}
		overToolTip += "</div>";
		chartToolTip.push(overToolTip);
	}

	//calculate Chart width dynamically based on overs
	var chartParentWidth = $("#manhattan-wrapper").width();
	var indvOverWidth = (man_chart_matchType != "Multi Day" && Innings2Overs != 0) ? 40 : 40;
	var totalChartWidth = indvOverWidth * maxOvers;
	if(totalChartWidth > chartParentWidth){
		$("#smipl-manhattan").css("width",totalChartWidth+"px");
	}
		
	var chartData = [];
	chartData[0] = chartDataX;
	chartData[1] = chartDataY;

	var chartWormData = [];
	chartWormData[0] = wormInn1;
	chartWormData[1] = wormInn2;

	for(var i=0;i<inn1WicketsData.length;i++)
	{
		for(var j=0;j<inn1WicketsData[i].length;j++)
		{
			if(inn1WicketsData[i][j] == undefined){
				inn1WicketsData[i][j] = 0;
			} 
		}
		chartData.push(inn1WicketsData[i]);
		if(firstBattingTeam == 'Chennai Super Kings')
			colorAr.push("#ffb90e");
		else if(firstBattingTeam == 'Delhi Capitals')
			colorAr.push("#282968");
		else if(firstBattingTeam == 'Punjab Kings')
			colorAr.push("#d71920");
		else if(firstBattingTeam == 'Kolkata Knight Riders')
			colorAr.push("#6616b7");
		else if(firstBattingTeam == 'Mumbai Indians')
			colorAr.push("#004f9a");
		else if(firstBattingTeam == 'Rajasthan Royals')
			colorAr.push("#ff5692");
		else if(firstBattingTeam == 'Royal Challengers Bangalore' || firstBattingTeam == 'Royal Challengers Bengaluru')
			colorAr.push("#2b2a29");
		else if(firstBattingTeam == 'Sunrisers Hyderabad')
			colorAr.push("#e2520e");
		else if(firstBattingTeam == 'Gujarat Titans')
			colorAr.push("#77c7f2");
		else if(firstBattingTeam == 'Lucknow Super Giants')
			colorAr.push("#1c982c");	
		else
			colorAr.push("#ff0000");
		
		
	}
	for(var i=0;i<inn2WicketsData.length;i++)
	{
		for(var j=0;j<inn2WicketsData[i].length;j++)
		{
			if(inn2WicketsData[i][j] == undefined) {
				inn2WicketsData[i][j] = 0;
			}
		}
		chartData.push(inn2WicketsData[i]);
		if(secondBattingTeam == 'Chennai Super Kings')
			colorAr.push("#ffb90e");
		else if(secondBattingTeam == 'Delhi Capitals')
			colorAr.push("#282968");
		else if(secondBattingTeam == 'Punjab Kings')
			colorAr.push("#d71920");
		else if(secondBattingTeam == 'Kolkata Knight Riders')
			colorAr.push("#6616b7");
		else if(secondBattingTeam == 'Mumbai Indians')
			colorAr.push("#004f9a");
		else if(secondBattingTeam == 'Rajasthan Royals')
			colorAr.push("#ff5692");
		else if(secondBattingTeam == 'Royal Challengers Bangalore' || secondBattingTeam == 'Royal Challengers Bengaluru')
			colorAr.push("#2b2a29");
		else if(secondBattingTeam == 'Sunrisers Hyderabad')
			colorAr.push("#e2520e");
		else if(secondBattingTeam == 'Gujarat Titans')
			colorAr.push("#77c7f2");
		else if(secondBattingTeam == 'Lucknow Super Giants')
			colorAr.push("#1c982c");
		else	
			colorAr.push("#ff0000");
	}
	for(var i=0;i<inn1WormWicketsData.length;i++)
	{
		for(var j=0;j<inn1WormWicketsData[i].length;j++)
		{
			if(inn1WormWicketsData[i][j] == undefined){
				inn1WormWicketsData[i][j] = 0;
			} 
		}
		chartWormData.push(inn1WormWicketsData[i]);
		colorAr.push("#ff0000");
	}
	for(var i=0;i<inn2WormWicketsData.length;i++)
	{
		for(var j=0;j<inn2WormWicketsData[i].length;j++)
		{
			if(inn2WormWicketsData[i][j] == undefined) {
				inn2WormWicketsData[i][j] = 0;
			}
		}
		chartWormData.push(inn2WormWicketsData[i]);
		colorAr.push("#ff0000");
	}
		var windwdt = $(window).width();
		var yLabelPos = "outer-right";
		if(windwdt <= 640)
			yLabelPos = "inner-right";
		var manhattanChartObj = c3.generate({
            data: {
                    columns: chartData,
                    types: {
                    	[firstBattingTeam] :'bar',
                    	[secondBattingTeam] : 'bar',
			            InnOneWickets: 'line',
			            InnTwoWickets: 'line'
			        }
            },
            axis: {
                    x: {
                        type: 'category',// this needed to load string x value
                        label: {
			                text: 'Overs',
			                position: 'outer-right'
			            },
			            categories : OverNo_Arr
                    },
                    y: {
                     	label: {
			                text: 'Runs',
			                position: yLabelPos
			            },
			            tick: {
			                format: function (d) {
			                    return (parseInt(d) == d) ? d : null;
			                }
			            }
			        }
            },
            bar: {
                width:6,
				spacing: 2
            },
            legend: {
		        show :false,
		        position: 'inset'
		    },
            color: {
				pattern: colorAr
			},
            tooltip: {
                contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
	              var indexval = d[0].index;
	              var tooltipHtml = chartToolTip[indexval];
	              return tooltipHtml; // formatted html as you want
                }
            },
         
            bindto : "#smipl-manhattan"
    });
	// manhattanChartObj.legend.show([firstBattingTeam,secondBattingTeam]);
		var windwdt = $(window).width();
		var yLabelPos = "outer-right";
		if(windwdt <= 640)
			yLabelPos = "inner-right";
		var alterOverNo = [];
		if(windwdt > 900 && OverNo_Arr != undefined && OverNo_Arr.length < 30)
		{
			var indx = 0;
			OverNo_Arr.map(function(item){
				alterOverNo.push(indx);
				indx++;
			});
			var xaxisSettings = {
	                        type: 'category',// this needed to load string x value
	                        label: {
				                text: 'Overs',
				                position: 'outer-right'
				            },
				            categories : alterOverNo,
				            min:1
	                    }
		}
		else
		{
			var xaxisSettings = {
	                        label: {
				                text: 'Overs',
				                position: 'outer-right'
				            },
				            min:1
	                    }
		}

		
		var wormChartObj = c3.generate({
	            data: {
	                    columns: chartWormData,
	                    types: {
				            [firstBattingTeam] :'spline',
	                    	[secondBattingTeam] : 'spline',
	                    	InnOneWickets:'line',
	                    	InnTwoWickets: 'line'
				        }
	            },
	            axis: {
	               //      x: {
	               //          type: 'category',// this needed to load string x value
	               //          label: {
				            //     text: 'Overs',
				            //     position: 'outer-right'
				            // },
				            // // min:1,
				            // categories : OverNo_Arr
	               //      },
	               		x: xaxisSettings,
	                    y: {
	                     	label: {
				                text: 'Runs',
				                position: yLabelPos
				            },
				            min:0,
				            tick: {
				                format: function (d) {
				                    return (parseInt(d) == d) ? d : null;
				                }
				            },
				             padding : {
				              bottom : 0
				            }
				            
				        }
	            },
	            legend: {
			        show :false,
			        position: 'inset'
			    },
	            color: {
					  pattern: colorAr
				},
	            tooltip: {
	                contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
	                      var indexval = d[0].index-1;
	                      var tooltipHtml = chartToolTip[indexval];
	                      return tooltipHtml; // formatted html as you want
	                }
	            },
	         
	            bindto : "#smipl-worm"
	    });
		// wormChartObj.legend.show([firstBattingTeam, secondBattingTeam]);
		
		var TeamName1 = "";var TeamName2="";
		if(firstBattingTeam != undefined && firstBattingTeam != '')
			var TeamName1 = firstBattingTeam.replace(/ /g,"-").replace(/\(/g,"-").replace(/\)/g,"-").replace(/\&/g,"-").replace(/\./g,"-");
		if(secondBattingTeam != undefined && secondBattingTeam != '')
			var TeamName2 = secondBattingTeam.replace(/ /g,"-").replace(/\(/g,"-").replace(/\)/g,"-").replace(/\&/g,"-").replace(/\./g,"-");
	   	$("#smipl-worm .c3-target-"+TeamName1+" .c3-circles").hide();
	   	$("#smipl-worm .c3-target-"+TeamName2+" .c3-circles").hide();

	   for(var i=0;i<inn1WicketsData.length;i++){
	   	$(".c3-lines.c3-lines-InningsOneWickets"+i).hide();
	   	$(".c3-legend-item-InningsOneWickets"+i).hide();
	   	 for(var j=1;j<inn1WicketsData[i].length;j++){
	   	 	index = j-1;
	   	 	if(inn1WicketsData[i][j] != 0){
	    	}
	    	else{
	    		$("#smipl-manhattan .c3-circles-InningsOneWickets"+i+" .c3-circle-"+index).hide();
	    	}

	   	 }
	   }

	   for(var i=0;i<inn2WicketsData.length;i++){
	   	$(".c3-lines.c3-lines-InningsTwoWickets"+i).hide();
	   	$(".c3-legend-item-InningsTwoWickets"+i).hide();
	   	 for(var j=1;j<inn2WicketsData[i].length;j++){
	   	 	index = j-1;
	   	 	if(inn2WicketsData[i][j] != 0){
	    	}
	    	else{
	    		$("#smipl-manhattan .c3-circles-InningsTwoWickets"+i+" .c3-circle-"+index).hide();
	    	}

	   	 }
	   }	

	   for(var i=0;i<inn1WormWicketsData.length;i++){
	   	$(".c3-lines.c3-lines-InningsOneWickets"+i).hide();
	   	$(".c3-legend-item-InningsOneWickets"+i).hide();
	   	 for(var j=1;j<inn1WormWicketsData[i].length;j++){
	   	 	index = j-1;
	   	 	if(inn1WormWicketsData[i][j] != 0){
	    	}
	    	else{
	    		$("#smipl-worm .c3-circles-InningsOneWickets"+i+" .c3-circle-"+index).hide();
	    	}

	   	 }
	   }

	   for(var i=0;i<inn2WormWicketsData.length;i++){
	   	$(".c3-lines.c3-lines-InningsTwoWickets"+i).hide();
	   	$(".c3-legend-item-InningsTwoWickets"+i).hide();
	   	 for(var j=1;j<inn2WormWicketsData[i].length;j++){
	   	 	index = j-1;
	   	 	if(inn2WormWicketsData[i][j] != 0){
	    	}
	    	else{
	    		$("#smipl-worm .c3-circles-InningsTwoWickets"+i+" .c3-circle-"+index).hide();
	    	}

	   	 }
	   }	

	if(redrawCustomChanges){
		redrawCustomChanges = false;
		setTimeout(function(){
			customChangesInManhattan(firstBattingTeam,secondBattingTeam,inn1WicketsData,inn2WicketsData,man_chart_matchType,Innings2Overs,inn1WormWicketsData,inn2WormWicketsData);
				
			var chartMaxHt = $("#smipl-manhattan").css("max-height");
			chartMaxHt = chartMaxHt.replace("px", "");
			chartMaxHt = parseInt(chartMaxHt) + 40;

			$("#smipl-manhattan").css("max-height",chartMaxHt+"px");
			var windowWdt = $(window).width();
			if(windowWdt > 640){
				if(LoadType != 'refresh'){
					$("#smipl-manhattan-wrap").niceScroll({ cursorcolor: "#999",autohidemode:false, cursorwidth: "3px",cursorborder:"0px",cursorborderradius : "0px", cursorfixedheight: 50, smoothscroll: true });
					setTimeout(function(){
						$("#smipl-manhattan-wrap").getNiceScroll().resize();
					},1000);
				}
				else
					$("#smipl-manhattan-wrap").getNiceScroll().resize();
			}
			
			// $("#smipl-manhattan").css("width","100%");	

			
		},2000);
	}
	
}

function customChangesInManhattan(firstBattingTeam,secondBattingTeam,inn1WicketsData,inn2WicketsData,man_chart_matchType,Innings2Overs,inn1WormWicketsData,inn2WormWicketsData){

   for(var i=0;i<inn1WicketsData.length;i++){
   	$(".c3-lines.c3-lines-InningsOneWickets"+i).hide();
   	$(".c3-legend-item-InningsOneWickets"+i).hide();
   	 for(var j=1;j<inn1WicketsData[i].length;j++){
   	 	index = j-1;
   	 	if(inn1WicketsData[i][j] != 0){
   	 		if(man_chart_matchType != "Multi Day" && Innings2Overs != 0)
   	 		{
   	 			var cx = $("#smipl-manhattan .c3-circles-InningsOneWickets"+i+" .c3-circle-"+index).attr("cx");
	    		cx = cx-3.5;
	    		$("#smipl-manhattan .c3-circles-InningsOneWickets"+i+" .c3-circle-"+index).attr("cx",cx);
				$("#smipl-manhattan .c3-circles-InningsOneWickets"+i+" .c3-circle-"+index).show();
   	 		}
    		
    	}
    	else{
    		$("#smipl-manhattan .c3-circles-InningsOneWickets"+i+" .c3-circle-"+index).hide();
    	}

   	 }
   }

   for(var i=0;i<inn2WicketsData.length;i++){
   	$(".c3-lines.c3-lines-InningsTwoWickets"+i).hide();
   	$(".c3-legend-item-InningsTwoWickets"+i).hide();
   	 for(var j=1;j<inn2WicketsData[i].length;j++){
   	 	index = j-1;
   	 	if(inn2WicketsData[i][j] != 0){
   	 		if(man_chart_matchType != "Multi Day" && Innings2Overs != 0){
   	 			var cx = $("#smipl-manhattan .c3-circles-InningsTwoWickets"+i+" .c3-circle-"+index).attr("cx");
	    		cx = parseInt(cx)+3.5;
	    		$("#smipl-manhattan .c3-circles-InningsTwoWickets"+i+" .c3-circle-"+index).attr("cx",cx);
				$("#smipl-manhattan .c3-circles-InningsTwoWickets"+i+" .c3-circle-"+index).show();
   	 		}
    	}
    	else{
    		$("#smipl-manhattan .c3-circles-InningsTwoWickets"+i+" .c3-circle-"+index).hide();
    	}

   	 }
   }	
   for(var i=0;i<inn1WormWicketsData.length;i++){
	   	$(".c3-lines.c3-lines-InningsOneWickets"+i).hide();
	   	$(".c3-legend-item-InningsOneWickets"+i).hide();
	   	 for(var j=1;j<inn1WormWicketsData[i].length;j++){
	   	 	index = j-1;
	   	 	if(inn1WormWicketsData[i][j] != 0){
	    	}
	    	else{
	    		$("#smipl-worm .c3-circles-InningsOneWickets"+i+" .c3-circle-"+index).hide();
	    	}

	   	 }
	   }

	   for(var i=0;i<inn2WormWicketsData.length;i++){
	   	$(".c3-lines.c3-lines-InningsTwoWickets"+i).hide();
	   	$(".c3-legend-item-InningsTwoWickets"+i).hide();
	   	 for(var j=1;j<inn2WormWicketsData[i].length;j++){
	   	 	index = j-1;
	   	 	if(inn2WormWicketsData[i][j] != 0){
	    	}
	    	else{
	    		$("#smipl-worm .c3-circles-InningsTwoWickets"+i+" .c3-circle-"+index).hide();
	    	}

	   	 }
	   }	
   redrawCustomChanges = true;
}

/******* momentum graph ******/
function momentum(OverNo_Arr,BattingTeam_Arr,BowlingTeam_Arr,TooltipAr, colorArr){	
	var windowWdt = $(window).width();
	if(windowWdt < 400)
	{
		var momentumXaxis = {
			label: 'Over',
			tick: {
		    	 culling: {
			        max: 1
			      }
		    }
			
		}
	}
	else
	{
		var momentumXaxis = {
			label: 'Over',
			type: 'category', 
			categories : OverNo_Arr,
		}
	}

	var momentumXaxis = {
			label: 'Over',
			type: 'category', 
			categories : OverNo_Arr,
		}
		
	var chart = c3.generate({
		bindto: '#momentumChart',
		data: {
		  columns: [
		  BattingTeam_Arr,
		  BowlingTeam_Arr 
		  ],
		  type: 'bar',
		  // type: 'area-spline', 
		   groups: [
				[BattingTeam_Arr[0], BowlingTeam_Arr[0]]
			]
		}, 
		legend: {
			 show: false		 
		},
		 tooltip: {
			  contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
					var indexval = d[0].index;
					var tooltipHtml = TooltipAr[indexval];
					return tooltipHtml; // formatted html as you want
			  }
			},
		//color: {    pattern: ['#fd0000', '#34495e'] },
		color: { pattern: colorArr},
		 axis: {
			  x: momentumXaxis,
			y: {
				// max:95,
				min : 0,
	            padding : {
	              bottom : 0
	            },
			    label: 'Momentum' 
			}
		},
		bar: {
		  width: {
			ratio: 0.2
		  }
		}
	});
	$(".pageloader").removeClass('active');
}
/******* score potential ******/
function drawPotential(OverNo_Arr,ScorePotential_Arr,TooltipAr,colorArr){  
   var chart = c3.generate({
    bindto: '#potentialChart',
    size: {
        width: $("#potentialChart").width()
    },
    data: {
      	columns: [
        	ScorePotential_Arr
      	],
      	type: 'area-spline', 
    },
    //x: {categories : OverNo_Arr,		},				
	//y: { label: 'Score Potential'}	,
	groups:[
				['Dummy', '']
		  	],	
	axis:{
			x: {
				 	//label: 'Overs' ,
					type: 'category', 
					categories : OverNo_Arr,
			 	},				
			y: { //label: 'Score Potential'
			}			
		},
	tooltip: {
	  	contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
			var indexval = d[0].index;
			var tooltipHtml = TooltipAr[indexval];
			return tooltipHtml; // formatted html as you want
	  	}
	},
  	color: {  pattern: colorArr },
	area: {
			// zerobased: false
	},
	legend: {
   		show: false
	}
	});

   $(".pageloader").removeClass('active');

}

function winlossProb(WinOverNo_arr,WinBatWinLoss_arr,WinBowlWinLoss_arr,TooltipAr,colorArr){	  
	   var chart = c3.generate({
		bindto: '#winloss_prb',
		size: {
	        width: $("#winloss_prb").width()
	    },
		data: {
		  columns: [
			WinBatWinLoss_arr,WinBowlWinLoss_arr
		  ],
		  type: 'area-spline', 
		},

		//x: {categories : OverNo_Arr,		},				
		//y: { label: 'Score Potential'}	,
		color: {    pattern: colorArr },
	groups: [
				['Dummy', '']
			  ],	
		axis: {
			x: {
				//tick: {			  values: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20],			},
				// label: 'Overs' ,	
				 type: 'category', 
				 categories : WinOverNo_arr,
				 tick: {
				  centered: true,
				   culling: {max: 20},
				   multiline:false,
				},
				 },				
			y: {//label: 'WinLoss Probability'
			}			
				},
					tooltip: {
			  contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
					var indexval = d[0].index;
					var tooltipHtml = TooltipAr[indexval];
					return tooltipHtml; // formatted html as you want
			  }
			},
			
		 //color: {    pattern: ['#524674', '#df5042'] },
		area: {
	 // zerobased: false
	},
	legend: {
		   show: false
		}
	});

}

/******* get value from URL ******/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/******* apply source to paly video ******/
function playVideoFile(src){
	if(mejs.players.length == 0 || mejs.players.length == undefined)
	{
		player.setSrc(src);
		var ua = navigator.userAgent.toLowerCase(); 
		var windwdt = $(window).width();
		
		if ((ua.indexOf('safari') != -1) && windwdt < 767) { 
			if(!videoPlayFirstClick)
			{
				setTimeout(function() {
						player.load();
					player.play();
				},1000);
			}
			else
			{
				player.load();
				player.play();
				videoPlayFirstClick =false;
			}
		}
		else
		{
			setTimeout(function() {
					player.load();
				player.play();
			},1000);
		}
	}
	else
	{
		for (var pl in mejs.players) {
		  mejs.players[pl].media.setSrc(src);
		  mejs.players[pl].media.load();
		  mejs.players[pl].media.play();
		}
	}
	var parentWidth = $('.playlistWrap').width();
	var listwidth = $('.mejs-list').width();
	var pixel = parentWidth / 50; 
	screenBallCount = parseInt(pixel);
	screenBallWd = screenBallCount * 1;
	// jQuery('html, body').animate({scrollTop: 0}, 500);
	setTimeout(function() {
		 $('.mejs-list li:first-child').addClass('current');
		 currentBall = $('.mejs-list li:first-child').attr('id');
	}, 2000);

	$(".livescoreBoxLayout").addClass("active");
	// if(!dsliderinit)
	// 	invoke3dSlider();

    var windowWdt = $(window).width();
    if(windowWdt > 1024 && !$(".mcDetails").hasClass("active"))
    {
        $(".mcDetails").addClass("active");
        $(".batMc").removeClass("active");
        $(".bowlMc").addClass("active");
        $(".batTableWrap").addClass("active");
        $(".bowlTableWrap").removeClass("active");
        $(".downloadPopUpWrap").removeClass("active");
        $(".playlistWrap").removeClass("active");
            setTimeout(function(){
                $(".playlistWrap").addClass("inactive");    
            },1900);
        //$(".batTableWrap").niceScroll({cursorborder:"",cursorcolor:"#fff",cursorwidth: "5px",autohidemode:false,cursorfixedheight:100,smoothscroll:true}); 
        setTimeout(function(){
            $(".mcDetails .batTableWrap").niceScroll({ cursorcolor: "#999",autohidemode:false, cursorwidth: "3px",cursorborder:"0px",cursorborderradius : "0px", cursorfixedheight: 50, smoothscroll: true });
            $(".mcDetails .batTableWrap").getNiceScroll().show();
            $(".mcDetails .batTableWrap").getNiceScroll().resize();
          },1000);
    }
}
/******* play next video ******/
function playnextvideo(currentPlayer,type){
	if(type=='init'){
		$(".customControlsWrap").removeClass("inactive");
		$(".playlistWrap").removeClass("inactive");
		$(".nextBall").removeClass("inactive");
		$(".mejs-controls").removeClass("inactive");
		$(".cd-popup-close").removeClass("inactive");
		var current_item = $('.mejs-list li:first'); // :first is added if we have few .current classes
		var nextvideosrc = $(current_item).attr('data-value');
		$(current_item).addClass('current');
		currentBall = $(current_item).attr('id');
	/*	currentPlayer.setSrc(nextvideosrc);
		currentPlayer.load();	
		currentPlayer.play();*/
		
		if(mejs.players.length == 0 || mejs.players.length == undefined)
		{
			currentPlayer.setSrc(nextvideosrc);
			currentPlayer.load();
			currentPlayer.play();
		}
		else
		{
			for (var pl in mejs.players) {
			  mejs.players[pl].media.setSrc(nextvideosrc);
			  mejs.players[pl].media.load();
			  mejs.players[pl].media.play();
			}
		}
		
	}
	else{
		if($(".mejs-list li.current").length>0){
			var current_item = $('.mejs-list li.current:first'); // :first is added if we have few .current classes
			if($(current_item).next().length > 0)
			{
				var nextvideosrc = $(current_item).next().attr('data-value');
				$(current_item).removeClass('current')
				$(current_item).next().addClass('current');
				currentBall = $(current_item).next().attr('id');
				/*currentPlayer.setSrc(nextvideosrc);
				currentPlayer.load();	
				currentPlayer.play();*/
				
				if(mejs.players.length == 0 || mejs.players.length == undefined)
				{
					currentPlayer.setSrc(nextvideosrc);
					currentPlayer.load();
					currentPlayer.play();
				}
				else
				{
					for (var pl in mejs.players) {
					  mejs.players[pl].media.setSrc(nextvideosrc);
					  mejs.players[pl].media.load();
					  mejs.players[pl].media.play();
					}
				}
			}
		
		}
	}
	var parentWidth=$(".playlistWrap").width();
	screenBallCount=parentWidth/50;
	screenBallWd=screenBallCount*cycle;
	var i=0;
	$(".mejs-list li").each(function(){
		i++;
		if($(this).hasClass('current')){
			if(i==screenBallWd+1){
				var listwidth = $('.mejs-list').width();
				var leftPos = $('.mejs-list').position();
				leftPos = leftPos.left;
				if(leftPos <= 0)
				{
					leftPos = Math.abs(leftPos);
					leftPos = leftPos + parentWidth;
					$('.mejs-list').css('left','-'+leftPos+'px');
					$('.prevBall').addClass('active');
					rWidth = parentWidth + leftPos;
					rWidth = listwidth - rWidth;
					if(rWidth <= 0)
						$('.nextBall').removeClass('active');
					cycle = cycle + 1;
					screenBallWd = screenBallCount * cycle;	
				}
				

			}
		}
	});
}

function applyPoster(){
    var posterImageUrl = mcpath+'videoplayer/videoposter.jpg';
    $("#videoplayer").attr('poster',posterImageUrl);
	return;
	// $.getJSON("https://freegeoip.net/json/", function (data) {
	// 	var country = data.country_code;
	// 	var ip = data.ip;
	// 	var blockedCountries = ["AF","BN","KH","CN","FJ","ID","JP","KP","KR","LA","MY","MV","MM","NP","PG","PH","SG","TW","TH","VN","AU"];
		
	// 	if(blockedCountries.indexOf(country) == -1)
	// 		$("#videoplayer").attr('poster', 'https://psl2016.s3.amazonaws.com/common/images/videoposter.jpg');
	// });
}

$(document).ready(function(){

	$(document).click(function(){
		$(".cSBList").removeClass("active");
		$(".customSelecBox").removeClass("openSBox");
		$(".inputSearchResultWrap").removeClass("active");
	});

	$(".customSelecBox,.unit_filterItemBlock,.cSBListItemsFilter,.cSBListFItems").click(function(e){
		e.stopPropagation();
	});

	$(".cd-popup").addClass("inactive");

	// // For scorecard  Tab Menu
 //    $('ul.mcTabs li').click(function () {

 //        var tab_id = $(this).attr('data-tab');
 //        $('ul.mcTabs li').removeClass('current');
 //        $('.mcTabContent').removeClass('current');
 //       	$('.playerWagonBatting').find('.mcPlyBat').removeClass('tr_show');
 //        $('.playerWagonBowling').find('.mcPlyBow').removeClass('tr_show');
 //        $(".viewBatData span").removeClass('icon-minus-squared-alt').addClass('icon-plus-squared');
 //        $(".viewBowData span").removeClass('icon-minus-squared-alt').addClass('icon-plus-squared');
 //        $(this).addClass('current');
 //        if(tab_id=='graphPage'){
 //        	 $("#" + tab_id).addClass('current');
 //        	 $("#manhattan-wrapper").addClass('active');
 //        	 $("#wagon-panel .all").trigger("click");
 //        }
 //        else{
 //        	$("#" + tab_id).addClass('current');
 //        	$("#manhattan-wrapper").removeClass('active');
 //        }
               
	// });

	 // $('body').on('click tab touch','.mcPlyOption .batOption', function() { 
	 // 	var device = findDevice();
	 // 	if(device == "ios")
  //   		$(this).trigger("click");
  //   });

	scorecardTabMenuEvents();
	// manhattan graph previous and next arrow event
	$('body').on('click tab touch', '.MHnext', function() {
        navData = [];
        navData['start'] = $(this).attr('start');
        navData['end'] = $(this).attr('end');
		$('.manhattan-nav').attr('c-start',navData['start']);
		$('.manhattan-nav').attr('c-end',navData['end']);
        loadBarChartNav(barchartData, manInn, navData);


        if (matchSummaryData.MatchType == "One Day Match") {
            var MHnextStart = parseInt($('.manhattan-nav .MHnext').attr('start'));
            var MHnextEnd = parseInt($('.manhattan-nav .MHnext').attr('end'));

            if ((MHnextStart + 20) >= 50) {
                nPrevEnd = 40;
                $('.manhattan-nav .MHnext').addClass('inactive');
				$('.manhattan-nav .MHprev').removeClass('inactive');
            }
            else {
                nMHnextEnd = 50;
                nMHnextStart = parseInt(MHnextStart) + 20;
                $('.manhattan-nav .MHnext').removeClass('inactive');
                $('.manhattan-nav .MHprev').removeClass('inactive');
                nPrevEnd = MHnextEnd - 20;
            }
            $('.manhattan-nav .MHprev').attr('start', MHnextStart - 20);
            $('.manhattan-nav .MHprev').attr('end', nPrevEnd);
            $('.manhattan-nav .MHnext').attr('start', nMHnextStart);
            $('.manhattan-nav .MHnext').attr('end', nMHnextEnd);
        }
        if (matchSummaryData.MatchType == "Multi Day") {
            var MHnextStart = parseInt($('.manhattan-nav .MHnext').attr('start'));
            var MHnextEnd = parseInt($('.manhattan-nav .MHnext').attr('end'));
			
			 nMHnextEnd = parseInt(MHnextEnd) + 20;
             nMHnextStart = parseInt(MHnextStart) + 20;
            if ((MHnextStart + 20) > OvrLength) {
                $('.manhattan-nav .MHnext').addClass('inactive');
				$('.manhattan-nav .MHprev').removeClass('inactive');
            }
            else {
                nMHnextEnd = parseInt(MHnextEnd) + 20;
                nMHnextStart = parseInt(MHnextStart) + 20;
                $('.manhattan-nav .MHnext').removeClass('inactive');
                $('.manhattan-nav .MHprev').removeClass('inactive');
            }
            $('.manhattan-nav .MHprev').attr('start', MHnextStart - 20);
            $('.manhattan-nav .MHprev').attr('end', MHnextEnd - 20);
            $('.manhattan-nav .MHnext').attr('start', nMHnextStart);
            $('.manhattan-nav .MHnext').attr('end', nMHnextEnd);
        }
		
		$('.manhattan-nav').attr('c-next-start',$('.manhattan-nav .MHnext').attr('start'));
		$('.manhattan-nav').attr('c-next-end',$('.manhattan-nav .MHnext').attr('end'));
		$('.manhattan-nav').attr('c-prev-start',$('.manhattan-nav .MHprev').attr('start'));
		$('.manhattan-nav').attr('c-prev-end',$('.manhattan-nav .MHprev').attr('end'));
		if($('.manhattan-nav .MHnext').hasClass('inactive'))
			$('.manhattan-nav').attr('c-next-inactive','true');
		else	
			$('.manhattan-nav').attr('c-next-inactive','');
		if($('.manhattan-nav .MHprev').hasClass('inactive'))
			$('.manhattan-nav').attr('c-prev-inactive','true');
		else
			$('.manhattan-nav').attr('c-prev-inactive','');
		
    });

    $('body').on('click tab touch', '.MHprev', function() {
        var start = parseInt($(this).attr('start'));
        if (start == 1) start = 0;
        var navData = [];
        navData['start'] = start;
        navData['end'] = $(this).attr('end');
		$('.manhattan-nav').attr('c-start',navData['start']);
		$('.manhattan-nav').attr('c-end',navData['end']);
        loadBarChartNav(barchartData, manInn, navData);
        if (matchSummaryData.MatchType == "One Day Match") {
            var MHprevStart = parseInt($('.manhattan-nav .MHprev').attr('start'));
            var MHprevEnd = parseInt($('.manhattan-nav .MHprev').attr('end'));
            nMHprevStart = 0;
            if ((MHprevEnd - 20) <= 0) {
                nMHprevEnd = 0;
                nNextEnd = 40;
                $('.manhattan-nav .MHprev').addClass('inactive');
				$('.manhattan-nav .MHnext').removeClass('inactive');
            }
            else {
                nMHprevStart = 1;
                nMHprevEnd = parseInt(MHprevEnd) - 20;
                nNextEnd = 50;
                $('.manhattan-nav .MHprev').removeClass('inactive');
                $('.manhattan-nav .MHnext').removeClass('inactive');
            }

            $('.manhattan-nav .MHprev').attr('start', nMHprevStart);
            $('.manhattan-nav .MHprev').attr('end', nMHprevEnd);
            $('.manhattan-nav .MHnext').attr('start', MHprevStart + 20);
            $('.manhattan-nav .MHnext').attr('end', nNextEnd);
        }
        if (matchSummaryData.MatchType == "Multi Day") {
            var MHprevStart = parseInt($('.manhattan-nav .MHprev').attr('start'));
            var MHprevEnd = parseInt($('.manhattan-nav .MHprev').attr('end'));
            nMHprevStart = parseInt(MHprevStart) - 20;
            nMHprevEnd = parseInt(MHprevEnd) - 20;
            if ((MHprevEnd - 20) <= 0) {
                $('.manhattan-nav .MHprev').addClass('inactive');
				$('.manhattan-nav .MHnext').removeClass('inactive');
            }
            else {
                $('.manhattan-nav .MHprev').removeClass('inactive');
                $('.manhattan-nav .MHnext').removeClass('inactive');
            }

            $('.manhattan-nav .MHprev').attr('start', nMHprevStart);
            $('.manhattan-nav .MHprev').attr('end', nMHprevEnd);
            $('.manhattan-nav .MHnext').attr('start', MHprevStart + 20);
            $('.manhattan-nav .MHnext').attr('end', MHprevEnd + 20);
        }
		
		$('.manhattan-nav').attr('c-next-start',$('.manhattan-nav .MHnext').attr('start'));
		$('.manhattan-nav').attr('c-next-end',$('.manhattan-nav .MHnext').attr('end'));
		$('.manhattan-nav').attr('c-prev-start',$('.manhattan-nav .MHprev').attr('start'));
		$('.manhattan-nav').attr('c-prev-end',$('.manhattan-nav .MHprev').attr('end'));
		if($('.manhattan-nav .MHnext').hasClass('inactive'))
			$('.manhattan-nav').attr('c-next-inactive','true');
		if($('.manhattan-nav .MHprev').hasClass('inactive'))
			$('.manhattan-nav').attr('c-prev-inactive','true');
    });

    $(window).load(function(){
    	$(".pageloader").removeClass('active');
    });
    // init tool tip
    // $('[data-toggle="tooltip"]').tooltip();   

    // Changing Text
    $('.iconBtn span').click(function () {
        $('.iconBtn span').removeClass('icActive');
        $(this).addClass('icActive');
        $('.reportText').hide();
        $('#' + $(this).data('content')).fadeIn(300);
    });
    function fadeInFirstContent() { $('#WR').fadeIn(300); }
    fadeInFirstContent();
    // PLUGIN 

    // For Horz Bar Graph
    $('p.growth').each(function () {
        var pc = $(this).attr('title');
        pc = pc > 100 ? 100 : pc;
        // $(this).children('.hrz-bar-bg1').html(pc + "%");      
        var ww = $(this).width();
        var len = parseFloat(ww) * parseFloat(pc) / 100;
        // $(this).children('span').animate({ 'width': len + "px" }, 1800, 'easeOutQuint');
        $(this).children('span').css({ 'width': len + "px" });
    });

    if(videoscorecard)
			{
				$(".cd-popup").removeClass("inactive");
                 $.getScript(mcpath+"js/jquery-ui.min.js", function() {
                        $.getScript(mcpath+"js/videoplayer.js", function() {
                            $.getScript(mcpath+"js/mediaelement-and-player.js", function() {
                               player = new MediaElementPlayer('#videoplayer', {
                                    success: function (mediaElement, domObject) {
                                        mediaElement.addEventListener('ended', function (e) {
                                             $("#videoplayer").attr('poster', '');
                                                playnextvideo(e.target);
                                            }, false);
                                        mediaElement.addEventListener("canplay", function () {
                                             $("#videoplayer").attr('poster', '');                                            
                                        }, false);
                                        mediaElement.addEventListener("error", function (e) {
                                            canplay = false;
                                            applyPoster(e.target);
                                        }, false);

                                        videoControlsEvents();
                                    }
                                });
                            });
                        });
                    });
                

				

			}


	           	$('body').undelegate('.overHistory', 'mouseleave')
                .delegate('.overHistory', 'mouseleave', function () {
			    	$(".BallDetails").removeClass("active");
			    	$(".BallDetailsPointericon").removeClass("active");
			    });

			    if (GetIEVersion() > 0) 
				{
					$("#matchCenter").addClass("iedevice");
				}

});

function scorecardTabMenuEvents(){
	// For scorecard  Tab Menu
    $('ul.mcTabs li').click(function () {
         var tab_id = $(this).attr('data-tab');
        $(this).parent("ul").find("li").removeClass('current');
        $('.mcTabContent').removeClass('current');
       	$('.playerWagonBatting').find('.mcPlyBat').removeClass('tr_show');
        $('.playerWagonBowling').find('.mcPlyBow').removeClass('tr_show');
        $(".viewBatData span").removeClass('icon-minus-circled').addClass('icon-plus-circled');
        $(".viewBowData span").removeClass('icon-minus-circled').addClass('icon-plus-circled');
        $(this).addClass('current');
        if(tab_id=='graphPage'){
        	 $("#" + tab_id).addClass('current');
        	 // $("#manhattan-wrapper").addClass('active');
        	 $("#wagon-panel .all").trigger("click");
        }
        else{
        	$("#" + tab_id).addClass('current');
        	// $("#manhattan-wrapper").removeClass('active');
        }

        if(tab_id == "mwpage")
        {
        	 $("#manhattan-wrapper").addClass('active');
        }
        else
        	$("#manhattan-wrapper").removeClass('active');

        if(tab_id == "playerKPI")
        {
        	$("#contentWrapperSmipl .fixWrap").addClass('fullWidth');
			$(".sidewrap").addClass('inactive');
			$("canvas").remove();
			$('ul.mcTabs li[data-tab="analytPage"]').attr("draw-type","redraw");
        }
        else
        {
   //      	$("#contentWrapperSmipl .fixWrap").removeClass('fullWidth');
			// $(".sidewrap").removeClass('inactive');
        }

        if(tab_id == "analytPage"){
        	var getType = $(this).attr('draw-type');
        	if(getType == "redraw"){
        		$(this).attr('draw-type','');
        		drawMomentumchart();
        	}
        }
               
	});

     $('body').undelegate('.scorecardTabsWrap .scorecardTabNavRight', 'click tab touch')
                .delegate('.scorecardTabsWrap .scorecardTabNavRight', 'click tab touch', function () {
    	var currentObj = $("#scorecardTabs .mcTabLink.current");
    	if($(currentObj).next(".mcTabLink").length > 0 && !$(currentObj).next(".mcTabLink").hasClass("ng-hide"))
    	{
    		$("#scorecardTabs .mcTabLink").removeClass("current");
    		$(currentObj).next(".mcTabLink").addClass("current");
    		$("#scorecardTabs .mcTabLink.current").trigger("click");
    		$('.scorecardTabsWrap .scorecardTabNavLeft').addClass("active");
    		var currentObj = $("#scorecardTabs .mcTabLink.current");
    		if($(currentObj).next(".mcTabLink").length == 0 || $(currentObj).next(".mcTabLink").hasClass("ng-hide"))
    			$('.scorecardTabsWrap .scorecardTabNavRight').removeClass("active");
    	}
    	else
    	{
    		$('.scorecardTabsWrap .scorecardTabNavRight').removeClass("active");
    	}
    });

    $('body').undelegate('.scorecardTabsWrap .scorecardTabNavLeft', 'click tab touch')
    .delegate('.scorecardTabsWrap .scorecardTabNavLeft', 'click tab touch', function () {
    	var currentObj = $("#scorecardTabs .mcTabLink.current");
    	if($(currentObj).prev().length > 0 && !$(currentObj).prev().hasClass("ng-hide"))
    	{
    		$("#scorecardTabs .mcTabLink").removeClass("current");
    		$(currentObj).prev().addClass("current");
    		$("#scorecardTabs .mcTabLink.current").trigger("click");
    		$('.scorecardTabsWrap .scorecardTabNavRight').addClass("active");
    		var currentObj = $("#scorecardTabs .mcTabLink.current");
    		if($(currentObj).prev().length == 0 || $(currentObj).prev().hasClass("ng-hide"))
    			$('.scorecardTabsWrap .scorecardTabNavLeft').removeClass("active");
    	}
    	else
    	{
    		$('.scorecardTabsWrap .scorecardTabNavLeft').removeClass("active");
    	}
    });

    
    $('body').undelegate('#liveStreamPlayer', 'click tab touch')
    .delegate('#liveStreamPlayer', 'click tab touch', function () {
    	$(".briefscoreOverlay").removeClass("active");

    });


    $('body').undelegate('.socialShare_widget_Items.fbshare', 'click tab touch')
    .delegate('.socialShare_widget_Items.fbshare', 'click tab touch', function () {
    		var pageurl = $(this).attr('data-val');
    		
    		var currentactivepage = $(".tabLinkscontainer li.current").attr("data-value");
			if(currentactivepage == 'fixture')
				pageurl = "fixtures.html";
			else if(currentactivepage == 'result')
				pageurl = "results.html";
			else if(currentactivepage == 'stats')
				pageurl = "stats.html";
			else
				pageurl = "matchcentre.html";
				var u = basePath + pageurl;
				
			var t = $(".page-header .page-title").text();
			var link = u;
			var subject = t;
			var description = "";
			if(description.length > 80)
				description = description.substr(0, 80) + '...';
			var newsImage = "";
			// FacebookPost(link,subject,description,newsImage);
			window.open('https://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'_blank');
		});	

	$('body').undelegate('.socialShare_widget_Items.twittershare', 'click tab touch')
    .delegate('.socialShare_widget_Items.twittershare', 'click tab touch', function () {
			var pageurl = $(this).attr('data-val');
    		var currentactivepage =  $(".tabLinkscontainer li.current").attr("data-value");
			if(currentactivepage == 'fixture')
				pageurl = "fixtures.html";
			else if(currentactivepage == 'result')
				pageurl = "results.html";
			else if(currentactivepage == 'stats')
				pageurl = "stats.html";
			else
				pageurl = "matchcentre.html";
    		var u = basePath + pageurl;
			var twtLink = 'http://twitter.com/home?status=' + u;
			window.open(twtLink, '_blank');
		});

    	 $('body').undelegate('#printScorecardIcon', 'click')
                .delegate('#printScorecardIcon', 'click', function () {
                	$("body").removeClass("kpiPrint");
			$("body").removeClass("statsPrint");
			$("body").addClass("scorecardPrint");
			window.print();
		});

        $('body').undelegate('.kpiPrintLink', 'click')
                .delegate('.kpiPrintLink', 'click', function () {
			$("body").removeClass("statsPrint");
			$("body").removeClass("scorecardPrint");
			$("body").addClass("kpiPrint");
			window.print();
		});

         $('body').undelegate('.statsPrintIcon', 'click')
                .delegate('.statsPrintIcon', 'click', function () {
                	$("body").removeClass("kpiPrint");
			$("body").removeClass("scorecardPrint");
			$("body").addClass("statsPrint");
			// var seasonText = $('#seasonBox select option:selected').text();
			// 	$(".displayForPrint.showSeasonName").text(seasonText);
			// var statsBatText = $('#mcTourBattingStats select option:selected').text();
			// 	$(".displayForPrint.showBatName").text(statsBatText);
			// var statsBowlText = $('#mcTourBowlingStats select option:selected').text();
			// 	$(".displayForPrint.showBowlName").text(statsBowlText);
			window.print();
		});

	     $('body').undelegate('#tournamentStatsWrapper .statsExportExcelIcon', 'click')
	                .delegate('#tournamentStatsWrapper .statsExportExcelIcon', 'click', function () {
	                	var  statsTable = $("#tournamentStatsWrapper .tabTourContent.current .js-statsTableWrap").html();
	                	var currentTitle = $(".tabTourContent.current .mcSelectDefault").val();
	                	currentTitle = $(".tabTourContent.current .mcSelectDefault option[value='"+currentTitle+"']").attr("label");
	                	var compVal = $("select.mcSelectDefault.competitionList").val();
	                	var comptName = $("select.mcSelectDefault.competitionList option[value='"+compVal+"']").attr("label");
						$("#exportTableWrap").hide();
						$("#exportTableWrap").html(statsTable);
						$("#exportTableWrap table").attr("id","exportTable");
				        $('#exportTable').DataTable({
		                    dom: 'Bfrtip',
		                    buttons: [
		                        {
		                            extend: 'excel',
		                           	title: comptName+"-"+currentTitle
		                            //filename: 'Stats'
		                        },
		                    ],
		                     "aaSorting": []
		                });
	          setTimeout(function(){
	          	$("#exportTableWrap .buttons-excel").trigger("click");
	          },1000)
		});     

		$('body').undelegate('#teamStatsWrapper .statsExportExcelIcon', 'click')
	                .delegate('#teamStatsWrapper .statsExportExcelIcon', 'click', function () {
	                	var  statsTable = $("#teamStatsWrapper .tabTeamContent.current").html();
	                	var teamVal = $("select.mcSelectDefault.teamstatsFilter").val();
	                	var teamName = $("select.mcSelectDefault.teamstatsFilter option[value='"+teamVal+"']").attr("label");
	                	var statsTitle = $(".roleTab.teamTab li.current span").text();
	                	$("#exportTableWrap").hide();
						  $("#exportTableWrap").html(statsTable);
						  $("#exportTableWrap table").attr("id","exportTable");
				          $('#exportTable').DataTable({
	                    dom: 'Bfrtip',
	                    buttons: [
	                        {
	                            extend: 'excel',
	                            title: teamName+"-"+statsTitle
	                            //filename: 'Stats'
	                        }
	                    ],
	                     "aaSorting": []
	                });
	          setTimeout(function(){
	          	$("#exportTableWrap .buttons-excel").trigger("click");
	          },1000)
		});     

		$('body').undelegate('.matchNav', 'click')
	                .delegate('.matchNav', 'click', function () {
			  $('body').toggleClass('noScroll');
			  $(".matchHead .back").toggleClass("inactive");
			  $(this).toggleClass('openDev');
			  $('#scorecardWrapper .matchNavContent').toggleClass('active');
		});

}

function drawMomentumchart() {
	$("#momCanvas").html("");
	$("#momCanvas").append('<canvas id="momentumChartcanvas" style=""></canvas>');
	$("#momCanvas").css("margin-bottom","10px");
	var canvas = document.getElementById("momentumChartcanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	window.myBar = new Chart(ctx, {
		type: 'bar',
		data: momentumData,
		options: {
			// title:{
			// 	display:true,
			// 	text:""
			// },
			tooltips: {
				mode: 'label'
			},
			responsive: true,
			scales: {
				xAxes: [{
					stacked: true,
					scaleLabel: {
			        display: true,
			        labelString: 'Overs'
			      }
				}],
				yAxes: [{
					stacked: true,scaleLabel: {
			        display: true,
			        labelString: 'Momentum'
			      }
				}
				
				]
			}
		}
	});
}




var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
        //setInterval(function(){gallery.next();},8000);
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};


function siteEvents(){
    $(".videoBlock  .videoThumb").click(function(){
    	var caption = $(this).find(".videocaptionValue").val();
        $(".cd-popup-container .videocaption").text(caption);
        $(".cd-popup").addClass("active");  
        $(".customControlsWrap").addClass("inactive");
        $(".playlistWrap").addClass("inactive");
        var src = $(this).find(".playvideo").attr("data-videosrc");

        if(mejs.players.length == 0 || mejs.players.length == undefined)
        {
            player.setSrc(src);
            player.load();
            player.play();
        }
        else
        {
            for (var pl in mejs.players) {
              mejs.players[pl].media.setSrc(src);
              mejs.players[pl].media.load();
              mejs.players[pl].media.play();
            }
        }
       
        
    });

    $(".newsDetailsSection .tabBlock .tabItems").click(function(){
        $(".newsDetailsSection .tabBlock .tabItems").removeClass("active");
        $(this).addClass("active");
        var type = $(this).attr("data-val");
        $(".newsDetailsSection .langContent").removeClass("active");
        $(".newsDetailsSection .langContent."+type).addClass("active");
    });


    
}

function findDevice(){
			var isMobile = {
			    Android: function() {
			        return navigator.userAgent.match(/Android/i);
			    },
			    BlackBerry: function() {
			        return navigator.userAgent.match(/BlackBerry/i);
			    },
			    iOS: function() {
			        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			    },
			    Opera: function() {
			        return navigator.userAgent.match(/Opera Mini/i);
			    },
			    Windows: function() {
			        return navigator.userAgent.match(/IEMobile/i);
			    },
			    any: function() {
			        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			    }
			};
			var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
		
				
			if(isMobile.iOS() || isSafari) 
   			{
				$("#matchCenter").addClass("deviceios");
				return "ios";
			}
			else if(isMobile.Android())
			{
				$("#matchCenter").addClass("deviceandroid");
				return "android";
			}

		}

		function invoke3dSlider(){
			var carouselCustomeTemplateProps =  {
			 		  width: 200, 				/* largest allowed width */
					  height: 150, 				/* largest allowed height */
					  slideLayout : 'fill',     /* "contain" (fit according to aspect ratio), "fill" (stretches object to fill) and "cover" (overflows box but maintains ratio) */
					  animation: 'slide3D', 	/* slide | scroll | fade | zoomInSlide | zoomInScroll */
					  animationCurve: 'ease',
					  animationDuration: 1900,
					  animationInterval: 2000,
					  slideClass: 'jR3DCarouselCustomSlide',
					  autoplay: true,
					  controls: true,			/* control buttons */
					  navigation: ''			/* circles | squares | '' */,
					  perspective: 2200,
					  rotationDirection: 'ltr',
					  onSlideShow: slideShownCallback
						  
				}
				function slideShownCallback($slide){
					
				}

				jR3DCarouselCustomeTemplate = $('.jR3DCarouselGalleryCustomeTemplate').jR3DCarousel(carouselCustomeTemplateProps);
				if($(".livescoreBoxLayout").length > 0)
					dsliderinit = true;
		}

		function GetIEVersion() {
		  var sAgent = window.navigator.userAgent;
		  var Idx = sAgent.indexOf("MSIE");

		  // If IE, return version number.
		  if (Idx > 0) 
		    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

		  // If IE 11 then look for Updated user agent string.
		  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
		    return 11;

		  else
		    return 0; //It is not IE
		}


		function dynamicallyLoadScript(url) {
            var script = document.createElement("script"); // Make a script DOM node
            script.src = url; // Set it's src to the provided URL

            document.body.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
        }

        function titleCase(str) {
		  str = str.toLowerCase().split(' ');
		  for (var i = 0; i < str.length; i++) {
		  	if((str[i].length == 2 || str[i].length == 3) && jQuery.inArray( str[i], playerInitials ) != -1)
		    	str[i] = str[i].toUpperCase(); 
		    else
		    	str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
		  }
		  var tStr = str.join(' ');
		  if(tStr.includes("(ip)"))
			  tStr = tStr.replace("(ip)", "(IP)");
		  if(tStr.includes("(rp)"))
			  tStr = tStr.replace("(rp)", "(RP)");
		  if(tStr.includes("Ms Dhoni"))
			  tStr = tStr.replace("Ms Dhoni", "MS Dhoni");
		  if(tStr.includes("Mcgurk"))
			  tStr = tStr.replace("Mcgurk", "McGurk");
		  
		  return tStr;
		}
		function outDescTitleCase(str) {
		 var outDescKeys = ['c','st','b','lbw','not','run'];
		 var outDescMidKeys = ['obstructing','the','field'];
		  str = str.toLowerCase().split(' ');
		  var bcounts = 0;
		  var bcountsPos = [];
		  for(var i = 0; i < str.length; i++){
			    if(str[i] == 'b'){
			    	bcountsPos.push(i);
			    	bcounts++;
			    }			        
			}
			var bPosFound = [];
			if(bcounts == 1 && str.indexOf("b") != 0){
				var bpos = str.indexOf("b");
				bPosFound.push(bpos);
			}
			if(bcounts == 2 && str.indexOf("b") != 0){
				var bpos = (bcountsPos[1] != undefined) ? bcountsPos[1] : "";
				if(bpos != "")
					bPosFound.push(bpos);
			}
			else if(bcounts == 2 && str.indexOf("b") == 0)
			{
				var bpos = str.indexOf("b");
				bPosFound.push(bpos);
			}
				
		  for (var i = 0; i < str.length; i++) {
		  	if(i == 0 && (str[i].length == 1 || str[i].length == 2 || str[i].length == 3) && jQuery.inArray( str[i], outDescKeys ) != -1 )
		  		str[i] = str[i].toLowerCase(); 
		  	else if(i==1 && (str[i].length == 3) && str[i] == 'out')
		  		str[i] = str[i].toLowerCase(); 
		  	else if((str[i].length == 1) && str[i] == 'b' && jQuery.inArray( i, bPosFound ) != -1)
		  		str[i] = str[i].toLowerCase(); 
		  	else if((str[i].length == 2 || str[i].length == 3) && jQuery.inArray( str[i], playerInitials ) != -1)
		    	str[i] = str[i].toUpperCase(); 
		    else if(str[i].charAt(0) == "(")
		    	str[i] = str[i].charAt(0).toUpperCase() + str[i].charAt(1).toUpperCase() + str[i].slice(2); 
		    else if(jQuery.inArray( str[i], outDescMidKeys ) != -1)
		    	str[i] = str[i].toLowerCase(); 
		    else
		    	str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
		  }
		  return str.join(' ');
		}

		function fixturePageChange(Type){
			if(Type == 'fromFixturePage'){
				$("#scoreBox").addClass("fixPage");
				$("#fullScoreContent").addClass("fixtureDetailView");
			}				
			else{
				$("#scoreBox").removeClass("fixPage");
				$("#fullScoreContent").removeClass("fixtureDetailView");
			}
				
		}
     
	// $(window).keydown(function(e) {
	// 	console.log(e.ctrlKey);
	// 	console.log(e.which);
	//   if ( e.ctrlKey || e.which == 123) {
	//      e.preventDefault();
	//   }
	// });
	
	function ScorecardEvents(){		 
		//$("#f-of-w").click(function(){
		
	  $('body').undelegate('#f-of-w', 'click')
					.delegate('#f-of-w', 'click', function () {
			setTimeout(function(){
				$("#fall-of-wickets").addClass("show-content");
				$("#ball-by-ball").removeClass("show-content");
				$("#fall-of-wickets").html(FOWHtml);
					
					$('.fow-slider').slick({
						slidesToShow: 5,
						slidesToScroll: 1,
						arrows: true,
						dots: false,
						speed: 1000,
						infinite:false,
						responsive: [
							{
								breakpoint: 1025,
								settings: {
									slidesToShow: 3,
									slidesToScroll: 1,

								}
							},
							{
								breakpoint: 950,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1,

								}
							},
							{
								breakpoint: 700,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,

								}
							},

						]

					});
					$("#b-by-b").removeClass("highlight");			
					$("#f-of-w").addClass("highlight");	
			},500);
			
			
			
		});
		
		$("#b-by-b").click(function(){
			$("#fall-of-wickets").removeClass("show-content");
			$("#ball-by-ball").addClass("show-content");
			setTimeout(function(){
				$("#b-by-b").addClass("highlight");			
				$("#f-of-w").removeClass("highlight");	
			},500);
		});
		
		$(".smscorecardwidget .submenu").click(function(){
			var dataid = $(this).attr("data-id");
			if(dataid == 'mwpage'){
				$("#mwpage").addClass("current");
			}
			else{
				$("#mwpage").removeClass("current");
			}
			$(".smscorecardwidget .submenu").removeClass("active");
			$(this).addClass("active");
			$(".mcTabItemContent").hide();
			$("#"+dataid).show();
			
		});
		
		

		copyEvents();
	}
	
	$(document).ready(function(){
		$(".atl-mobile .atl").click(function(){
			$(".atl-mobile").toggleClass("atl-mobile-t");
		});
		$(".wagon-points.wp-header li")
	});
	
	
	function getTimeZoneAbbrv(matchDateTime){
		const { 1: tz } = new Date(matchDateTime).toString().match(/\((.+)\)/);
	
										  if (tz.includes(" ")) {
											return tz
											  .split(" ")
											  .map(([first]) => first)
											  .join("");
										  } else {
											return tz;
										  }
	}
	
	function copyEvents(){
		$('.copyUrl').on('click', function(){
			var shareurl = $(this).attr('data-urlcopy');
			var inputc = document.body.appendChild(document.createElement("input"));
			inputc.value = shareurl;
			inputc.focus();
			inputc.select();
			document.execCommand('copy');
			inputc.parentNode.removeChild(inputc);
			if($(".cl").length > 0){
				document.getElementById("cl").innerHTML = "Copied !";
				setTimeout(function() {
					document.getElementById("cl").innerHTML = "Copy <b>Link</b>";
				}, 1000);
			}
			if($(".c").length > 0){
				$(".c").text("Copied !");
				setTimeout(function() {
					$(".c").text("Copy");
				}, 3000);
			}
				
		});

		$('.copyUrl1').on('click', function(){
            $(".ctc .c").text("Copied!");
            var shareurl = $(this).attr('data-shareurl');
            var dummy = $('<input id="myInput">').val(shareurl).appendTo('body').select();
            dummy.focus();
            // document.execCommand('copy');
            
			$(this).find(".c").text("Copied !");
			var copyText = document.getElementById("myInput");
			console.log(copyText.value);
			// Select the text field
			copyText.select();
			copyText.setSelectionRange(0, 99999); // For mobile devices

			// Copy the text inside the text field
			navigator.clipboard.writeText(copyText.value);
			$("#myInput").remove();
            
        });

        $('.copyUrl1').mouseout(function(){
          $(".ctc .c").text("Copy");
        });
	}
	
	
	function formatNumber(num) {
		return (num / 1000).toFixed(1) + 'k';
	}
