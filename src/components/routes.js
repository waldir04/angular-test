'use strict';

(function () {

  angular.module('routes', ['ui.router'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/register');

    $stateProvider
    .state('app', {
      abstract: true,
      template: '<ui-view/>'
    })
    .state('app.public',{
      abstract: true,
      module: 'public',
      templateUrl: 'components/public/layout.html'
    })
    .state('app.public.layout', {
      abstract: true,
      module: 'public',
      views: {
        'header': {
          templateUrl: 'components/public/header.html'
        },
        'container': {
          template: '<div ui-view="content"></div>'
        },
        'footer': {
          templateUrl: 'components/public/footer.html'
        }
      }
    })
    .state('app.public.layout.login', {
      url: '/login',
      module: 'public',
      views: {
        'content': {
          templateUrl: 'components/auth/login/loginView.html',
          controller: 'LoginController'
        }
      }
    })
    .state('app.public.layout.register', {
      url: '/register',
      module: 'public',
      views: {
        'content': {
          templateUrl: 'components/auth/register/registerView.html',
          controller: 'RegisterController'
        }
      }
    })
    .state('app.private', {
      abstract: true,
      module: 'private',
      templateUrl: 'components/private/layout.html'
    })
    .state('app.private.layout', {
      abstract: true,
      module: 'private',
      views: {
        'header': {
          templateUrl: 'components/private/header.html',
          controller: 'PrivateHeaderController'
        },
        'container': {
          template: '<div ui-view="content"></div>'
        },
        'footer': {
          templateUrl: 'components/private/footer.html'
        }
      }
    })
    .state('app.private.layout.list', {
      url: '/list',
      module: 'private',
      views: {
        'content': {
          templateUrl: 'components/comics/list/listView.html',
          controller: 'ListController'
        }
      }
    })
    .state('app.private.layout.search', {
      url: '/search/:query',
      module: 'private',
      views: {
        'content': {
          templateUrl: 'components/comics/list/listView.html',
          controller: 'SearchController'
        }
      }
    })
    .state('app.private.layout.detail', {
      url: '/detail/:comic_id',
      module: 'private',
      views: {
        'content': {
          templateUrl: 'components/comics/show/detailView.html',
          controller: 'DetailController'
        }
      }
    })
    .state('app.private.layout.new', {
      url: '/new',
      module: 'private',
      views: {
        'content': {
          templateUrl: 'components/comics/new/newView.html',
          controller: 'NewController'
        }
      }
    })
    .state('app.private.layout.edit', {
      url: '/edit/:comic_id',
      module: 'private',
      views: {
        'content': {
          templateUrl: 'components/comics/edit/editView.html',
          controller: 'EditController'
        }
      }
    });
  }]);
})();
