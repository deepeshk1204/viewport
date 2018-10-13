
import  { allDesendents, isInViewport } from './viewport_helper.js';

// List of tags to scrape
const tags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI', 'SPAN', 'DIV']
// Get direct all child of body
const firstLevelElementArray = window.parent.document.querySelectorAll('body > *:not(script):not(noscript):not(.hidden)');

function getViewPortContent() {
    let payload = {};
    for (let element of firstLevelElementArray) {
        // get display property
        let displayProperty = element.currentStyle ? element.currentStyle.display : getComputedStyle(element, null).display;
        let positionProperty =  element.currentStyle ? element.currentStyle.position :getComputedStyle(element, null).position;
        if (displayProperty !== 'none' && positionProperty !== 'fixed' && positionProperty !== 'absolute') {
            let elementDesendentsArray = [];
            allDesendents(element, elementDesendentsArray);
            for (let desendentElement of elementDesendentsArray) {
                if (desendentElement && isInViewport(desendentElement) && tags.indexOf(desendentElement.tagName) > -1) {
                    if (desendentElement.tagName === 'DIV' && desendentElement.children.length > 0) {
                            //  consider child with only one A tag
                            let fisrtChild = desendentElement.children[0]
                            if(fisrtChild.tagName == 'A'){
                                 if(!payload[desendentElement.tagName]){
                                    payload[desendentElement.tagName] = []
                                }
                                payload[desendentElement.tagName].push(desendentElement.innerText);
                            }
                    } else if(desendentElement.innerHTML !== ""){
                        if(!payload[desendentElement.tagName]){
                            payload[desendentElement.tagName] = []
                        } 
                        payload[desendentElement.tagName].push(desendentElement.innerText);
                    }
                }
            }
        }

        if (Object.keys(payload).length) {
            console.log(payload)
            return payload;
        }
    }
}



var inactivityTime = function () {
    var t;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    
    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(getViewPortContent, 5000)
    }
}

inactivityTime();
// export { getViewPortContent }
