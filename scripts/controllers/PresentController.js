/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('ng-app').controller('PresentController', ['$scope', 'BoardService', 'BoardDataFactory', function ($scope, BoardService, BoardDataFactory) {

  $scope.presentAllData = BoardDataFactory.presents; 
  
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
	file.cancel();
  }
   
  
  $scope.deleteAlert = function (alert) {
	var index = $scope.alertSizeFiles.indexOf(alert);
	$scope.alertSizeFiles.splice(index, 1);
  }
  
  $scope.showPresent = function(key){
	$scope.presentData = BoardService.presentData($scope.presentAllData[key]);
	$scope.setContent("presentDetail");
  }
  
  
  
  $scope.createNewPresent = function(){	
	var index = $scope.presentAllData.length;
	var newBoard = new Board(index, "Present"+index, 0);
	$scope.presentAllData[index] = newBoard;
	$scope.presentData = BoardService.presentData(newBoard);
	$scope.setContent("presentDetail");
  }
  
  $scope.saveData = function(present){	
    BoardService.saveData($scope.presentAllData, present);
	$scope.setContent("presentList");
  } 
  
  $scope.removeData = function(present){	
    BoardService.removeData($scope.presentAllData, present);
	$scope.setContent("presentList");
  }
  
  $scope.setContent = function(content){
	$scope.content = content;
  }
  
}]);


