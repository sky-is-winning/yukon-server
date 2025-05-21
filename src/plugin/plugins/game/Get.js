import GamePlugin from '@plugin/GamePlugin'

import { hasProps, isNumber } from '@utils/validation'


export default class Get extends GamePlugin {

    constructor(handler) {
        super(handler)

        this.events = {
            'get_player': this.getPlayer,
            'get_stampbook_data': this.getStampbookData,
        }
    }

    async getPlayer(args, user) {
        if (!hasProps(args, 'id')) {
            return
        }

        if (!isNumber(args.id)) {
            return
        }

        if (args.id in this.usersById) {
            return user.send('get_player', { penguin: this.usersById[args.id].anonymous })
        }

        if (!user.buddies.includes(args.id)) {
            return
        }

        let u = await this.db.getUserById(args.id)
        if (u) {
            user.send('get_player', { penguin: u.anonymous })
        }
    }

    async getStampbookData(args, user) {
        if (!hasProps(args, 'id')) {
            return
        }

        if (!isNumber(args.id)) {
            return
        }

        if (args.id in this.usersById) {
            let u = this.usersById[args.id]
            user.send('get_stampbook_data', { stamps: u.stamps, color: u.stampbookColor, pattern: u.stampbookPattern, highlight: u.stampbookHighlight, clasp: u.stampbookClasp, nickname: u.username, penguinColor: u.color })
            return
        }

        let u = await this.db.getUserById(args.id)
        let stamps = await this.db.getUserStamps(args.id)

        if (u) {
            user.send('get_stampbook_data', { stamps, color: u.stampbookColor, pattern: u.stampbookPattern, highlight: u.stampbookHighlight, clasp: u.stampbookClasp, nickname: u.username, penguinColor: u.color })
        }
    }

}
