/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module("tristarapi").service("TristarApiService",TristarApiService);

TristarApiService.$inject = ["$q", "TristarContentDownloaderService"];
function TristarApiService ($q, TristarContentDownloaderService) {
    var service = this;
    service.accessToken = undefined;

    // model of current user
    service.currentUser = undefined;

    // model of teams
    service.teams = {};

    // set api token
    service.authenticate = function (email, password) {
        return TristarContentDownloaderService.authenticate(email, password).then(
            function success(token) {
                service.accessToken = token;
                return true;
            }).catch(function failure() {
            console.error("Cannot get token");
            return false;
        });
    };

    // gets current user
    service.getCurrentUser = function (){
        var defer = $q.defer();

        // check local storage
        if (service.currentUser !== undefined && service.currentUser !== null){
            defer.resolve(service.currentUser);
        } else {
            defer.reject();
        }

        return defer.promise.then(function success (user) {
            return user;
        },function failure () {
            // check web service
            return TristarContentDownloaderService.loadCurrentUser(service.accessToken).then(function (user) {
                service.currentUser = user;
                console.log(user);
                return user;
            });
        })
    };

    //TODO: make group getter


}