angular.module 'alt.detail',
['ngRoute']

.config ($routeProvider) ->
    $routeProvider
        .when '/new/:id?',
            templateUrl: 'modules/detail/detail.html'
            controller: 'Detail'
            resolve:
                ingredients: (Ingredient) ->
                    Ingredient.query()

.controller 'Detail', ($scope, $routeParams, $location, Pizza, ingredients, LxNotificationService) ->
    $scope.ingredients = ingredients
    $scope.selected = {}
    $scope.ingredientList = {}

    if $routeParams.id
        $scope.pizza = Pizza.get id: $routeParams.id
        $scope.pizza.$promise.then (d) ->
            $scope.updateList id for id in $scope.pizza.ingredients
    else
        $scope.pizza = new Pizza({
            name: null
            ingredients: []
        })
        $scope.ingredientList = {}


    $scope.addIngredient = (ingId) ->
        $scope.pizza.ingredients.push ingId
        $scope.updateList ingId

    $scope.updateList = (ingId) ->
        if $scope.ingredientList[ingId]
            $scope.ingredientList[ingId].count += 1
        else
            $scope.ingredientList[ingId] =
                count: 1
                name: _.find($scope.ingredients, _id: ingId)?.name
                id: ingId

    $scope.decrease = (ing) ->
        idx = $scope.pizza.ingredients.indexOf ing.id
        $scope.pizza.ingredients.splice idx, 1

        if $scope.ingredientList[ing.id]?.count > 1
            --$scope.ingredientList[ing.id].count
        else
            delete $scope.ingredientList[ing.id]

    $scope.save = ->
        promise = if $routeParams.id then $scope.pizza.$update() else $scope.pizza.$save()
        promise
        .then (d) ->
            LxNotificationService.success 'Pizza created successfully'
            $location.path '/'
        .catch (e) ->
            LxNotificationService.error 'Could not create pizza'
            console.log e

