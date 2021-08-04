import { PageAppRoute } from "./appRoute"
import ROUTE_RENDERERS from "./renderers"
import { DEFAULT_ROUTE_STYLE, MAIN_ELEMENT_STYLES } from "./styles"
import { applyCss, mapPushArgs } from "./util"

const DEFAULT_OPTIONS = {
    render: ROUTE_RENDERERS['default'],
    element: document.body,
    historyController: null,
    routeStyle: DEFAULT_ROUTE_STYLE,
    mainStyle: MAIN_ELEMENT_STYLES,
}

class AppPagesNavigator {
    constructor(options) {
        this.options = { ...DEFAULT_OPTIONS, ...options }

        //Routes stack
        this.stack = []

        //When route is created it will use this render for content
        if (typeof options.render == 'function') this.renderer = options.render
        else if (typeof options.render == 'string') this.renderer = ROUTE_RENDERERS[this.renderer]
        else this.renderer = ROUTE_RENDERERS['default']

        applyCss(this.options.element, this.options.mainStyle)
    }

    _push(route) {
        this.stack.push(route)
        const routeElement = document.createElement('div')
        applyCss(routeElement, this.options.routeStyle)
        this.options.element.appendChild(routeElement)
        route.mount(this, routeElement)

        const index = this.stack.indexOf(route)
        if(this.stack[index-1]) this.stack[index-1].hide()
        route.open()
        return route
    }

    push(route_or_content, url_or_options, options) {
        let content, route
        [content, route, options] = mapPushArgs(route_or_content, url_or_options, options)
        if (content && !route) {
            route = new PageAppRoute(content, options)
        }
        const r = this._push(route)
        if (options.url != undefined) this.options.historyController.url = options.url
        return r
    }

    pushAndRemoveUntil(route_or_content, url_or_options, options) {
        let content, route
        [content, route, options] = mapPushArgs(route_or_content, url_or_options, options)

    }

    pushNamed(_name, url_or_options, _options) {
        const [name, options] = mapPushnamedArgs(name, url_or_options, _options)
    }

    pushNamedAndRemoveUntil(route_or_content, url_or_options, options) {
        let content, route
        [content, route, options] = mapPushArgs(route_or_content, url_or_options, options)
    }

    pushReplacement(route_or_content, url_or_options, options) {
        let content, route
        [content, route, options] = mapPushArgs(route_or_content, url_or_options, options)
    }

    pushReplacementNamed(route_or_content, url_or_options, options) {
        let content, route
        [content, route, options] = mapPushArgs(route_or_content, url_or_options, options)
    }

    async _pop(route) {
        const index = this.stack.indexOf(route)

        if(route.options.onPop && route.options.onPop() === false) return null

        if(this.stack[index-1]) this.stack[index-1].show()
        await route.close()

        const r = this.stack.splice(index, 1)
        this.options.element.removeChild(route.element)
        return r
    }

    async pop(route, options) {
        route = route || this.top
        if (!route) return
        return this._pop(route)
    }

    popAndPushNamed(_name, url_or_options, _options) {

    }

    popUntil(route_or_function) {

    }

    removeRoute(route) {

    }

    removeRouteBelow(route) {

    }

    replace(route, replacement_route) {

    }

    replaceRouteBelow(route, replacement_route) {

    }

    get top() {
        return this.stack[this.stack.length - 1]
    }

    get length() {
        return this.stack.length
    }
}

module.exports = AppPagesNavigator
exports.PageAppRoute = PageAppRoute
exports.default = AppPagesNavigator

if (typeof window != 'undefined') {
    window.AppPagesNavigator = AppPagesNavigator
}
