/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('ng-app').factory('BoardManipulator', function () {
  return {

    addColumn: function (board, columnName) {
      board.columns.push(new Column(columnName));
    },

   /* addCardToColumn: function (board, column, cardTitle, details) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.push(new Card(cardTitle, column.name, details));
        }
      });
    },*/
    addCardToColumn: function (board, column, cardTitle, details, data) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.push(new Card(cardTitle, column.name, details, data));
        }
      });
    },
    addCardInNewColumn: function (board, cardTitle, details, data) {
      board.columns.push(new ColumnWithCard("Visit",new Card(cardTitle, "status", details, data)));
    },
    removeCardFromColumn: function (board, column, card) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.splice(col.cards.indexOf(card), 1);
        }
      });
    },
    removeColumn: function (board, column) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          board.columns.splice(board.columns.indexOf(col), 1);
        }
      });
    },
    addBacklog: function (board, backlogName) {
      board.backlogs.push(new Backlog(backlogName));
    },	
    addNewColumn: function (board) {
      board.columns.push(new Column("Visit"));
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
