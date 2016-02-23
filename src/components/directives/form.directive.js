'use strict';

(function () {

  angular.module('FormDirective', [])
  .directive('compareTo', function(){
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  })
  .directive('imageInput', function(){
    return {
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {

        $(element).change(function(){
          if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
              ngModel.$setViewValue(e.target.result);
              scope.$apply();
            }

            reader.readAsDataURL(this.files[0]);
          }
        });
        var file = $(element);
      }
    };
  })
  .directive('rcSubmit',['$parse', function ($parse){
    return {
      restrict: 'A',
      require: ['rcSubmit', '?form'],
      controller: ['$scope', function ($scope) {
        this.attempted = false;

        var formController = null;

        this.setAttempted = function(attempted) {
          this.attempted = attempted;
        };

        this.setFormController = function(controller) {
          formController = controller;
        };

        this.needsAttention = function (fieldModelController) {
          if (!formController) return false;

          if (fieldModelController) {
            return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
          } else {
            return formController && formController.$invalid && (formController.$dirty || this.attempted);
          }
        };
      }],
      compile: function(cElement, cAttributes, transclude) {
        return {
          pre: function(scope, formElement, attributes, controllers) {

            var submitController = controllers[0];
            var formController = (controllers.length > 1) ? controllers[1] : null;

            submitController.setFormController(formController);

            scope.rc = scope.rc || {};
            scope.rc[attributes.name] = submitController;
          },
          post: function(scope, formElement, attributes, controllers) {

            var submitController = controllers[0];
            var formController = (controllers.length > 1) ? controllers[1] : null;
            var fn = $parse(attributes.rcSubmit);

            formElement.bind('submit', function (event) {

              submitController.setAttempted(true);

              if (!scope.$$phase) scope.$apply();

              if (!formController.$valid) return false;

              scope.$apply(function() {
                fn(scope, {$event:event});
                submitController.setAttempted(false);
              });
            });
          }
        };
      }
    };
  }]);

})();
