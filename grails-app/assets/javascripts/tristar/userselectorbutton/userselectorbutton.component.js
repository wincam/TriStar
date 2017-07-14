/**
 * @author Cameron Nicolle
 * @since 11/07/17
 */


angular.module("tristar").component("userSelectorButton", {
    templateUrl: "/assets/tristar/userselectorbutton/userselectorbutton.html",
    bindings: {
        username: "<",
        status: "<",
        select: "&"
    },
    controller: "UserSelectorButtonController",
    controllerAs: "userSelectorButtonCtrl"
});
