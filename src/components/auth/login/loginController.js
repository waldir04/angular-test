'use strict';

(function(){

	angular.module('loginController', [])
	.controller('LoginController', ['$scope', '$state', 'AuthService', 'FlashService', function($scope, $state, AuthService, FlashService){

		$scope.user = {email: '', password: ''};

		$scope.login = function(){

			FlashService.clear();

			AuthService.login($scope.user)
			.then(function(response){
				$state.go('app.private.layout.list');
			},
			function(error){
				if(error.status === 401){
					FlashService.show('Usuario o contraseña incorrecta.');
				}else{
					FlashService.show('Ha ocurrido un error, por favor intente nuevamente.');
				}
			});
		};

		$scope.toSignup = function () {
			$state.go('app.public.layout.register');
		}
	}]);

})();
