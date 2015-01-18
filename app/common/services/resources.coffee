angular.module 'alt.resources',
    [ 'ngResource' ]


.factory 'Pizza', ($resource,config) ->
    ###
        .$query -> get pizza list
        .$save -> create pizza
        .$get -> get pizza
        .edit -> save pizza
        .$delete -> delete pizza
    ###
    $resource config.baseUrlApi + '/pizzas/:id'

.factory 'Ingredient', ($resource,config) ->
    ###
        .$query -> get ingredient list
        .$get -> get ingredient
    ###
    $resource config.baseUrlApi + '/ingredients/:id'