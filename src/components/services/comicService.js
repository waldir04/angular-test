'use strict';

(function () {

  angular.module('comicService', [])
  .factory('ComicService', ['$http', '$q', function($http, $q){

    return {
      list: function (page) {
        var deferred = $q.defer();

        $http.get('/list/'+page)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(error, status){
          deferred.reject({error: error.error, status: status});
        });
        return deferred.promise;
      },
      get: function (id) {
        var deferred = $q.defer();

        $http.get('/show/'+id)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(error, status){
          deferred.reject({error: error.error, status: status});
        });
        return deferred.promise;
      },
      new: function (comic) {
        var deferred = $q.defer();

        $http.post('/new', comic)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(error, status){
          deferred.reject({error: error.error, status: status});
        });
        return deferred.promise;
      },
      update: function (id,comic) {
        var deferred = $q.defer();

        $http.post('/edit/'+id, comic)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(error, status){
          deferred.reject({error: error.error, status: status});
        });
        return deferred.promise;
      },
      comment: function (id, comment) {
        var deferred = $q.defer();

        $http.post('/comment/'+id, comment)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(error, status){
          deferred.reject({error: error.error, status: status});
        });
        return deferred.promise;
      },
      search: function (query, page) {
        var deferred = $q.defer();

        $http.get('/search/'+encodeURIComponent(query)+'/'+page)
        .success(function(response){
          deferred.resolve(response);
        })
        .error(function(error, status){
          deferred.reject({error: error.error, status: status});
        });
        return deferred.promise;
      }
    };
  }]);

})();
