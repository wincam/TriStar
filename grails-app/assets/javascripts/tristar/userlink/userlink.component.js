/**
 * @author Cameron Nicolle
 * @since 06/07/17
 */

angular.module("tristar").component("userLink", {
    templateUrl: "/assets/tristar/userlink/userlink.html",
    bindings: {
        username: "<"
    },
    controller: "UserLinkController",
    controllerAs: "userLinkCtrl"
});