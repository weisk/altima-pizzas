angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("modules/detail/detail.html","<div layout=\"row\" layout-align=\"start center\" ng-click=\"go(\'/\')\" class=\"back\"><i class=\"mdi mdi--chevron-left\"></i>Home</div><form name=\"form\" ng-submit=\"form.$valid &amp;&amp; save()\" novalidate=\"novalidate\"><div class=\"padded\"><lx-text-field label=\"Pizza Name\" disabled=\"true\" error=\"form.name.$error.required &amp;&amp; submitted\"><input type=\"text\" name=\"name\" ng-model=\"pizza.name\" required=\"required\"/></lx-text-field></div><ul ng-if=\"form.name.$error.required  &amp;&amp; submitted\" class=\"form-error\"><li>Name is required</li></ul><ul ng-if=\"!form.name.$error.required  || !submitted\" class=\"empty\"><li></li></ul><md-content class=\"ingredients-available\"><div class=\"radio-group\"><div ng-repeat=\"ingredient in ingredients\" class=\"radio-button\"><input type=\"radio\" id=\"radio{{$index}}\" name=\"ingredient\" value=\"{{ingredient._id}}\" ng-model=\"selected.ing\" class=\"radio-button__input\"/><label for=\"radio{{$index}}\" class=\"radio-button__label\">{{ ingredient.name }}</label></div></div></md-content><div layout=\"row\" layout-align=\"center\"><button lx-ripple=\"lx-ripple\" type=\"button\" ng-click=\"addIngredient(selected.ing)\" class=\"btn btn--l btn--white btn--raised\">Add</button></div><md-content flex=\"flex\" class=\"ingredients-selected\"><ul><li ng-repeat=\"ingredient in ingredientList\" layout=\"row\"><span flex=\"flex\">{{ ingredient.count }}&emsp;{{ ingredient.name }}</span><i ng-click=\"decrease(ingredient)\" class=\"mdi mdi--remove\"></i></li></ul></md-content><div layout=\"row\" layout-align=\"center\"><button lx-ripple=\"lx-ripple\" type=\"submit\" ng-click=\"submitted = true\" class=\"btn btn--l btn--white btn--raised\">Save</button></div></form>");
$templateCache.put("modules/list/list.html","<div layout=\"column\" layout-align=\"start center\"><h2>Pizzas App</h2><ul class=\"pizzas\"><li ng-repeat=\"pizza in pizzas\" ng-click=\"go(\'/new/\' + pizza._id)\" layout=\"row\" layout-align=\"start center\"><span flex=\"flex\">{{ pizza.name }}</span><i ng-click=\"delete($event, pizza)\" class=\"mdi mdi mdi--delete\"></i></li></ul><button lx-ripple=\"lx-ripple\" ng-click=\"go(\'/new\')\" class=\"btn btn--l btn--white btn--raised\"><i class=\"mdi mdi--add\"></i> New Pizza</button></div>");}]);