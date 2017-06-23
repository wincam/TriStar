package tristar

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

@Secured(['ROLE_USER'])
class TaskController extends RestfulController {
	static responseFormats = ['json']
    def springSecurityService
    AccessService accessService


    TaskController (){
        super(Task)
    }
	
    def index() { }

    def show() {
        // checks params
        if (params.id == null){
            render (status: 400, text: "params missing fields")
            return
        }

        long taskId
        // get id of task
        try{
            taskId = Long.parseLong(params.id.toString())
        } catch (NumberFormatException){
            render (status: 400, text: "${params.id.toString()} not an integer")
            return
        }

        Task task = Task.findById(taskId)

        // check if task exists
        if (task == null){
            render (status: 404, text: "${params.id.toString()} does not exist")
            return
        }

        if (!accessService.hasAccess(springSecurityService.currentUser, task)) {
            render(status: 401, text: "Cannot access ${params.id.toString()}")
            return
        }

        render task as JSON
    }

    def save () {
        // checks JSON fields
        if (request.JSON.name == null || request.JSON.description == null || request.JSON.assignees == null || request.JSON.dueDate == null || request.JSON.team == null){
            render (status: 400, text: "JSON missing fields")
            return
        }

        // check if valid list
        if (!(request.JSON.assignees instanceof List)){
            render (status: 400, text: "Assignees not formatted as list")
            return
        }

        Date dueDate = Date.parse("d/M/yyyy H:m:s",request.JSON.dueDate.toString())
        // check if date is valid
        if (dueDate == null){
            render (status: 400, text: "Date is invalid")
            return
        }

        List<User> assignees = User.findAllByUsernameInList(request.JSON.assignees)

        // check for assignees
        if (assignees == null || assignees.empty){
            render (status: 404, text: "No valid assignees found")
            return
        }

        //get team
        Team team = Team.findByName(request.JSON.team.toString())
        // check team
        if (team == null){
            render (status: 404, text: "${request.JSON.team.toString()} not found")
            return
        }

        Account assigner = springSecurityService.currentUser

        print(assignees)

        Task newTask = new Task(request.JSON.name.toString(), request.JSON.description.toString(), dueDate, team, assigner.getUser(), assignees)

        if (!newTask.validate()){
            render (status: 400, text: "${request.JSON.name.toString()} not valid ${newTask.errors.allErrors}")
            return
        }

        newTask.save(flush: true)
        render (status: 201, text: "${request.JSON.name.toString()} created")
    }

    def update() {
        // checks params
        if (params.id == null){
            render (status: 400, text: "params missing fields")
            return
        }

        long taskId
        // get id of task
        try{
            taskId = Long.parseLong(params.id.toString())
        } catch (NumberFormatException){
            render (status: 400, text: "${params.id.toString()} not an integer")
            return
        }

        Task task = Task.findById(taskId)

        // check if task exists
        if (task == null){
            render (status: 404, text: "${params.id.toString()} does not exist")
            return
        }

        User editor = springSecurityService.currentUser.getUser()

        if (!(task.getAssignees().contains(editor) || (task.getAssigner() == editor))){
            render(status: 401, text: "Cannot edit ${params.id.toString()}")
            return
        }

        // invert open status
        task.setOpen(!task.getOpen())

        if (!task.validate()){
            render (status: 400, text: "Updated task not valid")
            return
        }

        task.save(flush: true)
        render (status: 202, text: "${params.id.toString()} updated")
    }
}
