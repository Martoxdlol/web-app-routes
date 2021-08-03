import { PageAppRoute } from "./appRoute"

const DEFAULT_PUSH_OPTIONS = {}

function mapPushArgs(...args) {
    let content, route, options
    let url

    if (args[0] instanceof PageAppRoute) {
        route = args[0]
        content = null
    } else {
        content = args[0]
        route = null
    }

    if (typeof args[1] == 'string') {
        url = args[1]
        options = { ...DEFAULT_PUSH_OPTIONS, ...args[2], url }
    } else {
        options = { ...DEFAULT_PUSH_OPTIONS, ...args[1] }
    }

    return [content, route, options]
}

function mapPushnamedArgs(...args) {
    let name, options
    let url
    name = args[0]
    if (typeof args[1] == 'string') {
        url = args[1]
        options = { ...DEFAULT_PUSH_OPTIONS, ...args[2], url }
    } else {
        options = { ...DEFAULT_PUSH_OPTIONS, ...args[1] }
    }

    return [name, options]
}

function applyCss(element, styles) {
    const removed = {}
    for (const key in styles) {
        removed[key] = element.style[key]
        element.style[key] = styles[key]
    }
    return removed
}

function camelCaseToCssPropName(txt) {
    const r = txt.match(/([a-z])([A-Z])/)
    if (r) {
        let t = txt.substring(0, r.index + 1) + '-' + txt.substring(r.index + 1, r.index + 2).toLocaleLowerCase() + txt.substring(r.index + 2)
        console.log(t)
        return camelcaseToCssPropName(t)
    }
    return txt
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

export { mapPushArgs, mapPushnamedArgs, applyCss, camelCaseToCssPropName, delay }