/** @jsx createElement */

const element = (
    <div id="container">
        <input value="foo" type="text" />
        <a href="/bar">bar</a>
        <span onClick={(e) => alert("Hi")}>click me</span>
    </div>
);

let dom = render(element);

document.body.appendChild(dom);

function createElement(nodeName, attrs, ...args) {
    const children = args.length ? [].concat(...args) : [];

    return {
        nodeName,
        attrs,
        children,
    };
}

function render(node) {
    if (typeof node == "string") return document.createTextNode(node);

    let dom = document.createElement(node.nodeName);
    let attr = node.attrs || {};

    // console.log(Object.keys(attr).map((k) => k.startsWith("on")));
    let isListener = Object.keys(attr).map((k) => k.startsWith("on"))
        ? true
        : false;
    Object.keys(attr).forEach((k) => dom.setAttribute(k, attr[k]));
    let children = node.children || [];
    children.map((c) => dom.appendChild(render(c)));

    return dom;
}
