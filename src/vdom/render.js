function render(node) {
    const { nodeName, attrs, children } = node;

    if (typeof node == "string") return document.createTextNode(node);

    let dom = document.createElement(nodeName);

    // Object.keys(attrs || {}).forEach((k) => {
    //     dom.setAttribute(k, attrs[k]);

    //     k.startsWith("on")
    //         ? dom.addEventListener(k.toLowerCase().substring(2), attrs[k])
    //         : null;
    // });

    for (const [attr, value] of Object.entries(attrs || {})) {
        dom.setAttribute(attr, value);

        attr.startsWith("on")
            ? dom.addEventListener(attr.toLowerCase().substring(2), value)
            : null;
    }

    children.map((c) => dom.appendChild(render(c)));

    return dom;
}

function createElement(nodeName, attrs, ...args) {
    const children = args.length ? [].concat(...args) : [];

    return {
        nodeName,
        attrs,
        children,
    };
}

module.exports = {
    render,
    createElement,
};
