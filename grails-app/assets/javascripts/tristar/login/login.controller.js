/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module('tristar')
    .controller('LoginController', LoginController);

LoginController.$inject = ["TristarApiService", "$state"];
function LoginController(TristarApiService, $state) {
    var ctrl = this;

    ctrl.email = "";
    ctrl.password = "";
    ctrl.authFailed = false;

    //login to api and go to home page
    ctrl.login = function(){
        TristarApiService.authenticate(ctrl.email, ctrl.password).then(function (value) {
            ctrl.authFailed = !value;
            if (value){
                $state.go("loggedinwindow");
            }
        })
    }
}
