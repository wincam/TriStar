/**
 * @author Cameron Nicolle
 * @since 05/07/17
 */


angular.module("tristar").component("taskView", {
    templateUrl: "/assets/tristar/taskview/taskview.html",
    bindings: {
        task: "<"
    },
    controller: "taskViewController",
    controllerAs: "taskViewCtrl"
});


