/**
 * Created by Gaga on 05/12/2016.
 */
'use strict';

angular.module('myApp.modifyRecipePlan', [])
    .controller('modifyRecipePlanCtrl', ['$scope','serviceAjax','recette','labels',
        function ($scope,serviceAjax,recette,labels) {
            $scope.label = labels;
            $scope.recipe = recette;
            $scope.menu = {};
            $scope.menu.repas = {};
            $scope.menu.repas.nbPerson = 1;
            $scope.menu.repas.recipe = [$scope.recipe];
            $scope.menu.previsionalDate = new Date();


            serviceAjax.typeRepasDispo().then(function(response) {
                $scope.availableMeal = response.data;
            });
            serviceAjax.typePlatDispo().then(function(response) {
                $scope.availableTypes = response.data;
            });
            $scope.save =function(){
                console.log($scope.menu);
                serviceAjax.postMenu($scope.menu).then(function(response) {
                    $scope.statu = response.status===200;
                    if ($scope.statu){
                        $scope.menu = {};
                        $scope.$close();
                    }
                });


            };
            $scope.close =function(){
                $scope.$close();
            }
        }]);
