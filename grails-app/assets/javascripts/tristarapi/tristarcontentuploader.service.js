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

    /**
     * Sends a request to create a team
     * @param {String} token        Token of the current user
     * @param {String} name         Name of task
     * @param {String} description  Description of task
     * @return {Promise}
     */
    service.createTeam = function (token, name, description) {
        var config = {
            method: "POST",
            url: ApiPath + "team",
            data: {
                name: name,
                description: description
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        };
        return $http(config);
    };

    /**
     * Sends a request to create a task
     * @param {String} token        Token of the current user
     * @param {String} name         Name of task
     * @param {String} description  Description of the task
     * @param {List} assignees      A list of assignees for the task
     * @param {Date} dueDate        Date the task is due to be completed
     * @param {String} team         Team the task is in
     * @return {Promise}
     */
    service.createTask = function (token, name, description, assignees, dueDate, team) {
        var config = {
            method: "POST",
            url: ApiPath + "task",
            data: {
                name: name,
                description: description,
                assignees: assignees,
                dueDate: dueDate,
                team: team
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        };
        return $http(config);
    }

}