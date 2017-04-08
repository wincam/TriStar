package tristar

import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->

        Role.findOrSaveWhere(authority: "ROLE_USER")


        JSON.registerObjectMarshaller(User) {
            def returnSet = [:]
            returnSet.username = it.username
            returnSet.teamMember = it.teamMember.collect {it.name}
            returnSet.teamCaptain = it.teamCaptain.collect {it.name}
            return returnSet
        }

        JSON.registerObjectMarshaller(Team) {
            def returnSet = [:]
            returnSet.captains = it.captains.collect {it.getUsername()}
            returnSet.members = it.members.collect {it.getUsername()}
            return returnSet
        }

    }
    def destroy = {
    }
}
