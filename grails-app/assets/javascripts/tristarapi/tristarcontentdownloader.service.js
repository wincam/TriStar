/**
 * @author Cameron Nicolle
 * @since 28/06/17
 * Performs all downloads from Tristar Rest API
 */

angular.module("tristarapi").service("TristarContentDownloaderService",TristarContentDownloaderService);

function TristarContentDownloaderService ($http, ApiPath) {
    var service = this;

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
        return $http(config).then(function (response) {
            return response.data["access_token"];
        });
    };

    // download user
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

    // download list of users
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