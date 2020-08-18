/** @jsx createElement */
import mount from "./mount";

let i = 0;

function tick() {
    if (i < 5) {
        i++;
        const element = (
            <div id="root">
                <button onClick={(e) => alert("Hi")}>click me</button>
                <input value="foo" type="text" />
                <a href="/bar">bar</a>
                <button onClick={(e) => alert("Hi2")}>
                    <span>click me</span>
                </button>
                <a href="/bar">bar</a>
                <h2>It is {new Date().toLocaleTimeString()}</h2>
            </div>
        );

        let rootEl = mount(render(element), document.getElementById("root"));
    } else {
        const element = "";
    }
}

function createElement(nodeName, attrs, ...args) {
    const children = args.length ? [].concat(...args) : [];

    return {
        nodeName,
        attrs,
        children,
    };
}

function reconciliation() {}

function render(node) {
    const { nodeName, attrs, children } = node;

    if (typeof node == "string") return document.createTextNode(node);

    let dom = document.createElement(nodeName);

    Object.keys(attrs || {}).forEach((k) => {
        dom.setAttribute(k, attrs[k]);
        console.log(attrs);
        console.log(k);
        console.log(attrs[k]);
        k.startsWith("on")
            ? dom.addEventListener(k.toLowerCase().substring(2), attrs[k])
            : null;
    });
    children.map((c) => dom.appendChild(render(c)));

    return dom;
}

setInterval(tick, 1000);
