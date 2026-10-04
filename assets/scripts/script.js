import { setStatus } from "./common.js";
import { linear_search } from "./linear_search.js";
import {bubble_sort} from './bubble_sort.js';
import { binary_search } from "./binary_search.js";
import { selection_sort } from "./selection_sort.js";

const AlgoViz = window.AlgoViz;
const arrayInputField = document.getElementById('inputArray');
const arrayHint = document.getElementById('inputArrayHint');
const searchField = document.getElementById('searchValue');
const searchHint = document.getElementById('searchValueHint');
const searchBox = document.getElementById('searchBox');
const showActionBtn = document.getElementById('action');
const stage = document.getElementById("stage");
const stageTitle = document.getElementById('stageTitle');
const legend = document.getElementById('legend');
const selectAlgorithm = document.getElementById('algorithm');
const algorithmHint = document.getElementById('algorithmHint');
const NUDGE_MS = 3000;
let nudgeTimer;
const themeToggle = document.getElementById('themeToggle');
const generateBtn = document.getElementById('generate');
const root = document.documentElement;

const SEARCH_ALGORITHMS = ['0', '2'];
const ARRAY_HINT = arrayHint.textContent;
const SEARCH_HINT = searchHint.textContent;

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

// Returns [error, values]; error is an empty string when the input is valid
function getArrayFromInput(){
    const tokens = arrayInputField.value.replace(/[\[\]\s]/g, '').split(',').filter(token => token !== '');
    if(tokens.length === 0) return ["Enter at least one number.", []];
    if(tokens.some(token => !/^-?\d+(\.\d+)?$/.test(token))) return ["Numbers only, please.", []];
    if(tokens.some(token => !/^-?\d+$/.test(token))) return ["Whole numbers only, please.", []];
    const values = tokens.map(Number);
    if(values.some(value => value < 0 || value > 100)) return ["Keep each value between 0 and 100.", []];
    if(values.length > 10) return ["Up to 10 values, please.", []];
    return ["", values];
}

// Fit the array field's height to its wrapped content
function autosizeArrayField(){
    const style = getComputedStyle(arrayInputField);
    const borders = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    arrayInputField.style.height = 'auto';
    arrayInputField.style.height = `${arrayInputField.scrollHeight + borders}px`;
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

function generateArray(){
    const length = 6 + Math.floor(Math.random()*5); // 6 to 10 values
    return Array.from({length}, () => Math.floor(Math.random()*101));
}

function setRunning(running){
    showActionBtn.disabled = running;
    generateBtn.disabled = running;
    selectAlgorithm.disabled = running;
    showActionBtn.textContent = running ? 'Running…' : 'Show the action';
}

// The button names the theme it switches to
function syncThemeToggle(){
    themeToggle.textContent = root.dataset.theme === 'dark' ? 'Light theme' : 'Dark theme';
}

function toggleTheme(){
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    syncThemeToggle();
    try { localStorage.setItem('theme', theme); } catch (e) {}
}

// Run was pressed with no algorithm: flag the select for a few seconds
function nudgeAlgorithmSelect(){
    clearTimeout(nudgeTimer);
    selectAlgorithm.setAttribute('aria-invalid', 'true');
    algorithmHint.hidden = false;
    const wrap = selectAlgorithm.parentElement;
    wrap.classList.remove('is-nudged');
    void wrap.offsetWidth; // restart the shake
    wrap.classList.add('is-nudged');
    selectAlgorithm.focus();
    nudgeTimer = setTimeout(clearAlgorithmNudge, NUDGE_MS);
}

function clearAlgorithmNudge(){
    clearTimeout(nudgeTimer);
    selectAlgorithm.removeAttribute('aria-invalid');
    selectAlgorithm.parentElement.classList.remove('is-nudged');
    algorithmHint.hidden = true;
}

function onAlgorithmChange(){
    if(selectAlgorithm.value) clearAlgorithmNudge();
    const algorithm = selectAlgorithm.value;
    searchBox.hidden = !SEARCH_ALGORITHMS.includes(algorithm);
    stageTitle.textContent = algorithm ? selectAlgorithm.selectedOptions[0].text : 'Your array';
    renderLegend(algorithm);
}

arrayInputField.addEventListener('input', autosizeArrayField);
// It's a list, not prose: Enter shouldn't add a line break
arrayInputField.addEventListener('keydown', event => {
    if(event.key === 'Enter') event.preventDefault();
});
window.addEventListener('resize', autosizeArrayField);
autosizeArrayField();
// Fira Code wraps differently from the fallback font, so measure again once it loads
document.fonts?.ready.then(autosizeArrayField);
themeToggle.addEventListener('click', toggleTheme);
generateBtn.addEventListener('click', () => {
    const new_array = generateArray();
    arrayInputField.value = new_array.join(', ');
    autosizeArrayField();
    clearFieldError(arrayInputField, arrayHint, ARRAY_HINT);
    AlgoViz.renderStage(stage, new_array);
    setStatus("Ready");
});
syncThemeToggle();
selectAlgorithm.addEventListener('change', onAlgorithmChange);
onAlgorithmChange();
AlgoViz.renderStage(stage, getArrayFromInput()[1]);

showActionBtn.addEventListener('click', async x =>{
    const [inputError, new_array] = getArrayFromInput();
    if(inputError){
        showFieldError(arrayInputField, arrayHint, inputError);
        return;
    }
    clearFieldError(arrayInputField, arrayHint, ARRAY_HINT);

    let selectedAlgorithm = selectAlgorithm.value;
    // An empty search value used to make binary search "find" a 0
    let searchValue = searchField.value;
    if(SEARCH_ALGORITHMS.includes(selectedAlgorithm)){
        if(!/^-?\d+$/.test(searchValue)){
            showFieldError(searchField, searchHint, "Enter a whole number to search for.");
            return;
        }
        clearFieldError(searchField, searchHint, SEARCH_HINT);
        searchValue = Number(searchValue);
    }

    // Each value's tile colour comes from its original index and moves with it
    const verticalBars = AlgoViz.renderStage(stage, new_array);

    if(selectedAlgorithm === ''){
        nudgeAlgorithmSelect();
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
