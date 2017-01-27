/**
 * Created by Gaga on 04/12/2016.
 */
'use strict';

angular.module('myApp.viewRecette', [
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/recipe/:id', {
            templateUrl: 'viewRecette/viewRecette.html',
            controller: 'View5Ctrl'
        });
    }])
    .directive('viewRecipe', function() {
    return {
        restrict: "EA",
        templateUrl: 'viewRecette/viewRecette.html',
        scope: {
            twoWayBind: "=myTwoWayBind",
            recipeToShow: "=recipeToShow"
        },
        controller: ['$scope','serviceAjax','labels',
                function($scope,serviceAjax,labels) {
                    console.log($scope.recipeToShow);
                    $scope.label = labels;
                    if ($scope.recipeToShow !== undefined) {
                        serviceAjax.detailRecette($scope.recipeToShow).then(function (response) {
                            $scope.recette = response.data;
                        });
                    }else{
                        serviceAjax.detailRecette(1).then(function (response) {
                            $scope.recette = response.data;
                        });
                    }
                }
        ]

    }
    })
    .controller('View5Ctrl', ['$scope','serviceAjax','labels','$routeParams','$uibModal',
        function($scope,serviceAjax,labels,$routeParams,$uibModal) {
            $scope.label = labels;
            $scope.id = $routeParams.id;
            serviceAjax.detailRecette($scope.id).then(function (response) {
                $scope.recette = response.data;
            });

            $scope.showModalModify=function () {
                $scope.show = false;
                $uibModal.open({
                    animation: true,
                    templateUrl: 'view5/modals/modifyRecipeModal.html',
                    controller: 'modifyRecipeModalCtrl',
                    resolve: {
                        recette: function () {
                            return $scope.recette;
                        }
                    }
                }).result.then(function(product){

                });

            };
            $scope.showModalPlan=function () {
                $scope.show = false;
                $uibModal.open({
                    animation: true,
                    templateUrl: 'view5/modals/modifyRecipePlan.html',
                    controller: 'modifyRecipePlanCtrl',
                    resolve: {
                        recette: function () {
                            return $scope.recette;
                        }
                    }
                }).result.then(function(product){

                });

            };
            $scope.showModalCook=function () {
                $scope.show = false;
                $uibModal.open({
                    animation: true,
                    templateUrl: 'view5/modals/modifyRecipeCook.html',
                    controller: 'modifyRecipeCookCtrl',
                    resolve: {
                        recette: function () {
                            return $scope.recette;
                        }
                    }
                }).result.then(function(product){

                });

            };

        }]);
