(function() {
  'use strict';

  angular
    .module('jetApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;


    init();

    function init() {
      console.log("init MainController");


      
    }

  
  }
})();
