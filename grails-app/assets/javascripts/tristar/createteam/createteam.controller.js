/**
 * @author Cameron Nicolle
 * @since 11/07/17
 */

angular.module('tristar')
    .controller('CreateTeamController', CreateTeamController);

CreateTeamController.$inject = ["$state", "TristarApiService"];
/**
 * Controller for the create team state
 * @memberOf tristar
 */
function CreateTeamController ($state, TristarApiService) {
    var ctrl = this;

    ctrl.name = "";
    ctrl.description = "";

    ctrl.createTeamError = false;

    /**
     * Submits create team form and goes to home if successful
     */
    ctrl.submit = function () {
        TristarApiService.createTeam(ctrl.name, ctrl.description).then(function (teamCreated) {
            ctrl.createTeamError = !teamCreated;
            if (teamCreated){
                $state.go("loggedinwindow.home", {}, {reload: true});
            }
        });
    };

}