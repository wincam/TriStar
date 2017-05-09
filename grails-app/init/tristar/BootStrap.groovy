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
            returnSet.assignedTasks = it.assignedTasks.collect {it.getId()}
            returnSet.createdTasks = it.createdTasks.collect {it.getId()}
            return returnSet
        }

        JSON.registerObjectMarshaller(Team) {
            def returnSet = [:]
            returnSet.captains = it.captains.collect {it.getUsername()}
            returnSet.members = it.members.collect {it.getUsername()}
            returnSet.tasks = it.tasks.collect {it.getId()}
            return returnSet
        }

    }
    def destroy = {
    }
}
