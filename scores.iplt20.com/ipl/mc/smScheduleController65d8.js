
var time_on_page_sec = 0;
setInterval(function(){
	time_on_page_sec = time_on_page_sec + 1;
},1000);
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
var callFromTemplate = '';
var initLoad='';
var selDivCompetition = [];
var urlString=getParameterByName('type');
var qstringType = getParameterByName('type');
var viewCateg=getParameterByName('view');
var viewscorecard=getParameterByName('type');
var listenLiveRefresh = '';
var CSeasonLiveCompetition = [];

var weekday = new Array(7);
weekday[0] =  "SUN";
weekday[1] = "MON";
weekday[2] = "TUE";
weekday[3] = "WED";
weekday[4] = "THU";
weekday[5] = "FRI";
weekday[6] = "SAT";
var month = new Array();
month[0] = "JAN";
month[1] = "FEB";
month[2] = "MAR";
month[3] = "APR";
month[4] = "MAY";
month[5] = "JUN";
month[6] = "JUL";
month[7] = "AUG";
month[8] = "SEP";
month[9] = "OCT";
month[10] = "NOV";
month[11] = "DEC";


/******* Start of Control ******/
angular.module('MyApp').controller('mcCtrl', ['$scope','$filter','$compile','mcService','$rootScope',function($scope,$filter,$compile,mcService,$rootScope){
		/***** init will be called when the page loads initially******/
	$scope.init=function(srType,vwType,loadType,widgettype,teamtype){
		$(".loader-main").show();
		$scope.basepath = basePath;
		$scope.clientbasePath = clientbasePath;
		initLoad=loadType;
		urlString=(qstringType != '' && loadType != 'tabchange') ? qstringType :srType ;
		viewCateg=(qstringType != '' && loadType != 'tabchange') ? getParameterByName('view') : vwType;
		widgetViewType = srType;
		widgetViewType2 = vwType;
		$scope.widgettype = widgettype;
		$scope.teamtype = teamtype;
		var smWidgetWdt = $(".smscorecardwidget").width();
		findDevice();
		$(".smscorecardwidget").removeClass("smTabview");
		$(".smscorecardwidget").removeClass("smMobview");
		$(".smscorecardwidget").addClass("smWebview");
		$(".drop-down-filter").addClass("inactive");
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
		$(".pageloader").addClass('active');
		
		var pathname = window.location.pathname; 
		pathname = pathname.split("../index.html");
		var pathSplitLen = pathname.length;
		var genderTypeParm = (pathname[pathSplitLen-2] != undefined ) ? pathname[pathSplitLen-2] : '';
		if(genderTypeParm == 'women'){
			$(".vn-menWoTab2 .men_rs").removeClass("active");
			$(".vn-menWoTab2 .women_rs").addClass("active");
			$scope.womensmatches = true;
			$scope.teamCatg = 'WOMEN';
		}
		else{
			$scope.womensmatches = false;
			$scope.teamCatg = 'MEN';
		}

		if(initLoad=='init'){
			$(".pageloader").addClass('active');
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
			//	seasonList = seasonList.reverse();
				$scope.seasonList=seasonList;
				
				var pathname = window.location.pathname; 
				pathname = pathname.split("../index.html");
				console.log(pathname);
				var pathSplitLen = pathname.length;
				console.log(pathSplitLen);
				var resultsParm = (pathname[pathSplitLen-2] != undefined && pathname[pathSplitLen-2] == 'results') ? 'results' : '';
				if(resultsParm == 'results'){
					var seasonParam = (pathname[pathSplitLen-1] != undefined && pathname[pathSplitLen-1] != '') ? pathname[pathSplitLen-1] : '';
					console.log(seasonParam);
					if(seasonParam != ''){
						$scope.seasonList.map(function(item){
							if(seasonParam == item.seasonName){
								item.selected = true;
								seasonId = item.SeasonID;
								$scope.curSeasonName = item.seasonName;
								$scope.selectedSeason = item;
							}							
						});
					}
				}
				
				if(seasonId == undefined || seasonId == ''){
					seasonId=seasonList[0].SeasonID;
					$scope.curSeasonName = seasonList[0].seasonName;
					$scope.selectedSeason = (seasonList[0] != undefined) ? seasonList[0] : [];
					$scope.seasonList.map(function(item){
						if(seasonId == item.SeasonID){
							item.selected = true;
						}						
					});					
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
				setTimeout(function(){
					$("#season_"+seasonId).prop("checked","checked");
				},1000);

				var divisionListRcentList = [];
				var alldivisionsList = divisionList;
				
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
				
				if($scope.teamtype == 'U19'){
					competitionList = $filter("filter")(competitionList,{teamType:"U19"},true);
				}
				if(competitionId != undefined && competitionId != '')
				{
					var filComList = [];
					competitionList.map(function(item){
						if(item.CompetitionID == competitionId)
							filComList.push(item);
					});
					competitionList = filComList;
				}
				
				if($scope.widgettype == 'domestic')
						$scope.curSeasonId  = $scope.curSeasonId.toString();
				var smlivewidget = $(".smscorecardwidget").attr('smlivewidget');
				var smserieswidget = $(".smscorecardwidget").attr('smserieswidget');
				var smfixtureswidget = $(".smscorecardwidget").attr('smfixtureswidget');
				var smresultswidget = $(".smscorecardwidget").attr('smresultswidget');
				
				if (typeof smfixtureswidget !== 'undefined' && smfixtureswidget !== false ) {	
					if($scope.widgettype == 'domestic')
						$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId,fixtures:"1"},true);					
					else
						$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId,fixtures:1},true);					
				}
				else if (typeof smlivewidget !== 'undefined' && smlivewidget !== false ) {		
					if($scope.widgettype == 'domestic')
						$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId,live:"1"},true);
					else
						$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId,live:1},true);
				}
				else if (typeof smresultswidget !== 'undefined' && smresultswidget !== false ) {	
					if($scope.widgettype == 'domestic')
						$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId,completed:"1"},true);					
					else
						$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId,completed:1},true);
				}
				else{
					
					$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId},true);		
				}	
				
				$scope.curretSeasonCompFilterList = $scope.curretSeasonCompList;
								
				if(competitionList != undefined && competitionList.length > 0)
				{
					competitionList.map(function(item){
						if(item.DivisionID != undefined && item.DivisionID != '')
							item.DivisionID = parseInt(item.DivisionID);
						if(item.SeasonID != undefined && item.SeasonID != '')
							item.SeasonID = parseInt(item.SeasonID);
						
					});
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
				if(liveComlist.length!=0 && loadType != 'tabchange' && getParameterByName('cId') == '' && getParameterByName('sId') == ''){
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
					


					if(competitionId == '')
							competitionId=  (recentcompetitionList != undefined && recentcompetitionList.length > 0) ? recentcompetitionList[0].CompetitionID : selectedComList[0].CompetitionID;
					if(getParameterByName('cId') == '')
						$scope.selectedCompetition= (recentcompetitionList != undefined && recentcompetitionList.length > 0) ? recentcompetitionList[0] : selectedComList[0];
					else
					{
						for(var i=0;i<selectedComList.length;i++)
						{
							if(getParameterByName('cId') == selectedComList[i].CompetitionID)
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
				

				
				if($scope.selectedCompetition.CodingType == 'T20Lite'){
					if($scope.selectedCompetition.feedsource != undefined)
						feedSource = $scope.selectedCompetition.feedsource;
					t20lite = true;
					
				}
				
				var zIndex = 0;
				var initTimeZoneCall = false;
				var listenZoneCall = setInterval(function(){
					if(zIndex <= $scope.curretSeasonCompList.length - 1 && !initTimeZoneCall)
					{	
							var tournamentTimeZone = ($scope.curretSeasonCompList[zIndex].timezone != undefined) ? $scope.curretSeasonCompList[zIndex].timezone : 'Asia/Kolkata';
							initTimeZoneCall = true;
							var d = new Date();
							var timeZoneOffset = d.getTimezoneOffset();
							var jan = new Date(d.getFullYear(), 0, 1);
						    var jul = new Date(d.getFullYear(), 6, 1);
						    var maxVal = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
						    var daylight = 0;
						    if(timeZoneOffset < maxVal)
						    	daylight = 1;
								var url = "https://sportsmechanics.in/timeapi.php";
								/*  $.ajax({
									crossDomain: true,
									type: "POST",
									// contentType: "application/json; charset=utf-8",
									// async: true,
									url: url,
									data : {
									  // timezone : 'europe/london'
									  timezone : tournamentTimeZone,
									  timeZoneOffset : timeZoneOffset,
									   daylight : daylight
									},
									dataType: "json",
									success: function (data) {
										zoneTime = (data.cuurenttime != undefined) ? data.cuurenttime : ''; 
										 if(zoneTime != ''){
												zoneTime = new Date(zoneTime).getTime() / 1000;
												
												
													var currentZoneTime =  (data.currentTimezoneTime != undefined) ? data.currentTimezoneTime : ''; 
													currentZoneTime = new Date(currentZoneTime).getTime() / 1000;
													$scope.curretSeasonCompList[zIndex].currentZoneTime = currentZoneTime;
													var zoneAbrv = (data.timezoneABBRV != undefined) ? data.timezoneABBRV : ''; 
													$scope.curretSeasonCompList[zIndex].zoneAbrv = zoneAbrv;
											}
											$scope.curretSeasonCompList[zIndex].zoneTime = zoneTime;

											zIndex = zIndex + 1;
											initTimeZoneCall = false;
										
											
									},
									error:function(){
										zIndex = zIndex + 1;
										initTimeZoneCall = false;
									}
								});*/
								
								zoneTime = new Date().getTime() / 1000;								
									
								var currentZoneTime = new Date().getTime() / 1000;
								$scope.curretSeasonCompList[zIndex].currentZoneTime = currentZoneTime;
								var zoneAbrv =  'IST'; 
								$scope.curretSeasonCompList[zIndex].zoneAbrv = zoneAbrv;
								$scope.curretSeasonCompList[zIndex].zoneTime = zoneTime;
								
								zIndex = zIndex + 1;
								initTimeZoneCall = false;
							}

							if(zIndex > $scope.curretSeasonCompList.length - 1)
							{
								clearInterval(listenZoneCall);	
								console.log(competitionId);
								$scope.bindResult(competitionId,urlString);
							}
								
								
						},100);
				
				var smlivewidget = $(".smscorecardwidget").attr('smlivewidget');
				var smserieswidget = $(".smscorecardwidget").attr('smserieswidget');
				var smfixtureswidget = $(".smscorecardwidget").attr('smfixtureswidget');
				
				if ((typeof smlivewidget !== 'undefined' && smlivewidget !== false) || (typeof smfixtureswidget !== 'undefined' && smfixtureswidget !== false) || (typeof smserieswidget !== 'undefined' && smserieswidget !== false)) {
					clearInterval(listenLiveRefresh);
					listenLiveRefresh=setInterval(function(){
						$scope.liveRefresh(); 
					},10000);
				}
				
				
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
			  	
			});
		}
		else {
			$scope.bindResult(competitionId,urlString);
		}
	}

	$scope.goToMatchcenter = function(pmatchId){
		window.location = $scope.clientbasePath+ 'match/'+$scope.curSeasonName+'/'+pmatchId;
	}
	
	$scope.bindResult=function(cId,pageType){
		urlString=pageType;
		
		/******* get live,fixtures and result matches script ******/
			if(pageType=="fixtures" || matchscheduleData.length == 0){
				$scope.liveList=[];
				$scope.fixtureList=[];
				$scope.resultList=[];
				$scope.fixLiveList=[];
				$scope.liveTabLink=false;
				$scope.fixtureTabLink=false;
				$scope.resultTabLink=false;
				
				mcService.GetMatchSchedule(cId,function(data){ 
					firebaseSObjChange = true;
					matchscheduleData = (data.Matchsummary != undefined) ? data.Matchsummary : ((data.Result != undefined) ? data.Result : []);	
				
					var pathname = window.location.pathname; 
					pathname = pathname.split("../index.html");
					var pathSplitLen = pathname.length;
					console.log(pathname);
					var teamsParm = (pathname[pathSplitLen-3] != undefined && pathname[pathSplitLen-3] == 'teams') ? 'teams' : '';
					console.log(teamsParm);
					if(teamsParm == 'teams'){
							var teamNameParm = (pathname[pathSplitLen-2] != undefined && pathname[pathSplitLen-2] != '') ? pathname[pathSplitLen-2] : '';
							var teamsIdsMappingAr = [];
							teamsIdsMappingAr['chennai-super-kings'] = 13;
							teamsIdsMappingAr['delhi-capitals'] = 14;
							teamsIdsMappingAr['gujarat-titans'] = 35;
							teamsIdsMappingAr['kolkata-knight-riders'] = 16;
							teamsIdsMappingAr['lucknow-super-giants'] = 77;
							teamsIdsMappingAr['mumbai-indians'] = 17;
							teamsIdsMappingAr['punjab-kings'] = 15;
							teamsIdsMappingAr['rajasthan-royals'] = 18;
							teamsIdsMappingAr['royal-challengers-bangalore'] = 19;
							teamsIdsMappingAr['sunrisers-hyderabad'] = 20;
							teamsIdsMappingAr['supernovas'] = 81;
							teamsIdsMappingAr['trailblazers'] = 80;
							teamsIdsMappingAr['velocity'] = 82;
							if(teamsIdsMappingAr[teamNameParm] != undefined && teamsIdsMappingAr[teamNameParm] != '')
								filterteam = teamsIdsMappingAr[teamNameParm];
							if(teamNameParm == 'supernovas' || teamNameParm == 'trailblazers' || teamNameParm == 'velocity')
								$scope.womensmatches = true;
								console.log(filterteam);
							$(".vn-sheduleFilterWrap").hide();
							$(".drop-down-filter .row .col-sm-6,.drop-down-filter .row .col-sm-12").hide();
							$(".drop-down-filter .row .col-sm-6").hide();
							$(".drop-down-filter .row .col-sm-6:nth-child(3)").show();
							$(".drop-down-filter .row .col-sm-12:nth-child(2)").show();
							$(".downlaodFixLink").hide();
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
								item.MatchOrder = "";
							});
						}
					}
					var uniqueTeamsList = [];
					var uniqueGroundList = [];
					var teamsList = [];
					if(matchscheduleData != undefined && matchscheduleData.length > 0)
					{
						var cComObj = "";
						for(var i=0;i<$scope.curretSeasonCompList.length;i++){
							if($scope.curretSeasonCompList[i].CompetitionID == cId){
								cComObj = $scope.curretSeasonCompList[i];
								break;
							}
								
						}
						matchscheduleData.map(function(item){
							if(item.MatchDateNew == undefined) item.MatchDateNew = item.MatchDate;
							if(item.MatchDateNew != undefined && item.MatchDateNew != '' )
								item.MatchDate = item.MatchDateNew;
							if(item.timezone1 != undefined && item.timezone1 != '')
								item.timezone = item.timezone1;
							
							item['1FallWickets']=item['1FallWickets'].replace("dec", "d");
							item['2FallWickets']=item['2FallWickets'].replace("dec", "d");
							item['3FallWickets']=item['3FallWickets'].replace("dec", "d");
							item['4FallWickets']=item['4FallWickets'].replace("dec", "d");
							item['4FallWickets']=item['4FallWickets'].replace("dec", "d");
							if(item['MatchHomeTeamLogo'] != undefined){
									item['MatchHomeTeamLogo']=item['MatchHomeTeamLogo'].replace("http://feeds-100mb-test.s3-ap-southeast-1.amazonaws.com/teamLogos/teamLogos_2020/", "https://scores.iplt20.com/ipl/teamlogos/");
								item['MatchAwayTeamLogo']=item['MatchAwayTeamLogo'].replace("http://feeds-100mb-test.s3-ap-southeast-1.amazonaws.com/teamLogos/teamLogos_2020/", "https://scores.iplt20.com/ipl/teamlogos/");
								item['MatchHomeTeamLogo']=item['MatchHomeTeamLogo'].replace("https://feeds-100mb.s3.ap-southeast-1.amazonaws.com/teamLogos/", "https://scores.iplt20.com/ipl/teamlogos/");
								item['MatchAwayTeamLogo']=item['MatchAwayTeamLogo'].replace("https://feeds-100mb.s3.ap-southeast-1.amazonaws.com/teamLogos/", "https://scores.iplt20.com/ipl/teamlogos/");
								
							}
							item['HomeTeamLogo']=item['HomeTeamLogo'].replace("https://livescores-bccitv.epicon.in/ipl/teamlogos/", "https://scores.iplt20.com/ipl/teamlogos/");
								item['AwayTeamLogo']=item['AwayTeamLogo'].replace("https://livescores-bccitv.epicon.in/ipl/teamlogos/", "https://scores.iplt20.com/ipl/teamlogos/");
								
								if(item.CompetitionID == 62){
									if(item['HomeTeamLogo'] == '')
										item['HomeTeamLogo'] = "../../ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/images/womens-ipl-logo.png";
									if(item['AwayTeamLogo'] == '')
										item['AwayTeamLogo'] = "../../ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/images/womens-ipl-logo.png";
								}
							
							
							
							item.TeamType = cComObj.TeamType;	
							
							
									var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
									var d =  new Date(matchDateTime).getTime() / 1000;
									item.timestamp = d;
									var zoneTime = cComObj.zoneTime;
									var currentZoneTime = cComObj.currentZoneTime;
									var zoneAbrv = (cComObj.zoneAbrv != undefined) ? cComObj.zoneAbrv : '';									

									var d = new Date(matchDateTime);
									var dayName = weekday[d.getDay()];
									item.dayName = dayName;
									item.date = d.getDate();
									item.month = month[d.getMonth()];

									var currentZoneMatchTime = zoneTime - currentZoneTime;
									var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
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
									var currentZoneMatchTimeDisplay = strTime+" "+zoneAbrv;
									item.currentZoneMatchTimeDisplay = currentZoneMatchTimeDisplay;	
									item.currentZoneMatchDate = day+" "+mnth+" "+yr;
									
									var dayName = weekday[currentZoneMatchTime.getDay()];
									var fullMonthName = month[currentZoneMatchTime.getMonth()];
									fullMonthName = fullMonthName.toUpperCase();
									item.currentZoneMatchDateDisplay = fullMonthName+", "+dayName+" "+day;
									
									
									if(cId == 10013 || cId == 10012){
										if(item.MatchTime == '18:00'){
											item.currentZoneMatchTimeDisplay = "07:30 PM IST";
											item.GMTMatchTime = "14:00 GMT";
										}
										if(item.MatchTime == '14:00'){
											item.currentZoneMatchTimeDisplay = "03:30 PM IST";
											item.GMTMatchTime = "10:00 GMT";
										}
											
									}
							
							
							
							
							
							var teamName = item.FirstBattingTeamName;
							var teamNameDisplay = teamName.toLowerCase();
							
							teamName =  teamName.substring(0, 3);
							teamName = teamName.toLowerCase();
							
							

							if(jQuery.inArray(teamNameDisplay, uniqueTeamsList ) == '-1' && teamName != 'tbd'){
								uniqueTeamsList.push(teamNameDisplay);
								var teamListObj = {};
								teamListObj.TeamCode = item.FirstBattingTeamCode;
								teamListObj.TeamImage = (item.FirstBattingTeamID == item.HomeTeamID) ?  ((item.MatchHomeTeamLogo != undefined) ? item.MatchHomeTeamLogo : item.HomeTeamLogo)  : ((item.FirstBattingTeamID == item.AwayTeamID) ? ((item.MatchAwayTeamLogo != undefined) ? item.MatchAwayTeamLogo : item.AwayTeamLogo) : '');
								teamListObj.TeamName = teamNameDisplay;
								teamListObj.TeamId = item.FirstBattingTeamID;
								teamsList.push(teamListObj);
							}
							var teamName = item.SecondBattingTeamName;
							var teamNameDisplay = teamName.toLowerCase();
							teamName =  teamName.substring(0, 3);
							teamName = teamName.toLowerCase();
							if(jQuery.inArray(teamNameDisplay, uniqueTeamsList ) == '-1' && teamName != 'tbd'){
								uniqueTeamsList.push(teamNameDisplay);
								var teamListObj = {};
								teamListObj.TeamCode = item.SecondBattingTeamCode;
								teamListObj.TeamImage = (item.SecondBattingTeamID == item.HomeTeamID) ?  ((item.MatchHomeTeamLogo != undefined) ? item.MatchHomeTeamLogo : item.HomeTeamLogo)  : ((item.SecondBattingTeamID == item.AwayTeamID) ? ((item.MatchAwayTeamLogo != undefined) ? item.MatchAwayTeamLogo : item.AwayTeamLogo) : '');
								teamListObj.TeamName = teamNameDisplay;
								teamListObj.TeamId = item.SecondBattingTeamID;
								teamsList.push(teamListObj);
							}
							
							var GroundName = item.GroundName;
							if(GroundName != undefined && GroundName != ''){
											GroundName =  GroundName.substring(0, 3);
											GroundName = GroundName.toLowerCase();
										}
							if(jQuery.inArray(item.GroundName, uniqueGroundList ) == '-1' && GroundName != 'tbd' && GroundName != '' && GroundName != null){
								uniqueGroundList.push(item.GroundName);
							}
								
							
							
							var j = 0;
							for(var i=0;i<$scope.curretSeasonCompList.length;i++){
								if(item.CompetitionID == $scope.curretSeasonCompList[i].CompetitionID){
									item.CompetitionName = ($scope.curretSeasonCompList[i].CompetitionName != undefined) ? $scope.curretSeasonCompList[i].CompetitionName : '';
									if($scope.curretSeasonCompList[i].Matches == undefined) 
										$scope.curretSeasonCompList[i].Matches = [];
									if($scope.curretSeasonCompList[i].Matches.length < 4)
									{
										$scope.curretSeasonCompList[i].Matches.push(item);
										j++;
									}
								}
							}
							
							if(item.MatchStatus == 'UpComing' || item.MatchStatus == 'Live' ){
								$scope.fixLiveList.push(item);
							}
						});
						
					}
					
					$scope.uniqueTeamsList = uniqueTeamsList;
					$scope.uniqueGroundList = uniqueGroundList;
					$scope.teamListData = teamsList;
					/******* filtering datas ******/
					// data.Result[0].MatchStatus  = "Live";
					// data.Result[0].LiveStream = "Live";
					// matchscheduleData[0]["MatchStatus"] = "Live";
					liveDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Live"});
					resultDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Post"});
					upcomDataList= $filter("filter")(matchscheduleData,{MatchStatus:"Upcoming"});
					
					var nextCSeasonCompetition = [];
					var nextCSeasonCompetitionName = [];
					for(var i=0;i<$scope.curretSeasonCompList.length;i++){
						if($scope.curretSeasonCompList[i].CompetitionID != cId){
							nextCSeasonCompetition.push($scope.curretSeasonCompList[i].CompetitionID);
							nextCSeasonCompetitionName.push($scope.curretSeasonCompList[i].CompetitionName);
						}
							
					}
					
					
					var nxtCompIndex = 0;
					var initnxtCompScheduleCall = false;
					if(nextCSeasonCompetition.length > 0)
					{
						var listenNextCompMatches = setInterval(function(){
							if(nxtCompIndex <= nextCSeasonCompetition.length - 1 && !initnxtCompScheduleCall)
							{
								var nxtcId = nextCSeasonCompetition[nxtCompIndex];
								var cComObj = "";
								for(var i=0;i<$scope.curretSeasonCompList.length;i++){
									if($scope.curretSeasonCompList[i].CompetitionID == nxtcId){
										cComObj = $scope.curretSeasonCompList[i];
										if($scope.curretSeasonCompList[i].feedsource != undefined)
											feedSource = $scope.curretSeasonCompList[i].feedsource;
										break;
									}
										
								}
								initnxtCompScheduleCall = true;
								mcService.GetMatchSchedule(nxtcId,function(data){ 
									var compDataList = (data.Matchsummary != undefined) ? data.Matchsummary : ((data.Result != undefined) ? data.Result : []);	
									for(var i=0;i<compDataList.length;i++){
										if(true){
												compDataList[i].CompetitionName = (nextCSeasonCompetitionName[nxtCompIndex] != undefined) ? nextCSeasonCompetitionName[nxtCompIndex] : '';
										
													var item = compDataList[i];
													var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
													var d =  new Date(matchDateTime).getTime() / 1000;
													item.timestamp = d;
													var zoneTime = cComObj.zoneTime;
													var currentZoneTime = cComObj.currentZoneTime;
													var zoneAbrv = (cComObj.zoneAbrv != undefined) ? cComObj.zoneAbrv : '';	
													item.TeamType = cComObj.TeamType;

													var d = new Date(matchDateTime);
													var dayName = weekday[d.getDay()];
													item.dayName = dayName;
													item.date = d.getDate();
													item.month = month[d.getMonth()];

													var currentZoneMatchTime = zoneTime - currentZoneTime;
													var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
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
													compDataList[i].currentZoneMatchDateTime = currentZoneMatchDateTime;
													var currentZoneMatchTimeDisplay = strTime+" "+zoneAbrv;
													compDataList[i].currentZoneMatchTimeDisplay = currentZoneMatchTimeDisplay;	
													compDataList[i].currentZoneMatchDate = day+" "+mnth+" "+yr;
													
													var dayName = weekday[currentZoneMatchTime.getDay()];
													var fullMonthName = month[currentZoneMatchTime.getMonth()];
													fullMonthName = fullMonthName.toUpperCase();
													compDataList[i].currentZoneMatchDateDisplay = fullMonthName+", "+dayName+" "+day;
													
													
													matchscheduleData.push(compDataList[i]);
													
													if(compDataList[i].MatchStatus == 'Post'){
														compDataList[i]['1FallWickets']=compDataList[i]['1FallWickets'].replace("dec", "d");
														compDataList[i]['2FallWickets']=compDataList[i]['2FallWickets'].replace("dec", "d");
														compDataList[i]['3FallWickets']=compDataList[i]['3FallWickets'].replace("dec", "d");
														compDataList[i]['4FallWickets']=compDataList[i]['4FallWickets'].replace("dec", "d");
														$scope.resultList.push(compDataList[i]);
													}
														
													
													
													if(compDataList[i].MatchStatus == 'Live'){
														compDataList[i]['1FallWickets']=compDataList[i]['1FallWickets'].replace("dec", "d");
														compDataList[i]['2FallWickets']=compDataList[i]['2FallWickets'].replace("dec", "d");
														compDataList[i]['3FallWickets']=compDataList[i]['3FallWickets'].replace("dec", "d");
														compDataList[i]['4FallWickets']=compDataList[i]['4FallWickets'].replace("dec", "d");
														$scope.liveList.push(compDataList[i]);
														
														$scope.fixLiveList.push(compDataList[i]);
													}
													if(compDataList[i].MatchStatus == 'UpComing' || compDataList[i].MatchStatus == 'Upcoming'){
														$scope.fixtureList.push(compDataList[i]);
														$scope.fixLiveList.push(compDataList[i]);
													}
													
													
													var teamName = compDataList[i].FirstBattingTeamName;
													var teamNameDisplay = teamName.toLowerCase();
													teamName =  teamName.substring(0, 3);
													teamName = teamName.toLowerCase();
													if(jQuery.inArray(teamNameDisplay, uniqueTeamsList ) == '-1' && teamName != 'tbd'){
													//	uniqueTeamsList.push(compDataList[i].FirstBattingTeamName);
														$scope.uniqueTeamsList.push(teamNameDisplay);
													}
													var teamName = compDataList[i].SecondBattingTeamName;
													var teamNameDisplay = teamName.toLowerCase();
													teamName =  teamName.substring(0, 3);
													teamName = teamName.toLowerCase();
													if(jQuery.inArray(teamNameDisplay, uniqueTeamsList ) == '-1' && teamName != 'tbd'){
													//	uniqueTeamsList.push(compDataList[i].SecondBattingTeamName);
														$scope.uniqueTeamsList.push(teamNameDisplay);
													}
													
													var GroundName = compDataList[i].GroundName;
													if(GroundName != undefined && GroundName != '' && GroundName != null){
														GroundName =  GroundName.substring(0, 3);
														GroundName = GroundName.toLowerCase();
													}
													
													if(jQuery.inArray(compDataList[i].GroundName, uniqueGroundList ) == '-1' && GroundName != 'tbd' && GroundName != null){
													//	uniqueGroundList.push(compDataList[i].GroundName);
														$scope.uniqueGroundList.push(compDataList[i].GroundName);
													}
													
													var j = 0;
													for(var k=0;k<$scope.curretSeasonCompList.length;k++){
														
														if($scope.curretSeasonCompList[k] != undefined && nxtcId == $scope.curretSeasonCompList[k].CompetitionID){
															if($scope.curretSeasonCompList[k].Matches == undefined) 
																$scope.curretSeasonCompList[k].Matches = [];
															if($scope.curretSeasonCompList[k].Matches.length < 4)
															{
																$scope.curretSeasonCompList[k].Matches.push(compDataList[i]);
																j++;
															}
														}
													}
													
													if (!$scope.$$phase) {
														$scope.$apply();
													}
											}
										
						
									}
									nxtCompIndex = nxtCompIndex + 1;
									initnxtCompScheduleCall = false;	
								});
							}
							if(nxtCompIndex > nextCSeasonCompetition.length - 1){
								clearInterval(listenNextCompMatches);
								$(".drop-down-filter").removeClass("inactive");
							}
								
						},500);
					
					}
					else{
						$(".drop-down-filter").removeClass("inactive");
					}
					
					
					
					
					var timezoneBasedOnComp = true;
					if(upcomDataList != undefined && upcomDataList[0] != undefined && upcomDataList[0]["timezone"] != undefined && upcomDataList[0]["timezone"] != "")
						timezoneBasedOnComp = false;

					if(resultDataList.length > 0)
					{
						
						resultDataList.map(function(item){
							if(item.DivisionID == undefined)
							{
								item.DivisionID = ($scope.selectedDivision.DivisionID != undefined) ? $scope.selectedDivision.DivisionID : '';
							}
						});

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

					
					
					// $scope.getFixtureCountDown(upcomDataList);
					
					/******* asigning datas into scope variables ******/
						
					


					$scope.liveList=liveDataList;
				
					if(matId != undefined && matId != "" && pageType == "scorecard" && $scope.liveList.length > 0){
					
					//	$scope.checkMatchLive(matId);
					}
					
					$scope.fixtureList=upcomDataList;
					$scope.resultList=resultDataList;
					
					mcService.GetMatchLinks(function(mLdata){
						var matchLinks = mLdata;
						if($scope.resultList != undefined && $scope.resultList.length > 0){
							$scope.resultList.map(function(item){
								for(var m = 0;m<matchLinks.length;m++){
									if(item.MatchID == matchLinks[m].smId){
										item.MatchReportsLink = matchLinks[m].report;
										item.MatchHLLink = matchLinks[m].highlights;
									}
										
								}
								if (!$scope.$$phase) {
									$scope.$apply();
								}
								
							});
							if (!$scope.$$phase) {
									$scope.$apply();
								}
						}
						
						
						mcService.GetMatchLinksBySeason($scope.curSeasonName,function(mLdata){
							var matchLinks = mLdata;
							if($scope.resultList != undefined && $scope.resultList.length > 0){
								$scope.resultList.map(function(item){
									for(var m = 0;m<matchLinks.length;m++){
										if(item.MatchID == matchLinks[m].smId){
											item.MatchReportsLink = matchLinks[m].report;
											item.MatchHLLink = matchLinks[m].highlights;
										}
											
									}
									if (!$scope.$$phase) {
										$scope.$apply();
									}
									
								});
							}
						});
						
					});
					
					
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
						//	allMatches.push(item);
						});										
					}
					
					$scope.allMatches = allMatches;
					liveData=(liveDataList[0] != undefined && liveDataList[0].MatchID!=0)? liveDataList[0].MatchID:0;
					upcomData=(upcomDataList[0] != undefined && upcomDataList[0]!=0)?upcomDataList[0].HomeTeamID:0;
					var resultsData=(resultDataList[0]!= undefined && resultDataList[0]!=0)?resultDataList[0].MatchID:0;

					if(liveDataList[0] != undefined && liveDataList[0].MatchID!=0)
					{
						$scope.liveTabLink=true;
						
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
					
					if($scope.filterTeamName != undefined && $scope.filterTeamName != '' && $scope.filterTeamName!= 'All Teams'){
							$scope.resultsfilterByTeam($scope.filterTeamName,$scope.scheduleFilterType);
					}
					
					$(".loader-main").hide();
					
					if (!$scope.$$phase) {
						$scope.$apply();
				  	}
				  	
				  	setTimeout(function(){
				  	
						findPrevMenuActive($("#mcFilterBtn .mnActive"));

						findNextMenuActive($("#mcFilterBtn .mnActive"));

						$(".pageloader").removeClass('active');
						$(".pageloader").removeClass("loadingPage");
				  	},2000);
				  	
				});
			
			}
			
			
	}
	
	$scope.liveRefresh = function(){
		
		var nxtCompIndex = 0;
					var initnxtCompScheduleCall = false;
					if($scope.widgettype == 'domestic')
						CSeasonLiveCompetition = liveComlist;
					if($scope.widgettype == 'international' || true){
						CSeasonLiveCompetition = [];
						if(competitionList != undefined && competitionList.length > 0)
							{
								competitionList.map(function(item){
									if(item.live  == 1)
										CSeasonLiveCompetition.push(item);
									
								});
							}
					}
						
					if(CSeasonLiveCompetition.length > 0)
					{
						var listenLiveCompMatches = setInterval(function(){
							if(nxtCompIndex <= CSeasonLiveCompetition.length - 1 && !initnxtCompScheduleCall)
							{
								var nxtcId = CSeasonLiveCompetition[nxtCompIndex]['CompetitionID'];
								var cComObj = "";
								for(var i=0;i<$scope.curretSeasonCompList.length;i++){
									if($scope.curretSeasonCompList[i].CompetitionID == nxtcId){
										cComObj = $scope.curretSeasonCompList[i];
										break;
									}										
								}
								if(cComObj.feedsource != undefined)
									feedSource = cComObj.feedsource;
								initnxtCompScheduleCall = true;
								mcService.GetMatchSchedule(nxtcId,function(data){ 
									var compDataList = (data.Matchsummary != undefined) ? data.Matchsummary : ((data.Result != undefined) ? data.Result : []);	
									for(var i=0;i<compDataList.length;i++){
										compDataList[i].CompetitionName = cComObj.CompetitionName;
										
										if(compDataList[i]['MatchHomeTeamLogo'] != undefined){
											compDataList[i]['MatchHomeTeamLogo']=compDataList[i]['MatchHomeTeamLogo'].replace("http://feeds-100mb-test.s3-ap-southeast-1.amazonaws.com/teamLogos/teamLogos_2020/", "https://scores.iplt20.com/ipl/teamlogos/");
											compDataList[i]['MatchAwayTeamLogo']=compDataList[i]['MatchAwayTeamLogo'].replace("http://feeds-100mb-test.s3-ap-southeast-1.amazonaws.com/teamLogos/teamLogos_2020/", "https://scores.iplt20.com/ipl/teamlogos/");
											compDataList[i]['MatchHomeTeamLogo']=compDataList[i]['MatchHomeTeamLogo'].replace("https://feeds-100mb.s3.ap-southeast-1.amazonaws.com/teamLogos/", "https://scores.iplt20.com/ipl/teamlogos/");
											compDataList[i]['MatchAwayTeamLogo']=compDataList[i]['MatchAwayTeamLogo'].replace("https://feeds-100mb.s3.ap-southeast-1.amazonaws.com/teamLogos/", "https://scores.iplt20.com/ipl/teamlogos/");
											
											compDataList[i]['MatchHomeTeamLogo']=compDataList[i]['MatchHomeTeamLogo'].replace("https://livescores-bccitv.epicon.in/ipl/teamLogos/", "https://scores.iplt20.com/ipl/teamlogos/");
											compDataList[i]['MatchAwayTeamLogo']=compDataList[i]['MatchAwayTeamLogo'].replace("https://livescores-bccitv.epicon.in/ipl/teamLogos/", "https://scores.iplt20.com/ipl/teamlogos/");
											
											
										}
										
										compDataList[i]['HomeTeamLogo']=compDataList[i]['HomeTeamLogo'].replace("https://livescores-bccitv.epicon.in/ipl/teamlogos/", "https://scores.iplt20.com/ipl/teamlogos/");
										compDataList[i]['AwayTeamLogo']=compDataList[i]['AwayTeamLogo'].replace("https://livescores-bccitv.epicon.in/ipl/teamlogos/", "https://scores.iplt20.com/ipl/teamlogos/");
										
										if(compDataList[i].CompetitionID == 62){
											if(compDataList[i]['HomeTeamLogo'] == '')
												compDataList[i]['HomeTeamLogo'] = "../../ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/images/womens-ipl-logo.png";
											if(compDataList[i]['AwayTeamLogo'] == '')
												compDataList[i]['AwayTeamLogo'] = "../../ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/images/womens-ipl-logo.png";
										}
										
										if(compDataList[i].CompetitionID == 22)
										{
											if(compDataList[i].FirstBattingTeamID == 24 || compDataList[i].SecondBattingTeamID == 24){
													compDataList[i].HomeTeamLogo = "../../scores.bcci.tv/matchcentre/images/default-team-logo.png";
													compDataList[i].AwayTeamLogo = "../../scores.bcci.tv/matchcentre/images/default-team-logo.png";
													if(compDataList[i].FirstBattingTeamID == 24)
														compDataList[i].HomeTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/india.png";
													if(compDataList[i].SecondBattingTeamID == 24)
														compDataList[i].AwayTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/india.png";
													if(compDataList[i].FirstBattingTeamID == 28)
														compDataList[i].HomeTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/pakistan.png";
													if(compDataList[i].SecondBattingTeamID == 28)
														compDataList[i].AwayTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/pakistan.png";
													if(compDataList[i].FirstBattingTeamID == 26)
														compDataList[i].HomeTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/afg.png";
													if(compDataList[i].SecondBattingTeamID == 26)
														compDataList[i].AwayTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/afg.png";
													if(compDataList[i].FirstBattingTeamID == 25)
														compDataList[i].HomeTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/ban.png";
													if(compDataList[i].SecondBattingTeamID == 25)
														compDataList[i].AwayTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/ban.png";
													if(compDataList[i].FirstBattingTeamID == 27)
														compDataList[i].HomeTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/srilanka.png";
													if(compDataList[i].SecondBattingTeamID == 27)
														compDataList[i].AwayTeamLogo = "../../scores.bcci.tv/matchcentre/teamlogos/srilanka.png";
													
													
													if(compDataList[i].MatchDateNew == undefined) compDataList[i].MatchDateNew = compDataList[i].MatchDate;
													var item = compDataList[i];
													var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
													var d =  new Date(matchDateTime).getTime() / 1000;
													item.timestamp = d;
													var zoneTime = cComObj.zoneTime;
													var currentZoneTime = cComObj.currentZoneTime;
													var zoneAbrv = (cComObj.zoneAbrv != undefined) ? cComObj.zoneAbrv : '';									

													var d = new Date(matchDateTime);
													var dayName = weekday[d.getDay()];
													item.dayName = dayName;
													item.date = d.getDate();
													item.month = month[d.getMonth()];

													var currentZoneMatchTime = zoneTime - currentZoneTime;
													var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
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
													compDataList[i].currentZoneMatchDateTime = currentZoneMatchDateTime;
													var currentZoneMatchTimeDisplay = strTime+" "+zoneAbrv;
													compDataList[i].currentZoneMatchTimeDisplay = currentZoneMatchTimeDisplay;	
													compDataList[i].currentZoneMatchDate = day+" "+mnth+" "+yr;
													
													var dayName = weekday[currentZoneMatchTime.getDay()];
													var fullMonthName = month[currentZoneMatchTime.getMonth()];
													fullMonthName = fullMonthName.toUpperCase();
													compDataList[i].currentZoneMatchDateDisplay = fullMonthName+", "+dayName+" "+day;
													
																							
													compDataList[i]['1FallWickets']=compDataList[i]['1FallWickets'].replace("dec", "d");
													compDataList[i]['2FallWickets']=compDataList[i]['2FallWickets'].replace("dec", "d");
													compDataList[i]['3FallWickets']=compDataList[i]['3FallWickets'].replace("dec", "d");
													compDataList[i]['4FallWickets']=compDataList[i]['4FallWickets'].replace("dec", "d");
														
													var liveMatchFound = false;
													for(l=0;l<$scope.liveList.length;l++){
														if($scope.liveList[l].MatchID == compDataList[i].MatchID){
															liveMatchFound = true;
															$scope.liveList[l] = compDataList[i];
														}
													}
													for(l=0;l<$scope.fixLiveList.length;l++){
														if($scope.fixLiveList[l].MatchID == compDataList[i].MatchID){
															liveMatchFound = true;
															$scope.fixLiveList[l] = compDataList[i];
														}
													}
													
													//if(!liveMatchFound)
													//		$scope.liveList.push(compDataList[i]);
													
													var j = 0;
													for(var k=0;k<$scope.curretSeasonCompList.length;k++){
														
														if($scope.curretSeasonCompList[k] != undefined && nxtcId == $scope.curretSeasonCompList[k].CompetitionID){
															if($scope.curretSeasonCompList[k].Matches == undefined) 
																$scope.curretSeasonCompList[k].Matches = [];
															for(l=0;l<$scope.curretSeasonCompList[k].Matches.length;l++){
																if($scope.curretSeasonCompList[k].Matches[l].MatchID == compDataList[i].MatchID){
																	$scope.curretSeasonCompList[k].Matches[l] = compDataList[i];
																}
															}
															
															j++;
														}
													}
													
													if (!$scope.$$phase) {
														$scope.$apply();
													}
												}
												
										}
										else{
											if(compDataList[i].MatchDateNew == undefined) compDataList[i].MatchDateNew = compDataList[i].MatchDate;
											var item = compDataList[i];
											var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
											var d =  new Date(matchDateTime).getTime() / 1000;
											item.timestamp = d;
											var zoneTime = cComObj.zoneTime;
											var currentZoneTime = cComObj.currentZoneTime;
											var zoneAbrv = (cComObj.zoneAbrv != undefined) ? cComObj.zoneAbrv : '';									

											var d = new Date(matchDateTime);
											var dayName = weekday[d.getDay()];
											item.dayName = dayName;
											item.date = d.getDate();
											item.month = month[d.getMonth()];

											var currentZoneMatchTime = zoneTime - currentZoneTime;
											var matchDateTime = item.MatchDateNew+" "+item.MatchTime;
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
											compDataList[i].currentZoneMatchDateTime = currentZoneMatchDateTime;
											var currentZoneMatchTimeDisplay = strTime+" "+zoneAbrv;
											compDataList[i].currentZoneMatchTimeDisplay = currentZoneMatchTimeDisplay;	
											compDataList[i].currentZoneMatchDate = day+" "+mnth+" "+yr;
											
											var dayName = weekday[currentZoneMatchTime.getDay()];
											var fullMonthName = month[currentZoneMatchTime.getMonth()];
											fullMonthName = fullMonthName.toUpperCase();
											compDataList[i].currentZoneMatchDateDisplay = fullMonthName+", "+dayName+" "+day;
											
																					
											compDataList[i]['1FallWickets']=compDataList[i]['1FallWickets'].replace("dec", "d");
											compDataList[i]['2FallWickets']=compDataList[i]['2FallWickets'].replace("dec", "d");
											compDataList[i]['3FallWickets']=compDataList[i]['3FallWickets'].replace("dec", "d");
											compDataList[i]['4FallWickets']=compDataList[i]['4FallWickets'].replace("dec", "d");
												
											var liveMatchFound = false;
											for(l=0;l<$scope.liveList.length;l++){
												if($scope.liveList[l].MatchID == compDataList[i].MatchID){
													liveMatchFound = true;
													$scope.liveList[l] = compDataList[i];
												}
											}
											for(l=0;l<$scope.fixLiveList.length;l++){
														if($scope.fixLiveList[l].MatchID == compDataList[i].MatchID){
															liveMatchFound = true;
															$scope.fixLiveList[l] = compDataList[i];
														}
													}
											//if(!liveMatchFound)
											//		$scope.liveList.push(compDataList[i]);
											
											var j = 0;
											for(var k=0;k<$scope.curretSeasonCompList.length;k++){
												
												if($scope.curretSeasonCompList[k] != undefined && nxtcId == $scope.curretSeasonCompList[k].CompetitionID){
													if($scope.curretSeasonCompList[k].Matches == undefined) 
														$scope.curretSeasonCompList[k].Matches = [];
													for(l=0;l<$scope.curretSeasonCompList[k].Matches.length;l++){
														if($scope.curretSeasonCompList[k].Matches[l].MatchID == compDataList[i].MatchID){
															$scope.curretSeasonCompList[k].Matches[l] = compDataList[i];
														}
													}
													
													j++;
												}
											}
											
											if (!$scope.$$phase) {
												$scope.$apply();
											}
										}
										
										
						
									}
									nxtCompIndex = nxtCompIndex + 1;
									initnxtCompScheduleCall = false;	
								});
							}
							if(nxtCompIndex > CSeasonLiveCompetition.length - 1)
								clearInterval(listenLiveCompMatches);
						},500);
					
					}
					
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
	
	$scope.FindWidget = function(Arr,widgetType){
		if(Arr.indexOf(widgetType) != -1)
			return true;
		else
			return false;
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

	

	 $scope.getFixtureCountDown=function(fixturesData,zoneTime){
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
	
	$scope.getCompetitionName = function(pCID){		
		var CompetitionName = "";
		for(var i=0;i<$scope.curretSeasonCompList.length;i++){
			if($scope.curretSeasonCompList[i].CompetitionID == pCID){
				CompetitionName = $scope.curretSeasonCompList[i].CompetitionName;
				break;
			}				
		}
		return CompetitionName;
	}
	$scope.getCompetitionType = function(pCID){
		var compDet = $filter("filter")($scope.curretSeasonCompList,{CompetitionID:pCID},true);
		if(compDet != undefined && compDet.length > 0)
			return compDet[0].CompetitionType;
		else
			return '';
	}
	$scope.fixturefilterByTournament = function(pCID){
		$scope.matchesListLimit = 8;
		$scope.matchesListPageNo = 1;
		$(".allTournamentFixFilter").removeClass("active");
		if($(".fixfilter-Comp-list[data-cId='"+pCID+"']").hasClass("active")){
			$(".fixfilter-Comp-list[data-cId='"+pCID+"']").removeClass("active");
		}
		else{
			$(".fixfilter-Comp-list[data-cId='"+pCID+"']").addClass("active");
		}
		
		var filteredUPList = [];
		var filteredResultsList = [];
		if($(".fixfilter-Comp-list.active").length > 0){
			$(".fixfilter-Comp-list.active").each(function(){
				var activeCID = $(this).attr("data-cId");
				
				var compDet = matchscheduleData;//$filter("filter")(matchscheduleData,{CompetitionID:activeCID},true);
				
				for(var i=0;i<compDet.length;i++){
					if(compDet[i].CompetitionID == activeCID){
						if(compDet[i].MatchStatus == 'Upcoming' || compDet[i].MatchStatus == 'UpComing')
							filteredUPList.push(compDet[i]);
					}
					
				}
			});
			
			$scope.fixtureList = filteredUPList;
		}
		else{
			$(".allTournamentFixFilter").addClass("active");
			$scope.fixtureList = $filter("filter")(matchscheduleData,{MatchStatus:'UpComing'},true);
		}
		$("#fixture-filter-modal .close").trigger("click");
	}
	
	$scope.filterTournamentName = "All Tournaments & Series";
	$scope.filterTournamentId = "";
	$scope.filterTeamName = "All Teams";
	$scope.filterTeamCode = 'All Teams';
	$scope.filterGroundName = "All Venues";
	$scope.selectedMatchFormat = "All Formats";
	$scope.filterMatchFormat = "All Formats";
	$scope.selectedCategory = "All Categories";	
	$scope.filterCategory = "All Categories";		
	$scope.resultsfilterByTournament = function(comObj,pType){
		var pCID = comObj.CompetitionID;
		$scope.matchesListLimit = 8;
		if(comObj == ''){
			$scope.filterTournamentName = "All Tournaments & Series";
			$scope.filterTournamentId = "";
			$scope.cSBListSearch = "";
		}
		else{
			$scope.filterTournamentName =comObj.CompetitionName;
			$scope.filterTournamentId = comObj.CompetitionID;
		}
		$scope.filterResults(pType,'tournaments');
		
	/*	$(".allTournamentResultsFilter").removeClass("active");
		if($(".resultsfilter-Comp-list[data-cId='"+pCID+"']").hasClass("active")){
			$(".resultsfilter-Comp-list[data-cId='"+pCID+"']").removeClass("active");
		}
		else{
			$(".resultsfilter-Comp-list[data-cId='"+pCID+"']").addClass("active");
		}
		
		
		var filteredUPList = [];
		var filteredResultsList = [];
		//if($(".resultsfilter-Comp-list.active").length > 0){
		//	$(".resultsfilter-Comp-list.active").each(function(){
				var activeCID = pCID;//$(this).attr("data-cId");
				var compDet = matchscheduleData;//$filter("filter")(matchscheduleData,{CompetitionID:activeCID},true);
				
				for(var i=0;i<compDet.length;i++){
					if(compDet[i].CompetitionID == activeCID){
						
						if(compDet[i].MatchStatus == 'Post')
							filteredResultsList.push(compDet[i]);
					}
					
				}
			//});
			
			$scope.resultList = filteredResultsList;
		//}
		/*else{
			$(".allTournamentResultsFilter").addClass("active");
			$scope.resultList = $filter("filter")(matchscheduleData,{MatchStatus:'Post'},true);
		}*/
	//	$("#results-filter-modal .close").trigger("click");
	}
	$scope.filterResultsByAllTournament = function(){
		$scope.matchesListLimit = 8;
		$(".resultsfilter-Comp-list").removeClass("active");
		$(".allTournamentResultsFilter").addClass("active");
		$scope.resultList = $filter("filter")(matchscheduleData,{MatchStatus:'Post'},true);
		$("#results-filter-modal .close").trigger("click");
	}
	$scope.resultsfilterByTeam = function(tObj,pType){
		var pTeam = (tObj.TeamName != undefined && tObj != '') ? tObj.TeamName : '';
		$scope.matchesListLimit = 8;
		if(pTeam == ''){
			$scope.filterTeamName = "All Teams";
			$scope.filterTeamCode = "All Teams";
			$scope.cSBTeamsListSearch = "";
			$scope.filterGroundName = "All Venues";
				$scope.cSBGroundsListSearch = "";
		}
		else{
			$scope.filterTeamName = pTeam;
			$scope.filterTeamCode = tObj.TeamCode;
			$scope.filterGroundName = "All Venues";
				$scope.cSBGroundsListSearch = "";
		}
			console.log($scope.filterGroundName);
		$scope.scheduleFilterType = pType;
		$scope.filterResults(pType,'teams');
		$("#season_"+$scope.curSeasonId).prop("checked","checked");
	}
	
	$scope.resultsfilterByGround = function(pGround,pType){
		$scope.matchesListLimit = 8;
		if(pGround == ''){
			$scope.filterGroundName = "All Venues";
				$scope.cSBGroundsListSearch = "";
		}			
		else
			$scope.filterGroundName = pGround;
		$scope.scheduleFilterType = pType;
		$scope.filterResults(pType,'Venue');
	}
	$scope.filterByMatchType = function(filVal,DisplayVal,pType){
		if(filVal == ''){
			$scope.matchesListPerPage = 1;
			$scope.matchesListLimit = 1;
			$scope.seasonList = seasonList;
			$scope.competitionList = competitionList;
			$scope.selectedMatchFormat = "All Formats";	
			$scope.filterMatchFormat = "All Formats";			
		}
		else{
			$scope.selectedMatchFormat = DisplayVal;	
			$scope.filterMatchFormat = filVal;				
		}
		$(".matchFormatDropDown .cSBList").removeClass("active");
		$scope.filterResults(pType,'MatchType');		
	}
	$scope.filterByCategory = function(filVal,DisplayVal,pType){
		$scope.filterTournamentName = "All Tournaments & Series";
		$scope.filterTournamentId = "";
		$scope.cSBListSearch = "";
		if(filVal == ''){
			$scope.matchesListPerPage = 1;
			$scope.matchesListLimit = 1;
			$scope.seasonList = seasonList;
			$scope.competitionList = competitionList;
			$scope.selectedCategory = "All Categories";	
			$scope.filterCategory = "All Categories";		
			$scope.curretSeasonCompFilterList = $scope.curretSeasonCompList;			
		}
		else{
			$scope.selectedCategory = DisplayVal;	
			$scope.filterCategory = filVal;		
			$scope.curretSeasonCompFilterList = $filter("filter")($scope.curretSeasonCompList,{TeamType:filVal},true);			
		}
		$(".teamCategoryDropDown .cSBList").removeClass("active");
		$scope.filterResults(pType,'Category');		
	}
	$scope.filterResults = function(filterType,pType){
		$scope.matchesListLimit = 8;
		$scope.matchesListPageNo = 1;
		$(".cSBList").removeClass("active");
			var activeCID = $scope.filterTournamentId;
				
				var compDet = matchscheduleData;//$filter("filter")(matchscheduleData,{CompetitionID:activeCID},true);
				var filterCondition1 = false;
				var filterCondition2 = false;
				var filterCondition3 = false;
				var filterCondition4 = false;
				var filterCondition5 = false;
				var filterCondition6 = false;
				if($scope.widgettype == 'domestic')
					filterCondition6 = true;
				var filteredResultsList = [];
				var filteredUPList = [];
				
				for(var i=0;i<compDet.length;i++){
					if($scope.filterTournamentId == '' || compDet[i].CompetitionID == $scope.filterTournamentId)
						filterCondition1 = true;
					else
						filterCondition1 = false;
						
					var teamName = compDet[i].FirstBattingTeamName;
					teamName = teamName.toLowerCase();
					if($scope.filterTeamName == 'All Teams' || teamName == $scope.filterTeamName)
						filterCondition2 = true;
					else
						filterCondition2 = false;
					
					var teamName = compDet[i].SecondBattingTeamName;
					teamName = teamName.toLowerCase();
					if($scope.filterTeamName == 'All Teams' || teamName == $scope.filterTeamName)
						filterCondition3 = true;
					else
						filterCondition3 = false;
					if($scope.filterGroundName == 'All Venues' || compDet[i].GroundName == $scope.filterGroundName)
						filterCondition4 = true;
					else
						filterCondition4 = false;
					
					if($scope.filterMatchFormat == 'All Formats' || compDet[i].MatchTypeName == $scope.filterMatchFormat)
						filterCondition5 = true;
					else
						filterCondition5 = false;
					
					if($scope.filterCategory == 'All Categories' || compDet[i].TeamType == $scope.filterCategory)
						filterCondition6 = true;
					else
						filterCondition6 = false;
					
					if(filterCondition1 && (filterCondition2 || filterCondition3) && filterCondition4 && filterCondition5 && filterCondition6){
						if(compDet[i].MatchStatus == 'Post' && filterType == 'Post')
							filteredResultsList.push(compDet[i]);
						if((compDet[i].MatchStatus == 'Upcoming' || compDet[i].MatchStatus == 'UpComing' || compDet[i].MatchStatus == 'Live') && filterType == 'Upcoming')
							filteredResultsList.push(compDet[i]);
						if(compDet[i].MatchStatus == 'Live' && filterType == 'Live')
							filteredResultsList.push(compDet[i]);
					}
					
				}
				
			
			$scope.resultList = filteredResultsList;
			if(filterType == 'Upcoming'){
				$scope.fixtureList = filteredResultsList;
				$scope.fixLiveList = filteredResultsList;
			}
				if(filterType == 'Live')
					$scope.liveList = filteredResultsList;
			
			var uniqueTeamsList = [];
			var uniqueGroundList = [];
			var teamsList = [];
			//if(filteredResultsList != undefined && filteredResultsList.length > 0 && (pType == 'tournaments' || pType == 'Category'))
			if(pType == 'tournaments' || pType == 'Category' || pType=='teams')
			{
				if(filteredResultsList != undefined && filteredResultsList.length > 0 ){
					filteredResultsList.map(function(item){
					
						var teamName = item.FirstBattingTeamName;
						var teamNameDisplay = teamName.toLowerCase();
						teamName =  teamName.substring(0, 3);
						teamName = teamName.toLowerCase();

						if(jQuery.inArray(teamNameDisplay, uniqueTeamsList ) == '-1' && teamName != 'tbd'){
							uniqueTeamsList.push(teamNameDisplay);
							var teamListObj = {};
							teamListObj.TeamCode = item.FirstBattingTeamCode;

							teamListObj.TeamImage = (item.FirstBattingTeamID == item.HomeTeamID) ? ((item.MatchHomeTeamLogo != undefined) ? item.MatchHomeTeamLogo : item.HomeTeamLogo) : ((item.FirstBattingTeamID == item.AwayTeamID) ? ((item.MatchAwayTeamLogo != undefined) ? item.MatchAwayTeamLogo : item.AwayTeamLogo) : '');
							teamListObj.TeamName = teamNameDisplay;
							teamListObj.TeamId = item.FirstBattingTeamID;
							teamsList.push(teamListObj);
						}
						var teamName = item.SecondBattingTeamName;
						var teamNameDisplay = teamName.toLowerCase();
						teamName =  teamName.substring(0, 3);
						teamName = teamName.toLowerCase();
						if(jQuery.inArray(teamNameDisplay, uniqueTeamsList ) == '-1' && teamName != 'tbd'){
							uniqueTeamsList.push(teamNameDisplay);
							var teamListObj = {};
							teamListObj.TeamCode = item.SecondBattingTeamCode;
							teamListObj.TeamImage =  (item.SecondBattingTeamID == item.HomeTeamID) ?  ((item.MatchHomeTeamLogo != undefined) ? item.MatchHomeTeamLogo : item.HomeTeamLogo)  : ((item.SecondBattingTeamID == item.AwayTeamID) ? ((item.MatchAwayTeamLogo != undefined) ? item.MatchAwayTeamLogo : item.AwayTeamLogo) : '');
							teamListObj.TeamName = teamNameDisplay;
							teamListObj.TeamId = item.SecondBattingTeamID;
							teamsList.push(teamListObj);
						}
						
						
						var GroundName = item.GroundName;
								if(GroundName != undefined && GroundName != '' && GroundName != null){
												GroundName =  GroundName.substring(0, 3);
												GroundName = GroundName.toLowerCase();
											}
								if(jQuery.inArray(item.GroundName, uniqueGroundList ) == '-1' && GroundName != 'tbd' && GroundName != '' && GroundName != null){
									uniqueGroundList.push(item.GroundName);
								}
					});
				}
				
				// $scope.uniqueTeamsList = uniqueTeamsList;
				// $scope.teamListData = teamsList;
				// $scope.filterTeamName = 'All Teams';
				$scope.filterGroundName = "All Venues";
				// $scope.cSBTeamsListSearch = "";
				$scope.cSBGroundsListSearch = "";
				$scope.uniqueGroundList = uniqueGroundList;
				
				
			}
			$(".filterM").hide();
			$(".filterTeamsList").removeClass("active");
			$(".filterTeamsList[data-val='"+$scope.filterTeamName+"']").addClass("active");
			$(".filterGroundsList[data-val='"+$scope.filterGroundName+"']").addClass("active");
			
			
	}
	$scope.FixfilterByAllTournament = function(){
		$(".fixfilter-Comp-list").removeClass("active");
		$(".allTournamentFixFilter").addClass("active");
		$scope.fixtureList = $filter("filter")(matchscheduleData,{MatchStatus:'UpComing'},true);
		$("#fixture-filter-modal .close").trigger("click");
	}
	
	$scope.showFilterPopup = function(){
		$(".filterM").show();
	}
	$scope.closeFilter = function(){
		$(".filterM").hide();
	}
	
	$scope.clearFilter = function(filterType){
		var compDet = matchscheduleData;//$filter("filter")(matchscheduleData,{CompetitionID:activeCID},true);
				
				var filteredResultsList = [];
				var filteredUPList = [];
				
				for(var i=0;i<compDet.length;i++){
					if(compDet[i].MatchStatus == 'Post' && filterType == 'Post')
							filteredResultsList.push(compDet[i]);
						if((compDet[i].MatchStatus == 'Upcoming' || compDet[i].MatchStatus == 'UpComing' || compDet[i].MatchStatus == 'Live') && filterType == 'Upcoming')
							filteredResultsList.push(compDet[i]);
						if(compDet[i].MatchStatus == 'Live' && filterType == 'Live')
							filteredResultsList.push(compDet[i]);
					
				}
				
			
			$scope.resultList = filteredResultsList;
			if(filterType == 'Upcoming'){
				$scope.fixtureList = filteredResultsList;
				$scope.fixLiveList = filteredResultsList;
			}
				if(filterType == 'Live')
					$scope.liveList = filteredResultsList;
			
			$(".filterM").hide();
			$(".filterTeamsList").removeClass("active");
			$scope.filterTeamName = 'All Teams';
			$scope.filterTeamCode = 'All Teams';
			$scope.filterGroundName = "All Venues";
	}
	
	$scope.showFiltersPopup = function(){
		$(".filterM").show();
		setTimeout(function(){
			$(".filterM").show();
			$("#season_"+$scope.curSeasonId).prop("checked","checked");
		},100);
		
	}

	$scope.teamCatgChange = function(genderTypeParm,pwidType){
		$scope.filterTeamName = "All Teams";
		$scope.filterTeamCode = 'All Teams';
		$scope.cSBTeamsListSearch = "";
		$scope.filterGroundName = "All Venues";
			$scope.cSBGroundsListSearch = "";
		if(genderTypeParm == 'women'){
			$(".vn-menWoTab2 .men_rs").removeClass("active");
			$(".vn-menWoTab2 .women_rs").addClass("active");
			$scope.womensmatches = true;
			$scope.teamCatg = 'WOMEN';
			competitionFeedPath = competitionFeedPath.replace("competition.html", "womenscompetition.html");
		}
		else{
			$scope.womensmatches = false;
			$scope.teamCatg = 'MEN';
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
			if (!$scope.$$phase) {
				$scope.$apply();
			  }

			if(pwidType == 'results')
			{
				$scope.seasonChange(seasonId);
			}
		});

	}
	
	$scope.seasonChange = function(pSesonID){		
				$scope.curSeasonId=pSesonID;				
				if(seasonList != undefined && seasonList.length > 0)
				{
					seasonList.map(function(item){
						if(item.SeasonID == pSesonID)
							$scope.curSeasonName = item.seasonName;
					});
				}

				var url = $scope.clientbasePath+"matches/results/"+$scope.curSeasonName;
				if($scope.teamCatg != 'WOMEN')
					window.location.assign(url);
				
				$scope.curretSeasonCompList = $filter("filter")(competitionList,{SeasonID:$scope.curSeasonId},true);	
				
				$scope.curretSeasonCompFilterList = $scope.curretSeasonCompList;
				
				selectedComList=$filter('filter')(competitionList,{SeasonID:$scope.curSeasonId},true);
				$scope.selectedComList=selectedComList;
				$scope.selectedCompetition = (selectedComList[0] != undefined) ? selectedComList[0] : '';
				competitionId = (selectedComList[0] != undefined) ? selectedComList[0].CompetitionID : '';
				$scope.competitionId = competitionId;
				

				
				if($scope.selectedCompetition.feedsource != undefined)
						feedSource = $scope.selectedCompetition.feedsource;
				
				var zIndex = 0;
				var initTimeZoneCall = false;
				var listenZoneCall = setInterval(function(){
					if(zIndex <= $scope.curretSeasonCompList.length - 1 && !initTimeZoneCall)
					{	
							var tournamentTimeZone = ($scope.curretSeasonCompList[zIndex].timezone != undefined) ? $scope.curretSeasonCompList[zIndex].timezone : 'Asia/Kolkata';
							initTimeZoneCall = true;
							var d = new Date();
							var timeZoneOffset = d.getTimezoneOffset();
							var jan = new Date(d.getFullYear(), 0, 1);
						    var jul = new Date(d.getFullYear(), 6, 1);
						    var maxVal = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
						    var daylight = 0;
						    if(timeZoneOffset < maxVal)
						    	daylight = 1;
								var url = "https://sportsmechanics.in/timeapi.php";
								/*  $.ajax({
									crossDomain: true,
									type: "POST",
									// contentType: "application/json; charset=utf-8",
									// async: true,
									url: url,
									data : {
									  // timezone : 'europe/london'
									  timezone : tournamentTimeZone,
									  timeZoneOffset : timeZoneOffset,
									  daylight : daylight
									},
									dataType: "json",
									success: function (data) {
										zoneTime = (data.cuurenttime != undefined) ? data.cuurenttime : ''; 
										 if(zoneTime != ''){
												zoneTime = new Date(zoneTime).getTime() / 1000;
												
												
													var currentZoneTime =  (data.currentTimezoneTime != undefined) ? data.currentTimezoneTime : ''; 
													currentZoneTime = new Date(currentZoneTime).getTime() / 1000;
													$scope.curretSeasonCompList[zIndex].currentZoneTime = currentZoneTime;
													var zoneAbrv = (data.timezoneABBRV != undefined) ? data.timezoneABBRV : ''; 
													$scope.curretSeasonCompList[zIndex].zoneAbrv = zoneAbrv;
											}
											$scope.curretSeasonCompList[zIndex].zoneTime = zoneTime;

											zIndex = zIndex + 1;
											initTimeZoneCall = false;
										
											
									},
									error:function(){
										zIndex = zIndex + 1;
										initTimeZoneCall = false;
									}
								});*/
								
								zoneTime = new Date().getTime() / 1000;								
									
								var currentZoneTime = new Date().getTime() / 1000;
								$scope.curretSeasonCompList[zIndex].currentZoneTime = currentZoneTime;
								var zoneAbrv =  'IST'; 
								$scope.curretSeasonCompList[zIndex].zoneAbrv = zoneAbrv;
								$scope.curretSeasonCompList[zIndex].zoneTime = zoneTime;
								
								zIndex = zIndex + 1;
								initTimeZoneCall = false;
							}

							if(zIndex > $scope.curretSeasonCompList.length - 1)
							{
								clearInterval(listenZoneCall);	
								console.log(competitionId);
								$scope.bindResult(competitionId,urlString);
								
							}
								
								
						},100);
				
				
				if (!$scope.$$phase) {
					$scope.$apply();
			  	}
				$(".filterM").hide();
				$(".cSBList").removeClass("active");
				setTimeout(function(){
					$scope.seasonList.map(function(item){
									if(pSesonID == item.SeasonID){
										item.selected = true;
									}
									else
										item.selected = false;
										
								});
								
				},2000);
	}

	$scope.cSBShowList = function(event){
		$(".cSBList").removeClass("active");
		$(".customSelecBox").removeClass("openSBox");
		$(event.target).parents(".customSelecBox").addClass("openSBox")
		$(event.target).parents(".customSelecBox").find(".cSBList").toggleClass("active");
	}
	
	$scope.click_matches = function(obj,element_text){
		console.log($scope.curSeasonName);
		dataLayer.push({
		  'event': 'click_matches',
		  'team_details': obj.MatchName,
		  'match_number': obj.MatchOrder,
		  'season' : $scope.curSeasonName,
		  'element_text' : element_text,
		  'time_on_page' : time_on_page_sec
		});
		console.log(dataLayer);
		
	}

	

}]);

/******* End of Control ******/


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
$("document").ready(function(){
	$(document).click(function(){
		$(".cSBList").removeClass("active");
		$(".customSelecBox").removeClass("openSBox");
		$(".inputSearchResultWrap").removeClass("active");
	});

	$(".customSelecBox,.unit_filterItemBlock,.cSBListItemsFilter,.cSBListFItems").click(function(e){
		e.stopPropagation();
	});
});

$("#smScheduleWidget").html('<div class="smscorecardwidget matchCenter" ng-controller="mcCtrl" smfixtureswidget></div>');
$("#smResultsWidget").html('<div class="smscorecardwidget matchCenter" ng-controller="mcCtrl" smresultswidget></div>');


function downloadFixtures(){
	console.log("downloadFixtures");
	dataLayer.push({
		  'event': 'file_download',
		  'file_name': '1676632383158_TATA%20IPL%202023%20-%20Match%20Schedule.pdf', // ^[(a-zA-Z0-9-_, )+]*$
		  'file_type': 'pdf' // ^[(a-zA-Z0-9-_, )+]*$
		});


}