package tristar

/**
 * Domain to represent users
 */
class User {
    transient springSecurityService
    transient IDService

    String username

    static hasMany = [teamMember: Team, teamCaptain: Team]

    static belongsTo = [account: Account]

    static constraints = {
        username(unique: true, blank: false, nullable: false)
        account(nullable: false)
    }

    static mapping = {
        id generator:'assigned'
    }

    static mappedBy = [teamMember: "members", teamCaptain: "captains"]


    User (String username, Account account){
        this()
        this.id = IDService.assignID(User)
        this.username = username
        this.account = account
    }


}
