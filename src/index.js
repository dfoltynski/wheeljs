/** @jsx createElement */
import mount from "./vdom/mount";
import { render, createElement } from "./vdom/render";
import diff from "./vdom/diff";

const genElement = () => {
    const element = (
        <div id="root" time={new Date().toLocaleTimeString()}>
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

    return element;
};

let App = genElement();
let rootEl = mount(render(App), document.getElementById("root"));

setInterval(() => {
    // mount(render(genElement()), document.getElementById("root"));
    const newApp = genElement();
    // console.log(typeof App, typeof newApp);
    // console.log(App, newApp);
    const reconcile = diff(App, newApp);
    // console.log("------------------------diff return: ", reconcile);
    rootEl = reconcile(rootEl);
    // console.log("rootEl: ", rootEl);
    App = newApp;
    // mount(App, document.getElementById("root"));
}, 1000);
