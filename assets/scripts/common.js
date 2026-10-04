/**
 * Visual helpers shared by the algorithms. Each slot is an .av-slot from
 * AlgoViz.renderStage: an arrow above, the tile, and a pointer below.
 */
const AlgoViz = window.AlgoViz;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function showHead (element, isTopHead=false, direction=""){
    if(isTopHead) showTopHead(element, direction);
    AlgoViz.setPointer(element, true);
}

function showTopHead(element, direction){
    const arrow = element.querySelector('.av-arrow');
    arrow.classList.toggle('av-arrow--left', direction == 'left');
    arrow.classList.toggle('av-arrow--right', direction == 'right');
    arrow.classList.add('av-arrow--on');
}

function hideHead(element, isTopHead=false){
    if(isTopHead) hideTopHead(element);
    AlgoViz.setPointer(element, false);
}
function hideTopHead(element){
    element.querySelector('.av-arrow').classList.remove('av-arrow--on', 'av-arrow--left', 'av-arrow--right');
}

// Clears pointers, arrows and transient tile states; found and sorted stay.
function hideAll(bars){
    bars.forEach(element => {
        hideHead(element);
        hideTopHead(element);
        const state = getState(element);
        if(state === 'active' || state === 'dimmed') AlgoViz.setState(element);
    });
}

function getNumber(numElement){
    return parseInt(numElement.querySelector('.av-tile').dataset.value);
}

function getState(element){
    return element.querySelector('.av-tile').dataset.state;
}

function setState(element, state){
    AlgoViz.setState(element, state);
}

// Moves the tile nodes, so each value keeps its colour.
function swap(first, second){
    AlgoViz.swap(first, second);
}

function setStatus(text, variant=""){
    const status = document.getElementById('status');
    status.className = 'av-status' + (variant ? ` av-status--${variant}` : '');
    document.getElementById('statusText').textContent = text;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, reduceMotion.matches ? 0 : ms));
}


export {sleep, showHead, hideHead, getNumber, showTopHead, hideTopHead, hideAll, setState, swap, setStatus};
