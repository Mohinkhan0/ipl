var matchScheduleResponse = [];
angular.module('MyApp').filter('unsafe', function($sce) { return $sce.trustAsHtml; });
angular.module('MyApp').factory('mcService', ['$http','$q', function($http,$q){

	var GetMatchSchedule=function(cId,callback){
		if(t20lite)
		{
			var filename = '-matchschedule.html';
		}
		else
		{
			var filename = '-matchSchedule-2.html';
		}
		jQuery.jsonp(  {
			url:feedSource+'/'+cId+filename,
  			callbackParameter: "MatchSchedule",
  			success  : function (json, textStatus, xOptions) {
			  
			},
  			error : function (xOptions, textStatus) {
			 	callback(matchScheduleResponse);
			 	matchScheduleResponse = [];
			} 

			}	
  		)
	}

	var getMatches = function(cObj,callback) {
      var url = "";
      if(cObj.feedsource == undefined) cObj.feedsource = feedSource;
      if(cObj.CodingType == "T20Pro")
        var url = cObj.feedsource + "/"+cObj.CompetitionID + "-matchSchedule.js";
       else if(cObj.CodingType == "T20Lite")
        var url = cObj.feedsource + "/"+cObj.CompetitionID + "-matchschedule.js";
    	else{
    		if(t20lite)
			{
				var filename = '-matchschedule.html';
			}
			else
			{
				var filename = '-matchSchedule-2.html';
			}
			var url = feedSource + "/"+cObj.CompetitionID + filename;
    	}
    	
      if(url != "")
      {
         jQuery.jsonp(  {
			url:url,
  			callbackParameter: "MatchSchedule",
  			success  : function (json, textStatus, xOptions) {
			  
			},
  			error : function (xOptions, textStatus) {
			 	callback(matchScheduleResponse);
			 	matchScheduleResponse = [];
			} 

			}	
  		)
      }
      
    }

	var GetTournamentList=function(callback){
		var url = competitionFeedPath;
		if(competitionFeedPath == "")
			 url = feedSource + '/competition.js';
		$.ajax({
            crossDomain: true,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            async: true,
            url: url,
            //url:'feed/competition.js',
            dataType: "jsonp",
            jsonpCallback: 'oncomptetion',
            success: function (data) {
                callback(data);
            }
        });
	}
	
	var GetMatchLinks=function(callback){
		var url = feedSource + '/stats/matchlinks.js';
					 
		$.ajax({
            crossDomain: true,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            async: true,
            url: url,
            dataType: "jsonp",
            jsonpCallback: 'onMatchLinks',
            success: function (data) {
                callback(data);
            }
        });
	}
	var GetMatchLinksBySeason=function(pseason,callback){
		var url = feedSource + '/stats/'+pseason+'-matchlinks.js';
					 
		$.ajax({
            crossDomain: true,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            async: true,
            url: url,
            dataType: "jsonp",
            jsonpCallback: 'onMatchLinksBySeason',
            success: function (data) {
                callback(data);
            }
        });
	}


    

	return {
        'GetMatchSchedule': GetMatchSchedule,
        'GetTournamentList':GetTournamentList,
        'getMatches':getMatches,
		'GetMatchLinks' : GetMatchLinks,
		'GetMatchLinksBySeason' : GetMatchLinksBySeason
    };
	
}]);



angular.module('MyApp').directive('smresultswidget', ['$parse', '$document', '$compile', function ($parse, $document, $compile) {
    return {
        restrict: 'AEC',
       // templateUrl: 'results-template.html',
       templateUrl: 'resultswidget',
        link: function ($scope, $elem, $attrs, $ctrl) {
			var servicetype = $attrs.servicetype;
			if(servicetype == undefined || servicetype == '')
				servicetype = 'all';
			var widgettype = $attrs.widgettype;
			if(widgettype == 'international'){
				competitionFeedPath="../../scores.iplt20.com/ipl/competition.js";
				feedSource = "https://scores.iplt20.com/ipl/feeds";
				basePath='https://scores.iplt20.com/ipl/';
				fullScorecardBasePath = "../index.html";
			}
			
				var pathname = window.location.pathname; 
			pathname = pathname.split("../index.html");
			var pathSplitLen = pathname.length;
			var genderTypeParm = (pathname[pathSplitLen-2] != undefined ) ? pathname[pathSplitLen-2] : '';
			if(genderTypeParm == 'women'){
				competitionFeedPath="../../scores.iplt20.com/ipl/mc/womenscompetition.js";
			}
			var teamsParm = (pathname[pathSplitLen-3] != undefined && pathname[pathSplitLen-3] == 'teams') ? 'teams' : '';
			if(teamsParm == 'teams' && (genderTypeParm == 'supernovas' || genderTypeParm == 'trailblazers' || genderTypeParm == 'velocity')){
				competitionFeedPath="../../scores.iplt20.com/ipl/mc/womenscompetition.js";
			}
				
			CricketSMIPLMC = true;
			liveShortWidget = false;
			liveBriefWidget = false;
			if( servicetype== 'fixtures')
			{
				if(typeof clientId != "undefined") {
					clientId = clientId.toLowerCase();
					if(clientId == "tnpl")
						$(".seasonFilter").hide();
				}
				
				$scope.init('fixtures','fixture','init');
			}
				
			else if( servicetype== 'results'){
				$scope.init('fixtures','result','init',widgettype);	
					setTimeout(function(){
						
					},2000);
			}
			else if( servicetype== 'live')
				$scope.init('fixtures','live','init',widgettype);	
			else if( servicetype== 'tstats'){
				$scope.init('tourstats','tourstats','init');	
				var listenDiv = setInterval(function(){
					if($(".mcYearArch li").length > 0)
					{
						clearInterval(listenDiv);
						$(".mcYearArch li:first-child").addClass("active");
					}

				},1000);
				$(".mcYearArch li:first-child").addClass("active");
			}
			else if( servicetype== 'playerstats')
				$scope.init('teamstats','tourstats','init');	
			else if( servicetype== 'teamstats')
				$scope.init('teamDetailStats','tourstats','init');	
			else if( servicetype== 'standings')
				$scope.init('standings','tourstats','init');
			else if( servicetype== 'all')
				$scope.init('fixtures','all','init',widgettype);	
			else
				$scope.constructScoreCard(servicetype,'');	
					
			$("#matchCenter").addClass("active");

			
			
        }
    };
} ]);


angular.module('MyApp').directive('smfixtureswidget', ['$parse', '$document', '$compile', function ($parse, $document, $compile) {
    return {
        restrict: 'AEC',
       // templateUrl: 'fixtures-template.html',
       templateUrl: 'fixtureswidget',
        link: function ($scope, $elem, $attrs, $ctrl) {
			var servicetype = $attrs.servicetype;
			if(servicetype == undefined || servicetype == '')
				servicetype = 'all';
			var teamtype = $attrs.teamtype;
			var widgettype = $attrs.widgettype;
			if(widgettype == 'international'){
				competitionFeedPath="../../scores.iplt20.com/ipl/competition.js";
				feedSource = "https://scores.iplt20.com/ipl/feeds";
				basePath='https://scores.iplt20.com/ipl/';
				fullScorecardBasePath = "../index.html";
			}
			var pathname = window.location.pathname; 
			pathname = pathname.split("../index.html");
			var pathSplitLen = pathname.length;
			var genderTypeParm = (pathname[pathSplitLen-2] != undefined ) ? pathname[pathSplitLen-2] : '';
			if(genderTypeParm == 'women'){
				competitionFeedPath="../../scores.iplt20.com/ipl/mc/womenscompetition.js";
			}
			var teamsParm = (pathname[pathSplitLen-3] != undefined && pathname[pathSplitLen-3] == 'teams') ? 'teams' : '';
			if(teamsParm == 'teams' && (genderTypeParm == 'supernovas' || genderTypeParm == 'trailblazers' || genderTypeParm == 'velocity')){
				competitionFeedPath="../../scores.iplt20.com/ipl/mc/womenscompetition.js";
			}
			CricketSMIPLMC = true;
			liveShortWidget = false;
			liveBriefWidget = false;
			if( servicetype== 'fixtures')
			{
				if(typeof clientId != "undefined") {
					clientId = clientId.toLowerCase();
					if(clientId == "tnpl")
						$(".seasonFilter").hide();
				}
				
				$scope.init('fixtures','fixture','init');
			}
				
			else if( servicetype== 'results')
				$scope.init('fixtures','result','init');	
			else if( servicetype== 'live')
				$scope.init('fixtures','live','init');	
			else if( servicetype== 'tstats'){
				$scope.init('tourstats','tourstats','init');	
				var listenDiv = setInterval(function(){
					if($(".mcYearArch li").length > 0)
					{
						clearInterval(listenDiv);
						$(".mcYearArch li:first-child").addClass("active");
					}

				},1000);
				$(".mcYearArch li:first-child").addClass("active");
			}
			else if( servicetype== 'playerstats')
				$scope.init('teamstats','tourstats','init');	
			else if( servicetype== 'teamstats')
				$scope.init('teamDetailStats','tourstats','init');	
			else if( servicetype== 'standings')
				$scope.init('standings','tourstats','init');
			else if( servicetype== 'all')
				$scope.init('fixtures','all','init',widgettype,teamtype);	
			else
				$scope.constructScoreCard(servicetype,'');	
					
			$("#matchCenter").addClass("active");

			
			
        }
    };
} ]);


angular.module('MyApp').directive('smlivewidget', ['$parse', '$document', '$compile', function ($parse, $document, $compile) {
    return {
        restrict: 'AEC',
      //  templateUrl: 'fixtures-template.html',
       templateUrl: 'livewidget',
        link: function ($scope, $elem, $attrs, $ctrl) {
			var servicetype = $attrs.servicetype;
			if(servicetype == undefined || servicetype == '')
				servicetype = 'all';
			var widgettype = $attrs.widgettype;
			if(widgettype == 'international'){
				competitionFeedPath="../../scores.iplt20.com/ipl/competition.js";
				feedSource = "https://scores.iplt20.com/ipl/feeds";
				basePath='https://scores.iplt20.com/ipl/';
				fullScorecardBasePath = "../index.html";
			}
			CricketSMIPLMC = true;
			liveShortWidget = false;
			liveBriefWidget = false;
			if( servicetype== 'fixtures')
			{
				if(typeof clientId != "undefined") {
					clientId = clientId.toLowerCase();
					if(clientId == "tnpl")
						$(".seasonFilter").hide();
				}
				
				$scope.init('fixtures','fixture','init');
			}
				
			else if( servicetype== 'results')
				$scope.init('fixtures','result','init',widgettype);	
			else if( servicetype== 'live')
				$scope.init('fixtures','live','init',widgettype);	
			else if( servicetype== 'tstats'){
				$scope.init('tourstats','tourstats','init');	
				var listenDiv = setInterval(function(){
					if($(".mcYearArch li").length > 0)
					{
						clearInterval(listenDiv);
						$(".mcYearArch li:first-child").addClass("active");
					}

				},1000);
				$(".mcYearArch li:first-child").addClass("active");
			}
			else if( servicetype== 'playerstats')
				$scope.init('teamstats','tourstats','init');	
			else if( servicetype== 'teamstats')
				$scope.init('teamDetailStats','tourstats','init');	
			else if( servicetype== 'standings')
				$scope.init('standings','tourstats','init');
			else if( servicetype== 'all')
				$scope.init('fixtures','all','init',widgettype);	
			else
				$scope.constructScoreCard(servicetype,'');	
					
			$("#matchCenter").addClass("active");

			
			
        }
    };
} ]);


function MatchSchedule(data){
	matchScheduleResponse = data;
}

function ongroupstandings(data){
	grpStandingsResponse = data;
}

function onTournamentstats(data){
	tourstatsResponse = data;
}

function onteamlist(data){
	teamListResponse = data;
}

function onsquad(data){
	teamSquadsResponse = data;
}

function onScoring(data){
	innScoreResponse = data;
}

function onMomentum(data){
	momentumResponse = data;
}

function onScorePotentials(data){
	SPResponse = data;
}

function onsuperovermatchsummary(data)
{
	superovermatchsummaryResponse = data;
}
function onsquadFixture(data){
	fixtureSquadResponse = data;
}