(function(){
	'use strict';

	angular
		.module('jetApp')
		.factory('UserModel',UserModel);

	/*@ngInject*/
	function UserModel(){

		var UserModel = function(info){
			this.info = info || { };
		};

		return UserModel;

	}

})();