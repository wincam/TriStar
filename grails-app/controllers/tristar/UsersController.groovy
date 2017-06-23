package tristar

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

/**
 * Controller that lists users
 */
@Secured(['ROLE_USER'])
class UsersController extends RestfulController {
	static responseFormats = ['json']

    UsersController(){
        super(User)
    }

    /**
     * Renders a list of user names in pages of 20
     * Optionally will list users not included in groups
     */
    def show() {
        // checks params
        if (params.id == null){
            render (status: 400, text: "params missing fields")
            return
        }

        // get page number
        long page
        try {
            page = Long.parseLong(params.id.toString())
        } catch (NumberFormatException e){
            render(status:400, text: "Cannot parse page ID")
            return
        }

        // check for negatives
        if (page < 0){
            render (status: 400, text: "Page cannot be negative")
            return
        }

        // get list of user names
        def userList

        //find user
        if (params.notcaptain != null || params.notmember != null){
            def users = User.findAll()

            if (params.notcaptain != null){
                // user who is not a captain of a particular group
                Team team = Team.findByName(params.notcaptain.toString())

                // invalid team
                if (team == null){
                    render (status: 404, text: "${params.notcaptain.toString()} cannot be found")
                    return
                }
                users.removeAll(team.getCaptains())

            }

            if (params.notmember != null){
                // user who is not a member of a particular group
                Team team = Team.findByName(params.notmember.toString())

                // invalid team
                if (team == null){
                    render (status: 404, text: "${params.notmember.toString()} cannot be found")
                    return
                }
                users.removeAll(team.getMembers())
            }

            userList = users.collect() {it.getUsername()}
        } else {
            // all users
            userList = User.findAll().collect() {it.getUsername()}
        }


        userList.sort()


        // render list of names
        if (Math.floor(userList.size() / 20) < page) {
            // page # too large
            def blank = []
            render blank as JSON
        } else if (Math.floor(userList.size() / 20) == page){
            // last page
            render userList.subList((page * 20).toInteger(), userList.size()) as JSON
        } else {
            // any other page
            render userList.subList((page * 20).toInteger(), ((page + 1) * 20).toInteger()) as JSON
        }

    }
}
