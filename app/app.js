'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.listRecette',
    'myApp.createRecette',
    'myApp.findRecette',
    'myApp.listStock',
    'myApp.viewRecette',
    'myApp.viewProduct',
    'myApp.version',
    'myApp.productModal',
    'myApp.modifyRecipeModal',
    'myApp.modifyRecipeCook',
    'myApp.modifyRecipePlan'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/listRecette'});
}]).
factory('labels', function labels() {
    return{
        unitesLabel : {
            GRAMMES:"g",
            MILLIGRAMMES:"mg",
            KILOGRAMMES:'kg',
            UNIT:'pièces',
            LITRES:'l',
            MILLILITRES:'ml',
            CENTILITRES:'cl',
            TEASPOON:'cc',
            SOUPSPOON:'cs'
        },
        platsLabel : {
            MEAL:'Plat principal',
            APPETIZER:'Entrée',
            DESSERT:'Desert',
            VEGETABLE:'Accompagnement',
            ALL:'Tous'
        },
        costLabel:{
            CHEAP:'bon marché',
            AVERAGE:'moyen',
            EXPENSIVE:'couteux'
        },
        seasonLabel:{
            SPRING:'Printemps',
            SUMMER:'Eté',
            AUTUMN:'Automne',
            WINTER:'Hivers',
            ALL:'Annuel',
            DE_SAISON:'De saisons'
        },
        durationLabel:{
            DAYS:'jours',
            WEEKS:'semaines',
            MOUNTH:'mois',
            YEARS:'années'
        },
        mounthLabel:{
            1:'Janvier',
            2:'Fevrier',
            3:'Mars',
            4:'Avril',
            5:'Mai',
            6:'Juin',
            7:'Juillet',
            8:'Aout',
            9:'Septembre',
            10:'Octobre',
            11:'Novembre',
            12:'Decembre'
                    }
    };
}).
factory('serviceAjax', function serviceAjax($http) {
    return{
        findMenu: function(data) {
            //return $http.post("http://localhost:8080/menus/find",data);
            return [
                {
                data:{
                    id:1,
                    previsionalDate:'3/01/2017',
                    repas:
                    [
                        {
                            id: 1,
                            typeRepas: BREAKFAST,
                            recipe: [
                                {id: 1},
                                {id: 2}
                            ],
                            ingredients: [
                                {}
                            ]
                        },
            {
                id:2,
                    typeRepas:BREAKFAST,
                recipe:
                [
                    {}
            ],
                ingredient:
                    [
                        {id: 1},
                        {id: 2}
                    ]
            },
                    ]


            },
                    status:200
            }
            ]
        },
        getMenus: function() {
            return $http.get("http://localhost:8080/menus/index");
        },
        postRecette: function(data) {
            return $http.post("http://localhost:8080/recipes/deepSave",data);
        },
        putRecette: function(id,data) {
            console.log(data);
            return $http.post("http://localhost:8080/recipes/update/",data);
        },
        postProduit: function(data) {
            return $http.post("http://localhost:8080/products/deepSave",data);
        },
        recette: function() {
            return $http.get("http://localhost:8080/recipes");
        },
        detailRecette: function(data) {
            return $http.get("http://localhost:8080/recipes/show/" + data);
        },
        detailProduct: function(data) {
            return $http.get("http://localhost:8080/items/show/" + data);
        },
        findRecette: function(data) {
            return $http.post("http://localhost:8080/recipes/findWith",data);
        },
        produitDispo: function(){
            return $http.get("http://localhost:8080/products/witch")
        },
        unitDispo: function(){
            return $http.get("http://localhost:8080/quantities/witchUnit")
        },
        typePlatDispo: function(){
            return $http.get("http://localhost:8080/recipes/witchType")
        },
        saisonDispo: function(){
            return $http.get("http://localhost:8080/products/witchSeason")
        },
        costDispo: function(){
            return $http.get("http://localhost:8080/products/witchCost")
        },
        durationDispo: function(){
            return $http.get("http://localhost:8080/products/witchDuration")
        },
        categoryDispo: function(){
            return $http.get("http://localhost:8080/categories/index")
        },
        stockGestion: function() {
            return $http.get("http://localhost:8080/stocks/index")
        }

    };
}).
directive('ngAutocomplete', function() {
    return{
        transclude: true,
        restrict: "EA",
        templateUrl: "./autocomplete.html",
        scope: {
            twoWayBind: "=myTwoWayBind",
            canAdd: "=canAdd",
        },
        controller: ['$scope', 'serviceAjax','$uibModal', function($scope,serviceAjax,$uibModal){
            serviceAjax.produitDispo().then(function(response) {
                $scope.availableProducts = response.data
            });
            $scope.twoWayBind.product="";
            $scope.search='';
            $scope.changement = function(){
                $scope.filterProducts = $scope.availableProducts.filter(function(item){
                    return $scope.search && item.toLowerCase().startsWith($scope.search.toLowerCase())
                });
                $scope.show = true;
                $scope.twoWayBind.product= $scope.search;
            };
            $scope.remplir = function(prod){
                $scope.search = prod;
                $scope.twoWayBind.product= $scope.search;
                $scope.show = false;
            };

            $scope.showModalProduct=function () {
                $scope.show = false;
                $uibModal.open({
                    animation: true,
                    templateUrl: 'productModal.html',
                    controller: 'productModalCtrl',
                    resolve: {
                        items: function () {
                            return $scope.search;
                        }
                    }
                }).result.then(function(product){
                    serviceAjax.produitDispo().then(function(response) {
                        $scope.availableProducts = response.data
                    });
                    $scope.search=product;

                    console.log(product)
                });

            };
        }]
    }
});

