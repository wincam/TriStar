package tristar

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

/**
 * Controller that acts on a single Team at a time
 */
@Secured(['ROLE_USER'])
class TeamController extends RestfulController{
	static responseFormats = ['json']
    def springSecurityService
    AccessService accessService

    TeamController() {
        super(Team)
    }

    def index() {

    }

    def show() {
        // checks params
        if (params.id == null){
            render (status: 400, text: "params missing fields")
            return
        }

        Team desiredTeam = Team.findByName(params.id.toString())


        // checks if team is found
        if (desiredTeam == null){
            render (status: 404, text: "${params.id.toString()} does not exist")
            return
        }

        // check for access
        if (!accessService.hasAccess(springSecurityService.currentUser, desiredTeam)){
            render (status: 401, text: "Cannot access ${params.id.toString()}")
            return
        }

        render desiredTeam as JSON
    }

    def save() {
        // checks JSON fields
        if (request.JSON.name == null || request.JSON.description == null){
            render (status: 400, text: "JSON missing fields")
            return
        }

        User user = springSecurityService.currentUser.getUser()

        Team newTeam = new Team(request.JSON.name.toString(), request.JSON.description.toString(), user)

        // validates team
        if (!newTeam.validate()){
            render (status: 400, text: "Team not valid")
            return
        }

        newTeam.save(flush: true)
        user.save(flush: true)

        render (status: 201, text: "Team ${request.JSON.name.toString()} created")
    }

    //adds a user to a group
    def update (){
        // checks params
        if (params.id == null){
            render (status: 400, text: "params missing fields")
            return
        }

        Team team = Team.findByName(params.id.toString())
        // checks if team is found
        if (team == null){
            render (status: 404, text: "${params.id.toString()} does not exist")
            return
        }


        // find if user is a captain
        User user = springSecurityService.currentUser.getUser()

        if (!team.getCaptains().contains(user)){
            render (status: 401, text: "${user.getUsername()} does not have captain access to ${params.id.toString()}")
            return
        }


        // checks JSON fields
        if (request.JSON.members == null && request.JSON.captains == null){
            render (status: 400, text: "JSON missing fields")
            return
        }

        // find members
        if (request.JSON.members != null){
            // check if valid list
            if (!(request.JSON.members instanceof List)){
                render (status: 400, text: "Members not formatted as list")
                return
            }

            List<User> newMembers = User.findAllByUsernameInList(request.JSON.members)

            // check for assignees
            if (newMembers == null || newMembers.empty){
                render (status: 404, text: "No valid new members found")
                return
            }

            newMembers.each {team.addToMembers(it)}
        }

        // find members
        if (request.JSON.captains != null){
            // check if valid list
            if (!(request.JSON.captains instanceof List)){
                render (status: 400, text: "Members not formatted as list")
                return
            }

            List<User> newCaptains = User.findAllByUsernameInList(request.JSON.captains)

            // check for assignees
            if (newCaptains == null || newCaptains.empty){
                render (status: 404, text: "No valid new captains found")
                return
            }

            newCaptains.each {team.addToCaptains(it)}
        }

        //removes users in both captains and members
        team.getCaptains().each {team.removeFromMembers(it)}


        // checks team is still valid
        if (!team.validate()){
            render (status: 400, text: "Updated team not valid")
            return
        }

        team.save(flush : true)
        render (status: 200, text: "Team ${params.id} updated")
    }
}
