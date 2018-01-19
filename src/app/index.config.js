(function() {
  'use strict';

  angular
    .module('jetApp')
    .config(config);

  /** @ngInject */
  function config($logProvider,$mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib

    $mdThemingProvider.theme('customTheme')
      .primaryPalette('blue')
      .accentPalette('light-blue')
      .warnPalette('red');
   
  }

})();
