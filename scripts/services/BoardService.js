/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('ng-app').service('BoardService', ['$modal', 'BoardManipulator', '$http', function ($modal, BoardManipulator, $http) {

  return {
    removeData: function (allData, board) {
       BoardManipulator.removeData(allData, board);
    },
    saveData: function (allData, board) {
       BoardManipulator.saveData(allData, board);
    },
    removeCard: function (board, column, card) {
       BoardManipulator.removeCardFromColumn(board, column, card);
    },
    removeColumn: function (board, column) {
       BoardManipulator.removeColumn(board, column);
    },
    addNewColumn: function (board) {
       BoardManipulator.addColumn(board);
    },
	addNewCard: function (board, file, column) {
	  if(!column){
		BoardManipulator.addCardToNewColumn(board, file.name, "нет", file);
	  }else{
		BoardManipulator.addCardToColumn(board, column, file.name, "нет", file);		
	  }
    },
	presentData: function (board) {
	  if(!board)return false;
      var presentData = new Board(board.id, board.name, board.brand);
      angular.forEach(board.columns, function (column) {
        BoardManipulator.addColumn(presentData, column.name);
        angular.forEach(column.cards, function (card) {
          BoardManipulator.addCardToColumn(presentData, column, card.title, card.details, card.data);
        });
      });
      return presentData;
    },
    saveDataRequest: function (present, callback) {		
		$http.post('/api/save/', present).
		success(function(data, status, headers, config) {
			if(data=="done"){
				callback(true);
			}else{
				callback(false);				
			}
		}).
		error(function(data, status, headers, config) {
			callback(false);	
		});			
    },
    removeDataRequest: function (present) {	
		var self = this;
		$http.post('/api/remove/', present).
		success(function(data, status, headers, config) {
			self.setContentHome();
		}).
		error(function(data, status, headers, config) {
			self.setContentHome();	
		});			
    },
    getDataRequest: function (callback) {	
		var self = this, presentAllData, presentData, presentId = location.search.split('presentId=')[1];
		$http.post('/api/parse/').
		success(function(data, status, headers, config) {
			presentAllData = data;
			if($scope.presentId){
				angular.forEach(presentAllData, function (presentAll) {
					if(presentAll.id == presentId){	 
						presentData = BoardService.presentData(presentAll);
					}		  
				});	
			}
			callback(presentAllData,presentData);
		}).
		error(function(data, status, headers, config) {
			callback(false);
		});		
		
    },
	setContentHome: function(){
		location.href = "/";			
	}
	
  };
}]);