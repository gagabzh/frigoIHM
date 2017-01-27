'use strict';

angular.module('myApp.createRecette', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/createRecette', {
    templateUrl: 'createRecette/createRecette.html',
    controller: 'View2Ctrl'
  });
}])

    .controller('View2Ctrl', ['$scope','serviceAjax','labels', function($scope,serviceAjax,labels) {
        $scope.label = labels;
        $scope.response = false;
        serviceAjax.unitDispo().then(function(response) {
            $scope.availableUnits = response.data;
        });
        serviceAjax.typePlatDispo().then(function(response) {
            $scope.availableTypes = response.data;
        });
        var quantity ={};
        quantity.value = 0;
        quantity.unit = 'UNIT';
        $scope.nbIngredient = [{id:1, product:null,quantity:angular.copy(quantity)}];
        $scope.addIngredient = function(){
            $scope.nbIngredient.push({id:$scope.nbIngredient.length+1,  product:null,quantity:angular.copy(quantity)});
        };

        $scope.update = function(recipe){
            var data = {};
            data.recipe = recipe;
            data.recipe.ingredient = $scope.nbIngredient;
            console.log(data);
            serviceAjax.postRecette(data).then(function(response) {
                $scope.statu = response.status===200;
                if ($scope.statu){
                    $scope.nbIngredient = [{id:1, product:null,quantity:angular.copy(quantity)}];
                    $scope.recipe = {};
                }
            });
        };

        $scope.reset = function(){}

}]);