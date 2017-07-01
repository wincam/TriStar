/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module('tristar')
    .controller('LoggedInWindowController', LoggedInWindowController);

LoggedInWindowController.$inject = ["currentUser", "$state"];
function LoggedInWindowController(currentUser, $state) {
    var ctrl = this;
    ctrl.currentUser = currentUser;
}


