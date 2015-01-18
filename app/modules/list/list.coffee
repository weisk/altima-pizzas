angular.module 'alt.list',
['ngRoute', 'ngMaterial']

.config ($routeProvider) ->
    $routeProvider
        .when '/',
            templateUrl: 'modules/list/list.html'
            controller: 'ListCtrl'
            resolve:
                pizzas: (Pizza) ->
                    Pizza.query()

.controller 'ListCtrl', ($scope, pizzas) ->
    $scope.pizzas = pizzas

