import { sleep, showHead, hideHead, showTopHead, hideTopHead, hideAll } from "./common.js";
/**
 * The implementation of Linear Search Algorithm 
 */
async function linear_search(x, verticalBars){
    let found = false;
    for(let i=0; i<verticalBars.length; i++){
        let element = verticalBars[i];
        let number = element.querySelector('.number');
        number = parseInt(number.innerText);
        // Hide previous items head
        if (i!=0){
            hideHead(verticalBars[i-1])
            hideTopHead(verticalBars[i-1])
        }
        // Show head on current item
        showHead(element);
        showTopHead(element)
        await sleep(300);
        if(number === parseInt(x)){
            found = true;
            console.log("Found");
            alert(`Found at position ${i+1}`);
            // Hide head of current item
            hideAll(verticalBars);
            break;
        }
    };
    if(!found){
        hideAll(verticalBars);
        alert(`${x} Was not found in the array! :(`);
    } 
}

export {linear_search as linear_search};