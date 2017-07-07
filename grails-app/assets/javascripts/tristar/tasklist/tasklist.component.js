/**
 * @author Cameron Nicolle
 * @since 07/07/17
 */

angular.module("tristar").component("taskList", {
    templateUrl: "/assets/tristar/tasklist/tasklist.html",
    bindings: {
        tasks: "<"
    },
    controller: "TaskListController",
    controllerAs: "taskListCtrl"
});