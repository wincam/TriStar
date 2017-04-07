package tristar


class Team {

    transient IDService

    String name
    String description

    static hasMany = [members: User, captains: User]
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

    def beforeValidate() {
        IDService.assignID(this, Team)
    }
}
