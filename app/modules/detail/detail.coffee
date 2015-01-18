angular.module 'alt.detail',
['ngRoute']

.config ($routeProvider) ->
    $routeProvider
        .when '/new',
            templateUrl: 'modules/detail/detail.html'
            controller: 'Detail'
            resolve:
                ingredients: (Ingredient) ->
                    Ingredient.query()


.controller 'Detail', ($scope, ingredients) ->
    $scope.ingredients = ingredients

    $scope.ingredientList = {}
    $scope.selected = {}
    $scope.pizza =
        name: null
        ingredients: []

    $scope.addIngredient = ->
        ingredient = $scope.ingredients[$scope.selected.ing]
        $scope.pizza.ingredients.push ingredient._id

        if $scope.ingredientList[ingredient._id]
            $scope.ingredientList[ingredient._id].count += 1
        else
            $scope.ingredientList[ingredient._id] =
                count: 1
                name: ingredient.name

    $scope.addPizza = ->
        console.log angular.toJson($scope.pizza)


