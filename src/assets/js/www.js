

const wwwLink = document.querySelector("#www-a");
const wwwAudioMacOS = document.querySelector("#err-macos");
const wwwAudioWindows = document.querySelector("#err-windows");


let OS = 'Unknown';
if (navigator.userAgent.indexOf('Win') != -1) OS = 'Windows';
if (navigator.userAgent.indexOf('Mac') != -1) OS = 'MacOS';
if (navigator.userAgent.indexOf('Linux') != -1) OS = 'Linux';
if (navigator.userAgent.indexOf('Android') != -1) OS = 'Android';
if (navigator.userAgent.indexOf('like Mac') != -1) OS = 'iOS';
console.log(OS);
//console.log(navigator.userAgent);




wwwLink.addEventListener("click", function(event){
    event.preventDefault();
    wwwLink.style.color = "red";
    if (OS == ( "MacOS" | "iOS")) {
        wwwAudioMacOS.play();
    } else if (OS == ("Windows" | "Android")){
        wwwAudioWindows.play();
    } 
    // to do : detect os first, then load audio file , then click eventlistener, then on end color red
})

wwwLink.addEventListener("mouseout", (event) => {
    wwwLink.style.color = "SaddleBrown";
});