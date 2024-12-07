const apiUrl = "https://ergast.com/api/f1/2024.json";
const raceCalendarSection = document.getElementById("race-calendar-section");
const monthFilter = document.getElementById("month-filter");
const applyFilterBtn = document.getElementById("apply-filter");

function fetchRaceData(filterMonth = null) {
    $.ajax({
        url: apiUrl,
        method: "GET", 
        dataType: "json",
        success: function(data) {
            const races = data.MRData.RaceTable.Races;

            const filteredRaces = filterMonth !== null ? filterRacesByMonth(races, filterMonth) : races;
            displayRaceCalendar(filteredRaces);
        },
        error: function(xhr, status, error) {
            console.error("An error occured while fetching the race data: " + error);
            raceCalendarSection.innerHTML = "<p>There was a failure to load the race calendar. Please try again later</p>";
        },
    });
}

function filterRacesByMonth(races, month) {
    return races.filter(race => {
        const raceMonth = new Date(race.date).getMonth();
        return raceMonth === month;
    });
}

function displayRaceCalendar(races) {
    const raceList = $("<div>").addClass("race-list");

    if(races.length === 0) {
        raceList.html("<p>No races available for the season you've selected.</p>");
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

    $(".favorite-btn").on("click", function () {
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

$(document).ready(() => {
    fetchRaceData();

    applyFilterBtn.addEventListener("click", function () {
        const selectedMonth = parseInt(monthFilter.value);
        fetchRaceData(selectedMonth);
    });
});

