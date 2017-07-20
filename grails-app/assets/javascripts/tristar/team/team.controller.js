/**
 * @author Cameron Nicolle
 * @since 09/07/17
 */

angular.module('tristar')
    .controller('TeamController', TeamController);

TeamController.$inject = ["$state", "TristarApiService", "team", "tasks", "currentUser", "nonMembers", "nonCaptains"];

/**
 * Controller for the loggedinwindow.home state
 * @memberOf tristar
 * @param team          The team to display
 * @param tasks         A list of tasks for that team
 * @param currentUser   The user that is logged in
 * @param nonMembers    List of non members and captains
 * @param nonCaptains   List of non captains (can include members)
 */
function TeamController($state, TristarApiService, team, tasks, currentUser, nonMembers, nonCaptains) {
    var ctrl = this;
    ctrl.team = team;
    ctrl.tasks = tasks;

    // only display add user form if captain
    ctrl.isCaptain = currentUser.teamCaptain.indexOf(team.name) !== -1;
    ctrl.tab = "members";

    ctrl.nonMembers = nonMembers;
    ctrl.nonCaptains= nonCaptains;
    ctrl.selectedNonMembers = [];
    ctrl.selectedNonCaptains = [];

    ctrl.addUserError = false;

    /**
     * Checks if user is selected
     * @param {Array} selectedUsers  Selected users
     * @param {String} username      Username of user
     * @return {boolean}
     */
    ctrl.userSelected = function (selectedUsers, username) {
        return selectedUsers.indexOf(username) !== -1;
    };

    /**
     * Adds or removes a user from selected users
     * @param {Array} selectedUsers  Selected users
     * @param {String} username     Username of user
     */
    ctrl.selectUser = function (selectedUsers, username) {
        if (ctrl.userSelected(selectedUsers, username)){
            selectedUsers.splice(selectedUsers.indexOf(username), 1);
        } else {
            selectedUsers.push(username);
        }
    };

    /**
     * Adds user to team and reloads view
     * @param {String} type Type of user to add
     * @param {Array} users List of users to add
     */
    ctrl.addUser = function (type, users) {
        TristarApiService.addUsersToTeam(ctrl.team.name, users, type).then(function (userAdded) {
            ctrl.addUserError = !userAdded;
            if (userAdded) {
                $state.reload();
            }
        })
    };
}