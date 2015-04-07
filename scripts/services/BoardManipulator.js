/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('ng-app').factory('BoardManipulator', function () {
  return {
    removeData: function (allData, board) {
      allData.splice(allData.indexOf(board), 1);
    },
    saveData: function (allData, present) {	
		angular.forEach(allData, function (presentAll) {
			if(presentAll.id==present.id){	  
				presentAll.name = present.name;			
				presentAll.columns = [];
			
				angular.forEach(present.columns, function (column) {
					var tempCol = new Column(column.id, column.name)
					
					angular.forEach(column.cards, function (card) {
						var tempCard = new Card(card.title, card.status, card.details, card.data);
						tempCol.cards.push(tempCard);
					});
					presentAll.columns.push(tempCol);
				});
			}		  
		});
    },
    removeCardFromColumn: function (board, column, card) {
      angular.forEach(board.columns, function (col) {
        if (col.id === column.id) {
          col.cards.splice(col.cards.indexOf(card), 1);
        }
      });
    },
    removeColumn: function (board, column) {
      angular.forEach(board.columns, function (col) {
        if (col.id === column.id) {
          board.columns.splice(board.columns.indexOf(col), 1);
        }
      });
    },
    addCardToColumn: function (board, column, cardTitle, details, data) {
      angular.forEach(board.columns, function (col) {
        if (col.id === column.id) {
		  var card = new Card(cardTitle, column.name, details, data);
          col.cards.push(card);
        }
      });
    },
    addCardToNewColumn: function (board, cardTitle, details, data) {
	  var card = new Card(cardTitle, cardTitle, details, data);
	  var column = new Column(0, "Visit"+0);
	  column.cards.push(card);
      board.columns.push(column);
    },
	addColumn: function (board, columnName) {
	  var index = board.columns.length;
	  columnName ? columnName = columnName : columnName = "Visit"+index;
      board.columns.push(new Column(index, columnName));
    },
	
    addBacklog: function (board, backlogName) {
      board.backlogs.push(new Backlog(backlogName));
    },	

    addPhaseToBacklog: function (board, backlogName, phase) {
      angular.forEach(board.backlogs, function (backlog) {
        if (backlog.name === backlogName) {
          backlog.phases.push(new Phase(phase.name));
        }
      });
    },

    addCardToBacklog: function (board, backlogName, phaseName, task) {
      angular.forEach(board.backlogs, function (backlog) {
        if (backlog.name === backlogName) {
          angular.forEach(backlog.phases, function (phase) {
            if (phase.name === phaseName) {
              phase.cards.push(new Card(task.title, task.status, task.details));
            }
          });
        }
      });
    }
  };
});
