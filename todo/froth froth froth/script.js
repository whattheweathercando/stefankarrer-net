
const textContainer = document.querySelector('.text-container');
let char;
let timer;


function getData(pageId) {
    console.log(pageId);
    const myRequest = new Request(`${pageId}.txt`);

    fetch(myRequest)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.text();
        })
        .then((text) => {
            // textContainer.innerText = text;
            displayTextWordByWord(text,120);
        })
        .catch((error) => {
            textContainer.innerText = `Error: ${error.message}`;
        });
}



function displayText(text) {
    console.log(text);
    textContainer.innerText = text;
}

function displayTextWordByWord(text,bpm) {
    // /\s+/
    // regex split at new line and whitespace but keep separators \n
    //  /(?<=\s)/
    let words = text.split(/(?<=\s)/);
    console.log(words);
    for (let i=0; i < words.length; i++) {
        words[i] = words[i].replace(/(?:\r\n|\r|\n)/g, '<br>');
        textContainer.innerHTML += "<span>" + words[i] + "</span>";
    }
    char = 0;
    let ms = 60000 / bpm;
    timer = setInterval(onTick, ms);

    function onTick(){
        const span = textContainer.querySelectorAll('span')[char];
        span.classList.add('show');
        char++;
        if(char === words.length){
            complete();
            return;
        }
    }
    function complete(){
        clearInterval(timer);
        timer = null;
    }
}


window.onload = (event) => {
    getData("input");
}
