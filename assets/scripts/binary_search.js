import { sleep, showHead, hideHead, getNumberInInteger } from "./common.js";
import {not_synchronous_bubble_sort} from "./bubble_sort.js";

/**
 * The implementation of Binary Search
 */

async function binary_search(x, new_array, verticalBars){
    let left = 0, right = verticalBars.length-1, mid, midNumber;
    not_synchronous_bubble_sort(new_array, verticalBars);
    
    while(left < right){
        showHead(verticalBars[left]);
        showHead(verticalBars[right]);

        mid = parseInt((left+right)/2);
        showHead(verticalBars[mid]);

        await sleep(500);

        midNumber = getNumberInInteger(verticalBars[mid]);
        console.log("Mid = ", mid, midNumber);
        if(midNumber == x){
            alert(`Found ${x} at position ${mid}!`);
            return;
        }
        else{
            hideHead(verticalBars[left]);
            hideHead(verticalBars[right]);
            hideHead(verticalBars[mid]);
            if(midNumber < x)
                left = mid + 1;
            else 
                right = mid - 1;
        }
    }
    alert(`Given element ${x} was not found!`)
}


export {binary_search};