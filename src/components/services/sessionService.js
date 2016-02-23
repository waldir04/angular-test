'use strict';

(function(){

	angular.module('sessionService', [])
	.factory('SessionService', ['$cookieStore', function($cookieStore){

		return {			
			get: function (key) {
				return $cookieStore.get(key);
			},
			set: function (key, val) {
				return $cookieStore.put(key, val);
			},
			unset: function (key) {
				return $cookieStore.remove(key);
			}
		};
	}])
	.factory('FlashService', ['$rootScope', function ($rootScope) {
		return {
			show: function(message) {
				$rootScope.flash = message;
			},
			clear: function() {
				$rootScope.flash = "";
			}
		}
	}]);
})();
