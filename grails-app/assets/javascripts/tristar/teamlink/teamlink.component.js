/**
 * @author Cameron Nicolle
 * @since 09/07/17
 */

angular.module("tristar").component("teamLink", {
    templateUrl: "/assets/tristar/teamlink/teamlink.html",
    bindings: {
        teamname: "<"
    },
    controller: "TeamLinkController",
    controllerAs: "teamLinkCtrl"
});
