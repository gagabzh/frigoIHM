/**
 * Created by Gaga on 04/12/2016.
 */
'use strict';

angular.module('myApp.view5', [
    'ngRoute',

])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/recipe/:id', {
            templateUrl: 'view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', ['$scope','serviceAjax','labels','$routeParams','$uibModal',
        function($scope,serviceAjax,labels,$routeParams,$uibModal) {
            $scope.label = labels;
            $scope.id = $routeParams.id;
            serviceAjax.detailRecette($scope.id).success(function (data) {
                $scope.recette = data;
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
