(function () {
  'use strict';

  angular
    .module('jetApp')
    .controller('PromocionesController', PromocionesController);

  /** @ngInject */
  function PromocionesController($mdDialog, $scope, PromocionesData) {

    var vm = this;
    vm.items = {};
    vm.shoppingList = {};
    vm.total = 0;
    vm.formData = { };

    init();

    function init() {
      vm.items = PromocionesData.data.info;

      var currgeocoder;
      //Set geo location lat and long
      navigator.geolocation.getCurrentPosition(function (position, html5Error) {
        var geo_loc = processGeolocationResult(position);
        var currLatLong = geo_loc.split(",");
        initializeCurrent(currLatLong[0], currLatLong[1]);
      });

      //Get geo location result
      function processGeolocationResult(position) {
        var html5Lat = position.coords.latitude; //Get latitude
        var html5Lon = position.coords.longitude; //Get longitude
        var html5TimeStamp = position.timestamp; //Get timestamp
        var html5Accuracy = position.coords.accuracy; //Get accuracy in meters
        return (html5Lat).toFixed(8) + ", " + (html5Lon).toFixed(8);
      }

      //Check value is present 
      function initializeCurrent(latcurr, longcurr) {
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(latcurr, longcurr);

        geocoder.geocode(
          { 'latLng': latlng },
          function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                var add = results[0].formatted_address;
                vm.formData = { present: 'NO', address: add };

                var value = add.split(",");
                var count = value.length;
                var country = value[count - 1];
                var state = value[count - 2];
                var state1 = state.replace(/\d+/g, '');
                var city = value[count - 3];
              }
              else {
                alert("Dirección no encontrada");
              }
            }
            else {
              alert("Geocoder falló: " + status);
            }
          }
        );
      }


    }

    vm.updateItem = function (item, index, operation) {

      if (operation === 'add') {
        if (vm.shoppingList[index]) {
          vm.shoppingList[index]['total'] += item.unitPrice;
          vm.shoppingList[index]['units'] += 1;

        } else {
          vm.shoppingList[index] = { total: item.unitPrice, units: 1 };
        }
      } else {
        if (vm.shoppingList[index])
          if (vm.shoppingList[index]['total'] === 0) {
            alert("Lista vacia");
          } else {
            vm.shoppingList[index]['total'] -= item.unitPrice;
            vm.shoppingList[index]['units'] -= 1;

          }
        else
          alert("Agregue algún item")
      }

      console.log(vm.shoppingList);
    }

    vm.getItemUnits = function (index) {

      return vm.shoppingList[index] ? vm.shoppingList[index]['units'] : 0;
    }

    vm.getItemTotal = function (index) {

      return vm.shoppingList[index] ? vm.shoppingList[index]['total'] : 0;
    }


    vm.submit = function () {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#login')))
          .clickOutsideToClose(true)
          .title('Gracias por su compra, Total: $' + vm.total)
          .textContent('Ha obtenido un cupon de descuento (XX12) del 5% para su proxima compra con un valor de :$' + (vm.total * 0.05))
          .ariaLabel('Alert Dialog Demo')
          .ok('Cerrar')

      );
      vm.shoppingList = {};
      vm.total = 0;
      vm.formData = { present: 'NO' };

    }

    $scope.$watch(function () { return vm.shoppingList }, function (newVal, oldVal) {
      // if (newVal === oldVal) {
      //   return;
      // }
      vm.total = 0;
      angular.forEach(newVal, function (val, index) {
        vm.total += val.total;
      })

    }, true);

  }
})();
