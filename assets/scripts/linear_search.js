import { sleep, showHead, hideHead } from "./common.js";
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
        if (i!=0)
            hideHead(verticalBars[i-1])
        // Show head on current item
        showHead(element);
        await sleep(200);
        if(number === parseInt(x)){
            found = true;
            console.log("Found");
            alert(`Found at position ${i+1}`);
            // Hide head of current item
            hideHead(element);
            break;
        }
    };
    if(!found){
        verticalBars[verticalBars.length-1].querySelector('.display_head').classList.remove('show_display_head');
        alert(`${x} Was not found in the array! :(`);
    } 
}

export {linear_search as linear_search};