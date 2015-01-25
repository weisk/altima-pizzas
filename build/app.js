angular.module('altima-test', ['ngRoute', 'ngMaterial', 'templates', 'lumx', 'alt.resources', 'alt.list', 'alt.detail']).constant('config', {
  baseUrlApi: 'http://162.250.78.47/api'
}).config(function($routeProvider) {
  return $routeProvider.otherwise({
    redirectTo: '/'
  });
}).run(function($rootScope, $location) {
  return $rootScope.go = function(url) {
    return $location.path(url);
  };
});

angular.module('alt.resources', ['ngResource']).factory('Pizza', function($resource, config) {

  /*
      .$query -> get pizza list
      .$save -> create pizza
      .$get -> get pizza
      .edit -> save pizza
      .$delete -> delete pizza
   */
  return $resource(config.baseUrlApi + '/pizzas/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT',
      responseType: 'json'
    }
  });
}).factory('Ingredient', function($resource, config) {

  /*
      .$query -> get ingredient list
      .$get -> get ingredient
   */
  return $resource(config.baseUrlApi + '/ingredients/:id');
});

angular.module('alt.detail', ['ngRoute']).config(function($routeProvider) {
  return $routeProvider.when('/new/:id?', {
    templateUrl: 'modules/detail/detail.html',
    controller: 'Detail',
    resolve: {
      ingredients: function(Ingredient) {
        return Ingredient.query();
      }
    }
  });
}).controller('Detail', function($scope, $routeParams, $location, Pizza, ingredients, LxNotificationService) {
  $scope.ingredients = ingredients;
  $scope.selected = {};
  $scope.ingredientList = {};
  if ($routeParams.id) {
    $scope.pizza = Pizza.get({
      id: $routeParams.id
    });
    $scope.pizza.$promise.then(function(d) {
      var id, _i, _len, _ref, _results;
      _ref = $scope.pizza.ingredients;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        _results.push($scope.updateList(id));
      }
      return _results;
    });
  } else {
    $scope.pizza = new Pizza({
      name: null,
      ingredients: []
    });
    $scope.ingredientList = {};
  }
  $scope.addIngredient = function(ingId) {
    $scope.pizza.ingredients.push(ingId);
    return $scope.updateList(ingId);
  };
  $scope.updateList = function(ingId) {
    var _ref;
    if ($scope.ingredientList[ingId]) {
      return $scope.ingredientList[ingId].count += 1;
    } else {
      return $scope.ingredientList[ingId] = {
        count: 1,
        name: (_ref = _.find($scope.ingredients, {
          _id: ingId
        })) != null ? _ref.name : void 0,
        id: ingId
      };
    }
  };
  $scope.decrease = function(ing) {
    var idx, _ref;
    idx = $scope.pizza.ingredients.indexOf(ing.id);
    $scope.pizza.ingredients.splice(idx, 1);
    if (((_ref = $scope.ingredientList[ing.id]) != null ? _ref.count : void 0) > 1) {
      return --$scope.ingredientList[ing.id].count;
    } else {
      return delete $scope.ingredientList[ing.id];
    }
  };
  return $scope.save = function() {
    var promise;
    promise = $routeParams.id ? $scope.pizza.$update() : $scope.pizza.$save();
    return promise.then(function(d) {
      LxNotificationService.success('Pizza created successfully');
      return $location.path('/');
    })["catch"](function(e) {
      LxNotificationService.error('Could not create pizza');
      return console.log(e);
    });
  };
});

angular.module('alt.list', ['ngRoute', 'ngMaterial']).config(function($routeProvider) {
  return $routeProvider.when('/', {
    templateUrl: 'modules/list/list.html',
    controller: 'ListCtrl',
    resolve: {
      pizzas: function(Pizza) {
        return Pizza.query();
      }
    }
  });
}).controller('ListCtrl', function($scope, $route, pizzas, LxNotificationService) {
  $scope.pizzas = pizzas;
  return $scope["delete"] = function($evt, pizza) {
    if (typeof $evt.stopPropagation === "function") {
      $evt.stopPropagation();
    }
    return pizza.$delete().then(function(d) {
      LxNotificationService.success('Pizza deleted successfully');
      return $route.reload();
    })["catch"](function(e) {
      return LxNotificationService.error('Could not deletepizza');
    });
  };
});
