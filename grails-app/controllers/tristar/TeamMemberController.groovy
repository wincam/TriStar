package tristar

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

/**
 * Adds and removes team members for Teams
 */
@Secured(['ROLE_USER'])
class TeamMemberController extends RestfulController {
	static responseFormats = ['json']
    def springSecurityService
    TeamMemberController(){
        super(Team)
    }

    // Adds member to team
    def save() {
        // checks params
        if (params.teamID == null){
            render (status: 400, text: "params missing fields")
            return
        }

        Team team = Team.findByName(params.teamID.toString())
        // checks if team is found
        if (team == null){
            render (status: 404, text: "${params.teamID.toString()} does not exist")
            return
        }


        // find if user is a captain
        User user = springSecurityService.currentUser.getUser()

        if (!team.getCaptains().contains(user)){
            render (status: 401, text: "${user.getUsername()} does not have captain access to ${params.teamID.toString()}")
            return
        }

        // find members
        if (request.JSON == null){
            render (status: 401, text: "No members provided")
        }

        // check if valid list
        if (!(request.JSON instanceof List)){
            render (status: 400, text: "Members not formatted as list")
            return
        }

        List<User> newMembers = User.findAllByUsernameInList(request.JSON)

        // check for assignees
        if (newMembers == null || newMembers.empty){
            render (status: 404, text: "No valid new members found")
            return
        }

        newMembers.each {team.addToMembers(it)}

        //removes users in both captains and members
        team.getCaptains().each {team.removeFromMembers(it)}

        // checks team is still valid
        if (!team.validate()){
            render (status: 400, text: "Updated team not valid")
            return
        }

        team.save(flush : true)
        render (status: 200, text: "Team ${params.teamID} updated")
    }

    def delete() {
        //TODO: add remove
    }
}
