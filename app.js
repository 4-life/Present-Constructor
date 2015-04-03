/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

// Declare app level module which depends on other modules
angular.module('ng-app', [
	'flow',
    'ui.sortable',
    'ui.bootstrap'
  ])
  .config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: '',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on('catchAll', function (event) {
      //console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
    flowFactoryProvider.factory = fustyFlowFactory;
  }]);;

var columnCount = 0;
  
function Board(name, numberOfColumns) {
  return {
    name: name,
    numberOfColumns: numberOfColumns,
    columns: [],
    backlogs: []
  };
}

function Column(name) {
  columnCount++;
  return {
    name: name+columnCount,
    title: name+columnCount,
    cards: []
  };
}
function ColumnWithCard(name,card) {
  columnCount++;
  return {
    name: name+columnCount,
    title: name+columnCount,
    cards: [card]
  };
}

function Backlog(name) {
  return {
    name: name,
    phases: []
  };
}

function Phase(name) {
  return {
    name: name,
    cards: []
  };
}

function Card(title, status, details, data) {
  this.title = title;
  this.status = status;
  this.details = details;
  this.data = data;
  return this;
}