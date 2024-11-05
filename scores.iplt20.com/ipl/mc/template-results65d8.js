angular.module("MyApp").run(["$templateCache", function ($templateCache) {
    $templateCache.put('resultswidget', '<div class="vn-sheduleWrap vn-resultWrap col-100 floatLft vn-sche-pd"> <div class="mx-wid"> <div class="drop-down-filter"> <div class="row"> <div class="col-lg-2 col-md-2 col-sm-6"> <div class="customSelecBox"> <div class="cSBDisplay" ng-click="cSBShowList($event)">{{teamCatg}}</div> <div class="cSBList"> <div class="cSBListItems" ng-click="teamCatgChange(\'men\',\'results\')">MEN</div> <div class="cSBListItems" ng-click="teamCatgChange(\'women\',\'results\')">WOMEN</div> </div> </div> </div> <div class="col-lg-3 col-md-3 col-sm-6 noPaddingL" ng-class="{\'col-lg-3 col-md-3\' : widgettype == \'domestic\'}"> <div class="customSelecBox"> <div class="cSBDisplay" ng-click="cSBShowList($event)">{{filterTeamCode}}</div> <div class="cSBList"> <div class="cSBListItems allFilterSel" ng-click="resultsfilterByTeam(\'\',\'Post\')">All Teams</div> <div class="cSBListItems" ng-repeat="list in teamListData | orderBy:\'TeamName\'" ng-click="resultsfilterByTeam(list,\'Post\')"> <img ng-src="{{list.TeamImage}}" class="dropDownListImg"/> {{list.TeamCode}} </div> </div> </div> </div> <div class="col-lg-2 col-md-2 col-sm-6"> <div class="customSelecBox"> <div class="cSBDisplay" ng-click="cSBShowList($event)">{{filterGroundName}}</div> <div class="cSBList"> <div class="cSBListSearch"> <input type="text" placeholder="Search.." ng-model="cSBGroundsListSearch"> </div> <div class="cSBListItems" ng-click="resultsfilterByGround(\'\',\'Post\')">All Venues</div> <div class="cSBListItems" ng-repeat="list in uniqueGroundList | filter:cSBGroundsListSearch | orderBy:list" ng-click="resultsfilterByGround(list,\'Post\')">{{list}}</div> </div> </div> </div> <div class="col-lg-2 col-md-2 col-sm-6"> <div class="customSelecBox"> <div class="cSBDisplay" ng-click="cSBShowList($event)">SEASON {{curSeasonName}}</div> <div class="cSBList"> <div class="cSBListItems" ng-repeat="list in seasonList" ng-click="seasonChange(list.SeasonID)">SEASON {{list.seasonName}}</div> </div> </div> </div> </div> </div> <div class="vn-sheduleList vn-resultsList posRel vn-fullArchiveList col-100 floatLft menT mb-4"> <span class="timeLineDivider"></span> <ul id="team_archive"> <li ng-repeat="list in resultList | orderBy:\'-timestamp\'"> <div class="vn-schedule-head"> <div class="w20 fl pr50 posRel"> <span class="vn-matchOrder" ng-if="list.MatchOrder != \'Qualifier 1\' && list.MatchOrder != \'Qualifier 2\' && list.MatchOrder != \'Eliminator\' && list.MatchOrder != \'Final\'">Match {{list.MatchRow}}</span> <span class="vn-matchOrder" ng-if="list.MatchOrder == \'Qualifier 1\' || list.MatchOrder == \'Qualifier 2\' || list.MatchOrder == \'Eliminator\' || list.MatchOrder == \'Final\'">{{list.MatchOrder}}</span> <span class="h-b-line"></span> <span class="timeline-dot"></span> </div> <div class="w50 fl"> <span class="vn-venueDet"> <p><span ng-if="list.GroundName != undefined && list.GroundName != \'\'">{{list.GroundName}},</span> {{list.city}}</p> </span> <div class="vn-matchDateTime"> {{list.currentZoneMatchDateDisplay}} , {{list.currentZoneMatchTimeDisplay}} </div> </div> </div> <div class="vn-shedule-desk col-100 floatLft" ng-class="{\'super-over-desk\' : list.CurrentInnings > 2}"> <div class=" w20 tl pr50"> <div class="vn-ticketTitle" ng-if="list.Comments != undefined && list.Comments != \'\' && list.MatchBreakComments == \'\'">{{list.Comments}}</div> <div class="vn-ticketTitle" ng-if="list.MatchBreakComments != undefined && list.MatchBreakComments != \'\'">{{list.MatchBreakComments}}</div> </div> <div class="vn-sheduleLogo"> <div class="live-score"> <div class="vn-shedTeam"> <img ng-if="isNotNull(list.HomeTeamLogo) && !isNotNull(list.MatchHomeTeamLogo)" ng-src="{{list.HomeTeamLogo}}" onerror="this.src = basePath+\'images/default-team-logo.png\';" alt="{{list.FirstBattingTeamName}}" class="schTeamLogo" /><img ng-if="!isNotNull(list.HomeTeamLogo) && !isNotNull(list.MatchHomeTeamLogo)" ng-src="{{basepath}}images/default-team-logo.png" alt="{{list.FirstBattingTeamName}}" class="schTeamLogo" /> <img ng-if="isNotNull(list.MatchHomeTeamLogo)" ng-src="{{list.MatchHomeTeamLogo}}" onerror="this.src = basePath+\'images/default-team-logo.png\';" alt="{{list.HomeTeamName}}" class="schTeamLogo" /> <div class="vn-teamTitle"> <div class="vn-teamName"> <h3 ng-if="list.HomeTeamName == undefined || list.HomeTeamName == \'\'">{{list.FirstBattingTeamName}}</h3> <h3 ng-if="list.HomeTeamName != undefined && list.HomeTeamName != \'\'">{{list.HomeTeamName}}</h3> </div> <div class="vn-teamCode"> <h3 ng-if="list.HomeTeamID == list.FirstBattingTeamID">{{list.FirstBattingTeamCode}}</h3> <h3 ng-if="list.HomeTeamID == list.SecondBattingTeamID">{{list.SecondBattingTeamCode}}</h3> </div> <p ng-if="(list.HomeTeamID == undefined || list.HomeTeamID == \'\' || list.HomeTeamID == list.FirstBattingTeamID) && list[\'1FallWickets\'] != 10 && list[\'1FallScore\'] != \'\'">{{list[\'1FallScore\']}}/{{list[\'1FallWickets\']}} </p> <p ng-if="(list.HomeTeamID == undefined || list.HomeTeamID == \'\' || list.HomeTeamID == list.FirstBattingTeamID) && list[\'1FallWickets\'] == 10">{{list[\'1FallScore\']}} </p> <span class="ov-display" ng-if="(list.HomeTeamID == undefined || list.HomeTeamID == \'\' || list.HomeTeamID == list.FirstBattingTeamID) && list[\'1FallOvers\'] != undefined && list[\'1FallOvers\'] != \'\'">({{list[\'1FallOvers\']}} OV) </span> <p ng-if="list.HomeTeamID == list.SecondBattingTeamID && list[\'2FallWickets\'] != 10 && list[\'2FallScore\'] != \'\'">{{list[\'2FallScore\']}}/{{list[\'2FallWickets\']}} </p> <p ng-if="list.HomeTeamID == list.SecondBattingTeamID && list[\'2FallWickets\'] == 10">{{list[\'2FallScore\']}} </p> <span class="ov-display" ng-if="list.HomeTeamID == list.SecondBattingTeamID && list[\'2FallOvers\'] != undefined && list[\'2FallOvers\'] != \'\'">({{list[\'2FallOvers\']}} OV) </span> </div> </div> <span class="versus"></span> <div class="vn-shedTeam vn-team-2"> <img ng-if="isNotNull(list.AwayTeamLogo) && !isNotNull(list.MatchAwayTeamLogo)" ng-src="{{list.AwayTeamLogo}}" onerror="this.src = basePath+\'images/default-team-logo.png\';" alt="{{list.SecondBattingTeamName}}" class="schTeamLogo" /><img ng-if="!isNotNull(list.AwayTeamLogo) && !isNotNull(list.MatchAwayTeamLogo)" ng-src="{{basepath}}images/default-team-logo.png" alt="{{list.SecondBattingTeamName}}" class="schTeamLogo" /><img ng-if="isNotNull(list.MatchAwayTeamLogo)" ng-src="{{list.MatchAwayTeamLogo}}" onerror="this.src = basePath+\'images/default-team-logo.png\';" alt="{{list.AwayTeamName}}" class="schTeamLogo" /> <div class="vn-teamTitle"> <div class="vn-teamName"> <h3 ng-if="list.AwayTeamName == undefined || list.AwayTeamName == \'\'">{{list.SecondBattingTeamName}}</h3> <h3 ng-if="list.AwayTeamName != undefined && list.AwayTeamName != \'\'">{{list.AwayTeamName}}</h3> </div> <div class="vn-teamCode"> <h3 ng-if="list.AwayTeamID == list.FirstBattingTeamID">{{list.FirstBattingTeamCode}}</h3> <h3 ng-if="list.AwayTeamID == list.SecondBattingTeamID">{{list.SecondBattingTeamCode}}</h3> </div> <p class="match-det" ng-if="(list.AwayTeamID == undefined || list.AwayTeamID == \'\' || list.AwayTeamID == list.SecondBattingTeamID) && list[\'2FallWickets\'] != 10 && list[\'2FallScore\'] != \'\'">{{list[\'2FallScore\']}}/{{list[\'2FallWickets\']}}</p> <p class="match-det" ng-if="(list.AwayTeamID == undefined || list.AwayTeamID == \'\' || list.AwayTeamID == list.SecondBattingTeamID) && list[\'2FallWickets\'] == 10">{{list[\'2FallScore\']}}</p> <span class="ov-display" ng-if="(list.AwayTeamID == undefined || list.AwayTeamID == \'\' || list.AwayTeamID == list.SecondBattingTeamID) && list[\'2FallOvers\'] != undefined && list[\'2FallOvers\'] != \'\'">({{list[\'2FallOvers\']}} OV ) </span> <p class="match-det" ng-if="(list.AwayTeamID == list.FirstBattingTeamID) && list[\'1FallWickets\'] != 10 && list[\'1FallWickets\'] != \'\'">{{list[\'1FallScore\']}}/{{list[\'1FallWickets\']}}</p> <p class="match-det" ng-if="(list.AwayTeamID == list.FirstBattingTeamID) && list[\'1FallWickets\'] == 10">{{list[\'1FallScore\']}}</p> <span class="ov-display" ng-if="(list.AwayTeamID == list.FirstBattingTeamID) && list[\'1FallOvers\'] != undefined && list[\'1FallOvers\'] != \'\'">({{list[\'1FallOvers\']}} OV ) </span> </div> </div> </div> <div class="strip-spo" ng-if="list.CurrentInnings > 2"> <div class="strip-spo-score strip-spo__left" ng-if="list.HomeTeamID == list.SecondInningsFirstBattingID">{{list[\'3FallScore\']}}/{{list[\'3FallWickets\']}}</div> <div class="strip-spo-score strip-spo__left" ng-if="list.HomeTeamID == list.SecondInningsSecondBattingID">{{list[\'4FallScore\']}}/{{list[\'4FallWickets\']}}</div> <div class="strip-spo__vs">Super Over - 1</div> <div class="strip-spo-score strip-spo__right" ng-if="list.AwayTeamID == list.SecondInningsFirstBattingID">{{list[\'3FallScore\']}}/{{list[\'3FallWickets\']}}</div> <div class="strip-spo-score strip-spo__right" ng-if="list.AwayTeamID == list.SecondInningsSecondBattingID">{{list[\'4FallScore\']}}/{{list[\'4FallWickets\']}}</div> </div> <div class="strip-spo" ng-if="list.CurrentInnings > 4"> <div class="strip-spo-score strip-spo__left" ng-if="list.HomeTeamID == list.ThirdInningsFirstBattingID">{{list[\'5FallScore\']}}/{{list[\'5FallWickets\']}}</div> <div class="strip-spo-score strip-spo__left" ng-if="list.HomeTeamID == list.ThirdInningsSecondBattingID">{{list[\'6FallScore\']}}/{{list[\'6FallWickets\']}}</div> <div class="strip-spo__vs">Super Over - 2</div> <div class="strip-spo-score strip-spo__right" ng-if="list.AwayTeamID == list.ThirdInningsFirstBattingID">{{list[\'5FallScore\']}}/{{list[\'5FallWickets\']}}</div> <div class="strip-spo-score strip-spo__right" ng-if="list.AwayTeamID == list.ThirdInningsSecondBattingID">{{list[\'6FallScore\']}}/{{list[\'6FallWickets\']}}</div> </div> </div> <div class="vn-ticket"> <div class="vn-ticnbtn"> <a ng-click="click_matches(list,\'match reports\')" ng-if="list.MatchReportsLink != undefined && list.MatchReportsLink != \'\'" ng-href="{{list.MatchReportsLink}}" class="matchReportIcon" title="Match Reports"><span class="match_actions"><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="45" rx="22.5" fill="#E5E7E9"/><g clip-path="url(#clip0_6978_119456)"><g filter="url(#filter0_b_6978_119456)"><path d="M19.251 32.6389C17.251 31.8389 15.501 30.3889 14.341 28.3789C13.201 26.4089 12.821 24.2189 13.091 22.1289" stroke="#11141C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.8516 15.4794C18.5516 14.1494 20.6816 13.3594 23.0016 13.3594C25.2716 13.3594 27.3616 14.1294 29.0416 15.4094" stroke="#11141C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M26.75 32.6389C28.75 31.8389 30.5 30.3889 31.66 28.3789C32.8 26.4089 33.18 24.2189 32.91 22.1289" stroke="#11141C" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24.2405 26.1314C24.1727 26.0636 24.0717 26.0445 23.9786 26.0676C23.6441 26.1503 23.2812 26.0878 22.9899 25.8797C22.9933 25.8822 22.9967 25.8846 23.0001 25.887C22.7105 26.0892 22.3522 26.1493 22.0217 26.0676C21.9286 26.0445 21.8276 26.0636 21.7598 26.1314L19.0728 28.8231C18.8374 29.059 18.4557 29.059 18.2203 28.8231L17.1974 27.7985C16.962 27.5626 16.962 27.1804 17.1974 26.9445L19.8845 24.2528C19.9522 24.1849 19.9712 24.0837 19.9482 23.9905C19.868 23.6655 19.9245 23.3134 20.1177 23.0262L17.3531 20.2569C16.8823 19.7853 16.8823 19.0207 17.3531 18.5491L18.5464 17.3537C19.0173 16.8821 19.7805 16.8821 20.2512 17.3537L23 20.107L25.7488 17.3537C26.2195 16.8821 26.9828 16.8821 27.4536 17.3537L28.6469 18.5491C29.1177 19.0208 29.1177 19.7853 28.6469 20.2569L25.8823 23.0262C26.0755 23.3134 26.132 23.6654 26.0518 23.9905C26.0288 24.0837 26.0478 24.1849 26.1155 24.2528L28.8026 26.9445C29.038 27.1804 29.038 27.5627 28.8026 27.7985L27.7797 28.8231C27.5443 29.059 27.1626 29.059 26.9272 28.8231L24.2405 26.1314ZM23.7473 25.1297C23.6652 25.15 23.579 25.1274 23.5179 25.0661L18.0353 19.5738C17.9412 19.4795 17.9412 19.3267 18.0353 19.2323L19.2286 18.0369C19.3229 17.9426 19.4755 17.9426 19.5696 18.0369L25.0524 23.529C25.1136 23.5902 25.1362 23.6765 25.1159 23.7588C25.0293 24.1099 25.0802 24.5814 25.4339 24.9359L27.8652 27.3714L27.3538 27.8837L24.9225 25.4482C24.5686 25.0938 24.0979 25.0428 23.7475 25.1296L23.7473 25.1297ZM25.2164 22.3273L27.9652 19.5737C28.0593 19.4794 28.0593 19.3266 27.9652 19.2322L26.7718 18.0368C26.6776 17.9425 26.525 17.9425 26.4308 18.0368L23.6821 20.7901L25.2164 22.3273ZM20.895 23.8048L22.2072 25.1192C21.8623 25.0479 21.4166 25.109 21.078 25.4483L18.6466 27.8838L18.1351 27.3715L20.5666 24.936C20.9052 24.5968 20.9664 24.1503 20.895 23.8048Z" fill="#11141C"/></g></g><defs><filter id="filter0_b_6978_119456" x="8.40771" y="8.75977" width="29.1855" height="28.4795" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6978_119456"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_6978_119456" result="shape"/></filter><clipPath id="clip0_6978_119456"><rect width="24" height="24" fill="white" transform="translate(11 11)"/></clipPath></defs></svg></span><span class="match_actions_hover"><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="45" rx="22.5" fill="#0E1639"/><g clip-path="url(#clip0_6978_119456)"><g filter="url(#filter0_b_6978_119456)"><path d="M19.251 32.6389C17.251 31.8389 15.501 30.3889 14.341 28.3789C13.201 26.4089 12.821 24.2189 13.091 22.1289" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.8516 15.4794C18.5516 14.1494 20.6816 13.3594 23.0016 13.3594C25.2716 13.3594 27.3616 14.1294 29.0416 15.4094" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M26.75 32.6389C28.75 31.8389 30.5 30.3889 31.66 28.3789C32.8 26.4089 33.18 24.2189 32.91 22.1289" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24.2405 26.1314C24.1727 26.0636 24.0717 26.0445 23.9786 26.0676C23.6441 26.1503 23.2812 26.0878 22.9899 25.8797C22.9933 25.8822 22.9967 25.8846 23.0001 25.887C22.7105 26.0892 22.3522 26.1493 22.0217 26.0676C21.9286 26.0445 21.8276 26.0636 21.7598 26.1314L19.0728 28.8231C18.8374 29.059 18.4557 29.059 18.2203 28.8231L17.1974 27.7985C16.962 27.5626 16.962 27.1804 17.1974 26.9445L19.8845 24.2528C19.9522 24.1849 19.9712 24.0837 19.9482 23.9905C19.868 23.6655 19.9245 23.3134 20.1177 23.0262L17.3531 20.2569C16.8823 19.7853 16.8823 19.0207 17.3531 18.5491L18.5464 17.3537C19.0173 16.8821 19.7805 16.8821 20.2512 17.3537L23 20.107L25.7488 17.3537C26.2195 16.8821 26.9828 16.8821 27.4536 17.3537L28.6469 18.5491C29.1177 19.0208 29.1177 19.7853 28.6469 20.2569L25.8823 23.0262C26.0755 23.3134 26.132 23.6654 26.0518 23.9905C26.0288 24.0837 26.0478 24.1849 26.1155 24.2528L28.8026 26.9445C29.038 27.1804 29.038 27.5627 28.8026 27.7985L27.7797 28.8231C27.5443 29.059 27.1626 29.059 26.9272 28.8231L24.2405 26.1314ZM23.7473 25.1297C23.6652 25.15 23.579 25.1274 23.5179 25.0661L18.0353 19.5738C17.9412 19.4795 17.9412 19.3267 18.0353 19.2323L19.2286 18.0369C19.3229 17.9426 19.4755 17.9426 19.5696 18.0369L25.0524 23.529C25.1136 23.5902 25.1362 23.6765 25.1159 23.7588C25.0293 24.1099 25.0802 24.5814 25.4339 24.9359L27.8652 27.3714L27.3538 27.8837L24.9225 25.4482C24.5686 25.0938 24.0979 25.0428 23.7475 25.1296L23.7473 25.1297ZM25.2164 22.3273L27.9652 19.5737C28.0593 19.4794 28.0593 19.3266 27.9652 19.2322L26.7718 18.0368C26.6776 17.9425 26.525 17.9425 26.4308 18.0368L23.6821 20.7901L25.2164 22.3273ZM20.895 23.8048L22.2072 25.1192C21.8623 25.0479 21.4166 25.109 21.078 25.4483L18.6466 27.8838L18.1351 27.3715L20.5666 24.936C20.9052 24.5968 20.9664 24.1503 20.895 23.8048Z" fill="#ffffff"/></g></g><defs><filter id="filter0_b_6978_119456" x="8.40771" y="8.75977" width="29.1855" height="28.4795" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6978_119456"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_6978_119456" result="shape"/></filter><clipPath id="clip0_6978_119456"><rect width="24" height="24" fill="white" transform="translate(11 11)"/></clipPath></defs></svg></span></a> <a ng-click="click_matches(list,\'match highlights\')" ng-if="list.MatchHLLink != undefined && list.MatchHLLink != \'\'" ng-href="{{list.MatchHLLink}}" class="matchHLIcon" title="Highlights"><span class="match_actions"><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.1" width="45" height="45" rx="22.5" fill="#282F40"/><path d="M32.8 12.7906L32.2094 12.2C31.9428 11.9333 31.5121 11.9333 31.2455 12.2L25.6958 17.7496L25.6261 17.6799C25.0559 17.1098 24.1289 17.1098 23.5588 17.6799L12.5291 28.7096C11.8236 29.4151 11.8236 30.5595 12.5291 31.265L13.735 32.4709C14.4405 33.1764 15.5849 33.1764 16.2904 32.4709L27.3201 21.4412C27.8902 20.8711 27.8902 19.9441 27.3201 19.3739L27.2504 19.3042L32.8 13.7545C33.0667 13.4879 33.0667 13.0572 32.8 12.7906ZM26.8443 19.2837L23.206 21.794L25.7163 18.1557L26.8443 19.2837ZM27.1273 21.2484L16.0977 32.2781C15.4988 32.8769 14.5267 32.8769 13.9278 32.2781L12.7219 31.0722C12.1231 30.4733 12.1231 29.5012 12.7219 28.9023L23.7515 17.8727C24.215 17.4092 24.9698 17.4092 25.4333 17.8727L25.5194 17.9588L22.562 22.2493C22.5251 22.3026 22.5333 22.3764 22.5784 22.4216C22.6236 22.4667 22.6974 22.4749 22.7507 22.438L27.0412 19.4806L27.1273 19.5667C27.5949 20.0302 27.5949 20.7808 27.1273 21.2484ZM27.7508 18.4182L26.5818 17.2492L31.0363 12.7947L32.2053 13.9637L27.7508 18.4182ZM26.389 17.442L27.558 18.611L27.0576 19.1114L25.8886 17.9424L26.389 17.442ZM32.6073 13.5617L32.3981 13.7709L31.2291 12.6019L31.4383 12.3927C31.5941 12.2369 31.8607 12.2369 32.0166 12.3927L32.6073 12.9834C32.7672 13.1434 32.7672 13.4018 32.6073 13.5617ZM23.5465 28.9434C22.8163 29.6735 22.8163 30.8589 23.5465 31.589C24.2766 32.3191 25.462 32.3191 26.1921 31.589C26.9222 30.8589 26.9222 29.6735 26.1921 28.9434C25.462 28.2132 24.2766 28.2132 23.5465 28.9434ZM25.9993 31.3921C25.3758 32.0156 24.3627 32.0156 23.7392 31.3921C23.1158 30.7686 23.1158 29.7555 23.7392 29.132C24.3627 28.5086 25.3758 28.5086 25.9993 29.132C26.6228 29.7555 26.6228 30.7686 25.9993 31.3921Z" fill="#11141C" stroke="#11141C"/></svg></span><span class="match_actions_hover"><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="45" rx="22.5" fill="#0E1639"/><path d="M32.8 12.7906L32.2094 12.2C31.9428 11.9333 31.5121 11.9333 31.2455 12.2L25.6958 17.7496L25.6261 17.6799C25.0559 17.1098 24.1289 17.1098 23.5588 17.6799L12.5291 28.7096C11.8236 29.4151 11.8236 30.5595 12.5291 31.265L13.735 32.4709C14.4405 33.1764 15.5849 33.1764 16.2904 32.4709L27.3201 21.4412C27.8902 20.8711 27.8902 19.9441 27.3201 19.3739L27.2504 19.3042L32.8 13.7545C33.0667 13.4879 33.0667 13.0572 32.8 12.7906ZM26.8443 19.2837L23.206 21.794L25.7163 18.1557L26.8443 19.2837ZM27.1273 21.2484L16.0977 32.2781C15.4988 32.8769 14.5267 32.8769 13.9278 32.2781L12.7219 31.0722C12.1231 30.4733 12.1231 29.5012 12.7219 28.9023L23.7515 17.8727C24.215 17.4092 24.9698 17.4092 25.4333 17.8727L25.5194 17.9588L22.562 22.2493C22.5251 22.3026 22.5333 22.3764 22.5784 22.4216C22.6236 22.4667 22.6974 22.4749 22.7507 22.438L27.0412 19.4806L27.1273 19.5667C27.5949 20.0302 27.5949 20.7808 27.1273 21.2484ZM27.7508 18.4182L26.5818 17.2492L31.0363 12.7947L32.2053 13.9637L27.7508 18.4182ZM26.389 17.442L27.558 18.611L27.0576 19.1114L25.8886 17.9424L26.389 17.442ZM32.6073 13.5617L32.3981 13.7709L31.2291 12.6019L31.4383 12.3927C31.5941 12.2369 31.8607 12.2369 32.0166 12.3927L32.6073 12.9834C32.7672 13.1434 32.7672 13.4018 32.6073 13.5617ZM23.5465 28.9434C22.8163 29.6735 22.8163 30.8589 23.5465 31.589C24.2766 32.3191 25.462 32.3191 26.1921 31.589C26.9222 30.8589 26.9222 29.6735 26.1921 28.9434C25.462 28.2132 24.2766 28.2132 23.5465 28.9434ZM25.9993 31.3921C25.3758 32.0156 24.3627 32.0156 23.7392 31.3921C23.1158 30.7686 23.1158 29.7555 23.7392 29.132C24.3627 28.5086 25.3758 28.5086 25.9993 29.132C26.6228 29.7555 26.6228 30.7686 25.9993 31.3921Z" fill="#ffffff" stroke="#ffffff"/></svg></span></a> <a ng-if="!womensmatches" ng-click="click_matches(list,\'match centre\')" ng-href="{{clientbasePath}}match/{{curSeasonName}}/{{list.MatchID}}" class="vn-matchBtn">Match Centre</a> <a ng-if="womensmatches" ng-click="click_matches(list,\'match centre\')" ng-href="{{clientbasePath}}match/women-{{curSeasonName}}/{{list.MatchID}}" class="vn-matchBtn">Match Centre</a> </div> </div> </div> </li> </ul> </div> <div class="no-match-message" ng-if="resultList.length == 0" style="text-align:center;width:100%">No Results</div> </div></div><!-- Filter Men Start --><div class="filterM" style="display:none"> <div class="filter-box filter-box-scroller-for"> <form action="https://www.iplt20.com/teamsarchivefilter" method="POST"> <input type="hidden" name="_token" value="bNHQi463db6sAMPUb4LIGG0VzfrcdFErOhC5VyCI"> <div class="head"> <h3>Filters</h3> <!-- <input type="button" class="btn_filter sel-btn" value="Select" ng-click="resultsfilterByTournament(list,\'Post\')">--> <a class="btn_filter" ng-click="clearFilter(\'Post\')"> clear</a> <div class="close" ng-click="closeFilter()"><img src="https://www.iplt20.com/assets/images/close-sign.svg" alt=""></div> </div> <div class="filters"> <h3>Teams</h3> <ul class="filter-list"> <li ng-repeat="list in uniqueTeamsList | filter:cSBTeamsListSearch | orderBy:list" class="filterTeamsList" data-val="{{list}}"> <label ng-click="resultsfilterByTeam(list,\'Post\')">{{list}} </label> </li> </ul> </div> <div class="filters"> <h3>Venues</h3> <ul class="filter-list"> <li ng-repeat="list in uniqueGroundList" class="filterTeamsList filterGroundsList" data-val="{{list}}"> <label ng-click="resultsfilterByGround(list,\'Post\')">{{list}}</label> </li> </ul> </div> <div class="filters"> <h3>Season</h3> <ul class="filter-list"> <li ng-repeat="list in seasonList" > <input type="radio" id="season_{{list.SeasonID}}" class="seasonList" name="year" value="{{list.SeasonID}}" ng-model="list.selected" ng-change="seasonChange(list.SeasonID)"> <label for="season_{{list.SeasonID}}">{{list.seasonName}} </label> </li> </ul> </div> </form> </div></div>');
} ])