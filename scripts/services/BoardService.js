/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('ng-app').service('BoardService', ['$modal', 'BoardManipulator', function ($modal, BoardManipulator) {

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
		BoardManipulator.addCardToNewColumn(board, file.name, "пустое описание1", file);
	  }else{
		BoardManipulator.addCardToColumn(board, column, file.name, "пустое описание2", file);		
	  }
    },
	presentData: function (board) {
      var presentData = new Board(board.id, board.name, board.numberOfColumns);
      angular.forEach(board.columns, function (column) {
        BoardManipulator.addColumn(presentData, column.name);
        angular.forEach(column.cards, function (card) {
		  console.log(card.data);
          BoardManipulator.addCardToColumn(presentData, column, card.title, card.details, card.data);
        });
      });
      return presentData;
    }
  };
}]);