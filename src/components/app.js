'use strict';

(function () {

  var app = angular.module('comics', [
    'ngCookies',
    'routes',
    'mockbackend',
    'loginController',
    'registerController',
    'privateHeaderController',
    'listController',
    'searchController',
    'newController',
    'editController',
    'detailController',
    'authService',
    'sessionService',
    'comicService',
    'userModelService',
    'comicModelService',
    'FormDirective'
  ]);

  app.run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

      var isAuthenticated = AuthService.isLoggedIn();

      if (toState.module === 'private' && !isAuthenticated) {

        event.preventDefault();
        $state.go('app.public.layout.login');

      } else if (toState.module === 'public' && isAuthenticated) {

        event.preventDefault();

        $state.go('app.private.layout.list');
      };
    });
  }]);
})();
