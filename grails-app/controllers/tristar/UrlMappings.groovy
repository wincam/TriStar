package tristar

class UrlMappings {

    static mappings = {
        // TeamCaptain route
        "/api/teamcaptain/$teamID?"(controller: "TeamCaptain"){
            action = [POST:"save"]
        }
        "/api/teamcaptain/$teamID?/$userID?"(controller: "TeamMember"){
            action = [DELETE:"delete"]
        }


        // TeamMember route
       "/api/teammember/$teamID?"(controller: "TeamMember"){
            action = [POST:"save"]

        }
        "/api/teammember/$teamID?/$userID?"(controller: "TeamMember"){
            action = [DELETE:"delete"]
        }

        // Team route
        "/api/team"(controller: "Team"){
            action = [POST:"save"]
        }
        "/api/team/$id?"(controller: "Team"){
            action = [GET:"show", PUT:"update", DELETE:"delete"]
        }

        // Task route
        "/api/task"(controller: "Task"){
            action = [POST:"save"]
        }
        "/api/task/$id?"(controller: "Task"){
            action = [GET:"show", PUT:"update", DELETE:"delete"]
        }

        // User route
        "/api/user"(controller: "User"){
            action = [POST:"save"]
        }
        "/api/user/$id?"(controller: "User"){
            action = [GET:"show", PUT:"update", DELETE:"delete"]
        }

        // Users route
        "/api/users/$id?"(controller: "Users"){
            action = [GET:"show"]
        }

        /*
        delete "/api/$controller/$id(.$format)?"(action:"delete")
        get "/api/$controller(.$format)?"(action:"index")
        get "/api/$controller/$id(.$format)?"(action:"show")
        post "/api/$controller(.$format)?"(action:"save")
        put "/api/$controller/$id(.$format)?"(action:"update")
        patch "/api/$controller/$id(.$format)?"(action:"patch")
        */


        "/"(view: '/index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
