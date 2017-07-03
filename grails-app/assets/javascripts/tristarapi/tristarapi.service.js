/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module("tristarapi").service("TristarApiService",TristarApiService);


TristarApiService.$inject = ["$q", "TristarContentDownloaderService"];
/**
 * Service for requesting, sending and caching Tristar REST API
 * @memberOf tristarapi
 * @param $q                                Angular $q service
 * @param TristarContentDownloaderService   Service for getting data from the Tristar REST API
 */
function TristarApiService ($q, TristarContentDownloaderService) {
    var service = this;
    service.accessToken = undefined;

    // model of current user
    service.currentUser = undefined;

    // model of list of users
    service.userList = {};

    // model of teams
    service.teams = {};

    /**
     * Authenticates emails and password and stores a token
     * @param {String} email    The email of the user
     * @param {String} password The password of the user
     * @return {Boolean} if authentication was successful
     */
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

    /**
     * Downloads the model of the current logged in user
     * @return A model of the user or null
     */
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

    /**
     * Downloads a page of the list of users
     * @param {Number} pageId   The page to be downloaded
     * @return {List} A list of user names or an empty list
     */
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
                    console.debug("loaded user list page " + pageId);
                    return list;
                }
                return [];

            });
        });
    };

    //TODO: make group getter


}