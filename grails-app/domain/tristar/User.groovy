package tristar

import java.security.SecureRandom

class User {
    transient springSecurityService

    String username
    static belongsTo = [account: Account]

    static constraints = {
        username(unique: true, blank: false, nullable: false)
        account(nullable: false)
    }

    static mapping = {
        id generator:'assigned'
    }

    def beforeValidate() {
        if (this.id == null){
            def generator = new SecureRandom()
            while(true){

                this.id = generator.nextLong()
                if (User.findById(this.id) == null) break
            }

        }

    }

}
