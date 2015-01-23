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
                pizza: ($routeParams, Pizza) ->
                    if $routeParams.id then Pizza.$query id: $routeParams.id


.controller 'Detail', ($scope, $routeParams, ingredients, pizza) ->
    $scope.ingredients = ingredients
    $scope.selected = {}

    if $routeParams.id
        $scope.edit = true
        $scope.pizza = pizza
    else
        $scope.pizza =
            name: null
            ingredients: []
        $scope.ingredientList = {}


    $scope.addIngredient = (selected) ->
        ingredient = $scope.ingredients[selected]
        $scope.pizza.ingredients.push ingredient._id

        if $scope.ingredientList[ingredient._id]
            $scope.ingredientList[ingredient._id].count += 1
        else
            $scope.ingredientList[ingredient._id] =
                count: 1
                name: ingredient.name
                id: ingredient._id

    $scope.addPizza = ->
        console.log angular.toJson($scope.pizza)

    $scope.decrease = (ing) ->
        idx = $scope.pizza.ingredients.indexOf ing.id
        $scope.pizza.ingredients.splice idx, 1

        if $scope.ingredientList[ing.id]?.count > 1
            --$scope.ingredientList[ing.id].count
        else
            delete $scope.ingredientList[ing.id]

