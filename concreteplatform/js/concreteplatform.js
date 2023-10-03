// CONCRETE PLATFORM

async function fetchTextFrame() {
	let url = 'concreteplatform_textframe.html';
  	let response = await fetch(url);
  	let html = await response.text();
  	return html;
}

// get JSON DATA
let platformData;
let i = 0;

async function fetchJsonData() {
  let requestUrl = 'data/concreteplatform-data.json';
  let response = await fetch(requestUrl);
  return await response.json();
}

// populate text fields
function populateFields(i){
	document.querySelector('#lp1').innerHTML = platformData[i].lp1[0]
	document.querySelector('#lp2-1').innerHTML = platformData[i].lp2[0]
	document.querySelector('#lp2-2').innerHTML = platformData[i].lp2[1]	
	document.querySelector('#layer1').innerHTML = platformData[i].layer1
	document.querySelector('#layer2').innerHTML = platformData[i].layer2
	document.querySelector('#layer3').innerHTML = platformData[i].layer3[0]
	document.querySelector('#song-pre').innerHTML = platformData[i].song[1]
	document.querySelector('#song').innerHTML = platformData[i].song[0]
	document.querySelector('#device').innerHTML = platformData[i].device[0] + '<br>' + platformData[i].device[1]
	document.querySelector('#cable').innerHTML = platformData[i].cable
	document.querySelector('#rfs').innerHTML = platformData[i].rfs.substring(0, 4)
}

function populateIndex(){
	let ul = document.querySelector('#index-ul');
	ul.innerHTML = '';
	platformData.forEach((data, index) => {
		// console.log(index);
		// console.log(data.cable);
		let li = document.createElement('li');
		li.innerHTML = '<a id="a-' + index + '">' + data.cable + '</a>';
		ul.appendChild(li);
		li.addEventListener('click', function(event) {
			i = index;
			populateFields(i);
			document.querySelector('#index-container').classList.toggle('active');
		})
	})
}

function sortByYear() {
	platformData.sort(function(a, b) {
 		return a.rfs - b.rfs;
 	});
 	// console.log(platformData);
 	i = 0;
 	// to do : new i -> position of current el in ordered array
}
function sortByName() {
	platformData.sort(function(a, b) {
		let nameA = a.cable.toLowerCase(),
			nameB = b.cable.toLowerCase()
		if (nameA < nameB) //sort string ascending
			return -1
		if (nameA > nameB)
			return 1
		return 0 //default return value (no sorting)
	})
	// console.log(platformData);
	i = 0;
	// to do : new i -> position of current el in ordered array

};


async function initPlatform() {
	let promiseFrame = fetchTextFrame();
  	let promiseData = fetchJsonData();
	// await promise all
	let promises = await Promise.all([promiseFrame, promiseData]);
	let textFrame = promises[0];
	platformData = promises[1];
	console.log(platformData);
	sortByYear();
	document.querySelector('#platform-container').innerHTML = textFrame;
	populateFields(i);
	populateIndex();
}
initPlatform()
.catch((e) =>
  console.log(e)
);



function next() {
	if (i < platformData.length-1){
		i++;
		populateFields(i);
	} else {
		i = 0;
		populateFields(i);
	}
}
function previous() {
	if (i > 0){
		i--;
		populateFields(i);
	} else {
		i = platformData.length-1;
		populateFields(i);
	}
}

const nextEl = document.querySelector('#next');
nextEl.addEventListener('click', function (event) {
  next();
});
const previousEl = document.querySelector('#previous');
previousEl.addEventListener('click', function (event) {
  previous();
});

// KEY functions
document.onkeydown = function(e) {
	switch (e.which) {
		case 37: // left
			previous();
			break;
		case 39: // right
			next();
			break;
		// case 38: // up
		// case 40: // down
		default:
			return; // exit this handler for other keys
	}
	e.preventDefault(); // prevent the default action (scroll / move caret)
}


document.querySelector('#button-show-index').addEventListener('click', function(event){
	this.classList.toggle('underline');
	document.querySelector('#index-container').classList.toggle("active");
})

document.querySelector('#button-sort-year').addEventListener('click', function(event){
	document.querySelector('#button-sort-name').classList.remove('underline');
	this.classList.add('underline');
	sortByYear();
	populateIndex();
	populateFields(i);
})
document.querySelector('#button-sort-name').addEventListener('click', function(event){
	document.querySelector('#button-sort-year').classList.remove('underline');
	this.classList.add('underline');
	sortByName();
	populateIndex();
	populateFields(i);
})

