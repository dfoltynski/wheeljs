import render from "./render";

const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = [];

    for (const [attr, value] of Object.entries(newAttrs || {})) {
        // console.log("attr and value: ", attr, value);
        // patches.push([attr, value]);
        // console.log("patches: ", patches);
        patches.push((node) => {
            //     // console.log("node: ", node);

            node.setAttribute(attr, value);

            attr.startsWith("on")
                ? node.addEventListener(attr.toLowerCase().substring(2), value)
                : null;

            return node;
        });
    }

    for (const [attr, value] of Object.entries(oldAttrs || {})) {
        if (value in newAttrs) {
            // patches.splice(patches.indexOf(attr), 1);
            patches.push((node) => {
                node.removeAttribute(attr);
                return node;
            });
        }
    }

    return (node) => {
        for (const patch of patches) {
            // console.log("reconcile and node: ", patch, node);
            console.log("patch and node", patch(node), node);
            patch(node);
        }
    };
};

const diff = (vOldNode, vNewNode) => {
    if (vNewNode === undefined) {
        return (node) => {
            node.remove();
            return undefined;
        };
    }

    if (typeof vOldNode === "string" || typeof vNewNode === "string") {
        if (vOldNode !== vNewNode) {
            return (node) => {
                const newNode = render(vNewNode);
                node.replaceWith(vNewNode);
                return newNode;
            };
        } else {
            return (node) => {
                return;
            };
        }
    }

    if (vOldNode.nodeName !== vNewNode.nodeName) {
        return (node) => {
            const newNode = render(vNewNode);
            node.replaceWith(newNode);
            return newNode;
        };
    }

    const reconcileAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
    // console.log(vOldNode.attrs, vNewNode.attrs);
    // const reconcileChildren = diffChildren(
    //     vOldNode.children,
    //     vNewNode.children
    // );

    return (node) => {
        reconcileAttrs(node);
        // console.log(node);
        return node;
    };
};

export default diff;
