/**
 * @author Cameron Nicolle
 * @since 03/07/17
*/

angular.module('tristar')
    .controller('HomeController', HomeController);

HomeController.$inject = ["currentUser", "assignedTasks", "createdTasks", "$stateParams","$state"];

/**
 * Controller for the loggedinwindow.home state
 * @memberOf tristar
 * @param currentUser   The current user
 * @param assignedTasks All the tasks that have been assigned to the current user
 * @param createdTasks  All the task that have been created by the current user
 * @param $stateParams  Angular $stateParams service
 * @param $state        Angular $state service
 */
function HomeController(currentUser, assignedTasks,createdTasks , $stateParams, $state) {
    var ctrl = this;
    ctrl.assignedTasks = assignedTasks;
    ctrl.createdTasks = createdTasks;
}
