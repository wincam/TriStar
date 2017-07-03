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
     * @param token Token of user
     * @return user from response
     */
    service.loadCurrentUser = function (token) {
        var config = {
            method: "GET",
            url: ApiPath + "user",
            headers: {
                "Authorization": "Bearer " + token
            }
        };
        return $http(config).then(
            function success (response) {
                return response.data;
            }).catch(function failure () {
               return null;
        })
    };

    /**
     * Requests a page of users
     * @param token     Token of the user
     * @param pageId    Id of page to request
     * @return Response from server or null
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

        return $http(config).then(
            function success (response) {
                return response.data;
            }).catch(function failure () {
                return null;
        })



    };
}