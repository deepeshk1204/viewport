
let desendentsArray = [];

let isInViewport = function (elem) {
    let bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.parent.innerHeight || window.parent.document.documentElement.clientHeight) &&
        bounding.right <= (window.parent.innerWidth || window.parent.document.documentElement.clientWidth)
    );
};

let allDesendents = (node, list) => {    
    for (let i = 0; i < node.children.length; i++) { 
        let child = node.children[i];
        let displayProperty = child.currentStyle ? child.currentStyle.display : getComputedStyle(child, null).display;
        let positionProperty =  child.currentStyle ? child.currentStyle.position :getComputedStyle(child, null).position;
        if(displayProperty !== 'none' && positionProperty !== 'fixed') {
            list.push(child);
            allDesendents(child,list);
        } 
    }
};

export {allDesendents, isInViewport}
