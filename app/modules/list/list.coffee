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

.controller 'ListCtrl', ($scope, $route, pizzas, LxNotificationService) ->
    $scope.pizzas = pizzas

    $scope.delete = ($evt, pizza) ->
        $evt.stopPropagation?()
        pizza.$delete()
        .then (d) ->
            LxNotificationService.success 'Pizza deleted successfully'
            $route.reload()
        .catch (e) ->
            LxNotificationService.error 'Could not deletepizza'

