/** @jsx createElement */

const element = (
    <div id="container">
        <button onClick={(e) => alert("Hi")}>click me</button>
        <input value="foo" type="text" />
        <a href="/bar">bar</a>
        <button onClick={(e) => alert("Hi2")}>click me</button>
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
    const { nodeName, attrs, children } = node;

    if (typeof node == "string") return document.createTextNode(node);

    let dom = document.createElement(nodeName);

    Object.keys(attrs).forEach((k) => {
        dom.setAttribute(k, attrs[k]);
        console.log(attrs[k]);
        k.startsWith("on")
            ? dom.addEventListener(k.toLowerCase().substring(2), attrs[k])
            : null;
    });
    children.map((c) => dom.appendChild(render(c)));

    return dom;
}
