/**
 * @author Cameron Nicolle
 * @since 11/07/17
 */

angular.module('tristar')
    .controller('UserSelectorButtonController', UserSelectorButtonController);

TeamLinkController.$inject = [];
/**
 * Controller for user selector button component
 * @memberOf tristar
 */
function UserSelectorButtonController () {
    var ctrl = this;

    /**
     * Calls the select callback
     */
    ctrl.buttonClicked = function () {
        ctrl.select({username: ctrl.username});
    };
}