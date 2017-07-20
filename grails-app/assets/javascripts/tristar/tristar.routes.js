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
        .state("signup",{
            url: "/signup",
            controller: "SignUpController",
            controllerAs: "signUpCtrl",
            templateUrl: "/assets/tristar/signup/signup.html"
        })
        .state("loggedinwindow",{
            abstract: true,
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
        })
        .state("loggedinwindow.home",{
            url: "/home",
            params: {
                taskTabId: {
                    type: "int",
                    value: 0
                }
            },
            controller: "HomeController",
            controllerAs: "homeCtrl",
            templateUrl: "/assets/tristar/home/home.html",
            resolve: {
                assignedTasks: ["$q", "TristarApiService", "currentUser", function ($q ,TristarApiSerivce, CurrentUser) {
                    // get all tasks
                    var tasks = [];
                    for (var task in CurrentUser["assignedTasks"]){
                        if (CurrentUser["assignedTasks"].hasOwnProperty(task)){
                            tasks.push(TristarApiSerivce.getTask(CurrentUser["assignedTasks"][task]));
                        }
                    }
                    // evaluate list of tasks
                    return $q.all(tasks);
                }],
                createdTasks: ["$q", "TristarApiService", "currentUser", function ($q ,TristarApiSerivce, CurrentUser) {
                    // get all tasks
                    var tasks = [];
                    for (var task in CurrentUser["createdTasks"]){
                        if (CurrentUser["createdTasks"].hasOwnProperty(task)){
                            tasks.push(TristarApiSerivce.getTask(CurrentUser["createdTasks"][task]));
                        }
                    }
                    // evaluate list of tasks
                    return $q.all(tasks);
                }]
            }

        })
        .state("loggedinwindow.user",{
            url: "/user/{username:string}",
            controller: "UserController",
            controllerAs: "userCtrl",
            templateUrl: "/assets/tristar/user/user.html",
            resolve: {
                user: ["TristarApiService", "$stateParams", function (TristarApiService, $stateParams) {
                    return TristarApiService.getUser($stateParams.username);
                }]
            }
        })
        .state("loggedinwindow.task",{
            url: "/task/{taskId:string}",
            controller: "TaskController",
            controllerAs: "taskCtrl",
            templateUrl: "/assets/tristar/task/task.html",
            resolve: {
                task: ["TristarApiService", "$stateParams", function (TristarApiService, $stateParams) {
                    return TristarApiService.getTask($stateParams.taskId);
                }]
            }
        })
        .state("loggedinwindow.team",{
            url: "/team/{teamName:string}",
            controller: "TeamController",
            controllerAs: "teamCtrl",
            templateUrl: "/assets/tristar/team/team.html",
            resolve: {
                team: ["TristarApiService", "$stateParams", function (TristarApiService, $stateParams) {
                    return TristarApiService.getTeam($stateParams.teamName);
                }],
                tasks: ["$q", "TristarApiService", "team", function ($q, TristarApiService, team) {
                    var tasks = [];
                    for (var task in team["tasks"]) {
                        if (team["tasks"].hasOwnProperty(task)) {
                            tasks.push(TristarApiService.getTask(team["tasks"][task]));
                        }
                    }
                    // evaluate list of tasks
                    return $q.all(tasks);
                }],
                nonMembers: ["TristarApiService", "$stateParams", function (TristarApiService, $stateParams) {
                    /**
                     * Recursively gets all users that are not a member of this team
                     * @param pageId    Id of page
                     * @param userList  State of user list
                     */
                    function getUserPage (pageId, userList) {
                        return TristarApiService.getFilteredUserList(pageId, $stateParams.teamName, $stateParams.teamName).then(function (page) {
                            if (page.length === 20){
                                return getUserPage(pageId + 1, userList.concat(page));
                            }
                            return userList.concat(page);
                        });
                    }
                    return getUserPage(0, []);
                }],
                nonCaptains: ["TristarApiService", "$stateParams", function (TristarApiService, $stateParams) {
                    /**
                     * Recursively gets all users that are not a member of this team
                     * @param pageId    Id of page
                     * @param userList  State of user list
                     */
                    function getUserPage (pageId, userList) {
                        return TristarApiService.getFilteredUserList(pageId, null, $stateParams.teamName).then(function (page) {
                            if (page.length === 20){
                                return getUserPage(pageId + 1, userList.concat(page));
                            }
                            return userList.concat(page);
                        });
                    }
                    return getUserPage(0, []);
                }]
            }
        })
        .state("loggedinwindow.createteam",{
            url: "/createteam",
            controller: "CreateTeamController",
            controllerAs: "createTeamCtrl",
            templateUrl: "/assets/tristar/createteam/createteam.html"
        })
        .state("loggedinwindow.createtask",{
            url: "/team/{teamName:string}/createtask",
            controller: "CreateTaskController",
            controllerAs: "createTaskCtrl",
            templateUrl: "/assets/tristar/createtask/createtask.html",
            resolve: {
                team: ["TristarApiService", "$stateParams", function (TristarApiService, $stateParams) {
                    return TristarApiService.getTeam($stateParams.teamName);
                }]
            }
        });

    $urlRouterProvider.otherwise("/login");
}