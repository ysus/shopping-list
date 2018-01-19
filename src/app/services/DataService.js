


(function(){
	'use strict';

	angular
		.module('jetApp.services')
		.factory('DataService',DataService);


	/*@ngInject*/
	function DataService($resource,$http){


		var services ={
			getPromociones: getPromociones,

		}

		return services;


		function getPromociones(){
			return $http.get('/data/data.json');
		}

	}

})();