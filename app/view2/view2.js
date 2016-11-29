'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

    .controller('View2Ctrl', ['$scope','serviceAjax', function($scope,serviceAjax) {
        $scope.response = false;
        serviceAjax.unitDispo().success(function(data) {
            $scope.availableUnits = data;
        });
        serviceAjax.typePlatDispo().success(function(data) {
            $scope.availableTypes = data;
        });
        $scope.nbIngredient = [{id:1, product:'',quantity:''}];
        $scope.addIngredient = function(){
            $scope.nbIngredient.push({id:$scope.nbIngredient.length+1, product:'',quantity:''});
        };

        $scope.update = function(recipe){
            var data = {};
            data.recipe = recipe;
            data.recipe.ingredient = $scope.nbIngredient
            console.log(data);
            serviceAjax.postRecette(data).success(function(response) {
                $scope.response = response.reussite==='ok';
                console.log(response)
                if ($scope.response){
                    $scope.nbIngredient = [{id:1, product:'',quantity:''}];
                    $scope.recipe = {};
                }
            });
        };

        $scope.reset = function(){}

}]);