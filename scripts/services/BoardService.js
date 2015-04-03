/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('ng-app').service('BoardService', ['$modal', 'BoardManipulator', function ($modal, BoardManipulator) {

  return {
    removeCard: function (board, column, card) {
       BoardManipulator.removeCardFromColumn(board, column, card);
    },
    removeColumn: function (board, column) {
       BoardManipulator.removeColumn(board, column);
    },

    addNewCard: function (board, file, column) {
      /*var modalInstance = $modal.open({
        templateUrl: 'views/partials/newCard.html',
        controller: 'NewCardController',
        backdrop: 'static',
        resolve: {
          column: function () {
            return column;
          }
        }
      });
      modalInstance.result.then(function (cardDetails) {
        if (cardDetails) {
          BoardManipulator.addCardToColumn(board, cardDetails.column, cardDetails.title, cardDetails.details);
        }
      });
	  */
	  if(!column){
		BoardManipulator.addCardInNewColumn(board, "Slide", file.name, file);
	  }else{
		BoardManipulator.addCardToColumn(board, column, "Slide", file.name, file);		
	  }
    },
    addNewColumn: function (board) {
       BoardManipulator.addNewColumn(board);
    },
    presentData: function (board) {
      var presentData = new Board(board.name, board.numberOfColumns);
      angular.forEach(board.columns, function (column) {
        BoardManipulator.addColumn(presentData, column.name);
        angular.forEach(column.cards, function (card) {
          BoardManipulator.addCardToColumn(presentData, column, card.title, card.details, card.data);
        });
      });
      return presentData;
    }
  };
}]);