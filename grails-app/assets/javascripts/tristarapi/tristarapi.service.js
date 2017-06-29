/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module("tristarapi").service("TristarApiService",TristarApiService);

TristarApiService.$inject = ["$http","ApiPath"];
function TristarApiService ($http, ApiPath) {
    var service = this;
    service.accessToken = undefined;

    // set api token
    service.authenticate = function (email, password) {
        var config = {
            method: "POST",
            url: ApiPath + "login",
            data: {
                email: email,
                password: password
            },
            headers: {
                "Content-Type": "application/json"
            }

        };
        return $http(config).then(
            function success(response) {
                service.accessToken = response.data["access_token"];
                return true;
            }).catch(function failure() {
                console.error("Cannot get token");
                return false;
            });

    }
}