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
    ctrl.userPage = $stateParams.userPageId;

    // goes to the next user page
    ctrl.userListNextPage = function () {
        $state.go($state.current,{userPageId : (ctrl.userPage + 1)});
    };

    // goes to previous user page
    ctrl.userListPreviousPage = function () {
        console.log("Previous page");
        $state.go($state.current,{userPageId : (ctrl.userPage - 1)});
    };
}


