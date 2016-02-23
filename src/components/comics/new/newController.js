'use strict';

(function () {

  angular.module('newController', [])
	.controller('NewController', ['$scope', '$state', 'ComicService', 'FlashService', function($scope, $state, ComicService, FlashService){
    $scope.comic = {name: '', description: '', image: null};

    $scope.add = function () {
      ComicService.new($scope.comic)
      .then(function (response) {
        $state.go('app.private.layout.list');
      });
    };

    $scope.toList = function () {
      $state.go('app.private.layout.list');
    };
  }]);

})();
