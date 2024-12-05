"use strict";

const raceData = [
    {name: "", date: "", location: ""},
    {name: "", date: "", location: ""},
    {name: "", date: "", location: ""},
    {name: "", date: "", location: ""},
    {name: "", date: "", location: ""},
    {name: "", date: "", location: ""},
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
        localStorage.setItem("favorites", JSON,stringify(favorites));
        displayFavorites();
    }
}

function displayFavorites () {
    favoritesListDiv.innerHTML = "";
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
        autoplaySpeed: 100,
    });
}

applyFilterButton.addEventListener("click", () => {
    const selectedMonth = parseInt(monthFilter.val);
    loadCalendar();
    displayFavorites();
    initializeCarousel();
});