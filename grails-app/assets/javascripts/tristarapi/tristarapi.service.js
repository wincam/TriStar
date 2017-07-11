/**
 * @author Cameron Nicolle
 * @since 28/06/17
 */

angular.module("tristarapi").service("TristarApiService",TristarApiService);


TristarApiService.$inject = ["$q", "TristarContentDownloaderService", "TristarContentUploaderService"];
/**
 * Service for requesting, sending and caching Tristar REST API
 * @memberOf tristarapi
 * @param $q                                Angular $q service
 * @param TristarContentDownloaderService   Service for getting data from the Tristar REST API
 * @param TristarContentUploaderService     Service for sending data to the Tristar REST API
 */
function TristarApiService ($q, TristarContentDownloaderService, TristarContentUploaderService) {
    var service = this;
    service.accessToken = undefined;

    // model of current user
    service.currentUser = undefined;

    // collection of user list pages
    service.userList = {};

    // model of teams
    service.teams = {};

    // model of tasks
    service.tasks = {};

    // model of users
    service.users = {};

    /**
     * Authenticates emails and password and stores a token
     * @param {String} email    The email of the user
     * @param {String} password The password of the user
     * @return {Promise} if authentication was successful
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
     * Creates a getter function that caches the result for faster response in the future
     * @private
     * @param {Object} saveLocation Location to save data
     * @param {Function} downloader Function to download data
     * @param {String} type         Type of data
     * @return {Function}
     */
    service.cachingGetterFactory = function (saveLocation, downloader, type) {
        return function (id) {
            var defer = $q.defer();

            // check local storage
            if (id in saveLocation){
                defer.resolve(saveLocation[id]);
            } else {
                defer.reject();
            }

            return defer.promise.then(function success (object) {
                return object;
            },function failure () {
                // check web service
                return downloader(service.accessToken, id).then(function (object) {
                    // save value
                    if (object !== null){
                        saveLocation[id] = object;
                        console.debug("loaded " + type + " " + id);
                    }
                    return object;

                });
            });
        };


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
     * @param {Number} id   The page to be downloaded
     * @return {List} A list of user names or null
     * @type {Function}
     */
    service.getUserList = service.cachingGetterFactory(service.userList, TristarContentDownloaderService.loadUserList, "User list Page");

    /**
     * Downloads a team
     * @param {String} id Name of team to download
     * @return A model of the team or null
     * @type {Function}
     */
    service.getTeam = service.cachingGetterFactory(service.teams, TristarContentDownloaderService.loadTeam, "team");

    /**
     * Gets a task
     * @param {String} id Id of task to download
     * @return A model of the task or null
     * @type {Function}
     */
    service.getTask = service.cachingGetterFactory(service.tasks, TristarContentDownloaderService.loadTask, "task");

    /**
     * Gets a user
     * @param {String} id Id of user to download
     * @return A model of the user or null
     * @type {Function}
     */
    service.getUser = service.cachingGetterFactory(service.users, TristarContentDownloaderService.loadUser, "user");

    /**
     * Creates a user
     * @param {String} username Username of the user
     * @param {String} email    Email of the user
     * @param {String} name     Name of the user
     * @param {String} password Password of the user
     * @return {Promise}
     */
    service.createUser = function (username, email, name, password) {
        return TristarContentUploaderService.createUser(username, email, name, password).then(function success () {
            // user created
            return true;
        }, function failure () {
            // user not created
            return false;
        });
    };

    /**
     * Creates a team
     * @param {String} name         Name of the team
     * @param {String} description  Description of team
     */
    service.createTeam = function (name, description) {
        return TristarContentUploaderService.createTeam(service.accessToken, name, description).then(function success () {
            // team created
            // clear user
            service.currentUser = undefined;
            return true;
        }, function failure () {
            // team not created
            return false;
        });
    };


}