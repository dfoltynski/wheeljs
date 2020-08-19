/** @jsx createElement */
import mount from "./vdom/mount";
import { render, createElement } from "./vdom/render";
import diff from "./vdom/diff";
import _ from "lodash";

const genElement = () => {
    const element = (
        <div id="root" time={new Date().toLocaleTimeString()}>
            <button onClick={(e) => alert("Hi")}>click me</button>
            <input value="foo" type="text" />
            <a href="/bar">bar</a>
            <button onClick={(e) => alert("Hi2")}>
                <span>click me</span>
            </button>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
    );

    return element;
};

let App = genElement();
let rootEl = mount(render(App), document.getElementById("root"));

setInterval(() => {
    const newApp = genElement();
    const reconcile = diff(App, newApp);
    rootEl = reconcile(rootEl);
    App = newApp;
}, 1000);
