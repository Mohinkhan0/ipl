var psResponse = [];
var psFeedPath = "https://scores.iplt20.com/ipl/feeds/stats/player/";

angular.module('MyApp')
.factory('mcService',['$http', '$q', function ($http, $q){
    var canceler = $q.defer();
   
	var getPlayerStats=function(playerId,callback){
				
		var url = psFeedPath+playerId+"-playerstats.js";
		
		jQuery.jsonp(  {
			url: url,
  			callbackParameter: "onPlayerStats",
  			success  : function (json, textStatus, xOptions) {
			  
			},
  			error : function (xOptions, textStatus) {
			 	callback(psResponse);
			 	psResponse = [];
			} 

			}	
  		)
	}
	
  
  return {
        'getPlayerStats': getPlayerStats

  };
}]);


angular.module('MyApp').directive('smplayerstatswidget', ['$parse', '$document', '$compile', function ($parse, $document, $compile) {
    return {
       restrict: 'AEC',
     //   templateUrl: 'player-stats-template.html', 
        template : '<div class="sm-pp-container"> <div class="sm-pp__stats sm-pp__bat-stats"> <div class="sm-pp-table__title">Batting &amp; Fielding Stats</div> <div class="sm-pp__stats-box"> <table width="100%" class="sm-pp-table"> <thead><tr> <th>Year</th> <th>Mat</th> <th>No</th> <th>Runs</th> <th>HS</th> <th>Avg</th> <th>BF</th> <th>SR</th> <th>100</th> <th>50</th> <th>4s</th> <th>6s</th> <th>CT</th> <th>ST</th> </tr></thead><tbody> <tr ng-repeat="list in battingStats" ng-class="{\'ih-td-bg\' : list.Year == \'AllTime\'}" > <td ng-if="list.Year == \'AllTime\'">Career</td> <td ng-if="list.Year != \'AllTime\'">{{list.Year}}</td> <td>{{list.Matches}}</td> <td>{{list.NotOuts}}</td> <td>{{list.Runs}}</td> <td>{{list.HighestScore}}</td> <td>{{list.BattingAvg}}</td> <td>{{list.Balls}}</td> <td>{{list.StrikeRate}}</td> <td>{{list.Hundreds}}</td> <td>{{list.Fifties}}</td> <td>{{list.Fours}}</td> <td>{{list.Sixes}}</td> <td>{{list.Catches}}</td> <td>{{list.Stumpings}}</td> </tr><tr ng-if="battingStats.length == 0"><td colspan="15">No stats</td></tr> </tbody> </table> </div> </div> <div class="sm-pp__stats sm-pp__bat-stats"> <div class="sm-pp-table__title">Bowling</div> <div class="sm-pp__stats-box"> <table width="100%" class="sm-pp-table"> <thead> <tr> <th>Year</th> <th>Mat</th> <th>Balls</th> <th>Runs</th> <th>WKTS</th> <th>BBM</th> <th>Ave</th> <th>Econ</th> <th>SR</th> <th>4W</th> <th>5W</th> </tr> </thead> <tbody> <tr ng-repeat="list in bowlingStats" ng-class="{\'ih-td-bg\' : list.Year == \'AllTime\'}" > <td ng-if="list.Year == \'AllTime\'">Career</td> <td ng-if="list.Year != \'AllTime\'">{{list.Year}}</td> <td>{{list.Matches}}</td> <td>{{list.Balls}}</td> <td>{{list.Runs}}</td> <td>{{list.Wickets}}</td> <td>{{list.BBM}}</td> <td>{{list.Average}}</td> <td>{{list.Econ}}</td> <td>{{list.StrikeRate}}</td> <td>{{list.FourWkts}}</td> <td>{{list.FiveWkts}}</td> </tr><tr ng-if="bowlingStats.length == 0"><td colspan="12">No stats</td></tr> </tbody> </table> </div> </div></div>',
        link: function ($scope, $elem, $attrs, $ctrl) {
         $scope.init();
        }
    };
} ]);

angular.module('MyApp').directive('smplayerstatssummarywidget', ['$parse', '$document', '$compile', function ($parse, $document, $compile) {
    return {
       restrict: 'AEC',
     //   templateUrl: 'player-overallstats-template.html', 
        template : '<div class="ih-td-ban-r {{battingStats[1].TeamName}} {{battingStats[1].TeamShortName}} {{cskTeamParam}}"> <div class="ih-td-ban-rt"> <ul> <li> <h2 ng-if="battingSummary.Matches != undefined && battingSummary.Matches!=\'\'">{{battingSummary.Matches}}</h2><h2 ng-if="battingSummary.Matches == undefined || battingSummary.Matches==\'\'">0</h2> <p >Matches</p> </li> <li> <img src="https://www.iplt20.com/assets/images/ih-td-line.png" alt="" /> </li> <li> <h2 ng-if="battingSummary.Runs != undefined && battingSummary.Runs!=\'\'">{{battingSummary.Runs}}</h2><h2 ng-if="battingSummary.Runs == undefined || battingSummary.Runs==\'\'">0</h2> <p >Runs</p> </li> <li> <img src="https://www.iplt20.com/assets/images/ih-td-line.png" alt="" /> </li> <li> <h2 ng-if="bowlingSummary.Wickets != undefined && bowlingSummary.Wickets!=\'\'">{{bowlingSummary.Wickets}}</h2><h2 ng-if="bowlingSummary.Wickets == undefined || bowlingSummary.Wickets ==\'\'">0</h2> <p >Wickets</p> </li> </ul> </div></div>',
        link: function ($scope, $elem, $attrs, $ctrl) {
         $scope.initSummary();
        }
    };
} ]);


function onPlayerStats(data){
  psResponse = data;
}



var psWidgetPath = "https://scores.iplt20.com/ipl/";
var t = new Date().getTime();
loadjscssfile(psWidgetPath+"mc/smPSCustom.css?v="+t, "css");
function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}