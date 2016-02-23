'use strict';

(function () {

  angular.module('privateHeaderController', [])
  .controller('PrivateHeaderController', ['$scope', '$state', 'AuthService', 'FlashService',
  function($scope, $state, AuthService, FlashService){

    $scope.query = '';

    $scope.logout = function () {
      AuthService.logout()
      .then(function (){
        $state.go('app.public.layout.login');
      });
    };

    $scope.search = function () {
      $state.go('app.private.layout.search', {query: $scope.query});
    };
  }]);
})();
