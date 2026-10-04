import { sleep, showHead, hideHead, getNumber, setState, swap, setStatus } from "./common.js";

/**
 * Implementation of Bubble Sort Algorithm
 */

async function bubble_sort(new_array, verticalBars, sleep_time){
    for(let i=0; i<new_array.length; i++){
        setStatus(`Pass ${i+1} of ${new_array.length}`, "running");
        for(let j=0; j<new_array.length-i-1; j++){
            let currentBar = verticalBars[j];
            let nextBar = verticalBars[j+1];

            let currentNumber = getNumber(currentBar);
            let nextNumber = getNumber(nextBar);

            showHead(currentBar);
            showHead(nextBar);
            await sleep(sleep_time);

            // console.log(currentNumber, nextNumber);

            if(currentNumber > nextNumber){
                // Lift both tiles, then swap them (each keeps its colour)
                setState(currentBar, "active");
                setState(nextBar, "active");
                await sleep(sleep_time/2);
                swap(currentBar, nextBar);
                setState(currentBar);
                setState(nextBar);
                await sleep(sleep_time/2);
            }
            else if(currentNumber<nextNumber){
                hideHead(currentBar)
                hideHead(nextBar)
            }
        }
        setState(verticalBars[new_array.length-i-1], "sorted");
    }
    setStatus("Sorted");
}

function not_synchronous_bubble_sort(new_array, verticalBars){
    for(let i=0; i<new_array.length; i++){
        for(let j=0; j<new_array.length-i-1; j++){
            let currentBar = verticalBars[j];
            let nextBar = verticalBars[j+1];

            let currentNumber = getNumber(currentBar);
            let nextNumber = getNumber(nextBar);

            showHead(currentBar);
            showHead(nextBar);

            // console.log(currentNumber, nextNumber);

            if(currentNumber > nextNumber){
                swap(currentBar, nextBar);
            }
            else if(currentNumber<nextNumber){
                hideHead(currentBar)
                hideHead(nextBar)
            }
        }
    }
}

export {bubble_sort, not_synchronous_bubble_sort}
