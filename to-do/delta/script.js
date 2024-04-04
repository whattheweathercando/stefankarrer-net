
const textContainer = document.querySelector('.text-container');
const textBody1 = document.querySelector("#textbody-1");

let datafile = "delta"
let datatype = "json"
let bodyfile = "body.txt"


async function getTextBody(filename) {
    const request = `${filename}.txt`;
	const response = await fetch(request);
    //console.log(response);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.text();
    //console.log(data);
    return data;
    
}

async function getData(filename, filetype) {
    const request = `${filename}.${filetype}`;
	const response = await fetch(request);
    //console.log(response);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
    //console.log(data);
    return data;
    
}

function setDocTitle(title){
    document.title = title;
}
function displayText(textbody) {
    textBody1.innerHTML = textbody;
}
function displayVariable(variable, el){
    el.innerText = variable;
}

function displayVariables(variables,i, elements){
    elements.forEach((element, elementIndex) => {
        elementIndex = elementIndex + 1;
        element.id = `text-variable-${elementIndex}`;
        displayVariable(variables[i][`var${elementIndex}`], element);
    })
}


window.onload = async (event) => {

    let data = await getData(datafile, datatype);
    //console.log(data)
    let title = data.title;
    setDocTitle(title)

    let bodyfile = data.bodyfile
    //console.log(bodyfile);
    let textbody = await getTextBody(bodyfile);
    // function prepareTextbodyHtml(){};
    const regex = /{[0-9]}/gi;
    // to do : loop through all {} variables in textbody file
    textbody = textbody.replaceAll(regex, '<span class="text-variable"></span>' );
    // to do : ad id with index, id="text-variable-${i}"
    displayText(textbody);
    
    let variables = data.variables;
    console.log(variables)

    const spanVarElements = document.querySelectorAll(".text-variable");


    displayVariables(variables, 0, spanVarElements)
    
    
    let interval = 4000
    let variablesIndex = -1;

    let loopIntervalID = setInterval(function(){
        
        variablesIndex++;
        if (variablesIndex >= variables.length) {
            variablesIndex = 0;
        }
        //console.log(variables[variablesIndex]["x"])
        // interval = interval * variables[variablesIndex]["x"];
        // console.log(interval)
        displayVariables(variables, variablesIndex, spanVarElements)
    }, interval);

    // to do : set interval dynamically from factor x
    // var counter = 10;
    // var myFunction = function() {
    //     counter *= 10;
    //     setTimeout(myFunction, counter);
    // }
    // setTimeout(myFunction, counter);
}
