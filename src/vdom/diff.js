import { render } from "./render";

const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = [];

    // pushing an anon function reference where we r create new attrs
    for (const [attr, value] of Object.entries(newAttrs || {})) {
        patches.push((node) => {
            node.setAttribute(attr, value);

            attr.startsWith("on")
                ? node.addEventListener(attr.toLowerCase().substring(2), value)
                : null;

            return node;
        });
    }

    // pushing an anon function reference where we r delete not used/old attrs
    for (const [attr, value] of Object.entries(oldAttrs || {})) {
        if (!(attr in newAttrs)) {
            patches.push((node) => {
                node.removeAttribute(attr);

                return node;
            });
        }
    }

    return (node) => {
        for (const patch of patches) {
            patch(node);
        }
    };
};

function diffChildren(oldChildren, newChildren) {
    const patches = [];
    const additionalPatches = [];

    oldChildren.forEach((oldChild, i) => {
        patches.push(diff(oldChild, newChildren[i]));
    });

    for (const additionalChild of newChildren.slice(oldChildren.length)) {
        additionalPatches.push((node) => {
            node.appendChild(render(newChildren));
            return node;
        });
    }

    return (node) => {
        node.childNodes.forEach((child, i) => {
            patches[i](child);
        });

        for (const patch of additionalPatches) {
            patch(node);
        }
        return node;
    };
}

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
    const reconcileChildren = diffChildren(
        vOldNode.children,
        vNewNode.children
    );

    return (node) => {
        reconcileAttrs(node);
        reconcileChildren(node);
        return node;
    };
};

export default diff;
