/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

const imageDir = "./assets/images/";
let collection = records;
let displayed = collection;

function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (record of displayed) {
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        nextCard.id = record.id;
        editCardContent(
            nextCard,
            record.title,
            record.year,
            imageDir + record.image_src,
        ); // Edit title and image

        const favoriteButton = nextCard.querySelectorAll("button")[0];
        setFavoriteButtonStyles(favoriteButton, record.favorited);
        favoriteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            handleFavorite(favoriteButton, Number(nextCard.id));
        });

        const editButton = nextCard.querySelectorAll("button")[1];
        editButton.addEventListener("click", (event) => {
            event.stopPropagation();
            console.log("Edit clicked");
        });

        const deleteButton = nextCard.querySelectorAll("button")[2];
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            handleDelete(Number(nextCard.id));
        });

        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function handleFavorite(button, id) {
    const object = records.find((record) => record.id === id);
    object.favorited = !object.favorited;
    setFavoriteButtonStyles(button, object.favorited);
    updateDisplay();
}

function handleDelete(id) {
    records = records.filter((record) => record.id !== id);
    collection = collection.filter((record) => record.id !== id);
    updateDisplay();
}

function setFavoriteButtonStyles(button, isFavorited) {
    button.textContent = isFavorited ? "Unfavorite" : "Favorite";
    button.style.backgroundColor = isFavorited ? "#15803d" : "";
    button.style.color = isFavorited ? "white" : "";
}

function editCardContent(card, newTitle, newYear, newImageURL) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardYear = card.querySelector("h3");
    cardYear.textContent =
        newYear > 0 ? "(" + newYear + ")" : "Year not provided";

    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " album cover";
}

function updateDisplay() {
    displayed = collection;
    applyFilter();
    applySearch();
    applySort();

    const resultCounter = document.querySelector("#nav-bar p");
    resultCounter.textContent =
        displayed.length + (displayed.length !== 1 ? " results" : " result");

    showCards();
}

function chooseEra(lowYear, highYear) {
    collection = records.filter(
        (record) => record.year >= lowYear && record.year <= highYear,
    );
    updateDisplay();
}

function applyFilter() {
    const filterMethod = document.getElementById("filter-select").value;
    if (filterMethod === "Favorites") {
        displayed = displayed.filter((record) => record.favorited === true);
    }
}

function applySearch() {
    const searchInput = document.getElementById("search");
    displayed = displayed.filter((record) =>
        record.title.toLowerCase().includes(searchInput.value.toLowerCase()),
    );
}

function applySort() {
    const sortMethod = document.getElementById("sort-select").value;
    if (sortMethod === "Year Ascending") {
        displayed = displayed.sort(
            (recordA, recordB) => recordA.year - recordB.year,
        );
    } else if (sortMethod === "Year Descending") {
        displayed = displayed.sort(
            (recordA, recordB) => recordB.year - recordA.year,
        );
    }
}

function loadSearchBar() {
    document
        .querySelector(".search-bar")
        .addEventListener("submit", (event) => event.preventDefault());
    document.getElementById("search").addEventListener("input", updateDisplay);
    document
        .getElementById("sort-select")
        .addEventListener("change", updateDisplay);
    document
        .getElementById("filter-select")
        .addEventListener("change", updateDisplay);
}

document.addEventListener("DOMContentLoaded", updateDisplay);
document.addEventListener("DOMContentLoaded", loadSearchBar);

function quoteAlert() {
    console.log("Button Clicked!");
    alert(
        "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!",
    );
}

function removeLastCard() {
    records.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}
