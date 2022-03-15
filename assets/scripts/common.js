function showHead (element, isTopHead=false, direction=""){
    if(isTopHead) showTopHead(element, direction);
    element = element.querySelector('.display_head');
    element.classList.add('show_display_head')
}

function showTopHead(element, direction){
    let height = element.querySelector('.common-style').style.height;
    element = element.querySelector('.display_top_head');
    if(direction == 'left')
        element.style.transform = "translate(-50%) rotate(135deg)"
    else if(direction == 'right')
        element.style.transform = "translate(-50%) rotate(-45deg)"
    element.style.bottom = `calc(${height} + 25px)`;
    element.classList.add('show_display_top_head')
}

function hideHead(element, isTopHead=false){
    if(isTopHead) hideTopHead(element);
    element = element.querySelector('.display_head');
    element.classList.remove('show_display_head')
}
function hideTopHead(element){
    element = element.querySelector('.display_top_head');
    element.classList.remove('show_display_top_head')
}

function hideAll(bars){
    bars.forEach(element => {
        hideHead(element);
        hideTopHead(element);
    });
}

function getNumber(numElement){
    return parseInt(numElement.querySelector('.number').innerText);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export {sleep, showHead, hideHead, getNumber, showTopHead, hideTopHead, hideAll};