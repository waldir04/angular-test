'use strict';

(function () {

  angular.module('listController', [])
  .controller('ListController', ['$scope', '$state', 'ComicService', 'FlashService',
  function($scope, $state, ComicService, FlashService){

    $scope.showLoad = true;
    $scope.comics = [];
    $scope.page = 0;
    $scope.pages = 0;


    $scope.loadMore = function () {
      if($scope.pages > $scope.page || $scope.page === 0){

        $scope.page++;

        ComicService.list($scope.page)
        .then(function (response) {
          
          $scope.comics = $scope.comics.concat(response.data);
          $scope.pages = response.pages;

          if($scope.pages <= $scope.page){
            $scope.showLoad = false;
          }
        });
      }
    };

    $scope.toDetail = function (id){
      $state.go('app.private.layout.detail', { comic_id : id });
    };

    $scope.loadMore();

  }]);
})();
