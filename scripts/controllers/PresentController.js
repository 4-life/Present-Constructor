/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('ng-app').controller('PresentController', ['$scope', 'BoardService', 'BoardDataFactory', function ($scope, BoardService, BoardDataFactory) {

  $scope.presentData = BoardService.presentData(BoardDataFactory.kanban);

  $scope.presentSortOptions = {

    //restrict move across columns. move only within column.
    /*accept: function (sourceItemHandleScope, destSortableScope) {
     return sourceItemHandleScope.itemScope.sortableScope.$id !== destSortableScope.$id;
     },*/
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

  $scope.addNewCard = function (file,column) {
	$scope.alert = "";
	console.log(file);
	if(file.size>5000000){
		file.cancel();
		$scope.alert = "active";
		return false;
	}else{
		BoardService.addNewCard($scope.presentData, file, column);
	}
  }
}]);


