/**
 * @author Cameron Nicolle
 * @since 18/07/17
 */


angular.module("tristar").component("userSelector", {
    templateUrl: "/assets/tristar/userselector/userselector.html",
    bindings: {
        usernames: "<",
        selectedusernames: "<",
        select: "&"
    },
    controller: "UserSelectorController",
    controllerAs: "userSelectorCtrl"
});