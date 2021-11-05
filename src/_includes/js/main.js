

// Sort
const listElements = document.querySelectorAll("li");
// console.log(listElements);
// const listElArr = Array.from(listElements);
// console.log(listElArr);
// const timestamps = listElArr.map( el => el.getAttribute("data-timestamp"));
// console.log(timestamps);



// current date list item
const elDate = document.querySelector("#now h2");
const interval = setInterval(upDate, 1000);

var d = new Date();
elDate.innerHTML = d;
// to do: set data-timestamp to current d

function upDate() {
  d = new Date();
  // elDate.innerHTML = `<h2>${d}</h2>`;
  elDate.innerHTML = d
}



const listEntries = document.querySelectorAll(".list-entry");
const listTitles = document.querySelectorAll("li h2");
const expandButton = document.querySelector("#expand");
const collapseButton = document.querySelector("#collapse");
const infoDivs = document.querySelectorAll(".info");

// show content on click
listTitles.forEach(el => {
		el.addEventListener('click', function(event) {
      el.classList.toggle("active");
			el.parentElement.querySelector(".info").classList.toggle("show");
		})
});

// expand index list
expandButton.addEventListener('click', function(){
  infoDivs.forEach(el => {
    el.classList.add("show");
  })
  listTitles.forEach(el => {
    el.classList.add("active");
  })
});
collapseButton.addEventListener('click', function(){
  infoDivs.forEach(el => {
    el.classList.remove("show");
  })
  listTitles.forEach(el => {
    el.classList.remove("active");
  })
});

// images full height on click
const listImages = document.querySelectorAll("#list img");
listImages.forEach(el => {
  el.addEventListener('click', function(e) {
    el.classList.toggle("full-height");
  });
})


// FILTER

// filter by type 
const events = document.querySelectorAll("li[data-type='event']")
const works = document.querySelectorAll("li[data-type='work']")
const filterEventsButton = document.querySelector("#filter-events")
const filterWorksButton = document.querySelector("#filter-works")
const filterTypeAllButton = document.querySelector("#filter-type-all")
const listViewButton = document.querySelector("#list-view")
const paragraphViewButton = document.querySelector("#paragraph-view")

let listView = false;

filterEventsButton.addEventListener("click", function(){
  works.forEach(el => {
    el.style.display = "none"
  })
  events.forEach(el => {
    if (listView == true ){
      el.style.display = "block";
    } else {
      el.style.display = "inline-block";
    }
  })
})
filterWorksButton.addEventListener("click", function(){
  events.forEach(el => {
    el.style.display = "none"
  })
  works.forEach(el => {
    if (listView == true ){
      el.style.display = "block";
    } else {
      el.style.display = "inline-block";
    }
  })
})
filterTypeAllButton.addEventListener("click", function() {
  listEntries.forEach(el => {
    if (listView == true ){
      el.style.display = "block";
    } else {
      el.style.display = "inline-block";
    }
    
  })
})
paragraphViewButton.addEventListener("click", function(){
  listEntries.forEach(el => {
    el.style.display = "inline-block";
    listView = false;
  })
})
listViewButton.addEventListener("click", function(){
  listEntries.forEach(el => {
    el.style.display = "block";
    listView = true;
  })
})
// Filter by date
// future, current, past





// oO text animation
const oO = ["O0", "00", "0O", "OO", "oO", "Oo", "oo"];
let countoO = 0;

const h2oO = document.querySelector('[data-id="oo"] h2');
// console.log(h2oO);
h2oO.innerHTML = oO[countoO];

function changeoO() {
  h2oO.innerHTML = oO[countoO];
  countoO < oO.length -1 ? countoO++ : countoO = 0;
}
setInterval(changeoO, 666); 