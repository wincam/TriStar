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
            returnSet.assignedTasks = it.assignedTasks.collect {Long.toString(it.getId())}
            returnSet.createdTasks = it.createdTasks.collect {Long.toString(it.getId())}
            return returnSet
        }

        JSON.registerObjectMarshaller(Team) {
            def returnSet = [:]
            returnSet.name = it.name
            returnSet.description = it.description
            returnSet.captains = it.captains.collect {it.getUsername()}
            returnSet.members = it.members.collect {it.getUsername()}
            returnSet.tasks = it.tasks.collect {Long.toString(it.getId())}
            return returnSet
        }

        JSON.registerObjectMarshaller(Task) {
            def returnSet = [:]
            returnSet.id = Long.toString(it.id)
            returnSet.name = it.name
            returnSet.description = it.description
            returnSet.dueDate = it.dueDate
            returnSet.dateCreated = it.dateCreated
            returnSet.open = it.open
            returnSet.assigner = it.assigner.getUsername()
            returnSet.members = it.team.getName()
            returnSet.assignee = it.assignees.collect {it.getUsername()}
            return returnSet
        }

    }
    def destroy = {
    }
}
