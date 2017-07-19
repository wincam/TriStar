/**
 * @author Cameron Nicolle
 * @since 11/07/17
 */

angular.module('tristar')
    .controller('CreateTaskController', CreateTaskController);

CreateTaskController.$inject = ["$stateParams", "$state", "TristarApiService", "team"];
/**
 * Controller for the create task view
 * @memberOf tristar
 */
function CreateTaskController ($stateParams, $state, TristarApiService, team) {
    var ctrl = this;
    ctrl.name = "";
    ctrl.description = "";
    ctrl.assignees = [];
    ctrl.dueDate = new Date();

    // user search box data
    ctrl.users = team["captains"].concat(team["members"]);

    /**
     * Adds or removes user from ctrl.assignees
     * @param {String} username Username of user
     */
    ctrl.selectUser = function (username) {
        if (ctrl.assignedUser(username)){
            ctrl.assignees.splice(ctrl.assignees.indexOf(username), 1);
        } else {
            ctrl.assignees.push(username);
        }
    };

    /**
     * Checks if user is an assignee
     * @param {String} username Username of user
     * @return {boolean}
     */
    ctrl.assignedUser = function (username) {
        return ctrl.assignees.indexOf(username) !== -1;
    };

    ctrl.datePickerIsOpen = false;

    /**
     * Opens date picker if closed
     */
    ctrl.openDatePicker = function () {
        ctrl.datePickerIsOpen = !ctrl.datePickerIsOpen;
    };

    ctrl.createTaskError = false;

    /**
     * Submits form and navigates to team page if successful
     */
    ctrl.submit = function () {
        TristarApiService.createTask(ctrl.name, ctrl.description, ctrl.assignees, ctrl.dueDate, $stateParams.teamName).then(function (taskCreated) {
            ctrl.createTaskError = !taskCreated;
            if (taskCreated){
                $state.go("loggedinwindow.team", {teamName: $stateParams.teamName}, {reload: true});
            }
        });
    };
}