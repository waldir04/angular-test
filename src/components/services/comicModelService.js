'use strict';

(function () {

  angular.module('comicModelService', ['ngResource'])
  .factory('ComicModelService', ['$resource', '$filter', function($resource, $filter){

    var comics = [];

    $resource('components/backend/json/comics.json').get(function(data){
      comics = data.comics;
    });

    var getComics = function() {
      return comics;
    };

    var find = function (id) {
      var result = $.grep(getComics(), function(element, index) {
        return element.id == id;
      });
      return result[0];
    };

    return {
      list: function () {
        return getComics();
      },
      get: function (id) {
        var comic = find(id);

        return comic;
      },
      update: function (id, comic) {
        var result = find(id);
        result.name = comic.name;
        result.description = comic.description;
        result.image = comic.image;
        console.log(comic.image)
        return result;
      },
      comment: function (id, user, message) {
        var comic = find(id);
        comic.comments.unshift({user: user, message: message});
        return comic;
      },
      new: function (params) {
        var order = $filter('orderBy')(getComics(), '-id');
        var last = order[0];
        var comic = {
          id: last.id+1,
          name: params.name,
          description: params.description,
          image: (params.image === null ? 'assets/img/slg/no-image.png' : params.image), 
          comments: []};

        getComics().unshift(comic);
        return comic;
      }
    };
  }]);
})();
