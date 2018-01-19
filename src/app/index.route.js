(function() {
  'use strict';

  angular
    .module('jetApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider,$locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/promociones');

    $stateProvider
      .state('app', {
        abstract: true,
        views   :{
            'main@' :{
              templateUrl : 'app/components/core/layouts/horizontal-navigation.html',
              controller  : 'MainController as vm'
            },
            'navigation@app' :{
              templateUrl: 'app/toolbar/layouts/horizontal-navigation/toolbar.html',
              controller  : 'ToolbarController as vm'
            }
        }
      });

    
  }

})();