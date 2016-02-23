'use strict';

(function () {

  angular.module('userModelService', ['ngResource'])
  .factory('UserModelService', ['$resource', '$filter', function($resource, $filter){

    var users = [];

    $resource('components/backend/json/users.json').get(function(data){
        users = data.users;
    });

    var getUsers = function() {
        return users;
    };

    return {
      auth: function (email, password) {

        var user = $.grep(users, function(element, index) {
            return (element.email == email && element.password == password);
        });

        if(user.length === 0) {
            return false;
        }

        return user[0];
      },
      register: function (email, password) {
          var order = $filter('orderBy')(getUsers(), '-id');
          var last = order[0];
          var user = {id: last.id+1, email: email, password: password};
          getUsers().push(user);
          return user;
      }
    };
  }]);
})();
