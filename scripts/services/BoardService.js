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
		console.log(present);
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
	buildWay: function (from,to,steps) {
		var
		//slide_FromWidth = from.slide.clientWidth,
		//slide_ToWidth   = to.slide.clientWidth,
		//pres_FromHeight = from.visit.clientHeight,
		//pres_ToHeight   = to.visit.clientHeight,
		//pres_FromTop    = parseInt( from.visit.getBoundingClientRect().top.toFixed(0) ),
		//pres_ToTop      = parseInt( to.visit.getBoundingClientRect().top.toFixed(0) ),
		
		slide_FromHeight = from.slide.clientHeight,
		slide_ToHeight   = to.slide.clientHeight,
				
		slide_FromLeft = parseInt( from.slide.getBoundingClientRect().left.toFixed(0) ),
		slide_FromTop  = parseInt( from.slide.getBoundingClientRect().top.toFixed(0) ),
		slide_ToTop    = parseInt( to.slide.getBoundingClientRect().top.toFixed(0) ),
		slide_ToLeft   = parseInt( to.slide.getBoundingClientRect().left.toFixed(0) ),
				
		step3_height = 0,
		step4_width  = 0,
		
		fromTop = slide_FromHeight + slide_FromTop,
		toTop   = slide_ToHeight + slide_ToTop;
		steps.s1.attr("style","height:30px");	
		steps.s2.attr("style","width:"+slide_FromLeft+"px");
		steps.s5.attr("style","height:30px");	
		
		step3_height = fromTop - toTop; 		
		
		if(step3_height < 0){
			var check = Math.abs(step3_height + slide_ToHeight);			
			if( check < slide_ToHeight/2){
				step4_width = slide_ToLeft - slide_FromLeft;
				steps.s2.attr("style","width:0px; left:0; right:auto");
				steps.s3.attr("style","height:auto;top: auto;bottom: 0;");			
				if(step4_width > 0){
					steps.s4.attr("style","width:" + step4_width + "px;");
				}else{
					steps.s4.attr("style","width:" + Math.abs(step4_width) + "px; right:0; left:auto;");
					steps.s5.attr("style","height:" + 60 + "px; left:0; right:auto;");				
				}
			}else{
				steps.s3.attr("style","height:" + (check-22) + "px");
				steps.s4.attr("style","width:" + slide_ToLeft + "px");
			}
		}else{
			steps.s3.attr("style","height:" + (step3_height + slide_ToHeight + 32) + "px; bottom:0; top:auto;");
			steps.s4.attr("style","width:" + slide_ToLeft + "px; top:0; bottom:auto;");
		}	
		
	},
	saveNewWay: function(pres, from, to){
	  var fromVisit, fromSlide; 
      angular.forEach(pres.columns, function (col) {
        if (col.id === from.visit) {
			fromVisit = col;
        }
      });
      angular.forEach(fromVisit.cards, function (slide) {
        if (slide.id === from.slide) {
			BoardManipulator.saveNewWay(slide, to);	
        }
      });	
	},
	setContentHome: function(){
		location.href = "/";			
	}
	
  };
}]);