const arrayInputField = document.getElementById('inputArray');
const showActionBtn = document.getElementById('action');
const stage = document.getElementById("stage");
const colors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];
const root = document.querySelector(':root');

function setSelectedColors(numOfElement){
    let selectedColors = []
    for(let i=0; selectedColors.length<numOfElement; i++){
        isInSelectedColors = selectedColors.find(x => x == colors[parseInt(Math.random(50)*50)]);
        if(!isInSelectedColors)
            selectedColors.push(colors[parseInt(Math.random(50)*50)]);
    }

    return selectedColors;
}

function setTemplate(id, number){
    let single_bar = `
    <div class="verticalBar">
        <div class="verticalBar-${id} common-style">
            <div class="number">
                ${number}
            </div>
        </div>
    </div>
    `
    return single_bar;
}

function getArrayFromInput(){
    let input_array = arrayInputField.value.replace(/\s/g,'');
    if(input_array.search(',') != -1){
        input_array = input_array.replace(/[\[\]']+/g,'').split(',');
    }
    let new_array = []
    let areAllInteger = true; 
    try {
        for(let i=0; i<input_array.length; i++) {
            if(input_array[i] !== '[' && input_array[i]!== ']') {
                if(isNaN(input_array[i])) {
                    areAllInteger=false;
                    break;
                }
                else new_array.push(parseInt(input_array[i]));
            }
        };
    } catch (error) {
        alert(error);
    }
    return [areAllInteger, new_array];
}

function setInputValuesToBars(new_array){
    let id = 1;
    let colors = setSelectedColors(new_array.length);
    console.log(colors); 
    new_array.forEach(element => {
        let single_bar = setTemplate(id, element);
        stage.innerHTML += single_bar;
        document.querySelector(".verticalBar-"+id).style.backgroundColor = colors[id++];
    });
}

showActionBtn.addEventListener('click', x =>{
    const [areAllInteger, new_array] = getArrayFromInput();
    console.log(areAllInteger, new_array);
    if(!areAllInteger) alert("Pleas Input Numbers only!");
    else{
        stage.innerHTML = '';
        root.style.setProperty('--numOfBars', new_array.length)
        setInputValuesToBars(new_array)
    }
})