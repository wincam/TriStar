package tristar

/**
 * Domain to represent users
 */
class User {
    transient springSecurityService
    transient IDService

    String username

    static hasMany = [teams: Team]

    static belongsTo = [account: Account]

    static constraints = {
        username(unique: true, blank: false, nullable: false)
        account(nullable: false)
    }

    static mapping = {
        id generator:'assigned'
    }

    /**
     * Called before validation, generates new id value
     */
    def beforeValidate() {
        IDService.assignID(this, User)
    }

}
