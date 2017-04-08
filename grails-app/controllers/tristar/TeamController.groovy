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
        if (accessService.hasAccess(springSecurityService.currentUser, desiredTeam)){
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
}
