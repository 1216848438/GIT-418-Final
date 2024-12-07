"use strict";

// Ergast API Endpoint
const apiUrl = "https://ergast.com/api/f1/2024.json";

// DOM Element
const raceCalendarSection = $("#race-calendar-section");

// Fetch data using AJAX
function fetchRaceData() {
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      const races = data.MRData.RaceTable.Races;
      displayRaceCalendar(races);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching race data:", error);
      raceCalendarSection.html("<p>Failed to load race calendar. Please try again later.</p>");
    },
  });
}

// Display the race calendar
function displayRaceCalendar(races) {
  const raceList = $("<div>").addClass("race-list");

  if (races.length === 0) {
    raceList.html("<p>No races available for the selected season.</p>");
  } else {
    races.forEach((race) => {
      const raceCard = $("<div>").addClass("race");

      raceCard.html(`
        <h3>${race.raceName}</h3>
        <p><strong>Date:</strong> ${race.date}</p>
        <p><strong>Location:</strong> ${race.Circuit.circuitName}</p>
        <p><strong>Country:</strong> ${race.Circuit.Location.country}</p>
        <button class="favorite-btn" data-race="${race.raceName}">Add to Favorites</button>
      `);

      raceList.append(raceCard);
    });
  }

  raceCalendarSection.append(raceList);

  // Add event listeners for favorites
  $(".favorite-btn").on("click", function () {
    const raceName = $(this).data("race");
    saveToFavorites(raceName);
  });
}

// Save favorite races to local storage
function saveToFavorites(race) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(race)) {
    favorites.push(race);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${race} has been added to your favorites!`);
  } else {
    alert(`${race} is already in your favorites.`);
  }
}

// Load API data on page load
$(document).ready(fetchRaceData);