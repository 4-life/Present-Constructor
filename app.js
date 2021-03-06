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
      //target: '/Present-Constructor/server/upload.php',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on('catchAll', function (event) {
      //console.log('catchAll', arguments);
    });
	flowFactoryProvider.on('filesSubmitted', function(file) {
		//console.log(Flow);
	});
    // Can be used with different implementations of Flow.js
    flowFactoryProvider.factory = fustyFlowFactory;
  }])
 
		

  
function Board(id, name, brand){
  return {
	id: id,
    name: name,
	brand: brand,
    columns: [],
    backlogs: []
  };
}

function Column(id, name) { 
  return {
	id: id,
    name: name,
    title: name,
    cards: []
  };
}

function Card(id, title, status, details, data, jumps) {
  this.id = id;
  this.title = title;
  this.status = status;
  this.details = details;
  this.data = data;
  this.jumps = jumps;
  return this;
}


function generatorID(prefix){
	this.prefix = prefix+(+new Date())+'_';
	this.num = 1;
	this.getID = function(){
		return this.prefix+(this.num++);
	}
}

var idCardGenerate = new generatorID('id');
var idColGenerate = new generatorID('id');
	  
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
