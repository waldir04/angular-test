'use strict';

(function () {

  angular.module('editController', [])
	.controller('EditController', ['$scope', '$state', '$stateParams', 'ComicService', 'FlashService',
  function($scope, $state, $stateParams, ComicService, FlashService){

    $scope.comic = {};
    $scope.id = $stateParams.comic_id;

    ComicService.get($scope.id)
    .then(function(response) {
      $scope.comic = response;
    });

    $scope.edit = function () {
      ComicService.update($scope.id, $scope.comic)
      .then(function (response) {
        $state.go('app.private.layout.list');
      });
    };

    $scope.toList = function () {
      $state.go('app.private.layout.list');
    };
  }]);
})();
