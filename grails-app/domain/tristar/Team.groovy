package tristar

/**
 * Domain class to represent teams
 */
class Team {

    transient IDService

    String name
    String description

    static hasMany = [members: User, captains: User, tasks: Task]
    static belongsTo = [User]

    static constraints = {
        name nullable: false, blank: false, unique: true
        description nullable: false, blank: true
        members nullable: true
        captains nullable: false
    }

    static mapping = {
        id generator:'assigned'
    }

    static mappedBy = [members: "teamMember", captains: "teamCaptain"]

    Team (String name, String description, User creator){
        this()
        this.id = IDService.assignID(Team)
        this.name = name
        this.description = description
        this.addToCaptains(creator)
    }
}
