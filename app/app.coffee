angular.module 'altima-test',
    [
        # core and third-party
        'ngRoute', 'ngMaterial', 'templates',
        'lumx',

        # common
        'alt.resources',

        # modules
        'alt.list', 'alt.detail'
    ]

.constant 'config',
    baseUrlApi: 'http://162.250.78.47/api'

.config ($routeProvider) ->
    $routeProvider
      .otherwise
        redirectTo: '/'

.run ($rootScope, $location) ->
    $rootScope.go = (url) ->
        $location.path url
