import { applyCss, camelCaseToCssPropName, delay } from "./util"

const DEFAULT_ANIMATION_DURATION = 300

class Animation {
    constructor(initialStyle, finalStyle, duration) {
        this.getInitialStyle = typeof initialStyle == 'function' ? initialStyle : () => initialStyle
        this.getFinalStyle = typeof finalStyle == 'function' ? finalStyle : () => finalStyle
        this.getDuration = typeof duration == 'function' ? duration : () => duration
    }

    get initialStyle() {
        return this.getInitialStyle()
    }

    get finalStyle() {
        return this.getFinalStyle()
    }

    get duration() {
        return this.getDuration()
    }

    applyTransitionStyle(element, keys) {
        let list = []
        const dur = this.duration + 'ms'
        for (const key of keys) {
            const name = camelCaseToCssPropName(key)
            list.push(`${name} ${dur}`)
        }
        const orig = element.style.transition
        element.style.transition = list.join(', ')
        return orig
    }

    async animate(element) {
        //get styles
        const initialStyle = this.initialStyle
        const finalStyle = this.finalStyle
        //get styles keys
        const keys = Object.keys({ ...initialStyle, ...finalStyle })
        //apply initial
        applyCss(element, initialStyle)
        //ensure element updated
        await delay(1)
        //Apply transition style
        const origTransition = this.applyTransitionStyle(element, keys)
        //Apply final and animate
        applyCss(element, finalStyle)
        //Await time to end to reset transition style
        await delay(this.duration)
        element.style.transition = origTransition
    }
}

class RouteAnimations {
    constructor({ open, close, show, hide, getOpen, getClose, getShow, getHide }) {
        this.getOpen = open ? () => open : getOpen
        this.getClose = close ? () => close : getClose
        this.getShow = show ? () => show : getShow
        this.getHide = hide ? () => hide : getHide
    }

    get open() {
        return this.getOpen()
    }

    get close() {
        return this.getClose()
    }

    get show() {
        return this.getShow()
    }

    get hide() {
        return this.getHide()
    }
}

const DEFAULT_OPEN_ANIMATION = new Animation({
    left: null,
    right: '-110%',
}, {
    right: '0px',
}, DEFAULT_ANIMATION_DURATION)

const DEFAULT_CLOSE_ANIMATION = new Animation({
    left: null,
    right: '0px',
}, {
    right: '-110%',
}, DEFAULT_ANIMATION_DURATION)

const DEFAULT_SHOW_ANIMATION = new Animation({
    left: '-50%',
}, {
    left: '0px',
}, DEFAULT_ANIMATION_DURATION)

const DEFAULT_HIDE_ANIMATION = new Animation({
    left: '0px',
}, {
    left: '-50%',
}, DEFAULT_ANIMATION_DURATION)

const DEFAULT_ROUTE_ANIMATIONS = new RouteAnimations({
    open: DEFAULT_OPEN_ANIMATION,
    close: DEFAULT_CLOSE_ANIMATION,
    show: DEFAULT_SHOW_ANIMATION,
    hide: DEFAULT_HIDE_ANIMATION,
})

export {
    Animation,
    RouteAnimations,
    DEFAULT_ROUTE_ANIMATIONS,
    DEFAULT_OPEN_ANIMATION,
    DEFAULT_CLOSE_ANIMATION,
    DEFAULT_SHOW_ANIMATION,
    DEFAULT_HIDE_ANIMATION
}