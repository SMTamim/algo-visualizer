import {showHead, hideHead, getNumber, hideAll, sleep, setState, swap, setStatus} from "./common.js";

/**
 * Implementation of selection sort algorithm
 */

async function selection_sort(array){
    for(let i=0; i<array.length; i++){
        setStatus(`Step ${i+1} of ${array.length}`, "running");
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
            showHead(array[i], true, 'right');
            showHead(array[smallest_index], true, 'left')
            setState(array[i], "active");
            setState(array[smallest_index], "active");
            await sleep(1000);
            swap(array[i], array[smallest_index]);
            setState(array[i]);
            setState(array[smallest_index]);
            // Pointers stay with the slots, so clear the old minimum's too
            hideHead(array[smallest_index], true);
        }
        hideHead(array[i], true);
        setState(array[i], "sorted");
    }
    setStatus("Sorted");
}

export {selection_sort}
