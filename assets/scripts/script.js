import { setStatus } from "./common.js";
import { linear_search } from "./linear_search.js";
import {bubble_sort} from './bubble_sort.js';
import { binary_search } from "./binary_search.js";
import { selection_sort } from "./selection_sort.js";

const AlgoViz = window.AlgoViz;
const arrayInputField = document.getElementById('inputArray');
const arrayHint = document.getElementById('inputArrayHint');
const searchField = document.getElementById('searchValue');
const searchBox = document.getElementById('searchBox');
const showActionBtn = document.getElementById('action');
const stage = document.getElementById("stage");
const stageTitle = document.getElementById('stageTitle');
const legend = document.getElementById('legend');
const selectAlgorithm = document.getElementById('algorithm');

const SEARCH_ALGORITHMS = ['0', '2'];
const ARRAY_HINT = arrayHint.textContent;

// Legend entries per algorithm: only the states that algorithm uses
const LEGEND_MARKS = {
    pointer: '<span class="av-legend__mark"></span>',
    arrow: '<span class="av-arrow av-arrow--on legend-mark-arrow"></span>',
    lift: '<span class="legend-mark-lift"></span>',
    found: '<span class="av-legend__mark av-legend__mark--ring"></span>',
    dimmed: '<span class="av-legend__mark av-legend__mark--dim"></span>',
    sorted: '<span class="legend-mark-check"></span>',
};
const LEGENDS = {
    '': [],
    '0': [['pointer', 'Checking'], ['found', 'Found']],
    '1': [['pointer', 'Comparing'], ['lift', 'About to swap'], ['sorted', 'Sorted']],
    '2': [['pointer', 'Left, middle and right'], ['arrow', 'Middle'], ['dimmed', 'Ruled out'], ['found', 'Found']],
    '3': [['pointer', 'Comparing'], ['arrow', 'Smallest so far'], ['lift', 'About to swap'], ['sorted', 'Sorted']],
};

function getArrayFromInput(){
    let input_array = arrayInputField.value.replace(/\s/g,'');
    if(input_array.search(',') != -1){
        input_array = input_array.replace(/[\[\]']+/g,'').split(',');
    }
    let new_array = []
    let areAllInteger = true; 
    try {
        for(let i=0; i<input_array.length && i<10; i++) {
            if(input_array[i] !== '[' && input_array[i]!== ']') {
                if(isNaN(input_array[i])) {
                    areAllInteger=false;
                    break;
                }
                else if(parseInt(input_array[i])<=100)
                    new_array.push(parseInt(input_array[i]));
            }
        };
    } catch (error) {
        console.error(error);
    }
    return [areAllInteger, new_array];
}

function showFieldError(field, hint, message){
    field.setAttribute('aria-invalid', 'true');
    hint.classList.add('av-field__hint--error');
    hint.textContent = message;
    field.focus();
}

function clearFieldError(field, hint, text){
    field.removeAttribute('aria-invalid');
    hint.classList.remove('av-field__hint--error');
    hint.textContent = text;
}

function renderLegend(algorithm){
    legend.innerHTML = LEGENDS[algorithm]
        .map(([mark, text]) => `<span class="av-legend">${LEGEND_MARKS[mark]}${text}</span>`)
        .join('');
}

function setRunning(running){
    showActionBtn.disabled = running;
    selectAlgorithm.disabled = running;
    showActionBtn.textContent = running ? 'Running…' : 'Show the action';
}

function onAlgorithmChange(){
    const algorithm = selectAlgorithm.value;
    searchBox.hidden = !SEARCH_ALGORITHMS.includes(algorithm);
    stageTitle.textContent = algorithm ? selectAlgorithm.selectedOptions[0].text : 'Your array';
    renderLegend(algorithm);
}

selectAlgorithm.addEventListener('change', onAlgorithmChange);
onAlgorithmChange();
AlgoViz.renderStage(stage, getArrayFromInput()[1]);

showActionBtn.addEventListener('click', async x =>{
    const [areAllInteger, new_array] = getArrayFromInput();
    // console.log(areAllInteger, new_array);
    if(!areAllInteger){
        showFieldError(arrayInputField, arrayHint, "Numbers only, please.");
        return;
    }
    clearFieldError(arrayInputField, arrayHint, ARRAY_HINT);

    // Each value's tile colour comes from its original index and moves with it
    const verticalBars = AlgoViz.renderStage(stage, new_array);
    let searchValue = searchField.value;

    let selectedAlgorithm = selectAlgorithm.value;
    if(selectedAlgorithm === ''){
        setStatus("Pick an algorithm");
        return;
    }

    setRunning(true);
    if(selectedAlgorithm == 0)
        await linear_search(searchValue, verticalBars);
    else if(selectedAlgorithm == 1)
        await bubble_sort(new_array, verticalBars, 500);
    else if(selectedAlgorithm == 2){
        await binary_search(searchValue, new_array, verticalBars);
    }
    else if(selectedAlgorithm == 3){
        await selection_sort(verticalBars);
    }
    setRunning(false);
})

// 12, 64, 39, 66, 99, 100, 0 ,1, 2,8
