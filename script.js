"use strict";

const raceData = [
    {name: "Race 1", date: "2024-03-17", location: "Australia"},
    {name: "Race 2", date: "2024-04-07", location: "Bahrain"},
    {name: "Race 3", date: "2024-05-12", location: "Spain"},
    {name: "Race 4", date: "2024-06-23", location: "Canada"},
    {name: "Race 5", date: "2024-07-14", location: "UK"},
    {name: "Race 6", date: "2024-08-25", location: "Belgium"},
    {name: "Race 7", date: "2024-09-19", location: "UAE"},
    {name: "Race 8", date: "2024-10-08", location: "USA"},
]

const raceCalendarDiv = document.getElementById("race-calendar");
const favoriteListDiv = document.getElementById("favorite-list");
const monthFilter = document.getElementById("month-filter");
const applyFilterButton = document.getElementById("apply-filter");

function loadCalendar(filterMonth = null) {
    raceCalendarDiv.innerHTML = "";
    let filteredRaces = raceData;

    if(filterMonth !== null) {
        filteredRaces = raceData.filter((race) => {
            const raceMonth = new Date(race.date).getMonth();
            return raceMonth === filterMonth;
        });
    }

    if (filteredRaces.length === 0) {
        const message = document.createElement("p");
        if(filterMonth < 2) {
            message.textContent = "There is no Grand Prix this month. The season starts on March 17th, 2024."
        } else if(filterMonth > 9) {
            message.textContent = "No Grand Prix this month. The season ends on October 8, 2024.";
        }else {
            message.textContent = "No Grand Prix this month.";
        }
        raceCalendarDiv.appendChild(message);
        return;
    }

    filteredRaces.forEach((race) => {
        const raceDiv = document.createElement("div");
        raceDiv.className = "race";
        raceDiv.innerHTML = `
            <h3>${race.name}</h3>
            <p>Date: ${race.date}</p>
            <p>Location: ${race.location}</p>
            <button class = "favorite-btn" data-name = "${race.name}" data-location = "${race.location}">Add to Favorites</button>
        `;
        raceCalendarDiv.appendChild(raceDiv);
    });

    document.querySelectorAll(".favorite-btn").forEach((button) => {
        button.addEventListener("click", addToFavorites);
    });
}

function addToFavorites(event) {
    const raceName = event.target.getAttribute("data-name");
    const raceLocation = event.target.getAttribute("date-location");

    let favorites =  JSON.parse(localStorage.getItem("favorites")) || [];

        if (!favorites.some(fav => fav.name === raceName && fav.location === raceLocation)) {
            favorites.push({name: raceName, location: raceLocation});
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
        favoriteDiv.textContent = `${favorite.name} (${favorite.location})`;
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
    loadCalendar(selectedMonth);
    displayFavorites();
    initializeCarousel();
});

