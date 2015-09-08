/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('ng-app').factory('BoardManipulator', function () {
  return {
    removeData: function (allData, board) {
      allData.splice(allData.indexOf(board), 1);
	  console.log(allData);
	  console.log(board);
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
		  var card = new Card(idCardGenerate.getID(), cardTitle, column.name, details, data, []);
          col.cards.push(card);
        }
      });
    },
    addCardToNewColumn: function (board, cardTitle, details, data) {
	  var card = new Card(idCardGenerate.getID(), cardTitle, cardTitle, details, data, []);
	  var column = new Column(idColGenerate.getID(), "Visit"+0);
	  column.cards.push(card);
      board.columns.push(column);
    },
	addColumn: function (board, columnName) {
	  columnName ? columnName = columnName : columnName = "Visit"+board.columns.length;
      board.columns.push(new Column(idColGenerate.getID(), columnName));
    },
	
    saveNewWay: function (slideFrom, to) {
		slideFrom.jumps.push(to);
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
