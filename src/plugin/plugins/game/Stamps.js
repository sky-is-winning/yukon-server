import GamePlugin from '@plugin/GamePlugin'

export default class Stamps extends GamePlugin {

    constructor(handler) {
        super(handler)

        this.events = {
            'stamp_earned': this.stampEarned,
            'update_stampbook': this.updateStampbook
        }
    }

    async stampEarned(args, user) {
        if (!user) {
            return
        }

        args.id = parseInt(args.id)

        if (!this.crumbs.stamps.some(category =>
            category.stamps.some(stamp =>
                stamp.stamp_id == args.id)
        )) {
            return
        }

        if (user.stamps.includes(args.id)) {
            return
        }

        user.stamps.add(args.id)

        user.send('stamp_earned', { id: args.id })
    }

    async updateStampbook(args, user) {
        if (!user) {
            return
        }

        const update = {}
        Object.keys(args).forEach(key => {
            update[`stampbook${key.charAt(0).toUpperCase() + key.slice(1)}`] = args[key]
        })

        user.update(update)
    }

}
