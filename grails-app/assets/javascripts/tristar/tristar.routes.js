/**
* @author Cameron Nicolle
* @since 28/06/17
*/

angular.module("tristar")
    .config(routeConfig)
    .config(routerConfig);

routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
    // routes
    $stateProvider
        .state("login",{
            url: "/login",
            controller: "LoginController",
            controllerAs: "loginCtrl",
            templateUrl: "/assets/tristar/login/login.html"
        })
        .state("loggedinwindow",{
            controller: "LoggedInWindowController",
            controllerAs: "loggedInWindowCtrl",
            templateUrl: "/assets/tristar/window/loggedinwindow.html",
            resolve: {
                currentUser: ["TristarApiService", function (TristarApiService) {
                    return TristarApiService.getCurrentUser();
                }]
            }
        })
}

routerConfig.$inject = ["$urlRouterProvider"];
function routerConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

}