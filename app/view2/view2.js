'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

    .controller('View2Ctrl', ['$scope','serviceAjax', function($scope,serviceAjax) {
        $scope.create = false;
        $scope.update = function(data){
            serviceAjax.postRecette(data)
        };
        $scope.reset = function(){}

}]);