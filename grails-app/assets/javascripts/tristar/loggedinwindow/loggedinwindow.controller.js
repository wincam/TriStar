/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module('tristar')
    .controller('LoggedInWindowController', LoggedInWindowController);

LoggedInWindowController.$inject = ["currentUser", "userList", "$stateParams","$state"];
function LoggedInWindowController(currentUser, userList, $stateParams, $state) {
    var ctrl = this;
    ctrl.teams = currentUser.teamMember.concat(currentUser.teamCaptain).sort();
    ctrl.userList = userList;
    ctrl.userPage = $stateParams.pageId;
}


