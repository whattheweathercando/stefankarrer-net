(function() {


var el = {};

const listEntries = document.querySelectorAll(".list-entry");
const listTitles = document.querySelectorAll("li h2");
const expandButton = document.querySelector("#expand");
// const collapseButton = document.querySelector("#collapse");
const infoDivs = document.querySelectorAll(".info");


const nowEl = document.querySelector("#now");
const dateEl = document.querySelector("#now h2");
const interval = setInterval(upDate, 1000);

// init current date list item
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

// add time data attributes 
listEntries.forEach(el => {
  let startDate = el.dataset.startdate;
  let endDate = el.dataset.enddate;
  if (startDate > nowTimestamp ){
    el.dataset.year = "future";
  } else if (endDate >= nowTimestamp && startDate <= nowTimestamp ) {
    el.dataset.year = "present";
  } 
  else if (endDate < nowTimestamp | startDate < nowTimestamp ) {
    el.dataset.year = "past";
  }
})


// show content on click
listTitles.forEach(el => {
		el.addEventListener('click', function(event) {
      el.classList.toggle("active");
			el.parentElement.querySelector(".info").classList.toggle("show");
		})
});

// expand index list
let expanded = false;
expandButton.addEventListener('click', function(){
  if (!expanded){
    expanded = true
    this.innerText = "Collapse"
  } else {
    expanded = false
    this.innerText = "Expand"
  }
  
  infoDivs.forEach(el => {
    el.classList.toggle("show");
  })
  listTitles.forEach(el => {
    el.classList.toggle("active");
  })
});
// collapseButton.addEventListener('click', function(){
//   infoDivs.forEach(el => {
//     el.classList.remove("show");
//   })
//   listTitles.forEach(el => {
//     el.classList.remove("active");
//   })
// });

// images full height on click
const listImages = document.querySelectorAll("#list img");
listImages.forEach(el => {
  el.addEventListener('click', function(e) {
    el.classList.toggle("full-height");
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
          case 'make':
              if (item.dataset.make === value) {
                  count ++;
              }
              break;
          case 'year':
              if (item.dataset.year === value) {
                  count ++;
              }
              break;
      }
  });
  return count;
}

function match(item) {
  var match = {
      "make": [],
      "year": []
  };
  Array.from(el.filtersList).forEach(input => {
      if (input.checked) {
      switch(input.name) {
          case 'make':
              match.make.push(item.dataset.make === input.value);
              break;
          case 'year':
              match.year.push(item.dataset.year === input.value);
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
      if (result.make.length) {
          if (result.make.includes(true)) {
              matches.push(true);
          } else { matches.push(false); }
      }

      if (result.year.length) {
          if (result.year.includes(true)) {
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
  el.list = document.querySelector('ul.cars');
  el.items = el.list.querySelectorAll('li.list-entry');

  renderCount(el.items.length);

  Array.from(el.filtersList).forEach(input => {
      // add match count to the label
      input.parentNode.append(` (${matches(input.name, input.value)})`);

      input.addEventListener('change', (event) => {
          onFilterChange(event.target);
      });
  });

}

if (document.readyState !== "loading") {
  onDocumentReady();
} else {
  document.addEventListener("DOMContentLoaded", onDocumentReady);
}


}());