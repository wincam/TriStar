/**
* @author Cameron Nicolle
* @since 28/06/17
*/

angular.module("tristar")
    .config(routeConfig);

routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
/**
 * Config of ui-router
 * @memberOf tristar
 * @param $stateProvider        Ui-router $stateprovider
 * @param $urlRouterProvider    Ui-router $urlRouterProvider
 */
function routeConfig ($stateProvider, $urlRouterProvider) {
    // routes
    $stateProvider
        .state("login",{
            url: "/login",
            controller: "LoginController",
            controllerAs: "loginCtrl",
            templateUrl: "/assets/tristar/login/login.html"
        })
        .state("loggedinwindow",{
            params: {
                userPageId : {
                    type: "int",
                    value: 0,
                    squash: true
            }},
            controller: "LoggedInWindowController",
            controllerAs: "loggedInWindowCtrl",
            templateUrl: "/assets/tristar/window/loggedinwindow.html",
            resolve: {
                currentUser: ["TristarApiService", function (TristarApiService) {
                    return TristarApiService.getCurrentUser();
                }],
                userList:["TristarApiService", "$stateParams", function (TristarApiService , $stateParams) {
                    return TristarApiService.getUserList($stateParams.userPageId);
                }]
            }
        });

    $urlRouterProvider.otherwise("/login");
}