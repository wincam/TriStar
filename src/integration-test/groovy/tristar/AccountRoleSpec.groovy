package tristar


import grails.test.mixin.integration.Integration
import grails.transaction.*
import spock.lang.*

@Integration
@Rollback
class AccountRoleSpec extends Specification {

    def setup() {
        new Role("USER_ROLE").save(flush: true)
        new Role("USER_ADMIN").save(flush: true)

        def bob = new Account("bob@test.com", "abc123")
        bob.save(flush: true)

        def carl = new Account("carl@test.com", "abc123")
        carl.save(flush: true)

        def mark = new Account("mark@test.com", "abc123")
        mark.save(flush: true)

        AccountRole.create(bob, Role.findByAuthority("USER_ROLE"))
        AccountRole.create(carl, Role.findByAuthority("USER_ADMIN"))
        AccountRole.create(mark, Role.findByAuthority("USER_ADMIN"))

    }

    def cleanup() {
    }

    void "test saving"() {
        expect:"both relationships saved"
            AccountRole.exists(Account.findByUsername("bob@test.com").getId(), Role.findByAuthority("USER_ROLE").getId())
            AccountRole.exists(Account.findByUsername("carl@test.com").getId(), Role.findByAuthority("USER_ADMIN").getId())
    }

    void "test remove all"() {
        AccountRole.removeAll(Role.findByAuthority("USER_ADMIN"))
        expect:"No Admins"
        AccountRole.findAllByRole(Role.findByAuthority("USER_ADMIN")).size() == 0

    }
}
