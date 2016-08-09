angular.module('passportApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/views/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
        })
        .when('/register', {
            templateUrl: '/views/register.html',
            controller: 'RegisterController',
            controllerAs: 'register'
        })
        .when('/success', {
            templateUrl: '/views/success.html',
            controller: 'WelcomeController',
            controllerAs: 'success'
        })
        .when('/newjoke', {
            templateUrl: '/views/newjoke.html',
            controller: 'NewJokeController',
            controllerAs: 'newjoke'
        })
        .when('/exercises', {
            templateUrl: '/views/exercises.html',
            controller: 'ExercisesController',
            controllerAs: 'exercises'
        })

    $locationProvider.html5Mode(true);
}]);