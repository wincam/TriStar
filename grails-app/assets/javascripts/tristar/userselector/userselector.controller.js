/**
 * @author Cameron Nicolle
 * @since 18/07/17
 */

angular.module('tristar')
    .controller('UserSelectorController', UserSelectorController);

UserSelectorController.$inject = [];
/**
 * Controller for user selector button component
 * @memberOf tristar
 */
function UserSelectorController () {
    var ctrl = this;

    ctrl.userSearchTerm = "";
    ctrl.searchedUsers = [];


    /**
     * Compiles list of searched users
     */
    ctrl.searchUser = function () {
        console.log(ctrl.usernames);
        console.log(ctrl.selectedusernames);
        ctrl.searchedUsers = [];
        for (var username in ctrl.usernames){
            if (ctrl.usernames.hasOwnProperty(username)) {
                if (ctrl.usernames[username].toLowerCase().includes(ctrl.userSearchTerm.toLowerCase())){
                    ctrl.searchedUsers.push(ctrl.usernames[username]);
                }
            }
        }
    };

    /**
     * Checks if user is selected
     * @param {String} username Username of user
     * @return {boolean}
     */
    ctrl.isUserSelected = function (username) {
        return ctrl.selectedusernames.indexOf(username) !== -1;
    };

    /**
     * Calls the select callback
     * @param {String} username The username being selected
     */
    ctrl.selectUser = function (username) {
        ctrl.select({username: username});
    };

    // prepopulate searched users
    ctrl.$postLink = function () {
        ctrl.searchUser();
    };
}