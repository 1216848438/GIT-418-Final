const raceCalendarDiv = document.getElementById("race-calendar");

function loadCalendar(filterMonth = null) {
    raceCalendarDiv.innerHTML = "";

    $.ajax({
        url: "http://api.jolpi.ca/ergast/f1/2024/races.json",
        method: "GET",
        dataType: "json",
        success: function (response) {
            const raceData = response.MRData.RaceTable.Races;
            let filteredRaces = raceData;

            if(filterMonth !== null) {
                filteredRaces = raceData.filter((race) =>{
                    const raceMonth = new Date(race.data).getMonth();
                    return raceMonth === filterMonth;
                });
            }

            if(filteredRaces.length === 0) {
                const message = document.createElement("p");
                message.textContent = "No Grand Prix this month.";
                raceCalendarDiv.appendChild(message);
                return;
            }

            filteredRaces.forEach((race) => {
                const raceDiv = document.createElement("div");
                raceDiv.className = "race";
                raceDiv.innerHTML = `
                    <h3>${race.raceName}</h3>
                    <p>Date: ${race.data}</p>
                    <p>Location: ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</p>
                    <button class="favorite-btn" data-name="${race.raceName}" data-location="${race.Circuit.Location.locality}">Add to Favorites</button>
                    `;
                    raceCalendarDiv.appendChild(raceDiv);
            });
        },
        error: function() {
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Race Data has failed to load.";
            raceCalendarDiv.appendChild(errorMessage);
        }
    });
}

document.addEventListener("DOMContentLoaded", loadCalendar);

function addFavorite(event) {
    const target = event.target;
    if(target.classList.contains("favorite-btn")) {
        const raceName = target.getAttribute("data-name");
        const raceLocation = target.getAttribute("data-location");

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        favorites.push({raceName, raceLocation});
        
        localStorage.setItem("favorites", JSON.stringify(favorites));

        alert(`You've added ${raceName} in ${raceLocation} to your favorites!`);
    }
}

document.addEventListener("click", addFavorite);

$(document).ready(function() {
    $(`.race-carousel`).slick({
        infinite: true,
        slidesToShow: 1, 
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: true
    });
});