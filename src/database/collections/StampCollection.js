import Collection from '../Collection'


export default class StampCollection extends Collection {

    constructor(user, models) {
        super(user, models, 'stamps', 'stampId')
    }

    add(stampId) {
        super.add({ userId: this.user.id, stampId })
    }

}