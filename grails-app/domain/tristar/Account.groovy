package tristar

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class Account implements Serializable {

	private static final long serialVersionUID = 1

	transient springSecurityService
    transient IDService

	String username
	String password
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired

	static hasOne = [user: User]

	Account(String username, String password) {
		this()
        this.id = IDService.assignID(Account)
		this.username = username
		this.password = password
	}

	Set<Role> getAuthorities() {
		AccountRole.findAllByAccount(this)*.role
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}

	static transients = ['springSecurityService']

	static constraints = {
		username blank: false, unique: true, email: true
		password blank: false
        user nullable: true
	}

	static mapping = {
        id generator:'assigned'
		password column: '`password`'
	}
}
