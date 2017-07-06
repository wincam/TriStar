/**
 * @author Cameron Nicolle
 * @since 06/07/17
 */


angular.module('tristar')
    .controller('UserController', UserController);

UserController.$inject = ["user"];
/**
 * Controller for the user state
 * @memberOf tristar
 */
function UserController (user) {
    var ctrl = this;
    ctrl.user = user;
}
