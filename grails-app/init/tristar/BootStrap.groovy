package tristar

import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->

        Role.findOrSaveWhere(authority: "ROLE_USER")


        JSON.registerObjectMarshaller(User) {
            def returnSet = [:]
            returnSet.username = it.username
            returnSet.teams = it.teams.each {it.getName()}
            return returnSet
        }

        JSON.registerObjectMarshaller(User) {
            def returnSet = [:]
            returnSet.captains = it.captains.each {it.getUsername()}
            returnSet.members = it.members.each {it.getUsername()}
            return returnSet
        }

    }
    def destroy = {
    }
}
