/**
 * @author Cameron Nicolle
 * @since 06/07/17
 */

angular.module('tristar')
    .controller('TaskController', TaskController);

TaskController.$inject = ["task"];
/**
 * Controller for task state
 * @memberOf tristar
 */
function TaskController (task) {
    var ctrl = this;
    ctrl.task = task;
}