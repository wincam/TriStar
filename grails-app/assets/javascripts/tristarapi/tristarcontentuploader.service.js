/**
 * @author Cameron Nicolle
 * @since 05/07/17
 * Performs all uploads to the Tristar Rest API
 */

angular.module("tristarapi").service("TristarContentUploaderService",TristarContentUploaderService);

TristarContentUploaderService.$inject = ["$http", "ApiPath"];
/**
 * Service that processes all uploads to the Tristar REST API
 * @memberOf tristarapi
 * @param $http     Angular $http service
 * @param ApiPath   The hostname and path to the Tristar API
 */
function TristarContentUploaderService ($http, ApiPath) {
    var service = this;

    /**
     * Sends a request to create a user
     * @param {String} username Username of the user
     * @param {String} email    Email of the user
     * @param {String} name     Name of the user
     * @param {String} password Password of the user
     * @return {Promise}
     */
    service.createUser = function (username, email, name, password) {
        var config = {
            method: "POST",
            url: ApiPath + "user",
            data: {
                username: username,
                email: email,
                name: name,
                password: password
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        return $http(config);
    };

}