import { sleep, showHead, hideHead, getNumberInInteger } from "./common.js";

/**
 * Implementation of Bubble Sort Algorithm
 */

async function bubble_sort(new_array, verticalBars, sleep_time){
    for(let i=0; i<new_array.length; i++){
        for(let j=0; j<new_array.length-i-1; j++){
            let currentBar = verticalBars[j];
            let nextBar = verticalBars[j+1];

            let currentBarInnerHTML = currentBar.innerHTML;
            let nextBarInnerHTML = nextBar.innerHTML;

            let currentNumber = getNumberInInteger(currentBar);
            let nextNumber = getNumberInInteger(nextBar);

            showHead(currentBar);
            showHead(nextBar);
            await sleep(sleep_time);

            // console.log(currentNumber, nextNumber);

            if(currentNumber > nextNumber){
                currentBar.innerHTML = nextBarInnerHTML;
                nextBar.innerHTML = currentBarInnerHTML;
                await sleep(sleep_time);
            }
            else if(currentNumber<nextNumber){
                hideHead(currentBar)
                hideHead(nextBar)
            }
        }
    }
    alert("Sorted")
}

function not_synchronous_bubble_sort(new_array, verticalBars){
    for(let i=0; i<new_array.length; i++){
        for(let j=0; j<new_array.length-i-1; j++){
            let currentBar = verticalBars[j];
            let nextBar = verticalBars[j+1];

            let currentBarInnerHTML = currentBar.innerHTML;
            let nextBarInnerHTML = nextBar.innerHTML;

            let currentNumber = getNumberInInteger(currentBar);
            let nextNumber = getNumberInInteger(nextBar);

            showHead(currentBar);
            showHead(nextBar);

            // console.log(currentNumber, nextNumber);

            if(currentNumber > nextNumber){
                currentBar.innerHTML = nextBarInnerHTML;
                nextBar.innerHTML = currentBarInnerHTML;
            }
            else if(currentNumber<nextNumber){
                hideHead(currentBar)
                hideHead(nextBar)
            }
        }
    }
}

export {bubble_sort, not_synchronous_bubble_sort}