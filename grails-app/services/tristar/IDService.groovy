package tristar

import grails.transaction.Transactional

import java.security.SecureRandom

/**
 * A service for the creation of domain IDs
 */
@Transactional
class IDService {

    /**
     * Generates a random ID to any domain class
     * @param domainClass   Class of domain
     * @return  New ID
     */
    long assignID(Class domainClass) {
        def generator = new SecureRandom()
        long newID
        while(true){

            newID = generator.nextLong()
            // make sure id doesn't already exist
            if (domainClass.findById(newID) == null) break
        }

        return newID
    }
}
