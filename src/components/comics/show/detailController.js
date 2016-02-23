'use strict';

(function () {

  angular.module('detailController', [])
  .controller('DetailController', ['$scope', '$state', '$stateParams', 'ComicService', 'AuthService', 'FlashService', function($scope, $state, $stateParams, ComicService, AuthService, FlashService){

    $scope.comic = {};
    $scope.newcomment = {message: '', user: AuthService.currentUser().email };
    var comic_id = $stateParams.comic_id;

    ComicService.get(comic_id)
    .then(function(response) {
      $scope.comic = response;
    });

    $scope.commentPost = function () {
      ComicService.comment(comic_id, $scope.newcomment)
      .then(function (response){
        $scope.comic.comments.unshift($scope.newcomment);
        $scope.newcomment = {message: '', user: AuthService.currentUser().email };
      })
    };

    $scope.toEdit = function () {
      $state.go('app.private.layout.edit', { comic_id : comic_id });
    };

  }]);

})();
