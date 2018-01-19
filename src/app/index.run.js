(function() {
  'use strict';

  angular
    .module('jetApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope,$state) {
  


    $log.debug('runBlock end');
  }

})();
