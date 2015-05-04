/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';


angular.module('ng-app').controller('PresentController', ['$scope', 'BoardService', 'BoardDataFactory', '$http', function ($scope, BoardService, BoardDataFactory, $http) {

  //current data
  $scope.presentAllData = BoardDataFactory.presents; 
  
  
  $scope.getDataRequest = function(){
	BoardService.getDataRequest(function (allData, data) {
		if(allData){
			$scope.presentAllData = allData;
			$scope.presentData = data;
			
			if(!$scope.presentData){
				$scope.setContent('presentList');
			}
			$scope.setContent("presentDetail");	
		}else{	
			$scope.parseError = true;						
		}
	});	
  }
  
  $scope.getDataRequest();
	
  
  
  
  
  
  if($scope.presentAllData[0]){
	$scope.presentData = BoardService.presentData($scope.presentAllData[0]);
  }
  
  $scope.content = "presentList";
  
  
  $scope.presentSortOptions = {
    itemMoved: function (event) {
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
    },
    orderChanged: function (event) {
	
    },
    containment: '#board'
  };
  

  $scope.removeCard = function (column, card) {
    BoardService.removeCard($scope.presentData, column, card);
  }
  $scope.removeColumn = function (column) {
    BoardService.removeColumn($scope.presentData, column);
  }
  $scope.addNewColumn = function () {
    BoardService.addNewColumn($scope.presentData);
  }
  $scope.alertSizeFiles = [];
  
  $scope.addNewCard = function (file,column) {
	if(file.size>5000000){
		$scope.alertSizeFiles.push(file.name);
	}else{
		BoardService.addNewCard($scope.presentData, file, column);
	}
	$scope.downloadArea = true;
	//file.cancel();
  }
   
  
  $scope.deleteAlert = function (alert) {
	var index = $scope.alertSizeFiles.indexOf(alert);
	$scope.alertSizeFiles.splice(index, 1);
  }
  
  $scope.showPresent = function(key){ //ng-click="showPresent($index)"
	$scope.presentData = BoardService.presentData($scope.presentAllData[key]);
	$scope.setContent("presentDetail");
  }
   
  $scope.createNewPresent = function(){	
	var index = $scope.presentAllData.length;
	var newBoard = new Board(null, "Present"+index);
	$scope.presentAllData[index] = newBoard;
	$scope.presentData = BoardService.presentData(newBoard);
	$scope.setContent("presentDetail");
  }
  
  $scope.progresSavingDone = false;
  $scope.saveData = function(flow, present){
	$scope.progresSavingDone = true;
  
	var curPresent = {};	
	
	flow.opts.target = '/api/upload/';
	flow.upload();
	
	angular.forEach($scope.presentAllData, function (presentAll) {
	  if(presentAll.id==present.id){	  
		presentAll.name = curPresent.name = present.name;			
		presentAll.columns = [];
		curPresent.columns = [];
		curPresent.id = present.id;
		curPresent.brand = present.brand;
		
		angular.forEach(present.columns, function (column) {
			var tempCol = new Column(column.id, column.name)
			
			angular.forEach(column.cards, function (card) {				
				var tempCard = new Card(card.title, card.status, card.details, card.data.uniqueIdentifier||card.data);	
				tempCol.cards.push(tempCard);
			});
			curPresent.columns.push(tempCol);
			presentAll.columns.push(tempCol);
		});
	  }		  
	});		
	
	BoardService.saveDataRequest(curPresent, function (callback) {
		if(callback){
			$scope.progresSavingDone = false;
		}else{
			$scope.progresSavingDone = false;	
			$scope.progresError = true;			
		}
	});
	
	//$scope.setContent("presentList");
  } 
  
  $scope.removeData = function(present){	
    BoardService.removeData($scope.presentAllData, present);
	
	BoardService.removeDataRequest(present);
	
	//$scope.setContent("presentList");
  }
  
  $scope.setContent = function(content){
	if(content=='presentList'){
		location.href = "/";	
	}else{
		$scope.content = content;
	}
  }
  
  $scope.checkFlowData = function(data){
	var type = typeof(data);
	if(type == "object"){
		return true;
	}else{
		return false;
	}
  }
  
  $scope.checkStringData = function(data){
	var type = typeof(data);
	if(type == "string"){
		return true;
	}else{
		return false;
	}
  }
  
  
  $scope.buildWay = function(columnTo,cardTo){
	if($scope.buildWayMode){
		var coFrom = $scope.columnFrom,
			caFrom = $scope.cardFrom,
			coTo   = columnTo,
			caTo   = cardTo;
		
		//console.log("from: "+coFrom+", "+caFrom+"; to:"+ coTo+", "+ caTo);
		
		var coFromEl = angular.element( document.querySelector( '#column'+coFrom ) );
		var caFromEl = angular.element( document.querySelector( '#card'+caFrom ) );
		var coToEl = angular.element( document.querySelector( '#column'+coTo ) );
		var caToEl = angular.element( document.querySelector( '#card'+caTo ) );
		
		var caTo_w
		
		var caFrom_w = caTo_w = caFromEl.clientWidth;
		
		var coFrom_h = coTo_h = coFromEl[0].clientHeight;
		
		var caFrom_h = caTo_h = caFromEl[0].clientHeight;
		
		var caFrom_Ot = caTo_Ot = caFromEl[0].getBoundingClientRect().top;
		var caFrom_Ol = caFromEl[0].getBoundingClientRect().left;
		
		var caTo_Ol = caToEl[0].getBoundingClientRect().left;
		
		
		$scope.step2 = {"width" : caFrom_Ol+"px"};
		$scope.step3 = {"height": coTo*coFrom_h+"px"};
		$scope.step4 = {"width": caTo_Ol+"px"};
	}else{
		console.log("buildWayMode: OFF");
	}
  }
  
  $scope.buildWayModeCh = function(mode,columnFrom,cardFrom){
	if(mode){
		$scope.buildWayMode = true;
		$scope.columnFrom = columnFrom;
		$scope.cardFrom = cardFrom;
	}else{
		$scope.buildWayMode = false;
	}
  }
    
  
}]);


