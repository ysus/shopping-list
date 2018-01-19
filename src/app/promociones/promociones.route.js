(function() {
  'use strict';

  angular
    .module('jetApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('app.promociones', {
        url: '/promociones',
        views : {
          'content@app':{
            templateUrl: 'app/promociones/promociones.html',
            controller: 'PromocionesController',
            controllerAs: 'vm'
          }
        },
        resolve : {
          PromocionesData :function($q,DataService){
            return DataService.getPromociones(); 
          }

        }
      });

  }

})();