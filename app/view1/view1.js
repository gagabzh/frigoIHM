'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
    .factory('serviceAjax', function serviceAjax($http) {
        return{
            popular: function() {
                return $http.get("http://localhost:8080/recipes");
            }
        };
})
.controller('View1Ctrl', ['$scope','serviceAjax', function($scope,serviceAjax) {
    var loadMovies = function(){
        serviceAjax.popular().success(function(data) {
            $scope.recipe = data;
            console.log($scope.recipe[0].name)
        });
    };
    loadMovies();
}]);