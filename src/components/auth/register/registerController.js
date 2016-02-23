'use strict';

(function () {

  angular.module('registerController', [])
  .controller('RegisterController', ['$scope', '$state', 'AuthService', 'FlashService', function($scope, $state, AuthService, FlashService){

    $scope.user = {email: '', password: ''};

    $scope.register = function(){

      FlashService.clear();

      AuthService.register($scope.user)
      .then(function(response){
        $state.go('app.private.layout.list');
      },
      function(error){
        FlashService.show('Ha ocurrido un error, por favor intente nuevamente.');
      });
    };

    $scope.toLogin = function () {
      $state.go('app.public.layout.login');
    };
  }]);

})();
