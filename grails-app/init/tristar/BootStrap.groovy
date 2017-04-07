package tristar

import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->

        Role.findOrSaveWhere(authority: "ROLE_USER")


        JSON.registerObjectMarshaller(User) {
            def returnSet = [:]
            returnSet.username = it.username
            return returnSet
        }

    }
    def destroy = {
    }
}
