function showHead (element){
    element = element.querySelector('.display_head');
    element.classList.add('show_display_head')
}
function hideHead(element){
    element = element.querySelector('.display_head');
    element.classList.remove('show_display_head')
}
function getNumberInInteger(numElement){
    return parseInt(numElement.querySelector('.number').innerText);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {sleep, showHead, hideHead, getNumberInInteger};