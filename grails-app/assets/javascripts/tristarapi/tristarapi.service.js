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

    // model of list of users
    service.userList = {};

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
                if (user !== null) {
                    service.currentUser = user;
                    console.debug("loaded " + user);
                }
                return user;
            });
        });
    };

    // get list of users
    service.getUserList = function (pageId) {
        var defer = $q.defer();

        // check local storage
        if (pageId.toString() in service.userList){
            defer.resolve(service.userList[pageId]);
        } else {
            defer.reject();
        }

        return defer.promise.then(function success (list) {
            return list;
        },function failure () {
            // check web service
            return TristarContentDownloaderService.loadUserList(service.accessToken, pageId).then(function (list) {
                if (list !== null){
                    service.userList[pageId] = list;
                    console.debug("loaded user list " + pageId);
                }

                return list;
            });
        });
    };

    //TODO: make group getter


}