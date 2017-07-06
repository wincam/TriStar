/**
 * @author Cameron Nicolle
 * @since 06/07/17
 */

angular.module("tristar").component("taskLink", {
    templateUrl: "/assets/tristar/tasklink/tasklink.html",
    bindings: {
        taskId: "<"
    },
    controller: "TaskLinkController",
    controllerAs: "taskLinkCtrl"
});