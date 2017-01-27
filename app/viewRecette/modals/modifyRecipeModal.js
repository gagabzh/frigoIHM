/**
 * Created by Gaga on 04/12/2016.
 */
'use strict';

angular.module('myApp.modifyRecipeModal', [])
    .controller('modifyRecipeModalCtrl', ['$scope','serviceAjax','recette','labels',
        function ($scope,serviceAjax,recette,labels) {
            $scope.label = labels;
            $scope.recipe = recette;
            console.log($scope.recipe);
            $scope.nbIngredient = recette.ingredient;

            serviceAjax.unitDispo().then(function(response) {
                $scope.availableUnits = response.data;
            });
            serviceAjax.typePlatDispo().then(function(response) {
                $scope.availableTypes = response.data;
            });

            $scope.newIngredient = [];
            $scope.addIngredient = function(){
                $scope.newIngredient.push({id:'tbd', product:'',quantity:''});
            };
            $scope.save =function(){
                for (var i=0; i<$scope.newIngredient.length; i++){
                    $scope.nbIngredient.push($scope.newIngredient[i]);
                }
                console.log($scope.recipe.type);
                $scope.newIngredient = [];
                var data = {};
                data.recipe = $scope.recipe;
                data.recipe.ingredient = $scope.nbIngredient;
                serviceAjax.putRecette($scope.recipe.id,data).then(function(response) {
                    $scope.$close();

                });

            };
            $scope.close =function(){
                $scope.$close();
            }
        }]);
