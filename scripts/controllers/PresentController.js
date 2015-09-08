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
	if(file.size>4000000){
		$scope.alertSizeFiles.push(file.name);
	}else{
		BoardService.addNewCard($scope.presentData, file, column);
	}
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
				var tempCard = new Card(card.id, card.title, card.status, card.details, card.data.uniqueIdentifier||card.data, card.jumps);	
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
  
  
  $scope.buildWay = function(columnTo, cardTo){
	if($scope.buildWayMode){
			
		var coFrom = $scope.columnFrom,
			caFrom = $scope.cardFrom;
			
		angular.element( document.getElementsByClassName("buildWayModeToGo") ).removeAttr('style');
							
		if(coFrom==columnTo && caFrom==cardTo)return false;						
				
		var coFromEl = $scope.coFromEl;
		var caFromEl = $scope.caFromEl;
		var coToEl   = angular.element( document.querySelector( '#'+columnTo ) )[0];	
		var caToEl   = angular.element( coToEl.querySelector( '#'+cardTo ) )[0];
			
		var from = {
			"visit" : coFromEl,
			"slide" : caFromEl
		}
		var to = {
			"visit" : coToEl,
			"slide" : caToEl
		}			
		var steps = {
			"s1" : angular.element(caFromEl.querySelector('.step1')),
			"s2" : angular.element(caFromEl.querySelector('.step2')),
			"s3" : angular.element(caFromEl.querySelector('.step3')),
			"s4" : angular.element(caFromEl.querySelector('.step4')),
			"s5" : angular.element(caFromEl.querySelector('.step5'))
		}
		
		angular.element(caToEl.querySelector('.buildWayModeToGo')).attr("style","display:block");	
		
		BoardService.buildWay(from, to, steps);
		
	}else{
		console.log("buildWayMode: OFF");
	}
  }
  
  $scope.buildWayModeCh = function(mode, columnFrom, cardFrom){
	if(mode){
		$scope.buildWayMode = true;
		$scope.columnFrom = columnFrom;
		$scope.cardFrom = cardFrom;
		$scope.whereGo = true;
		$scope.coFromEl = angular.element( document.querySelector( '#' + columnFrom ) )[0];
		$scope.caFromEl = angular.element( $scope.coFromEl.querySelector( '#' + cardFrom ) )[0];
		angular.element($scope.caFromEl.querySelector('.buildWayModeShow')).addClass("expand");
	}else{
		$scope.buildWayMode = false;
		$scope.whereGo = false;
		$scope.buildWayModeShow=false; 
		angular.element($scope.caFromEl.querySelector('.expand')).removeClass("expand");
		angular.element( document.getElementsByClassName("buildWayModeToGo") ).removeAttr('style');
	}
  }
  
  $scope.buildWayModeBuild = function(column, card){
	$scope.buildWayModeCh(false);
	var from = {
		"visit" : $scope.columnFrom,
		"slide" : $scope.cardFrom
	},
	to = {
		"visit" : column,
		"slide" : card
	};	
	BoardService.saveNewWay($scope.presentData, from, to);
  }
  
  $scope.setJump = function(col, card, to, index){
	col = angular.element( document.querySelector( '#' + col ) )[0];
	card = angular.element( col.querySelector( '#' + card ) )[0];
	console.log(card);
	var jumpEl = angular.element( card.querySelector( '#jump' + index ) )[0];
	var from = {
		"visit" : col,
		"slide" : card
	}
	var to = {
		"visit" : angular.element( document.querySelector( '#' + to.visit ) )[0],
		"slide" : angular.element( document.querySelector( '#' + to.slide ) )[0]
	}			
	var steps = {
		"s1" : angular.element(card.querySelector('.step1')),
		"s2" : angular.element(card.querySelector('.step2')),
		"s3" : angular.element(card.querySelector('.step3')),
		"s4" : angular.element(card.querySelector('.step4')),
		"s5" : angular.element(card.querySelector('.step5'))
	}
		console.log(angular.element(card.querySelector('.step1')));
	BoardService.buildWay(from, to, steps);
  }
  
  
}]);


