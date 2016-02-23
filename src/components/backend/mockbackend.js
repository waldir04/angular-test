'use strict';

(function () {

  angular.module('mockbackend', ['ngMockE2E'])
  .run(['$httpBackend', '$filter', 'UserModelService', 'ComicModelService', function($httpBackend, $filter, UserModelService, ComicModelService) {

    $httpBackend.whenPOST('/auth/login').respond(function(method, url, data, headers){
      console.log('Received these data:', method, url, data, headers);
      var params = angular.fromJson(data);
      var user = UserModelService.auth(params.email, params.password);

      if(user){
        return [200, user, {}];
      }else{
        return [422, {'error':'invalid credentials'}, {}];
      }
    });

    $httpBackend.whenPOST('/auth/register').respond(function(method, url, data, headers){
      console.log('Received these data:', method, url, data, headers);
      var params = angular.fromJson(data);
      var user = UserModelService.register(params.email, params.password);

      if(user){
        return [200, user, {}];
      }else{
        return [422, {'error':'register user error'}, {}];
      }
    });

    $httpBackend.whenGET('/auth/logout').respond(function(method, url, data, headers){
      return [200, {}, {}];
    });

    $httpBackend.whenGET(/\/list\/\d+/).respond(function(method, url, data) {
      var page = url.split('/')[2];
      var num = 9;
      var comics = ComicModelService.list();

      var begin = ((page - 1) * num);
      var end = begin + num;
      var pages = Math.ceil(comics.length / num);

      var result = comics.slice(begin, end);

      return [200, {data: result, total: comics.length, pages: pages}, {}];
    });

    $httpBackend.whenGET(/\/search\/.+\/\d+/).respond(function(method, url, data) {
      console.log('Received these data:', method, url, data);
      var q = url.split('/');
      var query = decodeURIComponent(q[2]);
      var page = q[3];
      var num = 9;
      var comics = ComicModelService.list();

      var results = $filter('filter')(comics, {'name': query});
      var begin = ((page - 1) * num);
      var end = begin + num;
      var pages = Math.ceil(results.length / num);

      results = results.slice(begin, end);

      return [200, {data: results, total: results.length, pages: pages}, {}];
    });

    $httpBackend.whenGET(/\/show\/\d+/).respond(function(method, url, data) {
      console.log('Received these data:', method, url, data);
      var id = url.split('/')[2];

      var comic = ComicModelService.get(id);

      return [200, comic, {}];
    });

    $httpBackend.whenPOST(/\/comment\/\d+/).respond(function(method, url, data, headers){
      console.log('Received these data:', method, url, data, headers);
      var id = url.split('/')[2];
      var params = angular.fromJson(data);
      var comic = ComicModelService.comment(id, params.user, params.message);

      return [200, comic, {}];
    });

    $httpBackend.whenPOST('/new').respond(function(method, url, data, headers){
      console.log('Received these data:', method, url, data, headers);

      var params = angular.fromJson(data);
      var comic = ComicModelService.new(params);

      return [200, comic, {}];
    });

    $httpBackend.whenPOST(/\/edit\/\d+/).respond(function(method, url, data, headers){
      console.log('Received these data:', method, url, data, headers);
      var id = url.split('/')[2];
      var params = angular.fromJson(data);
      var comic = ComicModelService.update(id, params);

      return [200, comic, {}];
    });

    $httpBackend.whenGET(/components\//).passThrough();
  }]);

})();
