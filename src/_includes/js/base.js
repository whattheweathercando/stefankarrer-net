

// add target blank and noopener to external links
let links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
  if (/^(https?:)?\/\//.test(links[i].getAttribute('href'))) {
    links[i].target = '_blank';
    links[i].rel = "noopener";
  }
}

// images full height on click
const images = document.querySelectorAll("img");
images.forEach(el => {
  el.addEventListener('click', function(e) {
    el.classList.toggle("full-size");
  });
})
