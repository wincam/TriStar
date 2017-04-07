package tristar

import grails.transaction.Transactional

@Transactional
class AccessService {

    /**
     * Detemines if a given account has access to a team
     * @param account   Account that needs access
     * @param team      Team to check
     * @return          If access is allowed
     */
    boolean hasAccess(Account account, Team team) {
        User user = account.getUser()
        return team.captains.contains(user) || team.members.contains(user)
    }
}
