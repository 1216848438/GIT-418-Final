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
                    <p>Date: ${race.date}</p>
                    <p>Location: ${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</p>
                    <button class="favorite-btn" data-name="${race.raceName}" data-location="${race.Circuit.Location.locality}">Add to Favorites</button>
                    `;
                    raceCalendarDiv
            })
        }
    })
}