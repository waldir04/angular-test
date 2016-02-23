'use strict';

(function () {

	angular.module('authService', [])
	.factory('AuthService', ['$http', '$q', 'SessionService', function($http, $q, SessionService){

		var cacheSession   = function(response) {
			SessionService.set('authenticated', true);
			SessionService.set('currentuser', angular.toJson(response));
		};

		var uncacheSession = function() {
			SessionService.unset('authenticated');
			SessionService.unset('currentuser');
		};

		return {

			login: function(credentials){

				var deferred = $q.defer();

				$http.post('/auth/login', credentials)
				.success(function(response){
					cacheSession(response);
					deferred.resolve(response);
				})
				.error(function(error, status){
					deferred.reject({error: error.error, status: status});
				});

				return deferred.promise;
			},
			register: function(user){

				var deferred = $q.defer();

				$http.post('/auth/register', user)
				.success(function(response){
					cacheSession(response);
					deferred.resolve(response);
				})
				.error(function(error, status){
					deferred.reject({error: error.error, status: status});
				});

				return deferred.promise;
			},
			logout: function() {

				var deferred = $q.defer();

				$http.get('/auth/logout')
				.success(function(response){
					uncacheSession();
					deferred.resolve(response);
				})
				.error(function(error){
					deferred.reject(error);
				});

				return deferred.promise;
			},
			isLoggedIn: function() {
				return SessionService.get('authenticated');
			},
			currentUser: function(){
				return angular.fromJson(SessionService.get('currentuser'));
			}
		};
	}]);
})();
