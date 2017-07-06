/**
 * @author Cameron Nicolle
 * @since 06/07/17
 */

angular.module('tristar')
    .controller('SignUpController', SignUpController);

SignUpController.$inject = ["TristarApiService", "$state"];
/**
 * Controller for the sign up state
 * @param TristarApiService Service for interfacing with Tristar REST API
 * @param $state            Angular $state service
 */
function SignUpController(TristarApiService, $state) {
    var ctrl = this;
    ctrl.username = "";
    ctrl.email = "";
    ctrl.name = "";
    ctrl.password = "";
    ctrl.confirmPassword = "";


    // error was reported when signing up
    ctrl.signUpError = false;

    /**
     * Attempts to create an account for the user
     */
    ctrl.signUp = function () {
        TristarApiService.createUser(ctrl.username, ctrl.email, ctrl.name, ctrl.password).then(function (userCreated) {
            ctrl.signUpError = !userCreated;

            //success
            if (userCreated){
                $state.go("login");
            }
        });
    }
}