/**
 * @author Cameron Nicolle
 * @since 09/07/17
 */

angular.module('tristar')
    .controller('TeamController', TeamController);

TeamController.$inject = ["team","tasks"];

/**
 * Controller for the loggedinwindow.home state
 * @memberOf tristar
 * @param team          The team to display
 * @param tasks         A list of tasks for that team
 */
function TeamController(team, tasks) {
    var ctrl = this;
    ctrl.team = team;
    ctrl.tasks = tasks;
}