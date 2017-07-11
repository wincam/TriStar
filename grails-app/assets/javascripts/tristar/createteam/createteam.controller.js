/**
 * @author Cameron Nicolle
 * @since 11/07/17
 */

angular.module('tristar')
    .controller('CreateTeamController', CreateTeamController);

CreateTeamController.$inject = ["$state", "TristarApiService"];
/**
 * Controller for task state
 * @memberOf tristar
 */
function CreateTeamController ($state, TristarApiService) {
    var ctrl = this;

    ctrl.name = "";
    ctrl.description = "";

    ctrl.createTeamError = false;

    ctrl.submit = function () {
        TristarApiService.createTeam(ctrl.name, ctrl.description).then(function (taskCreated) {
            ctrl.createTeamError = !taskCreated;
            if (taskCreated){
                $state.go("loggedinwindow.home", {}, {reload: true});
            }
        });
    };

}