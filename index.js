const apiKey = "f1d97b30c7ba47b38f5b53d08c06f21e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", fetchNews("today"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
  const data = await response.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const card = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = card.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  if (lastListItem) {
    ul.removeChild(lastListItem)
    // lastListItem.classList.remove("active");
    lastListItem = null;
  }
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let lastListItem = null;

searchButton.addEventListener("click", () => {
  let query = searchInput.value;
  addSearchItem();
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

let ul = document.querySelector("ul");

function addSearchItem() {
  if (lastListItem) {
    ul.removeChild(lastListItem)
    // lastListItem.classList.remove("active");
    lastListItem = null;
  }
  let li = document.createElement("li");
  li.innerHTML = searchInput.value;
  li.classList.add('hover-link')
  li.classList.add('nav-item')
  li.setAttribute("id", searchInput.value);
  li.classList.add("active");
  ul.appendChild(li);
  lastListItem = li;
  // let searchItem = document.getElementById('serchItem')
  searchInput.value = null;
  searchInput.setAttribute("placeholder", "Search more..");
}
