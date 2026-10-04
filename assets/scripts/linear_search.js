import { sleep, showHead, hideHead, showTopHead, hideTopHead, hideAll, getNumber, setState, setStatus } from "./common.js";
/**
 * The implementation of Linear Search Algorithm 
 */
async function linear_search(x, verticalBars){
    let found = false;
    for(let i=0; i<verticalBars.length; i++){
        let element = verticalBars[i];
        let number = getNumber(element);
        // Hide previous items head
        if (i!=0){
            hideHead(verticalBars[i-1])
            hideTopHead(verticalBars[i-1])
        }
        // Show head on current item
        showHead(element);
        showTopHead(element)
        setStatus(`Checking index ${i}`, "running");
        await sleep(300);
        if(number === parseInt(x)){
            found = true;
            setState(element, "found");
            setStatus(`Found at index ${i}`, "found");
            // Hide head of current item
            hideAll(verticalBars);
            break;
        }
    };
    if(!found){
        hideAll(verticalBars);
        setStatus("Not found", "miss");
    } 
}

export {linear_search as linear_search};
