(function () {
  'use strict';

  angular
    .module('jetApp')
    .controller('PromocionesController', PromocionesController);

  /** @ngInject */
  function PromocionesController($mdDialog,$scope, PromocionesData) {

    var vm = this;
    vm.items = {};
    vm.shoppingList = {};
    vm.total=0;
    vm.formData={ present:'NO'};

    init();

    function init() {
      vm.items = PromocionesData.data.info;

    }

    vm.updateItem = function (item, index, operation) {

      if (operation === 'add') {
        if (vm.shoppingList[index]) {
          vm.shoppingList[index]['total'] += item.unitPrice;
          vm.shoppingList[index]['units'] += 1;
          
        } else {
          vm.shoppingList[index] = { total: item.unitPrice, units:1 };
        }
      } else {
        if (vm.shoppingList[index])
          if (vm.shoppingList[index]['total'] === 0) {
            alert("Lista vacia");
          } else {
            vm.shoppingList[index]['total'] -= item.unitPrice;
            vm.shoppingList[index]['units'] -=1;
            
          }
        else
          alert("Agregue algún item")
      }

      console.log(vm.shoppingList);
    }

    vm.getItemUnits = function(index) {

      return vm.shoppingList[index] ? vm.shoppingList[index]['units'] : 0 ;
    }

    vm.getItemTotal = function(index) {

      return vm.shoppingList[index] ? vm.shoppingList[index]['total'] : 0 ;
    }


    vm.submit= function() {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#login')))
          .clickOutsideToClose(true)
          .title('Gracias por su compra, Total: $'+vm.total)
          .textContent('Ha obtenido un cupon de descuento (XX12) del 5% para su proxima compra con un valor de :$'+ (vm.total*0.05))
          .ariaLabel('Alert Dialog Demo')
          .ok('Cerrar')
          
      );
      vm.shoppingList = {};
      vm.total=0;
      vm.formData={ present:'NO'};

    }

    $scope.$watch(function() { return vm.shoppingList}, function(newVal, oldVal) {
      // if (newVal === oldVal) {
      //   return;
      // }
      vm.total=0;
      angular.forEach(newVal,function(val,index){
        vm.total +=val.total; 
      })

    }, true);


  }
})();
