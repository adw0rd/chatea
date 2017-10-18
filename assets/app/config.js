function configState($stateProvider, $urlRouterProvider, $compileProvider) {
    $compileProvider.debugInfoEnabled(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('main', {
            url: "/",
            templateUrl: "/assets/app/views/main.html",
            data: {pageTitle: 'Chatea'}
        })
        .state('room', {
            url: "/room/:id",
            templateUrl: "/assets/app/room.html",
            data: {pageTitle: 'Room'}
        });
}

angular
    .module('chatea')
    .config(configState)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
