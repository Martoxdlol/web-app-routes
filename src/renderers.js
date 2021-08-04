const ROUTE_RENDERERS = {
    react: (content, element, route) => {

    },
    default: (content, element, route) => {
        if(content instanceof Element) element.appendChild(content)
        else if(typeof content == 'string') element.innerHTML = content
        else if(typeof content == 'function') content(element, route)
    },
}


export default ROUTE_RENDERERS