var scroller = document.querySelector("#scroller");
var Sentinel1 = document.querySelector("#Sentinel1");
var status = document.querySelector("#status");
var heading = document.createElement("div");
var count = 1;
function loadItems(n) {
  for (var i = 0; i < n; i++) {
    var newItem = document.createElement("div");

    newItem.classList.add("item");

    newItem.textContent = "Item" + count++;
    scroller.appendChild(newItem);
  }
}

var intersectionObserver = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.intersectionRatio > 0)) {
    loadItems(10);
    scroller.appendChild(Sentinel1);
    loadItems(5);

    heading.textContent = "loaded up to item" + count;
    status.appendChild(heading);

    // ChromeSamples.setStatus("loaded up to item" + count);
  }
});
intersectionObserver.observe(Sentinel1);
