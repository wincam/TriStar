/**
 * @author Cameron Nicolle
 * @since 06/07/17
 */


angular.module('tristar')
    .controller('UserLinkController', UserLinkController);

UserLinkController.$inject = ["$state"];
/**
 * Controller for user link component
 * @memberOf tristar
 */
function UserLinkController ($state) {
    var ctrl = this;

    ctrl.goToUserPage = function () {
        $state.go("user", {username: ctrl.username});
    };
}