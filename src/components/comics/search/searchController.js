'use strict';

(function () {

  angular.module('searchController', [])
  .controller('SearchController', ['$scope', '$state', '$stateParams','ComicService', 'FlashService',
  function($scope, $state, $stateParams, ComicService, FlashService){

    $scope.showLoad = true;
    $scope.comics = [];
    $scope.page = 0;
    $scope.pages = 0;
    $scope.query = $stateParams.query;

    $scope.loadMore = function () {
      if(($scope.pages > $scope.page || $scope.page === 0) && typeof $scope.query !== 'undefined' && $scope.query.length > 0){

        $scope.page++;

        ComicService.search($scope.query, $scope.page)
        .then(function (response) {

          $scope.comics = $scope.comics.concat(response.data);
          $scope.pages = response.pages;

          if($scope.pages <= $scope.page){
            $scope.showLoad = false;
          }
        });
      }else{
        $scope.showLoad = false;
      }
    };

    $scope.toDetail = function (id){
      $state.go('app.private.layout.detail', { comic_id : id });
    };

    $scope.loadMore();

  }]);
})();
