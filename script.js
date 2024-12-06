"use strict";

const raceData = [
    {name: "Race 1", date: "2024-03-17", location: "Australia"},
    {name: "Race 2", date: "2024-04-07", location: "Bahrain"},
    {name: "Race 3", date: "2024-05-12", location: "Spain"},
    {name: "Race 4", date: "2024-06-23", location: "Canada"},
    {name: "Race 5", date: "2024-07-14", location: "UK"},
    {name: "Race 6", date: "2024-08-25", location: "Belgium"},
]

const raceCalendarDiv = document.getElementById("race-calendar");
const favoriteListDiv = document.getElementById("favorite-list");
const monthFilter = document.getElementById("month-filter");
const applyFilterButton = document.getElementById("filter");

function loadCalendar(filterMonth = null) {
    raceCalendarDiv.innerHTML = "";
    let filteredRaces = raceData;

    if(filterMonth !== null) {
        filteredRaces = raceData.filter((race) => {
            const raceMonth = new Date(race.date).getMonth();
            return raceMonth === filterMonth;
        });
    }

    filteredRaces.forEach((race) => {
        raceDiv.className = "race";
        raceDiv.innerHTML = `
            <h3>${race.name}</h3>
            <p>Date: ${race.date}</p>
            <p>Location: ${race.location}</p>
            <button class = "favorite-btn" data-name = "${race.name}">Add to Favorites</button>
        `;
        raceCalendarDiv.appendChild(raceDiv);
    });

    document.querySelectorAll(".favorite-btn").forEach((button) => {
        button.addEventListener("click", addToFavorites);
    });
}

function addToFavorites(event) {
    const raceName = event.target.getAttribute("data-name");
    let favorite =  JSON.parse(localStorage.getItem("favorites")) || [];
    if(!favorites.includes(raceName)) {
        favorites.push(raceName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
    }
}

function displayFavorites () {
    favoriteListDiv.innerHTML = "";
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.forEach((favorite) => {
        const favoriteDiv = document.createElement("div");
        favoriteDiv.className = "favorite";
        favoriteDiv.textContent = favorite;
        favoriteListDiv.appendChild(favoriteDiv);
    });
}

//ADJUST CAROUSEL SETTINGS PER TESTING!!!!!
function initializeCarousel() {
    $(".race-carousel").slick({
        dots: true, 
        infinite: true,
        speed: 250,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    });
}

applyFilterButton.addEventListener("click", () => {
    const selectedMonth = parseInt(monthFilter.value);
    loadCalendar();
    displayFavorites();
    initializeCarousel();
});