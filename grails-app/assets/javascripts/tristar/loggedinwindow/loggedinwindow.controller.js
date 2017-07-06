/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module('tristar')
    .controller('LoggedInWindowController', LoggedInWindowController);

LoggedInWindowController.$inject = ["currentUser", "userList", "$stateParams","$state"];

/**
 * Controller for the loggedinwindow state
 * @memberOf tristar
 * @param currentUser   The current user
 * @param userList      The user list
 * @param $stateParams  Angular $stateParams service
 * @param $state        Angular $state service
 */
function LoggedInWindowController(currentUser, userList, $stateParams, $state) {
    var ctrl = this;
    ctrl.teams = currentUser.teamMember.concat(currentUser.teamCaptain).sort();
    ctrl.userList = userList;
    ctrl.userPage = $stateParams.userPageId;

    /**
     * Goes to the next user page
     */
    ctrl.userListNextPage = function () {
        $state.go($state.current,{userPageId : (ctrl.userPage + 1)});
    };

    /**
     * Goes to previous user page
     */
    ctrl.userListPreviousPage = function () {
        $state.go($state.current,{userPageId : (ctrl.userPage - 1)});
    };
}