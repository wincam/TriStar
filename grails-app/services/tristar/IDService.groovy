package tristar

import grails.transaction.Transactional

import java.security.SecureRandom

/**
 * A service for the creation of domain IDs
 */
@Transactional
class IDService {

    /**
     * Assigns a random ID to any domain class
     * @param domainData    Domain to assign ID to
     * @param domainClass   Class of domain
     */
    def assignID(domainData, domainClass) {
        if (domainData.id == null){
            def generator = new SecureRandom()
            while(true){

                domainData.id = generator.nextLong()
                // make sure id doesn't already exist
                if (domainClass.findById(domainData.id) == null) break
            }

        }
    }
}
