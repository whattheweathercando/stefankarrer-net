(function() {

var el = {};

const listEntries = document.querySelectorAll(".list-entry");
const listTitles = document.querySelectorAll("li h2.title-index");
const expandButton = document.querySelector("#expand");
const infoDivs = document.querySelectorAll(".info");


const nowEl = document.querySelector("#now");
const dateEl = document.querySelector("#now h2");
const interval = setInterval(upDate, 1000);

// init current date list item
let d = new Date();
dateEl.innerHTML = d;
// set data-timestamp to current date
let nowTimestamp = d.valueOf();
//console.log(nowTimestamp);
nowEl.dataset.startdate = nowTimestamp;
nowEl.dataset.enddate = nowTimestamp;

function upDate() {
  d = new Date();
  // elDate.innerHTML = `<h2>${d}</h2>`;
  dateEl.innerHTML = d
}

// add time data attributes 
listEntries.forEach(el => {
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


// add target blank and noopener to external links
let links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
  if (/^(https?:)?\/\//.test(links[i].getAttribute('href'))) {
    links[i].target = '_blank';
    links[i].rel = "noopener";
  }
}

// show content on click
listTitles.forEach(el => {
		el.addEventListener('click', function(event) {
      el.classList.toggle("active");
			el.parentElement.querySelector(".info").classList.toggle("show");
		})
});

// expand / collapse index list
let expanded = true;
if (!expanded){
  expandButton.innerText = "Expand all"
} else {
  expandButton.innerText = "Collapse all"
}
expandButton.addEventListener('click', function(){
  if (!expanded){
    expanded = true
    this.innerText = "Collapse all"
    infoDivs.forEach(el => {
      el.classList.add("show");
    })
    listTitles.forEach(el => {
      el.classList.add("active");
    })
  } else {
    expanded = false
    this.innerText = "Expand all"
    infoDivs.forEach(el => {
      el.classList.remove("show");
    })
    listTitles.forEach(el => {
      el.classList.remove("active");
    })
  }
});


// images full height on click
const images = document.querySelectorAll("img");
images.forEach(el => {
  el.addEventListener('click', function(e) {
    el.classList.toggle("full-size");
  });
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



// DARK MODE

// https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/

const modeBtn = document.querySelector(".mode-btn");
let prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
//console.log(prefersDarkScheme);
let modeBtnChanged = false;

function initModeBtn(){
  prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  console.log(prefersDarkScheme.matches);
  modeBtnChanged = false;
  if (prefersDarkScheme.matches){
    modeBtn.innerText = "Light Mode";
  } else {
    modeBtn.innerText = "Dark Mode";
  }
}
initModeBtn();
window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
  console.log(`changed to ${e.matches ? "dark" : "light"} mode`)
  initModeBtn();
});

modeBtn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-mode");
  } else {
    document.body.classList.toggle("dark-mode");
  }
  if (!modeBtnChanged){
    modeBtnChanged = true;
    if (prefersDarkScheme.matches){
      modeBtn.innerText = "Dark Mode";
    } else {
      modeBtn.innerText = "Light Mode";
    }
  } else if (modeBtnChanged){
    modeBtnChanged = false;
    if (prefersDarkScheme.matches){
      modeBtn.innerText = "Light Mode";
    } else {
      modeBtn.innerText = "Dark Mode";
    }
  }
});


// FILTER

// https://jimfrenette.com/javascript/multi-filter-js/
// https://jimfrenette.com/demo/multi-filter/

// document loaded
// https://jimfrenette.com/javascript/functions/#domcontentloaded-document-event-example


function inRange(num, range) {
  return (num >= range.split('-')[0] && num <= range.split('-')[1]);
}

function matches(key, value) {
  var count = 0;
  Array.from(el.items).forEach(item => {
      switch(key) {
          case 'type':
              if (item.dataset.type === value) {
                  count ++;
              }
              break;
          case 'tense':
              if (item.dataset.tense === value) {
                  count ++;
              }
              break;
      }
  });
  return count;
}

function match(item) {
  var match = {
      "type": [],
      "tense": []
  };
  Array.from(el.filtersList).forEach(input => {
      if (input.checked) {
      switch(input.name) {
          case 'type':
              match.type.push(item.dataset.type === input.value);
              break;
          case 'tense':
              match.tense.push(item.dataset.tense === input.value);
              break;
      }}
  });
  return match;
}

function renderCount(count) {
  el.heading.innerHTML = `${count} Matches`;
}

function applyFilter() {
  Array.from(el.items).forEach(item => {
      var result = match(item),
          matches = [];
      item.classList.remove('selected');

      // console.log(result);
      if (result.type.length) {
          if (result.type.includes(true)) {
              matches.push(true);
          } else { matches.push(false); }
      }

      if (result.tense.length) {
          if (result.tense.includes(true)) {
              matches.push(true);
          } else { matches.push(false); }
      }

      var count = 0;
      for(var i = 0; i < matches.length; ++i){
          if(matches[i] == true)
              count++;
      }

      if (matches.length && matches.length == count) {
          item.classList.add('selected');
      } else {
          item.classList.remove('selected');
      }
  });

  renderCount(el.list.querySelectorAll('.selected').length);
}

function isFilter() {
  var filter = false;
  /**
   * some returns true as soon as any of the callbacks return true,
   * short-circuiting the execution of the rest. e.g., break;
   */
  Array.from(el.filtersList).some(input => {
      if (input.checked) {
          filter = true;
      }
  });
  return filter;
}

function onFilterChange(input) {
  var filtered = false;
  if (input.checked) {
      filtered = true;
  } else {
      filtered = isFilter();
  }

  if (filtered) {
      el.list.classList.add('filtered');
      applyFilter();

  } else {
      el.list.classList.remove('filtered');
      renderCount(el.items.length);
  }
}

/**
* This is the app entry point
*/
function onDocumentReady() {
  el.heading = document.querySelector('.match-count');
  el.filters = document.querySelector('.filters');
  el.filtersList = el.filters.querySelectorAll('input');
  el.list = document.querySelector('ul#list');
  el.items = el.list.querySelectorAll('li.list-entry');

  renderCount(el.items.length);

  Array.from(el.filtersList).forEach(input => {
      // add match count to the label
      input.parentNode.append(` (${matches(input.name, input.value)})`);

      input.addEventListener('change', (event) => {
          onFilterChange(event.target);
          event.target.parentNode.classList.toggle("filter-active"); // move to onFilterChange function ?
      });
  });

} // on document ready

if (document.readyState !== "loading") {
  onDocumentReady();
} else {
  document.addEventListener("DOMContentLoaded", onDocumentReady);
}


}());