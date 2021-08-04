import { DEFAULT_ROUTE_ANIMATIONS } from "./Animation"

const PAGE_APP_ROUTE_DEFAULT_OPTIONS = {
    animations: DEFAULT_ROUTE_ANIMATIONS,
    instantOpen: false,
}

class PageAppRoute {
    static TYPE_FULL_PAGE = 'FULL_PAGE'
    static TYPE_TRANSPARENT = 'TRANSPARENT'

    constructor(content, options) {
        this.options = { ...PAGE_APP_ROUTE_DEFAULT_OPTIONS, ...options }
        this.content = content
    }

    mount(navigator, element) {
        const renderer = this.options.render || navigator.renderer
        this.element = element
        renderer(this.content, element, this)
        const unlisten = navigator.options.historyController.addEventListener('backward', event => {
            event.stopPropagation()
            unlisten()
            navigator.pop(this)
        })
    }

    open() {
        'Animate from close to opened'
        if (!this.options.instantOpen) this.options.animations.open.animate(this.element)
    }

    async close() {
        'Animate from opened to closed'
        await this.options.animations.close.animate(this.element)
    }

    show() {
        'Animate from hidden to opened'
        this.options.animations.show.animate(this.element)

    }

    hide() {
        'Animate from opened to hidden'
        this.options.animations.hide.animate(this.element)

    }

    set onPop(cb){
        this.options.onPop = cb
    }
}

export { PageAppRoute }