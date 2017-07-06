/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module('tristar')
    .controller('LoginController', LoginController);

LoginController.$inject = ["TristarApiService", "$state"];
/**
 * Controller for the login state
 * @param TristarApiService Service for interfacing with Tristar REST API
 * @param $state            Angular $state service
 */
function LoginController(TristarApiService, $state) {
    var ctrl = this;

    ctrl.email = "";
    ctrl.password = "";
    ctrl.authFailed = false;

    /**
     * Logs in the user and changes to the loggedinwindow state
     */
    ctrl.login = function(){
        TristarApiService.authenticate(ctrl.email, ctrl.password).then(function (value) {
            ctrl.authFailed = !value;
            if (value){
                $state.go("loggedinwindow.home");
            }
        })
    };
}
