


const listElements = document.querySelectorAll("li.list-entry");


// current date list item
const nowEl = document.querySelector("#now");
const dateEl = document.querySelector("#now h2");
const interval = setInterval(upDate, 1000);

let d = new Date();
dateEl.innerHTML = d;
// set data-timestamp to current d
let nowTimestamp = d.valueOf();
//console.log(nowTimestamp);
nowEl.dataset.startdate = nowTimestamp;
nowEl.dataset.enddate = nowTimestamp;

function upDate() {
  d = new Date();
  // elDate.innerHTML = `<h2>${d}</h2>`;
  dateEl.innerHTML = d
}

// 
listElements.forEach(el => {
  let startDate = el.dataset.startdate;
  let endDate = el.dataset.enddate;
  if (startDate > nowTimestamp ){
    el.dataset.tense = "future";
  } else if (endDate >= nowTimestamp && startDate <= nowTimestamp ) {
    el.dataset.tense = "present";
  } 
  else if (endDate < nowTimestamp | startDate < nowTimestamp ) {
    el.dataset.tense = "past";
  }
})



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
const futures = document.querySelectorAll("li[data-tense='future']")
const presents = document.querySelectorAll("li[data-tense='present']")
const pasts = document.querySelectorAll("li[data-tense='past']")

const filterEventsButton = document.querySelector("#filter-events")
const filterWorksButton = document.querySelector("#filter-works")
const filterTypeAllButton = document.querySelector("#filter-type-all")
const filterFutureButton = document.querySelector("#filter-future")
const filterCurrentButton = document.querySelector("#filter-current")
const filterPastButton = document.querySelector("#filter-past")
const listViewButton = document.querySelector("#list-view")
const paragraphViewButton = document.querySelector("#paragraph-view")

const typeFilterEls = document.querySelectorAll(".type-filter");
const timeFilterEls = document.querySelectorAll(".time-filter");

let listView = true;

let eventFilterActive = false;
let workFilterActive = false;
let futureFilterActive = false;
let currentFilterActive = false;
let pastFilterActive = false;


// Filter
// to do : 
// cumulative type && time
// toggle on/off, underline

filterEventsButton.addEventListener("click", function(){
  typeFilterEls.forEach(el => el.classList.remove("filter-active"));
  if (workFilterActive){
    workFilterActive = false;
    listEntries.forEach(el => el.classList.remove("hide", "show"));
  }
  if (!eventFilterActive){
    eventFilterActive = true;
    this.classList.add("filter-active");
    works.forEach(el => el.classList.add("hide"));
    events.forEach(el => el.classList.add("show"));
  } else {
    eventFilterActive = false;
    this.classList.remove("filter-active");
    works.forEach(el => el.classList.remove("hide"));
    events.forEach(el => el.classList.remove("show"));
  }  
})

filterWorksButton.addEventListener("click", function(){
  typeFilterEls.forEach(el => el.classList.remove("filter-active") );
  if (eventFilterActive){
    eventFilterActive = false;
    listEntries.forEach(el => el.classList.remove("hide", "show"));
  }
  if (!workFilterActive){
    workFilterActive = true;
    this.classList.add("filter-active");
    events.forEach(el => el.classList.add("hide"));
    works.forEach(el => el.classList.add("show"));
  } else {
    workFilterActive = false;
    this.classList.remove("filter-active");
    events.forEach(el => el.classList.remove("hide"));
    works.forEach(el => el.classList.remove("show"));
  }  
})
// filterTypeAllButton.addEventListener("click", function() {
//   listEntries.forEach(el => {
//     if (listView == true ){
//       el.style.display = "block";
//     } else {
//       el.style.display = "inline-block";
//     }
    
//   })
// })

// Filter by date
// future, current, past

filterFutureButton.addEventListener("click", function(){
  timeFilterEls.forEach(el => el.classList.remove("filter-active") );
  currentFilterActive = false;
  pastFilterActive = false;
  listEntries.forEach(el => el.classList.remove("hide", "show"));
  if (!futureFilterActive){
    futureFilterActive = true;
    this.classList.add("filter-active");
    futures.forEach(el => el.classList.add("show"));
    presents.forEach(el => el.classList.add("hide"));
    pasts.forEach(el => el.classList.add("hide"));
  } else {
    futureFilterActive = false;
    this.classList.remove("filter-active");
    futures.forEach(el => el.classList.remove("show"));
    presents.forEach(el => el.classList.remove("hide"));
    pasts.forEach(el => el.classList.remove("hide"));
  }  
})

filterCurrentButton.addEventListener("click", function(){
  timeFilterEls.forEach(el => el.classList.remove("filter-active") );
  futureFilterActive = false;
  pastFilterActive = false;
  listEntries.forEach(el => el.classList.remove("hide", "show"));
  if (!currentFilterActive){
    currentFilterActive = true;
    this.classList.add("filter-active");
    futures.forEach(el => el.classList.add("hide"));
    presents.forEach(el => el.classList.add("show"));
    pasts.forEach(el => el.classList.add("hide"));
  } else {
    currentFilterActive = false;
    this.classList.remove("filter-active");
    futures.forEach(el => el.classList.remove("hide"));
    presents.forEach(el => el.classList.remove("show"));
    pasts.forEach(el => el.classList.remove("hide"));
  }  
})
filterPastButton.addEventListener("click", function(){
  timeFilterEls.forEach(el => el.classList.remove("filter-active") );
  // if (futureFilterActive){
    futureFilterActive = false;
    currentFilterActive = false;
    listEntries.forEach(el => el.classList.remove("hide", "show"));
  // }
  if (!pastFilterActive){
    pastFilterActive = true;
    this.classList.add("filter-active");
    futures.forEach(el => el.classList.add("hide"));
    presents.forEach(el => el.classList.add("hide"));
    pasts.forEach(el => el.classList.add("show"));
  } else {
    pastFilterActive = false;
    this.classList.remove("filter-active");
    futures.forEach(el => el.classList.remove("hide"));
    presents.forEach(el => el.classList.remove("hide"));
    pasts.forEach(el => el.classList.remove("show"));
  }  
})



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