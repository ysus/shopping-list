(function() {
  'use strict';

angular
	.module('jetApp')
	.filter('removehtml', function() {
	return function(text) {
		return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
	};
});

})();