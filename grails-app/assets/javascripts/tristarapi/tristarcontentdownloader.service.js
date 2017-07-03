/**
 * @author Cameron Nicolle
 * @since 28/06/17
 * Performs all downloads from Tristar Rest API
 */

angular.module("tristarapi").service("TristarContentDownloaderService",TristarContentDownloaderService);

TristarContentDownloaderService.$inject = ["$http", "ApiPath"];
/**
 * Service that processes all downloads from the Tristar REST API
 * @memberOf tristarapi
 * @param $http     Angular $http service
 * @param ApiPath   The hostname and path to the Tristar API
 */
function TristarContentDownloaderService ($http, ApiPath) {
    var service = this;

    /**
     * Requests token from rest api
     * @param {String} email    The email of the user
     * @param {String} password The password of the user
     * @return {String} Token from response
     */
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
        return $http(config).then(function (response) {
            return response.data["access_token"];
        });
    };

    /**
     * Requests the model of a logged in user
     * @param {String} token Token of user
     * @return {Promise} Response from server or null
     */
    service.loadCurrentUser = function (token) {
        var config = {
            method: "GET",
            url: ApiPath + "user",
            headers: {
                "Authorization": "Bearer " + token
            }
        };
        return service.sendRequest(config);
    };

    /**
     * Requests a page of users
     * @param {String} token     Token of the user
     * @param {Number} pageId    Id of page to request
     * @return {Promise} Response from server or null
     */
    service.loadUserList = function (token, pageId){
        var config = {
            method: "GET",
            url: ApiPath + "users",
            params: {id : pageId},
            headers: {
                "Authorization": "Bearer " + token
            }
        };

        return service.sendRequest(config);



    };

    /**
     * Requests a user
     * @param {String} token     Token of user
     * @param {String} username  Username of user
     * @return {Promise} Response from server or null
     */
    service.loadUser = function (token, username) {
        var config = {
            method: "GET",
            url: ApiPath + "user\\" + username,
            headers: {
                "Authorization": "Bearer " + token
            }
        };

        return service.sendRequest(config);
    };

    /**
     * Requests a team
     * @param {String} token    Token of user
     * @param {String} teamId   Team Id of team
     * @return {Promise} Response from server or null
     */
    service.loadTeam = function (token, teamId) {
        var config = {
            method: "GET",
            url: ApiPath + "team\\" + teamId,
            headers: {
                "Authorization": "Bearer " + token
            }
        };

        return service.sendRequest(config);
    };

    /**
     * Requests a task
     * @param {String} token    Token of user
     * @param {String} taskId   Task of team
     * @return {Promise} Response from server or null
     */
    service.loadTask = function (token, taskId) {
        var config = {
            method: "GET",
            url: ApiPath + "task\\" + taskId,
            headers: {
                "Authorization": "Bearer " + token
            }
        };

        return service.sendRequest(config);
    };

    /**
     * Sends request to API
     * @private
     * @param config    $http config
     * @return {Promise} Response from server or null
     */
    service.sendRequest = function (config) {
        return $http(config).then(
            function success (response) {
                return response.data;
            }).catch(function failure () {
            return null;
        });
    };
}