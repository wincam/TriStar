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


    User (String username, Account account){
        this()
        this.id = IDService.assignID(User)
        this.username = username
        this.account = account
        account.user = this
    }


}
