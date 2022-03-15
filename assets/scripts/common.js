function showHead (element){
    element = element.querySelector('.display_head');
    element.classList.add('show_display_head')
}

function showTopHead(element){
    let height = element.querySelector('.common-style').style.height;
    element = element.querySelector('.display_top_head');
    element.style.bottom = `calc(${height} + 25px)`;
    element.classList.add('show_display_top_head')
}

function hideHead(element){
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

function getNumberInInteger(numElement){
    return parseInt(numElement.querySelector('.number').innerText);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export {sleep, showHead, hideHead, getNumberInInteger, showTopHead, hideTopHead, hideAll};