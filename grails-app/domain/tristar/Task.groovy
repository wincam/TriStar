package tristar

/**
 * Domain to represent tasks
 */
class Task {

    transient IDService

    String name
    String description
    Date dueDate
    Boolean open


    static hasOne = [assigner: User, team: Team]
    static hasMany = [assignees: User]
    static belongsTo = [User]

    static constraints = {
        name nullable: false, blank: false
        description nullable: false, blank: false

    }

    static mapping = {
        id generator:'assigned'
    }

    static mappedBy = [assignees: "assignedTasks"]


    Task (String name, String description, Date dueDate, User assigner, List<User> assignees){
        this()
        this.id = IDService.assignID(Task)
        this.name = name
        this.description = description
        this.dueDate = dueDate
        this.assigner = assigner
        this.assignees.addAll(assignees)
        this.open = true
    }
}
