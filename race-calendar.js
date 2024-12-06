const apiUrl = "https://ergast.com/api/f1/2024.json";
const raceCalendarSection = document.getElementById("race-calendar-section");

function fetchRaceData() {
    $.ajax({
        url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function(data) {
        const races = data.MRData.RaceTable.Races;
        displayRaceCalendar(races);
    },
    error: function (xhr, status, error) {
        console.error("There was an error while fetching the race data: " + error);
        raceCalendarSection.innerHTML ="<p>Failure to load the race calendar. Please try again at a later time</p>";
    },
});
}

function displayRaceCalendar(races) {
    const raceList = $("<div>").addClass("race-list");

    if(races.length === 0) {
        raceList.html("<p>No races are available for the current selected season.</p>");
    } else {
        races.forEach((race) => {
            const raceCard = $("<div>").addClass("race");
            raceCard.html(` 
                <h3>${race.raceName}</h3>
                <p><strong>Date:</strong> ${race.date}</p>
                <p><strong>Location:</strong> ${race.Circuit.circuitName}</p>
                <p><strong>Country:</strong> ${race.Circuit.Location.country}</p>
                <button class = "favorite-btn" data-race = "${race.raceName}">Add To Favorites</button>
                `);
                raceList.append(raceCard);
        });
    }
    raceCalendarSection.append(raceList);

    $(".favorite-btn").on("click", function() {
        const raceName = $(this).data("race");
        saveToFavorites(raceName);
    });
}

function saveToFavorites (race) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if(!favorites.includes(race)) {
        favorites.push(race);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${race} has been added to your favorites`);
    } else {
        alert(`${race} is already in your favorites`);
    }
}

$(document).ready(fetchRaceData);