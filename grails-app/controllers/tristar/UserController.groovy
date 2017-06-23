package tristar

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

class UserController extends RestfulController {
	static responseFormats = ['json']
    def springSecurityService

    UserController(){
        super(User)
    }

    @Secured(['ROLE_USER'])
    def index() {
        Account account = springSecurityService.currentUser
        User user = account.getUser()
        render user as JSON
    }

    @Secured(['ROLE_USER'])
    def show() {
        // checks params
        if (params.id == null){
            render (status: 400, text: "params missing fields")
            return
        }

        User user = User.findByUsername(params.id.toString())

        // checks if user is found
        if (user == null){
            render (status: 404, text: "${params.id.toString()} does not exist")
            return
        }

        render user as JSON
    }


    @Secured(['permitAll'])
    def save() {
        // check for received data
        if (request.JSON.username == null || request.JSON.email == null || request.JSON.password == null){
            render (status: 400, text: "JSON missing fields")
            return
        }

        Account account = new Account(request.JSON.email.toString(), request.JSON.password.toString())
        User user = new User(request.JSON.username.toString(), account)


        // validates account and user
        if (!account.validate()){
            render (status: 400, text: "Email not valid")
            return
        }

        if (!user.validate()){
            render (status: 400, text: "Username not valid")
            return
        }

        //save user and account
        account.save()
        user.save()

        //connect to role
        AccountRole.create(account, Role.findByAuthority("ROLE_USER"), true)

        render(status: 201, text: "Created ${request.JSON.username.toString()}")

    }
}
