// import "./styles.css";
// import { getSuggestions } from "./utills.js";
const Fruits = [
  "Apple",
  "Mango",
  "Banana",
  "jackFruits",
  "orange",
  "graps",
  "berry",
];
const inputBox = document.getElementById("search-input");

const suggestion = document.getElementById("suggessionListWrapper");

const renderDropedItem = (list) => {
  const suggestionFragment = document.createDocumentFragment();
  list.forEach((item) => {
    const el = document.createElement("div");
    el.innerHTML = item;
    el.classList.add("dropdown-item");
    el.setAttribute("data-key", item);
    suggestionFragment.appendChild(el);
  });
  suggestion.innerHTML = "";
  suggestion.appendChild(suggestionFragment);
};

const handleSearch = async (keywords) => {
  const controller = new AbortController();

  const results = await getSuggestions(keywords, { signal: controller.signal });
  controller.abort();
  console.log(results,"results");
  if (results.length) {
    suggestion.classList.add("suggestion-visiable");
    renderDropedItem(results);
    // suggestion.innerHTML = "hello";
  }
  //console.log(results);
};

const handleInputChange = (event) => {
  const value = event.target.value;
  if (value) {
    handleSearch(value);
  } else {
    suggestion.classList.remove("suggestion-visiable");
  }
};

const getSuggestions = (keywards) => {
  keywards = keywards === undefined ? "" : keywards;
  const result = Fruits.filter(
    (i) => i.substr(0, keywards.length).toLowerCase() === keywards.toLowerCase()
  );

  return new Promise((res) => {
    setTimeout(() => res(result), 1000);
  });
};

const debouncing = (fn, duratrion) => {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, duratrion);
  };
};
const handleSelect = (event) => {
  const { key } = event.target.dataset;
  if (key) {
    inputBox.value = key;
  }
};

(() => {
  inputBox.addEventListener("input", debouncing(handleInputChange, 500));
  suggestion.addEventListener("click", handleSelect);
})();
