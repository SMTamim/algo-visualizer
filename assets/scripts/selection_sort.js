import {showHead, hideHead, getNumber, hideAll, sleep} from "./common.js";

/**
 * Implementation of selection sort algorithm
 */

async function selection_sort(array){
    for(let i=0; i<array.length; i++){
        let smallest_index  = i;
        for(let j=i+1; j<array.length; j++){
            console.log(smallest_index, j);
            showHead(array[smallest_index], true);
            showHead(array[j]);
            await sleep(400);
            if(getNumber(array[j]) < getNumber(array[smallest_index])){
                hideHead(array[smallest_index], true);
                smallest_index = j;
            }
            await sleep(400);
            hideHead(array[j]);
        }
        if(smallest_index !== i){
            let temp = array[i].innerHTML;
            showHead(array[i], true, 'right');
            showHead(array[smallest_index], true, 'left')
            await sleep(1000);
            array[i].innerHTML = array[smallest_index].innerHTML;
            array[smallest_index].innerHTML = temp;
        }
        hideHead(array[i], true);
    }
}

export {selection_sort}