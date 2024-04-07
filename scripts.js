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

console.log(records);

let displaySelection = records;
let sortMethod = "None";

function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    for (record of displaySelection) {
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, record.title, record.year, record.image); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, newTitle, newYear, newImageURL) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardYear = card.querySelector("h3");
    cardYear.textContent =
        newYear > 0 ? "(" + newYear + ")" : "Year not provided";

    // const cardImage = card.querySelector("img");
    // cardImage.src = newImageURL;
    // cardImage.alt = newTitle + " Poster";

    // console.log("new card:", newTitle, "- html: ", card);
}

function loadSearchBar() {
    loadSearch();
    loadSort();
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("submit", (event) => event.preventDefault());
}

function loadSearch() {
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (event) =>
        search(event, searchInput.value),
    );
}

function loadSort() {
    const sortSelect = document.getElementById("sort-select");
    sortSelect.addEventListener("change", (event) =>
        changeSortMethod(event, sortSelect.value),
    );
}

function chooseEra(lowYear, highYear) {
    console.log("Era chosen:", lowYear, "-", highYear);
    displaySelection = records.filter(
        (record) => record.year >= lowYear && record.year <= highYear,
    );
    sortRecords();
    showCards();
}

document.addEventListener("DOMContentLoaded", showCards);
document.addEventListener("DOMContentLoaded", loadSearchBar);

function search(event, value) {
    event.stopPropagation();
    displaySelection = records.filter((record) =>
        record.title.toLowerCase().includes(value.toLowerCase()),
    );
    showCards();
}

function changeSortMethod(event, sortType) {
    event.stopPropagation();
    sortMethod = sortType;
    console.log("Changed to", sortType);
    sortRecords();
    showCards();
}

function sortRecords() {
    if (sortMethod === "Year Ascending") {
        displaySelection = displaySelection.sort(
            (recordA, recordB) => recordA.year - recordB.year,
        );
    } else if (sortMethod === "Year Descending") {
        displaySelection = displaySelection.sort(
            (recordA, recordB) => recordB.year - recordA.year,
        );
    }
}

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
